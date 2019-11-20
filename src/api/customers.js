import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page, filter) => {
    try {
      const r = await api.get(`${API_URL}/customers`, {
        params: { page, ...filter }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: customers :: getAll', e)
    }
  },
  getSearchedCustomers: async (search) => {
    try {
      const r = await api.get(`${API_URL}/customers`, {
        params: { search }
      })

      return r.data
    } catch (e) {
      console.warn('catch :: customers :: getSearchedCustomers', e)
    }
  }
}
