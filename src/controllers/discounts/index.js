import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  name: 'discounts',
  mixins: [crudMixin],
  methods: {
    async updateOne (id, data) {
      this.loading.one = true
      const res = await api.discounts.updateOne({ id, data })
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },
    async addNew (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api.discounts.addNew(payload)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },
    async deleteOne (id) {
      this.loading.one = true
      const res = await api.discounts.deleteOne({ id: id })
      if (res) {
        // console.log(res)
      }
      this.loading.one = false
    },

  }
}
