<template lang="pug">
  q-card-section
    q-calendar.bg-white(
      :interval-start="intervalStartCalendar"
      :interval-count="intervalCountCalendar"
      v-model="selectedDate"
      locale="ru-ru"
      no-scroll
      hide-header
      hour24-format
      view="day"
    )
      template(#day-body="{ date, timeStartPos, timeDurationHeight }")
        timeline(
          :timeStartPos="timeStartPos"
          :timeDurationHeight="timeDurationHeight"
          :isAllDay ="isAllDay"
        )
        q-badge.absolute-top.block.q-pa-none(
          multi-line
          v-for="(e, index) in events"
          :value="e"
          :key="index"
          :style="badgeStyles(e, 'body', timeStartPos, timeDurationHeight)"
        )
          q-tooltip(
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          )
            .row.col-12.items-center.q-pb-xs
              .col-2
                q-icon(
                  :style="{color: e.roomColorSlot}"
                  name="fas fa-circle"
                )
              .col
                span.row.text-body2 {{ e.roomNameSlot }}
            span.row.text-body2.q-pb-xs {{ e.fullNameSlot }}
            span.row.text-body2.q-pb-xs {{ e.phoneSlot }}
            span.row.text-body2.q-pb-xs {{ e.eventSlot }}
            span.row.text-body2.q-pb-xs {{ e.priceSlot }}
          .row.col-12.justify-start.q-pl-xs
            .q-pa-none.col-1.offset-4(
              v-if="e.isNotFullVisible"
              :style="arrowUpStyles(e)"
            )
            .q-pa-none.col-1(
              v-if="e.isExtras && !e.technical"
              :style="triangleStyles(e)"
            )

</template>

<script>
import Timeline from 'src/components/Calendar/Sheet/Modules/Timeline'
import { colors } from 'quasar'
import { formatPrice, getDate, getTime, getColor, setIcon } from 'src/utils/helpersForCalendar'

export default {
  name: 'Calendar',
  components: { Timeline },
  data () {
    return {
      events: [],
    }
  },
  computed: {
    intervalStartCalendar () {
      return this.isAllDay ? 0 : 8
    },
    intervalCountCalendar () {
      return this.isAllDay ? 24 : 16
    },
    selectedDate () {
      if (!this.startDate) return this.$moment().format('YYYY-MM-DD')
      return this.$moment(this.startDate).format('YYYY-MM-DD')
    },
    rooms () {
      return this.$app.rooms.getAvailable({ studio: this.studio }).map(item => item.id)
    }
  },
  props: {
    startDate: Object,
    bookings: Array,
    isAllDay: Boolean,
    studio: Number
  },
  methods: {
    triangleStyles (event) {
      let s = {
        'width': '0',
        'height': '0',
        'border-top': `10px solid ${colors.lighten(event.bgcolor, -30)}`,
        'border-left': '10px solid transparent',
        'margin': '0 0 0 auto'
      }
      return s
    },
    arrowUpStyles (event) {
      let s = {
        'width': '0',
        'height': '0',
        'border-left': '5px solid transparent',
        'border-right': '5px solid transparent',
        'border-bottom': `10px solid ${colors.lighten(event.bgcolor, -30)}`
      }
      return s
    },
    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      let s = {
        'box-shadow': `inset 3px -3px 0 ${event.bgcolor}`,
        'font-size': '13px',
        'background-color': `${event.bgcolor}40`,
        'color': colors.lighten(event.bgcolor, -30),
        'align-items': 'flex-start'
      }
      if (timeStartPos) {
        s = Object.assign({}, s, {
          'top': timeStartPos(event.time) + 'px',
          'width': `${100 / event.countInRow}%`,
          'left': `${100 / event.countInRow * (event.posx)}%`
        })
      }
      if (timeDurationHeight) {
        s = Object.assign({}, s, { 'height': timeDurationHeight(event.duration) + 'px' })
      }
      return s
    },
    setOrder (roomId) {
      const order = this.rooms.findIndex(item => item === roomId)
      return order
    },
    async loadData () {
      if (this.studio === 0) return
      const filter = {
        studio: this.studio,
      }
      await this.$app.bookings.getForCalendar({
        ...filter,
        dateFrom: this.selectedDate,
        dateTo: this.selectedDate
      })
    },
  },
  watch: {
    async isAllDay () {
      await this.loadData()
    },
    async selectedDate () {
      await this.loadData()
    },
    studio: {
      async handler (v) {
        if (v !== 0) {
          await this.loadData()
        }
      },
      immediate: true
    },
    bookings: {
      handler (v) {
        // console.log('watch bookings', v)
        this.events = []
        let bookings = []
        this.$nextTick(function () {
          v.map((booking) => {
            if (this.$moment(this.selectedDate).parseZone().isSame(booking.reservedFrom, 'day')) {
              const from = this.$moment(booking.reservedFrom).parseZone()
              const to = this.$moment(booking.reservedTo).parseZone()
              let isNotFullVisible = false
              if (!this.isAllDay) {
                if (from.hour() < 8) {
                  from.hour(8)
                  isNotFullVisible = true
                }
                if (to.hour() < 8 && to.hour() > 0) {
                  to.hour(8)
                }
              }
              const diff = to.diff(from, 'minutes')
              const slot = {
                fullName: 'техническая бронь',
                phone: '',
                eventSlot: '',
                priceSlot: ''
              }
              if (!booking.technical) {
                slot.fullName = (booking.customer && booking.customer.fullName)
                  ? booking.customer.fullName : ''
                slot.phone = (booking.customer && booking.customer.phone)
                  ? '+' + booking.customer.phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1 $2-$3-$4') : ''
                slot.event = (booking.eventType) ? booking.eventType : ''
                slot.price = (booking.amount && booking.price)
                  ? `${formatPrice(booking.amount)} • ${formatPrice(booking.price)}` : ''
              } else {
                slot.fullName = (booking.managerComment)
                  ? booking.managerComment : 'техническая бронь'
              }
              let isExtras = false
              if (booking.extras && booking.extras.length > 0) {
                isExtras = booking.extras.some(item => {
                  return (item.count > 0)
                })
              }
              const event = {
                id: booking.id,
                isNotFullVisible,
                isExtras: isExtras,
                technical: booking.technical,
                roomNameSlot: 'Зал ' + booking.room.name,
                roomColorSlot: '#' + ((1 << 24) * Math.random() | 0).toString(16),
                fullNameSlot: slot.fullName,
                phoneSlot: slot.phone,
                eventSlot: slot.event,
                priceSlot: slot.price,
                date: getDate(from),
                time: getTime(from),
                duration: diff,
                bgcolor: getColor(booking),
                icon: setIcon(booking.eventType),
                devInfo: {
                  time: {
                    from: +getTime(from, 'HH'),
                    to: +getTime(to, 'H') !== 0 ? +getTime(to, 'H') : 24
                  },
                  room: booking.room.name
                },
                posx: this.setOrder(booking.room.id),
                countInRow: this.rooms.length
              }
              bookings.push(event)
            }
          })
          this.events = bookings
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
