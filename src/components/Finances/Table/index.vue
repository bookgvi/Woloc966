<template lang="pug">
  DataTable(
    title="Финансы"
    :loadData="$app.finances.getAll"
    :filter="$app.filters.getValues('finances')"
    :getDialogTitle="() => 'Финансы'"
    :columns="columns"
    :details="details"
  )
    template(#title-append="props")
      .text-h6.inline-block.q-pl-md {{ props.amount }} ₽
    template(#table-controls-prepend="props")
      q-btn.bg-primary.q-mr-xl(no-caps text-color='white' label="Вывести на счет")

</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'

export default {
  name: 'FinancesTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  }),
  created () {
    this.$app.filters.filterDefault('finances')
  }
}
</script>

<style scoped>
</style>
