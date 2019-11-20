// import api from './instance'
import promo from 'src/mocks/promo'

export default {
  getAll: async () => {
    try {
      const r = {
        data: promo
      }
      return r
    } catch (e) {
      console.warn('catch :: promo :: getAll', e)
    }
  }
}
