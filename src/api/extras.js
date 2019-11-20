import api from './instance'
import extras from 'src/mocks/extras'

const API_URL = process.env.API_CABINET_URL

export default {
  getAll: async () => {
    try {
      const r = {
        data: extras
      }
      return r
    } catch (e) {
      console.warn('catch :: extras :: getAll', e)
    }
  },
  getForCalendar: async (payload) => {
    try {
      const r = await api.get(`${API_URL}/rooms/${payload.room}/extras`)
      return r.data
    } catch (e) {
      console.warn('catch :: extras :: getForCalendar', e)
    }
  },
}
