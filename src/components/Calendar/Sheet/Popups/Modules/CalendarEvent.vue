<template lang="pug">
  .q-py-md.row.col-12 {{ eventComp }}
    .col-7.text-body2
      q-option-group(
        v-model="event"
        :options="options"
      )
</template>

<script>
import sortBy from 'lodash/sortBy'

export default {
  name: 'CalendarEvent',
  data () {
    return {
      events: [],
      event: 'photo'
    }
  },
  computed: {
    eventComp () {
      return this.eventChange()
    },
    options () {
      return sortBy(this.$app.events.list, ['name']).map(({ name, price }) => ({
        label: name,
        value: name,
        price,
      }))
    }
  },
  methods: {
    eventChange () {
      this.$emit('eventChange', this.event)
    }
  },
  props: ['startEvent'],
  watch: {
    startEvent (v) {
      this.event = v
    }
  }
}
</script>

<style scoped>

</style>
