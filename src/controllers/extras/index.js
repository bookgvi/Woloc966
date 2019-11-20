import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  data () {
    return {
      extrasForRoom: []
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getForCalendar (payload) {
      this.loading.list = true
      const res = await api.extras.getForCalendar(payload)
      if (res) {
        const oldExtras = [...this.extrasForRoom]
        this.extrasForRoom = res.data.map(item => {
          const elem = oldExtras.find(extra => extra.id === item.id)
          const count = (!elem) ? 0 : elem.count
          return {
            ...item,
            count
          }
        })
      }
      this.loading.list = false
    },

  },
  name: 'extras',
  mixins: [crudMixin],
}
