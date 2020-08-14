---
layout: default
title: Journal
---

<h1>Journal</h1>

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "journal" %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
