<template>
  <div class="hello">
    <ul>
      <li>
        <NumInput v-if="numApples" ref="numApples" :number="numApples" label="Num Apples"/>
      </li>
      <li>
        <NumInput v-if="numOranges" ref="numOranges" :number="numOranges" label="Num Oranges"/>
      </li>
    </ul>
    <div ref="noRef" v-if="!numRef">
      <h1>NO REF YET</h1>
    </div>
  </div>
</template>

<script>
import NumInput from './NumInput'

async function getNumber (n, timeout = 1000) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(n)
    }, timeout)
  })
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      numApples: null,
      numOranges: null,
      numRef: null
    }
  },
  async mounted () {
    this.numApples = await getNumber(2)
    const that = this
    getNumber(3, 2000).then(num => { that.numOranges = num })
    this.$nextTick(async () => {
      if (this.$refs.numApples) {
        this.numRef = this.$refs.numApples
      } else if (this.$refs.numOranges) {
        this.numRef = this.$refs.numOranges
      } else {
        this.numRef = this.$refs.noRef
      }
    })
  },
  components: {
    NumInput
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
