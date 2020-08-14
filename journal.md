---
layout: default
title: Journal
---

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "journal" %}
      <li>
        <a href="/assets/img/thumbnails/{{ post.url }}">
          <img src="{{ post.thumbnail }}" />
          {{ post.title }}
        </a>
      </li>
    {% endif %}
  {% endfor %}
</ul>
