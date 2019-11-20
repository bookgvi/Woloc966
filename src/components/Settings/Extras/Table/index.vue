<template lang="pug">
  .table.wrapper.wrapper--header
    DataTable(
      title="Дополнительные услуги"
      :loadData="$app.extras.getAll"
      :columns="columns"
      :details="details"
    )
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить услугу" no-caps)

      template(#row-controls="props")
        q-btn(flat round icon="drag_handle" no-caps title="Редактировать" @click="showDialog(props.row)")
    q-dialog(v-model="editExtras" persistent)
      q-card(style="min-width: 700px")
        q-card-section
          editExtras(:singleStudio="singleStudio" :rooms="rooms" :dataset="dataset" @hide="editExtras = false")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import editExtras from '../editExtrasModal/editExtras'
export default {
  props: {
    singleStudio: Object,
    rooms: Array
  },
  name: 'extrasTable',
  components: { DataTable, editExtras },
  data: () => ({
    columns,
    details,
    editExtras: false,
    dataset: {}
  }),
  methods: {
    showDialog (props) {
      this.editExtras = true
      this.dataset = props
    }
  }
}
</script>
