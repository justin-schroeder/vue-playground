
[Intro to Vue 1: Directives & Data Rendering](http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX)
https://frontendmasters.com/courses/vue/directives/

## 3. Directives
`v-text`
`v-html`
`v-show`
`v-if`
`v-else`
`v-else-if`
`v-for`
`v-on`
`v-bind`
`v-model`
`v-pre`
`v-cloak`
`v-once`

### `v-model`
* _Creates a relationship between the data in the instance/component 
and a form input, so you can dynamically update values_
* she suggests you always write `data()` as a function (it can be an object)
* to get isolated scope, you need it to be a function

#### `v-model` and checkboxes
slide 19 - http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/19
john, paul, george, ringo: 

```
Vue.config.devtools = true;

new Vue({
  el: '#app',
  data: {
    checkedNames: []
  }
})

<input type="checkbox" id="paul" value="Paul" v-model="checkedNames">
  <label for="paul"> Paul</label>
</input>
```

√√ I think `v-model` points to the `data` prop you want the form element to come from

! it's cool that slides.com can integrate codepen directly

#### `v-model` with `v-for` and checkboxes
next level up is to use: 

```
new Vue({
  el: '#app',
  data: {
    checkedNames: [],
    options: [
      { value: 'John' },
      { value: 'Paul' },
      { value: 'George' },
      { value: 'Ringo' }
    ]
  }
})

<div id="app">
  <span v-for="option in options">
    <input type="checkbox" :id="option.value" :value="option.value" v-model="checkedNames">
    <label for="option.value"> {{option.value}}</label>
  </span>

  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

The key thing here is that you have to see the Vue component to understand the template code;
`.value` doesn't come from the dom node, it comes from the data property `options`

#### modifiers to directives
`m-model.trim` - strip leading or trailing whitespace
`m-model.number` - change string to number
`m-model.lazy` - won't populate automatically; will wait until event happens to bind - listen to change events (?)

### `v-if` / `v-show`
note - she's using [codepen debugger chrome extension](https://chrome.google.com/webstore/detail/codopen/agnkphdgffianchpipdbkeaclfbobaak)

* `v-if` will unmount and re-mount component
  * http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/24
  * the dom node disappears
* `v-show` will make it `display: none` - more performant than `v-if`
  * if it's initially hidden and it'a big component, `v-if` is better than `v-show` because it ends up not ever mounting it
  
#### `v-else` & `v-else-if`
codepen http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/26
do you like tacos? yes or no - if yes, thumbs up, if no, "you're a monster"

### `v-bind`
codepen: http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/28
it's used a lot; shortcut is `:`
used for class & style binding

#### `v-bind` example 1 - changing a DOM element's class
```
new Vue({
  el: '#app',
  data() {
    return {
      tacos: '',
      activeClass: 'active'
    }
  }
})
<div id="app">
  <h3>What is your favorite kind of taco?</h3>
  <textarea v-model="tacos"></textarea>
  
  <br>
  <button :class="[tacos ? activeClass : '']">Let us know!</button>
</div>
```

?? How do you know that tacos is in scope here? that's what I think is so weird about Vue

#### `v-bind` tron perspective example - changing style
codepen example: http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/29

Here Vue sets up two variables and changes the style when the 
mouse moves. 

?? note, this uses `@mousemove`, which I presume is a Vue directive? It passes the `coords` method
to it.

```vue
new Vue({
  el: '#app',
  data() {
    return {
      x: 0, 
      y: 0
    }
  },
  methods: {
    coords(e) {
      this.x = e.clientX / 10;
      this.y = e.clientY / 10;
    },
  }
})

<div id="app" @mousemove="coords">
  <div id="contain" :style="{ perspectiveOrigin: `${x}% ${y}%` }">
    <div class="square square2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 419.9 421.9" preserveAspectRatio="none">
        <title>
          circ3
        </title>
        <!-- ... --> 
      </svg>
    </div>
  </div>
</div>
```

left off at 1402