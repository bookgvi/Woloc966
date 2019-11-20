<template lang="pug">
  .technicalBooking
    q-btn.q-py-none(
      :label="label"
      @click="technicalFilter"
      dense
      no-caps
      flat
      style="border: 1px solid black;"
    )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'rooms-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data () {
    return {
      isTechnical: false
    }
  },
  mounted () {
    this.isTechnical = this.$app.filters.getValues('bookings').technical
  },
  computed: {
    label () {
      return this.isTechnical ? 'Скрыть технические брони' : 'Показать технические брони'
    }
  },
  methods: {
    technicalFilter () {
      const { technical } = this.$app.filters.getValues('bookings')
      this.isTechnical = !technical
      this.onChange('technical', this.isTechnical)
    }
  }
}
</script>
