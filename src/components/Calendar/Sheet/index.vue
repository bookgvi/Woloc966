<template lang="pug">
  .q-pa-none(
    @mouseup="mouseUp"
    @mousemove="resizerMouseMove"
  )
    .row.justify-start.items-center.q-px-none.no-wrap
      .justify-start.items-center
        h6.wrap-md.text-weight-bold {{ selectedStudioLabel }}, {{ month }}
      q-space
      .justify-end.items-center
        .row.justify-end.q-px-none.q-gutter-sm
          q-btn.q-px-sm(
            icon="calendar_today"
            outline
            color="secondary"
          )
            q-popup-proxy
              q-card
                q-date(
                  full-width
                  v-model="selectedDate"
                  minimal
                  mask="YYYY-MM-DD"
                )
          q-btn(
            outline
            label="Сегодня"
            no-caps
            @click="calendarToday"
            color="secondary"
          )
          q-btn-group(outline)
            q-btn.q-px-sm(
              outline
              icon="chevron_left"
              @click="calendarPrev"
              color="secondary"
             )
            q-separator(vertical inset)
            q-btn.q-px-sm(
              outline
              icon="chevron_right"
              @click="calendarNext"
              color="secondary"
             )
    template(
      style="width: 100%"
    )
      first-column(
        :isAllDay ="isAllDay"
        @allDayChange="isAllDay=$event"
      )
      q-calendar.bg-white.row.col-12(
        style="width: 100%; padding-left: 68px"
        ref="calendar"
        :weekdays=[1, 2, 3, 4, 5, 6, 0]
        :interval-start="intervalStartCalendar"
        :interval-count="intervalCountCalendar"
        v-model="selectedDate"
        view="week"
        locale="ru-ru"
        no-scroll
        hour24-format
        short-weekday-label
        column-header-before
        no-default-header-btn
        no-default-header-text
      )
        template.row(#interval="{ time, date }")
          q-badge(
            @click="initNewBookingRange(time, date)"
            v-if="isNewBookingRange(time, date)"
            style="width: 100%; height: 100%; background-color: #aaa"
          )
          .interval-hover(
            @click="initNewBookingRange(time, date)"
            @mousedown="intervalMouseDown(time, date)"
            @mousemove="intervalMouseMove(time, date)"
          )
            q-popup-proxy.absolute(
              :value="isPopupForNewBookingCell(time, date)"
              no-parent-event
              persistent
              style="margin-left: 75px; min-width: 70px; opacity:1"
              anchor="center right"
              self="center left"
            )
              .row
                .col-12.text-center.q-py-xs
                  span.text-body2 от {{ forNewBooking.from + ":00" }}
                .col-12.text-center
                  span.text-body2 до {{ forNewBooking.to + 1 + ":00" }}
                .row.col-12.justify-between.q-py-md
                  .col-6.q-px-xs
                    q-btn.fit(
                      icon="fa fa-check"
                      color="positive"
                    )
                      booking-type-menu.fit(
                        @fastClick="setNewTechnical(date)"
                        @commonClick="setNewBooking(date, time)"
                      )
                  .col-6.q-px-xs
                    q-btn.fit(
                      icon="fa fa-ban"
                      color="negative"
                      v-close-popup
                      @click="closePopupForNewBooking()"
                    )
        template(#day-header="{ date }")
          .row.justify-left.q-px-md.q-py-md(
            :style="dayHeaderStyle(date)"
          )
            span.ellipsis.text-uppercase.text-body2.text-weight-bold {{ dayHeader(date) }}
        template(#day-body="{ date, timeStartPos, timeDurationHeight }")
          timeline(
            :timeStartPos="timeStartPos"
            :timeDurationHeight="timeDurationHeight"
            :isAllDay ="isAllDay"
          )
          template(
            v-for="(item, index) in events"
            v-if="item.date === date"
          )
            q-badge.absolute-top.block.q-pa-none(
              multi-line
              style="resize: horizontal"
              :value="item"
              :key="index"
              :style="badgeStyles(item, 'body', timeStartPos, timeDurationHeight)"
            )
              .row.col-12.justify-start.q-pl-xs
                q-icon.col-1.row.justify-start(v-if="!item.technical && item.icon", :name="item.icon")
                .q-pa-none.col-1.offset-4(
                  v-if="item.isNotFullVisible"
                  :style="arrowUpStyles(item)"
                )
                .q-pa-none.col-1(
                  v-if="item.isExtras && !item.technical"
                  :style="triangleStyles(item)"
                )
                .row.col-12(v-if="!item.technical")
                  .row.col-12
                    span.text-booking.wrap {{ item.title }}
                  .row.col-12
                    span.text-booking.wrap {{ item.details }}
                  .row.col-12
                    span.text-booking.ellipsis {{ item.managerComment }}
                  .row.col-12
                    span.text-booking.ellipsis {{ item.customerComment }}
                .row.col-12(v-else)
                  span.row.col-12.text-booking.wrap {{ item.managerComment }}
            q-badge.resizer.absolute(
              :class="{ 'is-resize': item.isResize }"
              :style="badgeStyles(item, 'body', timeStartPos, timeDurationHeight)"
              @mousedown="resizerMouseDown(item, index, $event)"
            )
              q-popup-proxy.absolute(
                no-parent-event
                persistent
                style="margin-left: 75px; min-width: 70px; opacity:1"
                v-model="item.isResize"
                anchor="center right"
                self="center left"
              )
                .row
                  .col-12.text-center.q-py-xs
                    span.text-body2 от {{ fromInProcessResize + ":00" }}
                  .col-12.text-center
                    span.text-body2 до {{ toInProcessResize + ":00" }}
                  .row.col-12.justify-between.q-py-md
                    .col-6.q-px-xs
                      q-btn.fit(
                        icon="fa fa-check"
                        color="positive"
                        @click="acceptResize(item)"
                      )
                    .col-6.q-px-xs
                      q-btn.fit(
                        icon="fa fa-ban"
                        color="negative"
                        @click="closePopupResize(item)"
                      )
          .q-badge.absolute.block.q-pa-none(
            :style="createAvailaibleZone(timeStartPos, timeDurationHeight)"
            v-if="borders.date === date && isResizeNow"
          )
      update-event-dialog(
        :isCreate="isCreate"
        :dialogState="dialogState"
        :filter="filter"
        :booking="selectedBooking"
        @setQueryState="setQueryState($event)"
      )
      new-technical-dialog(
        :dialogState="technicalDialogState"
        :filter="filter"
        :booking="selectedBooking"
        @setQueryState="setTechnicalQueryState($event)"
      )
 </template>

<script>
import { colors, dom, date } from 'quasar'
import { EVENT_TYPES } from 'src/common/constants'
import roomsColors from 'src/common/rooms/colors'
import UpdateEventDialog from './Popups/UpdateEventDialog'
import FirstColumn from './Modules/FirstColumn'
import Timeline from './Modules/Timeline'
import BookingTypeMenu from './Popups/BookingTypeMenu'
import NewTechnicalDialog from './Popups/NewTechnicalDialog'

const { height, css, style } = dom

const usedColors = {}

export default {
  name: 'CalendarSheet',
  components: { NewTechnicalDialog, BookingTypeMenu, FirstColumn, UpdateEventDialog, Timeline },
  props: {
    filter: Object,
    bookings: Array
  },
  data () {
    return {
      range: {
        from: '2019-05-01',
        to: '2020-01-01'
      },
      borders: {
        top: 0,
        height: 0,
        from: 0,
        to: 24,
        date: ''
      },
      forNewBooking: {
        from: 0,
        to: 0,
        date: '',
        isResizeNow: false,
      },
      fromInProcessResize: 0,
      toInProcessResize: 0,
      indexResize: -1,
      isResizeStopped: false,
      isResizeNow: false,
      target: {},
      targetStartParams: {},
      top: 0,
      mouseStart: 0,
      height: 0,
      up: false,
      isCreate: true,
      calendarKey: 0,
      isAllDay: false,
      events: [],
      selectedDate: '',
      dialogState: false,
      technicalDialogState: false,
      selectedBooking: {},
    }
  },
  created: async function () {
    if (this.$route.query.updateBookings) {
      this.findBooking(null, this.$route.query.updateBookings)
    }
    this.setWeekRange()
    this.calendarToday()
  },
  computed: {
    duration () {
      return this.forNewBooking.to - this.forNewBooking.from
    },
    intervalStartCalendar () {
      return this.isAllDay ? 0 : 8
    },
    intervalCountCalendar () {
      return this.isAllDay ? 24 : 16
    },
    selectedStudioLabel () {
      return this.studio ? this.studio.name : 'Локация не выбрана'
    },
    studio () {
      return this.$app.studios.getFiltered(this.filter)
    },
    month () {
      return this.$moment(this.selectedDate).format('MMMM YYYY')
    },
    rooms () {
      return this.$app.rooms.getFiltered(this.filter)
    }
  },
  methods: {
    setWeekRange () {
      const currentDate = new Date()
      const fromMonday = currentDate.getDay() - 1
      const toSunday = 7 - currentDate.getDay()
      const currentDateMS = +currentDate
      const fromMondayMS = currentDateMS - 24 * fromMonday * 1000 * 3600
      const toSundayMS = currentDateMS + 24 * toSunday * 1000 * 3600
      this.range.from = date.formatDate(new Date(fromMondayMS), 'YYYY-MM-DD')
      this.range.to = date.formatDate(new Date(toSundayMS), 'YYYY-MM-DD')
    },
    closePopupForNewBooking () {
      this.forNewBooking.date = ''
      this.forNewBooking.from = 0
      this.forNewBooking.to = 0
    },
    isPopupForNewBookingCell (time, date) {
      if (date !== this.forNewBooking.date) return false
      const interval = +time.slice(0, 2)
      return (interval === this.forNewBooking.to)
    },
    intervalMouseDown (time, date) {
      if (this.isResizeNow) return
      this.forNewBooking.isResizeNow = true
      const interval = +time.slice(0, 2)
      if (this.forNewBooking.date !== date) {
        this.forNewBooking.date = date
        this.forNewBooking.from = interval
        this.forNewBooking.to = interval
      }
    },
    intervalMouseMove (time) {
      if (this.isResizeNow) return
      if (!this.forNewBooking.isResizeNow) return
      const interval = +time.slice(0, 2)
      if (interval < this.forNewBooking.from) {
        this.forNewBooking.from = interval
      } else if (interval > this.forNewBooking.to) {
        this.forNewBooking.to = interval
      }
    },
    initNewBookingRange (time, date) {
      if (this.isResizeNow) return
      const interval = +time.slice(0, 2)
      if (this.forNewBooking.date !== date) {
        this.forNewBooking.date = date
        this.forNewBooking.from = interval
        this.forNewBooking.to = interval
        return
      }
      if (this.forNewBooking.from === 0 && this.forNewBooking.to === 0) {
        this.forNewBooking.from = interval
        this.forNewBooking.to = interval
        return
      }
      if (interval >= this.forNewBooking.from && interval <= this.forNewBooking.to) {
        this.forNewBooking.from = interval
        this.forNewBooking.to = interval
        return
      }
      if (interval < this.forNewBooking.from) {
        this.forNewBooking.from = interval
      } else if (interval > this.forNewBooking.to) {
        this.forNewBooking.to = interval
      }
    },
    isNewBookingRange (time, date) {
      if (date !== this.forNewBooking.date) return false
      const interval = +time.slice(0, 2)
      return interval >= this.forNewBooking.from && interval <= this.forNewBooking.to
    },
    closePopupResize (item) {
      css(this.target, {
        top: this.targetStartParams.top + 'px',
        height: this.targetStartParams.height + 'px',
      })
      this.isResizeNow = false
      item.isResize = false
      this.indexResize = -1
    },
    async acceptResize (item) {
      const booking = this.bookings.find(booking => booking.id === item.id)
      const from = this.$moment(booking.reservedFrom).hour(this.fromInProcessResize).format('YYYY-MM-DDTHH:mm:ss+03:00')
      const to = this.$moment(booking.reservedFrom).hour(this.toInProcessResize).format('YYYY-MM-DDTHH:mm:ss+03:00')
      if (!booking) return
      const newBooking = Object.assign({}, {
        roomId: booking.room.id,
        reserveFrom: from,
        reserveTo: to,
        priceType: booking.eventType,
        extras: booking.extras,
        members: [...booking.members],
        description: booking.managerComment || '',
        technical: booking.technical,
      })
      if (newBooking) {
        const id = booking.id
        await this.$app.bookings.updateOne(id, newBooking)
      }
      item.isResize = false
      await this.loadData()
    },
    createAvailaibleZone (timeStartPos, timeDurationHeight) {
      if (!this.borders) return {}
      const { from, to } = this.borders
      let s = {
        'z-index': 0,
        'background-color': `#aaa`,
        'opacity': '.2',
        'width': `100%`,
        'left': `0px`
      }
      let t = 0
      let h = 0
      if (timeStartPos) {
        t = timeStartPos(from + ':00')
        s = Object.assign({}, s, {
          'top': t + 'px',
        })
      }
      if (timeDurationHeight) {
        h = timeDurationHeight(to - from) * 60
        s = Object.assign({}, s, { 'height': h + 'px' })
      }
      this.borders = Object.assign(this.borders, { top: t, height: h })
      return s
    },
    getAvailableTime (params) {
      let from = 0
      let to = 24
      if (this.up) {
        to = params.to - 1
        this.events.forEach(item => {
          if (params.roomId === item.roomId && item.date === params.date) {
            from = (item.to > from && item.to <= params.from) ? item.to : from
          }
        })
        from = (!this.isAllDay && from < 8) ? 8 : from
      } else {
        from = params.from + 1
        this.events.forEach(item => {
          if (params.roomId === item.roomId && item.date === params.date) {
            to = (item.from < to && item.from >= params.to) ? item.from : to
          }
        })
      }
      return { from, to, date: params.date }
    },
    resizerMouseDown (item, index, e) {
      if (this.forNewBooking.date !== '') return
      if (this.isResizeNow && index !== this.indexResize) return
      const params = Object.assign({}, {
        date: item.date,
        from: item.from,
        to: item.to,
        roomId: item.roomId
      })
      this.top = +style(e.target, 'top').replace('px', '')
      this.height = height(e.target)
      if (e.offsetY < 10 || this.height - e.offsetY < 10) {
        this.hourProtector(this.top, this.top + this.height)
        if (this.indexResize === -1) {
          this.indexResize = index
          this.target = e.target
          this.targetStartParams = Object.assign({}, {
            top: this.top,
            height: this.height
          })
        }
        this.events.forEach(item => { item.isResize = false })
        item.isResize = true
        this.up = (e.offsetY < 10)
        this.mouseStart = +e.y
        this.borders = this.getAvailableTime(params)
        this.isResizeStopped = false
        this.isResizeNow = true
      } else {
        this.findBooking(index, item.id)
      }
    },
    mouseUp () {
      this.isResizeStopped = true
      this.forNewBooking.isResizeNow = false
    },
    hourProtector (cordFrom, cordTo) {
      const pluser = (this.isAllDay) ? 0 : 8
      this.fromInProcessResize = Math.round(cordFrom / 40) + pluser
      this.toInProcessResize = Math.round(cordTo / 40) + pluser
    },
    resizerMouseMove (e) {
      if (this.isResizeNow && !this.isResizeStopped) {
        if (this.up) {
          let offsetTop = this.top + e.y - this.mouseStart
          let offsetHeight = this.height - e.y + this.mouseStart
          const first = +style(this.target, 'top').replace('px', '')
          if (first < this.borders.top || first > this.borders.top + this.borders.height) {
            return
          }
          if (offsetHeight % 40 < 30 && offsetHeight % 40 > 5) {
            return
          }
          offsetTop = Math.round(offsetTop / 40) * 40
          offsetHeight = Math.round(offsetHeight / 40) * 40
          if (offsetTop < this.borders.top || offsetTop > this.borders.top + this.borders.height) {
            return
          }
          css(this.target, {
            top: offsetTop + 'px',
            height: offsetHeight + 'px',
          })
          this.hourProtector(offsetTop, offsetTop + offsetHeight)
        } else {
          let offsetTop = +style(this.target, 'top').replace('px', '')
          let offsetHeight = this.height + e.y - this.mouseStart
          const second = offsetTop + height(this.target)
          if (second < this.borders.top || second > this.borders.top + this.borders.height) {
            return
          }
          if (offsetHeight % 40 < 30 && offsetHeight % 40 > 5) {
            return
          }
          offsetHeight = Math.round(offsetHeight / 40) * 40
          if (offsetHeight + offsetTop < this.borders.top || offsetHeight + offsetTop > this.borders.top + this.borders.height) {
            return
          }
          css(this.target, {
            height: offsetHeight + 'px',
          })
          this.hourProtector(offsetTop, offsetTop + offsetHeight)
        }
      }
    },
    formatPrice (price) {
      const fixed = +Number(price).toFixed()
      return fixed.toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    setNewBooking (date, time) {
      if (this.isResizeNow) return
      this.isCreate = true
      const rooms = this.$app.rooms.getFiltered(this.filter)
      const room = (rooms) ? rooms[0] : {}
      this.selectedBooking = Object.assign({}, {
        id: -1,
        customer: {},
        customerComment: '',
        managerComment: '',
        price: 0,
        reservedFrom: this.$moment(`${date}T${String(this.forNewBooking.from).padStart(2, '0')}:00`),
        reservedTo: this.$moment(`${date}T${String(this.forNewBooking.to + 1).padStart(2, '0')}:00`),
        room: room,
        extras: [],
        members: [],
        eventType: '',
        studio: this.studio,
        filter: this.filter
      })
      // console.log(1111, this.selectedBooking)
      this.dialogState = true
    },
    setNewTechnical (date) {
      const rooms = this.$app.rooms.getFiltered(this.filter)
      const room = (rooms) ? rooms[0] : {}
      this.selectedBooking = Object.assign({}, {
        id: -1,
        managerComment: '',
        reservedFrom: this.$moment(`${date}T${String(this.forNewBooking.from).padStart(2, '0')}:00`),
        reservedTo: this.$moment(`${date}T${String(this.forNewBooking.to + 1).padStart(2, '0')}:00`),
        room: room,
        technical: true
      })
      this.technicalDialogState = true
    },
    async findBooking (index, id) {
      if (this.forNewBooking.date !== '') return
      if (this.isResizeNow) return
      this.isCreate = false
      if (!index) {
        this.selectedBooking = await this.$app.bookings.getOne(id)
      } else {
        this.selectedBooking = await this.$app.bookings.getOne(id)
      }
      this.dialogState = true
    },
    dayHeader (dt) {
      return this.$moment(dt).format('ddd D')
    },
    dayHeaderStyle (dt) {
      if (this.$moment(dt).isSame(this.$moment(), 'day')) {
        return {
          color: '#fff',
          'background-color': '#8791c3',
        }
      } else {
        return {
          'background-color': '#fff',
          color: '#000'
        }
      }
    },
    async loadData () {
      this.closePopupForNewBooking()
      this.isResizeNow = false
      this.indexResize = -1
      if (this.filter.studio === 0) return
      await this.$app.bookings.getForCalendar({
        ...this.filter,
        dateFrom: this.range.from,
        dateTo: this.range.to
      })
    },
    async placeEvents () {
      const dayOfWeek = +this.$moment(this.selectedDate).format('e')
      const startDate = this.$moment(this.selectedDate).subtract(dayOfWeek, 'days')
      this.range = Object.assign({}, {
        from: this.$moment(startDate).format('YYYY-MM-DD'),
        to: this.$moment(startDate).add(6, 'days').format('YYYY-MM-DD')
      })
      // console.log('range', this.range.from, this.range.to)
      await this.loadData()
    },
    getDate (timestamp) {
      return timestamp.format('YYYY-MM-DD')
    },
    getTime (timestamp, mask = 'HH:mm') {
      return timestamp.format(mask)
    },
    getColor ({ room: { id } }) {
      if (!(id in usedColors)) {
        const i = Object.keys(usedColors).length
        usedColors[id] = roomsColors[i < roomsColors.length ? i : 0]
      }
      return usedColors[id].color
    },
    setIcon (action) {
      const icon = EVENT_TYPES[action].icon
      return icon
    },
    setOrder (roomId) {
      const order = this.rooms.findIndex(item => item.id === roomId)
      return order
    },
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
      let bgcolor = '#d3d3d340'
      if (!event.technical) {
        bgcolor = `${event.bgcolor}40`
      }
      let s = {
        'z-index': 2,
        'box-shadow': `inset 3px -3px 0 ${event.bgcolor}`,
        'font-size': '13px',
        'background-color': bgcolor,
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
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    calendarToday () {
      this.selectedDate = this.$moment().format('YYYY-MM-DD')
    },
    async setQueryState (state = true) {
      // console.log(999, state)
      if (state === true) {
        await this.placeEvents()
      }
      this.dialogState = false
      this.closePopupForNewBooking()
    },
    async setTechnicalQueryState (state = true) {
      // console.log(999, state)
      if (state === true) {
        await this.placeEvents()
      }
      this.technicalDialogState = false
      this.closePopupForNewBooking()
    }
  },
  watch: {
    bookings: {
      handler (v) {
        // const l = [...v]
        // console.log('watch bookings', l.sort())
        this.events = []
        let allEvents = []
        let bookings = []
        this.$nextTick(function () {
          v.map((booking) => {
            let from = this.$moment(booking.reservedFrom).parseZone()
            let to = this.$moment(booking.reservedTo).parseZone()
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
            let title = ''
            if (booking.customer && booking.customer.firstName) {
              title = booking.customer.firstName
            }
            let isExtras = false
            if (booking.extras && booking.extras.length > 0) {
              isExtras = booking.extras.some(item => {
                return (item.count > 0)
              })
            }
            const event = {
              isResize: false,
              id: booking.id,
              isNotFullVisible,
              isExtras: isExtras,
              title: title,
              customerComment: booking.customerComment,
              managerComment: booking.managerComment,
              details: `${this.formatPrice(booking.prepayment)}/${this.formatPrice(booking.amount)}`,
              date: this.getDate(from),
              time: this.getTime(from),
              duration: diff,
              bgcolor: this.getColor(booking),
              icon: this.setIcon(booking.eventType),
              technical: booking.technical,
              from: +this.getTime(from, 'HH'),
              to: +this.getTime(to, 'H') !== 0 ? +this.getTime(to, 'H') : 24,
              roomId: booking.room.id,
              posx: 0,
              countInRow: 1
            }
            bookings.push(event)
          })
          const setPositionOfEvents = (dt) => {
            const roomsAmount = this.rooms.length
            let events = []
            let posArray = [...Array(roomsAmount + 10)].map(() => Array(24).fill(0))
            const findEmptyPlace = (col, from, to) => {
              const isEmptyPlace = (c) => {
                for (let i = +from; i < +to; i++) {
                  if (posArray[c][i] !== 0) {
                    return false
                  }
                }
                return true
              }
              for (let c = col; c >= 0; c--) {
                if (isEmptyPlace(c) === false) {
                  return c + 1
                }
              }
              return 0
            }
            for (let order = 0; order < roomsAmount; order++) {
              for (let i = 0; i < bookings.length; i++) {
                const e = bookings[i]
                const timeFrom = e.from
                const timeTo = e.to
                if (e.date === dt && e.duration > 0) {
                  if (this.setOrder(e.roomId) === order) {
                    let col = posArray.length - 1
                    if (col !== 0) {
                      col = findEmptyPlace(col, timeFrom, timeTo)
                    }
                    for (let time = timeFrom; time < timeTo; time++) {
                      posArray[col][time] = 1
                    }
                    e.posx = col
                    events.push(e)
                  }
                }
              }
            }
            let widthArray = Array(24).fill(0)
            for (let i = 0; i < widthArray.length; i++) {
              for (let j = posArray.length - 1; j >= 0; j--) {
                if (posArray[j][i] !== 0) {
                  widthArray[i] = (widthArray[i] < (j + 1) ? j + 1 : widthArray[i])
                }
              }
            }
            let isNormalizedWidth = false
            while (isNormalizedWidth === false) {
              events = events.map((event) => {
                let maxCountInRow = 0
                for (let i = event.from; i < event.to; i++) {
                  maxCountInRow = (maxCountInRow < widthArray[i]) ? widthArray[i] : maxCountInRow
                }
                event.countInRow = (event.countInRow < maxCountInRow) ? maxCountInRow : event.countInRow
                return event
              })
              isNormalizedWidth = true
              events = events.map((event) => {
                for (let i = event.from; i < event.to; i++) {
                  if (widthArray[i] < event.countInRow) {
                    widthArray[i] = event.countInRow
                    isNormalizedWidth = false
                  }
                }
                return event
              })
            }
            // console.log(widthArray)
            allEvents.push(...events)
          }
          const dayOfWeek = +this.$moment(this.selectedDate).format('e')
          const startDate = this.$moment(this.selectedDate).subtract(dayOfWeek, 'days')
          for (let i = 0; i < 7; i++) {
            const currentDate = this.$moment(startDate).add(i, 'days')
            const formattedCurrentDate = this.$moment(currentDate).format('YYYY-MM-DD')
            setPositionOfEvents(formattedCurrentDate)
          }
          this.events = allEvents
        })
      },
      deep: true
    },
    async filter () {
      await this.loadData()
    },
    async isAllDay (v) {
      this.$emit('isAllDayChange', v)
      await this.placeEvents()
    },
    async selectedDate (v, old) {
      if (!old || !v || this.$moment(old).isSame(v, 'week')) return
      await this.placeEvents()
    }
  }
}
</script>

<style scoped lang="stylus">
  .interval-hover
    background-color inherit
    width 100%
    height 100%
  .interval-hover:hover
    background-color #ccc
    opacity 0.1
  .is-resize
    background-color: green !important
    opacity: 0.5 !important
  .resizer
    position absolute
    height 100%
    width 100%
    padding-top 10px
    padding-bottom 10px
    background-color: inherit
  .resizer:before
    margin-left -5px
    content: " "
    position absolute
    top 0
    width 100%
    height 10px
    cursor: n-resize
  .resizer:after
    margin-left -5px
    content: " "
    position absolute
    bottom 0
    width 100%
    height 10px
    cursor: s-resize
</style>
