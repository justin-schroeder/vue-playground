# 07 Filters, Mixins, & Custom Directives
[07 Filters, Mixins, & Custom Directives - Video](https://frontendmasters.com/courses/vue/filters/)
[07 Filters, Mixins, & Custom Directives - Slides](http://slides.com/sdrasner/intro-to-vue-6?token=fcL8qgTg#/)
* password: `!vue!`
[Sara's Intro to Vue Repo on Github](https://github.com/sdras/intro-to-vue)


## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Filters](#filters)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 07-01 Filters
[07 Filters - Video](https://frontendmasters.com/courses/vue/filters/)
[07 Filters - Slides](http://slides.com/sdrasner/intro-to-vue-6?token=fcL8qgTg#/1)

> They aren't replacements for methods, computed values, or watchers, 
> because filters don't transform the data, **just the output that 
> the user sees.**

Filters are for making small tweaks.

### 07-01 Filters - how to create
There are two ways to "register" filters - global and local

```javascript
//global
Vue.filter('filterName', function(value) {
  return // thing to transform
});
 
//locally, like methods or computed inside components
filters: {
  filterName(value) {
    return // thing to transform
  }
}
```

Use it like: `{{ text | capitalize }}`


### 07-01 Filters - example tip calculator filter
[Codepen Demo](http://slides.com/sdrasner/intro-to-vue-6?token=fcL8qgTg#/6)

See it in template below: `{{ customer1total | tip15 }}`
See it in script below: `filters.tip15` key

```vue
<template>
  <div id="app">
    <h2>Tip Calculator</h2>
    <p><strong>Total: {{ customer1total }}</strong></p>
    <p>15%: {{ customer1total | tip15 }}</p>
    ...
  </div>
</template>
<script>
export default new Vue({
  el: '#app',
  data() {
    return {
      customer1total: 35.43    
    }
  },
  filters: {
    tip15(value) {
      return (value*.15).toFixed(2)
    },
    // ...
  }
});
</script>
```

### 07-01 Filters - purpose
Similar to computed values, but different: 
* filters are strictly presentational
* √ so when do we use computed values vs filters?
  * Vue now calls them computed properties
  * See [Vue Docs - Computed Properties and Watchers](https://vuejs.org/v2/guide/computed.html)
  * one answer comes from SO - 2017 - [_What is the difference between filters and methods in vue.js?_](https://stackoverflow.com/questions/47940007/what-is-the-difference-between-filters-and-methods-in-vue-js)
    * **computed property** 
      * declared inside the `computed` key 
      * [_"computed properties are cached based on their reactive dependencies"_](https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods)
      * *pros*: it gets calculated & cached when property changes
      * *cons*: you wind up with duplicated code if you have a transformation to apply to more than one property
    * **methods**
      * declared inside of the `methods` key
      * *pros*: always up to date; never cached
      * *cons*: inefficient
    * **filters**
      * declared inside of the `filters` key
      * *pros*: you can use same filter on more than one data source
      * *cons*: 
        * basically the same as methods except for how they are called
        * result is never cached
        * it can lead to complex template logic if piping a lot
    * **watchers**
      * declared inside of the `watch` key
      * _"when you want to perform asynchronous or expensive operations in response to changing data."_
      * **√ when do you use a watcher vs a computed property?**
        * answer: when you have an expensive operation like an ajax request
          that you only want to execute when an input variable changes
        * [Vue Docs say this about watchers](https://vuejs.org/v2/guide/computed.html#Watchers): 
          > using the `watch` option allows us to perform an asynchronous 
          > operation (accessing an API), limit how often we perform that 
          > operation, and set intermediary states until we get a final answer. 
          > None of that would be possible with a computed property.
        * Why would none of that be possible with a computed property?
          * I think it's possible, it's just not what they designed computed property for
          * I'm getting the sense that they created `computed` first and added `watch` later


√ This variety is a great example of what I can't stand about Vue
* So many custom vocabulary terms to memorize
* Huge API surface area, with duplicated ways of doing things 
  that differ in subtle ways only understandable with Vue-specific expertise


### 07-01 Filters - chaining
you can chain them: 
`{{ data | filterA | filterB }}`

[codepen example of chaining filters](http://slides.com/sdrasner/intro-to-vue-6?token=fcL8qgTg#/7)


### 07-01 Filters - passing arguments
When you define them, arguments are passed after the value: 
```javascript
new Vue({
  // ... 
  // arguments are passed in order after the value
  filters: {
    filterName(value, arg1, arg2) {
      return //thing to transform
    }
  }
})
```

Here's how you call with args:
[`{{ data | filterName(arg1, arg2) }}`](http://slides.com/sdrasner/intro-to-vue-6?token=fcL8qgTg#/8)


### 07-01 Filters - better to use computed for expensive transformations
it's better to use `computed` than `filter` for expensive transformations:
* `computed` reacts to value changes and caches the value
* `filter` computes every time


### 07-01 Filters - √ takeaways
* you could make a filter library with currency prepending based on localization
* use it when you need to reuse a transformation across different data attributes


