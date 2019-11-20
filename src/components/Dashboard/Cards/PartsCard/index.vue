<template lang="pug">
  standart-card
    name-slot(name="Доля в бронированиях")
    q-card-section
      span.row.text-body2 {{ dateFormatForLabel }}
    chart(
      :options ="options"
    )
    nav-bar(
      :startPeriod="period"
      @studioChange="studio = $event"
      @periodChange="period = $event"
      @dateChange="date = $event"
    )
    options(
      :options ="options"
    )
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'PartsCard',
  data () {
    return {
      studio: 0,
      period: 'week',
      date: {
        from: this.$moment().subtract(7, 'days'),
        to: this.$moment()
      }
    }
  },
  components: {
    StandartCard,
    NameSlot,
    Chart,
    NavBar,
    Options
  },
  computed: {
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    options () {
      const studio = (this.studio === 0) ? this.firstStudio : this.studio
      if (studio === 0) return []
      if (!this.$app.bookings.dashboardBookingsShareList) return []
      const listForStudio = this.$app.bookings.dashboardBookingsShareList.find(item =>
        item.id === studio)
      if (!listForStudio || !listForStudio.rooms) return
      return listForStudio.rooms.map((item, index) => {
        const percents = (listForStudio.totalProfit === 0) ? 0 : (item.totalProfit / listForStudio.totalProfit * 100).toFixed()
        const point = {
          name: item.name,
          total: item.totalProfit,
          percents: percents,
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16)
        }
        return point
      })
    },
    dateFormatForLabel () {
      if (this.date.from === '') return '31 июня'
      return `${this.$moment(this.date.from).format('D MMMM, YYYY')} — ${this.$moment(this.date.to).format('D MMMM, YYYY')}`
    }
  },
  methods: {
    async loadData () {
      await this.$app.bookings.dashboardBookingsShare({
        dateFrom: this.$moment(this.date.from).format('YYYY-MM-DD'),
        dateTo: this.$moment(this.date.to).format('YYYY-MM-DD'),
      })
    },
  },
  watch: {
    date: {
      async handler () {
        await this.loadData()
      },
      deep: true,
      immediate: true
    }
  },
}
</script>

<style scoped>

</style>
