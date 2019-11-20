<template lang="pug">
  standart-card
    name-slot(name="Заявки")
    nav-bar.q-pb-md(
      @dateChange="selectedDate = $event"
      @studioChange="studio = $event"
    )
    q-card-section.q-pa-none
      q-markup-table(
        style="min-width: 400px"
        separator="none"
        wrap-cells
        dense
        flat
      )
        thead.text-left
          tr
            th(style="width: 60%")
              span.text-bold.text-black.text-body2 Клиент • Зал
            th.text-right
            th.text-right
              span.text-bold.text-black.text-body2 Дата
        tbody
          tr(
            v-for="(booking, index) in bookings"
            :key="index"
          )
            td {{ clientSlot(index) }}
            td.text-right
              q-icon(
                size="7px"
                color="red"
                name="fas fa-circle"
                style="cursor: pointer"
              )
                q-tooltip
                  span.text-body2 Остался один час до подтверждения
            td.text-right
              span.text-black.text-body2 {{ dateSlot(index) }}
    q-card-section(
      v-if="isMiniTable"
      class="cursor-pointer"
      @click="isMiniTable = false"
    )
      span.row.text-body2.text-blue-5.q-pt-md  Ещё {{ $app.bookings.dashboardList.length - 3 }}
    q-card-section(
      v-else
      class="cursor-pointer"
      @click="isMiniTable = true"
    )
      span.row.text-body2.text-blue-5.q-pt-md Свернуть
</template>

<script>

import NavBar from '../CommonModules/NavBar'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'RequestsCard',
  components: { StandartCard, NameSlot, NavBar },
  data () {
    return {
      selectedDate: this.$moment({ hour: 0 }).parseZone(),
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0,
      isMiniTable: true
    }
  },
  computed: {
    bookings () {
      return (this.isMiniTable) ? this.$app.bookings.dashboardList.slice(0, 3) : this.$app.bookings.dashboardList
    }
  },
  methods: {
    async loadData () {
      const filter = {
        studio: this.studio,
      }
      await this.$app.bookings.getForDashBoard({
        ...filter,
        dateFrom: this.selectedDate.format('YYYY-MM-DD'),
        dateTo: this.selectedDate.format('YYYY-MM-DD')
      })
    },
    clientSlot (index) {
      const booking = this.bookings[index]
      return `${booking.customer.fullName} • ${booking.room.name}`
    },
    dateSlot (index) {
      const booking = this.bookings[index]
      return `${this.$moment(booking.reservedFrom).format('DD MMMM')}`
    },
  },
  watch: {
    async selectedDate () {
      await this.loadData()
    },
    studio: {
      async handler () {
        if (this.studio !== 0) {
          await this.loadData()
        }
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>
