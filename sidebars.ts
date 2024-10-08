import type { SidebarsConfig, PropSidebarItemHtml, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';

function link(label: string, href: string, description?: string): PropSidebarItemLink {
  return {
    type: 'link',
    label: label,
    href: href,
    description,
  }
}

function doc(docId: string, label?: string): any {
  return {
    type: 'doc',
    label: label,
    id: docId,
  }
}

function title(title: string): PropSidebarItemHtml {
  return {
    type: 'html',
    value: `<span class="sidebar-title-only">${title}</span>`,
    defaultStyle: true,
  }
}

function auto(dirName: string, title: string, description?: string, indexPage?: string): any {
  return {
    type: 'category',
    label: title,
    items: [{ type: "autogenerated", dirName: dirName }],
    link: indexPage ? { type: 'doc', id: indexPage } : { type: 'generated-index' },
    description,
  }
}

const sidebars: SidebarsConfig = {
  mainSidebar: [
    title("Getting Started"),
    "index",
    {
      type: 'category',
      label: 'Quick Start',
      items: [
        doc("getting-started/csharp", "C# / .NET"),
        doc("getting-started/cpp", "C++"),
        doc("getting-started/electron", "JS / Electron"),
        doc("getting-started/rust", "Rust"),
        doc("getting-started/uno", "C# / Uno Platform"),
      ],
      link: { type: 'generated-index' },
    },
    {
      type: 'category',
      label: 'Sample Apps',
      items: [
        //!! AUTO-GENERATED-START SAMPLES-TOC
link("CSharpAvalonia", "https://github.com/velopack/velopack/tree/develop/samples/CSharpAvalonia", "Velopack in a cross-platform app with [Avalonia](https://avaloniaui.net/)."),
link("CSharpUnityMono", "https://github.com/velopack/velopack/tree/develop/samples/CSharpUnityMono", "Velopack with [Unity Game Engine](https://unity.com/) and Mono."),
link("CSharpUno", "https://github.com/velopack/velopack/tree/develop/samples/CSharpUno", "Velopack in a cross-platform app with [Uno Platform](https://github.com/unoplatform/uno)."),
link("CSharpWpf", "https://github.com/velopack/velopack/tree/develop/samples/CSharpWpf", "Velopack with WPF on Windows."),
link("NodeJSElectron", "https://github.com/velopack/velopack/tree/develop/samples/NodeJSElectron", "Velopack in a cross-platform javascript app with [Electron](https://www.electronjs.org/)."),
link("RustIced", "https://github.com/velopack/velopack/tree/develop/samples/RustIced", "Velopack in a cross-platform app with [Iced](https://github.com/iced-rs/iced)."),
        //!! AUTO-GENERATED-END SAMPLES-TOC
      ],
      link: { type: 'generated-index' },
    },

    title("Essentials"),
    auto("integrating", "Integrating", "Learn how to integrate the Velopack library with your application."),
    auto("packaging", "Packaging", "Learn how to package your application with Velopack."),
    auto("distributing", "Distributing", "Learn how to distribute your Velopack releases to your users."),

    title("Advanced"),
    auto("contributing", "Contributing", "Learn how to contribute to the Velopack project."),
    auto("migrating", "Migrating", "Learn how to migrate your existing application to Velopack."),
    doc("troubleshooting/debugging", "Debugging & Logging"),
    doc("troubleshooting/faq", "FAQ"),
  ],
  referenceSidebar: [
    {
      type: 'category',
      label: "Reference",
      link: { type: 'doc', id: "reference/index" },
      collapsed: false,
      collapsible: false,
      items: [
        auto("reference/cs", "C#", "The C# API reference for Velopack. See the available namespaces below.", "reference/cs/Velopack/index"),
        doc("reference/cpp/api", "C++"),
        auto("reference/js", "JS", "The JS API reference for Velopack.", "reference/js/index"),
        link("Rust", "https://docs.rs/velopack", "Link to docs.rs/velopack"),
        auto("reference/cli/content", "CLI", "The Velopack CLI reference.", "reference/cli/index"),
      ],
    },
  ]
};

export default sidebars;
