<template lang="pug">
  .promo.q-pa-lg
    .row.q-pb-sm
      .col
        .text-h5 Скидка № {{ row.id }}
      .col-1
        q-icon.cursor-pointer(name="close" v-close-popup style="font-size: 1.5rem;")
    .row
      .col.q-pr-sm
        span Локация
      .col
        span Зал
        span.text-red &nbsp*
    .row.q-pb-md(:key="modalKey")
      .col.q-pr-sm
        q-select(v-model="singleStudioName" :options="allStudiosName" @input="getRooms(singleStudioName)" outlined dense)
      .col
        q-select(
          v-model="roomName"
          :options="roomsOptions.map(item => item.name) || []"
          :rules="[val => !!val || 'Поле обязательно для заполнения']"
          outlined
          dense
        )
    .row
      .col.q-pr-sm
        span Процент скидки
        span.text-red &nbsp*
      .col
        span Минимальное кол-во часов
        span.text-red &nbsp*
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="row.percent" mask="###" :rules="[val => !!val || 'Поле обязательно для заполнения']" outlined dense)
          template(#append)
            span(style="font-size: 75%") %
      .col
        q-input(v-model="row.minHours" mask="##" :rules="[val => !!val || 'Поле обязательно для заполнения']" outlined dense)
    .row
      span День недели
      span.text-red &nbsp*
    .row.q-pb-sm(v-if="!row.id")
      .col.q-pr-sm
        .row
          q-checkbox(label="Понедельник" v-model="daysOfWeek[0]")
        .row
          q-checkbox(label="Вторник" v-model="daysOfWeek[1]")
        .row
          q-checkbox(label="Среда" v-model="daysOfWeek[2]")
        .row
          q-checkbox(label="Четверг" v-model="daysOfWeek[3]")
      .col
        .row
          q-checkbox(label="Пятница" v-model="daysOfWeek[4]")
        .row
          q-checkbox(label="Суббота" v-model="daysOfWeek[5]")
        .row
          q-checkbox(label="Воскресенье" v-model="daysOfWeek[6]")
    .row.q-pb-sm(v-if="row.id")
      .col.q-pr-sm
        .row
          q-option-group(label="Понедельник" v-model="currentDayOfWeek" :options="daysOfWeekRadio")
    .row
      .col.q-pr-sm
        span Период действия
        span.text-red &nbsp*
      .col
        span Время действия
        span.text-red &nbsp*
    .row
      .col.q-pr-sm
        VueCtkDateTimePicker.q-pt-sm(
          v-model="dateRange"
          color="#81AEB6"
          formatted="D MMMM Y"
          range
          no-shortcuts
          no-label
          :label="dateLabel"
        )
      .col
        q-input.q-pt-sm.q-pb-md.cursor-pointer(
          :value="`${rangeTime.min}:00 — ${rangeTime.max}:00`"
          @click="isTimeRange = !isTimeRange"
          @keydown.enter="timeRangeSave"
          outlined
          dense
        )
        .timeRange(v-if="isTimeRange" style="width: 100%;")
          q-range(
            v-model="rangeTime"
            :min="0"
            :max="23"
            :step="1"
            drag-range
            :left-label-value="rangeTime.min + ':00'"
            :right-label-value="rangeTime.max + ':00'"
            label-always
            markers
            snap
            color="#81AEB6"
          )
          .row
            .col.q-pr-sm
              q-btn.bg-primary.text-white(label="Сохранить" style="width: 100%" @click="timeRangeSave")
            .col
              q-btn(label="Сбросить" style="width: 100%" @click="timeRangeReset")
    .row.q-pb-md
      .col
        span(style="font-weight: bold;") Заполните только дату начала, если срок действия должен быть неограничен.
    .row.q-pb-md
      q-checkbox(v-if="isActive" label="Скидка активна" v-model="isActive")
      q-checkbox(v-else label="Скидка не активна" v-model="isActive")
    .row.justify-center
      .col.q-mr-sm(v-if="!row.new")
        q-btn.q-py-md(label="Удалить" no-caps style="width: 100%" @click="discountDelete" :disable="row.new")
      .col
        q-btn.q-py-md.bg-primary.text-white(label="Сохранить" no-caps style="width: 100%" @click="createUpdate" :disable="isDisabled")
</template>

<script>
import { date } from 'quasar'
import { DateRange } from 'vue-date-range'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import studios from '../../../../api/studios'
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
    VueCtkDateTimePicker,
    date
  },
  data () {
    return {
      modalKey: 0,
      currentDayOfWeek: this.row.daysOfWeek,
      singleStudioName: this.singleStudio.name,
      roomName: '',
      roomsOptions: this.rooms,
      isActive: true,
      daysOfWeekRadio: [
        { label: 'Понедельник', value: 1 },
        { label: 'Вторник', value: 2 },
        { label: 'Среда', value: 3 },
        { label: 'Четверг', value: 4 },
        { label: 'Пятница', value: 5 },
        { label: 'Суббота', value: 6 },
        { label: 'Воскресенье', value: 7 }
      ],
      daysOfWeek: [false, false, false, false, false, false, false],
      dateRange: '',
      dateLabel: '',
      isTimeRange: false,
      rangeTime: {
        min: '',
        max: ''
      }
    }
  },
  computed: {
    isDisabled () {
      let isDisabled = true
      let value
      const typeDayOfWeek = typeof this.currentDayOfWeek
      let daysOfWeek = this.daysOfWeek.reduce((prev, current) => {
        return prev || current
      }, false)
      value = (typeDayOfWeek === 'number') || daysOfWeek
      if (
        this.roomName &&
        this.row.percent &&
        this.row.minHours &&
        value &&
        this.row.startedAt &&
        this.rangeTime
      ) {
        isDisabled = false
      }
      return isDisabled
    }
  },
  async created () {
    await this.$nextTick()
    this.currentDayOfWeek = this.row.daysOfWeek
    if (this.row.studio) {
      this.isActive = Boolean(this.row.isActive)
      this.singleStudioName = this.row.studio.title
    } else {
      const { items } = await studios.getAll().then(resp => resp.data)
      let { studio } = this.$app.filters.getValues('settings')
      const [{ name }] = items.filter(item => item.id === studio)
      this.singleStudioName = name
    }
    if (this.row.room) {
      this.roomName = this.row.room.title
    } else {
      this.getRooms(this.singleStudioName)
    }
    this.dateRange = {
      'start': date.formatDate(this.row.startedAt, 'YYYY-MM-DD'),
      'end': date.formatDate(this.row.expiredAt, 'YYYY-MM-DD')
    }
    this.dateLabel = `${date.formatDate(this.row.startedAt, 'D MMM')} — ${date.formatDate(this.row.expiredAt, 'D MMM YYYY')}`
    this.rangeTime.min = this.row.hourFrom
    this.rangeTime.max = this.row.hourTo
  },
  methods: {
    hasModal () {
      this.$emit('hasModal')
    },
    async getRooms (studioName) {
      const { items } = await studios.getAll().then(resp => resp.data)
      const studio = items.filter(item => item.name === studioName).pop()
      this.roomName = ''
      this.roomsOptions = []
      if (studio.rooms[0]) {
        this.roomName = studio.rooms[0].name
        this.roomId = studio.rooms[0].id
        this.roomsOptions = studio.rooms
      }
      this.modalKey++
    },
    timeRangeReset () {
      this.isTimeRange = false
      this.rangeTime.min = this.row.hourFrom
      this.rangeTime.max = this.row.hourTo
    },
    timeRangeSave () {
      this.isTimeRange = false
      this.row.hourFrom = this.rangeTime.min
      this.row.hourTo = this.rangeTime.max
    },
    createUpdate () {
      if (this.dateRange.start) {
        this.dateRange.start = this.dateRange.start.split(' ')[0]
      }
      if (this.dateRange.end) {
        this.dateRange.end = this.dateRange.end.split(' ')[0]
      }
      const [{ id }] = this.roomsOptions.filter(item => item.name === this.roomName)
      let value = typeof this.currentDayOfWeek
      if (value === 'number') {
        value = this.currentDayOfWeek
      } else {
        value = this.daysOfWeek
      }
      const newDiscount = {
        'room': id,
        'isActive': Number(this.isActive),
        'percent': this.row.percent,
        'minHours': this.row.minHours,
        'daysOfWeek': value,
        'startedAt': this.dateRange.start,
        'expiredAt': this.dateRange.end || null,
        'hourFrom': this.row.hourFrom,
        'hourTo': this.row.hourTo
      }
      this.$emit('createUpdate', this.row.id, newDiscount)
    },
    discountDelete () {
      this.$emit('discountDelete', this.row.id)
    }
  }
}
</script>
