<template lang="pug">
  .bookingDialog.q-pa-lg
    .row.justify-between.q-pb-md
      .col
        .text-h5.text-bold Бронь {{ row.id }}
      .col-1
        q-btn.q-mr-md(icon="close" flat v-close-popup)
    .row
      .col
        q-input.readonly(label="Зал" readonly=true borderless)
          template(#append)
            .data {{ row.room.name }}
    .row
      .col
        q-input.readonly(label="Дата" readonly borderless)
          template(#append)
            .data {{ date }}
    .row
      .col
        q-input.readonly(label="Время" readonly borderless)
          template(#append)
            .data {{ time }}
    .row
      .col
        q-input.readonly(label="Цель" readonly borderless)
          template(#append)
            .data {{ row.eventType }}
    .row
      .col
        q-input.readonly(label="Количество гостей" readonly borderless)
          template(#append)
            .data {{ row.seats }}
    .row.q-pb-lg
      .col
        q-input.readonly(label="Источник брони" readonly borderless)
          template(#append)
            .data {{  }}
    .row
      .col
        .text-h5.text-bold Данные клиента
    .row
      .col
        q-input.readonly(label="Имя" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.fullName }}
    .row
      .col
        q-input.readonly(label="Телефон" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.phone }}
    .row.q-pb-lg
      .col
        q-input.readonly(label="Эл. почта" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.email }}
    .row
      .col
        .text-h5.text-bold Оплата
    .row
      .col
        q-input.readonly(:label="bookingPerHour()" readonly borderless)
          template(#append)
            .data {{ money(row.amount*row.duration, true) }}
    .row(v-if="row.extras")
      .col
        div(v-for="(item, index) in row.extras.items" :key="index")
          q-input.readonly(v-if="item.count" :label="extrasWithCount(item)" readonly borderless)
            template(#append)
              .data {{ money(item.amount,true) }}
          q-input.readonly(v-else :label="item.title" readonly borderless)
            template(#append)
              .data {{ money(item.amount,true) }}
    .row.q-pb-lg
      .col
        q-input.readonly(v-if="row.prepayment" :label="prepaymentAmount()" readonly borderless)
          template(#append)
            .data {{ money(row.prepayment, true) }}
    .row.q-pb-lg
      .col
        q-input.readonly(label="Итого: " readonly borderless)
          template(#append)
            .data(v-if="row.extras") {{ money(Number(row.extras.total) + Number(row.prepayment), true) }}
    .row
      .col
        .text-h5.text-bold Комментарий
    .row.q-pb-md
      .col
        q-input.readonly(readonly borderless type="textarea")
          template(#append)
            .data {{ row.managerComment }}
    .row
      q-btn.q-mr-md(icon="close" outline v-close-popup)
      q-btn.q-mr-md(icon="delete" outline @click="deleteBooking(row.id)")
      q-btn.col-grow(
        label="Редактировать в календаре"
        color="primary"
        unelevated
        @click="$router.push({ path: 'calendar', query: { updateBookings: `${row.id}` } })"
      )
</template>
<script>
import { date } from 'quasar'
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    room: Object
  },
  computed: {
    date () {
      return date.formatDate(this.row.reservedFrom, 'D MMM YYYY')
    },
    time () {
      const time = [this.row.reservedFrom, this.row.reservedTo].map(
        part => date.formatDate(part, 'H:mm')
      ).join(' — ')
      return time
    },
  },
  methods: {
    money (val, sign = false) {
      const value = Number(val).toLocaleString('ru-RU', { minimumFractionDigits: 0 })
      return value + (sign ? ' ₽' : '')
    },
    bookingPerHour () {
      return `${this.row.duration} * ${this.row.amount}`
    },
    prepaymentAmount () {
      let isPrepayment = this.row.prepayment / this.row.amount * 100
      if (isPrepayment) {
        return `Предоплата: ${isPrepayment}%`
      }
      return `Предоплата:`
    },
    extrasWithCount (item) {
      return `${item.title} (${item.count} шт.)`
    },
    async deleteBooking (id) {
      await this.$app.bookings.deleteOne(id)
      this.$emit('closePopup', 'false')
    }
  }
}
</script>

<style lang="stylus">
  .data
    font-size: 1rem

  .readonly
    border-bottom #e5e5e5 solid 1px
</style>
