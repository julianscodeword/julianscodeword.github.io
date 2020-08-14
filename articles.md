---
layout: group
title: Articles
---

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "articles" %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
