import { moment } from '../boot/moment'
import { LocalStorage, date } from 'quasar'
import jwtDecode from 'jwt-decode'

export function checkAuth (to, from, next) {
  const token = LocalStorage.getItem('user-token') || null
  let jwt = null
  let expired = true
  if (token) {
    jwt = jwtDecode(token)
    expired = date.formatDate(jwt.exp, 'X') < date.formatDate(Date.now(), 'X')
  }
  if (!token || expired) {
    next(`/login`)
    // next(`/login?to=${encodeURI(to.fullPath)}`)
  } else {
    next()
  }
}

export function checkNoAuth (to, from, next) {
  const token = LocalStorage.getItem('user-token') || null
  let jwt = null
  let expired = true
  if (token) {
    jwt = jwtDecode(token)
    expired = date.formatDate(jwt.exp, 'X') < date.formatDate(Date.now(), 'X')
  }
  if (token && !expired) {
    next('/')
  } else {
    next()
  }
}

export function dtFormat (v) {
  return moment(v).format(moment.defaultFormatUtc)
}
