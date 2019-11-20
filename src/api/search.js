import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getResult: async (pageURL, searchStr) => {
    try {
      const r = await api.get(`${API_URL}${pageURL}`, {
        params: {
          search: searchStr
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: search :: getAll', e)
    }
  }
}
