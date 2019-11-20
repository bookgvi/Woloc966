// import api from './instance'
import rooms from 'src/mocks/rooms'

export default {

  getAll: async () => {
    try {
      const r = {
        data: rooms
      }
      return r
    } catch (e) {
      console.warn('catch :: rooms :: getAll', e)
    }
  }
}
