# 05 Vue CLI and NuxtJS

[05 Vue CLI and NuxtJS Slides](http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/1)
password: `!vue!`
[Sarah Drasner's Github Repo Here](https://github.com/sdras/intro-to-vue)

## 05 - 1 - Introducing Vue CLI
https://frontendmasters.com/courses/vue/introducing-vue-cli/
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/1

### why use vue cli?
* build processes - es6, scss, etc
* build and "concatenate" single file templates
* not load all files at startup (lazy load, async)
* server-side rendering, code-splitting, performance-metrics
* build & prod versions

### using vue-cli
`npm install -g vue-cli`
`vue init webpack-simple my-project`
* `webpack-simple` is an alternative to `webpack` apparently
  * `webpack` prompts you for tests etc
I created [`my_walkthroughs`](./my_walkthroughs) folder
initialized `05_01_intro_vue_cli`
using yarn

### single file templates 
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/2

basic example of structure of single file templates:

```vue
<template>
  <div>
     <!-- Write your HTML with Vue in here -->	
  </div>
</template>

<script>
  export default {
     // Write your Vue component logic here
  }
</script>

<style scoped>
  /* Write your styles for the component in here */
</style>
```

### note on component naming and single file components

```vue
import New from './components/New.vue';

export default {
  components: {
    New
  }
}

// used as <new></new>

// vs ...
import New from './components/New.vue';

export default {
  components: {
    appNew: New
  }
}

// used as <app-new></app-new>

```

## 05 - 2 - Vue CLI Walkthrough
https://frontendmasters.com/courses/vue/vue-cli-walkthrough/
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/4
It says "in the repo : [`starter1`](./intro-to-vue/setup1)" but that folder is not there

We start at `src/main.js`:

```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

* Note that `el` is the DOM element to bind to, and render
* Note that `render` gets a function that is passed ... what?
  * why `h`? What the heck is this for?
  * why do we have a `render` function that itself gets 
    passed a func we have to call?

### bring over the backpack codepen example
she starts by taking the [backpack codepen](http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/4)
* add the styles
  * she says that the `<style>` tag in the parent component will be scoped to the 
    entire application, presumably because she hasn't put `scoped`
* add the `data` tag

### where to put the `child` component
0555 https://frontendmasters.com/courses/vue/vue-cli-walkthrough/
We'll port the `<child>` component into a `components` directory
you want three parts - template, script, style
you no longer need the `template` key in the component
Here's the `components/Child.vue` file:

```vue
<template>
  <div class="item">
    <h2>{{ item }}</h2>
    <img :src="url" width="235" height="300"/>
    <div class="quantity">
      <button class="inc" @click="counter > 0 ? counter -= 1 : 0">-</button>
      <span class="quant-text">Quantity: {{ counter }}</span>
      <button class="inc" @click="counter += 1">+</button>
    </div>
    <button class="submit">Submit</button>
  </div><!--item-->
</template>

<script>
  export default {
    data() {
      return {
        counter: 0
      }
    },
    props: ['item', 'url'],
  }
</script>

<style scoped>

</style>
```

* `#PetPeeves` - It's weird to have `export default` inside a `<script>`
  tag. The single file component idea seems like a way of getting at 
  what react has, but making it look more like HTML to people who are 
  a bit uncomfortable with the idea that JS is a fully-fledged 
  programming language
  
### importing the child in app
0850 https://frontendmasters.com/courses/vue/vue-cli-walkthrough/

```vue
<script>
  import Child from './components/Child.vue';

  export default {
    components: {
      Child
    },
    name: 'app',
    data() {
      return {
        manifest: [
          {
// ...
```

This comes up just fine; use `yarn dev`

http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/5

### "functional components"
she mentions at 1123 https://frontendmasters.com/courses/vue/vue-cli-walkthrough/
that the `h => h(App)` in `main.js` is how you'd do functional components

## 05 - 3 - Vue Snippets
## 05 - 4 - Lifecycle Hooks
## 05 - 5 - Introducing Nuxt.js
## 05 - 6 - Nuxt.js Application Walkthrough
## 05 - 7 - Challenge 4: Vue Cli
