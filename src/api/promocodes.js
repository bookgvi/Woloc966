import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (payload) => {
    const { studio } = payload
    try {
      const r = await api.get(`${API_URL}/rooms/promocodes/`, {
        params: {
          studio
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: promocodes :: getAll', e)
    }
  },

  addNew: async (payload) => {
    try {
      const r = await api.post(`${API_URL}/rooms/promocodes`, payload)
      return r.data
    } catch (e) {
      console.warn('catch :: promocodes :: addNew', e)
    }
  },

  updateOne: async (payload) => {
    const { id, data } = payload
    try {
      const r = await api.put(`${API_URL}/rooms/promocodes/${id}`, data)
      return r.data
    } catch (e) {
      console.warn('catch :: promocodes :: updateOne', e)
    }
  },

  deleteOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.delete(`${API_URL}/rooms/promocodes/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: promocodes :: deleteOne', e)
    }
  },

  getOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.get(`${API_URL}/rooms/promocodes/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: promocodes :: getOne', e)
    }
  }
}
