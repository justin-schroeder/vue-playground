# 03 Render Functions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [03-01 Introducing Render Functions](#03-01-introducing-render-functions)
  - [Initial Render](#initial-render)

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

