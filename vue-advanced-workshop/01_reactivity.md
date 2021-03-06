<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [01 Reactivity](#01-reactivity)
  - [01-01 Introducing Reactivity](#01-01-introducing-reactivity)
  - [01-02 Getters & Setters](#01-02-getters--setters)
    - [01-02 Object.defineProperty](#01-02-objectdefineproperty)
    - [Exercise 1.1](#exercise-11)
  - [01-03 Challenge 1: Solution](#01-03-challenge-1-solution)
    - [Intro Challenge 2 - Dependency Tracker](#intro-challenge-2---dependency-tracker)
      - [dependency tracker hints](#dependency-tracker-hints)
  - [01-04 Challenge 2: Dependency Tracker](#01-04-challenge-2-dependency-tracker)
    - [01-04 Challenge 2: Dependency Tracker - My Description](#01-04-challenge-2-dependency-tracker---my-description)
  - [01-05 Challenge 3: Mini Observer](#01-05-challenge-3-mini-observer)
    - [Exercise 1.3](#exercise-13)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 01 Reactivity

## 01-01 Introducing Reactivity
[Introducing Reactivity Video](https://frontendmasters.com/courses/advanced-vue/introducing-reactivity/)

Think of it as a spreadsheet

[Slide - the essence of Vue is this](https://docs.google.com/presentation/d/1TgDx4DN8YqfdndYWMovBcQVPWyKLTNcbo1YS8XlLo9o/edit#slide=id.g19eebb1966_0_155)
```javascript
onStateChanged(() => {
  view = render(state)
})
```

[React uses `setState`](https://docs.google.com/presentation/d/1TgDx4DN8YqfdndYWMovBcQVPWyKLTNcbo1YS8XlLo9o/edit#slide=id.g19eebb1966_0_163): 
to track changes: 
```javascript
onStateChanged(() => {
  view = render(state)
})

setState({ a: 5 })
```

Angular uses "dirty checking" & Vue uses es5 object defined property API to track changes:
```javascript
onStateChanged(() => {
  view = render(state)
})
state.a = 5
```

If we rename `onStateChanged` to `autorun` then this is basically
the dependency tracking systems in Knockout.js, Meteor Tracker, Vue.js and MobX.
```javascript
autorun(() => {
  console.log(state.count)
})
```

## 01-02 Getters & Setters
[Getters & Setters Video](https://frontendmasters.com/courses/advanced-vue/introducing-reactivity/)
[Getters & Setters Slide 21](https://docs.google.com/presentation/d/1TgDx4DN8YqfdndYWMovBcQVPWyKLTNcbo1YS8XlLo9o/edit#slide=id.g1e6824c3c2_0_20)

### 01-02 Object.defineProperty
[Object.defineProperty(startingObj, key, itemToPutInKey)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
* if the key doesn’t exist, it will create it
* if the key does exist, if it is *configurable* then it will overwrite it.

```javascript
Object.defineProperty(startingObj, myKey, {
// by default all of these are false
  configurable: false, // once you set to false, it can't be changed
  enumerable: false, // you can't get at it through for, in loop
  writable: false, // you can assign to it, but it will fail silently
  get() {}, // the getter
  set() {}, // the setter
}) 
```
 
### [Exercise 1.1](./code/1-reactivity/1.1.md)
Objective: write `convert` function
* it converts incoming argument into getters & setters
* it should retain the original behavior
* when you access a value it should console log it
* when you set a value, it should console log it
* to verify:
  * run `npm install` 
  * run `npm test -- 1.1` to assert that it is correct
  
I had a solution that did not work, and I still cannot figure out why: 
```javascript
function convert(obj) {
  for (const key in Object.getOwnPropertyNames(obj)) {
    let internalValue = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(`getting key "${key}": ${internalValue}`)
        return internalValue;
      },
      set(newVal) {
        console.log(`setting key "${key}" to: ${newVal}`)
        internalValue = newVal;
      }
    })
  }
}
```

This ends up producing: 
```
  console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
    Error: Uncaught [TypeError: Cannot read property '0' of undefined]
```

The solution that does work is to use `Object.keys().forEach(key => {})`, 
and it does make sense why that works, because it creates a new scope for each key.

But I do not understand why the other solution does not work, because 
`let` is block scoped, and the block scope should allow a for loop to work here.

## 01-03 Challenge 1: Solution
[Challenge 1: Solution Video](https://frontendmasters.com/courses/advanced-vue/challenge-1-solution/)
He doesn't explain anything surprising around what my issue was in 01-02.

### Intro Challenge 2 - Dependency Tracker
[Exercise 1.2 - Dep Tracker](./code/1-reactivity/1.2.md)
- Create a `Dep` class with two methods: `depend` and `notify`.
  - `depend` means the current code depends on this dependency
  - `notify` means this dependency has changed
  - we need to associate a piece of computation (subscriber) with a dependency (publisher)
- autorun will take update function
  - when you are in reactive zone you can update dependenciess
  - we'll call `dep.depnd() ` which adds that dependency into a subscriber list ... 
    - subscriber list for what?

#### dependency tracker hints
- js is single threaded, so imagine this:
  ```javascript
    let activeUpdate
    
    function autorun(update) {
      function wrappedUpdate() {
        activeUpdate = wrappedUpdate
        update()
        activeUpdate = null
      }
    }
    ```
  - here, `activeUpdate will null unless it is executing.
  
## 01-04 Challenge 2: Dependency Tracker
* make a class `Dep` with `depend` and `notify` each passed no params
* make a function `autorun`, it is passed a function `update`
* when inner `update` function executes, our `Dependency` class 
  can have access to the current `activeUpdate`
* when we have a "grab" of the current updater function, we will 
  register that as a dependency
* `notify` goes through subscribers and invokes them
* we are registering the `wrappedUpdate` as the `activeUpdate`
  ... wtf
* it keeps collecting dependencies
* this seems like convoluted trickery that's not well-specified
* it is specified the way someone that tacitly admits they don't 
  know how to describe it to others

### 01-04 Challenge 2: Dependency Tracker - My Description
The purpose of this exercise is to see how write a function such that 
when it is called, the function that is calling the function is accessed.

This exercise creates a Pub/Sub class `Dep`, which lets you add 
functions to call and then later call them. 

This is a special purpose Pub/Sub class `Dep` that 
after `dep = new Dep()`, when `dep.depend()` is called within 
a function `foo`, `dep` should know about `foo`, and each function 
you call it within is added to a collection of functions. Then if 
you call `dep.notify()`, it calls all the functions.

To test this class we create a function `autorun(update)`,
where `update` is a reference to a function. It should behave 
like this: 

```javascript
  autorun(() => {
    dep.depend()
    window.console.log('updated')
  })
  dep.notify()
  // we see 'updated' in the console log
  
  autorun(() => {
    dep.depend()
    window.console.log('updated 2')
  })
  dep.notify()
  // we see BOTH 'updated' and 'updated 2' in the console log
```

I'm still not sure why we did this exercise.


## 01-05 Challenge 3: Mini Observer
[Challenge 3 Mini Observer Video](https://frontendmasters.com/courses/advanced-vue/challenge-3-mini-observer/)
Put exercise 1.1 and 1.2 together to understand the Vue update system.
- `convert()` from 1.1 becomes new `observe()`
- `autorun()` from 1.2 is reused

### [Exercise 1.3](./code/1-reactivity/1.3.md)
- we want to create an object where when we access properties, 
  it collects the things that depend on that property, calling 
  `dep.depends()`
- when we mutate the property by assigning to it, we call 
  `dep.notify()` 

It really was as simple as described. [1.3.test.js](./code/1-reactivity/__test__/1.3.test.js)
* creates a state object with `count: 0`
* calls `observe` on the state object, which creates getters and setters for each key in state
* calls `autorun`, passing a lambda which console logs the value of state
* increments the value of `state.count`
  * shows that the incremented value of `state.count` is logged when we do that

The way we do that is by renaming `convert()` to `observe()` and making it 
so that we are creating a new instance of `dep` for every key in the object.
Pretty clever, though I still don't quite see exactly how this will end up being used.
