<template lang="pug">
  .table.wrapper.wrapper--header(:key="keyNumber")
    DataTable(
      :loadData="$app.discounts.getAll"
      :columns="columns"
      :filter="$app.filters.getValues('settings')"
      @toggleDialogRow="toggleDialogRow"
      :isRowDisabled="({ isActive } = row) => !Boolean(isActive)"
    )
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить скидку" no-caps @click="addDiscount")
    q-dialog(v-model="isModal")
      q-card(style="min-width: 680px;")
        edit-discount(
          :row="row"
          :singleStudio="singleStudio"
          :rooms="rooms"
          :allStudiosName="allStudiosName"
          @hasModal="hasModal"
          @createUpdate="createUpdate"
          @discountDelete="discountDelete"
        )
</template>

<script>
import columns from './columns'
import DataTable from 'components/DataTable'
import editDiscount from '../editDiscount/editDiscount'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import studios from '../../../../api/studios'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
export default {
  name: 'promoTable',
  components: { DataTable, editDiscount, VueCtkDateTimePicker },
  data () {
    return {
      columns,
      keyNumber: 0,
      dataset: {},
      isModal: false,
      row: {},
      id: this.$app.filters.getValues('settings').studio,
      allStudiosName: [],
      rooms: [],
      singleStudio: {}
    }
  },
  async mounted () {
    this.filter()
  },
  methods: {
    async filter () {
      let { studio } = await this.$app.filters.getValues('settings')
      if (!studio) return
      const { items } = await studios.getAll().then(resp => resp.data)
      const rooms = items[0].rooms
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.allStudiosName = items.map(item => item.name)
    },
    async toggleDialogRow (row) {
      this.row = row
      this.isModal = true
    },
    async hasModal () {
      await this.$nextTick()
      this.isModal = false
    },
    addDiscount () {
      this.row = {
        hourFrom: 0,
        hourTo: 23,
        percent: 0,
        minHours: 1,
        startedAt: new Date(),
        expiredAt: new Date(),
        new: true
      }
      this.isModal = true
    },
    async createUpdate (id, value) {
      if (!id) {
        await this.$app.discounts.addNew(value)
      } else {
        await this.$app.discounts.updateOne(id, value)
      }
      this.isModal = false
      this.keyNumber++
    },
    async discountDelete (id) {
      await this.$app.discounts.deleteOne(id)
      this.isModal = false
      this.keyNumber++
    }
  }
}
</script>
