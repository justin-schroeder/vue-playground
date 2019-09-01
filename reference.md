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
- [Vue Directives](#vue-directives)
  - [Vue Directives - Custom](#vue-directives---custom)
    - [From Sara Drasner's Intro to Vue](#from-sara-drasners-intro-to-vue-2)
- [Vue Plugins](#vue-plugins)
- [Vuex](#vuex)
  - [Veux - Map Actions](#veux---map-actions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Vue Change Detection
See [Vue Docs - How Changes Are Tracked](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked)
See [`vm.$watch(exprOrFn, callback, [options]`](https://vuejs.org/v2/api/#vm-watch)
  * see [02-02 Challenge 4: Writing a Simple Plugin](vue-advanced-workshop/02_writing_plugins.md#02-02-challenge-4-writing-a-simple-plugin)
    where I used this

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

## Vue Directives

### Vue Directives - Custom
* [(Vue Docs) Reusability & Componsition > Custom Directives > Intro](https://vuejs.org/v2/guide/custom-directive.html)

#### From Sara Drasner's Intro to Vue
* [07-03 Custom Directives](./sara_drasner_intro_to_vue/07_filters_mixins_directives.md#07-03-custom-directives)
* [07-05 Challenge 6 - Filter - Solution - Directives Notes After Working Through](./sara_drasner_intro_to_vue/07_filters_mixins_directives.md#07-05-challenge-6---filter---solution---directives-notes-after-working-through)

## Vue Plugins

* [Vue Docs - Plugins](https://vuejs.org/v2/guide/plugins.html)
* [Vue Docs - Global Mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin)
* [Vue Docs - vm.$options](https://vuejs.org/v2/api/#vm-options)

* See [02-01 Introducing Writing Plugins](02_writing_plugins.md#02-01-introducing-writing-plugins)

## Vuex

### Veux - Map Actions
* [`mapActions` helper (Vue Docs)](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components)
* [08-01 Intro to Veux - `mapActions`](./sara_drasner_intro_to_vue/08_veux.md#08-01-intro-to-veux---mapactions)
