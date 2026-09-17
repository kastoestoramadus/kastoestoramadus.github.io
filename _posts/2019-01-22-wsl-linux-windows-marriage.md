---
layout: post
section-type: post
title: WSL, Hyper-V and Docker after a few days of use
category: os
tags: [ 'vm', 'linux', 'windows', 'docker' ]
---
![Windows and Linux mascots holding hands](https://fossbytes.com/wp-content/uploads/2016/11/windows-linux.jpg)

With a new contract I had a chance to prepare a full Windows environment for Scala development. This post lists the pros and cons, without final conclusions.

## Why Microsoft's OS?
- Microsoft has changed a lot since they realized they have new, strong competition.
- Docker is very well integrated - local ports and disk space.
- Hyper-V comes for free with Windows 10 Pro. It's a type 1 hypervisor with lower CPU overhead than VirtualBox and VMware Workstation (type 2). A VMware licence is more expensive than Windows 10 Pro.
- Drivers work. The TrackPoint on Ubuntu sucks (ThinkPad W540) and the fingerprint scanner breaks regularly.
- A clipboard manager and a sandbox will soon be added to Windows 10.
- Across Center, Logitech Flow, Cortana, DirectX etc. aren't available on Ubuntu.

Windows is made for a good UI, while GNU/Linux is made for servers. Both suck in the other category. Why not combine the best of both worlds?

## Needs
- Git management
- An IDE like IntelliJ IDEA
- sbt and other build tools
- Running services locally
- Testing locally

## Options
### VM on Hyper-V
Why not have everything in a VM?

**Pros:**
- MS drivers and some software are available.
- MS battery management is used.
- Mouse movement is smooth - they've implemented RDP for Linux!
- From my observation, the CPU overhead is below 2%.
- Drive passthrough works! NTFS won't slow you down (no VM checkpoints).

**Cons:**
- High memory consumption, 32 GB is nice to have.
- No good GPU acceleration for 2D. Although Linux is a first-class citizen on Windows, RemoteFX still isn't implemented for Linux guests, and GPU passthrough works only on Windows Server.

Microsoft, please allow GPU passthrough!

### WSL + Docker
[Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/faq) - a full Linux OS in a Windows window, served by the Microsoft kernel.

**Pros:**
- Very low memory footprint.
- A normal bash (Unix ssh!), which can be set as the main terminal in the IDE.
- Uses the same ports and disk space as the host (-ish). Great interoperability between MS and GNU tools.
- So much just works!
- By playing with aliases you can use your Windows Docker like a normal Ubuntu Docker client! All Windows terminal commands are available by adding `.exe`.

**Cons:**
- High execution overhead - around 20% loss compared to raw Ubuntu (measured by compiling the Akka repository). The loss is probably related to IO performance.
- Ivy artefacts and RSA keys need syncing or reconfiguring where they are stored. By default, everything Linux-ish is installed and configured in a protected zone.
- The IDE still builds separately with Windows tools, so you need to plan how to share build products and resources.
- Docker sometimes needs a restart...
- Not everything works. Adding a GPG key for a repository needed a [workaround](https://github.com/Microsoft/WSL/issues/3286#issuecomment-402594992)...

### Raw Windows?
**Cons:**
- PowerShell: unable to pass arguments to sbt... ([link](https://stackoverflow.com/questions/54400669/sbt-and-command-line-parameters-in-powershell-problem))
- Poor built-in package manager.
- Check my [There is no ideal OS for a programmer]({% post_url 2016-10-31-no-ideal-os-for-programmer %}) post for more.

### Mix?
For a future blog post: a Linux VM only as a server, accessed through a text terminal.
- Best performance
- Pure GNU/Linux
- All UIs from Windows (better tested!)
- Needs far more configuration: VM, network, drive sharing, synchronization and exposing ports for testing from the host...

## An unfinished experiment
Two days have passed and I'm pleased with the results, but I'll still stick to raw Ubuntu on a separate drive ;).

Want to know more about this topic? Ask in the comments, please. Suggestions are welcome.
