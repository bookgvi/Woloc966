// import Quasar from 'quasar'
import moment from 'moment/moment'
import VueMoment from 'vue-moment'

moment.locale('ru')

export default ({ Vue }) => {
  Vue.use(VueMoment, {
    moment
  })
}

export { moment }
