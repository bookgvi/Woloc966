<template lang="pug">
  standart-card
    name-slot(name="Доход")
    q-card-section
      span.row.text-body2 {{ dateFormatForLabel }}
    chart(
      :options ="checkedOptions"
    )
    nav-bar(
      :startPeriod="period"
      @periodChange="period = $event"
      @dateChange="date = $event"
      )
    options(
      @checkedChange="checked = $event"
      :options ="options"
    )
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'
import colorsMock from 'src/common/rooms/colors'
import { colors } from 'quasar'

export default {
  name: 'ProfitCard',
  components: {
    StandartCard,
    NameSlot,
    Chart,
    NavBar,
    Options
  },
  created () {
    this.date.from = this.$moment({ hour: 0 }).parseZone()
    this.date.to = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      period: 'week',
      date: {
        from: this.$moment().subtract(7, 'days'),
        to: this.$moment()
      },
      checked: []
    }
  },
  computed: {
    dateArray () {
      let arr = []
      switch (this.period) {
        case 'week':
          for (let i = 0; i < 7; i++) {
            const date = this.$moment(this.date.from).add({ days: i })
            const formatDate = this.$moment(date).format('YYYY-MM-DD')
            arr.push(formatDate)
          }
          break
        case 'month':
          for (let i = 0; i < 30; i++) {
            const date = this.$moment(this.date.from).add({ days: i })
            const formatDate = this.$moment(date).format('YYYY-MM-DD')
            arr.push(formatDate)
          }
          break
        case 'year':
          for (let i = 0; i < 12; i++) {
            const date = this.$moment(this.date.from).add({ months: i })
            const formatDate = this.$moment(date).format('YYYY-MM')
            arr.push(formatDate)
          }
          break
      }
      return arr
    },
    options () {
      let arr = []
      if (!this.$app.studios.list) return []
      this.$app.studios.list.forEach((item, index) => {
        const color = colorsMock[index].color
        const total = {
          label: `${item.name} - Бронирования`,
          studio: item.name,
          labelChart: 'Брони',
          index: index,
          value: index * 2,
          color: color,
          isTotal: true,
        }
        const prepayment = {
          label: `${item.name} - Предоплата`,
          studio: item.name,
          labelChart: 'Предоп.',
          index: index,
          value: index * 2 + 1,
          color: colors.lighten(color, 80),
          isTotal: false,
        }
        arr.push(total)
        arr.push(prepayment)
      })
      return arr
    },
    checkedOptions () {
      if (this.$app.bookings.dashboardBookingsProfitList.length === 0) return []
      let opts = []
      this.checked.forEach(item => {
        const isTotal = this.options[item].isTotal
        const itemIndex = this.options[item].index
        opts.push(Object.assign({}, this.options[item], { data: this.setPoints(itemIndex, isTotal) }))
      })
      return opts
    },
    dateFormatForLabel () {
      if (this.date.from === '') return '23-29 сентября, 2019'
      return `${this.$moment(this.date.from).format('D MMMM, YYYY')} — ${this.$moment(this.date.to).format('D MMMM, YYYY')}`
    }
  },
  methods: {
    getPoint (interval, itemIndex, isTotal) {
      const values = (isTotal) ? this.$app.bookings.dashboardBookingsProfitList[itemIndex].profits
        : this.$app.bookings.dashboardBookingsProfitList[itemIndex].prepayments
      const value = values.find(item => item.interval.slice(0, 10) === interval)
      let result = 0
      if (!value) return result
      return (value.profit) ? value.profit : value.prepayment
    },
    setPoints (itemIndex, isTotal) {
      const points = this.dateArray.map((item, index) => {
        const point = []
        point.push(item)
        point.push(this.getPoint(item, itemIndex, isTotal))
        return point
      })
      return points
    },
    async loadData () {
      const interval = (this.period !== 'year') ? 'day' : 'month'
      await this.$app.bookings.dashboardBookingsProfit({
        dateFrom: this.$moment(this.date.from).format('YYYY-MM-DD'),
        dateTo: this.$moment(this.date.to).format('YYYY-MM-DD'),
        interval
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
  }
}
</script>

<style scoped>

</style>
