<template lang="pug">
  .table-controls.row.q-px-none
    q-input.q-mr-sm(
      v-if="hasFind"
      dense
      square
      outlined
      type="search"
      v-model="inputValue"
      placeholder="Поиск"
      style="width: 290px"
      @change.native="search"
    )
      template(#prepend)
        q-icon(name="search")

    q-pagination(
      color="black"
      width=""
      :max="pagesNumber"
      :maxPages="5"
      :boundary-numbers="true"
      :value="pagination.page"
      @input="(value) => setPagination('page', value)"
    )
    q-select.q-mx-md(
      :value="pagination.rowsPerPage"
      :options="options"
      @input="(value) => setPagination('rowsPerPage', value)"
      outlined
      color="secondary"
      dense
    )
    q-btn-group(outline)
      q-btn.q-px-sm(
        outline
        icon="chevron_left"
        color="secondary"
        :disable="isFirstPage"
        @click="hPrevPage(pagination)"
      )
      q-separator(vertical inset)
      q-btn.q-px-sm(
        outline
        icon="chevron_right"
        color="secondary"
        :disable="isLastPage"
        @click="hNextPage(pagination)"
      )
    slot
</template>

<script>
export default {
  name: 'TableControls',
  props: {
    pagesNumber: Number,
    isFirstPage: Boolean,
    isLastPage: Boolean,
    pagination: Object,
    prevPage: Function,
    nextPage: Function,
    setPagination: Function,
  },
  data () {
    return {
      options: [10, 50, 100, 250],
      inputValue: '',
    }
  },
  computed: {
    hasFind () {
      const isFind = (this.$route.path !== '/settings') ^ (this.$route.path !== '/settings/discounts')
      return !isFind
    }
  },
  methods: {
    hNextPage (val) {
      this.setPagination('page', val.page + 1)
    },
    hPrevPage (val) {
      this.setPagination('page', val.page - 1)
    },
    async search (e) {
      const page = this.$route.path
      this.$emit('search', page, this.inputValue)
    }
  }
}
</script>

<style lang="stylus">
  .table-controls
    .q-btn.square, .q-pagination .q-btn
      width 3em
      padding 7px 16px !important
      font-weight bold
    .q-btn--flat
      border $grey-12 solid 1px
    .q-btn--standard
      border none
      background-color $primary !important
      box-shadow none
    .q-pagination .q-btn
      margin 0 4px

    .q-select
      .q-field__native
        font-weight bold

    .q-field__control
      input
        font-weight bold

    .q-field__control:before
      border-color $grey-12
</style>
