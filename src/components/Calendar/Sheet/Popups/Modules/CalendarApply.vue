<template lang="pug">
  .row.col-12.justify-center.q-py-md.q-gutter-md
      q-btn.col-5.text-body2.text-weight-bold(
        no-caps
        @click="cancelBooking"
        color="negative"
        label="Отменить"
        dense
      )
      q-btn.col-5.text-body2.text-weight-bold(
        no-caps
        @click="saveBooking"
        color="positive"
        label="Сохранить"
        dense
      )
</template>

<script>
export default {
  name: 'CalendarApply',
  methods: {
    cancelBooking () {
      this.$emit('setQueryState', false)
    },
    async saveBooking () {
      await this.applyBooking()
    }
  },
  props: ['applyBooking']
}
</script>

<style scoped>

</style>
