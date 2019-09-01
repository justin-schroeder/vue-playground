# 02 Writing Plugins


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [02-01 Introducing Writing Plugins](#02-01-introducing-writing-plugins)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 02-01 Introducing Writing Plugins
[Introducing Writing Plugins Video](https://frontendmasters.com/courses/advanced-vue/introducing-writing-plugins/)
* [Vue Docs - Plugins](https://vuejs.org/v2/guide/plugins.html)
* [Vue Docs - Global Mixin](https://vuejs.org/v2/guide/mixins.html#Global-Mixin)
* [Vue Docs - vm.$options](https://vuejs.org/v2/api/#vm-options)

```javascript
function (Vue, options) {
  // … plugin code
}
```

`Vue.mixin(options)`

* if you want to apply global functionality to your vue app, you 
  would use mixins.
* plugins are deduped. 
  * always wrap mixins in a plugin, that's a best practice

* `this.$options` is on every component and contains merged options
  * contains custom options you have added to the component, too