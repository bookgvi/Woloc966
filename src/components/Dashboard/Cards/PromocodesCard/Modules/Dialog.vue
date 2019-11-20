<template lang="pug">
  q-dialog(v-model="dialogState" persistent)
    q-card(style="min-width: 700px")
      q-card-section
        .row.items-center.q-py-md
          span.text-bold(
            style="line-height: 24px; font-size: 18px"
          ) Промокод № {{ newPromocode.id }}
          q-space
          q-btn(
            icon="close"
            flat
            round
            dense
            v-close-popup
          )
        .row.q-pb-md
          span.text-caption Название промокода
        .row.q-pb-md
          q-input.text-body2(
            outlined
            dense
            v-model="newPromocode.alias"
            style="width: 100%"
          )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Локация
            q-select.text-body2(
              outlined
              dense
              v-model="newStudio"
              :options="$app.studios.forOptions"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Зал
            q-select.text-body2(
              outlined
              dense
              multiple
              v-model="newPromocode.rooms"
              :options="allRooms"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Скидка, {{ unitSlot }}
            q-input.text-body2(
              outlined
              min="0"
              placeholder="0"
              dense
              @keydown="keyHandler($event)"
              type="number"
              v-model.number="newPromocode.discount"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Тип
            q-select.text-body2(
              outlined
              dense
              v-model="newPromocode.type"
              :options="allTypes"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Минимальная сумма заказа, p.
            q-input.text-body2(
              outlined
              min="0"
              placeholder="0"
              dense
              @keydown="keyHandler($event)"
              type="number"
              v-model.number="newPromocode.minPrice"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Статус
            q-select.text-body2(
              outlined
              dense
              v-model="newPromocode.isPublic"
              :options="allStatuses"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Период действия
            q-select.text-body2(
              outlined
              dense
              v-model="firstPeriod"
              style="width: 100%"
            )
              q-popup-proxy
                .row(style="max-width: 320px")
                  .col-12
                    date-range(
                      :sync-range.sync="firstRange"
                      lang="ru"
                    )
                  .q-pa-md.row.col-12.justify-between.items-center
                    .col-6.q-pr-sm
                      q-btn.fit(
                        size="13px"
                        label="Сбросить дату"
                        no-caps
                        @click="firstRange = {startDate: $moment(), endDate: $moment()}"
                      )
                    .col-6.q-pl-sm
                      q-btn.fit.bg-primary.text-white(
                        label="Применить"
                        size="13px"
                        no-caps
                        v-close-popup
                      )
          .col-6
            span.row.text-caption.q-pb-md Период действия
            q-select.text-body2(
              outlined
              dense
              v-model="secondPeriod"
              style="width: 100%"
            )
              q-popup-proxy
                .row(style="max-width: 320px")
                  .col-12
                    date-range(
                      :sync-range.sync="secondRange"
                      lang="ru"
                    )
                  .q-pa-md.row.col-12.justify-between.items-center
                    .col-6.q-pr-sm
                      q-btn.fit(
                        size="13px"
                        v-close-popup
                        label="Сбросить дату"
                        no-caps
                        @click="secondRange = {startDate: $moment(), endDate: $moment()}"
                      )
                    .col-6.q-pl-sm
                      q-btn.fit.bg-primary.text-white(
                        label="Применить"
                        size="13px"
                        no-caps
                        v-close-popup
                      )
        .row
          span.text-caption Заполните только дату начала, если срок действия должен быть неограничен.
      q-card-actions
        .row.col-12.justify-between.items-center
          .col-6.q-px-sm
            q-btn.fit(
              no-caps
              label="Отменить"
              v-close-popup
            )
          .col-6.q-px-sm
            q-btn.fit(
              no-caps
              v-close-popup
              color="primary"
              @click="applyPromocode"
              label="Сохранить"
            ) {{ dialogStateComp }}
</template>

<script>
import { DateRange } from 'vue-date-range'

export default {
  name: 'PromoDialog',
  components: { DateRange },
  data () {
    return {
      isCalendar1: false,
      isCalendar2: false,
      allTypes: [
        {
          value: 'percent',
          label: 'В процентах'
        },
        {
          value: 'rub',
          label: 'В рублях'
        },
      ],
      allStatuses: [
        {
          value: 0,
          label: 'Персональный'
        },
        {
          value: 1,
          label: 'Публичный'
        },
      ],
      dialogState: this.isPromoDialog,
      fieldPromocode: this.promocode,
      newStudio: null
    }
  },
  props: {
    isPromoDialog: Boolean,
    studio: Number,
    promocode: Object
  },
  computed: {
    unitSlot () {
      if (!this.fieldPromocode || !this.fieldPromocode.type || !this.fieldPromocode.type.value) return ''
      return (this.fieldPromocode.type.value === 'percent') ? '%' : ' р.'
    },
    firstRange: {
      get () {
        return {
          startDate: this.$moment(this.fieldPromocode.startedAt),
          endDate: this.$moment(this.fieldPromocode.expiredAt)
        }
      },
      set (v) {
        this.fieldPromocode.startedAt = v.startDate
        this.fieldPromocode.expiredAt = v.endDate
      }
    },
    secondRange: {
      get () {
        return {
          startDate: this.$moment(this.fieldPromocode.dateFrom),
          endDate: this.$moment(this.fieldPromocode.dateTo)
        }
      },
      set (v) {
        this.fieldPromocode.dateFrom = v.startDate
        this.fieldPromocode.dateTo = v.endDate
      }
    },
    firstPeriod: {
      get () {
        return this.fieldPromocode.startedAt.format('DD MMM YYYY') + ' — ' + this.fieldPromocode.expiredAt.format('DD MMM YYYY')
      }
    },
    secondPeriod: {
      get () {
        return this.fieldPromocode.dateFrom.format('DD MMM YYYY') + ' — ' + this.fieldPromocode.dateTo.format('DD MMM YYYY')
      }
    },
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    dialogStateComp () {
      return this.dialogStateChange()
    },
    allRooms () {
      const studio = (!this.newStudio || this.newStudio.value === 0) ? this.firstStudio : this.newStudio.value
      if (studio === 0) return []
      const rooms = this.$app.rooms.getAvailable({ studio: studio })
      if (!rooms) return []
      return rooms.map(({ id, name }) => {
        return {
          value: id,
          label: name
        }
      })
    },
    newPromocode: {
      get () {
        return this.fieldPromocode
      },
      set () {
        this.fieldPromocode = Object.assign({}, {
          ...this.fieldPromocode
        })
      }
    }
  },
  methods: {
    keyHandler (evt) {
      if (evt.key === '-' || evt.key === '+' || evt.key === 'e') {
        evt.preventDefault()
      }
      if (Number.isNaN(evt.key)) {
        evt.preventDefault()
      }
      if (Number(this.fieldPromocode.discount + evt.key) > 100 &&
        this.fieldPromocode.type.value === 'percent') {
        evt.preventDefault()
      }
    },
    async applyPromocode () {
      const id = this.fieldPromocode.id
      const params = {
        alias: this.fieldPromocode.alias,
        dateFrom: this.fieldPromocode.dateFrom.format('YYYY-MM-DD'),
        dateTo: this.fieldPromocode.dateTo.format('YYYY-MM-DD'),
        discount: this.fieldPromocode.discount,
        expiredAt: this.fieldPromocode.expiredAt.format('YYYY-MM-DD'),
        isPublic: this.fieldPromocode.isPublic.value,
        minPrice: this.fieldPromocode.minPrice,
        rooms: this.fieldPromocode.rooms.map(item => {
          return item.value
        }),
        startedAt: this.fieldPromocode.startedAt.format('YYYY-MM-DD'),
        type: this.fieldPromocode.type.value,
      }
      await this.$app.promocodes.updateOne(id, params)
      await this.$app.promocodes.getAll({ studio: this.studio })
    },
    resetRange (range) {
      range = {
        startDate: this.$moment,
        endDate: this.moment
      }
    },
    dialogStateChange () {
      this.$emit('dialogStateChange', this.dialogState)
    },
    entityLabelByValue (value, allEntities) {
      let label = 'Неизвестный тип'
      if (!allEntities) {
        return {
          value: 'Неизвестное значение',
          label
        }
      }
      for (let i = 0; i < allEntities.length; i++) {
        const item = allEntities[i]
        if (value === item.value) {
          label = item.label
          break
        }
      }
      return {
        value,
        label
      }
    },
  },
  watch: {
    unitSlot (v, old) {
      if (v === '%' && old !== '') {
        this.fieldPromocode.discount = 0
      }
    },
    isPromoDialog (v) {
      this.dialogState = v
    },
    studio: {
      handler (v) {
        const studio = this.$app.studios.list.find(item => item.id === v)
        const label = (!studio || !studio.name) ? 'Неопознанная локация' : studio.name
        this.newStudio = Object.assign({}, { value: v, label })
      },
      immediate: true
    },
    promocode: {
      handler (v) {
        // console.log(v)
        if (!v) return {}
        let rooms = []
        if (v.rooms) {
          rooms = v.rooms.map(item => {
            return {
              value: item.id,
              label: item.name,
            }
          })
        }
        this.fieldPromocode = Object.assign({}, {
          alias: v.alias,
          id: v.id,
          discount: v.discount,
          type: this.entityLabelByValue(v.type, this.allTypes),
          minPrice: v.minPrice,
          isPublic: this.entityLabelByValue(v.isPublic, this.allStatuses),
          rooms: rooms,
          dateFrom: this.$moment(v.dateFrom),
          dateTo: this.$moment(v.dateTo),
          startedAt: this.$moment(v.startedAt),
          expiredAt: this.$moment(v.expiredAt),
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
