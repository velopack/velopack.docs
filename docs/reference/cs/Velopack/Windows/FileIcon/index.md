---
title: FileIcon
sidebar_position: 2
sidebar_label: FileIcon
---
<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# FileIcon Class

**Namespace:** [Velopack.Windows](../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.1053+0cec039

Enables extraction of icons for any file type from the Shell.

```csharp
[ExcludeFromCodeCoverage]
public class FileIcon
```

**Inheritance:** object → FileIcon

**Attributes:** ExcludeFromCodeCoverageAttribute

## Constructors

| Name                                                                                                                     | Description                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| [FileIcon()](constructors/index.md#fileicon)                                                                             | Constructs a new, default instance of the FileIcon class.  Specify the filename and call GetInfo() to retrieve an icon.          |
| [FileIcon(string)](constructors/index.md#fileiconstring)                                                                 | Constructs a new instance of the FileIcon class and retrieves the icon, display name and type name for the specified file.       |
| [FileIcon(string, FileIcon.SHGetFileInfoConstants)](constructors/index.md#fileiconstring-fileiconshgetfileinfoconstants) | Constructs a new instance of the FileIcon class and retrieves the information specified in the  flags.                           |

## Properties

| Name                                     | Description                                                                         |
| ---------------------------------------- | ----------------------------------------------------------------------------------- |
| [DisplayName](properties/DisplayName.md) | Gets the display name for the selected file if the SHGFI\_DISPLAYNAME flag was set. |
| [FileName](properties/FileName.md)       | Gets\/sets the filename to get the icon for                                         |
| [Flags](properties/Flags.md)             | Gets\/sets the flags used to extract the icon                                       |
| [ShellIcon](properties/ShellIcon.md)     | Gets the icon for the chosen file                                                   |
| [TypeName](properties/TypeName.md)       | Gets the type name for the selected file if the SHGFI\_TYPENAME flag was set.       |

## Nested Types

| Name                                                               | Description |
| ------------------------------------------------------------------ | ----------- |
| [FileIcon.SHGetFileInfoConstants](SHGetFileInfoConstants/index.md) |             |

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*
