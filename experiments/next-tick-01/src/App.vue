<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Experiment1 msg="Num Apples:"/>
    <hr>
    <Experiment2 />
  </div>
</template>

<script>
import Experiment1 from './components/Experiment1.vue'
import Experiment2 from './components/Experiment2.vue'

export default {
  name: 'App',
  components: {
    Experiment1, Experiment2
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
