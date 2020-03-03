# Vueconf '20 Notes

## 01 Evan You's Keynote

### Vue Rewrite

#### The performance problem
Vue uses the template, compiles the template into a compiler render function. 
The perf of traditional VDOM is proportional to the number of nodes; it makes the diff complex

#### static nodes vs dynamic nodes - 
it’s a block tree
apparently our diffing happened on static elements before, but now diffing only happens on dynamic nodes
static nodes will be hoisted
average improvement
stage 3 (late 2019 - now) pushing toward feature complete
RFCs - all breaking changes has migration strategy section
finishing new compiler and server side render

#### Template Explorer
* https://vue-next-template-explorer.netlify.com/ 
* [more indepth example](https://vue-next-template-explorer.netlify.com/#%7B%22src%22%3A%22%3Cdiv%3E%5Cn%20%20%3Cspan%3E%7B%7B%20msg%20%7D%7D%3C%2Fspan%3E%5Cn%20%20%3Cspan%3Efesfesf%3C%2Fspan%3E%5Cn%20%20%20%20%3Cspan%3Efesfesf%3C%2Fspan%3E%5Cn%20%20%20%20%20%20%3Cspan%3Efesfesf%3C%2Fspan%3E%5Cn%20%20%20%20%20%20%20%20%3Cspan%3Efesfesf%3C%2Fspan%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cspan%3Efesfesf%3C%2Fspan%3E%5Cn%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeBindings%22%3Afalse%2C%22hoistStatic%22%3Atrue%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%7D%7D)
* [example of cache handling](https://vue-next-template-explorer.netlify.com/#%7B%22src%22%3A%22%3Cdiv%3E%5Cn%20%20%3CFoo%20%40update%3D%5C%22()%20%3D%3E%20hello()%5C%22%2F%3E%5Cn%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeBindings%22%3Afalse%2C%22hoistStatic%22%3Atrue%2C%22cacheHandlers%22%3Atrue%2C%22scopeId%22%3Anull%7D%7D)

#### Server Side Rendering
There is a new strategy that is more efficient than in Vue 2.
"Template Components" will be compiled "to the more optimized format"
* `async setup()`

##### SSR Hydration
* √ what is "hydration"?
  * _Hydration refers to the client-side process during which Vue takes over 
    the static HTML sent by the server and turns it into dynamic DOM that can 
    react to client-side data changes._ - 
  

##### SSR Next Features
* Suspense support

#### Vue Rewrite - Vuex 4
* about how to leverage composition api

#### Vue Rewrite - CLI
* vue-cli-plugin-vue-next is available now
* codemods will be available via the cli

#### Vue Rewrite - 2.X 
* There will be 2.7 which will be LTS 18 months support

