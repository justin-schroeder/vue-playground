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

* use a method for the form
* use computed property for filtering
* they have a form with select & options to begin 

### add a new blog post when submitted
we want to use the [html submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)
I used the `submit.prevent` modifier. I had to put it on the form

### filter blog posts by label
I needed to use `this.posts.filter(p => p.label.match(new RegExp(this.selected, "i")))` to get this to work

### 2: Updating a Blog - My solution: 
[Methods and Computed Exercise WIP](https://codepen.io/codekiln/pen/pmWPYV)
```vue
<div id="app">
  <div class="contain">
    <h2>Blog Posts</h2>

    <div class="new">
      <h3>Add a New Post</h3>
      <form @submit.prevent="addNewPost">
        <input v-model="newTitle" placeholder="title" required/>
        <input v-model="newAuthor" placeholder="author name" required/>
        <select v-model="newLabel" required>
          <option disabled value="">Add a New label</option>
          <option>Science</option>
          <option>Math</option>
          <option>Poetry</option>
          <option>History</option>
        </select>
        <button type="submit">Add New Blog Post</button>
      </form>
    </div>

    <select v-model="selected" @change="selectedLabels">
      <option disabled value="">Filter with a label</option>
      <option>Science</option>
      <option>Math</option>
      <option>Poetry</option>
      <option>History</option>
    </select>

    <div v-for="(post, i) in selectedLabels" class="post">
      <span class="label">{{ post.label }}</span>
      <p>{{ post.title }}</p>
      <small>{{ post.author }}</small>
    </div>
  </div>
</div>

new Vue({
  el: '#app',
  data() {
    return {
      selected: '',
      posts: [
        {
          author: '@vFitzgerald',
          title: 'Quod Ducimus Omnis',
          label: 'science'
        },
        {
          author: '@mPalmer',
          title: 'Vero Eius Laboriosam Ex Repudiandae',
          label: 'math'
        },
        {
          author: '@mDean',
          title: 'Magnam Odit',
          label: 'science'
        },
        {
          author: '@tCole',
          title: 'Velit Mollitia Voluptates Assumenda',
          label: 'science'
        },
        {
          author: '@jCooper',
          title: 'Eum Commodi Cupiditate',
          label: 'poetry'
        },
        {
          author: '@lLamb',
          title: 'Amet',
          label: 'history'
        },
        {
          author: '@fMartin',
          title: 'Voluptatem Fuga Cum Asperiores Error',
          label: 'science'
        },
        {
          author: '@eHayes',
          title: 'Ipsa Consectetur Rerum Repellat Quia',
          label: 'math'
        },
        {
          author: '@cCollier',
          title: 'Dolor Nihil Delectus',
          label: 'science'
        },
        {
          author: '@cBenson',
          title: 'Labore Ipsum Ad Pariatur',
          label: 'poetry'
        }
      ],
      newTitle: '',
      newAuthor: '',
      newLabel: '',
    }
  },
  
  methods: {
    addNewPost: function(e) {
      this.posts.push({title: this.newTitle, author: this.newAuthor, label: this.newLabel});
    }
  },
  
  computed: {
    selectedLabels: function() {
      if (!this.selected) {
        return this.posts;
      }
      const selectedFilter = new RegExp(this.selected, 'i');
      return this.posts.filter(post => post.label.match(selectedFilter));
    }
  }
 
})
```

### 2: Updating a Blog - Sarah's solution
I missed this - we should empty out the previous post.
fixed in codepen. 

Sara's solution - why does she do this? 
```vue
methods: {
  addPost() {
     let addedPost = new Object({
       author: this.newAuthor,
       title: this.newTitle,
       label: this.newLabel
     });
  }
}
```

first of all, why is she using let instead of const?
second of all, why declare a new object, and pass the JSON to it???

## 3. Methods, Computed & Watchers - 5 Reactive Programming
[slides - watchers and reactivity](http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/22)

programming with asynchronous data streams
* A stream is a sequence of ongoing events ordered in time that offer some hooks with which to observe it.

according to her, RxJS is just one library that implements reactivity in JS.

the point is to update state in reaction to events
[Andre Staltz' post about this](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

### what is reactive?
Vue, MobX
React is not "Reactive" - it uses "pull" rather than "push"
* [React design documentation](https://facebook.github.io/react/contributing/design-principles.html#scheduling)
* [Vue Reactivity Documentation](https://vuejs.org/v2/guide/reactivity.html)
* [Damian Dulisz' post](https://www.monterail.com/blog/2016/how-to-build-a-reactive-engine-in-javascript-part-1-observable-objects)

## 3. Methods, Computed & Watchers - 6 Watchers
slides: http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/25

### How does Vue use reactivity? 
It takes the `data` prop, then converts them to getters/setters
each component has a watcher instance
properties touched by the watcher during render are registered as dependencies
* Vue knows they are called because it has created the getter
* when setter is triggered, it lets the watcher know, and causes the component to re-render

### watcher pen 1
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/27
you can see that the getters and setters for the added property don't get added
the vue instance = the middleman between DOM and the business logic
watchers are good for things like async updates
* updates / transitions with data changes

### watcher pen 2 - create the simplest watcher with a counter
you place a function _named the same as a key from your data object_ in a key called `watch`, 
then it gets called when the data item changes:

```vue
new Vue({
  el: '#app',
  data () {
    return {
      counter: 0
    }
  },
  watch: {
    counter(counter) {
      console.log('The counter has changed!')
    }
  }
});

<div id="app">
  <input type="number" v-model.number="counter"></input>
</div>
```

### watcher pen 3 - punk beers - Vue watchers + axios to do infinite scroll
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/31
uses `https://punkapi.com/v2/beers/random`
uses the [`created()` Vue item](https://vuejs.org/v2/api/#created)
on created, set it so that scroll events call `this.bottomVisible()` & set result to `this.bottom`
this makes it so `this.bottom` is a boolean that is true if you can see the bottom
when it changes, if it is true, then it adds a beer
clever!

### watchers - access to new and old value
http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/36
```vue
watch: {
  watchedProperty (value, oldValue) {
    //your dope code here
  }
},
```

There's also an ability to gain access to nested values with `deep`
```vue
watch: {
  watchedProperty {
    deep: true,
    nestedWatchedProperty (value, oldValue) {
      //your dope code here
    }
  }
},
```

we use oldValue and value with requestanimationframe to animate transitions

She uses "greensock" library to "tween" between values before and after
example: http://slides.com/sdrasner/intro-to-vue-2?token=502n2b7V#/37

end