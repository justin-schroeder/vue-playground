# Rediculously Reusable Components

## Authors

- Damian Dulisz: [GitHub](https://www.github.com/shentao) / [Twitter](https://twitter.com/DamianDulisz)
- Ben Hong: [GitHub](https://www.github.com/bencodezen) / [Twitter](https://twitter.com/bencodezen)

*repo*: https://github.com/ridiculously-reusable-components/workshop-resources
PDF - https://github.com/ridiculously-reusable-components/workshop-resources/raw/master/slides/reusable-components%20frontend-con.pdf


## props
### example 1 - button composition
The point: props explode quickly the more options you get
* it works
* it's not wrong

### problems with props-based solution
* new req's increase complexity
* multiple responsibilities
* lots of conditionals in template
* "low flexibility"
* hard to maintain

### RECOMMENDED SOLUTION to button composition
* pass in a prop

It's not fun to read a list of api to use your button

## slots
### What if you want multiple slots - use named slots
```vue


```

* something about hashtag or pound meaning slot name, but _don't do that_
  * `<template #todo="{ slot }`>`
you might need dynamic slot names: `v-slot:[dynamicSlotName]`

### scoped slots
`v-slot="scope"`
* we're exposing the scope of the containing slot
* it can access the scope from the slot: 
* you'll hear of term "slot props"
* √ I wish that there were numbers on the slides
* imagine that template is a function and you are passing the argument

### uses of slots

#### example: `vue-multiselect`
Scoped slots example in the docs
https://vue-multiselect.js.org/#sub-custom-option-template
A lot of times you want to expose the data layer
* "slot props are a perfect way of doing that"

Pros: slide 58
Cons: slide 59
* props received through slot-scope _can't be easily used_ inside component script
* you can pass those to methods inside the template as arguments

### slots overview
* props are great for limiting developers
* slots are more flexible; start open and as you define props you can go

## 0952 live demo - tooltip
* `tasks/Task1.vue`
* see also `AppTooltip.vue`

### `v-bind`
`v-bind="{ isOpen, setIsOpen}` is equiv to `:isOpen="isOpen"` and same for `setIsOpen

### library he wrong called `vue-global-events`
* lets you listen to event listeners on global window object

## workshop repo task #1
Tasks:
1. Compose AppSelect.vue that uses AppDropdown.vue. 
   Let it accept an array of options and the selected value.
2. Expose a default slot for showing the current value
3. Expose an option slot for modifying how the option list would look like.

### key takeaways
* the key items: implement `AppSelect.vue` 
* the tooltip is unaware it is being used by the dropdown
* `<template v-slot:content="{setIsOpen}">` allows you to pull `setIsOpen`
  from `AppDropdown.vue` using the `content` slot, even though 
  
### q - how do you go about testing slots?
a: _you don't have to test what goes inside the slot because it's not a concern of your component_

## best practices
* avoid single word components (don't avoid html5 spec if they should ever add anything)
* use prefix - `AppButton`, `AppModal`, `BaseDropdown`
* if you have single component - singleton, make it `ThePrefixedName.vue`
* tightly coupled / related components
  * prefix your component with whatever it's coupled to: 
    * `TodoList.vue` - `TodoListItem.vue` name implies that it should be used in `TodoList.vue`
    * `TodoListItemName.vue` is another example

### best practices - component methods 
* don't assume you know where event will be called
  * don't - `onInput`
  * do - `updateUserName`
* avoid `button @click="onClick"`

### best practices - prefer destructuring over mult args

# problem - how to dynamically switch components based on data - use <Component :is="...">
here, example of dynamic importing of component using `<Component :is>` - s113
* example - he was on Politico
  * rather than have front-end have v-ifs, pass in component
* `import('./components/AnalogClock')` returns a promise and by default vue will just *wait for the promise*
* google "lazy loading vue" for how to make this work
* async vue.js components at vueschool.io
  * https://vueschool.io/articles/vuejs-tutorials/async-vuejs-components/
* example: 
  ```javascript
  return () => import(`./components/lazy/${this.compName}`)
  ```
  _everything in `/lazy` will be turned into a chunk

## pros for `Component :is`

# design pattern - vendor components wrapper
* Ben's favorite pattern
* wrap your components! 
* great example, share with EE - https://github.com/ridiculously-reusable-components/workshop-resources/blob/master/slides/reusable-components%20frontend-con.pdf
  * slide 117 Chris Fritz

# Design Pattern - Transparent Components
* review this one


# Design - presentational vs container components
* recommendation - don't prematurely optimize
* _once the components get big enough, then consider this_
* NOTE: I couldn't find the slides here - it's not in any of the slides I've been looking at

# Design Pattern - Functional Components
* Save the composition as a component
  * example - a submit button
  * cons - it may be unnecessary to create a new component
* solution to this is functional components
  * it's usually just a wrapper; "save it for later"
  * they don't really have much logic in them

* In vue 3 they go away? 
* the important thing is `<template functional>`
  * it just replaces itself in the parent component
  * it's faster
  * there is "no instance"
  * it is rerendered _whenever the parent is rendered_
* remember to forward props
* vue CLI supports jsx
* it no longer passes the vue instance
  * this is usually when you have 1000s of vue instances on the page (vue 2 prob)
  * in vue 3 removes this problem
  * functional components stay in vue 3
  * go with jsx because that will be supported with vue 3 too
  * you want to rely on plugin for vue cli - jsx will just work

# workshop repo task #2

## notes from live coding
I didn't get that SFC version

# Pro Tip - SFC Code Block Order
Script top, template middle, style bottom
This if from Chris Fritz

## flat structure
* also from chris fritz
* src/components/Dashboard.unit.js
* src/components/Dashboard.vue
* src/components/DashboardHeader.vue

state management would be outside this
Facebook is using flat file structure

## component organization
### flat makes refactoring easier
### flat makes finding files easier
* don't use index.js over and over
  * only if it's super specific

# pro tip - register base components globally
## Chris Frit's enterprise boilerplate 
which we "cannot recommend enough"
* requireComponent function 
* excellent `requireComponent` idea
* slide 146

# how to share same functionality across components
## mixins

### mixin as a function
* if you would like to pass a property and configure it

## only use mixins when
* you need to share component logic between multiple components
* unless you can extract the shared logic to a component
* (you most likely can extract the shared logic)

## mixins cons
* property name clashes
* can't share template fragments
* gets harder to track where things are coming from once there are more mixins
  * if you want to change the mixin functionality and it depends on the template, you can't use this easily
* keeping track of where data is coming from when you have many mixins

## mixins alternatives - if you use composition over inheritance
* example: ResultFile has Result with slots: 
  * Name slot
  * Meta slot
  * Content slot
* then Result can be used by ResultImage
  
# task 3
done - this was pretty easy. 
polymorphic news

* there's a pretty large project: 
* Real life code example
  * https://github.com/CodePilotai/codepilot/blob/master/src/ renderer/components/search-results-item-issue.vue
  * https://github.com/CodePilotai/codepilot/blob/master/src/ renderer/components/search-results-item.vue
    * uses vuex and rxjs
  * ...and other files starting with “search-result-item-”
  * what is [`v-on="$listeners"`](https://vuedose.tips/tips/adaptive-components-using-v-bind-and-v-on/)
  * "so much more powerful than doing mixins"
    * you wouldn't be able to do mixins that make use of base template
    * this avoids tons of ifs
      * you would need tons of units tests for each of them

# problem - how to pass data and methods deep into the component tree
Solution: provide/inject
* https://vuejs.org/v2/api/#provide-inject
* useful when vuex isn't an option???
* this is similar to react context

## Provide/Inject
```vue
export default {
  provide () {
    return {
      width: this.width, // will stay reactive
      key: ‘name’, // won’t be reactive
      fetchMore: this.fetchMore // methods can be passed
} },
  data() {
    return {
      width: null,
    }
}, methods: {
    fetchMore () {
// ...
}
} }
```

### Cons
* Besides observable objects defined in data, _other properties are not reactive_
* Example: computed properties **won’t** update
* Pretty clumsy usage, due to some properties staying reactive, where other don’t
* Requires complicated setup to make other properties reactive
* Better suited for **plugins and component libraries** rather than regular applications

### Q&A
* good for drag and drop tree builder
* don't use provide/inject - avoid it, because you can't associate the provide with inject
  * you might use it in a specialized library
* in Vue 3 - provide / inject gets major upgrade because it's reactive and has fewer footguns
  * it might become more popular

# PROBLEM - what if you want to expose data methods but NOT UI
* why not mixins? 
## “Provider” components
```vue
<ApolloQuery
  :query="require('../graphql/HelloWorld.gql')"
  :variables="{ name }"
>
<template v-slot="{ result: { loading, error, data } }">
  <!-- Loading -->
  <div v-if="loading" class="loading apollo">Loading...</div>
  <!-- Error -->
  <div v-else-if="error" class="error apollo">An error occured</div>
  <!-- Result -->
  <div v-else-if="data" class="result apollo">{{ data.hello }}</div>
</template>
</ApolloQuery>
```

This pattern is called "renderless components"

### Design Pattern - Renderless Components

```vue
export default {
    data () {
        return {
            x: 0,
            y: 0
        }
    },
    render () {
        return this.$scopedSlots.default({ x: this.x, y: this.y })
    },
    mounted () {
        window.addEventListener('mousemove', this.handleMouseMove)
    },
    beforeDestroy () {
    },
    window.removeEventListener('mousemove', this.handleMouseMove)
    methods: {
        handleMouseMove (e) {
        this.x = e.x
        this.y = e.y
        }
    }
}
```

