<template lang="pug">
  q-tabs.nav-tabs(
    shrink
    align="justify"
    animated
    no-caps
    active-color="black"
    narrow-indicator
    dense
  )
    q-route-tab.nav-tabs__tab(
      v-for="(route, index) in routes"
      :key="index"
      :to="route.to"
      :label="route.label"
    )
</template>

<script>
export default {
  name: 'NavTabs',
  data () {
    return {
      routes: [
        { to: '/', label: 'Дашборд' },
        { to: '/customers', label: 'Клиенты' },
        { to: '/calendar', label: 'Календарь' },
        { to: '/bookings', label: 'Бронирования' },
        { to: '/finances', label: 'Финансы' },
        { to: '/refunds', label: 'Возвраты' },
        { to: '/documents', label: 'Документы' },
        { to: '/settings', label: 'Настройки' }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
  .nav-tabs
    &__tab
      height 80px
      padding-left 9px
      padding-right 9px
</style>
