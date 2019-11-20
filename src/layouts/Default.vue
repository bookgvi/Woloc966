<template lang="pug">
  q-layout(view="hHh LPr lFf")
    q-header.bg-white.text-grey
      .wrapper.wrapper--header
        site-header
    q-page-container
      .wrapper
        router-view
</template>

<script>
import SiteHeader from '../components/Layout'
export default {
  name: 'DefaultLayout',
  components: { SiteHeader }
}
</script>

<style scoped lang="stylus">
  .q-header
    background none !important
</style>
