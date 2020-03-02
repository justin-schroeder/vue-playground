# 04 State Management

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [04-01 Introducing State Management](#04-01-introducing-state-management)
  - [History](#history)
  - [Veux](#veux)
- [04-02 Challenge 8: Passing Props](#04-02-challenge-8-passing-props)
  - [Description](#description)
  - [04-02 Challenge 8: Passing Props Completion](#04-02-challenge-8-passing-props-completion)
- [04-03 Challenge 8: Passing Props Solution](#04-03-challenge-8-passing-props-solution)
- [04-04 Challenge 9: Shared Object](#04-04-challenge-9-shared-object)
  - [04-04 Challenge 9: Shared Object - Completion](#04-04-challenge-9-shared-object---completion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 04-01 Introducing State Management
[Introducing State Management Video](https://frontendmasters.com/courses/advanced-vue/introducing-state-management/)
[Introducing State Manaagement Slides](https://docs.google.com/presentation/d/1TgDx4DN8YqfdndYWMovBcQVPWyKLTNcbo1YS8XlLo9o/edit#slide=id.g1e6824c3c2_0_347)
[Introducing State Manaagement Transcript](./transcripts/21-introducing-state-management.txt)

### History
* Facebook's flux really changed and in some ways invented state management in the front end.
* Flux was the first to have unidirectional data flow.
* Dan Abramov: _Flux patterns are like glasses, you know it when you need it._

### Veux
[Vue Docs: Veux](https://vuex.vuejs.org/guide/)

## 04-02 Challenge 8: Passing Props
[Challenge 8: Passing Props Video](https:// frontendmasters.com/courses/advanced-vue/challenge-8-passing-props/)
[Challenge 8: Passing Props Transcript](./transcripts/22-challenge-8-passing-props.txt)
[Challenge 8: Passing Props Code](./code/4-state-management/4.1-passing-props.html)
[Challenge 8: Passing Props Test](./code/4-state-management/__test__/4.1.test.js)

### Description
requirement: a counter component rendered 3 times
the component takes the current count via props
and a button that increments all 3 counters at once
`<counter :count="count"></counter>`

We have to implement the counter component

### 04-02 Challenge 8: Passing Props Completion
See my code at [Challenge 8: Passing Props Code](./code/4-state-management/4.1-passing-props.html)
I pretty quickly got it, but I do wonder about way to provide template rather than render func
Tests are passing

## 04-03 Challenge 8: Passing Props Solution
[Challenge 8: Passing Props Solution Video](https://frontendmasters.com/courses/advanced-vue/challenge-8-solution/)
* he uses inline component with a template literal
```vue
<script>
new Vue({
  data() {
    return {
      count: 0
    }
  },
  components: {
    Counter: {
      props: ['count'],
      template: `<div>{{ count }}</div>`
    }
  },
  el: '#app',
})
</script>
```

I didn't think of that because I haven't seen template directly declared before 
and because when I've seen the `components` hash, the components have been broken out.
That's pretty convenient. 

## 04-04 Challenge 9: Shared Object
[Challenge 9: Shared  Object Video](https:// frontendmasters.com/courses/advanced-vue/challenge-8-passing-props/)
[Challenge 9: Shared  Object Transcript](./transcripts/24-challenge-9-shared-object.txt)
[Challenge 9: Shared  Object Code](./code/4-state-management/4.2-shared-object.html)
[Challenge 9: Shared  Object Test](./code/4-state-management/__test__/4.2.test.js)
* template is basically same as last challenge
* we are not passing props
* child components will share same state
* hint: we can use a shared object as our same piece of state
* common warning in vue: _data must be a function_
  * in this particular case, we _want_ them to have the same state

###  04-04 Challenge 9: Shared Object - Completion
* I had a theory about what would work from his hint, 
  but it didn't solve the test. 
* I made `data = {count: 0}` and referenced it both in child components 
  and parent component.
* I tried it with the button's `inc` handler as both a method of 
  root app and as a function outside of the scope. 

Incorrect output:
```
 Expected substring: "<div>0</div> <div>0</div> <div>0</div>"
    Received string:    "<div></div> <div></div> <div></div> <button>increment</button>"
```

It's not rendering `count` at all, which is surprising to me.

My `Counter` is just: 
```javascript
const Counter = {
  data,
  template: `<div>{{ count }}</div>`
}
```

When I try to log out the `data` prop, I get `undefined`!
```javascript
const Counter = {
  data: data,
  created() {
    console.log(this.data)
  },
  template: `<div>{{ count }}</div>`
}

// undefined
```

## 04-05 Challenge 9: Shared Object Solution
[Challenge 9: Shared  Object Video](https://frontendmasters.com/courses/advanced-vue/challenge-9-solution/)
[Challenge 9: Shared  Object Transcript](./transcripts/25-challenge-9-solution.txt)
[Challenge 9: Shared  Object Code](./code/4-state-management/4.2-shared-object.html)
[Challenge 9: Shared  Object Test](./code/4-state-management/__test__/4.2.test.js)

* he suggests making Counter use render func
* he mentions that if you don't make a `data`