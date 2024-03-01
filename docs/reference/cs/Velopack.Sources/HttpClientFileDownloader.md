---
title: Class HttpClientFileDownloader
sidebar_label: HttpClientFileDownloader
description: "A simple abstractable file downloader"
---
# Class HttpClientFileDownloader
A simple abstractable file downloader

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L13)
```csharp title="Declaration"
public class HttpClientFileDownloader : IFileDownloader
```
**Implements:**  
[Velopack.Sources.IFileDownloader](../Velopack.Sources/IFileDownloader)

## Properties
### UserAgent
The User-Agent sent with requests
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L18)
```csharp title="Declaration"
public static ProductInfoHeaderValue UserAgent { get; }
```
## Methods
### DownloadFile(string, string, Action&lt;int&gt;, string?, string?, CancellationToken)
Downloads a remote file to the specified local path
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L21)
```csharp title="Declaration"
public virtual Task DownloadFile(string url, string targetFile, Action<int> progress, string? authorization, string? accept, CancellationToken cancelToken = default)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *url* | The url which will be downloaded. |
| `System.String` | *targetFile* | The local path where the file will be stored
If a file exists at this path, it will be overritten. |
| `System.Action<System.Int32>` | *progress* | A delegate for reporting download progress, with expected values from 0-100. |
| `System.String` | *authorization* | Text to be sent in the 'Authorization' header of the request. |
| `System.String` | *accept* | Text to be sent in the 'Accept' header of the request. |
| `System.Threading.CancellationToken` | *cancelToken* | Optional token to cancel the request. |

### DownloadBytes(string, string?, string?)
Returns a byte array containing the contents of the file at the specified url
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L38)
```csharp title="Declaration"
public virtual Task<byte[]> DownloadBytes(string url, string? authorization, string? accept)
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
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L51)
```csharp title="Declaration"
public virtual Task<string> DownloadString(string url, string? authorization, string? accept)
```

##### Returns

`System.Threading.Tasks.Task<System.String>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *url* |
| `System.String` | *authorization* |
| `System.String` | *accept* |

### DownloadToStreamInternal(HttpClient, string, Stream, Action&lt;int&gt;?, CancellationToken)
Asynchronously downloads a remote url to the specified destination stream while 
providing progress updates.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L67)
```csharp title="Declaration"
protected virtual Task DownloadToStreamInternal(HttpClient client, string requestUri, Stream destination, Action<int>? progress = null, CancellationToken cancelToken = default)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Net.Http.HttpClient` | *client* |
| `System.String` | *requestUri* |
| `System.IO.Stream` | *destination* |
| `System.Action<System.Int32>` | *progress* |
| `System.Threading.CancellationToken` | *cancelToken* |

### CreateHttpClientHandler()
Creates a new `System.Net.Http.HttpClientHandler` with default settings, used for
new `System.Net.Http.HttpClient`'s. Override this function to add client certificates,
proxy configurations, cookies, or change other http behaviors.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L111)
```csharp title="Declaration"
protected virtual HttpClientHandler CreateHttpClientHandler()
```

##### Returns

`System.Net.Http.HttpClientHandler`
### CreateHttpClient(string?, string?)
Creates a new `System.Net.Http.HttpClient` for every request.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/HttpClientFileDownloader.cs#L123)
```csharp title="Declaration"
protected virtual HttpClient CreateHttpClient(string? authorization, string? accept)
```

##### Returns

`System.Net.Http.HttpClient`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *authorization* |
| `System.String` | *accept* |


## Implements

* [Velopack.Sources.IFileDownloader](../Velopack.Sources/IFileDownloader)
