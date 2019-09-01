# 02 Writing Plugins


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [02-01 Introducing Writing Plugins](#02-01-introducing-writing-plugins)
- [02-02 Challenge 4: Writing a Simple Plugin](#02-02-challenge-4-writing-a-simple-plugin)
  - [my notes while solving](#my-notes-while-solving)
- [02-03 Challenge 4: Simple Plugin Solution](#02-03-challenge-4-simple-plugin-solution)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 02-01 Introducing Writing Plugins
[Introducing Writing Plugins Video](https://frontendmasters.com/courses/advanced-vue/introducing-writing-plugins/)
* [Vue Docs - Plugins](https://vuejs.org/v2/guide/plugins.html)
* [Vue Docs - Global Mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin)
* [Vue Docs - vm.$options](https://vuejs.org/v2/api/#vm-options)

```javascript
function (Vue, options) {
  // … plugin code
}
```

`Vue.mixin(options)`

* if you want to apply global functionality to your vue app, you 
  would use mixins.
* plugins are deduped. 
  * always wrap mixins in a plugin, that's a best practice

* `this.$options` is on every component and contains merged options
  * contains custom options you have added to the component, too
  
## 02-02 Challenge 4: Writing a Simple Plugin
[Challenge 4: Writing a Simple Plugin Video](https:// frontendmasters.com/courses/advanced-vue/challenge-4-writing-a-simple-plugin/)
[2.1.md](./code/2-plugin/2.1.md)
The basic task is to make a plugin which uses a mixin that jacks into the 
`created` lifecycle hook and makes something which looks for a `rules`
key in the component options.

### my notes while solving
* should I use [`vm.$on(event, callback)`](https://vuejs.org/v2/api/#vm-on)?
  * no, that's for dom events
* my first try was to create `computed.isValid-[propname]` which console logged
  when not valid. 
  * I think that could have worked, but I didn't get it right, because of 
    this / that, deeply nested stuff, and using `that.options` instead of 
    `that.$options`, etc.
* I did eventually get it too work, after reading the API docs for 
  [`vm.$watch(exprOrFn, callback, [options]`](https://vuejs.org/v2/api/#vm-watch) 

## 02-03 Challenge 4: Simple Plugin Solution
[Challenge 4: Simple Plugin Solution Video](https://frontendmasters.com/courses/advanced-vue/challenge-4-solution/)
* he uses `this.$watch`
* note, he doesn't switch `this` and `that` like I did - let's try it his way
