<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [06 Animations](#06-animations)
  - [06-01 Introducing Animations](#06-01-introducing-animations)
    - [06-01 Introducing Animations - ex1 - modal](#06-01-introducing-animations---ex1---modal)
    - [06-01 Introducing Animations - transition component](#06-01-introducing-animations---transition-component)
    - [06-01 Introducing Animations - questions about transitions](#06-01-introducing-animations---questions-about-transitions)
    - [06-01 Introducing Animations - modal with transitions - codepen](#06-01-introducing-animations---modal-with-transitions---codepen)
    - [06-01 Introducing Animations - modal with transitions - codepen - CSS Transitions and Vue Transitions](#06-01-introducing-animations---modal-with-transitions---codepen---css-transitions-and-vue-transitions)
    - [06-01 Introducing Animations - modal with transitions 2](#06-01-introducing-animations---modal-with-transitions-2)
      - [06-01 Introducing Animations - modal with transitions 2 - Questions](#06-01-introducing-animations---modal-with-transitions-2---questions)
  - [06-02 CSS Animation](#06-02-css-animation)
    - [06-02 CSS Animation ex1 - simplest](#06-02-css-animation-ex1---simplest)
    - [06-02 CSS Animation ex2 - bouncing ball](#06-02-css-animation-ex2---bouncing-ball)
      - [06-02 CSS Animation ex2 - bouncing ball - excerpts](#06-02-css-animation-ex2---bouncing-ball---excerpts)
      - [hacks to get hardware acceleration](#hacks-to-get-hardware-acceleration)
      - [personality and life of animation](#personality-and-life-of-animation)
  - [06-03 Challenge 5: Adding Animation](#06-03-challenge-5-adding-animation)
  - [06-04 Challenge 5: Solution](#06-04-challenge-5-solution)
  - [06-05 Transition Modes](#06-05-transition-modes)
  - [06-06 JavaScript Hooks](#06-06-javascript-hooks)
  - [06-07 Connect to Interaction](#06-07-connect-to-interaction)
  - [06-08 Simple Transition](#06-08-simple-transition)
  - [06-09 Page-Specific Transitions](#06-09-page-specific-transitions)
  - [06-10 Planning & Fancy Demo](#06-10-planning--fancy-demo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
* Normally, you use a `v-if` inside of a `<transition>` component
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
[CSS Animation starting video](https://frontendmasters.com/courses/vue/css-animation/)  
[CSS Animation starting slide](http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/17)  

**Transition & CSS Animations are two different things, but we'll use `<transition>` component for both**
### 06-02 CSS Animation ex1 - simplest
I don't understand this simple example, perhaps because I don't understand CSS  Animations very well

```vue
enter-active-class="toasty"
leave-active-class="bounceOut"

.toasty {
  toasty 1s ease both;
}
```

### 06-02 CSS Animation ex2 - bouncing ball
[bouncing ball codepen](http://slides.com/sdrasner/intro-to-vue-5?token=5zRhIuNg#/21) 


```vue
<template>
  <div id="app">
    <h3>Bounce the Ball!</h3>
    <button @click="toggleShow">
      <span v-if="isShowing">Get it gone!</span>
      <span v-else>Here we go!</span>
    </button>
    <transition
      name="ballmove"
      enter-active-class="bouncein"
      leave-active-class="rollout">
    <div v-if="isShowing">
      <app-child class="child"></app-child>
    </div>
    </transition>
  </div>
  
  <script type="text/x-template" id="childarea">
    <div class="ball"></div>
  </script>
</template>

<style lang="scss">
  @mixin ballb($yaxis: 0) {
    transform: translate3d(0, $yaxis, 0);
  }
  
  body {
    font-family: 'Bitter', serif;
    width: 100vw;
    height: 100vh;
    background: #eeeeee; /* Old browsers */
    background: -moz-linear-gradient(top, #eeeeee 0%, #cccccc 65%, #eeeeee 99%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #eeeeee 0%,#cccccc 65%,#eeeeee 99%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #eeeeee 0%,#cccccc 65%,#eeeeee 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#eeeeee',GradientType=0 ); /* IE6-9 */
  }
  
  #app {
    text-align: center;
    margin: 60px;
    max-width: 320px;
    margin: 0 auto;
    display: table;
  }
  
  .num {
    color: #AF007E;
  }
  
  button {
    font-family: 'Bitter';
    background: #c62735;
    color: white;
    border: 0;
    padding: 5px 15px;
    margin: 0 10px;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
  }
  
  h4 {
    margin: 0 0 15px;
  }
  
  hr {
    border-color: #F2FAFF;
    opacity: 0.5;
    margin: 15px 0;
  }
  
  .ball {
    width: 60px;
    height: 60px;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/soccerball.svg");
    transform-origin: 50% 50%;
    transform: translate3d(0, 300px, 0) rotate(0);
  }
  
  @keyframes bouncein { 
    1% { @include ballb(-400px); }
    20%, 40%, 60%, 80%, 95%, 99%, 100% { @include ballb() }
    30% { @include ballb(-80px); }
    50% { @include ballb(-40px); }
    70% { @include ballb(-30px); }
    90% { @include ballb(-15px); }
    97% { @include ballb(-10px); }
  }
  
  @keyframes rollout { 
    0% { transform: translate3d(0, 300px, 0); }
    100% { transform: translate3d(1000px, 300px, 0); }
  }
  
  @keyframes ballroll {
    0% { transform: rotate(0); }
    100% { transform: rotate(1000deg); }
  }
  
  .ballmove-enter {
    @include ballb(-400px);
  }
  
  .bouncein { 
    animation: bouncein 0.9s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  }
  
  .rollout { 
    width: 60px;
    height: 60px;
    animation: rollout 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) both; 
    div {
      animation: ballroll 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) both; 
    }
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

#### 06-02 CSS Animation ex2 - bouncing ball - excerpts

```vue
<template>
<!--  ...-->
    <transition
      name="ballmove"
      enter-active-class="bouncein"
      leave-active-class="rollout">
    <div v-if="isShowing">
      <app-child class="child"></app-child>
    </div>
    </transition>
<!--  ...-->
</template>

<style lang="scss">
  @mixin ballb($yaxis: 0) {
    // this tells browser we want hardware acceleration
    transform: translate3d(0, $yaxis, 0);
  }
  
  /**
   * note - properties that are left out are interpolated: 
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes#When_properties_are_left_out_of_some_keyframes
   */
  @keyframes bouncein { 
    1% { @include ballb(-400px); }
    20%, 40%, 60%, 80%, 95%, 99%, 100% { @include ballb() }
    30% { @include ballb(-80px); }
    50% { @include ballb(-40px); }
    70% { @include ballb(-30px); }
    90% { @include ballb(-15px); }
    97% { @include ballb(-10px); }
  }
  
  .ballmove-enter {
    @include ballb(-400px);
  }
  
  .bouncein { 
    animation: bouncein 0.9s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  }
  
  .rollout { 
    width: 60px;
    height: 60px;
    animation: rollout 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) both; 
    div {
      animation: ballroll 2s cubic-bezier(0.55, 0.085, 0.68, 0.53) both; 
    }
  }
</style>
```

The `enter-active-class` is set to `bouncein`, which is an 
[`@keyframes` at rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes).

#### hacks to get hardware acceleration
We have a couple hacks to get hardware acceleration
`transform: translate3d(0, $yaxis, 0);` is one, the "null z" hack

If you use margin, `top`, etc, are not as performant as transforms
There are `skew`, `rotate`, `translateX`, `translateY`, etc

#### personality and life of animation
The [`timing-function` parameter is the life of a CSS `animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation).

```
.bouncein { 
  animation: bouncein 0.9s cubic-bezier(0.47, 0, 0.745, 0.715) both;
}
```

See [cubic-bezier.com](https://cubic-bezier.com/#.17,.67,.83,.67) for examples


## 06-03 Challenge 5: Adding Animation


## 06-04 Challenge 5: Solution


## 06-05 Transition Modes


## 06-06 JavaScript Hooks


## 06-07 Connect to Interaction


## 06-08 Simple Transition


## 06-09 Page-Specific Transitions


## 06-10 Planning & Fancy Demo