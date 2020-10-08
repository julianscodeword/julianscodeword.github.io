---
title:  "Angular Elements"
thumbnail: "angular.jpg"
description: "How to create reusable components in angular."
---

There's been a bit of [back](https://lea.verou.me/2020/09/the-failed-promise-of-web-components/) and [forth](https://medium.com/swlh/the-failed-criticism-of-web-components-ee94380f3552) recently about web components and how they've failed to live up to their promise of making web development easier and more accessible. I recommend reading the linked articles to get a feel for a flavour of the current sentiment.

That said, I think the intention behind web components—to allow developers to share reusable components—remains both useful and relevant. [Here's](https://css-tricks.com/an-introduction-to-web-components/) a good intro article on CSS tricks that gives a rundown of what they are and what they're used for.

Anyway, I'm not here to argue for or against. I just wanted to dive into a related offering called Angular Elements, added in Angular 6. This is Angular's answer to custom elements, and it gives us the ability to export angular components as custom elements.

I use WordPress a lot and while it's really awesome, I decided to use [Jekyll](jekyllrb.com) for the latest iteration of my website. Jekyll basically allows you to type up new blog posts in markdown and then it compiles them as necessary into a set of static pages. As long as you don't need dynamic content on your pages, it's pretty feature-rich. When combined with github pages, you don't need to fork out cash for any other hosting, and as long as you're happy without a personal domain, it all works nicely. I'll write some more on Jekyll and github pages down the track.

So, back to Angular Elements, why might you want it? It's going to be relevant if:

*  you're using another backend framework to manage your website, like Jekyll, or
*  you want to make your components reusable.

I'd like to touch on the basics of how you can get it up and running in your own Anguar projects.

## Working with an existing project

First up, you'll want to import the API via the Node CLI, and then add it to your angular project:

```bash
npm install -g @angular/cli
ng add @angular/elements
```

Let's take a look inside your project now. First of all, your components will need to have the `ShadowDom` view model. This is basically a way of isolating the CSS and JS associated with your component so that it doesn't interact with other parts of your web page. Next, we'll give the component selector a prefix. In my case, I've added an `x-` to the start of my component selector. This convention is used to distinguish custom components for standard HTML tags, like `div` and `section`. Custom element names must always be in kebab-case.

```typescript
@Component({
  selector: 'x-book',
   ...
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BookComponent { ... }
```

At this point, you may want to add slots to your component's template to allow external users of your component to customize certain content. In my example, I'm creating a book wrapper, so the slow allows users of my component to place their custom content inside the wrapper.

```HTML
<div class="wrapper">
	<slot name="content"></slot>
</div>
```

Once all of the components you want to export are ready, you'll need to update `app.module.ts` by adding your components to the list of `entryComponents` in the `NgModule` decorator, and then by defining each component in the `AppModule` constructor.

```typescript
@NgModule({
   ...
   entryComponents: [ BookComponent ]
})
export class AppModule {
   constructor(injector: Injector) {
      customElements.define('x-book', createCustomElement(BookComponent, { injector }));
   }  
}
```

And finally, you'll need to build angular into its `dist` directory. We do this with the `output-hashing` flag set to `none`, which basically says that we don't want any hash text to be appended to the name of our compiled assets.

```bash
ng build --prod --output-hashing none
```

## Some things to be aware of...

There are some pitfalls to be aware of through this whole process. I certainly stumbled a few times the first time I tried using Elements.

* You can use the `@HostBinding` decorator to apply classes to the outermost HTML tag, or apply CSS styles using the `:host` selector.
* You can't attach events to slots in your angular template.
* It can be useful to expose slots for components that use other libraries, like bootstrap. This circumvents the need to bring in those libraries within the angular module.
* Slot content will show up before it's been transposed, causing strange visual artifacts, especially on a slow connection. I explain below how you can avoid this.

## Importing your components

Once your components have been compiled into a single stylesheet and script file, you can bring them into another project. If you're setting up a build pipeline, and you want to see any changes to your angular components reflected immediately then I'd recommend setting up a symbolic link from the angular `dist` directory into your external application's assets directory.

```bash
ln -s ./angularapp/dist ./otherproject/assets/angular
```

Alternatively, you could just copy the output of the `dist` directory into your external application.

Next you'll need to reference the newly generated assets in your projects HTML. Add the angular stylesheet to the head section of your web page:

```html
<link rel="stylesheet" href="/assets/angular/styles.css">
```

And the following scripts at the end of your body content:

```html
<script src="/assets/angular/runtime.js" defer></script>
<script src="/assets/angular/polyfills.js" defer></script>
<script src="/assets/angular/main.js" defer></script>
```

## Reusing your components

Using your components in HTML is as easy as referencing any other HTML tag. Here's an example of how we might use the component from earlier:

```html
<x-book>
	<article slot="content">lorem ipsum...</article>
</x-book>
```

## How to avoid flashing of slot content

I found it necessary to add the following JavaScript and CSS to hide slot content before a custom component has been fully loaded:

```typescript
window
    .customElements
    .whenDefined("x-book")
    .then(() => {
        const xBooks = document.getElementsByTagName("x-book");

        if (xBooks.length > 0) {
            xBooks[0].className += " ready";
        }
    });
```

```css
x-book > * {
    opacity: 0;
    transition: opacity 500ms;
}

x-book.ready > * {
    opacity: 1;
}
```

And that's all there is to it. I hope you've enjoyed my quick rundown of Angular Elements and have fun playing around with exporting reusable components from your angular projects!