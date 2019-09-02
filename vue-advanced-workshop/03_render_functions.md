# 03 Render Functions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [03-01 Introducing Render Functions](#03-01-introducing-render-functions)
  - [Initial Render Process](#initial-render-process)
  - [2 different builds of Vue](#2-different-builds-of-vue)
- [03-02 Virtual DOM](#03-02-virtual-dom)
  - [native vs virtual DOM](#native-vs-virtual-dom)
    - [native vs virtual DOM - creating element](#native-vs-virtual-dom---creating-element)
    - [native vs virtual DOM - console logging](#native-vs-virtual-dom---console-logging)
- [03-03 Putting Everything Together](#03-03-putting-everything-together)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 03-01 Introducing Render Functions
[Introducing Render Functions Video](https://frontendmasters.com/courses/advanced-vue/introducing-render-functions/)
[Introducing Render Functions Intro Slide](https://docs.google.com/presentation/d/1TgDx4DN8YqfdndYWMovBcQVPWyKLTNcbo1YS8XlLo9o/edit#slide=id.g1e6824c3c2_0_25)

* the other half of the reactivity rendering system
* Vue templates are compiled into render function under the hood

### Initial Render Process 
A Template
* -> (compiled into) Render Function
* -> (returns) Virtual DOM
* -> (generates) Actual DOM

This is what happens inside the `autorun` function we made.
All of the component's data properties are collected as dependencies
of your component's render function.
Old & new DOM are compared and diffed and updated.

### 2 different builds of Vue 
If using vuecli to scaffold project with build step, 
pre-compile compiles the template into a render function, 
and what is shipped contains that, instead (pure JS)
* similar to ALT compilation in Angular
* saves runtime cost of doing compilation on the fly
* we can ship the runtime without the compiler

2 builds for Vue
* full build with compiler is 30 kb gzipped
* 20 kb gzipped if shipped without compiler

## 03-02 Virtual DOM
[VirtualDOM Video](https://frontendmasters.com/courses/advanced-vue/virtual-dom/)

### native vs virtual DOM

#### native vs virtual DOM - creating element
Actual DOM - `document.createElement(‘div’)`
Virtual DOM - `vm.$createElement(‘div’)`

#### native vs virtual DOM - console logging

**Actual DOM** - `[object HTMLDivElement]`
* underlying implementation is kind of heavy / expensive
* there is cost of translation between 

**Virtual DOM** - `{ tag: ‘div’, data: { attrs: {}, … }, children: [] }`
* it's just an POJO (cheap)
* it can have a list of `children` - tree of virtual nodes

Creating 1000 JS objects is cheap
Creating 1000 DOM Nodes is expensive

Virtual DOM - lightweight JS data format to represent what actual 
DOM should look like at a given point in time

Virtual DOM _is a way to get around the limitations of native DOM
so that you can get into a paradigm of composing what you want the 
DOM to look like_

Virtual DOM _decouples rendering logic from actual DOM - enables 
rendering capabilities for non-browser environments, 
e.g. server-side and native mobile rendering._

**Render Function** - a function that returns Virtual DOM

Vue Template Explorer - https://template-explorer.vuejs.org

## 03-03 Putting Everything Together
[Putting Everything Together Video](https://frontendmasters.com/courses/advanced-vue/putting-everything-together/)

See [Vue Docs - Reactivity - How Changes Are Tracked](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked)
* ![vue reactivity](./vue-advanced-workshop/assets/vue_reactivity.png)

* when it renders, we collect getters that access data dependencies
* watchers clean up the data
* then we generate the render function

Since we have a built-in dependency tree:
* we never over-render
* we never have too many components being re-rendered
* we don't have to do optimizations the way react does 
  "with more of a top down approach"

But:
* we do have the overhead of converting everything into getters & setters

