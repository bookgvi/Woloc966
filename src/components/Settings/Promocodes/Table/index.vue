<template lang="pug">
  .table.wrapper.wrapper--header
    DataTable(
      title="Промокоды"
      :getDialogTitle="({ id }) => `Промокод № ${id}`"
      :loadData="$app.promo.getAll"
      :columns="columns"
      :details="details"
    )
      template(#row-dialog="props")
        editPromocode(v-bind="props" :allStudiosName="allStudiosName" :singleStudio="singleStudio" :rooms="rooms")

      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить промокод" no-caps)
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import editPromocode from '../editPromoModal/editPromo'
export default {
  props: {
    singleStudio: Object,
    rooms: Array,
    allStudiosName: Array
  },
  name: 'promoTable',
  components: { DataTable, editPromocode },
  data: () => ({
    columns,
    details,
    editPromo: true,
    dataset: {}
  }),
  methods: {
    showDialog (props) {
      this.editPromo = true
      this.dataset = props
    }
  }
}
</script>

<style scoped>
</style>
