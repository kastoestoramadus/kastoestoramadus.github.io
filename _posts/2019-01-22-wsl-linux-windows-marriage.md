---
layout: post
section-type: post
title: WSL, Hyper-V and Docker after a few days of use
category: os
tags: [ 'vm', 'linux', 'windows', 'docker' ]
---
![Windows and Linux mascots holding hands](https://fossbytes.com/wp-content/uploads/2016/11/windows-linux.jpg)

With a new contract I had a chance to set up a complete Windows environment for Scala development. This post lists the pros and cons - no final verdict yet.

## Why Microsoft's OS?
- Microsoft has changed a lot since it realized it has new, strong competition.
- Docker is very well integrated - local ports and disk space.
- Hyper-V comes free with Windows 10 Pro. It's a type 1 hypervisor with lower CPU overhead than VirtualBox and VMware Workstation (type 2), and a VMware licence costs more than Windows 10 Pro.
- Drivers work. On Ubuntu the TrackPoint sucks (ThinkPad W540) and the fingerprint reader breaks regularly.
- A clipboard manager and a sandbox are coming to Windows 10 soon.
- Across Center, Logitech Flow, Cortana, DirectX etc. aren't available on Ubuntu.

Windows is made for a good UI, GNU/Linux for servers, and each sucks at the other's job. Why not combine the best of both worlds?

## Needs
- Git management
- An IDE like IntelliJ IDEA
- sbt and other build tools
- Running services locally
- Testing locally

## Options
### VM on Hyper-V
Why not keep everything in a VM?

**Pros:**
- The hardware is handled by Windows drivers and software.
- Windows battery management is used.
- Mouse movement is smooth - Microsoft implemented RDP for Linux guests!
- From my observation, the CPU overhead is below 2%.
- Drive passthrough works! NTFS won't slow you down (at the cost of VM checkpoints).

**Cons:**
- High memory consumption, 32 GB is nice to have.
- No good GPU acceleration for 2D. Linux is a first-class citizen on Windows now, yet RemoteFX still isn't implemented for Linux guests, and GPU passthrough works only on Windows Server.

Microsoft, please allow GPU passthrough!

### WSL + Docker
[Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/faq) - a Linux user space running directly on the Windows kernel, without a VM.

**Pros:**
- Very low memory footprint.
- A normal bash (with Unix ssh!) that can be the IDE's main terminal.
- Shares ports and disk space with the host (more or less). Great interoperability between Windows and GNU tools.
- So much just works!
- With a few aliases you can use Docker for Windows like a normal Docker client on Ubuntu. Every Windows command is available by adding `.exe`.

**Cons:**
- High execution overhead - around 20% slower than raw Ubuntu (measured by compiling the Akka repository), probably because of IO performance.
- Ivy artefacts and RSA keys exist separately on the Windows and Linux sides, so you need to sync them or reconfigure where they are stored. By default, everything Linux-related lives in a protected zone that Windows tools must not touch.
- The IDE still builds separately with Windows tools, so you need to plan how to share build output and resources.
- Docker sometimes needs a restart...
- Not everything works. Adding a GPG key for a repository needed a [workaround](https://github.com/Microsoft/WSL/issues/3286#issuecomment-402594992)...

### Raw Windows?
**Cons:**
- PowerShell can't pass arguments to sbt properly... ([link](https://stackoverflow.com/questions/54400669/sbt-and-command-line-parameters-in-powershell-problem))
- A poor built-in package manager.
- More in my post [There is no ideal OS for a programmer]({% post_url 2016-10-31-no-ideal-os-for-programmer %}).

### Mix?
Material for a future post: a Linux VM used only as a server, accessed through a text terminal.
- Best performance
- Pure GNU/Linux
- All UIs from Windows (better tested!)
- Needs far more configuration: the VM, network, drive sharing, synchronization and exposing ports for testing from the host...

## An unfinished experiment
After two days I'm pleased with the results, but I'll still stick to raw Ubuntu on a separate drive ;).

Want to know more about this topic? Ask in the comments. Suggestions are welcome.
