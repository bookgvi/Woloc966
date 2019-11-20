<template lang="pug">
  q-card-section
    .row.col-12.items-center
      span.col.text-bold.text-body1 {{ name }}
      q-icon.col-1(
        size="15px"
        color="grey"
        name="fas fa-grip-lines"
      )
</template>

<script>
export default {
  name: 'NameSlot',
  props: {
    name: String
  }
}
</script>

<style scoped>

</style>
