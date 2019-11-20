<template lang="pug">
  .finances
    .menu
      filters-list(name="finances")
        template(#prepend="props")
          q-btn.q-py-none.q-px-sm(
            outline
            dense
            no-caps
            label="Дата и время"
          )
          q-btn.q-py-none.q-px-sm(
            outline
            dense
            no-caps
            label="Тип записи"
          )
          q-space
          q-btn.q-py-none.q-px-sm.bg-primary.text-white(
            no-caps
            label="Сделать предоплату"
            @click="isPrepayment = true"
          )
          q-btn.q-py-none.q-px-sm.bg-primary.text-white(
            no-caps
            label="Сделать возврат"
            @click="isRefund = true"
          )
    q-dialog(v-model="isPrepayment")
      q-card(style="min-width: 640px;")
        prepayment
    q-dialog(v-model="isRefund")
      q-card(style="min-width: 640px;")
        refund
    .content
      FinancesTable
</template>

<script>
import FinancesTable from './Table/index'
import FiltersList from '../Filters/FiltersList'
import refund from './Actions/refundModal'
import prepayment from './Actions/prepaymentModal'
export default {
  name: 'RefundsIndex',
  components: {
    FiltersList,
    FinancesTable,
    refund,
    prepayment
  },
  data: () => ({
    isRefund: false,
    isPrepayment: false
  })
}
</script>

<style>
</style>
