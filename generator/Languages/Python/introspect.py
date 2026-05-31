#!/usr/bin/env python3
"""Runtime introspection of an installed package into the generator's machine JSON.

The velopack PyPI wheel is a binary PyO3 extension: there is no .py source for static
tools to read. Instead we import the package and walk it with `inspect`, reading
`__doc__` (PyO3 exposes Rust `///` comments here) and `__text_signature__` (PyO3's
machine-readable signature). Output is JSON on stdout, consumed by PythonAdapter.cs.

Schema:
{
  "package": str, "version": str,
  "modules": [ { "name", "doc",
                 "classes": [ { "name","qualname","doc","bases":[str],
                                "members":[ member ] } ],
                 "functions": [ member ],
                 "enums": [ { "name","doc","values":[ {"name","value","doc"} ] } ] } ]
}
member = { "kind": "method"|"property"|"attribute",
           "name","doc","signature","params":[{"name","annotation","default"}],"returns" }
"""
import sys
import json
import inspect
import pkgutil
import importlib
import enum


def _version(pkg_name):
    try:
        from importlib.metadata import version
        return version(pkg_name)
    except Exception:
        mod = sys.modules.get(pkg_name)
        return getattr(mod, "__version__", "") if mod else ""


def _doc(obj):
    d = inspect.getdoc(obj)
    return d.strip() if d else None


def _signature_str(obj):
    try:
        return str(inspect.signature(obj))
    except (ValueError, TypeError):
        # PyO3 builtins expose __text_signature__ when inspect.signature fails.
        ts = getattr(obj, "__text_signature__", None)
        return ts if ts else None


def _params(obj):
    out = []
    try:
        sig = inspect.signature(obj)
    except (ValueError, TypeError):
        return out
    for name, p in sig.parameters.items():
        if name in ("self", "cls"):
            continue
        out.append({
            "name": name,
            "annotation": _annotation(p.annotation),
            "default": None if p.default is inspect.Parameter.empty else repr(p.default),
        })
    return out


def _returns(obj):
    try:
        sig = inspect.signature(obj)
    except (ValueError, TypeError):
        return None
    return _annotation(sig.return_annotation)


def _annotation(ann):
    if ann is inspect.Parameter.empty or ann is inspect.Signature.empty:
        return None
    if isinstance(ann, type):
        return ann.__name__
    return str(ann)


def _member(name, obj, kind):
    return {
        "kind": kind,
        "name": name,
        "doc": _doc(obj),
        "signature": _signature_str(obj) if kind == "method" else None,
        "params": _params(obj) if kind == "method" else [],
        "returns": _returns(obj) if kind == "method" else None,
    }


def _is_callable_member(obj):
    return inspect.isfunction(obj) or inspect.ismethod(obj) or inspect.isbuiltin(obj) \
        or inspect.ismethoddescriptor(obj) or callable(obj)


def _constructor(cls):
    """Recover the constructor (PyO3 exposes it on the class, not on a real __init__).

    inspect.signature(cls) / cls.__text_signature__ carry the #[new] signature when the
    extension was built with text-signatures enabled; the inherited object.__init__
    (`(self, /, *args, **kwargs)` + "Initialize self ...") carries nothing, so we never
    emit that. Returns None when no real constructor info is available.
    """
    sig, params = None, []
    try:
        s = inspect.signature(cls)
        sig = str(s)
        for name, p in s.parameters.items():
            if name in ("self", "cls"):
                continue
            params.append({
                "name": name,
                "annotation": _annotation(p.annotation),
                "default": None if p.default is inspect.Parameter.empty else repr(p.default),
            })
    except (ValueError, TypeError):
        ts = getattr(cls, "__text_signature__", None)
        if ts and "*args" not in ts:  # skip the generic placeholder signature
            sig = ts
    if not sig:
        return None
    doc = _doc(getattr(cls, "__new__", None)) or _doc(getattr(cls, "__init__", None))
    if doc and (doc.startswith("Initialize self") or doc.startswith("Create and return a new object")):
        doc = None
    return {"kind": "constructor", "name": cls.__name__, "doc": doc,
            "signature": sig, "params": params, "returns": None}


def _walk_class(cls):
    members = []
    ctor = _constructor(cls)
    if ctor:
        members.append(ctor)
    for name, obj in inspect.getmembers(cls):
        # Dunders (incl. the inherited object.__init__) carry no useful docs for these
        # PyO3 classes; the real constructor, if any, is recovered via _constructor above.
        if name.startswith("_"):
            continue
        if isinstance(obj, property):
            members.append(_member(name, obj.fget or obj, "property"))
        elif _is_callable_member(obj):
            members.append(_member(name, obj, "method"))
    return {
        "name": cls.__name__,
        "qualname": getattr(cls, "__qualname__", cls.__name__),
        "doc": _doc(cls),
        "bases": [b.__name__ for b in cls.__bases__ if b is not object],
        "members": members,
    }


def _walk_enum(cls):
    values = []
    for member in cls:
        values.append({
            "name": member.name,
            "value": repr(member.value),
            "doc": _doc(member),
        })
    return {"name": cls.__name__, "doc": _doc(cls), "values": values}


def _belongs(obj, pkg_name):
    mod = getattr(obj, "__module__", "") or ""
    return mod == pkg_name or mod.startswith(pkg_name + ".")


def _walk_module(mod, pkg_name):
    classes, functions, enums = [], [], []
    for name, obj in inspect.getmembers(mod):
        if name.startswith("_"):
            continue
        if inspect.isclass(obj):
            # Classes defined in this package (PyO3 classes report module == package).
            if not (_belongs(obj, pkg_name) or obj.__module__ in ("builtins", pkg_name)):
                continue
            if isinstance(obj, type) and issubclass(obj, enum.Enum) and obj is not enum.Enum:
                enums.append(_walk_enum(obj))
            else:
                classes.append(_walk_class(obj))
        elif inspect.isfunction(obj) or inspect.isbuiltin(obj):
            functions.append(_member(name, obj, "method"))
    return {
        "name": mod.__name__,
        "doc": _doc(mod),
        "classes": classes,
        "functions": functions,
        "enums": enums,
    }


def main():
    pkg_name = sys.argv[1] if len(sys.argv) > 1 else "velopack"
    root = importlib.import_module(pkg_name)

    modules = [_walk_module(root, pkg_name)]
    if hasattr(root, "__path__"):
        for info in pkgutil.walk_packages(root.__path__, prefix=pkg_name + "."):
            try:
                sub = importlib.import_module(info.name)
                modules.append(_walk_module(sub, pkg_name))
            except Exception:
                continue

    out = {"package": pkg_name, "version": _version(pkg_name), "modules": modules}
    json.dump(out, sys.stdout, indent=2)


if __name__ == "__main__":
    main()
