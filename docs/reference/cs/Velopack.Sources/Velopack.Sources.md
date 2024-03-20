---
title: Namespace Velopack.Sources
sidebar_label: Velopack.Sources
---
# Namespace Velopack.Sources
## Classes
### [GitBase&lt;T&gt;](../Velopack.Sources/GitBase`T`.md)
Base class to provide some shared implementation between sources which download releases from a Git repository.
### [GitBase&lt;T&gt;.GitBaseAsset](../Velopack.Sources/GitBase`T`.GitBaseAsset.md)
Provides a wrapper around [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md) which also contains a Git Release.
### [GithubRelease](../Velopack.Sources/GithubRelease.md)
Describes a GitHub release, including attached assets.
### [GithubReleaseAsset](../Velopack.Sources/GithubReleaseAsset.md)
Describes a asset (file) uploaded to a GitHub release.
### [GithubSource](../Velopack.Sources/GithubSource.md)
Retrieves available releases from a GitHub repository.
### [GitlabRelease](../Velopack.Sources/GitlabRelease.md)
Describes a Gitlab release, plus any assets that are attached.
### [GitlabReleaseAsset](../Velopack.Sources/GitlabReleaseAsset.md)
Describes a container for the assets attached to a release.
### [GitlabReleaseLink](../Velopack.Sources/GitlabReleaseLink.md)
Describes a container for the links of assets attached to a release.
### [GitlabSource](../Velopack.Sources/GitlabSource.md)
Retrieves available releases from a GitLab repository. This class only
downloads assets from the very latest GitLab release.
### [HttpClientFileDownloader](../Velopack.Sources/HttpClientFileDownloader.md)
A simple abstractable file downloader
### [SimpleFileSource](../Velopack.Sources/SimpleFileSource.md)
Retrieves available updates from a local or network-attached disk. The directory
must contain one or more valid packages, as well as a 'releases.{channel}.json' index file.
### [SimpleWebSource](../Velopack.Sources/SimpleWebSource.md)
Retrieves updates from a static file host or other web server. 
Will perform a request for '{baseUri}/RELEASES' to locate the available packages,
and provides query parameters to specify the name of the requested package.
### [VelopackFlowUpdateSource](../Velopack.Sources/VelopackFlowUpdateSource.md)
Retrieves updates from the hosted Velopack service.
## Interfaces
### [IFileDownloader](../Velopack.Sources/IFileDownloader.md)
A simple abstractable file downloader
### [IUpdateSource](../Velopack.Sources/IUpdateSource.md)
Abstraction for finding and downloading updates from a package source / repository.
An implementation may copy a file from a local repository, download from a web address, 
or even use third party services and parse proprietary data to produce a package feed.
