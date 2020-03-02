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
