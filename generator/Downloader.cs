using System.Net;

namespace DocGenerator;

public static class Downloader
{
    public static string DownloadString(string url)
    {
#pragma warning disable SYSLIB0014
        using var wc = new WebClient();
#pragma warning restore SYSLIB0014
        return wc.DownloadString(url);
    }
}