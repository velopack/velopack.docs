# Getting Started: C# / .NET
<AppliesTo all />

1. Install the  [Velopack NuGet Package](https://www.nuget.org/packages/velopack) in your main project:
   ```cmd
   dotnet add package Velopack
   ```
0. Configure your Velopack app at the beginning of `Program.Main`:
   ```cs
   static void Main(string[] args)
   {
       VelopackApp.Build().Run();
       // ... your other startup code below
   }
   ```
0. Add automatic updating to your app:
   ```cs
   private static async Task UpdateMyApp()
   {
       var mgr = new UpdateManager("https://the.place/you-host/updates");

       // check for new version
       var newVersion = await mgr.CheckForUpdatesAsync();
       if (newVersion == null)
           return; // no update available

       // download new version
       await mgr.DownloadUpdatesAsync(newVersion);

       // install new version and restart app
       mgr.ApplyUpdatesAndRestart(newVersion);
   }
   ```
0. Install the command line tool `vpk`:
   ```cmd
   dotnet tool update -g vpk
   ```
0. Publish dotnet and build your first Velopack release! 🎉
   ```batch
   dotnet publish -c Release --self-contained -r win-x64 -o .\publish
   vpk pack -u YourAppId -v 1.0.0 -p .\publish -e yourMainApp.exe
   ```

✅ You're Done! Your app now has auto-updates and an installer.
You can upload your release to your website, or use the `vpk upload` command to publish it to the destination of your choice.