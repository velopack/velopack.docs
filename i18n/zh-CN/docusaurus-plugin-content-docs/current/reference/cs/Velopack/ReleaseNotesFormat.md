---
title: Enum ReleaseNotesFormat
sidebar_label: ReleaseNotesFormat
description: "Describes the requested release notes text format."
---
# Enum ReleaseNotesFormat
Describes the requested release notes text format.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L20)
```csharp title="Declaration"
[Obsolete("This release format has been replaced by VelopackRelease")]
public enum ReleaseNotesFormat
```
## Fields
### Markdown
The original markdown release notes.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L24)
```csharp title="Declaration"
Markdown = 0
```
### Html
Release notes translated into HTML.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L26)
```csharp title="Declaration"
Html = 1
```
