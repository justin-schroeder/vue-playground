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
- [03-04 JSX vs. Templates](#03-04-jsx-vs-templates)
- [03-05 Render Function API](#03-05-render-function-api)
  - [The `h` function](#the-h-function)
  - [`h` can directly render a component](#h-can-directly-render-a-component)
- [03-06 Challenge 5: Dynamically Render Tags](#03-06-challenge-5-dynamically-render-tags)
  - [03-06 Challenge 5: Dynamically Render Tags - Progress](#03-06-challenge-5-dynamically-render-tags---progress)
- [03-07 Challenge 5: Dynamically Render Tags - Solution](#03-07-challenge-5-dynamically-render-tags---solution)
- [03-08 Challenge 6: Dynamically Render Components](#03-08-challenge-6-dynamically-render-components)
  - [Challenge Description](#challenge-description)
  - [Challenge 6 progress](#challenge-6-progress)
- [03-09 Challenge 6: Dynamically Render Components - Solution](#03-09-challenge-6-dynamically-render-components---solution)
- [03-10 Challenge 7: Higher-Order Components](#03-10-challenge-7-higher-order-components)
- [03-11 Q&A: Higher Order Components](#03-11-qa-higher-order-components)
- [03-12 Challenge 7: Solution](#03-12-challenge-7-solution)

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

## 03-04 JSX vs. Templates
[JSX vs. Templates Video](https://frontendmasters.com/courses/advanced-vue/jsx-vs-templates/)
* both templates and render functions are a way to 
* templates are a more constrained form of expression
* JSX is more dynamic. As long as you can write in code, you can do it.
  * that gets rid of the need to invent a rich syntax
* templates are parseable by any html parser
* the static nature of templates "leads itself to optimizations"
  that "you can't with JSX"
* you can "drop down" to the render function layer when you need
  the flexibility

## 03-05 Render Function API
[Render Function API Video](https://frontendmasters.com/courses/advanced-vue/render-function-api/)

```javascript
export default {
  render (h) {
    return h('div', {}, [
      // ...
    ])
  }
}
```

There are many different implementations of DOM in js.
[`hyperscript`](https://github.com/hyperhype/hyperscript) is a library 
for creating hypertext, and it uses `h` by convention, so Vue follows it.


### The `h` function
Basic Invocation
`h('div', 'some text)`

Class and style get special treatment because of convenience support
`h('div', {class: 'foo'}, 'some text')`

Adding children
`h('div', {...}, [ 'some text', h('span', 'bar')])`

### `h` can directly render a component

```javascript
import MyComponent from '...'

h(MyComponent, {
  props: { /*…*/ }
})
```

√ is `hyperscript` used directly in Vue?
* I only saw [one reference to `hyperscript` in the Vue repo here](https://github.com/vuejs/vue/blob/v2.6.10/test/unit/features/ref.spec.js#L55)
  in the unit tests, testing that `h` can directly render a component
  * this is a "lesser known feature"  

See [Vue Docs - The Data Object In-Depth](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)
* contains data printout of a VDOM node 

## 03-06 Challenge 5: Dynamically Render Tags
[Challenge 5 Video](https://frontendmasters.com/courses/advanced-vue/challenge-5-dynamically-render-tags/)
[3.1 description](./code/3-render-function/3.1.md)
[3.1 implementation](./code/3-render-function/3.1-render-tags.html)
[3.1 test](./code/3-render-function/__test__/3.1.test.js)

implement `example`:
``` html
<example :tags="['h1', 'h2', 'h3']"></example>
```

such that this produces:
``` html
<div>
  <h1>0</h1>
  <h2>1</h2>
  <h3>2</h3>
</div>
```

See [Vue Docs - "dynamic" components `<component is="h1"></component>`](https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components)
* intention is to switch between components instead of "real" tags though

> [if Vue didn't provide this API, there's no way to dynamically swich 
> between components](./transcripts/14-challenge-5-dynamically-render-tags.md#000154)
> an interesting disadvantage of the template, is that we have to come up with a 
> lot of these syntax APIs, in order to solve some use cases.

### 03-06 Challenge 5: Dynamically Render Tags - Progress
In this example: 

``` html
<example :tags="['h1', 'h2', 'h3']"></example>
```

we have `v-bind:tags="['h1', 'h2', 'h3']"`. This means that if we had a 
`data` prop with `tags`, it would reactively bind `['h1', 'h2', 'h3']`
to it.

The output should look like this: 
``` html
<div>
  <h1>0</h1>
  <h2>1</h2>
  <h3>2</h3>
</div>
```

So first, we need to create a wrapper div. My first naive impementation: 

```vue
<div id="app">
    <example :tags="['h1', 'h2', 'h3']"></example>
</div>

<script>
  Vue.component('example', {
    render: function(createElement) {
      return createElement('div', null, [
        createElement('h1', null, 0),
        createElement('h1', null, 1),
        createElement('h1', null, 2),
      ])
    }
  })

  new Vue({el: '#app'})
</script>
```

This ends up with error: 
```text
console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
    Error: Uncaught [Error: expect(received).toMatch(expected)
    
    Expected substring: "<div><h1>0</h1><h2>1</h2><h3>2</h3></div>"
    Received string:    "<div tags=\"h1,h2,h3\"><h1>0</h1><h1>1</h1><h1>2</h1></div>"]

```
So this is interesting - it's pretty close, it just left the `tags` key in, 
and we're expected to not include that. 

Ok, I had to iterate, but I figured this out. 
The key was that `<example :tags="['h1', 'h2', 'h3']"></example>` was implying props.
I still find it hard to know exactly what `:blah` is referring to.
Props don't normally need the colon in front, as far as I know. 

Here's the basic solution: 
```Vue
<div id="app">
    <example :tags="['h1', 'h2', 'h3']"></example>
</div>

<script>
  Vue.component('example', {
    props: ['tags'],
    render: function(createElement) {
      const children = this.$props.tags.map((prop, i) => createElement(prop, null, i))
      return createElement('div', null, children)
    }
  })

  new Vue({el: '#app'})
</script>
```

Note how the first param to `createElement` is the name of the tag, which can be dynamic.


## 03-07 Challenge 5: Dynamically Render Tags - Solution
[Challenge 5 Solution](https://frontendmasters.com/courses/advanced-vue/challenge-5-solution/)
* main differences between my implementation and his: 
  * he uses the `h` parameter name instead of `createElement`
  * he uses es6 object shorthand for method.

## 03-08 Challenge 6: Dynamically Render Components

### Challenge Description
[Challenge 6 - Dynamically Render Components - Intro - Video](https://frontendmasters.com/courses/advanced-vue/challenge-6-dynamically-render-components/)
[3.2 description](./code/3-render-function/3.2.md)
[3.2 implementation](./code/3-render-function/3.2-render-comp.html)
[3.2 test](./code/3-render-function/__test__/3.2.test.js)

Create two components, Foo and Bar, which renders `<div>foo</div>` and `<div>bar</div>`.
Create a component `<example ok='true'/>` which renders Foo and Bar if `ok='false'`. 
Create a button which toggles between them.

### Challenge 6 progress
I pretty quickly had a candidate solution, but I had a question about how 
to create the `<example ok='true'/>` component, since it was clear that `ok` 
needed to be both `data` and `props`. I looked up the docs & confirmed you need it in quotes:

[Vue Docs - Passing a Boolean Prop](https://vuejs.org/v2/guide/components-props.html#Passing-a-Boolean)

Why do we need a `data` key? I think the sole reason is to be able to 
toggle between on and off. 

It says _Implement a button in the root component that toggles 
`<example>` between `Foo` and `Bar` by controlling its `ok` prop_.
That seems to imply that it should _not_ be in `example`, as the root 
component is the Vue app, right? 

I tried implementing the button ouside of `example` and ended up getting: 
```text
 Expected substring: "<div>bar</div>"
    Received string:    "<div>foo</div> <button click=\"function boundFn (a) {
```
That would imply that somehow the button should not be in there at all..

Let's look at the test. We first assert that the app's innerHTML matches 
`<div>foo</div>`. Then we click on a button somewhere inside.

How can we assert that the app innerHTML matches that, but there's still 
a button somewhere? The only way is that the button is outside the 
`<div id='app'> ...`. 

I did get a warning: 
```text
[Vue warn]: The "data" option should be a function that returns a
per-instance value in component definitions.
```

I solved that, but kept having problems getting my variable to pass down.
It's also hard to get the console logging to appear for some reason.

## 03-09 Challenge 6: Dynamically Render Components - Solution
[Dynamically Render Components - Solution](https://frontendmasters.com/courses/advanced-vue/challenge-6-solution/)

* He has the button inside of the app, in the root element
* but for some reason, it didn't show up in the first assertion:
  ```javascript
  expect(window.document.getElementById('app').innerHTML).toMatch(
    `<div>foo</div>`
  )
  ```
* learned that `h` function's 2nd parameter _can_ be the children, somehow
  ... that's how he's doing it, at any rate, even though the 2nd parameter
  is supposed to be an object of params.
  * √ likely that is because it's not an object in 2nd parameter.
* he has `ok` declared as `data` on the root elem, default to `true`, but 
  `ok` as a prop for `example`. 
  * so when we do this: 
  ```vue
  <div id="app">
      <example :ok="ok"></example>
      <button @click="ok = !ok">toggle</button>
  </div>
  ```
  we end up using ok inside of the `data` key for the app.
* note that we MUST use [`:ok="ok"` to tell vue that it is javascript](https://vuejs.org/v2/guide/components-props.html#Passing-a-Boolean)
  * √ another thing I can't stand about Vue - this kind of information is 
    just more vue-specific stuff that you have to know about and that makes your app 
    more prone to bugs. Here, if we don't enter `:`, we get a bug, but it's 
    hard exactly to know that as a PR reviewer.
* functional component - just add `functional: true`!
  ```vue
  <script>
  const Foo = {
    functional: true,
    render(h) {
      return h('div', 'foo')
    }
  }
  </script>
  ```
  * the diff between normal component and instance is that normal component
    has an instance, whereas functional component doesn't have any backing 
    instance
  * functional components are "expanded eagerly", expanded inline inside of 
    the parent's component.
  * for performance optimizations when you have leaf nodes / huge list
    * button, maybe an avatar
  * we no longer have access to `this`, instead we have `context` in 
    rendering 
  *     `functional: true,`
    `render(h, context) {`
      // context.props
      // context.slots
      // context.children (raw children - really low level concerns)
      // context.parent - the context of the nearest stateful neighbor
  * if you use jsx, there's a babel plugin that lets you put jsx in 
    your render function
    `babel-vue-functional-plugin-transform`
    * if you enable that plugin, it's very concise
* one interesting thing about Vue scope in this example: 
  ```vue
  <div id="app">
      <example :ok="ok"></example>
      <button @click="ok = !ok">toggle</button>
  </div>
  <script>
  // ...
  Vue.component('example', {
    props: ['ok'],
    render(h) {
      return h(this.ok ? Foo : Bar)
    }
  })
  new Vue({
    el: '#app',
    data: {ok: true}
  })
  </script>
  ```
  * here, the `data.ok` on the top-level Vue instance can be accessed 
    within the scope of the `<div id="app">` inside that button.

## 03-10 Challenge 7: Higher-Order Components
[Challenge 7: Higher-Order Components Video](https://frontendmasters.com/courses/advanced-vue/challenge-7-higher-order-components/)
[3.3 description](./code/3-render-function/3.3.md)
[3.3 implementation](./code/3-render-function/3.3-higher-order-component.html)
[3.3 test](./code/3-render-function/__test__/3.3.test.js)

Basic setup of the problem: 
```javascript
const Avatar = {
  props: ['src'],
  template: `<img :src="src">`
}
function withAvatarURL (InnerComponent) {
  // Implement this!
}
const SmartAvatar = withAvatarURL(Avatar)
new Vue({
  el: '#app',
  components: { SmartAvatar }
})
```
This is an "enhancer"

It will should take the username, find the avatar url, return 

## 03-11 Q&A: Higher Order Components
[03-11 Q&A: Higher Order Components Video](https://frontendmasters.com/courses/advanced-vue/q-a-higher-order-components/)
* benefits of HoC vs mixin is that you don't pollute Avatar component
* HoC offer more reusability
  * if that's not a concern, mixins are fine
* the inner component is more testable when you use HOC because you can test them 
  separately
  * better separation of concerns

## 03-12 Challenge 7: Solution
[03-12 Challenge 7: Solution](https://frontendmasters.com/courses/advanced-vue/challenge-7-solution/)
