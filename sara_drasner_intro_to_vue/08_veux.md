# 08 Veux

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [08-01 Intro to Veux](#08-01-intro-to-veux)
    - [08-01 Intro to Veux - Why and When?](#08-01-intro-to-veux---why-and-when)
    - [08-01 Intro to Veux - Basic Setup](#08-01-intro-to-veux---basic-setup)
    - [08-01 Intro to Veux - Parts of Store](#08-01-intro-to-veux---parts-of-store)
    - [08-01 Intro to Veux - Basic Abstract Example](#08-01-intro-to-veux---basic-abstract-example)
    - [08-01 Intro to Veux - Additional Parameters](#08-01-intro-to-veux---additional-parameters)
    - [08-01 Intro to Veux - Getters](#08-01-intro-to-veux---getters)
    - [08-02 Examining a Veux Setup - `veux-example` code](#08-02-examining-a-veux-setup---veux-example-code)
    - [08-01 Intro to Veux - `mapActions`](#08-01-intro-to-veux---mapactions)
  - [08-03 Veux Example Walkthrough - Weather Codepen](#08-03-veux-example-walkthrough---weather-codepen)
  - [08-04 Veux Challenge 7 Problem](#08-04-veux-challenge-7-problem)
  - [08-05 Veux Challenge 7 Solution](#08-05-veux-challenge-7-solution)
- [09-01 Wrapping Up](#09-01-wrapping-up)
  - [Adoption](#adoption)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 08-01 Intro to Veux
[Intro to Veux Video](https://frontendmasters.com/courses/vue/introducing-vuex/)
[Intro to Veux Slides](http://slides.com/sdrasner/intro-to-vue-7?token=u9qUgRsW#/)
* password: `!vue!`

It is basically Vue's version of redux
Centralized store for shared data and logic
* even async methods


### 08-01 Intro to Veux - Why and When?  

Why?  
* passing state between many components
  * if they are deeply nested

When?  
* multiple instances of children / siblings communicating
* I'd like to "see" what all of the state looks like and keep it organized in one place


### 08-01 Intro to Veux - Basic Setup

`npm install --save vuex`

Sara does it this way `/src/store/store.js`

Set up the store:
```vue
<script>
  import Vue from 'vue';
  import Vuex from 'vuex';
  
  Vue.use(Vuex);
  
  export const store = new Vuex.Store({
    state: {
      key: value
    }
  });
</script>
```

Set up your component to use Vue: 
```vue
<script>
  import Vue from 'vue';
  import App from './App.vue';
  
  import { store } from './store/store';
  
  new Vue({
    el: '#app',
    store: store,
    template: '<App/>',
    components: { App }
  });
</script>
```

### 08-01 Intro to Veux - Parts of Store

**Getters**: like computed values. They can read value but not update.
**Mutations**: allow updating state, **always synchronous*. Only way to change data in state.
**Actions**: allow us to update state **async**, but _will use an existing mutation_.
* perform multiple mutations at once or in particular order
* call the server

### 08-01 Intro to Veux - Basic Abstract Example

* state, getters, mutations, actions

```javascript
  export const store = new Vuex.Store({
    state: {
      counter: 0
    },
    //showing things, not mutating state
    getters: {
      tripleCounter: state => {
        return state.counter * 3;
      }
    },
    //mutating the state
    //mutations are always synchronous
    mutations: {
      //showing passed with payload, represented as num
      increment: (state, num) => {
        state.counter += num;
      }
    }, 
    //commits the mutation, it's asynchronous
    actions: {
      // showing passed with payload, represented as asynchNum (an object)
      asyncIncrement: ({ commit }, asyncNum) => {
        setTimeout(() => {
          //the asyncNum objects could also just be static amounts
          commit('increment', asyncNum.by);
        }, asyncNum.duration);
      }
    }
  });
```

### 08-01 Intro to Veux - Additional Parameters

To call the action `asyncIncrement`, use `$store.dispatch` (see 0935 in video):

```javascript
new Vue({
  //...
  methods: {
    asyncIncrement() {
      this.$store.dispatch('asyncIncrement')
    }
  }
})
```

You [pass arguments to an action with an additional parameter](http://slides.com/sdrasner/intro-to-vue-7?token=u9qUgRsW#/9):

```javascript
const store = new Veux.Store({
  // ...
  actions: {
    asyncIncrement ({ commit }, duration) {
      setTimeout(() => {
        commit('increment')
      }, duration)
    }
  }
})
```

then using the parameter in the component:

```javascript
new Vue({
// ...
  methods: {
    asyncIncrement() {
      this.$store.dispatch('asyncIncrement', 1000)
    }
  }
})
```

This can also be an object as in [08-01 Intro to Veux - Basic Abstract Example](#08-01-intro-to-veux---basic-abstract-example).

### 08-01 Intro to Veux - Getters

Use [`computed` for getters](http://slides.com/sdrasner/intro-to-vue-7?token=u9qUgRsW#/10)

Use `commit` for mutations

Use `dispatch` for actions 

```javascript
new Vue({
//...
  computed: {
    value() {
      return this.$store.getters.tripleCounter;
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment', 2)
    },
    asyncIncrement() {
      this.$store.dispatch('asyncIncrement', 2)
    }
  }
})
```

### 08-02 Examining a Veux Setup - `veux-example` code
See [./vuex-example/README.md](./intro-to-vue/vuex-example/README.md)
See [`Action.vue`](./vuex-example/src/components/Action.vue)
See [`AdjustState.vue`](./vuex-example/src/components/AdjustState.vue)
See [`AdjustState.vue`](./vuex-example/src/components/AdjustState.vue)
See [`Mutation.vue`](./vuex-example/src/components/Mutation.vue)
See [`Getter.vue`](./vuex-example/src/components/Getter.vue)
See [`store.js`](./vuex-example/src/store/store.js)

at 1645 in video https://frontendmasters.com/courses/vue/examining-a-vuex-setup/
with slide http://slides.com/sdrasner/intro-to-vue-7?token=u9qUgRsW#/14

### 08-01 Intro to Veux - `mapActions`
[1739 in video; mapActions in slide](http://slides.com/sdrasner/intro-to-vue-7?token=u9qUgRsW#/17)

[`mapActions` helper (Vue Docs)](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components)
* it's a code generator: for `increment`, map `this.increment()` to `this.$store.dispatch('increment')`
* it supports payloads: for `incrementBy`, map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
* you can rename: if you have `add: 'increment'`, then map `this.add()` to `this.$store.dispatch('increment')`

```vue
<template>
  <button @click="increment(5)">Number of TACOS</button>
</template>
<script>
  import {mapActions} from 'vuex';
  
  export default {
    // ...
    methods: {
      ...mapActions([
        // map this.increment() to this.$store.commit('increment')
        'increment', 
        'decrement',
        'asyncIncrement'
      ])
    }
  }
// ... in store.js:
export const store = new Vuex.Store({
  actions: {
    // showing passed with payload
    incrementAsync ({ commit }, num) {
      setTimeout(() => {
        commit('increment', num)
      }, 1000)
    }
  },
  //...
})
</script>
```

She mentions that if we want, we can make `computed` below the 
`methods` with `...mapActions`, and use the methods inside the computed values.
* √ I'm not sure I understand this part, since computed values should change when 
  data keys change, and data keys are not changing here


## 08-03 Veux Example Walkthrough - Weather Codepen
[Intro to Veux Video](https://frontendmasters.com/courses/vue/vuex-example-walkthrough/)
[Intro to Veux Slides](http://slides.com/sdrasner/intro-to-vue-7?token=u9qUgRsW#/20)
* password: `!vue!`

[weather example codepen](https://codepen.io/sdras/pen/YNpaoJ?editors=1010)
* she's using an element `g` - what is it?
  * one example is the phonebutton
  * another is the element that shows the weather if `showWeather` is true
* wrap the components in a transition group
  * they all fade in and fade out
* the mutation that changes the template number 
* `computed` has `template()` which returns template number

## 08-04 Veux Challenge 7 Problem
* [`./intro-to-vue/commentform-problem/README.md`](sara_drasner_intro_to_vue/intro-to-vue/commentform-problem)
* [Veux Challenge 7 Problem Video](https://frontendmasters.com/courses/vue/challenge-7-vuex/)

We don't have a store initially
Task is to add a store
We want to make adding comments & updating comments live in store

## 08-05 Veux Challenge 7 Solution
* [`./intro-to-vue/commentform-solution/README.md`](sara_drasner_intro_to_vue/intro-to-vue/commentform-problem)
* [Veux Challenge 7 Solution Video](https://frontendmasters.com/courses/vue/challenge-7-solution/)

* make the store file

# 09-01 Wrapping Up
[wrapping up slides]http://slides.com/sdrasner/intro-to-vue-7?token=u9qUgRsW#/25)
* [Evan You's Book - The Majesty of Vue](https://leanpub.com/vuejs2)
* [awesome-vue](https://github.com/vuejs/awesome-vue)
* [her fav vue newsletter](https://news.vuejs.org)
* [monterail blog](https://www.monterail.com/blog)

## Adoption
* Alibaba 
* Weebo
* Adobe
* Nespresso
* GitLab

