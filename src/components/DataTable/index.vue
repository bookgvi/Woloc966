<template lang="pug">
  .q-pa-none
    q-table.shadow-0.data-table(
      row-key="id"
      hide-bottom
      :data="data"
      :columns="normalizedColumns"
      :pagination.sync="pagination"
      @request="onRequest"
      :style="{ background: 'none'}"
    )
      template(#header-cell="props")
        q-th.header(:style="props.col.headerStyle")
          span {{props.col.label}}

      template(#top-left)
        .text-h6.inline-block {{ title }}
        slot(name="title-append" v-bind="account")

      template(#top-right="props")
        slot(name="table-controls-prepend")
        TableControls(v-bind="props"
          :setPagination="setPagination"
          :resetFilter="resetFilter"
          @search="search"
        )
          slot(name="table-controls-append")

      template(#body="props")
        TableRow(
          v-bind="props"
          :controlsRowId="controlsRowId"
          :disabled="isRowDisabled && isRowDisabled(props.row)"
          @toggleControls="toggleControlsRow"
          @toggleDialogRow="toggleDialogRow"
        )
          slot(
            name="row-controls"
            :row="props.row"
            :toggleDialogRow="toggleDialogRow"
          )
</template>

<script>
import TableControls from './TableControls'
import TableRow from './TableRow'
import connected from './connectedMixin'
export default {
  name: 'DataTable',
  components: { TableControls, TableRow },
  mixins: [connected],
  props: {
    title: String,
    getDialogTitle: Function,
    columns: Array,
    details: Array,
    activeColumns: Array,
    isRowDisabled: Function,
  },
  data () {
    return {
      data: [],
      total: 0,
      resetFilter: false,
      account: { amount: 0 },
      controlsRowId: undefined,
      dialogRowId: undefined,
    }
  },
  methods: {
    toggleControlsRow (id) {
      this.controlsRowId = this.controlsRowId === id ? undefined : id
    },
    toggleDialogRow (row) {
      this.$emit('toggleDialogRow', row)
    },
    async search (page, searchStr) {
      page = page.split('/')[1]
      this.$app.filters.setValue(page, 'search', searchStr)
    }
  },
  computed: {
    dialogRow () {
      return this.dialogRowId && this.data.find(({ id }) => id === this.dialogRowId)
    },
    normalizedColumns () {
      return this.columns.map(col => ({
        ...col,
        field: col.field || col.name,
        align: col.align || 'left',
        style: col.width && `width: ${col.width}px`
      }))
    },
    normalizedDetails () {
      return this.details.map(section => ({
        ...section,
        fields: section.fields.map(field => ({
          ...field,
          field: field.field || field.name,
        }))
      }))
    }
  }
}
</script>

<style lang="stylus" scoped>
  .data-table
    padding-top: 12px
    .q-table__top
      padding 20px 0 !important
  thead tr:first-child th
    opacity 1
    background-color $grey-12
    text-transform uppercase
    text-align left
</style>
