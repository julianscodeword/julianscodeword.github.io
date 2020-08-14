---
layout: group
title: Guides
---

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "guides" %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
