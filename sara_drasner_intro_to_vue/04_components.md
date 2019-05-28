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

