<template lang="pug">
  q-menu(fit)
    q-list(style="min-width: 100px")
      q-item(
        clickable
        @click="fastClick"
      )
        q-item-section.text-body2 Быстрая
      q-item(
        clickable
        @click="commonClick"
      )
        q-item-section.text-body2 Обычная
</template>

<script>
export default {
  name: 'BookingTypeMenu',
  methods: {
    fastClick () {
      this.$emit('fastClick')
    },
    commonClick () {
      this.$emit('commonClick')
    },
  }
}
</script>

<style scoped>

</style>
