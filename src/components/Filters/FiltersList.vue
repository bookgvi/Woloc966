<template lang="pug">
  .q-pa-none
    q-separator
    .row.items-center.q-py-sm.q-gutter-x-sm
      slot(
        name="prepend"
        :values="values"
        :onChange="onChange"
      )
      q-space
      slot(name="append")
        q-btn.q-py-none.q-px-sm(
          outline
          no-caps
          label="Сбросить все"
          dense
          :disable="isNotFiltered"
          @click="onReset"
        )
    q-separator
</template>

<script>
export default {
  name: 'filters-list',
  props: {
    name: String,
  },
  computed: {
    values () {
      const filter = this.$app.filters.readFromSession()[this.name]
      if (filter.hasOwnProperty('studio') && !filter.studio) {
        this.$app.filters.reset(this.name)
      }
      return this.$app.filters.getValues(this.name)
    },
    isNotFiltered () {
      return !Object.values(this.values).length
    }
  },
  methods: {
    onChange (name, value) {
      this.$app.filters.setValue(this.name, name, value)
    },
    onReset () {
      this.$app.filters.reset(this.name)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
