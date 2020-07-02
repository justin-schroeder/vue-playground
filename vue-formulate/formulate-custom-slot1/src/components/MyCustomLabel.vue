<template>
  <label :for="context.id">
    {{ context.label }}
    <svg
      v-if="context.tooltip"
      v-tooltip="context.tooltip"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11Zm4,55a4,4,0,0,1-8,0V47a4,4,0,0,1,8,0ZM50,38a4,4,0,1,1,4-4A4,4,0,0,1,50,38Z"/>
    </svg>
  </label>
</template>

<script>
export default {
  name: 'MyCustomLabel',
  props: {
    context: {
      type: Object,
      required: true
    },
    tooltip: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>

<style scoped>

  svg {
    width: 1.25em;
    height: 1.25em;
    fill: #41b883;
    margin-left: .5em;
  }

  label {
    display: flex;
    align-items: center;
  }

</style>
