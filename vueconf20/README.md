# Vueconf '20 Day 1

## Schedule 

0900 Evan You - Opening Keynote with Evan - 30 min
0940 Eduardo - Get the most out of Vue Router - 30 min
1010 Break 1.0 - 30 min
1040 Natalia Tepluhina - All you need is <s>love</s> Apollo Client - 30 min
1110 Jamena McInteer - The State of CSS in Vue - 30 min

1140
Debbie O'Brien
Debbie O'Brien
30 min
Static is the new dynamic with Nuxt.js

1210

1 hour
Lunch 1.0

1310

1 hour
Lightning Talks 1.0

1410

30 min
Break 1.1

1440
John Leider
John Leider
30 min
Vuetify v2+

1510
Maria Lamardo
Maria Lamardo
30 min
Content Loading That Isn't Broken

1540
Bart Ledoux
Bart Ledoux
30 min
Documenting components made easy

1610

30 min
Break 1.3
1640
Jack Koppa
Jack Koppa
30 min
TypeScript & Vue @ Politico

1710
Oscar Spencer
Oscar Spencer
30 min
Unconventional Vue—Vue as a Backend Framework

1800

1 hr 30 min
Conference Reception

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
    react to client-side data changes._ --> https://ssr.vuejs.org/guide/hydration.html
  

##### SSR Next Features
* Suspense support
  * see [React's "what is suspense"](https://reactjs.org/docs/concurrent-mode-suspense.html#what-is-suspense-exactly)

#### Vue Rewrite - Vuex 4
* about how to leverage composition api

#### Vue Rewrite - CLI
* vue-cli-plugin-vue-next is available now
* codemods will be available via the cli

#### Vue Rewrite - 2.X 
* There will be 2.7 which will be LTS 18 months support

## 02 Vue Router - Eduardo San Martin Morote
[`@posva` on twitter](https://twitter.com/posva) and github
https://esm.dev/
He's from Paris

### 02 Vue Router - dynamic routing
* add and remove routes after the router is running
* current router can add routes but not remove it
* why can't we remove them? 
  * routes are tested in a certain order
  * the history (`mode: history`) needs to be supported
  * the matcher

### 02 Vue Router - dynamic routing - matcher
`/home` => `/^\/home$/i`
`/movies/:id` => `/^\/movies\/([^\/]+)`
* this ends up blocking new url `/movies/new` from being added
* solution is to use points to weight the different 
* https://github.com/vuejs/rfcs/pull/122 <-- the RFC for weighted routing

### 02 Vue Router - dynamic routing - history
* you pass in the history handler you want
  * advantage: "now it's tree shakable"
* `history.pushState(data, title, url)`  
* `history.replaceState(data, title, url)`  

### 02 Vue Router - URLSearchParams is broken
URL encoding is inconsistent with [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
He has lots of detailed slides about the inconsistencies

### 02 Vue Router - how to push an item on history
* the correct way is to use `router.push({ name: 'MovieDetail', params: { name: 'The Witch' } })`
  * he does it for you

## 03 Apollo Client  - 1040 - Natalia Tepluhina - All you need is <s>love</s> Apollo Client - 30 min
Natalia Tepluhina - All you need is <s>love</s> Apollo Client - 30 min

She will be at meetup today - Tuesday, 3 March 2020 - Special VueConf Meet n Greet with the Vue Core Team!
* https://twitter.com/N_Tepluhina/status/1234864676879597568
* https://www.meetup.com/en-AU/The-Austin-Vue-js-Meetup/events/zjrklrybcfbwb/
* Proof Technologies - 200 E 6th St #310 · Austin, tx
* The Proof office is on the north side of 6th street between B.D Rileys Pub and Friends bar. When you see a sign that says “Hannig Row", you're here! There will also be a sidewalk sign that says "Vue ATX" right outside the door.

She has storybook article - [Integrating Storyblok into existing Vue project 2018](https://itnext.io/integrating-storyblok-into-existing-vue-project-a5ad4b320cc1)

Here are her slides on speakerdeck - https://speakerdeck.com/ntepluhina/ 

Probably rather similar - [Wrapping REST API calls with Apollo Client: 'do-it-yourself' approach](https://dev.to/n_tepluhina/wrapping-rest-api-calls-with-apollo-client-do-it-yourself-approach-4i3p)
[All you need is <s>love</s> Apollo Client - presentation repo](https://github.com/NataliaTepluhina/apollo-presentation)
