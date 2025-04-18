﻿<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# IFileDownloader.DownloadFile Method

**Declaring Type:** [IFileDownloader](../index.md)  
**Namespace:** [Velopack.Sources](../../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.1053+0cec039

Downloads a remote file to the specified local path

```csharp
public Task DownloadFile(string url, string targetFile, Action<int> progress, string authorization = null, string accept = null, double timeout = 30, CancellationToken cancelToken = default);
```

## Parameters

`url`  string

The url which will be downloaded.

`targetFile`  string

The local path where the file will be stored If a file exists at this path, it will be overwritten.

`progress`  Action\<int\>

A delegate for reporting download progress, with expected values from 0\-100.

`authorization`  string

Text to be sent in the 'Authorization' header of the request.

`accept`  string

Text to be sent in the 'Accept' header of the request.

`timeout`  double

The maximum time in minutes to wait for the download to complete.

`cancelToken`  CancellationToken

Optional token to cancel the request.

## Returns

Task

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*
