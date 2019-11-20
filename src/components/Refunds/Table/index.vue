<template lang="pug">

  DataTable(
    title="Возврат"
    :loadData="$app.refunds.getAll"
    :getDialogTitle="() => 'Возврат'"
    :filter="$app.filters.getValues('refunds')"
    :columns="columns"
    :details="details"
    :isRowDisabled="({ status }) => !status"
  )
    template(#row-controls)
      q-btn(flat round icon="block" no-caps title="Отменить")
      q-btn(flat round icon="thumb_up" no-cpas title="Подтвердить")

</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
export default {
  name: 'RefundsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  }),
}
</script>

<style scoped>
</style>
