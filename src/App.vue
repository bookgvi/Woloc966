<template lang="pug">
  #q-app
    router-view
</template>

<script>

import Vue from 'vue'
import bookings from './controllers/bookings'
import users from './controllers/users'
import rooms from './controllers/rooms'
import customers from './controllers/customers'
import events from './controllers/events'
import extras from './controllers/extras'
import studios from './controllers/studios'
import login from './controllers/login'
import refunds from './controllers/refunds'
import finances from './controllers/finances'
import documents from './controllers/documents'
import filters from './controllers/filters'
import promo from './controllers/promo'
import discounts from './controllers/discounts'
import jswidget from './controllers/jswidget'
import organizationNotes from './controllers/organizationNotes'
import promocodes from './controllers/promocodes'
import search from './controllers/search'

export default {
  name: 'App',
  created () {
    Vue.prototype.$app = this
  },
  data () {
    return [bookings, users, rooms, customers, events, extras, studios, login, refunds, documents, filters, finances, promo, discounts, jswidget, organizationNotes, promocodes, search].reduce(
      (acc, component) => ({ ...acc, [component.name]: new Vue(component) }),
      {}
    )
  }
}
</script>
