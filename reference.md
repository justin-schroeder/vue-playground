# Vue Reference


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vue Change Detection](#vue-change-detection)
- [Vue Animations](#vue-animations)
  - [Vue Animations - Transition Classes](#vue-animations---transition-classes)
    - [From Sara Drasner's Intro to Vue](#from-sara-drasners-intro-to-vue)
  - [Vue Animations - Transition Modes](#vue-animations---transition-modes)
    - [From Sara Drasner's Intro to Vue](#from-sara-drasners-intro-to-vue-1)
- [Vue Data](#vue-data)
- [Vue Directives](#vue-directives)
  - [Vue Directives - Custom](#vue-directives---custom)
    - [From Sara Drasner's Intro to Vue](#from-sara-drasners-intro-to-vue-2)
- [Vue Components](#vue-components)
  - [Vue Components - Dynamic](#vue-components---dynamic)
  - [Vue Components -  Functional](#vue-components----functional)
  - [Vue Components - Literal](#vue-components---literal)
- [Vue Plugins](#vue-plugins)
- [Vue Props](#vue-props)
- [Vue Reactivity](#vue-reactivity)
- [Vue Render Functions](#vue-render-functions)
- [Vue Size](#vue-size)
- [Vue `this`](#vue-this)
- [Vuex](#vuex)
  - [Veux - Map Actions](#veux---map-actions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Vue Change Detection
See [Vue Docs - How Changes Are Tracked](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked)
See [`vm.$watch(exprOrFn, callback, [options]`](https://vuejs.org/v2/api/#vm-watch)
  * see [02-02 Challenge 4: Writing a Simple Plugin](vue-advanced-workshop/02_writing_plugins.md#02-02-challenge-4-writing-a-simple-plugin)
    where I used this
  * Note, `callback` is passed the changed value

## Vue Animations

### Vue Animations - Transition Classes
These are applied to elements undergoing transitions with the `<transitions>` component.
`v-enter`, `v-enter-active`, `v-enter-to`, `v-leave`, `v-leave-active`, `v-leave-to`

#### From Sara Drasner's Intro to Vue
* See [Transitions > Transition Classes in the vue docs](https://vuejs.org/v2/guide/transitions.html#Transition-Classes)
* See Sarah Drasner's ball bouncing example in [06-02 CSS Animation ex2 - bouncing ball - excerpts](./sara_drasner_intro_to_vue/06_animations.md#06-02-css-animation-ex2---bouncing-ball---excerpts)

### Vue Animations - Transition Modes
This is for a common problem where thing A is fading out where thing B is fading in.
There are two modes, `in-out`, and `out-in`; you'll almost always use `out-in`, where an thing A goes away before thing A comes in.

#### From Sara Drasner's Intro to Vue
* See [Transitions > Transition Modes in the vue docs](https://vuejs.org/v2/guide/transitions.html#Transition-Modes)
* See Sarah Drasner's Replaing Comic Strip Example at [06-05 Transition Modes - ex1 - comic strip replacing](./sara_drasner_intro_to_vue/06_animations.md#06-05-transition-modes---ex1---comic-strip-replacing)

## Vue Data
[Vue Docs - `data`](https://vuejs.org/v2/api/#data)
* [_The Vue instance also proxies all the properties found on the data object, 
so `vm.a` will be equivalent to `vm.$data.a`_](https://vuejs.org/v2/api/#data)
* properties starting with `_` or `$` will not be proxied on the Vue instance
* _deep clone - `JSON.parse(JSON.stringify(vm.$data))`

## Vue Directives

### Vue Directives - Custom
* [(Vue Docs) Reusability & Componsition > Custom Directives > Intro](https://vuejs.org/v2/guide/custom-directive.html)

#### From Sara Drasner's Intro to Vue
* [07-03 Custom Directives](./sara_drasner_intro_to_vue/07_filters_mixins_directives.md#07-03-custom-directives)
* [07-05 Challenge 6 - Filter - Solution - Directives Notes After Working Through](./sara_drasner_intro_to_vue/07_filters_mixins_directives.md#07-05-challenge-6---filter---solution---directives-notes-after-working-through)

## Vue Components

### Vue Components - Dynamic
* See [Vue Docs - "dynamic" components `<component is="h1"></component>`](https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components)
* See [vue-advanced-workshop - 03-06 Challenge 5: Dynamically Render Tags](vue-advanced-workshop/03_render_functions.md#03-06-challenge-5-dynamically-render-tags)

### Vue Components -  Functional
* See [03-09 Challenge 6: Dynamically Render Components - Solution](vue-advanced-workshop/03_render_functions.md#03-09-challenge-6-dynamically-render-components---solution)

### Vue Components - Literal
You can declare components you want to use inside the `components` hash;
this is easy for small components.
* See [04-03 Challenge 8: Passing Props Solution](vue-advanced-workshop/04_state_management.md#04-03-challenge-8-passing-props-solution)

## Vue Graphql
[Gridsome](https://gridsome.org)

## Vue Plugins

* [Vue Docs - Plugins](https://vuejs.org/v2/guide/plugins.html)
* [Vue Docs - Global Mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin)
* [Vue Docs - vm.$options](https://vuejs.org/v2/api/#vm-options)

* See [02-01 Introducing Writing Plugins](02_writing_plugins.md#02-01-introducing-writing-plugins)

## Vue Props
* [Vue Docs - Passing a Boolean Prop](https://vuejs.org/v2/guide/components-props.html#Passing-a-Boolean)
* See [#challenge-6-progress](vue-advanced-workshop/03_render_functions.md#challenge-6-progress)

### Vue Props - `v-bind` a whole item
* https://twitter.com/calebporzio/status/1034846966730158080
* https://www.carlcassar.com/prop-destructuring-in-vue-js
* https://vuejs.org/v2/guide/components-props.html#Passing-the-Properties-of-an-Object

## Vue Reactivity
* [Vue Docs - Reactivity - How Changes Are Tracked](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked)
  ![vue reactivity](./vue-advanced-workshop/assets/vue_reactivity.png)
  * see also [Vue Advanced Workshop - 03-03 Putting Everything Together](./vue-advanced-workshop/03_render_functions.md#03-03-putting-everything-together)
 
## Vue Render Functions
* [Vue Docs - render functions](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments)
* See [vue-advanced-workshop - 03-06 Challenge 5: Dynamically Render Tags](vue-advanced-workshop/03_render_functions.md#03-06-challenge-5-dynamically-render-tags)

## Vue Slots

### Vue Slots - Real World Examples
From [Vue Docs - Slots - Other Examples](https://vuejs.org/v2/guide/components-slots.html#Other-Examples)
* [Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller)
* [Vue Promised](https://github.com/posva/vue-promised)
* [Portal Vue](https://github.com/LinusBorg/portal-vue)

## Vue Size
2 builds for Vue
* full build with compiler is 30 kb gzipped
* 20 kb gzipped if shipped without compiler
* see [03-01 Introducing Render Functions](./vue-advanced-workshop/03_render_functions.md#03-01-introducing-render-functions)

## Vue `this`

[_within Vue components, this should always refer to the Vue instance_](https://blog.logrocket.com/cleaning-up-your-vue-js-code-with-es6/)
* I can't find this documented anywhere

## Vuex
[Vue Docs: Veux](https://vuex.vuejs.org/guide/)

### Veux - Map Actions
* [`mapActions` helper (Vue Docs)](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components)
* [08-01 Intro to Veux - `mapActions`](./sara_drasner_intro_to_vue/08_veux.md#08-01-intro-to-veux---mapactions)
