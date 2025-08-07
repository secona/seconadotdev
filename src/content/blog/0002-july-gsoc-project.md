---
title: "July GSoC Progress"
description: ""
publishedAt: "2025-08-08"
tags: ["gsoc", "gsoc-2025"]
slug: "july-gsoc-project"
show: true
---

It has been two months since my [first post](hello-world). I know I mentioned that I will be posting regular updates. In reality, working on a project and blogging it is surprisingly difficult. Not to mention, my project is mostly experimentation so I don't really have something to share until I have clear results to share. Considering the GSoC midterm was a few weeks ago, I feel like this is a good time to blog about my progress.

## The First Steps

The first few steps are always the hardest. My first step was [PR number 11](https://github.com/crate-ci/cargo-plumbing/pull/11). In short, the PR implemented the first plumbing command, `locate-manifest`. The PR took quite a while to merge because we were laying the ground work! On top of that, it was the first time I had ever contributed to a cargo-related project! This meant I was also figuring out what to do and what not to do. In the end, I got my bearings and pushed through!

## Understanding Cargo Internals

I picked this project for GSoC knowing full well that I'd need a deep understanding of cargo internals to work on it. This was actually why I picked this project, I wanted to know how cargo works!

Suffice to say, I underestimated how complex cargo can be. Even something like workspaces that seem "simple" have very complex internal logic. It took me probably three weeks to have a basic grasp of how cargo works. I spent many days reading the source code and tracing the calls. I also joined cargo office hours to ask further details that I didn't fully grasp. Even now, after weeks, I still don't fully understand how cargo works.

> **TIP**: I suggest using the [`CARGO_LOG` environment variable](https://doc.rust-lang.org/cargo/reference/environment-variables.html) to figure out how cargo works.

## The Plumbing Commands Themselves

A progress report wouldn't be complete without discussing the commands themselves. As of writing, we have **five** plumbing commands! They are `locate-manifest`, `read-manifest`, `read-lockfile`, `lock-dependencies`, and `write-lockfile`. To make this progress update simpler, I'd like to separate the commands into two categories: manifest commands and lockfile commands.

The plumbing commands work by using messages to communicate. These messages are inputted/outputted in the form of jsonlines. Currently, the messages are defined per command. We have ideas to combine the messages into one big enum, though personally I prefer going with message per lockfile first. My motivation behind it is experimenting if message per lockfile is useful or not. And if it isn't useful, we can simply merge them together into one big enum. Combining messages is also easier than splitting messages :)

### Manifest Commands

The manifest commands are mostly done! The commands already do what their names suggest. That being said, there are [bugs](https://github.com/crate-ci/cargo-plumbing/issues/61) that I am now noticing, and now that my knowledge of cargo internals has improved, I have some ideas for improvement. I remember implementing manifest commands to be pretty difficult. Now, looking back, it shouldn't have been _that_ difficult. Perhaps because I was also figuring out how cargo works so there was additional work.

### Lockfile Commands

So far, this has been the most challenging aspect of working on cargo-plumbing. Mostly because lockfile implementation in cargo is opaque and not designed for external modification. That being said, the lockfile commands are doing great! They're not mostly done like manifest commands, but they can do what their names suggest! Some functionality, such as reading lockfiles for `lock-dependencies`, hasn't been implemented.

### Next Steps

Cargo plumbing still has a long way to go. The upcoming plumbing commands will be challenging to implement, mostly because it may need changes to the cargo repository itself. My work now is focused on the next plumbing command: `resolve-features`.

## Final Thoughts

I am very excited to continue working on this project. Working on cargo plumbing was a humbling reminder of how much I still have to learn. Big thanks to the Rust project and GSoC for giving me this opportunity. Also, a big thanks to Cassaundra and Ed Page who have helped me a lot on getting started.
