import Vue from 'vue'
import App from './App.vue'
import VueFormulate from '@braid/vue-formulate'
import MyCustomLabel from './components/MyCustomLabel'

Vue.config.productionTip = false

// Register our slot component globally
Vue.component('MyCustomLabel', MyCustomLabel)

Vue.use(VueFormulate, {
  // Define our custom slot component(s)
  slotComponents: {
    label: 'MyCustomLabel'
  },
  // Define any props we want to pass to our slot component
  slotProps: {
    label: ['tooltop']
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
