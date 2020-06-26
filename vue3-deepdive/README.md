# Vue 3 Deep Dive with Evan You

## L01 - Vue 3 Overview

### Render functions
* Vue creates a function which creates a (soon to be old) VNode
* upon changes, render functions create a now new VNode
* old and new VNodes are compared to update the DOM efficiently

Comparison of approaches
1. create blueprints, then with every change, destroy and recreate each floor of building
  - not explicitly said, but implied is that this is the react way
2. create blueprints, then only update the needed changes
  * this is the vue way

### Reactivity Module
Vue 3 Reactivity - he created a course that would make this a lot more understandable


### Vue 3 Modules of Vue Core
1. Reactivity Modules
2. Compiler Moduler - take templates and compile them into render functions
  * can happen in the browser at runtime
  * usually happens when built
3. Renderer Module
  1. Render Phase
    * render function returns VNode  
  2. Mount Phase
    * VNode creates webpage
  3. Patch Phase
    * compare old and new VDom nodes and update the webpage
  
### Ex01 - simple component lifecycle
1. Render Phase
  1. Compiler module - changes template into render function
  2. Reactivity module - watched objects are initialized
  3. Renderer module - watch reactive object for changes, and render func returns VNode 
2. Mount Phase
  1. create the module with render function
3. Patch Phase
  1. the reactive object is watched
  2. if changes, render func creates new VNode
  3. send to the patch engine to diff them and update the DOM

## L02 How to use Render Functions

### L02.1 - Advantages of VDom 1
* render to iOS, webGL, etc
* Vue2 already has capability, not officially documented
* Vue3 custom render API is official, 3rd parties can build
  custom renderers

### L02.2 - Advantages of VDom 2
* complex type-ahead box example
  * lots of interactive logic
  * template syntax is restrictive
  * render funcs might let you go deeper
* templates are good 99% of the time, then you want render func

### L02.3 - Render Function
```vue
render(h) {
  return h('div', {
    attrs: {
      id: 'foo'
    },
    on: {
      click: this.onClick
    }
  }, 'hello')
}
```
* Vue 2 was highly verbose. They changed the API to simplify it.
* flat props structure
* globally imported `h` helper
  * when you want to pass nested render functions, you have to pass h down
  * with globally imported `h` you can split it into multiple funcs in one file
```vue
import {h} from 'vue'

render() {
  return h('div', {
    id: 'foo'
    onClick: this.onClick
  }, 'hello')
}
```
* if you put an attr in, if Vue3 detects it's a data attr, it treats it as that.
* Vue 3 is a re-write in typescript

