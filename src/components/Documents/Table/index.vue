<template lang="pug">
  .table_document
    DataTable(
      title="Документы"
      :columns="columns"
      :filter="$app.filters.getValues('documents')"
      :details="details"
      :getDialogTitle="() => 'Документы'"
      :loadData="$app.documents.getAll"
    )
      template(#row-controls="props")
        a(:href="props.row.link" title="Скачать")
          q-icon(name="get_app" style="font-size: 2em")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
export default {
  name: 'DocumentsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details,
    link: '',
    alert: false
  }),
}
</script>

<style scoped>
</style>
