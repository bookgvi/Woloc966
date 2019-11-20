<template lang="pug">
  filter-select(
    selectAllLabel="Все статусы"
    :title="buttonTitle"
    :options="options"
    :value="value"
    @change="event => onChange('statuses', event)"
  )
</template>

<script>
import FilterSelect from './FilterSelect'
import { BOOKING_STATUSES, REFUNDS_STATUSES } from 'src/common/constants'

export default {
  name: 'status-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data: () => ({
    options: []
  }),
  mounted () {
    if (this.$route.path === '/bookings') {
      this.options = Object.values(BOOKING_STATUSES)
    } else {
      this.options = Object.values(REFUNDS_STATUSES)
    }
  },
  computed: {
    value () {
      return this.values.statuses || []
    },
    buttonTitle () {
      return `Статус ${this.value.length || ''}`
    },
  }
}
</script>
