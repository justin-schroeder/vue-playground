import Vue from 'vue'
import VTooltip from 'v-tooltip'
import App from './App.vue'
import VueFormulate from '@braid/vue-formulate'
import MyCustomLabel from './components/MyCustomLabel'

// Register v-tooltip (or whatever extras you might want to use)
Vue.use(VTooltip)

// Register our slot component globally
Vue.component('MyCustomLabel', MyCustomLabel)

Vue.use(VueFormulate, {
  // Define our custom slot component(s)
  slotComponents: {
    label: 'MyCustomLabel'
  },
  // Define any props we want to pass to our slot component
  slotProps: {
    label: ['tooltip']
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
