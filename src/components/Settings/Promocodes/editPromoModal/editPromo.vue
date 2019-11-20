<template lang="pug">
  .promo
    RowDialog(v-bind="$props")
      .row
        .col
          span Название промокода
      .row.q-pb-md
        .col
          q-input(v-model="row.alias" outlined dense)
      .row
        .col.q-pr-sm
          span Локация
        .col
          span Зал
      .row.q-pb-md
        .col.q-pr-sm
          q-select(v-model="singleStudio.name" :options="allStudiosName" outlined dense)
        .col
          q-select(v-model="row.alias" :options="rooms.map(item => item.name)" outlined dense)
      .row
        .col.q-pr-sm
          span Скидка
        .col
          span Тип
      .row.q-pb-md
        .col.q-pr-sm
          q-input(v-model="row.discount" outlined dense)
        .col
          q-select(v-model="type" :options="typeArr" outlined dense)
      .row
        .col.q-pr-sm
          span Минимальная сумма заказа, ₽.
        .col
          span Статус
      .row.q-pb-md
        .col.q-pr-sm
          q-input(v-model="row.minPrice" outlined dense)
        .col
          q-select(v-model="row.isPublic" :options="statusArr" outlined dense)
      .row
        .col.q-pr-sm
          span Период действия
        .col
          span Период действия
      .row.q-pb-md
        .col.q-pr-sm
          q-input(:value="currentRange1" outlined dense @click="isCalendar1= !isCalendar1")
          .col(v-if="isCalendar1")
            DateRange(
              :sync-range.sync="range1"
              :lang="lang"
            )
            .row
              .col
                q-btn(label="Сбросить дату" no-caps @click="resetRange(range1)")
              .col
                q-btn.bg-primary.text-white(label="Применить" no-caps @click="applyRange(range1)")
        .col
          q-input(:value="currentRange2" outlined dense @click="isCalendar2= !isCalendar2")
          .col(v-if="isCalendar2")
            DateRange(
              :sync-range.sync="range2"
              :lang="lang"
            )
            .row
              .col
                q-btn(label="Сбросить дату" no-caps @click="resetRange(this.range2)")
              .col
                q-btn.bg-primary.text-white(label="Применить" no-caps @click="applyRange(range2)")

      .row.q-pb-md
        .col-4
          span Заполните только дату начала, если срок действия должен быть неограничен.
      .row.justify-center
        .col.q-mr-sm
          q-btn.q-py-md(label="Удалить" no-caps style="width: 100%")
        .col
          q-btn.q-py-md.bg-primary.text-white(label="Сохранить" no-caps style="width: 100%")
</template>

<script>
import { date } from 'quasar'
import { DateRange } from 'vue-date-range'
export default {
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    allStudiosName: Array,
    rooms: Array,
    singleStudio: Object
  },
  components: {
    DateRange,
    date
  },
  data () {
    return {
      isPublic: 'Публичный',
      statusArr: ['Публичный', 'Персональный'],
      type: 'В рублях',
      typeArr: ['В рублях', 'В процентах'],
      isCalendar1: false,
      isCalendar2: false,
      lang: 'ru',
      range1: {
        startDate: this.$moment(),
        endDate: this.$moment()
      },
      range2: {
        startDate: this.$moment(),
        endDate: this.$moment()
      }
    }
  },
  computed: {
    currentRange1: {
      get () {
        return `${this.range1.startDate.format('D MMM')} — ${this.range1.endDate.format('D MMM')}`
      }
    },
    currentRange2: {
      get () {
        return `${this.range2.startDate.format('D MMM')} — ${this.range2.endDate.format('D MMM')}`
      }
    }
  },
  methods: {
    resetRange (range) {
      range.startDate = this.$moment(Date.now())
      range.endDate = this.$moment()
    },
    applyRange (range) {
      range === this.range1 ? this.isCalendar1 = false : this.isCalendar2 = false
    }
  }
}
</script>

<style scoped>
</style>
