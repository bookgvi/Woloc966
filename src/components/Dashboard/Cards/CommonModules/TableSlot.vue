<template lang="pug">
  q-card-section
    q-table(
      style="min-width: 350px"
      wrap-cells
      :data="options"
      :columns="columns"
      separator="none"
      dense
      flat
    )
</template>

<script>
export default {
  name: 'TableSlot',
  props: {
    options: Array,
    columns: Array
  }
}
</script>

<style scoped>

</style>
