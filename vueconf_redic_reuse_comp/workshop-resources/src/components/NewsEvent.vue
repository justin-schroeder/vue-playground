<template>
    <div class="event">

        <BaseNews v-bind="{ ...$attrs, ...$props }"
                  v-on="$listeners">

            <p><small>Location:</small></p>
            <p>{{ news.location }}</p>
            <p><small>Attendees:</small></p>
            <p>{{ news.attendees }}</p>

            <AppButton :type="news.attending ? 'primary' : 'secondary'">
                <AppIcon
                        :icon="news.attending ? 'check' : 'plus'"
                        class="mr-1"
                />
                {{ news.attending ? 'You’re attending' : 'Join!' }}
            </AppButton>

        </BaseNews>
    </div>
</template>

<script>
  import BaseNews from './BaseNews'
  import AppButton from './AppButton'
  // WHY don't we have to do this???
  // import AppIcon from './AppIcon'

  export default {
    components: {BaseNews, AppButton},

    data: function() {
      return {isAttending: false}
    },

    props: {
      news: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
