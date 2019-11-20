<template lang="pug">
  standart-card
    name-slot(name="Локации").q-pb-none
    q-card-section.q-pa-none
      q-markup-table.q-pb-md(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          tr
            th(style="width: 100%")
        tbody
          tr(
            v-for="(item, index) in options"
            :key="index"
          )
            td
              q-icon.q-mr-md(
                :style="{color: item.color}"
                name="far fa-circle"
              )
              span {{ item.name }}
    q-card-actions.q-pt-none.q-pl-md.q-pb-md
      q-btn.q-mr-xs.col-3.text-body2.text-black(
        outline
        size="sm"
        label="Добавить локацию"
        no-caps
        @click="addLocation"
        color="secondary"
      )
</template>

<script>
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'LocationsCard',
  components: { StandartCard, NameSlot },
  computed: {
    options () {
      return this.$app.studios.list.map(item => {
        return {
          name: item.name,
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16)
        }
      })
    }
  },
  methods: {
    addLocation () {
      //
    }
  }
}
</script>

<style scoped>

</style>
