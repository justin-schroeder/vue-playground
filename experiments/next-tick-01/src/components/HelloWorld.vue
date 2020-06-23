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
    <div v-if="numRef">
      <p>Ref: {{ refPhrase }}</p>
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
      numRef: null,
      hasApples: null
    }
  },
  computed: {
    refPhrase () {
      if (this.numRef) {
        return this.numRef.label
      }
      return 'no'
    }
  },
  async mounted () {
    this.numApples = await getNumber(2)
    // if you make the callback to $nextTick async, then this is no longer bound to $vm
    this.hasApples = this.numApples > 0
    this.$nextTick(async () => {
      console.log(this.hasApples)
      if (this.$refs.numApples) {
        this.numRef = this.$refs.numApples
      } else if (this.$refs.numOranges) {
        this.numRef = this.$refs.numOranges
      } else {
        this.numRef = this.$refs.noRef
      }
      this.numOranges = await getNumber(3, 2000)
      this.$nextTick(() => {
        if (this.$refs.numOranges) {
          this.numRef = this.$refs.numOranges
        }
      })
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
