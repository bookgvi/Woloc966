<template lang="pug">
  .refunds
    .menu
      filters-list(name="refunds" )
        template(#prepend="props")
          studio-filter(v-bind="props")
          rooms-filter(v-bind="props")
          status-filter(v-bind="props")
          q-btn.q-py-none(label="Дата и время" outline no-caps dense)
    .content
      RefundsTable
</template>

<script>
import RefundsTable from './Table/index'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import FiltersList from '../Filters/FiltersList'
import StatusFilter from '../Filters/StatusFilter'

export default {
  name: 'RefundsIndex',
  components: {
    FiltersList,
    RoomsFilter,
    StudioFilter,
    RefundsTable,
    StatusFilter
  }
}
</script>

<style>
</style>
