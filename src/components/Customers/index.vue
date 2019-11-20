<template lang="pug">
  .customers
    .menu
      filters-list(name="customers")
        template(#prepend="props")
          rating-filter(v-bind="props")
    .content
      customers-table
</template>

<script>
import FiltersList from 'components/Filters/FiltersList'
import RatingFilter from 'components/Filters/RatingFilter'
import CustomersTable from './Table'

export default {
  name: 'CustomersPage',
  components: { RatingFilter, CustomersTable, FiltersList },
}
</script>
