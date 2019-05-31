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
https://frontendmasters.com/courses/vue/vue-snippets/
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/6

`<style scoped>` gives you scoped styles of course
* she says it's most useful when you have a one off thing
* interesting, I wouldn't have considered using global styles with scoped styles
* works with slots

[sarah's article on importing everywhere in styles](https://css-tricks.com/how-to-import-a-sass-file-into-every-vue-component-in-an-app/)

### 05 - 3 - Vue Snippets - 1 - wine example
https://codepen.io/sdras/pen/BpjQzE

### 05 - 3 - Vue Snippets - 2 - slots and scoped styles
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/9
[wine label github example repo](https://github.com/sdras/vue-wine-label)
* here's [an example component from the wine label github repo](https://github.com/sdras/vue-wine-label/blob/master/src/components/Black.vue)
* she's pointing out that the components use slots like in the codepen example 
* but with the scoped styles, the styles pertain ONLY to the stuff inside
  * including the items passed in via slots
* cool, I can see how this could be useful
* essentially the component is used to style just a certain item differently

end of [05 - 3 - Vue Snippets](https://frontendmasters.com/courses/vue/vue-snippets/)

## 05 - 4 - Lifecycle Hooks
https://frontendmasters.com/courses/vue/lifecycle-hooks/
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/10

* these become more important when you start to use Vue CLI
  where we are bringing components in as we need them

### 05 - 4 - Lifecycle Hooks - definition
[Gives you a method to trigger something in the component lifecycle](http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/11)

This is the order 
* `beforeCreate`
* `created`
* `beforeMount`
* `mounted`
* `beforeUpdate`
* `updated`
* `activated`
* `deactivated`
* `beforeDestroy`
* `destroyed`

### 05 - 4 - Lifecycle Hooks - example 1
0111 - https://frontendmasters.com/courses/vue/lifecycle-hooks/
codepen - http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/12

```vue
const Child = {
  template: '#childarea',
  beforeCreate() {
    console.log("beforeCreate!");
  }, 
  created() {
    console.log("created!");
  }, 
  beforeMount() {
    console.log("beforeMount!");
  }, 
  // ...
```

### 05 - 4 - Lifecycle Hooks - further details
* [@codebeast's article on Lifecycle Methods](https://scotch.io/tutorials/demystifying-vue-lifecycle-methods)
* Lifecycle hooks auto-bind to the instance, so `this.whatever` is available 
* don't use arrow funcs, that will mess up vue

### 05 - 4 - Lifecycle Hooks - smartphone audio & animation example
0400 - https://frontendmasters.com/courses/vue/lifecycle-hooks/
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/17
This example shows a situation where you want something to start when the component is mounted
for that you'd use a lifecycle hook
she uses `mounted()` to start the audio: 

```vue
mounted() {
  let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/rain.mp3'),
      tl = new TimelineMax();

  audio.play();
  tl.add("drops");

  //drops in
  tl.staggerFromTo("#droplet-groups g path", 0.3, {
    drawSVG: "0% -10%"
  }, {
    drawSVG: "100% 110%",
    repeat: 3,
    repeatDelay: 1,
    ease: Sine.easeIn
  }, 0.5, "drops");
  ...
}
```

?? she mentioned that lifecycle hooks are more useful with the vue cli, but I don't see what 
  the two have to do with one another


### 05 - 4 - Lifecycle Hooks - question
question about lifecycle hooks vs computed properties
`beforeCreate` is when computed

## 05 - 5 - Introducing Nuxt.js
https://frontendmasters.com/courses/vue/introducing-nuxt-js/
http://slides.com/sdrasner/intro-to-vue-4?token=Xb4oA4YR#/19

### 05 - 5 - Introducing Nuxt.js - why
code splitting, server side rendering, routing with async data, great lighthouse scores

### 05 - 5 - Introducing Nuxt.js - install setup2 wine label example in nuxt
`$ yarn create nuxt-app <project-name>`

this is [`intro-to-vue/setup2`](`./intro-to-vue/setup2`)
`yarn` then `yarn dev`

instead of index.html, we have `nuxt.config.js`
* for some reason we need to write meta information in this way:
* `#PetPeeves` - once again, another set of conventions to learn.
  It's like Vue is just all about inventing new conventions.
  Why don't we just write components in hieroglyphics? 
  Everything in vue seems unnecessarily arbitrary.

```vue
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat|PT+Serif' }
    ]
  },
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    //build code goes here, such as eslint etc
  }
}
```

See `pages/index.vue` for the base component

See `layouts/default.vue` - this is where MainMenu is put at top of page

```vue
<template>
  <div>
    <MainMenu />
    <nuxt/>
  </div>
</template>

<script>
  import MainMenu from './../components/MainMenu.vue';
  
  export default {
    components: {
      MainMenu
    }
  }
</script>

<style>
body, html {
// ...
}
</style>
}
```

left off at 0457 on https://frontendmasters.com/courses/vue/nuxt-js-application-walkthrough/

## 05 - 6 - Nuxt.js Application Walkthrough
## 05 - 7 - Challenge 4: Vue Cli
