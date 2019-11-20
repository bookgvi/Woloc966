<template lang="pug">
  filter-select(
    selectAllLabel="Все залы"
    :title="buttonTitle"
    :models="models"
    :value="value"
    @change="event => onChange('rooms', event)"
  )
    .text-subtitle1.text-bold.q-pt-md.q-px-lg {{ title }}
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
  computed: {
    title () {
      const studio = this.$app.studios.getFiltered(this.values)

      return studio && studio.name
    },
    value () {
      return this.values.rooms || []
    },
    buttonTitle () {
      return `Залы ${this.value.length || ''}`
    },
    models () {
      return this.$app.rooms.getAvailable(this.values)
    }
  }
}
</script>
