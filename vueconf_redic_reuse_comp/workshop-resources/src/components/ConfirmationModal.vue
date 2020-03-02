<template functional>
    <AppModal>
        <h3 class="confirmation-message">
            {{ props.message }}
        </h3>
        <div class="buttons">
            <AppButton @click="listeners.confirm">
                Confirm
            </AppButton>
            <AppButton type="secondary" @click="listeners.close">
                Cancel
            </AppButton>
        </div>
    </AppModal>
</template>

<script>
  import AppModal from './AppModal'

  export default {
    props: {
      message: {
        type: String,
        default: 'This Is The Default Message In Confirmation Modal'
      },
    },
    data() {
      return {
        isModalOpen: false
      }
    },
    components: {
      AppModal
    },
    methods: {
      onConfirm: function() {
        this.isModalOpen = false;
        this.$emit('confirm')
        console.log('caught onConfirm')
      },
      onCancel: function() {
        this.isModalOpen = false;
        this.$emit('close')
        console.log('caught onCancel')
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
