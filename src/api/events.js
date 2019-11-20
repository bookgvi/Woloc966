// import api from './instance'
import events from 'src/mocks/events'

export default {
  getAll: async () => {
    try {
      const r = {
        data: events
      }
      return r
    } catch (e) {
      console.warn('catch :: events :: getAll', e)
    }
  }
}
