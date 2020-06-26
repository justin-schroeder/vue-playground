# Vue 3 Deep Dive with Evan You

## L01 - Vue 3 Overview

### Render functions
* Vue creates a function which creates a (soon to be old) VNode
* upon changes, render functions create a now new VNode
* old and new VNodes are compared to update the DOM efficiently

Comparison of approaches
1. create blueprints, then with every change, destroy and recreate each floor of building
  - not explicitly said, but implied is that this is the react way
2. create blueprints, then only update the needed changes
  * this is the vue way

### Reactivity Module
Vue 3 Reactivity - he created a course that would make this a lot more understandable


### Vue 3 Modules of Vue Core
1. Reactivity Modules
2. Compiler Moduler - take templates and compile them into render functions
  * can happen in the browser at runtime
  * usually happens when built
3. Renderer Module
  1. Render Phase
    * render function returns VNode  
  2. Mount Phase
    * VNode creates webpage
  3. Patch Phase
    * compare old and new VDom nodes and update the webpage
  
### Ex01 - simple component lifecycle
1. Render Phase
  1. Compiler module - changes template into render function
  2. Reactivity module - watched objects are initialized
  3. Renderer module - watch reactive object for changes, and render func returns VNode 
2. Mount Phase
  1. create the module with render function
3. Patch Phase
  1. the reactive object is watched
  2. if changes, render func creates new VNode
  3. send to the patch engine to diff them and update the DOM

## L02 How to use Render Functions

### L02.1 - Advantages of VDom 1
* render to iOS, webGL, etc
* Vue2 already has capability, not officially documented
* Vue3 custom render API is official, 3rd parties can build
  custom renderers

### L02.2 - Advantages of VDom 2
* complex type-ahead box example
  * lots of interactive logic
  * template syntax is restrictive
  * render funcs might let you go deeper
* templates are good 99% of the time, then you want render func

### L02.3 - Render Function
```vue
render(h) {
  return h('div', {
    attrs: {
      id: 'foo'
    },
    on: {
      click: this.onClick
    }
  }, 'hello')
}
```
* Vue 2 was highly verbose. They changed the API to simplify it.
* flat props structure
* globally imported `h` helper
  * when you want to pass nested render functions, you have to pass h down
  * with globally imported `h` you can split it into multiple funcs in one file
```vue
import {h} from 'vue'

render() {
  return h('div', {
    id: 'foo'
    onClick: this.onClick
  }, 'hello')
}
```
* if you put an attr in, if Vue3 detects it's a data attr, it treats it as that.
* Vue 3 is a re-write in typescript

## L03 How to use Render Functions
15min

### L03.1 High Level intro to render funcs
* just put `render() {}` inside the option
* in vue3, `import {h} from 'vue'`
```vue
import {h} from 'vue'

render() {
  return h('div')
}
```
* give it props
```vue
import {h} from 'vue'

render() {
  return h('div', {
    id: 'hello'  
  })
}
```
* give it children
```vue
import {h} from 'vue'

render() {
  return h('div', {
    id: 'hello'  
  }, [h('span', 'world')])
}
```
* how do you use `v-if`? use a ternery
* how do you use `v-for`? 
  * use `return this.list.map(item => {})`
  
### L03.2 slots in render funcs
* probably always have to use slots with render funcs
  * typically, markup-heavy or feature components
    * related to look of application
    * for these use template
  * when to use render funcs
    * utility components
    * take slot content and wrap them up
  * grab slots: `this.$slots.default && this.$slots.default()`
* scoped slots
  * pass argument into `this.$slots.default(scope)`
* remember to guarantee slots is an array
```vue
import {h} from 'vue'

const App = {
  render() {
    const slot = this.$slots.default
      ? this.$slots.default()
      : []
    return slot // ... more to come
  }
}
```
* Becasue it's an array, you can put it in the children position of normal element
  * `return h('div', slot)`
### L03.3 stack component
* Stack element would add padding 
* it's hard to do this with templates, because it's recursive
```vue
<Stack size="4">
  <div>hello</div>
  <div>hello</div>
  <Stack size="2">
    <div>hello</div>
    <div>hello</div>
  </Stack>
</Stack>
```
* you can do it with render funcs
```vue
import {h} from 'vue'

const Stack = {
  render() {
    const slot = this.$slots.default
      ? this.$slots.default()
      : []
    return return h('div', { class: 'stack' }, slot.map(child=> {
      return h('div', { class: `mt-${this.$props.size}` }, [
        child
      ])
    })
  }
}
```
* see example here: [stack.html](./stack.html)
  * note, I couldn't get his code to work
  * I get `mt-undefined`
* templates are easier to optimize the component
  * also, easier for designers to style with CSS
  
## L04 Compiler & Renderer API

### Vue 3 Template Explorer
* he uses it for debugging the compiler
* paste in source template, and see what's gone wrong
* example, hoisting avoids excess garbage collection
* another optimization - `@click` listener
  * Vue3 identifies props that could change from props
    that won't change, skipping object enumeration
  * compiler generated hints help with performance
    * you can only do this with templates,
    * render functions bypass this optimization
* there is an option that caches the event handler
  * now the onClick is static as far as template is concerned
* one of the most common causes of rerendering is when you use
  an inline event handler like `@click="foo(123)`. In vue2, this
  would cause the parent component to rerender every time rerender
  * can cause cascade effect
* in react there's useCallback or useMemo that lets you
  manually cache 
* in vue3 

### diff between block and VNode
if we have a render func and replicate
```vue
<div>
  <div>
    <span>hello</span> 
  </div>
</div>
```
* generated vdom (simulated)
```vue
const vdom = {
  tag: 'div',
  children: [
    {
      tag: 'div',
      children: [
        {
          tag: 'span',
          children: 'hello'
        }
      ]
    }
  ]
}
```
* usually, we need a kind of brute-force diffing to see if `hello` changed to `msg`
What if we had this? 
```vue
<div>
  <div></div>
  <div>
    <span>{{ msg }}</span> 
  </div>
</div>
```
* as a human, we see that msg is the only part that can change, but compiler doesn't know
* we want to give enough hints to compiler to skip things
* the way we do that is with blocks
* there's a "patch flag" which indicates that it should be tracked as a dynamic node
* after it's created, we'll have a property of a block called dynamic node
* If you have a complex DOM structure, no matter how complex it is, 

### `v-if` is a structural directive
* it may alter the structure, causing it to disappear
* the root block can't make assumptions about dynamic section inside
```vue
<div>
  <div></div>
  <div v-if="ok">
    <span>{{ msg }}</span> 
  </div>
</div>
```
* so here, we end up having blocks for both the v-if section and the parent section
* but this is more efficient than having every vnode. 
* it's an order of magnitude better
* so we want to generate a render function that gives enough hints to compiler to be 
  as optimized as possible
  
### exercise: creating a render function
* gives an example of how vue works in general
* implement the following funcs: 
```vue
<div id="app"></div>

<script>

function h(tag, props, children) {

}

function mount(vnode, container) {

}

const vdom = h('div', {class: 'red'}, [
  h('span', null, ['hello'])
])

mount(vdom, document.getElementById('app'))
</script>
```