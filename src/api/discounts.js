import api from './instance'
const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page, filter) => {
    try {
      const r = await api.get(`${API_URL}/rooms/discounts`, {
        params: { page, ...filter }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: discounts :: getAll', e)
    }
  },
  addNew: async (payload) => {
    try {
      const r = await api.post(`${API_URL}/rooms/discounts`, payload)
      return r.data
    } catch (e) {
      console.warn('catch :: discounts :: addNew', e)
    }
  },
  updateOne: async (payload) => {
    const { id, data } = payload
    try {
      const r = await api.put(`${API_URL}/rooms/discounts/${id}`, data)
      return r.data
    } catch (e) {
      console.warn('catch :: discounts :: updateOne', e)
    }
  },
  deleteOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.delete(`${API_URL}/rooms/discounts/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: discounts :: deleteOne', e)
    }
  }
}
