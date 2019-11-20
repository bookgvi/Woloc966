import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async () => {
    try {
      const r = await api.get(`${API_URL}/dashboard/organization-notes`)
      return r.data
    } catch (e) {
      console.warn('catch :: dashboard/organization-notes :: getAll', e)
    }
  },

  addNew: async (payload) => {
    try {
      const r = await api.post(`${API_URL}/dashboard/organization-notes`, payload)
      return r.data
    } catch (e) {
      console.warn('catch :: dashboard/organization-notes :: addNew', e)
    }
  },

  updateOne: async (payload) => {
    const { id, data } = payload
    try {
      const r = await api.put(`${API_URL}/dashboard/organization-notes/${id}`, data)
      return r.data
    } catch (e) {
      console.warn('catch :: dashboard/organization-notes :: updateOne', e)
    }
  },

  deleteOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.delete(`${API_URL}/dashboard/organization-notes/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: dashboard/organization-notes :: deleteOne', e)
    }
  },

  getOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.get(`${API_URL}/dashboard/organization-notes/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: dashboard/organization-notes :: getOne', e)
    }
  }
}
