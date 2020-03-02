# Rediculously Reusable Components

## Authors

- Damian Dulisz: [GitHub](https://www.github.com/shentao) / [Twitter](https://twitter.com/DamianDulisz)
- Ben Hong: [GitHub](https://www.github.com/bencodezen) / [Twitter](https://twitter.com/bencodezen)

*repo*: https://github.com/ridiculously-reusable-components/workshop-resources

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