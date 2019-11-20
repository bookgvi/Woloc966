import axios from 'axios'
import { stringify } from 'qs'
import { LocalStorage, Notify } from 'quasar'

const currentURL = (_ => {
  const currentURL = window.location
  let baseURL = currentURL.hostname
  let isCabinet = currentURL.hostname.split('.')
  if (baseURL === 'localhost') {
    baseURL = 'https://pre.ugoloc.ucann.ru'
  } else if (isCabinet[0] === `cabinet`) {
    isCabinet.shift()
    baseURL = `https://${isCabinet.join('.')}`
  }
  return `${baseURL}/api`
})()
const instance = axios.create({
  // baseURL: process.env.API_BASE_URL || '/api', // api base_url
  baseURL: currentURL, // api base_url
  paramsSerializer: function (params) {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.get['Accept'] = 'application/json'

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
        case 403:
          LocalStorage.remove('user-token')
          window.location.href = `/login`
          break
        default:
          if (response.data && response.data.errors) {
            if (Array.isArray(response.data.errors)) {
              response.data.errors.forEach(err => {
                Notify.create({
                  message: err.title,
                  color: 'negative',
                  position: 'bottom-left',
                  icon: 'warning'
                })
              })
            } else {
              Notify.create({
                message: response.data.errors.title,
                color: 'negative',
                position: 'bottom-left',
                icon: 'warning'
              })
            }
          }
      }
      // return response.data
    }
    return Promise.reject(response.data)
  }
)
export default instance
