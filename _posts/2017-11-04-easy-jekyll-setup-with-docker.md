---
layout: post
section-type: post
title: How docker helps with jekyll setup 
category: os
tags: [ 'windows', 'docker' ]
---
Firsly I'll describe how hard it was and later what was used instead.

First time I started the blog I spend about 6 hours to setup the environment. New VM Linux machine, networking with the host and installing the Jekyll... 
It wasn't easy. Installing latest Ruby with plugins from official website failed with a misleading error message. A fix was to use a Ruby's build manager with the particular version. 
I am not used to such magic with JVM and Linux. Since it works I try not to touch it just in case it'll break. Someday I would need to update it...

I tried also to set it up on Windows natively but it is not supported so I quit after an hour of struggling. 

In summary, it was unpredictive and long process. Today I've used docker. Jekyl team maintains a ready image with already set environment! Networking and sharing dirs is already done by Docker.
 From zero you can use it in 30 minutes. No fear of breaking the engine, nor to update it. Best of two worlds supported by Microsoft and Docker team.

Commands:

Bash on Ubuntu on Windows:
- `cd /mnt/d/`, for two way modifications I needed to use windows locations. Windows user must not use dirs of Ubuntu on Windows
- `git clone https://github.com/kastoestoramadus/personal-jekyll-theme.git blog`, Docker image is a Linux image so it uses Linux line endings. That's why I use Git from Bash on Ubuntu on Windows. I also use it for vim post editing.
- `cd blog; git add *; git commit; git push origin master`, all docker effects are visible on this level. 

PowerShell:
- `docker run -p 127.0.0.1:4000:4000 --rm --mount type=bind,source=D:\blog,target=/srv/jekyll -it jekyll/jekyll:3.3 bash`, image takes less than 100MB while VM took 10+GB of space! type=bind makes the file changes visible in two ways.

In Docker bash:
- `jekyll serve`, creates pages and starts web server
- specific to my theme commands. ~create posts, ~regenerate tags etc.

Windows web browser:
- `http://localhost:4000`, opens a blog served by docker

What a great integration of three different environments!
- Jekyll on docker as blog engine,
- Bash on Ubuntu on Windows as editor and version manager,
- Windows as a host and testing client (could be also for editing, only support for Linux line ending is required).

Issues:
- need to learn Bash on Ubuntu on Windows. Not hard and is worth it. Before it people used Cygwin. Now it is for free and already packaged with Windows. In future integrations and performance will be native.
- need to learn Docker. Also very helpful in other projects. Nowadays a must have.
- For now, the Jekyll auto refresh on changes doesn't work... So tight filesystem integrations are hard, even more, when Linux file systems are superior to NTFS.