<template lang="pug">
  filter-select(
    selectAllLabel="Все цели"
    :title="buttonTitle"
    :value="value"
    :options="options"
    @change="event => onChange('events', event)"
  )
</template>

<script>
import FilterSelect from './FilterSelect'
import { EVENT_TYPES } from 'src/common/constants'

export default {
  name: 'events-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data: () => ({
    options: Object.values(EVENT_TYPES).map(({ name, value }) => {
      return {
        value: value,
        label: name
      }
    })
  }),
  computed: {
    value () {
      return this.values.events || []
    },
    buttonTitle () {
      return `Цели ${this.value.length || ''}`
    },
  }
}
</script>
