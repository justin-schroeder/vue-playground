# 04 Components

[04 Components Slides](http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/1)
password: `!vue!`
[Sarah Drasner's Github Repo Here](https://github.com/sdras/intro-to-vue)

## 04 Coponents - 01 Templates
https://frontendmasters.com/courses/vue/templates/

### don't need a component to use a template
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/2
```vue
var app = new Vue({
  el: '#app',
  template: '<div>hello mr. magoo</div>'
});

<div id="app"></div>
```

## 04 Coponents - 02 Components Introduction
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/4

**Component**: _A collection of elements that are encapsulated into a group 
that can be accessed through one single element._

### basic component
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/5

```vue
Vue.component('child', {
  template: `<div>hello mr. magoo</div>`
});

new Vue({
  el: "#app"
});

<div id="app">
  <child></child>
</div>
```

### simple example with props
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/6

```vue
Vue.component('child', {
  // you can rename `text` to any var name
  props: ['text'],
  template: `<div>{{ text }}</div>`
});

new Vue({
  el: "#app",
  data() {
    return {
      message: 'hello mr. magoo'
    }
  }
});

<div id="app">
  <child :text="message"></child>
</div>
```

In this example, the Vue app has `message` variable in scope. 
It's a bit weird to think about scopes here. Inside the `div id="app"` we have the `message` 
var in scope, I think. 

## 04 Coponents - 03 Props
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/7

### 04-03 types and validation
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/10

simple example of props validation: 
```vue
props: {
  // either a string or a number
  text: [String, Number]
}
```

more complete example of props validation: 

```vue
Vue.component('child', {
  props: {
    text: {
      type: String,
      required: true,
      // use a default!
      default: 'hello mr. magoo'
    }
  },
  template: `<div>{{ text }}<div>`
})
```

### 04-03 props for objects and arrays need defaults expressed as function 

http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/12

```vue
text: {
  type: Object,
  default: function () {
    return { message: 'hello mr. magoo' }
  }
}
```

### 04-03 you need to use v-bind or `:` to dynamically bind props from parent

http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/13

This shows that if you have a parent component and a child component, 
you can link a variable of the parent to a variable of the child
so that updates to one affect the other. 

```vue
// not bound to parent
<child count="1"></child>

// bound to parent
<child :count="count"></child>


Vue.component('child', {
  props: { 
    count: {
      type: Number,
      required: true
    }
  },
  template: `<div class="num">{{ count }}</div>`
})

new Vue({
  el: '#app',
  data() {
    return {
      count: 0    
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
})
```

### 04-03 each component has isolated scope
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/15

"data must be a function"
top counters are linked (wrong) while bottom counters are independent (right)

```vue
var data = { counter: 0 }

Vue.component('count1', {
  template: '#count',
  data() {
    return data
  }
})

Vue.component('count2', {
  template: '#count',
  data() {
    return {
      counter: 0
    }
  }
})

new Vue({
  el: '#app'
})

<div id="app">
  <div class="row">
    <h3>Data as an object</h3>
    <count1></count1>
    <count1></count1>
    <count1></count1>
  </div>
  
  <div class="row">
    <h3>Data as a function</h3>
    <count2></count2>
    <count2></count2>
    <count2></count2>
  </div>
</div>

<script type="text/x-template" id="count">
  <button @click="counter += 1">{{ counter }}</button>
</script>
```

She's saying that data must be a function instead of an object, 
but this example is a confusing illustration of that, because 
data is a function in both examples. The reason she did that 
is because vue warns that you shouldn't use an object.

If you change `data()` to `data: { counter: 0 }` in the top one, you get warnings: 

```text
"[Vue warn]: The 'data' option should be a function that returns a per-instance value in component definitions."
"[Vue warn]: Property or method 'counter' is not defined on the instance but referenced during render. Make sure to declare reactive data properties in the data option.

found in

---> <Count1>
       <Root>"
```

### 04-03 camelCasing will be converted automatically from js to html

if you use `props: ['booleanValue']`, you'd use it in html as 
`<checkbox :boolean-value="booleanValue"></checkbox>`.

## 04 Coponents - 04 Refactoring into a Component
https://frontendmasters.com/courses/vue/refactoring-into-a-component/
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/18

Comment component in codepen
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/21

### 04-04 lighthouse comment component - 1

in the below `full example code`, pay close attention to:
```vue
    <li
      is="individual-comment"
      v-for="comment in comments"
      v-bind:commentpost="comment"
    ></li>
```

#### the `is` directive to turn an li into a component

here, `is` is a vue directive that says the `li` is an `individual-comment` component
I hate how it's called `is`, that's so hard to google
See [SO vue.js: what's the difference between <component :is=“comp-name”/> and <div :is=“comp-name”/>?](https://stackoverflow.com/questions/50619025/vue-js-whats-the-difference-between-component-is-comp-name-and-div-is)
* basically, it's part of [HTML's Custom Element spec](https://stackoverflow.com/questions/27434431/what-is-html-is-attribute)
* it's supported in firefox and chrome, and safari to a limited extent
* is it required? does vue use it? don't know.

#### _Why do we use kebob case for component names here?

[See Vue v2 style guide: Component name casing in templates](https://vuejs.org/v2/style-guide/#Component-name-casing-in-templates-strongly-recommended)
* `PascalCase` is a new term for me - that's what they recommend for single file components
* for DOM templates, they recommend kebob-case

#### `v-bind:commentpost="comment"`
Here we're binding the `commentpost` variable of the `individual-comment` 
to the `comment` piece of `data` in the Vue app

#### full example code

```vue
Vue.component('individual-comment', {
  template: 
  `<li> {{ commentpost }} </li>`,
  props: ['commentpost']
});

new Vue({
  el: '#app',
  data: {
    newComment: '',
    comments: [
      'Looks great Julianne!',
      'I love the sea',
      'Where are you at?'
    ]
  },
  methods: {
    addComment: function () {
      this.comments.push(this.newComment)
      this.newComment = ''
    }
  }
});

<div id="app">
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-post-photo.jpg" class="main-photo">
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-main-profile.jpg" class="main-profile">
  <div class="main-info">
    <span class="name">Julianne Delfina</span> 
    <h3>"It's lovely after it rains"</h3>
  </div>
  <hr>
  <ul>
    <li
      is="individual-comment"
      v-for="comment in comments"
      v-bind:commentpost="comment"
    ></li>
  </ul>
  <input
    v-model="newComment"
    v-on:keyup.enter="addComment"
    placeholder="Add a comment"
  >
</div>
```

### 04-04 lighthouse comment component - 2 - template in DOM
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/23

Uses query selector to reference a component template stored in the DOM:

```vue
Vue.component('individual-comment', {
  template: '#comment-template',
  props: ['commentpost']
});
<script type="text/x-template" id="comment-template">
  <li> 
    <img class="post-img" :src="commentpost.authorImg" /> 
    <small>{{ commentpost.author }}</small>
    <p class="post-comment">"{{ commentpost.text }}"</p>
  </li>
</script>
```

* You could use other selectors, but it makes more sense if there's exactly one
* `#PetPeeves` I hate how hard it is to understand scope here. Here you have a DOM 
  template referencing a variable `commentpost` that's part of the app, and we're just 
  supposed to know it's in global app scope and not in the scope of the component that's 
  using the template. 
* `#PetPeeves` - it's very hard to grok what is going on when it replaces the li. We 
  see the `<li>` is the outermost element of the `#comment-template`, and somehow have to know
  that the `is` directive on the `<li>` in the bigger template gets applied to the 
  `<li>` in the smaller template. that's even hard to talk about!
  The whole point of this feature is to make it so that browsers "don't break" with 
  custom elements
  * she says the template is replacing the `innerText`

#### full example code

```vue
Vue.component('individual-comment', {
  template: '#comment-template',
  props: ['commentpost']
});

new Vue({
  el: '#app',
  
  data: {
    newComment: '',
    comments: [
      { 
        text: 'Looks great Julianne!',
        author: 'Robin Rendle',
        authorImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/v-coffee.jpg'
      },
      { 
        text: 'I love the Sea',
        author: 'Miriam Suzanne',
        authorImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/v-miriam.jpg'
      },
      { 
        text: 'Where are you?',
        author: 'Geoff Graham',
        authorImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/v-geoff.jpg'
      }
    ]
  },
  
  methods: {
    addComment: function () {
      const newCommentObj = {
        text: this.newComment,
        author: 'Magoo',
        authorImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/v-skull.jpg'
      };
      this.comments.push(newCommentObj);
      this.newComment = '';
    }
  }
});

<div id="app">
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-post-photo.jpg" class="main-photo">
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-main-profile.jpg" class="main-profile">
  <div class="main-info">
    <span class="name">Julianne Delfina</span> 
    <h3>"It's lovely after it rains"</h3>
  </div>
  <hr>
  <ul>
    <li
      is="individual-comment"
      v-for="comment in comments"
      v-bind:commentpost="comment"
    ></li>
  </ul>
  <input
    v-model="newComment"
    v-on:keyup.enter="addComment"
    placeholder="Add a comment"
  >
</div>

<!-- This is the Individual Comment Component -->
<script type="text/x-template" id="comment-template">
<li> 
	<img class="post-img" :src="commentpost.authorImg" /> 
  <small>{{ commentpost.author }}</small>
  <p class="post-comment">"{{ commentpost.text }}"</p>
</li>
</script>

```

### 04-04 lighthouse comment component - 3 - "Local Component"
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/25

```vue
const IndividualComment = {
  template: '#comment-template',
  props: ['commentpost']
}
```

if it's all in the same file as the Vue instance
this works in codepen
* `#PetPeeves` why are there so many ways to do it? Vue is like PHP

## 04 Coponents - 05 Communicating Events
https://frontendmasters.com/courses/vue/communicating-events/
slides: http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/26

we've been passing static values or binding dynamic values so far
but sometimes we need events

### 04-05 event example - 1
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/27

* open codepen in codepen debug view using the dev tools
* click button, see warning from vue: 
  > [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "text"
* _"props are for parent to child propagation, it's not the other direction"_ 0150

#### 04-05 event example - 1 - full example code
Here we declare a `child` component that uses the template with id `child`. 
In that template we have a button whose click event calls the `talkToMe` method on the component.
In the method, we set `this.text`, which is props. Vue warns against "mutating props" like this.
Why? because mutations won't propagate up. 

```vue
Vue.component('child', {
  props: ['text'],
  template: '#child',
  methods: {
    talkToMe() {
      this.text = 'forget introductions, I want a taco'
    }
  }
});

var vm = new Vue({
  el: "#app",
  data() {
    return {
      message: 'hello mr. magoo'
    }
  }
});

<div id="app">
  <child :text="message"></child>
</div>

<script type="text/x-template" id="child">
  <div>
    <p>{{ text }}</p>
    <button @click="talkToMe">Let's talk</button>
  </div>
</script>
```

#### instead, use `$emit`
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/28

* use `$emit` to report the activity of the child component to the parent
* here, `myEvent` is bubbled up from the child, and `parentHandler`


```vue
<my-component @myEvent="parentHandler"></my-component>

methods: {
  fireEvent() {
    this.$emit('myEvent', eventValue);
  }
}
```

? is this a DOM Event?

### 04-05 event example - 2 - with event bubbling

Changes "hello mr. magoo" in parent component to "forget introductions, I want a taco"

use `this.$emit('changetext', 'forget introductions, I want a taco')`.
in the markup, bind the `@changetext` to a handler
* notice you can put js directly in, and it will create a handler `message = $event`
  * `#PetPeeve` - this opens up questions about scope and closure, why did they do this?

```vue
Vue.component('child', {
  props: ['text'],
  template: '#child',
  methods: {
    talkToMe() {
      this.$emit('changetext', 'forget introductions, I want a taco')
    }
  }
});

new Vue({
  el: "#app",
  data() {
    return {
      message: 'hello mr. magoo'
    }
  }
});

<div id="app">
  <child :text="message" @changetext="message = $event"></child>
  <pre>{{ $data }}</pre>
</div>

<script type="text/x-template" id="child">
  <div>
    <p>{{ text }}</p>
    <button @click="talkToMe">Let's talk</button>
  </div>
</script>
```

### 04-05 event example - 3 - bouncing ball
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/32
0630

this example uses a lot of binding, and uses `:style` inside `<svg`
but that has nothing to do with the point

she uses `vueThis` as a proxy for `this`, strange

A couple examples here of propagating events to parent & keeping state separate / state local

### 04-05 event example - 4 - backpack
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/37


## 04-06 slots
https://frontendmasters.com/courses/vue/slots/
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/40

slots are like `...children` in react. 

### 04-06 slots - 1 - basic 
Here we have an `app-child` component that has some child content:
```vue
<app-child>
  <h3>This is slot number one</h3>
</app-child>
```

That `<h3>` gets inserted in `<slot>` below.

codepen: http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/43

```vue
<script type="text/x-template" id="childarea">
  <div class="child">
    <slot></slot>
    <p>It's a veritable slot machine!<br> 
    Ha ha aw</p>
  </div>
</script>

<div id="app">
  <h2>We can use slots to populate content</h2>
  <app-child>
    <h3>This is slot number one</h3>
  </app-child>
  <app-child>
    <h3>This is slot number two</h3>
    <small>I can put more info in, too!</small>
  </app-child>
</div>
```

### [slots - 2 - defaults](http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/44)
* You can have defaults with slots - just put it inside
* if you have more than one slot, then you need to name them: 
  `<slot name="headerinfo"></slot>`, then you use them from the parent component
  as so: `<h1 slot="headerinfo">I will populate the headerinfo slot</h1>`
  
### [slots - 3 - Wine label designer](http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/47)

https://frontendmasters.com/courses/vue/slots/ at 0313
uses svg
uses lots of components whose templates are in the html
* I'm not as familiar with the `components` hash yet
uses inline click handlers: `<button @click="wineFont ='Alegreya SC'">Alegreya SC</button>`
* `#PetPeeves` it still seems so ugly that we're mutating everywhere. Most people who have taken 
  computer science classes prefer immutable updates
uses v-bind with variables inside of string: `<g :style="{transform: 'translateY(' + labelPlacement + 'px)'}">`
* `#PetPeeves` how are we supposed to know what Vue supports in these inline expressions?
  it's able to detect variables inside strings somehow, but it this just 
  doesn't feel natural in JS, it seems like they must be doing custom regex. 
  When this fails, I highly doubt it will be an intuitive failure with a great error message.


#### slots - 3 - Wine label designer - example code

```vue
const app = new Vue({
  el: '#app',
  data() {
    return {
      selected: 'appBlack',
      label: 'Label Name',
      wineFont: 'Montserrat',
      flourish: 'none',
      wineImg: 'none',
      imgOpacity: 0.8,
      labelPlacement: 0,
      labelColor: '#000000'
    };
  },
  components: {
    'appBlack': {
      template: '#black'
    },
    'appWhite': {
      template: '#white'
    },
    'appFlor1': {
      template: '#flor1'
    },
    'appFlor2': {
      template: '#flor2'
    },
    'appFlor3': {
      template: '#flor3'
    },
  }
});

<div id="app">
  <div class="container">

  <main>
      <component :is="selected">
        <svg class="winebottle" aria-labelledby="title" xmlns="http://www.w3.org/2000/svg" viewBox="0 155 140 300">
          <defs>
            <filter id="inverse">
              <feComponentTransfer>
                <feFuncR type="table" tableValues="1 0"/>
                <feFuncG type="table" tableValues="1 0"/>
                <feFuncB type="table" tableValues="1 0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <title id="title">Wine Bottle</title>
          <g>
              <path class="bottle" d="M80.8,465.7c40.6,0,56.8-4.5,56.8-4.5,12-3.2,12-17.2,12-17.2v-148c0-57.4-18.5-90.6-18.5-90.6-24-45.1-27.9-95.4-27.9-95.4l-2.3-64.6c0-4.2,2.9-5.5,2.9-5.5V25.2l-2.9-1.9V18.7c-4.2-5.5-20.1-4.9-20.1-4.9s-15.9-.6-20.1,4.9v4.5l-2.9,1.9V39.8s2.9,1.3,2.9,5.5l-2.3,64.6s-3.9,50.3-27.9,95.4c0,0-18.5,33.1-18.5,90.6v148s0,14,12,17.2C24,461.1,40.2,465.7,80.8,465.7Z" transform="translate(-12 -13.8)" />
              <path class="label" d="M12,295.9s56.5,5,137.6,0V409S78.1,423.6,12,409Z" transform="translate(-12 -13.8)" :style="{ fill: labelColor }"/>
              <image class="bkimg" x="0" y="293" width="138" height="100" xmlns:xlink="http://www.w3.org/1999/xlink" 
              :xlink:href="'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/' + wineImg + '.png'" 
              :style="{opacity: imgOpacity }"></image>
          </g>
          <g :style="{transform: 'translateY(' + labelPlacement + 'px)'}">
              <text class="wine-text" transform="translate(68 308.2)" text-anchor="middle" font-size="14" :style="{fontFamily: wineFont}">
                {{ label }}
              </text>
              <g class="flor" id="bottomflor1" v-if="flourish === 'A'">
                <app-flor1></app-flor1>
              </g>
              <g class="flor" id="bottomflor2" v-if="flourish === 'B'">
                <app-flor2></app-flor2>
              </g>
              <g class="flor" id="bottomflor3" v-if="flourish === 'C'">
                <app-flor3></app-flor3>
              </g>
              <g v-else></g>
          </g>
      </svg>
      </component>
    </main>

    <aside>
      <h4>Name your Wine</h4>
      <input v-model="label" maxlength="18">
      <div class="button-row">
        <h4>Color</h4>
        <button @click="selected ='appBlack', labelColor = '#000000'">Black Label</button>
        <button @click="selected ='appWhite', labelColor = '#ffffff'">White Label</button>
        <input type="color" v-model="labelColor" defaultValue="#ff0000">
      </div>
      <div class="button-row">
        <h4>Font</h4>
        <button @click="wineFont ='Alegreya SC'">Alegreya SC</button>
        <button @click="wineFont ='Anton'">Anton</button>
        <button @click="wineFont ='Bigelow Rules'">Bigelow Rules</button>
        <button @click="wineFont ='Cormorant Garamond'">Cormorant Garamond</button>
        <button @click="wineFont ='IM Fell English'">IM Fell English</button>
        <button @click="wineFont ='Londrina Shadow'">Londrina Shadow</button>
        <button @click="wineFont ='Megrim'">Megrim</button>
      </div>
      <div class="button-row">
        <h4>Flourish</h4>
        <button @click="flourish ='A'">Flourish A</button>
        <button @click="flourish ='B'">Flourish B</button>
        <button @click="flourish ='C'">Flourish C</button>
        <button @click="flourish ='none'">None</button>
      </div>
      <div class="button-row">
        <h4>Background Image</h4>
        <button @click="wineImg ='geo'">Geo</button>
        <button @click="wineImg ='phone'">Phone</button>
        <button @click="wineImg ='burst'">Burst</button>
        <button @click="wineImg ='abstract'">Abstract</button>
        <button @click="wineImg ='cards'">Cards</button>
        <button @click="wineImg ='circuit'">Circuit</button>
        <button @click="wineImg ='woodgrain'">Woodgrain</button>
        <button @click="wineImg ='none'">None</button>
      </div>
      <div class="button-row">
        <h4>Image Opacity</h4>
        <div class="v-range-slider">
          <input type="range" min="0" v-model="imgOpacity" max="1" step="0.01" name="opacity">
        </div>
      </div>
      <div class="button-row">
        <h4>Label Placement</h4>
        <div class="v-range-slider">
          <input type="range" min="0" v-model="labelPlacement" max="75" step="1" name="label placement">
        </div>
      </div>
    </aside>
  </div>
</script>
</div>

<script type="text/x-template" id="black">
  <div class="black">
	  <slot></slot>
  </div>
</script>

<script type="text/x-template" id="white">
  <div class="white">
	  <slot></slot>
  </div>
</script>

<script type="text/x-template" id="flor1">
  	<g>
		<path d="M63.5,344.8a4.4,4.4,0,0,1-5.3,2.1,5.5,5.5,0,0,1-3.8-4.6,5.3,5.3,0,0,1,3.2-5,5.5,5.5,0,0,1,5.5.7c3.4,2.2,5.3,6.9,9.1,9a12.7,12.7,0,0,0,5.9,1.5,7.3,7.3,0,0,0,5.6-2.4,7,7,0,0,1-5.6,2,12.4,12.4,0,0,1-5.8-1.6c-3.6-2.1-5.4-6.7-9-9.2a6,6,0,0,0-6.1-.6,5.9,5.9,0,0,0-3.4,5.6,5.8,5.8,0,0,0,4.1,4.9A4.6,4.6,0,0,0,63.5,344.8Z" transform="translate(-12 -13.8)" />
	  <path d="M66.4,338a7.4,7.4,0,0,1,3.5-3.1,6.5,6.5,0,0,1,4.3-.1,8.2,8.2,0,0,1,5.6,6.8,8,8,0,0,1-4.7,7.5c-2.7,1.4-5.8.7-8.3-1-5.1-3.3-7.9-10.2-13.4-13.3a18.5,18.5,0,0,0-8.7-2.3,10.5,10.5,0,0,0-8.2,3.4,10.3,10.3,0,0,1,8.2-3.1,18.2,18.2,0,0,1,8.5,2.4c5.4,3.1,8,9.9,13.3,13.5,2.6,1.7,6,2.4,8.8.9a8.1,8.1,0,0,0-1.1-15.2,6.8,6.8,0,0,0-4.5.3A7.6,7.6,0,0,0,66.4,338Z" transform="translate(-12 -13.8)" />
	  <path d="M91.7,344.8a4.4,4.4,0,0,0,5.3,2.1,5.5,5.5,0,0,0,3.8-4.6,5.3,5.3,0,0,0-3.2-5,5.5,5.5,0,0,0-5.5.7c-3.4,2.2-5.3,6.9-9.1,9a12.7,12.7,0,0,1-5.9,1.5,7.3,7.3,0,0,1-5.6-2.4,7,7,0,0,0,5.6,2,12.4,12.4,0,0,0,5.7-1.6c3.6-2.1,5.4-6.7,9-9.2a6,6,0,0,1,6.1-.6,5.9,5.9,0,0,1,3.4,5.6,5.8,5.8,0,0,1-4.1,4.9A4.6,4.6,0,0,1,91.7,344.8Z" transform="translate(-12 -13.8)" />
	  <path d="M88.9,338a7.4,7.4,0,0,0-3.5-3.1,6.5,6.5,0,0,0-4.3-.1,8.2,8.2,0,0,0-5.7,6.8,8,8,0,0,0,4.7,7.5c2.7,1.4,5.8.7,8.3-1,5.1-3.3,7.9-10.2,13.4-13.3a18.5,18.5,0,0,1,8.7-2.3,10.5,10.5,0,0,1,8.2,3.4,10.3,10.3,0,0,0-8.2-3.1,18.2,18.2,0,0,0-8.5,2.4c-5.4,3.1-8,9.9-13.3,13.5-2.6,1.7-6,2.4-8.8.9A8.1,8.1,0,0,1,81,334.5a6.8,6.8,0,0,1,4.5.3A7.6,7.6,0,0,1,88.9,338Z" transform="translate(-12 -13.8)" />
	  <rect x="22.6" y="314" width="88.1" height="0.62" />
  </g>
</script>

<script type="text/x-template" id="flor2">
	<g>
		<path d="M85.4,341.4a3.1,3.1,0,0,1-2.5-.8,6.1,6.1,0,0,1-1.7-2.4,5.8,5.8,0,0,1-.4-3,4.4,4.4,0,0,1,1.4-2.6,5.3,5.3,0,0,1,5.2-.9,5.8,5.8,0,0,1,2.4,1.5,16.5,16.5,0,0,1,1.7,2.4,27.4,27.4,0,0,0,3.2,4.8,6.2,6.2,0,0,0,2.2,1.5,5.3,5.3,0,0,0,2.5.3,5.4,5.4,0,0,0,4.2-2.9,7.3,7.3,0,0,0,.8-2.8,8.9,8.9,0,0,0-.2-2.9,7.8,7.8,0,0,0-3.1-4.5,9.8,9.8,0,0,0-4.9-1.7,9.3,9.3,0,0,0-5.1,1,8.2,8.2,0,0,0-3.7,4,9,9,0,0,0-.3,5.8,12.4,12.4,0,0,0,2.7,5.1,10.3,10.3,0,0,0,4.5,3.1,6.6,6.6,0,0,0,5.2-.4,6.7,6.7,0,0,1-5.2.6,10.4,10.4,0,0,1-4.6-3,12.7,12.7,0,0,1-2.9-5.2,9.4,9.4,0,0,1,.3-6.1,8.5,8.5,0,0,1,3.8-4.3,9.8,9.8,0,0,1,5.3-1.1,10.2,10.2,0,0,1,5.2,1.8,8.3,8.3,0,0,1,3.3,4.8,9.6,9.6,0,0,1,.2,3.1,7.9,7.9,0,0,1-.8,3,5.9,5.9,0,0,1-4.6,3.2,5.7,5.7,0,0,1-2.7-.4,6.6,6.6,0,0,1-2.3-1.7,26.4,26.4,0,0,1-3.2-4.9,16.2,16.2,0,0,0-1.6-2.4,5.4,5.4,0,0,0-2.2-1.5,5,5,0,0,0-5,.7,4.1,4.1,0,0,0-1.4,2.4,5.6,5.6,0,0,0,.4,2.9,6.1,6.1,0,0,0,1.6,2.4A3.1,3.1,0,0,0,85.4,341.4Z" transform="translate(-12 -13.8)" />
    <path d="M93.1,329.8a1.5,1.5,0,0,0-1.2-.1l-1.2.5a8.3,8.3,0,0,0-2,1.7,3.8,3.8,0,0,0-1.1,2.4,2.6,2.6,0,0,0,1.5,2,4.2,4.2,0,0,0,4.7-.1,27.1,27.1,0,0,0,4.1-3.2c1.3-1.2,2.6-2.4,4-3.5a14.1,14.1,0,0,1,4.5-2.6,10.1,10.1,0,0,1,5.1-.5,3.8,3.8,0,0,1,2.3,1.4,4.7,4.7,0,0,1,.8,2.9,4.3,4.3,0,0,1-1,2.8,7.5,7.5,0,0,1-2.2,1.6,24.7,24.7,0,0,1-4.8,2l-1.3.2a2.1,2.1,0,0,1-1.4-.3,2.3,2.3,0,0,1-.9-1.2,2.2,2.2,0,0,1,.2-1.6,6.4,6.4,0,0,1,1.9-2,8.1,8.1,0,0,1,2.3-1.2,19.8,19.8,0,0,1,19.1,4.4,14.3,14.3,0,0,0-4.3-2.8,26.7,26.7,0,0,0-4.8-1.6,16,16,0,0,0-4.9-.4,18.3,18.3,0,0,0-4.9.9,7.6,7.6,0,0,0-2.2,1.2,5.9,5.9,0,0,0-1.7,1.9,1.5,1.5,0,0,0-.2,1.1,1.7,1.7,0,0,0,.7.9,3,3,0,0,0,2.3,0,24.4,24.4,0,0,0,4.6-2,6.8,6.8,0,0,0,2-1.5,3.5,3.5,0,0,0,.8-2.4,3.9,3.9,0,0,0-.7-2.5,3.3,3.3,0,0,0-2-1.2,9.7,9.7,0,0,0-4.8.5,13.6,13.6,0,0,0-4.4,2.5l-4,3.5a27.6,27.6,0,0,1-4.2,3.2l-1.2.6-1.3.2a5.2,5.2,0,0,1-2.5-.7,3.6,3.6,0,0,1-1-.9,2.4,2.4,0,0,1-.5-1.4,2.8,2.8,0,0,1,.4-1.4,5.6,5.6,0,0,1,.8-1.1,8.3,8.3,0,0,1,2.1-1.6l1.2-.5A1.5,1.5,0,0,1,93.1,329.8Z" transform="translate(-12 -13.8)" />
    <path d="M77.7,341.4a3.1,3.1,0,0,0,2.5-.8,6.1,6.1,0,0,0,1.7-2.4,5.8,5.8,0,0,0,.4-3,4.4,4.4,0,0,0-1.4-2.6,5.3,5.3,0,0,0-5.2-.9,5.8,5.8,0,0,0-2.4,1.5,16.3,16.3,0,0,0-1.7,2.4,27.7,27.7,0,0,1-3.2,4.8,6.1,6.1,0,0,1-2.2,1.5,5.2,5.2,0,0,1-2.5.3,5.4,5.4,0,0,1-4.2-2.9,7.3,7.3,0,0,1-.8-2.8,8.8,8.8,0,0,1,.2-2.9,7.7,7.7,0,0,1,3.1-4.5,9.8,9.8,0,0,1,4.9-1.7,9.3,9.3,0,0,1,5.1,1,8.2,8.2,0,0,1,3.7,4,9,9,0,0,1,.3,5.8,12.5,12.5,0,0,1-2.7,5.1,10.3,10.3,0,0,1-4.5,3.1,6.6,6.6,0,0,1-5.2-.4,6.7,6.7,0,0,0,5.2.6,10.4,10.4,0,0,0,4.6-3,12.7,12.7,0,0,0,2.9-5.2,9.5,9.5,0,0,0-.3-6.1,8.5,8.5,0,0,0-3.8-4.3,9.8,9.8,0,0,0-5.3-1.1,10.2,10.2,0,0,0-5.2,1.8,8.3,8.3,0,0,0-3.3,4.8,9.6,9.6,0,0,0-.2,3.1,8,8,0,0,0,.8,3,5.9,5.9,0,0,0,4.6,3.2,5.7,5.7,0,0,0,2.7-.4,6.6,6.6,0,0,0,2.3-1.7,26.4,26.4,0,0,0,3.2-4.9,16.2,16.2,0,0,1,1.6-2.4,5.5,5.5,0,0,1,2.2-1.5,5,5,0,0,1,5,.7,4.1,4.1,0,0,1,1.4,2.4,5.6,5.6,0,0,1-.4,2.9,6.1,6.1,0,0,1-1.6,2.4A3.1,3.1,0,0,1,77.7,341.4Z" transform="translate(-12 -13.8)" />
    <path d="M65.1,329.8a1.4,1.4,0,0,1,1.2-.1l1.2.5a8.3,8.3,0,0,1,2,1.7,3.8,3.8,0,0,1,1.1,2.4,2.6,2.6,0,0,1-1.5,2,4.2,4.2,0,0,1-4.7-.1,27.3,27.3,0,0,1-4.1-3.2c-1.3-1.2-2.6-2.4-4-3.5a14.1,14.1,0,0,0-4.5-2.6,10.1,10.1,0,0,0-5.1-.5,3.8,3.8,0,0,0-2.4,1.4,4.7,4.7,0,0,0-.8,2.9,4.3,4.3,0,0,0,1,2.8,7.4,7.4,0,0,0,2.2,1.6,24.8,24.8,0,0,0,4.8,2l1.3.2a2.1,2.1,0,0,0,1.4-.3,2.3,2.3,0,0,0,.9-1.2,2.2,2.2,0,0,0-.2-1.6,6.4,6.4,0,0,0-1.9-2,8.1,8.1,0,0,0-2.3-1.2,19.8,19.8,0,0,0-19.1,4.4,14.2,14.2,0,0,1,4.3-2.8,26.7,26.7,0,0,1,4.8-1.6,16,16,0,0,1,4.9-.4,18.3,18.3,0,0,1,4.9.9,7.7,7.7,0,0,1,2.2,1.2,5.9,5.9,0,0,1,1.7,1.9,1.5,1.5,0,0,1,.2,1.1,1.8,1.8,0,0,1-.7.9,3,3,0,0,1-2.3,0,24.4,24.4,0,0,1-4.6-2,6.8,6.8,0,0,1-2-1.5,3.5,3.5,0,0,1-.8-2.4,3.9,3.9,0,0,1,.7-2.5,3.3,3.3,0,0,1,2-1.2,9.7,9.7,0,0,1,4.8.5,13.6,13.6,0,0,1,4.4,2.5l4,3.5a27.6,27.6,0,0,0,4.2,3.2l1.2.6,1.3.2a5.2,5.2,0,0,0,2.5-.7,3.6,3.6,0,0,0,1-.9,2.4,2.4,0,0,0,.5-1.4,2.8,2.8,0,0,0-.4-1.4,5.7,5.7,0,0,0-.8-1.1,8.3,8.3,0,0,0-2.1-1.6l-1.2-.5A1.5,1.5,0,0,0,65.1,329.8Z" transform="translate(-12 -13.8)" />
  </g>
</script>


<script type="text/x-template" id="flor3">
<g>
		<path d="M51.7,328.3c-.7-.6-4.3.9-5,1.4a19.3,19.3,0,0,0-3.8,3.6,8.2,8.2,0,0,1-6.6,2.4c-4.5-.4-8.1-6.7-4.7-10.3a4.8,4.8,0,0,1,3.1-1.8c-1.3,1.4-3.2,4.8-1.5,6.8s5.4,1,4.5-1.7a1.3,1.3,0,0,0-1.4.7c-1.3-2.6,1.9-4,3.4-2a4.6,4.6,0,0,1-.4,5.8c2.1-.8,2-4.1,1.8-6s1.9-.8,2.3.6-.4,2.1-.7,3c.3-1.1,1.8-3.6,2.8-4.1S50,326.8,51.7,328.3Z" transform="translate(-12 -13.8)" />
    <rect x="37" y="313.8" width="37.7" height="0.55" />
    <path d="M108.6,328.3c.7-.6,4.3.9,5,1.4a19.2,19.2,0,0,1,3.8,3.6,8.2,8.2,0,0,0,6.6,2.4c4.5-.4,8.1-6.7,4.7-10.3a4.8,4.8,0,0,0-3.1-1.8c1.3,1.4,3.2,4.8,1.5,6.8s-5.4,1-4.5-1.7a1.3,1.3,0,0,1,1.4.7c1.3-2.6-1.9-4-3.4-2a4.6,4.6,0,0,0,.4,5.8c-2.1-.8-2-4.1-1.8-6s-1.9-.8-2.3.6.4,2.1.7,3c-.3-1.1-1.8-3.6-2.8-4.1S110.3,326.8,108.6,328.3Z" transform="translate(-12 -13.8)" />
    <rect x="61.5" y="313.8" width="37.7" height="0.55" />
    <path d="M113,330.2l-.4-.4h-65l-.5.3-.7.7h67.1Z" transform="translate(-12 -13.8)" />
  </g>
</script>
```

#### slots - 3 - Wine label designer - code highlights
http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/49

##### slots - 3 - wine label designer - `<component :is="selected">`
I don't know what's going on here - she has a `<component :is="selected">` but 
nowhere did we create a component named `component`. 
* is that a vue built-in component? 
* `#PetPeeves` - how am I supposed to google for this `<component>`? It's a component named component.
* I searched for "Vue component component" and got to [vue docs for Dynamic & Async Components](https://vuejs.org/v2/guide/components-dynamic-async.html)
  * that linked to [Component Basics](https://vuejs.org/v2/guide/components.html)
  * I've seen `Vue.component()` before, where is `<component>`?
Here is the intro: [Vue Docs - Dynamic Components](https://vuejs.org/v2/guide/components.html#Dynamic-Components)
* so `<component :is="selected">` uses the contents of the `selected` data key to determine which template to load.
  it's a little like a switch. 
* she's declared a lot of components in one by putting them on the Vue instance: 
  ```vue
  components: {
    'appBlack': {
      template: '#black'
    },
    'appWhite': {
      template: '#white'
    },
    'appFlor1': {
      template: '#flor1'
    },
    'appFlor2': {
      template: '#flor2'
    },
    'appFlor3': {
      template: '#flor3'
    },
  }
  ```
* this is shorter than doing `Vue.component('appBlack, ...)`, `Vue.component('appWhite', ....)`, ... 
* here we're switching the top-level component, and using a slot in the templates to be able to pass in 
  the content. that's a cool combination, though it seems a little obscure since there are no constraints 
  on the values.

#### slots - 3 - wine label designer - comma expressions in click handlers
`<button @click="selected ='appBlack', labelColor = '#000000'">Black Label</button>`
She uses the comma operator in an inline event handler. 
* `#PetPeeves` - this seems to be another great example of weirdness in the inline expressions in 
  Vue. If it really is wrapping the contents in a function call, why not use a semicolon?

finished with https://frontendmasters.com/courses/vue/slots/ 

## 04-07 `keep-alive` and dynamic components
https://frontendmasters.com/courses/vue/keep-alive/
