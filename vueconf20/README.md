# Vueconf '20 Day 1

## Schedule 
Date: March 3, 2020
Time: 7:30AM to 7:00PM
Location: Austin Convention Center

0900 - Evan You - Opening Keynote with Evan - 30 min
0940 - Eduardo - Get the most out of Vue Router - 30 min
1010 - Break 1.0 - 30 min

1040 - Natalia Tepluhina - All you need is <s>love</s> Apollo Client - 30 min
1110 - Jamena McInteer - The State of CSS in Vue - 30 min
1140 - Alex Kyriakidis - 05 Vue 3 - 30 min

1210 - Lunch 1.0 - 1 hour
1310 - Lightning Talks 1.0 - 1 hour

1410 - Break 1.1 - 30 min
1440 - John Leider - Vuetify v2+ - 30 min
1510 - Maria Lamardo - Content Loading That Isn't Broken - 30 min
1540 - Bart Ledoux - Documenting components made easy Styleguideist - 30 min

1610 - Break 1.3 - 30 min
1640 - Jack Koppa - *TypeScript & Vue @ Politico* - 30 min
1710 - Oscar Spencer - *Unconventional Vue—Vue as a Backend Framework* - 30 min

1800 - Conference Reception - 1 hr 30 min


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

## 04 CSS in Vue - 1110 - Jamena McInteer - The State of CSS in Vue - 30 min
Jamena McInteer - https://twitter.com/jamenamcinteer
* [github repo for The State of CSS in Vue](https://bit.ly/32vrUtz)

### 04 CSS in Vue - Scoped Styles
basic point: use CSS Modules instead of scoped styles (just like they mentioned in ridiculously reusable components)
* example class name - `ComponentName__example__9dPv`
* [ability to push variables from scss into vue](https://docs.google.com/presentation/d/1GvGim9C5vhf3GqP_icXfJqEFdVqH7pL1FBF_FXFd-oA/edit#slide=id.g7e894b1f9a_0_73)

### 04 CSS in Vue - Inline Styles
* Vue has dynamic `:style` attribute (use sparingly)
  * very high specificity
  * don't support media queries

### 04 CSS in Vue - Methodologies
* BEM

### CSS in Vue - UI Frameworks
* things like Vuetify
* she has ["random corgi images" demo app in repo here](https://github.com/jamenamcinteer/the-state-of-css-in-vue/tree/master/example-projects/vuetify)
* she has [Random Corgi Images Buefy (Bulma + Vue) demo example](https://github.com/jamenamcinteer/the-state-of-css-in-vue/tree/master/example-projects/buefy)
  * lightweight, fewer components
  * you end up with html that has a lot of classes rather than 
  * to change colors, [you needed to add support for scss and use style lang="scss"](https://docs.google.com/presentation/d/1GvGim9C5vhf3GqP_icXfJqEFdVqH7pL1FBF_FXFd-oA/edit#slide=id.g7e894b1f9a_0_219)
* she has [Random Corgi Images TailwindCSS]

## 05 Vue 3 - Alex Kyriakidis
`@hootlex`
from Amsterdam

### 05 Vue 3 - portals
* Teleport item in DOM from one place to another
* needs target to send it to: `<div id="portal-target />`
    ```vue
    <Portal target="#portal-target">
      whatever goes in here will wind up in <div id="portal-target />
    </Portal>
    ```
* use cases
  * modals, notifications, popups
  * sidebar, menu, footer
* you can use today `portal-vue` with plugin

### 05 Vue 3 - multiple root nodes
You don't need wrapper div

### 05 Vue 3 - v-model changes
`<MyComponent v-model:email="emailModel" v-model:user="userModel"/>`

### 05 Vue 3 - CompositionAPI
Composition API
* benefits
  * flexibility
* drawbacks
  * 
  
### 05 Vue 3 - Suspense
```vue
<Suspense>
  <!-- fallback here --> 
</Suspense>
```

### 05 Vue 3 - Filters Removed
* in Vue 3 filters are going to be removed
```vue
<div> {{ amount | dollars }} </div><!-- not possible in Vue3 -->
```
* Instead, pass an argument. 


## 06 Lightning Talks 1.0 - 1 hour

### 06 Lightning Talks 1.0 - Gridsome
jg@dialogs.com
Storyblok plugin - https://gridsome.org/plugins/gridsome-source-storyblok

### 06 Lightning Talks 1.0 - Bloomberg - Peter Keirm migrating a large legacy app to vue bloomberg
* [Peter Keirm LinkedIn](https://www.linkedin.com/in/peterkeirn/)
* first thing was to migrate a library of core components
  * make sure you come up with a standard way to integrate with backend
  * especially if you deploy front end separately from back end
* Set High Standards
  * Documentation
  * Gatekeeping & knowledge distribution
* Make it Fun: Fix Your Problems
  * CSS Guardrails
  
### 06 Lightning Talks 1.0 - Austin Gil - Communicating between Components
@stegosource full stack @revealbio; author of `Vuetensils`

* scoped slots
  * loading states, error
  * have a component that abstracts and compartmentalizes the status of ajax requests
* event bus

### 06 Lightning Talks 1.0 - Austin Story @austio36 - doximity - Nuxt migration
Springfield, MO
https://www.linkedin.com/in/rubyprogramming/

They used vue-hackernews-2.0 at first
* it does ssr
* it's no longer maintained 
* it uses graphql, apollo, express

Then they went to nuxt

## 07 - John Leider - Vuetify v2+ - 30 min
https://docs.google.com/presentation/d/13dt0RmiQyulnLcfkj7OokLDG3Oe-R1SXkwwNZ6SmZYU/edit
* a11y WCAG / Section 508 supported 

### 07 - Vuetify v2+
* they have a person who is a pro on it

### 07 - Vuetify v2+ vuetify loader
it's a webpack loader
that makes it so you can modify the variables for scss
* + flexibility
* - 

### 07 - Vuetify v2+ what if you don't want Material Design?
* Google [Material Studies](material.io/design/material-studies)
* you can download a theme with a file
* this lets you modify the look of an application in a way recommended by them

### 07 - Vuetify v2+ - deferred loading - progressive images
this uses "intersection observer" API

### 07 - Vuetify v2+ - tooling
github.com/vuetifyjs/vue-cli-plugins
* storybook
* eslint config
* theme presets
* cli-plugin
* vuetify-loader

### 07 - Vuetify v2+ - extras
* tree shaking
* 

### 07 - Vuetify v2+ - vue cli presets
one button / call lets you do this:
Base => Basic App => 1.) Vuetify Plugin, 2.) Eslint Config, 3.) Eslint Plugin
Essential extends base => Vuetify CLI

Vue Cli lets you tap into system to see what plugins are installed

### 07 - Vuetify v2+ - 3.0 Updates - composition Api, replace mixins with effects, improve component structure
notion.vuetifyjs.com - upgrade plan
https://docs.google.com/presentation/d/13dt0RmiQyulnLcfkj7OokLDG3Oe-R1SXkwwNZ6SmZYU/edit#slide=id.g7d97fdd011_3_64

#### 07 - Vuetify v2+ - 3.0 Updates - effects
working in tandem with vue

Try customization: 
`vue create my-app --preset vuetifyjs/vue-cli-preset-vuetify`
via https://docs.google.com/presentation/d/13dt0RmiQyulnLcfkj7OokLDG3Oe-R1SXkwwNZ6SmZYU/edit#slide=id.g7d97fdd011_3_115


## 08 - Maria Lamardo - What is Web Accessibility?
@MariaLamardo
Front End Engineer at Pendo / Speaker /
Vue Vixens Worldwide Events Manager / Vue Community Partner/ Community Organizer / BCABA / Devs@RTP Founder
North Carolina, USAJoined February 2019
https://github.com/mlama007

### 08 What is Web Accessibility? - ARIA 
Marcy Sutton & Fable Tech Labs - 
* ["What we learned from user testing of accessible client-side routing techniques with Fable Tech Labs"](https://www.gatsbyjs.org/blog/2019-07-11-user-testing-accessible-client-routing/)

### 08 What is Web Accessibility? - demo matching game
https://github.com/mlama007/Vue-Memory-Game
she demos the routing
* when you go to a new route, it doesn't list it as a page
* it's broken, let's fix it
COOL idea
* Create “Broken Games” as a way to teach how to make things accessibility (via Maria Lamardo’s talk on Tue)

added `role="status"`

### 08 What is Web Accessibility? - ARIA-current
* `aria-current="page"`
NVDA => Firefox
JAWS => Internet Explorer
VoiceOver => Safari

### 08 What is Web Accessibility? - tabindex
* tabindex="0" makes it focusable by keyboard in normal order
* tabindex="1" or positive numbers => Focusable via keyboard; jumps order (avoid)
* tabindex="-1" lets you focus it with a ref

### 08 What is Web Accessibility? - tabindex
* chrome devtool - nerde focus
* chrome devtools => accessibility => accessible name

## 09 Bart Ledoux - Vue Styleguidist - Documenting components made easy - 30 min
@ElevateBart
Slides Repo - DocEz - https://github.com/elevatebart/DocEz
https://www.linkedin.com/in/bartledoux/en
https://github.com/elevatebart
* helps maintain storybook
* a blerd is a creature from mandelorian
* we do not want to tame components before we use them

plan: storybook & vue-styleguideist with demos
dominic the designer gives designs to sara
sara the []
you get the components in "pure isolation"
* they are "protected"

`vue add storybook` works if you use vue cli
added DocEz folder as subfolder of vueconf
closeOnClick with datepicker from Bulma - 
* lets you iterate quickly and experiment with a component

Storybook pro / con
* con - vue devtools needs to open iframe in new tab
  * why doesn't vue devtools work in iframe? 

Styleguidist builds documentation website using introspection
* it's a zero config thing
* if you want to document your props, use JS doc of props
* VERY COOL - generates single page apps

Getting Started page lets you add context in markdown
See [ButtonDoc.md](./DocEz/ButtonDoc.md)

`<docs>` block in markdown
* MDX lets you render component in the markdown - ButtonDoc <docs> with ```vue ```
* lets you document the slots - see MyButton.vue

Disadvantage
* position=fixed shows 

Storybook Docs
* a fusion of storybook and styleguideist 
  * allows you **to import your stories** that you are happy with inside of your documentation

styleguidist
* how does it work? vue components in react website
* they are working to make Vue to MDX to vuepress `vue-docgen-cli`

## 10 - Jack Koppa - *TypeScript & Vue @ Politico* - 30 min
https://www.linkedin.com/in/jackkoppa

### 10 - First TypeScript Probs with Vue
1. no type hints in VSCode for Vue 2
2. didn't get assistance for understandig intent of developer
3. catch errs before deploying

### 10 - TypeScript in Vue starts
* `<script lang="ts">`
* `Vue.extend`
* what is the "shape" of states? F12 on 

"enforcing data shape"
tough if you are retrofitting

politico - they have 18 front end devs and 9 repos now

tips:
as you ramp up, start adding people on PRs
rotate people on and off of typescript projects

tools;
VTI - vetur.experimental.templateInterpolationService: true in typescript config
codegen tools - openapi, swagger, graphql
mixins - don't use them in typescript
* use `extends` instead in vue 2
Vuex is a pain
* mapGetters, mapActions, etc is a pain

## 11 - Oscar Spencer - *Unconventional Vue—Vue as a Backend Framework* - 30 min
@oscar_spen
@tidelift
@grain_lang
Boston, MA
https://www.linkedin.com/in/oscarspen/

### 11 - Vue Backend - Observability
Vue looks at all properties and calls object.define property
he explains the basics of the Evan You reactivity demo

### 11 - Vue Backend - Observability Limits
* all values must be registered ahead of time - major limitation
* we can use `Vue.set` to add new nested properties, but not at the root level - that's not fun
* Vue 2.6 gives `Vue.observable`

### 11 - Vue Backend - A Vuex-like State Store
* it's going to react to what you're going to do, you don't need explicit mutations
* using render function 

### 11 - Vue Backend - Reactivity in Vue 3
* has a completely standalone reactivity module that can be used anywhere
* Made possible by [ES6 Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* you create a `new Proxy` and that proxy intercepts it and creates a dependency for the watcher
```js
import { reactive, effect } from '@vue/reactivity'
const counter = reactive({ num: 0 })
... 
```
#### 11 - Vue Backend - Reactivity in Vue 3 - implications 2
* we can see what keys change on the object
  * runs every time a property is added or deleted from an object

# Vueconf '20 Day 2
Date: March 4, 2020
Time: 8:30AM to 9:00PM
Location: Austin Convention Center

07:30 - Breakfast
08:30 - Speed networking, Vue style!
09:30 - 01 - Gregg Pollack - Vue 3's Composition API Explained Visually
10:00 - 02 - Damian Dulisz - Validations in the Composition Age
10:30 - Break 2.0
11:00 - 03 - Jaime Jones - Demystifying the Vue Lifecycle and other pieces of the Vue instance
11:30 - 04 - Alexander Lichter - SEO in a Vue.js world - aka 04 nuxt seo
12:00 - Lunch 2.0
13:00 - 05 - Lightning Talks 2.0
14:00 - Break 2.1
14:30 - Sean O'Donohue - Launching a New Design System on an Existing Site with Zero Downtime
15:00 - Henry Zhu - Vue as Compiler
15:30 - Break 2.3 - Adam Jahr - Authentication from Scratch in Vue
16:30 - Alex Kyriakidis - What you'll love in Vue 3
17:00 - Close and Mega Raffle - Prizes
19:30 - Conference After Party


## 01 Gregg Pollack - Vue 3's Composition API Explained Visually
Gregg Pollack - `@greggpollack` - teacher at `@VueMastery`
Founder at `@EnvyLabs`, Code School, `@StarterStudio`
Orlando, FL

### old way mixins
* uses either mixins directly or something like this: 
```vue
mixins: [
  searchMixinFactory({
    namespace: 'productSearch'
```

### old way scoped slot
* less performant
* configuration in component

### when to use composition api
* first class support
* component is too large

### modular reactivity
* you can use Vue's reactivity in a library that knows nothing about components

### you can either make refs directly, or you can make a reactive object

### use `toRefs` to split a reactive object into multiple refs

### `event-space.js` can pull out just those parts of state you need

### reactive references let you watch changes

### Vue Mastery - reactivity course contains this

## 02 - Damian Dulisz - Validations in the Composition Age
* `@vuejs`  Core Team
* Curator of `http://news.vuejs.org` (`@VueNewsletter`)
* creator of `vue-multiselect.js.org` and `Vuelidate.js.org`
* Lead Engineer - `@coursedoginc` - pedagogy scheduling
* Wrocław, Polskad

### 02 - Damian Dulisz - Vuelidate - Probs
* no lazy validation support
* no built-in support for err messages
* mediocre support for async-validators
* hard to share validation results between components from child to parent

### 02 - Damian Dulisz - Vuelidate - v2.0

### 02 - Damian Dulisz - Vuelidate - `@vuelidate/validators`
* you can import just the validator that you need

### 02 - Damian Dulisz - Vuelidate - Schema Based Validation
`FormVueLatte` - lightweight schema generated forms
he's intergrating with that using a plugin

### 02 - Damian Dulisz - Vuelidate - composition api
* he imports a setup function from another component, 
* then in the setup function of this component, maps over plugins, and passes in the og setup func
* creates kind of a higher order component
* `witherrorsComponent

`
### 02 - Damian Dulisz - Vuelidate - FormVueLatte plugin
* plugin system enabling new integrations - COOL
* they will create a parser for 

## 03 - Jaime Jones - Demystifying the Vue Lifecycle and other pieces of the Vue instance - aka Vue Lifecycle
`@gameof_freckles` - Jaime Jones
* [Slides for Demystifying the Vue Lifecycle by Jaime Jones](http://gitpitch.com/jaime-lynn/demystifying-the-vue-lifecycle)

### 03 - Vue Lifecycle - overview
This is for Vue 2

### 03 - Vue Lifecycle - mounted
* better for setting up libraries that need DOM to be ready - like chart options
* not great for getting data
* if do data manipulation in `created`, it's a safer way to go
  * child component watchers might end up having problems if it's in `mounted`

### 03 - Vue Lifecycle - errorCaptured
* this is like error boundaries in react

### 03 - Vue Lifecycle - keepAlive components
* used with `<keep-alive><Component :is="myComp"/></keep-alive>` - this keeps 
* they have unique lifecycle hooks: 
  * `activated` is when it comes out of a cached state
  * `deactivated` is when it is cached
  
### 03 - Vue Lifecycle - `nextTick`
* returns a promise which returns when you get to the next update cycle
  * for example, scroll into view upon an error

### 03 - Vue Lifecycle - `v-for` and `:key`
* problems when you add items to the beginning of the array and reuse the index
* key lets you find out which items are new

### 03 - Vue Lifecycle - `ref`
* if you have a parent container that references a `ref`, it won't get updates

## 04 - nuxt seo - Alexander Lichter, part of core team for nuxt
Founder of Developmint, 
* `@nuxt_js` core member
`blog.lichter.io` & https://www.lichter.io/
[04 - nuxt slides](http://slides.com/mannil/seo-in-a-vuejs-world-vueconf-us-2020#/)

### 04 - nuxt seo - three pillars
* On-page
  * Content
  * UX
  * Keywords
  * meta tags
* Off-page
  * link building
  * citations
  * social media
  * authority
* Technical
  * page speed
  * security
  * broken links

### 04 - nuxt seo - js 
* yahoo, bing, google does JS now

### 04 - nuxt seo - if not spa
* SSR
  * on the fly
  * at build time - jamstack - 
    * nuxt, vuepress, gridsome
     
### 04 - nuxt seo - google search console

### 04 - nuxt seo - `vue-meta`
* like `react-helmet`

### 04 - nuxt seo - mobile is what google indexes

### 04 - nuxt seo - text compression

### 04 - nuxt seo - broken links & redirects
* lots of broken links from / to your page really hurt seo
* use `ahrefs` to detect broken links

### 04 - nuxt seo - canonical links
* `<link rel="canonical"` is the prererred version of the page
* avoid duplicate content in SEO
* you should have it on every page
* great for trailing slash enforcement - it should be regular
* there's a way to do in nuxt, of course

### 04 - nuxt seo - sitemap
* nuxt has sitemap module. catches all static urls, dynamic ones can be provided

