---
title: Interface IFileDownloader
sidebar_label: IFileDownloader
description: "A simple abstractable file downloader"
---
# Interface IFileDownloader
A simple abstractable file downloader

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/IFileDownloader.cs#L10)
```csharp title="Declaration"
public interface IFileDownloader
```
## Methods
### DownloadFile(string, string, Action&lt;int&gt;, string?, string?, CancellationToken)
Downloads a remote file to the specified local path
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/IFileDownloader.cs#L29)
```csharp title="Declaration"
Task DownloadFile(string url, string targetFile, Action<int> progress, string? authorization = null, string? accept = null, CancellationToken cancelToken = default)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *url* | The url which will be downloaded. |
| `System.String` | *targetFile* | The local path where the file will be stored
If a file exists at this path, it will be overwritten. |
| `System.Action<System.Int32>` | *progress* | A delegate for reporting download progress, with expected values from 0-100. |
| `System.String` | *authorization* | Text to be sent in the 'Authorization' header of the request. |
| `System.String` | *accept* | Text to be sent in the 'Accept' header of the request. |
| `System.Threading.CancellationToken` | *cancelToken* | Optional token to cancel the request. |

### DownloadBytes(string, string?, string?)
Returns a byte array containing the contents of the file at the specified url
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/IFileDownloader.cs#L34)
```csharp title="Declaration"
Task<byte[]> DownloadBytes(string url, string? authorization = null, string? accept = null)
```

##### Returns

`System.Threading.Tasks.Task<System.Byte[]>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *url* |
| `System.String` | *authorization* |
| `System.String` | *accept* |

### DownloadString(string, string?, string?)
Returns a string containing the contents of the specified url
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/IFileDownloader.cs#L39)
```csharp title="Declaration"
Task<string> DownloadString(string url, string? authorization = null, string? accept = null)
```

##### Returns

`System.Threading.Tasks.Task<System.String>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *url* |
| `System.String` | *authorization* |
| `System.String` | *accept* |

