---
layout: post
section-type: post
title: How Docker helps with a Jekyll setup
category: os
tags: [ 'windows', 'docker' ]
---
First, how hard the setup used to be, then what I use instead.

When I started this blog, setting up the environment took me about 6 hours: a new Linux VM, networking with the host and installing Jekyll...
It wasn't easy. Installing the latest Ruby with plugins from the official website failed with a misleading error message. The fix was a Ruby version manager with one particular Ruby version.
I'm not used to such magic on the JVM and Linux. Once it worked, I didn't dare touch it. But someday I would have to update it...

I also tried to set it up natively on Windows, but it isn't supported, so I gave up after an hour of struggling.

All in all, a long and unpredictable process. Today I used Docker instead. The Jekyll team maintains an image with the environment ready to use, and Docker takes care of networking and sharing directories.
From zero to a running blog in 30 minutes. No fear of breaking the setup or of updating it. The best of both worlds, backed by the Microsoft and Docker teams.

## Commands

Bash on Ubuntu on Windows:
- `cd /mnt/d/` - files edited from both sides have to live on a Windows drive. Windows tools must not touch files inside the Ubuntu on Windows file system.
- `git clone https://github.com/kastoestoramadus/personal-jekyll-theme.git blog` - the Docker image is a Linux image, so it expects Linux line endings. That's why I use Git from Bash on Ubuntu on Windows, and vim there to edit posts.
- `cd blog; git add *; git commit; git push origin master` - everything the container generates shows up here too.

PowerShell:
- `docker run -p 127.0.0.1:4000:4000 --rm --mount type=bind,source=D:\blog,target=/srv/jekyll -it jekyll/jekyll:3.3 bash` - the image takes less than 100 MB, while the VM took 10+ GB! `type=bind` makes file changes visible both ways.

In the container's bash:
- `jekyll serve` - builds the pages and starts a web server
- my theme's own commands: creating posts, regenerating tags etc.

Windows web browser:
- `http://localhost:4000` - the blog served from Docker

A great integration of three environments:
- Jekyll in Docker as the blog engine
- Bash on Ubuntu on Windows for editing and version control
- Windows as the host and the testing client (it could be used for editing too, with an editor that keeps Linux line endings)

## Issues
- You need to learn Bash on Ubuntu on Windows. It isn't hard and it's worth it. People used to install Cygwin; now a real Linux shell comes with Windows, and its integration and performance will get closer to native.
- You need to learn Docker. It helps in other projects too - nowadays a must-have.
- For now, Jekyll's auto-regeneration doesn't work: the container doesn't notice file changes made on the Windows side. Tight file system integration is hard, even more so because Linux file systems are superior to NTFS.
