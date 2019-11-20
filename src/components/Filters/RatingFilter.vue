<template lang="pug">
  filter-select(
    :title="buttonTitle"
    :options="options"
    :value="value"
    @change="event => onChange('rating', event)"
  )
</template>

<script>
import range from 'lodash/range'
import FilterSelect from './FilterSelect'

export default {
  name: 'rating-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data: () => ({
    options: range(1, 6).map(i => `${i}`).map(value => ({ value, label: value }))
  }),
  computed: {
    value () {
      return this.values.rating || []
    },
    buttonTitle () {
      return `Рейтинг ${this.value.join(',')}`
    },
  }
}
</script>
