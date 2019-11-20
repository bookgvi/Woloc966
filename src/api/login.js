import api from './instance'

const API_URL = process.env.API_AUTH_URL
export default {
  login: async (data) => {
    try {
      const r = await api.post(`${API_URL}/login`, data)
      return r.data
    } catch (e) {
      console.warn('catch login', e)
      return e
    }
  }
}
