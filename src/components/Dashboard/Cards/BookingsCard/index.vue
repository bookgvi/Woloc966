<template lang="pug">
  standart-card
    name-slot(name="Бронирования")
    nav-bar.q-pb-md(
      @dateChange="selectedDate = $event"
      @studioChange="studio = $event"
    )
    q-card-section.q-pa-none
      q-markup-table(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          tr
            th(style="width: 70%")
              span.text-bold.text-black.text-body2 Клиент • Время
            th.text-right
              span.text-bold.text-black.text-body2 Оплата, р.
        tbody
          tr(
            v-for="(booking, index) in slicedBookings"
            :key="index"
          )
            td {{ clientSlot(index) }}
            td.text-right
              span.text-grey.text-caption.q-mr-md {{ prepaymentSlot(index) }}
              span.text-body1 {{ paymentSlot(index) }}
    q-card-section(
      v-if="isMiniTable && bookings.length > 3"
      class="cursor-pointer"
      @click="isMiniTable = false"
    )
      span.row.text-body2.text-blue-5.q-pt-md Ещё {{ bookings.length - 3 }}
    q-card-section(
      v-if="!isMiniTable"
      class="cursor-pointer"
      @click="isMiniTable = true"
    )
      span.row.text-body2.text-blue-5.q-pt-md  Свернуть
</template>

<script>

import NavBar from '../CommonModules/NavBar'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'BookingsCard',
  components: { StandartCard, NameSlot, NavBar },
  data () {
    return {
      selectedDate: this.$moment({ hour: 0 }).parseZone(),
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0,
      isMiniTable: true
    }
  },
  computed: {
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    bookings () {
      const bookingsList = []
      this.$app.bookings.dashboardBookingsList.forEach(item => {
        if (!item.technical) {
          bookingsList.push(item)
        }
      })
      return bookingsList
    },
    slicedBookings () {
      return (this.isMiniTable) ? this.bookings.slice(0, 3) : this.bookings
    }
  },
  methods: {
    async loadData () {
      const studio = (this.studio === 0) ? this.firstStudio : this.studio
      if (studio === 0) return []
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
      return `${booking.customer.fullName} • ${booking.duration} ч.`
    },
    prepaymentSlot (index) {
      const booking = this.bookings[index]
      return (+Number(booking.prepayment).toFixed()).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    paymentSlot (index) {
      const booking = this.bookings[index]
      return (+Number(booking.price).toFixed()).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
  },
  watch: {
    async selectedDate () {
      this.loadData()
    },
    studio: {
      async handler () {
        if (this.studio !== 0) {
          this.loadData()
        }
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>
