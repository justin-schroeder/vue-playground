<template>
  <label>
    {{ label }}
    <input type="number" :value="number" />
  </label>
</template>

<script>
export default {
  name: 'NumInput',
  props: {
    label: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
  label {
    margin-top: 30px;
  }
  input {
    margin-top: 20px;
  }

</style>
