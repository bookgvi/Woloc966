<template lang="pug">
  .dicounts
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
    .content--content2
      .row
        discountsTable
</template>

<script>
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import discountsTable from './Table'
export default {
  components: {
    StudioFilter,
    FiltersList,
    discountsTable
  }
}
</script>
