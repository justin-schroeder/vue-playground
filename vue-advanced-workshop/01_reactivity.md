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
 
### [Exercise 1.1](vue-advanced-workshop/code/1-reactivity/1.1.md)
Objective: write `convert` function
* it converts incoming argument into getters & setters
* it should retain the original behavior
* when you access a value it should console log it
* when you set a value, it should console log it
* to verify:
  * run `npm install` 
  * run `npm test -- -t 1.1` to assert that it is correct
  
