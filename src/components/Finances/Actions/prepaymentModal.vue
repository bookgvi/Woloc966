<template lang="pug">
  .refund.q-pa-lg
    .row.justify-between.q-pb-md
      .col
        .text-h5.text-bold Регистрация предоплаты
      .col-1
        q-btn.q-mr-md(icon="close" flat v-close-popup)
    .row.q-pb-md
      .col
        .text-h6 Номер брони
      .col
        q-input(
          outlined
          dense
        )
    .row.q-pb-md
      .col
        .text-h6 Сумма, ₽
      .col
        q-input(
          outlined
          dense
        )
    .row.justify-center
      .col-1
        q-btn.bg-primary.text-white(label="Done" @click="createPrepayment" v-close-popup)

</template>

<script>
export default {
  name: 'refund',
  methods: {
    createPrepayment () {
    }
  }
}
</script>

<style scoped>

</style>
