# 06 Animations

[05 Animations Intro](http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/1)  
password: `!vue!`
[Sarah Drasner's Github Repo Here](https://github.com/sdras/intro-to-vue)  

## 06-01 Introducing Animations
[06-01 Introducing Animations starting video](https://frontendmasters.com/courses/vue/introducing-animations/)
[06-01 Introducing Animations starting slides](http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/1)

Transitions: taking a thing and interpolating between two of its states (example: changing opacity)
Animations: have multiple states

### 06-01 Introducing Animations - ex1 - modal
[06-01 Introducing Animations - ex1 - modal slides](http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/6)  

We have a modal and it's going to show a child and then show a child button
Humans aren't accustomed to this - things happen in transitions
The vue component `<transition name="fade">` is built-in: 

```vue
<transition name="fade">
  <app-child v-if="isShowing" class="modal">
    <button @click="toggleShow">
      Close
    </button>
  </app-child>
</transition>
```

Not everything needs a `<transition>` component

### 06-01 Introducing Animations - transition component
http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/9
`v-enter-active` - `v-enter` to `v-enter-to`
`v-leave-active` - `v-leave` to `v-leave-to`

This is using classes that vue puts in there, example: 
```vue
.v-enter-active {
  transition: color 1s;
}
```

Another example - 

```vue
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
```

* `ease-in` is good for exits
* `ease-out` is good for entrances

this is the default (so it's unnecessary):

```vue
.fade-enter-to, .fade-leave {
  opacity: 1;
}
```

### 06-01 Introducing Animations - questions about transitions
What is this about? are these really classes we'll put in `<styles>`?
Answer: Yes (see below)

### 06-01 Introducing Animations - modal with transitions - codepen
http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/11

```vue
<template>
  <div id="app">
      <h3>Let's trigger this here modal!</h3>
      <button @click="toggleShow">
        <span v-if="isShowing">Hide child</span>
        <span v-else>Show child</span>
      </button>
    <transition name="fade">
      <app-child v-if="isShowing" class="modal">
        <button @click="toggleShow">
          Close
        </button>
      </app-child>
    </transition>
  </div>
  
  <script type="text/x-template" id="childarea">
    <div>
      <h2>Here I am!</h2>
          <slot></slot>
    </div>
  </script>
</template>

<style>
  body {
    font-family: 'Roboto Mono', serif;
    display: flex;
    justify-content: center;
  }
  
  #app {
    text-align: center;
    margin: 60px;
    max-width: 370px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  button {
    font-family: 'Roboto Mono';
    border: 2px solid black;
    background: white;
    padding: 10px 15px;
    margin: 0 10px;
    outline: 0;
    width: 60%;
    cursor: pointer;
  }
  
  h4 {
    margin: 0 0 15px;
  }
  
  .modal {
    background: cyan;
    color: black;
    padding: 20px;
    width: 200px;
    position: absolute;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
  const Child = {
    template: '#childarea'
  };
  
  new Vue({
    el: '#app',
    data() {
      return {
        isShowing: false
      }
    },
    methods: {
      toggleShow() {
        this.isShowing = !this.isShowing;
      }
    },
    components: {
      appChild: Child
    }
  });
</script>
```

### 06-01 Introducing Animations - modal with transitions - codepen - CSS Transitions and Vue Transitions
* The most important part of this is the `<transition>` component and the CSS bindings
* Note that `<transition name="fade">` translates into `.fade-enter-active, .fade-leave-active`, etc
* Vue adds the class names automatically at the correct time
* This uses CSS's [`transition`](https://www.w3schools.com/css/css3_transitions.asp) to do the real work

Here are the relevant excerpts from the full code sample above:

```vue
<template>
  <transition name="fade">
    <app-child v-if="isShowing" class="modal">
      <button @click="toggleShow">
        Close
      </button>
    </app-child>
  </transition>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
```

### 06-01 Introducing Animations - modal with transitions 2
[06-01 Introducing Animations - modal with transitions 2 video - 1000](https://frontendmasters.com/courses/vue/introducing-animations/)  
[06-01 Introducing Animations - modal with transitions 2 codepen example](http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/16)  

We can't use the `<transition>` component for some things, for example: 
_if we wanted to make that background content fade out of view, 
so that the modal took center stage and the background lost focus_

But we can use a class: 

```vue
<template>
  <div v-bind:class="[isShowing ? blurClass : '', bkClass]">
    <h3>Let's trigger this here modal!</h3>
    <button @click="toggleShow">
      <span v-if="isShowing">Hide child</span>
      <span v-else>Show child</span>
    </button>
  </div>
</template>

<style>
  .bk {
    transition: all 0.1s ease-out;
  }
  
  .blur {
    filter: blur(2px);
    opacity: 0.4;
  }
</style>

<script>
  new Vue({
    el: '#app',
    data() {
      return {
        isShowing: false,
        bkClass: 'bk', // here's where the class is set
        blurClass: 'blur'
      }
    },
    ...
  });
</script>
```

#### 06-01 Introducing Animations - modal with transitions 2 - Questions
Why didn't she use literal classes? Not sure.


## 06-02 CSS Animation


## 06-03 Challenge 5: Adding Animation


## 06-04 Challenge 5: Solution


## 06-05 Transition Modes


## 06-06 JavaScript Hooks


## 06-07 Connect to Interaction


## 06-08 Simple Transition


## 06-09 Page-Specific Transitions


## 06-10 Planning & Fancy Demo
