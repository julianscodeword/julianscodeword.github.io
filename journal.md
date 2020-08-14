---
layout: default
title: Journal
---

<section class="entries">
  {% for post in site.posts %}
    {% if post.categories contains "journal" %}
      <section class="entry" style="background-image: url('/assets/img/thumbnails/{{ post.thumbnail }}')">
        <a class="link" href="{{ post.url }}" >
          <span class="title">{{ post.title }}</span>
          <span class="description">{{ post.description }}</span>
          <span class="date">{{ post.date | date: '%B %d, %Y' }}</span>
        </a>
      </section>
    {% endif %}
  {% endfor %}
</section>
