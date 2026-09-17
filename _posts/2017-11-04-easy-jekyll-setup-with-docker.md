---
layout: post
section-type: post
title: How Docker helps with a Jekyll setup
category: os
tags: [ 'windows', 'docker' ]
---
First I'll describe how hard the setup was, and then what I used instead.

The first time I started this blog, I spent about 6 hours setting up the environment: a new Linux VM, networking with the host and installing Jekyll...
It wasn't easy. Installing the latest Ruby with plugins from the official website failed with a misleading error message. The fix was to use a Ruby version manager with a particular version.
I'm not used to such magic with the JVM and Linux. Since it worked, I tried not to touch it in case it broke. Someday I would need to update it...

I also tried to set it up natively on Windows, but it's not supported, so I gave up after an hour of struggling.

In summary, it was a long and unpredictable process. Today I used Docker. The Jekyll team maintains a ready image with the environment already set up! Networking and directory sharing are handled by Docker.
From zero you can use it in 30 minutes. No fear of breaking the engine or of updating it. The best of two worlds, supported by the Microsoft and Docker teams.

## Commands

Bash on Ubuntu on Windows:
- `cd /mnt/d/` - for two-way modifications I needed to use Windows locations. Windows users must not use the directories of Ubuntu on Windows.
- `git clone https://github.com/kastoestoramadus/personal-jekyll-theme.git blog` - the Docker image is a Linux image, so it uses Linux line endings. That's why I use Git from Bash on Ubuntu on Windows. I also use it for editing posts in vim.
- `cd blog; git add *; git commit; git push origin master` - all Docker effects are visible at this level.

PowerShell:
- `docker run -p 127.0.0.1:4000:4000 --rm --mount type=bind,source=D:\blog,target=/srv/jekyll -it jekyll/jekyll:3.3 bash` - the image takes less than 100 MB, while the VM took 10+ GB of space! `type=bind` makes file changes visible both ways.

In Docker bash:
- `jekyll serve` - builds the pages and starts a web server
- commands specific to my theme: creating posts, regenerating tags etc.

Windows web browser:
- `http://localhost:4000` - opens the blog served by Docker

What a great integration of three different environments!
- Jekyll in Docker as the blog engine
- Bash on Ubuntu on Windows as the editor and version control
- Windows as the host and testing client (it could also be used for editing, only support for Linux line endings is required)

## Issues
- You need to learn Bash on Ubuntu on Windows. It's not hard and it's worth it. Before it, people used Cygwin. Now it's free and already packaged with Windows. In the future, integration and performance will be native.
- You need to learn Docker. It's also very helpful in other projects - nowadays a must-have.
- For now, Jekyll auto-refresh on changes doesn't work... Tight file system integration is hard, even more so when Linux file systems are superior to NTFS.
