# [Intro to Vue 1: Directives & Data Rendering](http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX)
Use password `!vue!`

Videos: https://frontendmasters.com/courses/vue/directives/

[Introduction to Vue Workshop Materials](https://codepen.io/collection/noYZxW/)

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

### 3. Directives - `v-model`
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

#### `v-model` modifiers
`v-model.trim` - strip leading or trailing whitespace
`v-model.number` - change string to number
`v-model.lazy` - won't populate automatically; will wait until event happens to bind - listen to change events (?)

### 3. Directives - `v-if` / `v-show`
note - she's using [codepen debugger chrome extension](https://chrome.google.com/webstore/detail/codopen/agnkphdgffianchpipdbkeaclfbobaak)

* `v-if` will unmount and re-mount component
  * http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/24
  * the dom node disappears
* `v-show` will make it `display: none` - more performant than `v-if`
  * if it's initially hidden and it'a big component, `v-if` is better than `v-show` because it ends up not ever mounting it
  
#### `v-else` & `v-else-if`
codepen http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/26
do you like tacos? yes or no - if yes, thumbs up, if no, "you're a monster"

### 3. Directives - `v-bind`
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

### 3. Directives - `v-once` & `v-pre`
1800

#### `v-once` will not update once it's rendered
not quite as useful

#### `v-pre` - prints out inner text exactly how it is
it won't process the information, so for example, it won't interpolate variables.
The first thing

```vue
<span v-pre>This is good if I need to show the mustache view of {{ $data }}</span>
  <pre>{{ $data }}</pre>
```

Here, the first part is literally going to output `{{ $data }}`
the second part is going to output the _contents_ of the variable `data`.

### 3. Directives - `v-on` or `@`
1900 - http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/32
[codepen example - backpack counter w/ 0 & 1](https://codepen.io/sdras/pen/f979956bee610da7563db67b1358619f)
keeping boundary conditions
`v-on:click` is same as `@click`
you can use expressions like ternaries as well as handlers

```vue
<button class="inc" @click="counter > 0 ? counter -= 1 : 0">-</button>
```

#### multiple bindings
hover on desktop vs touch event on mobile:
http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/34

```vue
<div v-on="
  click   : onClick,
  keyup   : onKeyup,
  keydown : onKeydown
">
</div>
```

#### `v-on` modifiers
* `@mousemove.stop` is comparable to e.stopPropagation()
* `@mousemove.prevent` this is like e.preventDefault()
* `@click.once` - click event will be triggered once
* `@click.native` - you can listen to native events in the DOM

#### `v-on` [keycodes for events](https://vuejs.org/v2/api/#keyCodes)
```vue
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase won`t work
  mediaPlayPause: 179,
  // instead you can use kebab-case with double quotation marks
  "media-play-pause": 179,
  up: [38, 87]
}

<input type="text" @keyup.media-play-pause="method">
```

### 3. Directives - `v-html`
2259 - http://slides.com/sdrasner/intro-to-vue-1?token=9-aFNhlX#/37

This is a little like `<!- $myvar >` in underscore templates

```vue
new Vue({
  el: '#app',
  data() {
    return {
      tacos: `I like <a href="http://www.epicurious.com/recipes/food/views/tacos-al-pastor-242132" target="_blank">Al Pastor</a> tacos`
    }
  }
})

<div id="app">
  <h3>What is your favorite kind of taco?</h3>
  <p v-html="tacos"></p>
</div>
```

**warning** - cross site scripting warning here. don't use user-gen content

### 3. Directives - `v-text`
basically like moustache templates. docs prefer the moustache templates
both lines do same thing:
```vue
<p v-text="tacos"></p>
<p>{{tacos}}</p>
```

end of 3. Directives video

### 4. Challenge 1: Calculator
https://frontendmasters.com/courses/vue/challenge-1-calculator/
[Directives Exercise Start Codepen](https://codepen.io/sdras/pen/vZjozM)
[My Vue Directives Exercise Finish](https://codepen.io/codekiln/pen/RmLGWJ?editors=1111)

I had a challenge with getting the syntax on the options with v-for correct.

```vue
new Vue({
  el: '#app',
  data() {
    return {
      num1: 0,
      num2: 0,
      name: "",
      options: [
        { value: 'Asado' },
        { value: 'Barbacoa' },
        { value: 'Chorizo' },
        { value: 'Carnitas' }
      ]
    }
  },
  methods: {
    sum: function() {
      return this.num1 + this.num2;
    }
  }
})


<div id="app">
  <div class="row">
    <input v-model.number="num1"/>
    <span>+</span>
    <input v-model.number="num2"/>
    <span>=</span>
    <span v-text="sum(num1, num2)"/>
  </div>
  <div class="row second"> 
    <select v-model="name">
      <option v-for="option in options" :id="option.value" :value="option.value">{{option.value}}</option>
    </select>
    <p>My favorite kind of taco is {{ name }}</p>
  </div>
</div>
```

I didn't realize you could do calculation in moustache templates. 
I also forgot to put a v-if on the taco favorite. Here's the end result: 

```vue
new Vue({
  el: '#app',
  data() {
    return {
      num1: 0,
      num2: 0,
      name: "",
      options: [
        { value: 'Asado' },
        { value: 'Barbacoa' },
        { value: 'Chorizo' },
        { value: 'Carnitas' }
      ]
    }
  }
})

<div id="app">
  <div class="row">
    <input v-model.number="num1" type="number"/>
    <span>+</span>
    <input v-model.number="num2" type="number"/>
    <span>=</span>
    <span>{{num1 + num2}}</span>
  </div>
  <div class="row second"> 
    <select v-model="name">
      <option v-for="option in options" :id="option.value" :value="option.value">{{option.value}}</option>
    </select>
    <p v-if="name">My favorite kind of taco is {{ name }}</p>
  </div>

</div>
```