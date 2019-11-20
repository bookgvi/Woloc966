<template lang="pug">
  .modalCustomer.q-pa-lg
    .row
      .col
        .text-h6.text-bold Личные данные
      .col-1
        q-btn.q-mr-md(icon="close" flat v-close-popup)
    .row
      .col
        q-input.readonly(label="Имя" readonly=true borderless)
          template(#append)
            .data {{ row.fullName }}
    .row
      .col
        q-input.readonly(label="Дата рождения" readonly borderless)
          template(#append)
            .data {{ row.birthday }}
    .row
      .col
        q-input.readonly(label="Телефон" readonly borderless)
          template(#append)
            .data {{ row.phone }}
    .row
      .col
        q-input.readonly(label="Эл. почта" readonly borderless)
          template(#append)
            .data {{ row.email }}
    .row.q-pb-md
      .col
        q-input.readonly(label="Скидка" readonly borderless)
          template(#append)
            .data {{ row.discount }}%
    .row.q-pb-sm
      .col
        .text-h6.text-bold История бронирований
    .row.q-py-sm.readonly
      .col
        .data Всего
      .col
        .row.justify-center
          .data Завершено
      .col
        .row.justify-end
          .data Отменено
    .row.q-py-sm.readonly
      .col
        .data {{ row.bookings.count.total }}
      .col
        .row.justify-center
          .data {{ row.bookings.count.done }}
      .col
        .row.justify-end
          .data {{ row.bookings.count.cancelled }}
    .row.q-py-md
      .col
        .text-h6.text-bold Бронирования
    .row.readonly.q-pb-sm(v-for="(item, index) in row.bookings.items" :key="index")
      .row.items-center
        .data {{ formatDate(item.reservedFrom) }}
        q-chip(v-if="item.room.color" :style="getRoomStyle(item.room)")
          .data {{ item.room.name }}
      q-space
      .row.items-center
          .row
            .data {{ item.duration }} ч. * {{ money(item.price, true) }}
    .row.q-py-md
      span.cursor-pointer.data.text-primary(
        v-if="row.bookings.items.length"
        @click="$router.push({ path: 'bookings', query: { customer: `${row.id}` } })"
      ) Посмотреть все в таблице
    .row.q-pb-sm
      .col
        .text-h6.text-bold Рейтинг &nbsp;
          i.text-primary(v-for="(item, i) in 5" class="fa-star" :class="i < row.rating ? 'fas' : 'far' ")
    .row
      .col
        .data Оставьте комментарий о пользователе
    // ---- TODO ---- решение будет принято впоследствии!!!
    // .row.q-py-sm
    //  .col.q-mr-md
    //    q-btn.bg-primary.text-white(label="Редактировать" no-caps style="width: 100%;")
    //  .col
    //    q-btn.bg-primary.text-white(label="Открыть чат" no-caps style="width: 100%;")
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'CustomersDialog',
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    readonly: Boolean
  },
  methods: {
    formatDate (value) {
      return date.formatDate(value, 'D MMM YYYY')
    },
    money (val, sign = false) {
      const value = Number(val).toLocaleString('ru-RU', { minimumFractionDigits: 0 })
      return value + (sign ? ' ₽' : '')
    },
    getRoomStyle ({ color }) {
      return {
        height: '80%',
        color: this.hexTOrgb(color, 1),
        backgroundColor: this.hexTOrgb(color, 30),
        whiteSpace: 'normal',
        overflow: 'hidden'
      }
    },
    hexTOrgb (color, opacity) {
      if (color[0] === '#') {
        color = color.slice(1, color.length)
      }
      const r = parseInt(color.slice(0, 2), 16)
      const g = parseInt(color.slice(2, 4), 16)
      const b = parseInt(color.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity > 1 ? opacity / 100 : opacity})`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .data
    font-size: 1rem

  .readonly
    border-bottom #e5e5e5 solid 1px
</style>
