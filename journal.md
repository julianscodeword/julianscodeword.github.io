---
layout: default
title: Journal
---

<section class="entries">
  {% for post in site.posts %}
    {% if post.categories contains "journal" %}
      <section class="entry">
        <a href="{{ post.url }}" style="background-image: url('/assets/img/thumbnails/{{ post.thumbnail }}')" >
          <span class="title">{{ post.title }}</span>
          <span class="excerpt">{{ post.description }}</span>
        </a>
      </section>
    {% endif %}
  {% endfor %}
</section>
