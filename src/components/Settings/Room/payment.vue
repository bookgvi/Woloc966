<template lang="pug">
  .payment
    .row.q-pb-lg
      .col
        .text-h6.q-pb-md Оплата
        q-btn.bg-primary.text-white(label="Открыть календарь цен" no-caps @click="isModal = true")
      q-dialog(v-model="isModal" persistent)
        q-card(style="min-width: 40%")
          q-card-section
            priceCalendar(@hide="isModal = false")
</template>

<script>
import priceCalendar from './priceCalendar/index.vue'
export default {
  name: 'payment',
  components: { priceCalendar },
  data: () => ({
    isModal: false
  })
}
</script>
