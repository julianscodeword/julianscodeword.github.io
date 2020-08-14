---
layout: base
class: content
---

{% include before-content.html %}
<main class="main">
    <x-book>
        <span slot="left"><i class="icon fa fa-arrow-circle-left"></i></span>
        <span slot='right'><i class="icon fa fa-arrow-circle-right"></i></span>
        <span slot="content">{{ content }}</span>
    </x-book>
</main>
{% include after-content.html %}
