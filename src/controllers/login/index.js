import { LocalStorage } from 'quasar'
import jwtDecode from 'jwt-decode'
import api from 'src/api'

const user = LocalStorage.getItem('user-data') || null
let token = LocalStorage.getItem('user-token') || null
const jwt = token ? jwtDecode(token) : { exp: 0 }
const expired = jwt.exp < Math.round(Date.now() / 1000)
if (expired) {
  LocalStorage.remove('user-token')
  token = null
}

export const initialProfile = () => ({
  userId: (user && user.userId) || null,
  login: (user && user.login) || null,
  lastname: (user && user.lastname) || null,
  firstname: (user && user.firstname) || null,
  middlename: (user && user.middlename) || null,
  email: (user && user.email) || null,
  phone: (user && user.phone) || null,
  roles: (user && user.roles) || [],
})

export default {
  name: 'login',
  data () {
    return {
      pooling: null,
      updated: null,
      loading: {
        user: false,
        ratings: false,
      },
      ratings: null,
      currentGroup: null,
      token,
      expired,
      profile: initialProfile(),
    }
  },
  methods: {
    async login (data) {
      this.loading.user = true
      const res = await api.login.login(data)
      this.loading.user = false
      if (res.errors) {
        return false
      }
      const token = res.data.access_token
      const jwt = token && jwtDecode(token)
      if (token && jwt) {
        this.token = token
        this.expired = false
        this.profile = Object.assign({}, jwt)
        LocalStorage.set('user-token', token)
        LocalStorage.set('user-data', jwt)
        this.$app.$router.push('/')
        return true
      }
      return false
    }
  }
}
