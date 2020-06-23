<template>
  <div v-if="num1 && num2">
    <h1 v-if="num3" ref="numRef"/>
    <h1 v-else>No num3 yet</h1>
  </div>
  <div v-else>
    <h1>No num1 or num2 yet</h1>
  </div>
</template>

<script>
import { getNumber } from './Experiment1'
export default {
  name: 'Experiment2',
  data () {
    return {
      num1: null,
      num2: null,
      num3: null
    }
  },
  watch: {
    num3 () {
      this.$nextTick(() => {
        const ref = this.$refs.numRef
        if (ref) {
          ref.textContent = `num3 is ${this.num3}`
        } else {
          console.log('numRef does not exist yet - num3')
        }
      })
    }
  },
  async created () {
    this.num1 = await getNumber(1)
    this.num2 = await getNumber(2)
    this.num3 = await getNumber(3)
  }
}
</script>

<style scoped>

</style>
