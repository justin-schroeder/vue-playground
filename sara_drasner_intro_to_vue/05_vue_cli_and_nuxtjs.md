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

## 05 - 2 - Vue CLI Walkthrough
https://frontendmasters.com/courses/vue/vue-cli-walkthrough/


## 05 - 3 - Vue Snippets
## 05 - 4 - Lifecycle Hooks
## 05 - 5 - Introducing Nuxt.js
## 05 - 6 - Nuxt.js Application Walkthrough
## 05 - 7 - Challenge 4: Vue Cli
