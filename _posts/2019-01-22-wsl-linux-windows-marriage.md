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
- MS has changed severely since realized their new and strong competition.
- Docker is very well integrated - local ports and disk space.
- Hyper-V is given for free with the Windows 10 Pro. It's a type 1 hypervisor with lower CPU overhead than at VBox and VMware (type 2). VMware licence is more expensive than Win 10 Pro.
- Drivers work. Trackpoint on Ubuntu sucks (ThinkPad W540) and the thinger-print scanner breaks regularly.
- AcrossCentre, Logichtec Flow, Cortana, DirectX etc. aren't present on Ubuntu.

Windows is made for good UI while Linux/GNU for being a server. Both suck in the opponent's category. Why not combine the best of both worlds?

# Needs
- git management,
- IDE like IntelliJ Idea,
- sbt and other build tools,
- running services locally,
- testing locally,

# Options :
## VM on Hyper-V
Why not to have everything in a VM? 

**Pros:**
- an advantage of MS drivers and some software,
- an advantage of MS battery management,
- mouse movement is smooth. They've implemented RDP for Linux!
- from my comparison, the CPU overhead is below 2%.
- Drive Passthrough works! NTFS won't slow you down (no checkpoints of VMs).

**Cons**:
- high memory consumption, 32GB is to nice have
- lack of good 2D acceleration by GPU. Despite Linux is a First Class Citizen on Windows still, RemoteFX isn't implemented for Linux guests and GPU Passthrough works only on Windows Server. 

Microsoft, please allow the GPU passthrough!

## WSL + Docker
Windows for Linux subsystem - full Linux OS in a Windows window served by a MS Kernel. 

**Pros:**
- very low memory footprint,
- normal bash (Unix ssh!) which may be set as the main terminal at IDE,
- uses the same ports and disk space as host(-ish). Great interoperability between MS and GNU tools.
- so much just works!
- by playing with aliases you may use your Windows Docker as normal Ubuntu Docker Client! All windows terminal commands are available by adding `.exe`

**Cons:**
- High CPU overhead - a scale of 20% losses.
- Ivy artefacts and RSA Keys need sync or reconfiguration of where are stored. By default everything linux-ish is install and configured in the protected zone.
- IDE still builds separately with Windows tools so need to plan additionally how to share products and resources.
- Docker sometimes needs to be restarted...
- Not everything works. Adding GPG for a repo needed a workaround...

## Raw Windows?
Cons:
- PowerShell: unable to pass arguments to sbt... [link](https://stackoverflow.com/questions/54130521/sbt-and-command-line-parameters-in-powershell-problem?noredirect=1)
- poor package management
- too much too write... check my "There is no ideal OS for a programmer" post

## Mix?
For future blog post: Linux VM only as a server with access by a text terminal.
- best performance,
- pure GNI/Linux,
- all UIs from Windows (better tested!),
- needs far more configuration of VM, network, drive sharing, synchronization and exposing ports for testing from the host...

# An Unfinished experiment
Two days passed and I'm pleased with the results but I'll still stick to raw Ubuntu on separate drive ;).

Want to know more about this topic? Ask for in the comments, please. Suggestions are welcome.
