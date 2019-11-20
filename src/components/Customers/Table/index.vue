<template lang="pug">
  .customer
    DataTable(
      title="Клиенты"
      :loadData="$app.customers.getAll"
      :filter="$app.filters.getValues('customers')"
      :columns="columns"
      @toggleDialogRow="toggleDialogRow"
    )
      // ---- TODO ---- решение будет принято впоследствии!!!
      // template(#row-controls="props")
      //  q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
      //  q-btn(flat round icon="phone" title="Позвонить")
      //  q-btn(flat round icon="email" title="Отправить E-mail")
      //  q-btn(flat round icon="comment" title="Открыть чат")
    q-dialog(v-model="isModal")
      q-card(style="min-width: 680px;")
        CustomersDialog(:row="customerData")
</template>

<script>
import columns from './columns'
import DataTable from 'components/DataTable'
import CustomersDialog from './CustomersDialog'
export default {
  name: 'CustomersTable',
  components: { DataTable, CustomersDialog },
  data: () => ({
    columns,
    customerData: {},
    isModal: false
  }),
  methods: {
    async toggleDialogRow (row) {
      this.customerData = row
      await this.$nextTick()
      this.isModal = true
    }
  }
}
</script>

<style scoped>
</style>
