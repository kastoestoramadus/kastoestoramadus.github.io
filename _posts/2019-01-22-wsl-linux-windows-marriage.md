---
layout: post
section-type: post
title: MS WSL, Hyper-V and Docker - after few days of use
category: os
tags: [ 'vm', 'linux', 'windows', 'docker' ]
---


![Linux and Windows together](https://fossbytes.com/wp-content/uploads/2016/11/windows-linux.jpg)

With a new contract, I had a chance to prepare a full Windows environment for Scala project development. Blog post contains pros and cons without final thoughts.

# Why MS OS?
- MS has changed severely since they realized they have new and strong competition.
- Docker is very well integrated - local ports and disk space.
- Hyper-V comes for free with Windows 10 Pro. It's a type 1 hypervisor with lower CPU overhead than VBox and VMware (type 2). VMware licence is more expensive than Win 10 Pro.
- Drivers work. Trackpoint on Ubuntu sucks (ThinkPad W540) and the fingerprint scanner breaks regularly.
- Shortly the clipboard manager and sandbox will be added to Win 10.
- AcrossCentre, Logichtec Flow, Cortana, DirectX etc. aren't present on Ubuntu.

Windows is made for good UI while Linux/GNU for being a server. Both suck in the opposite category. Why not combine the best of both worlds?

# Needs
- git management,
- IDE like IntelliJ Idea,
- sbt and other build tools,
- running services locally,
- testing locally,

# Options :
## VM on Hyper-V
Why not have everything in a VM? 

**Pros:**
- availability of MS drivers and some software.
- using MS battery management.
- mouse movement is smooth. They've implemented RDP for Linux!
- from my observation, the CPU overhead is below 2%.
- Drive Passthrough works! NTFS won't slow you down (no checkpoints of VMs).

**Cons**:
- high memory consumption, 32GB is a nice to have
- lack of good 2D acceleration by GPU. Although Linux is a First Class Citizen on Windows, RemoteFX still isn't implemented for Linux guests and GPU Passthrough works only on Windows Server. 

Microsoft, please allow the GPU passthrough!

## WSL + Docker
[Windows for Linux subsystem](https://docs.microsoft.com/en-us/windows/wsl/faq) - full Linux OS in a Windows window served by a MS Kernel. 

**Pros:**
- very low memory footprint,
- normal bash (Unix ssh!) which may be set as the main terminal at IDE,
- uses the same ports and disk space as host(-ish). Great interoperability between MS and GNU tools.
- so much just works!
- by playing with aliases you may use your Windows Docker as normal Ubuntu Docker Client! All windows terminal commands are available by adding `.exe`

**Cons:**
- High execution overhead - a scale of 20% losses in comparision to raw Ubuntu (measured on compiling akka repo). The loss is probably related to IO performance).
- Ivy artefacts and RSA Keys need sync or reconfiguration of where they are stored. By default everything linux-ish is installed and configured in the protected zone.
- IDE still builds separately with Windows tools so one needs to plan additionally how to share products and resources.
- Docker sometimes needs to be restarted...
- Not everything works. Adding GPG for a repo needed a [workaround](https://github.com/Microsoft/WSL/issues/3286#issuecomment-402594992)...

## Raw Windows?
Cons:
- PowerShell: unable to pass arguments to sbt... [link](https://stackoverflow.com/questions/54400669/sbt-and-command-line-parameters-in-powershell-problem)
- poor built-in package manager
- check my "There is no ideal OS for a programmer" post for more about it

## Mix?
For future blog post: Linux VM only as a server with access by a text terminal.
- best performance,
- pure GNI/Linux,
- all UIs from Windows (better tested!),
- needs far more configuration of VM, network, drive sharing, synchronization and exposing ports for testing from the host...

# An Unfinished experiment
Two days passed and I'm pleased with the results but I'll still stick to raw Ubuntu on separate drive ;).

Want to know more about this topic? Ask for in the comments, please. Suggestions are welcome.
