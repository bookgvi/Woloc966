import api from '../../api'

export default {
  name: 'users',
  data () {
    return {
      loading: false,
      users: [],
    }
  },
  methods: {
    async getSearchedUsers (payload) {
      this.loading = true
      const result = await api.users.getSearchedUsers(payload)
      if (result) {
        this.users = result
        this.loading = false
      }
    },
  },
  watch: {
    loading (v) {
      if (v) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  }
}
