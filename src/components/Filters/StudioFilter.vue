<template lang="pug">
  filter-select(
    type="radio"
    :title="buttonTitle"
    :models="models"
    :value="value"
    @change="onInputChange"
  )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'studio-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    filter: {
      type: Object
    },
    onChange: Function,
  },
  async created () {
    await this.controller.getAll()
  },
  computed: {
    controller () {
      return this.$app.studios
    },
    value () {
      return this.values.studio
    },
    models () {
      return this.controller.list
    },
    buttonTitle () {
      const studio = this.controller.getFiltered(this.values)

      return studio ? studio.name : 'Локация'
    },
  },
  methods: {
    onInputChange (event) {
      this.onChange('studio', event)
      const rooms = this.$app.rooms.getAvailable({ studio: event }).map(item => {
        return item.id
      })
      this.onChange('rooms', rooms)
    }
  }
}
</script>
