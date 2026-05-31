using DocGenerator.Markdown;
using DocGenerator.Model;

namespace DocGenerator;

/// <summary>
/// A hand-built <see cref="ApiModel"/> used to eyeball the Markdown generator before any
/// real extractor exists (Phase 1 verification). Render with <c>dotnet run -- fixture</c>;
/// it exercises multiple namespaces, every member kind, cross-namespace links, an enum, an
/// obsolete member, and a free-function group.
/// </summary>
internal static class Fixture
{
    public static ApiModel Build()
    {
        var sourcesNs = new ApiNamespace
        {
            Name = "Velopack.Sources",
            Summary = "Update source abstractions.",
            Types = new[]
            {
                new ApiType
                {
                    Kind = ApiTypeKind.Interface,
                    Name = "IUpdateSource",
                    FullName = "Velopack.Sources.IUpdateSource",
                    Namespace = "Velopack.Sources",
                    Summary = "Abstracts a source of releases.",
                    Signature = "public interface IUpdateSource",
                    Members = new[]
                    {
                        new ApiMember
                        {
                            Kind = ApiMemberKind.Method,
                            Name = "GetReleaseFeed",
                            Signature = "Task<VelopackAssetFeed> GetReleaseFeed(string channel)",
                            Summary = "Retrieves the release feed for a channel.",
                            Parameters = new[]
                            {
                                new ApiParameter { Name = "channel", Type = new ApiTypeRef("string"), Description = "The channel name." },
                            },
                            Returns = new ApiReturn { Type = new ApiTypeRef("Task<VelopackAssetFeed>"), Description = "The feed." },
                        },
                    },
                },
            },
        };

        var velopackNs = new ApiNamespace
        {
            Name = "Velopack",
            Summary = "Core Velopack types.",
            Types = new[]
            {
                new ApiType
                {
                    Kind = ApiTypeKind.Class,
                    Name = "UpdateManager",
                    FullName = "Velopack.UpdateManager",
                    Namespace = "Velopack",
                    Summary = "Automatically updates an application. See [`IUpdateSource`](Velopack.Sources/IUpdateSource.md).",
                    Remarks = "Construct one with an update source and call `CheckForUpdatesAsync`.",
                    Signature = "public class UpdateManager",
                    Interfaces = new[] { new ApiTypeRef("IDisposable") },
                    Members = new[]
                    {
                        new ApiMember
                        {
                            Kind = ApiMemberKind.Constructor,
                            Name = "UpdateManager",
                            Signature = "public UpdateManager(IUpdateSource source)",
                            Summary = "Creates a manager from an update source.",
                            Parameters = new[]
                            {
                                new ApiParameter
                                {
                                    Name = "source",
                                    Type = new ApiTypeRef("IUpdateSource", MarkdownWriter.PageHref("Velopack.Sources", "IUpdateSource")),
                                    Description = "Where updates come from.",
                                },
                            },
                        },
                        new ApiMember
                        {
                            Kind = ApiMemberKind.Property,
                            Name = "IsInstalled",
                            Signature = "public bool IsInstalled { get; }",
                            Summary = "Whether the app is installed.",
                            Modifiers = new[] { "get" },
                            Returns = new ApiReturn { Type = new ApiTypeRef("bool") },
                        },
                        new ApiMember
                        {
                            Kind = ApiMemberKind.Method,
                            Name = "CheckForUpdatesAsync",
                            Signature = "public Task<UpdateInfo?> CheckForUpdatesAsync()",
                            Summary = "Checks for updates.",
                            Returns = new ApiReturn { Type = new ApiTypeRef("Task<UpdateInfo>"), Description = "Update info, or null." },
                        },
                        new ApiMember
                        {
                            Kind = ApiMemberKind.Method,
                            Name = "CheckForUpdates",
                            Signature = "public UpdateInfo? CheckForUpdates()",
                            Summary = "Synchronous overload.",
                            IsObsolete = true,
                            ObsoleteMessage = "Use CheckForUpdatesAsync instead.",
                        },
                    },
                },
                new ApiType
                {
                    Kind = ApiTypeKind.Enum,
                    Name = "VelopackAssetType",
                    FullName = "Velopack.VelopackAssetType",
                    Namespace = "Velopack",
                    Summary = "The type of a release asset.",
                    Signature = "public enum VelopackAssetType",
                    Members = new[]
                    {
                        new ApiMember { Kind = ApiMemberKind.EnumValue, Name = "Full", Summary = "A full release." },
                        new ApiMember { Kind = ApiMemberKind.EnumValue, Name = "Delta", Summary = "A delta release." },
                    },
                },
            },
        };

        return new ApiModel
        {
            Language = "cs",
            DisplayName = "C#",
            PackageName = "Velopack",
            Version = "0.0.0-fixture",
            Namespaces = new[] { velopackNs, sourcesNs },
        };
    }
}
