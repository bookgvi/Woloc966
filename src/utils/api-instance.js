import axios from 'axios'
import { LocalStorage, Notify } from 'quasar'

// create an axios instance
const instance = axios.create({
  baseURL: process.env.API_URL, // api base_url
  timeout: process.env.API_TIMEOUT // request timeout,
})

console.log('api-instance baseURL:', instance.defaults.baseURL)

// instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.put['Content-Type'] = 'application/json'

// request interceptor
instance.interceptors.request.use(
  conf => {
    // Do something before request is sent
    const token = LocalStorage.getItem('user-token')
    if (token) {
      conf.headers['Authorization'] = `Bearer ${token}`
    }
    return conf
  },
  error => {
    // Do something with request error
    // console.log('request error: ', error) // for debug
    Promise.reject(error)
  })

// response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    const response = error.response
    // console.info('response error', response.data)// for debug
    if (response) {
      switch (response.status) {
        case 401:
          LocalStorage.remove('user-token')
          // window.Location.href = `/login`
          break
        default:
          if (response.data && response.data.errors) {
            if (Array.isArray(response.data.errors)) {
              response.data.errors.forEach(err => {
                Notify.create({
                  message: err.message,
                  color: 'negative',
                  position: 'bottom',
                  icon: 'warning'
                })
              })
            } else {
              Notify.create({
                message: response.data.errors.message,
                color: 'negative',
                position: 'bottom',
                icon: 'warning'
              })
            }
          }
      }
      // return response.data
    }
    // return Promise.reject(response.data)
    return Promise.reject(response)
  }
)
export default instance
