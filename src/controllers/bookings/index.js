import api from 'src/api'
import crudMixin from '../crudMixin'

export default {
  name: 'bookings',
  data () {
    return {
      calendarList: [],
      dashboardBookingsList: [],
      idOfJustAdded: 0,
      dashboardBookingsShareList: [],
      dashboardBookingsProfitList: []
    }
  },
  mixins: [crudMixin],
  methods: {
    async getForCalendar (filter) {
      this.loading.list = true
      const res = await api.bookings.getForCalendar(filter)
      if (res) {
        if (filter.price && filter.events) {
          let filteredList = res.data.items.filter(item => {
            const min = filter.price.min
            const max = (filter.price.max === 10000) ? Infinity : filter.price.max
            if (item.price >= min && item.price <= max &&
              filter.events.indexOf(item.eventType) !== -1) {
              return item
            }
          })
          this.calendarList = filteredList
          // console.log(filteredList)
        } else this.calendarList = res.data.items
      }
      this.loading.list = false
    },
    async getForDashBoard (filter) {
      this.loading.list = true
      const res = await api.bookings.getForCalendar(filter)
      if (res) {
        this.dashboardBookingsList = res.data.items
      }
      this.loading.list = false
    },

    async dashboardBookingsShare (payload) {
      this.loading.list = true
      const res = await api.bookings.dashboardBookingsShare(payload)
      if (res) {
        this.dashboardBookingsShareList = res.data
      }
      this.loading.list = false
    },

    async dashboardBookingsProfit (payload) {
      this.loading.list = true
      const res = await api.bookings.dashboardBookingsProfit(payload)
      if (res) {
        this.dashboardBookingsProfitList = res.data
      }
      this.loading.list = false
    },

    async addNew (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api.bookings.addNew(payload)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },

    async addNewTechnical (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api.bookings.addNewTechnical(payload)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },

    async updateOne (id, data) {
      this.loading.one = true
      const res = await api.bookings.updateOne({ id, data })
      // console.log('bookings :: updateOne', res)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },

    async deleteOne (id) {
      this.loading.one = true
      const res = await api.bookings.deleteOne({ id: id })
      if (res) {
        // console.log(res)
      }
      this.loading.one = false
    },

    async getOne (id) {
      this.loading.one = true

      const { data } = await api.bookings.getOne({ id: id })

      if (data) {
        this.loading.one = false
        return data
      }
      this.loading.one = false
    },

    calendarGetObjById (id) {
      return this.calendarList.find(item => item.id === id) || {}
    },
    calendarGetIndexById (id) {
      return this.calendarList.findIndex(item => item.id === id)
    }
  }
}
