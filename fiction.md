---
layout: default
title: Home
---

<h1>Journal</h1>

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "fiction" %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
