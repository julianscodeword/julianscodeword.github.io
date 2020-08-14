---
layout: default
title: Fiction
---

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "fiction" %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
