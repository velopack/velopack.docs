---
title: Namespace Velopack.Locators
sidebar_label: Velopack.Locators
---
# Namespace Velopack.Locators
## Classes
### [LinuxVelopackLocator](../Velopack.Locators/LinuxVelopackLocator.md)
The default for OSX. All application files will remain in the '.app'.
All additional files (log, etc) will be placed in a temporary directory.
### [OsxVelopackLocator](../Velopack.Locators/OsxVelopackLocator.md)
The default for OSX. All application files will remain in the '.app'.
All additional files (log, etc) will be placed in a temporary directory.
### [TestVelopackLocator](../Velopack.Locators/TestVelopackLocator.md)
Provides a mock / test implementation of [Velopack.Locators.VelopackLocator](../Velopack.Locators/VelopackLocator.md). This can be used to verify that
your application is able to find and prepare updates from your chosen update source without actually
having an installed application. This could be used in a CI/CD pipeline, or unit tests etc.
### [VelopackLocator](../Velopack.Locators/VelopackLocator.md)
A base class describing where Velopack can find key folders and files.
### [WindowsVelopackLocator](../Velopack.Locators/WindowsVelopackLocator.md)
An implementation for Windows which uses the default paths.
## Interfaces
### [IVelopackLocator](../Velopack.Locators/IVelopackLocator.md)
An interface describing where Velopack can find key folders and files.
