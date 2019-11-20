<template lang="pug">
  .row.q-py-none.justify-center
    q-btn.q-mt-sm(
      color="#FFFFFF"
      text-color="red"
      no-caps
      :disabled="id < 1"
      label="Удалить"
      full-width
      @click="dialog = !dialog"
    )
      q-dialog(
        persistent
        v-model="dialog"
      )
        q-card
          q-card-section.col-12.flex.justify-center.items-center
            span Вы уверены, что хотите удалить бронирование?
          q-card-actions.col-12.flex.justify-center.items-center
            q-btn(
              color="black"
              label="Отмена"
              flat
              v-close-popup
            )
            q-btn(
              @click="deleteBooking"
              color="negative"
              label="Удалить"
              v-close-popup
            )
</template>

<script>
export default {
  name: 'CalendarDelete',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async deleteBooking () {
      await this.$app.bookings.deleteOne(this.id)
      this.$emit('setQueryState', true)
    },
  },
  props: ['id']
}
</script>

<style scoped>

</style>
