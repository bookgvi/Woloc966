<template lang="pug">
  .q-pa-none
    .menu
      q-separator
      q-tabs.q-pa-xs(
        shrink
        bordered
        align="left"
        animated
        no-caps
        active-color="black"
        narrow-indicator
        dense
      )
        q-route-tab(
          v-for="(route, index) in settings"
          :key="index"
          :to="route.to"
          :label="route.label"
        )
      q-separator
    .content
      router-view
</template>

<script>
export default {
  name: 'NavTabs',
  data () {
    return {
      settings: [
        // { to: '/settings/location', label: 'Локация' },
        // { to: '/settings/room', label: 'Залы' },
        // { to: '/settings/extras', label: 'Доп. услуги' },
        { to: '/settings/discounts', label: 'Скидки' },
        // { to: '/settings/promo', label: 'Промокоды' },
        // { to: '/settings/rules', label: 'Правила' },
        // { to: '/settings/organization', label: 'Данные организации' },
        // { to: '/settings/jswidget', label: 'JSWidget' },
        // { to: '/settings/notifications', label: 'E-mail уведомления' }
      ]
    }
  }
}
</script>

<style>
  body {
    overflow-x: hidden;
  }
</style>
