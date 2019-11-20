<template lang="pug">
  .notifications
    .row.q-py-lg.justify-center
      .col-4
        .text-h6.q-pb-md.q-pl-sm E-mail уведомления
        span.q-pl-sm.text-bold Получать информацию:
        q-option-group.q-pt-md.q-px-none(
          type="checkbox"
          :options="options"
          v-model="checkedOptions"
        )
</template>

<script>
export default {
  name: 'notifications',
  data () {
    return {
      checkedOptions: [],
      options: [
        {
          label: 'Об отмене бронирования',
          value: 0
        },
        {
          label: 'О новых бронированиях',
          value: 1
        },
        {
          label: 'О новых заявках',
          value: 2
        },
        {
          label: 'О возврате предоплаты',
          value: 3
        },
        {
          label: 'О новых сообщениях',
          value: 4
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
