import api from 'src/api'
import crudMixin from '../crudMixin'

export default {
  name: 'promocodes',
  data () {
    return {
      idOfJustAdded: 0
    }
  },
  mixins: [crudMixin],
  methods: {
    async getAll (page, filter) {
      this.loading.list = true
      const { name } = this.$options
      const { data } = await api[name].getAll(page, filter)
      if (data) {
        this.list = data
        this.loading.list = false
      }

      return data
    },
    async addNew (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api.promocodes.addNew(payload)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },

    async updateOne (id, data) {
      this.loading.one = true
      const res = await api.promocodes.updateOne({ id, data })
      // console.log('promocodes :: updateOne', res)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },

    async deleteOne (id) {
      this.loading.one = true
      const res = await api.promocodes.deleteOne({ id: id })
      if (res) {
        // console.log(res)
      }
      this.loading.one = false
    },

    async getOne (id) {
      this.loading.one = true

      const { data } = await api.promocodes.getOne({ id: id })

      if (data) {
        this.loading.one = false
        return data
      }
      this.loading.one = false
    },
  }
}
