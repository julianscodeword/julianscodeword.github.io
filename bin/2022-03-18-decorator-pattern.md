---
title:  "Let's re-decorate"
thumbnail: "web.jpg"
description: "A quick love letter to the decorator pattern."
---

It sounds weird, but I'll go ahead and say it: *I love the decorator pattern*. Ever since I read about it in the GoF's book all those years ago, it's rewired my way of thinking about software architecture. It goes hand in hand with favouring composition over inheritance and the idea that inheritance is a form of coupling. And yet, there's still plently of (class) inheritance going around.

To illustrate the idea, let's look at one of my recent projects. I'm writing an angular app that allows users to save writing in the cloud, which means I need to build a browser-based text editor. The library I'm using to manage formatting of documents does not provide a toolbar out of the box, and in my first cut, I implemented a simple toolbar that sits above the text area in the flow of the DOM.

That was all fine and functional, but I wanted something snazzier, something a bit like Medium's formatting toolbar (you know, the one that hovers over whatever you've just selected). In my angular application the toolbar and the editor are two separate components. This allows the toolbar to sit at the top level of the DOM and be have ultimate flexibility about where it's placed on the screen.

Communication between the editor and toolbar happens via a service, which is full of Observables that fire whenever some aspect of the editor's state changes. For instance, if I hover over the editor, it sends a message out to say that the editor has been activated. Let's roll with that particular example.

Let's call this new version "toolbar 2.0". Toolbar 2.0 need to become visible when it's 