import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getSearchedUsers: async (payload) => {
    try {
      const result = await api.post(`${API_URL}/customers`, payload)
      return result
    } catch (e) {
      console.warn('catch :: users :: getSearchedUsers', e)
    }
  }
}
