import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  name: 'refunds',
  data () {
    return {
      dashboardRefundsList: []
    }
  },
  mixins: [crudMixin],
  methods: {
    async getForDashBoard (filter) {
      this.loading.list = true
      const res = await api.refunds.getAll()
      if (res) {
        this.dashboardRefundsList = res.data.items
      }
      this.loading.list = false
    },
  }
}
