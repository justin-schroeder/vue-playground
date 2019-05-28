# 04 Components

[04 Components Slides](http://slides.com/sdrasner/intro-to-vue-3?token=LwIVIblm#/1)
password: `!vue!`

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
