<template>
  <AppDropdown >
      <slot name="selected"/>
      <template v-slot:content="{setIsOpen}">
          <ul>
              <li @click="update(option, setIsOpen)" :key="option.name" v-for="option in options">
                  <slot name="option" :option="option"/>
              </li>
          </ul>
      </template>
  </AppDropdown>
</template>

<script>
import AppDropdown from './AppDropdown'

export default {
  components: {
    AppDropdown
  },
  props: {
    options: {
      type: Array
    },
    value: {
      type: [String, Object]
    }
  },
  methods: {
    update (option, cb) {
      this.$emit('input', option)
      if (cb) cb(false);
    }
  }
}
</script>

<style lang="sass" scoped>
ul
  list-style: none
  padding: 0
  margin: -10px

  li
    border-bottom: 1px solid #f0f0f0
    padding: 8px 14px
    cursor: pointer

    &:hover
      background: #f0f0f0
</style>
