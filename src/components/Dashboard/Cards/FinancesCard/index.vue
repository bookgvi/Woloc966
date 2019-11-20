<template lang="pug">
  standart-card
    .q-pa-none
      name-slot(name="Финансы")
    q-card-section.q-pa-none.q-pb-md
      q-markup-table(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          th(style="width: 70%")
          th
        tbody
          tr
            td
              span.text-grey На счету:
            td.text-right
              span.text-bold.text-h6 {{ accountSlot }}
    q-card-section.q-pa-none.q-pb-md
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
              span.text-bold.text-black.text-body2 Операция
            th.text-right
              span.text-bold.text-black.text-body2 Сумма, р.
        tbody
          tr
            td Предоплата
            td.text-right
              span.text-positive {{ prepaymentSlot }}
          tr
            td Возврат
            td.text-right
              span.text-negative {{ refundSlot }}
          tr
            td Штраф
            td.text-right
              span.text-negative {{ fineSlot }}

</template>

<script>

import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'FinancesCard',
  components: { StandartCard, NameSlot },
  data () {
    return {
    }
  },
  computed: {
    date () {
      return this.$moment().format('YYYY-MM-DD')
    },
    options () {
      if (!this.$app.finances) return []
      return this.$app.finances.dashboardFinancesList
    },
    accountSlot () {
      if (!this.options || !this.options.accountSum) return 0
      return Number(this.options.accountSum).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true, maximumFractionDigits: 0 })
    },
    prepaymentSlot () {
      if (!this.options || !this.options.prepaymentsSum) return 0
      return Number(this.options.prepaymentsSum).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true, maximumFractionDigits: 0 })
    },
    refundSlot () {
      if (!this.options || !this.options.refundsSum) return 0
      return Number(this.options.refundsSum).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true, maximumFractionDigits: 0 })
    },
    fineSlot () {
      if (!this.options || !this.options.finesSum) return 0
      return Number(this.options.finesSum).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true, maximumFractionDigits: 0 })
    }
  },
  methods: {
    async loadData () {
      await this.$app.finances.dashboardFinances({
        date: this.date
      })
    },
  },
  watch: {
    date: {
      async handler () {
        this.loadData()
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>
