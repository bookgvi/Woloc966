import api from 'src/api'

export default {
  name: 'customers',
  data () {
    return {
      searched: [],
      loading: {
        list: false,
        one: false
      },
    }
  },
  methods: {
    async getForCalendar (search) {
      this.loading.list = true
      const { data } = await api.customers.getSearchedCustomers(search)
      if (data) {
        this.searched = data.items
        this.loading.list = false
      }
      return data
    },
    async getAll (page, filter) {
      const { data } = await api.customers.getAll(page, filter)
      return data
    }
  }
}
