<template lang="pug">
  standart-card
    name-slot(name="Загруженность")
    nav-bar.q-pb-md(
      @dateChange="selectedDate = $event"
      @studioChange="studio = $event"
    )
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
            th(style="width: 70%")
              span.text-bold.text-black.text-body2 Зал
            th.text-right
              span.text-bold.text-black.text-body2 %
            th.text-right
              span.text-bold.text-black.text-body2 часы
        tbody
          tr(
            v-for="(load, index) in options"
            :key="index"
          )
            td
              q-icon.q-mr-md(
                :style="{color: load.color}"
                name="far fa-circle"
              )
              span {{ load.name }}
            td.text-right
              span.text-grey.text-caption {{ load.percents }}
            td.text-right
              span.text-body1 {{ load.hours }}
</template>

<script>

import NavBar from '../CommonModules/NavBar'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'WorkloadCard',
  components: { StandartCard, NameSlot, NavBar },
  data () {
    return {
      selectedDate: this.$moment({ hour: 0 }).parseZone(),
      studio: 0,
    }
  },
  computed: {
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    rooms () {
      const studio = (this.studio === 0) ? this.firstStudio : this.studio
      if (studio === 0) return []
      return this.$app.rooms.getAvailable({ studio: studio })
    },
    options () {
      if (!this.rooms) return []
      return this.rooms.map(item => {
        return {
          name: item.name,
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16),
          hours: item.name.length,
          percents: item.name.length * 5
        }
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
