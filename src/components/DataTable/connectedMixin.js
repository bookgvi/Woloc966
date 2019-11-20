export default {
  props: {
    loadData: Function,
    filter: Object
  },
  watch: {
    filter (filter) {
      if (!filter.search) {
        this.resetFilter = true
      } else {
        this.resetFilter = false
      }
      this.onRequest(this.pagination, filter)
    }
  },
  methods: {
    async onRequest (pagination, filter) {
      if (this.$route.path.split('/')[1] === 'settings' && !filter.studio) return
      if (this.$route.path === '/bookings' && !filter.studio && !filter.customer) return
      const { page, rowsPerPage } = pagination
      let { items, total, transactions, account } = await this.loadData({ number: page, size: rowsPerPage }, filter)
      if (transactions) {
        this.account.amount = account.amount
        items = transactions.items
        total = transactions.total
      }
      this.data = items
      Object.assign(this.pagination, pagination, { rowsNumber: total })
    },
    setPagination (prop, value) {
      const { pagination, filter } = this
      if (pagination[prop] === value) return
      this.onRequest({ ...pagination, [prop]: value }, filter)
    }
  },
  async mounted () {
    await this.onRequest(this.pagination, this.filter)
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsNumber: 1,
      }
    }
  }
}
