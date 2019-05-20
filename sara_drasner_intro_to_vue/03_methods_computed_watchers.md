# 3. Methods, Computed & Watchers
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V

## 3. Methods, Computed & Watchers - 1 Methods
methods - bound to vue instance; you access in directives

### methods intro
[counter codepen](http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/2)

#### styles
if you want to generate colors, use hsl, because it takes any number

## 3. Methods, Computed & Watchers - 2 Working with Methods
https://frontendmasters.com/courses/vue/working-with-methods/
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/3
[julianne - social media codepen](https://codepen.io/sdras/pen/422d5ce1f61d93ca253e06132b83c598)

we add a method as an event handler this way:
`v-on:keyup.enter="addComment`

### methods in forms
[methods in forms - codepen](http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/6)
she's using axios to call typicode.com, which is good for demos

this is a little strange: `@submit.prevent="submitForm"` - this is using modifiers
```vue
<div id="app">
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name:</label><br>
      <input id="name" type="text" v-model="name" required/>
    </div>
    <!-- ... -->
  </form>
</div>

new Vue({
  el: '#app',
  data() {
    return {
      // ...
    }
  },
  methods: {
    submitForm() {
      // ...
    }
  }
})
```

she uses `:class="[name ? activeClass : '']"` to disable button while ajax is loading

### methods in tables - netflix data
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/9 
sorting based on table columns

## 3. Methods, Computed & Watchers - 3 Computed Properties
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/13

These are cached and updated when a dependency is changed
they go in `computed` section of Vue component

### simplest example - "you're a monster"
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/14 
it's a different view of the same data

someone asked about the "`.lazy`" modifier and what fires it

#### computed
* used as a property in place of data
* you only get getter by default, but you can define a setter

#### methods 
* typically invoked from `v-on/@`
* you get a getter & a setter

### Filtered Data with Methods & Computed Properties
0438
netflix movies table - sort titles by lowest rated, highest rated
Codepen: http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/16
she's using `computed` for the search box and 

## 3. Methods, Computed & Watchers - 4 Challenge 2: Updating a Blog
[Methods and Computed Exercise start](https://codepen.io/sdras/pen/WOyjoj/)
[Methods and Computed Exercise WIP](https://codepen.io/codekiln/pen/pmWPYV)
* use a method for the form
* use computed property for filtering
* they have a form with select & options to begin