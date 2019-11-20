import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page, filter) => {
    try {
      const r = await api.get(`${API_URL}/bookings`, {
        params: {
          page,
          ...filter
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getAll', e)
    }
  },

  addNew: async (payload) => {
    try {
      const r = await api.post(`${API_URL}/bookings`, payload)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: addNew', e)
    }
  },

  addNewTechnical: async (payload) => {
    try {
      const r = await api.post(`${API_URL}/bookings/technical`, payload)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: addNewtechnical', e)
    }
  },

  updateOne: async (payload) => {
    const { id, data } = payload
    try {
      const r = await api.put(`${API_URL}/bookings/${id}`, data)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: updateOne', e)
    }
  },

  deleteOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.delete(`${API_URL}/bookings/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: deleteOne', e)
    }
  },

  getOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.get(`${API_URL}/bookings/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getOne', e)
    }
  },

  getForCalendar: async (filter) => {
    try {
      const r = await api.get(`${API_URL}/calendar`, {
        params: {
          dateFrom: filter.dateFrom,
          dateTo: filter.dateTo,
          studio: filter.studio,
          rooms: filter.rooms
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getForCalendar', e)
    }
  },
  dashboardBookingsShare: async (payload) => {
    const { dateFrom, dateTo } = payload
    try {
      const r = await api.get(`${API_URL}/dashboard/bookings-share`, {
        params: {
          dateFrom,
          dateTo
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: dashboard/bookings-share', e)
    }
  },
  dashboardBookingsProfit: async (payload) => {
    const { dateFrom, dateTo, interval } = payload
    try {
      const r = await api.get(`${API_URL}/dashboard/profit`, {
        params: {
          dateFrom,
          dateTo,
          interval
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: dashboard/profit', e)
    }
  }
}
