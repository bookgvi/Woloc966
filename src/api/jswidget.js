// import api from './instance'
import jswidget from 'src/mocks/jswidget'

export default {
  getAll: async () => {
    try {
      const r = {
        data: jswidget
      }
      return r
    } catch (e) {
      console.warn('catch :: jswidget :: getAll', e)
    }
  }
}
