<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vue 3 Deep Dive with Evan You](#vue-3-deep-dive-with-evan-you)
  - [L01 - Vue 3 Overview](#l01---vue-3-overview)
    - [Render functions](#render-functions)
    - [Reactivity Module](#reactivity-module)
    - [Vue 3 Modules of Vue Core](#vue-3-modules-of-vue-core)
    - [Ex01 - simple component lifecycle](#ex01---simple-component-lifecycle)
  - [L02 How to use Render Functions](#l02-how-to-use-render-functions)
    - [L02.1 - Advantages of VDom 1](#l021---advantages-of-vdom-1)
    - [L02.2 - Advantages of VDom 2](#l022---advantages-of-vdom-2)
    - [L02.3 - Render Function](#l023---render-function)
  - [L03 How to use Render Functions](#l03-how-to-use-render-functions)
    - [L03.1 High Level intro to render funcs](#l031-high-level-intro-to-render-funcs)
    - [L03.2 slots in render funcs](#l032-slots-in-render-funcs)
    - [L03.3 stack component](#l033-stack-component)
  - [L04 Compiler & Renderer API](#l04-compiler--renderer-api)
    - [L04.1 Vue 3 Template Explorer](#l041-vue-3-template-explorer)
    - [L04.2 diff between block and VNode](#l042-diff-between-block-and-vnode)
    - [L04.3 `v-if` is a structural directive](#l043-v-if-is-a-structural-directive)
    - [L04.4 exercise: creating a render function](#l044-exercise-creating-a-render-function)
  - [L05 Creating a Mount function](#l05-creating-a-mount-function)
    - [L05.1 going through mount function](#l051-going-through-mount-function)
    - [L05.2 problem: implementing `patch()`](#l052-problem-implementing-patch)
  - [L06 Creating a Patch Function](#l06-creating-a-patch-function)
    - [L06.1 implementing `patch()` - attrs](#l061-implementing-patch---attrs)
    - [L06.2 implementing `patch()` - children arrays](#l062-implementing-patch---children-arrays)
    - [L06.3 Vue coverage](#l063-vue-coverage)
  - [L07 Intro to Reactivity](#l07-intro-to-reactivity)
  - [L08 Building Reactivity from Scratch](#l08-building-reactivity-from-scratch)
  - [L09 Building the Reactive API](#l09-building-the-reactive-api)
  - [L10 Creating a Mini Vue](#l10-creating-a-mini-vue)
  - [L11 The Composition API](#l11-the-composition-api)
    - [L11.1 watchEffect](#l111-watcheffect)
    - [L11.2 onMounted](#l112-onmounted)
    - [L11.3 return from `setup()`](#l113-return-from-setup)
  - [L12 Code Organization](#l12-code-organization)
    - [L12.1 impetus for separating](#l121-impetus-for-separating)
    - [L12.2 impetus for separating](#l122-impetus-for-separating)
    - [L12.3 extending in composition api](#l123-extending-in-composition-api)
  - [L13 Logic Reuse](#l13-logic-reuse)
    - [L13.1_mouse.html - vue2 mixin approach for mouse move tracker](#l131_mousehtml---vue2-mixin-approach-for-mouse-move-tracker)
    - [L13.2_mouse.html - vue3 react HOC approach](#l132_mousehtml---vue3-react-hoc-approach)
    - [L13.3_mouse.html - vue3 render props / scoped slots](#l133_mousehtml---vue3-render-props--scoped-slots)
    - [L13.4_mouse.html - vue3 avoid unnecessary components](#l134_mousehtml---vue3-avoid-unnecessary-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/compiler-and-renderer-api

### L04.1 Vue 3 Template Explorer
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

### L04.2 diff between block and VNode
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

### L04.3 `v-if` is a structural directive
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
  
### L04.4 exercise: creating a render function
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

**See [My Solution in `./L04-4_exercise_try.html`](./L04-4_exercise_try.html)**

## L05 Creating a Mount function

### L05.1 going through mount function
* Evan's implementation of `h` is just like mine
* in props, he uses `for (const key in vnode.props) {`
  * he says we _should_ check if it's a property or an attribute
  * but he ended up using `setAttribute` just like I did
* in children, he detected string with typeof like I did
  * he explicitly says to ignore cases like `h('span', null, ['hello', h('span')]`
    * for the case of instruction
    * actually, vue handles this
  * Evan uses `el.textContent` instead of using creating a text node
* the initinal `mount()` is all about creating something that wasn't there before

### L05.2 problem: implementing `patch()`
```vue
<div id="app"></div>

<script>

function h(tag, props, children) {
  return { tag, props, children}
}

function mount(vnode, container) {
  // additional change - add the element back to the vnode so it can be used later
  const el = vnode.el = document.createElement(vnode.tag)
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      el.setAttribute(key, value)
    } 
  }
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(child => { mount(child, el) })
    }
  }
}

const vdom = h('div', {class: 'red'}, [
  h('span', null, ['hello'])
])

mount(vdom, document.getElementById('app'))

/**
 * find the minimal changes and update the dom
 * use vdom.el to access the old real DOM tree
 */
function patch(h1, h2) {

}

const vdom2 = h('div', {class: 'green'}, [
  h('span', null, ['changed!'])
])

patch (vdom, vdom2);
</script>
```

## L06 Creating a Patch Function

### L06.1 implementing `patch()` - attrs
### L06.2 implementing `patch()` - children arrays
https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/creating-a-patch-function
7:25
* if it's keyed, e.g. `<div v-for="item in list" :key="item.id"/>`
* then item id is unique
* internal representation will look like: 
```vue
[
    { tag: 'div', key: 1 },
    { tag: 'div', key: 3 },
    { tag: 'div', key: 2 },
]
```
* we can use the keys to find the new order
* we have to go through the list and move them 
  based on the new position
  - it's several 100 lines long
  - go into vue source to see
* we'll do a simplified version
* potential inefficiency - if we have children with different types, we might be 
  throwing away nodes unnecessarily
* vue uses some smart heuristics to know which algorithm to use based on template compilation

See his solution: [`L05-2_patch.html`](./L05-2_patch.html)

### L06.3 Vue coverage
* Very cool resource: https://vue-next-coverage.netlify.app/
* overall, 93%
* as they are rewriting the runtime code, they're thinking about the compiler, and 
  thinking of how to skip as much as possible
* our solution is 60 lines long, and the real solution is 100s of lines long
* the engine has to do this for each node. If you can incrementally improve perf per node,
  you can really speed the rendering
  * the `patch()` function 
* though vue3 still uses an update function, there are other smart ways to think about 
  template compilation
  * there are ways it could be even more efficient if they didn't support render functions

## [L07 Intro to Reactivity](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/intro-to-reactivity)
* metaphor of spreadsheet
* essence of declarative rendering: `onStateChanged(() => { view = render(state) })`
* the dependency tracking system is also seen in
  * `knockout.js`, Meteor Tracker, `Vue.js`, `MobX`
* tough to find right granularity of tracking
  * at component level seems to be the sweet spot

```vue
import { reactive, watchEffect } from 'vue'

const state = reqctive({
  count: 0
})

watchEffect(() => {
  console.log(
...
```

## [L08 Building Reactivity from Scratch](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/building-reactivity-from-scratch)
3 steps
* [`L08.1_reactivity_from_scratch.html`](./L08.1_reactivity_from_scratch.html)
* [`L08.2_reactivity_from_scratch.html`](./L08.2_reactivity_from_scratch.html)
* [`L08.3_reactivity_from_scratch.html`](./L08.3_reactivity_from_scratch.html)

## [L09 Building the Reactive API](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/building-the-reactive-api)
3 steps
* [`L09.1_build_reactivity.html`](./L09.1_build_reactivity.html)
* [`L09.2_build_reactivity.html`](./L09.2_build_reactivity.html)
  * uses es6 proxies

## [L10 Creating a Mini Vue](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/creating-a-mini-vue)
* [`L10.1_build_vue.html`](./L10.1_build_vue.html)

## [L11 The Composition API](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/the-composition-api)
* Composition API = Reactivity API + Lifecycle Hooks
* `ref` is like a container
* all of the composition API methods happen within a new `setup()`
  * this lets it be used alongside existing options
  * `setup()` is called before `beforeCreate()`
    * you _don't_ have access to `this`
    * inside `setup()` you'll assume you don't know rest of options
  * `watch(() => state.count, (count, oldCount) => {})` 
    * is lazy (only called on update / change)
    * behaves almost the same as `this.$watch` from 2.0
  * `watchEffect(() => console.log(state.count)` 
    * cannot be lazy
    * have to collect dependencies up front
    * can be more straightforward for a lot of use cases
  * `watch` gets the old value, and can change it, while `watchEffect` is more of just
    an observer
```vue
import {reactive, ref, computed, watchEffect, watch, onMounted} from 'vue'
export default {
  setup() {
    const state = reactive({ count: 0 })
    // NOT lazy - will be called even with console.log
    watchEffect(() => console.log(state.count))
    const count = ref(0)
    // `plusOne` is a computed ref
    const plusOne = computed(() => state.count+1)
    watch([count, plusOne], ([count, plusOne], [oldCount, oldPlusOne]) => {
      // lazy - only call when one has changed
    })
  }
}
```

### L11.1 watchEffect

```vue
import {reactive, ref, computed, watchEffect, watch, onMounted} from 'vue'
export default {
  props: ["id"],
  setup(props) {
    const fetchedData = ref(null);
    watchEffect(() => {
      fetch(`url${props.id}`).then(res => res.json()).then(data => {
        fetchedData.value = data
      })      
    })
  
    onMounted(() => console.log('mounted!'))
    return {
      state, 
      increment: () => { state.count++ }
    }
  }
}
```

* note that `props.id` is used inside `watchEffect`, which means that whenever
  `props.id` changes, it will eventually end up calling watchEffect again.
  * when you get props passed in, it is a reference to the latest props
    * you shouldn't mutate it, you'll get warning

### L11.2 onMounted
* abstracting out `onMounted` lets you reuse behavior across components

```vue
import {reactive, ref, computed, watchEffect, watch, onMounted} from 'vue'

function useFeature() {
  onMounted(() => console.log('mounted!'))
}

export default {
  props: ["id"],
  setup(props) {
    const fetchedData = ref(null);
    useFeature()
    watchEffect(() => {
      fetch(`url${props.id}`).then(res => res.json()).then(data => {
        fetchedData.value = data
      })      
    })
    return {
      state, 
      increment: () => { state.count++ }
    }
  }
}
```

### L11.3 return from `setup()`
* return the template render context
* anything inside of `state` will be unwrapped
  * then inside of template you don't have to do `{{state.count}}`, just `{{count}}`

```vue
import {reactive, ref, computed, watchEffect, watch, onMounted} from 'vue'

function useFeature() {
  onMounted(() => console.log('mounted!'))
}

export default {
  props: ["id"],
  setup(props) {
    const fetchedData = ref(null);
    useFeature()
    watchEffect(() => {
      fetch(`url${props.id}`).then(res => res.json()).then(data => {
        fetchedData.value = data
      })      
    })
    return {
      state, 
      increment: () => { state.count++ }
    }
  }
}
```

## [L12 Code Organization](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/code-organization)
* you can always extract elements into external functions like `onMounted()` above

### L12.1 impetus for separating
* the impetus comes from distinct state managed by different sections
* problem: code that gets split between option blocks, 
  * gets much worst with each additional option
```vue
import {reactive, ref, computed, watchEffect, watch, onMounted} from 'vue'

function useFeature() {
  onMounted(() => console.log('mounted!'))
}

export default {
  template: `{{ event.count }}`,
  props: ["id"],

  data() {
    return {
      foo: 1 // feature A
      bar: 2 // feature B
      baz: 3 // feature C
    }
  }

  methods: {
    one() {}, // feature A
    two() {}, // feature B
    three() {}, // feature C
  }

  setup(props) {

    return {

    }
  }
}
```

### L12.2 impetus for separating
4:51
* transformation into composition API
* whenever you extract a part of your behavior, it automatically becomes available to 
  other components as well!!
* can put in `./use` or `./composition`
```vue
import {reactive, ref, computed, watchEffect, watch, onMounted} from 'vue'

function useFeatureA() {
  const foo = ref(0)
  const plusone = computed(() => foo.value + 1 );
  
  function incrementFoo() {}
  watchEffect(() => { ... })
  return {
    foo,
    plusone
  }
}

export default {
  template: `{{ event.count }}`,
  props: ["id"], 

  setup(props) {
    const {foo, plusone} = useFeatureA();
    const { bar } = useFeatureB();
    const { baz } = useFeatureC();
    return {
      foo, plusone, bar, baz
    }
  }
}
```

### L12.3 extending in composition api
* in vue 2, you can do extends
* how to do that in vue3 composition api? 
* do this, and then in another component, you can call this component's setup function
  inside of that function's setup function, and you've essentially achieved logic extension!

```vue
import {reactive, ref, computed, watchEffect, watch, onMounted} from 'vue'

function useFeatureA() {
  const foo = ref(0)
  const plusone = computed(() => foo.value + 1 );
  
  function incrementFoo() {}
  watchEffect(() => { ... })
  return {
    foo,
    plusone
  }
}

setup(props) {
  const {foo, plusone} = useFeatureA();
  const { bar } = useFeatureB();
  const { baz } = useFeatureC();
  return {
    foo, plusone, bar, baz
  }
}

export default {
  template: `{{ event.count }}`,
  props: ["id"], 
  setup
}
```

## [L13 Logic Reuse](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/logic-reuse)
* logic reuse is objectively better with composition api than with mixins

### [L13.1_mouse.html](./L13.1_mouse.html) - vue2 mixin approach for mouse move tracker
* [L13.1_mouse.html](./L13.1_mouse.html)
```vue
const App = {
  mixins: [MouseMixin /*, AnotherMixin leads to problem */],
  template: `{{ x }} {{ y }}`,
}
```
* problem #1 with mixins: where did that var come from? 
  * We can kind of guess that x and y come from `MouseMixin`, but as you add mixins, 
    you no longer know where the data is coming from.
* problem #2 with mixins: name collisions
  * what if other mixins have `update()` function?
* if you have 4-5 mixins in each component

### [L13.2_mouse.html](./L13.2_mouse.html) - vue3 react HOC approach
* in react, they used HOC
* this helps with namespace collision (prob#1) but doesn't help with prob#1 - locating vars
```vue
function withMouse(Inner) {
  return {
    render() {
      return h(Inner)
    }
  }
}

const App = withMouse({
  props: ['x', 'y'],
  template: `{{ x }} {{ y }}`,
})
```

### [L13.3_mouse.html](./L13.3_mouse.html) - vue3 render props / scoped slots
* react calls it render props, vue calls it scoped slots
```vue
const App = {
  components: {Mouse},
  template: `<Mouse v-slot="{ x, y }">{{ x }} {{ y }}</Mouse>`
}
```
* benefit is that the variables are directly traced to where we got them from.
  * super explicit
  * plus, if you have namespace collision, you can rename it locally: 
```vue
const App = {
  components: {Mouse, Foo},
  template: `
    <Mouse v-slot="{ x, y }">
      <Foo v-slot="{ x: foo}">
        {{ x }} {{ y }} {{ foo }}
      </Foo>
    </Mouse>`
}
```
* only downside: we have multiple component instances for each use 

### [L13.4_mouse.html](./L13.4_mouse.html) - vue3 avoid unnecessary components
```vue
function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
}
const App = {
  setup() {
    // it's a best practice to be explicit about what you're injecting here.
    const { x, y } = useMouse()
    return { x, y }
  },
  template: `{{ x }} {{ y }}`
}
```
* this is objectively better than mixins
* another problem with mixins is that they are really hard to type properly in type systems
* everything is just function calls
