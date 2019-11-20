import api from '../api'

export default {
  data () {
    return {
      loading: {
        list: false,
        one: false
      },
      list: [],
      calendarList: []
    }
  },
  methods: {
    async getAll (page, filter) {
      this.loading.list = true
      const { name } = this.$options
      const { data } = await api[name].getAll(page, filter)
      if (data) {
        this.list = data.items
        this.loading.list = false
      }

      return data
    },
  },

  watch: {
    'loading.list' (v) {
      if (v) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    },
    'loading.one' (v) {
      if (v || this.loading.list) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  }
}
