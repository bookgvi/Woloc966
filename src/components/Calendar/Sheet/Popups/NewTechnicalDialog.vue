<template lang="pug">
  q-dialog(
    v-model="dialogState"
    persistent
  )
    q-card.q-py-md(
      style="width: 330px"
    )
      q-card-section
        span.row.text-bold.q-px-sm.q-pb-md Быстрая бронь
        calendar-room(
          @roomChange="newBooking.room = $event"
          :filter="filter"
          :startRoom="room.name"
        )
        calendar-comment(
          :isTechnical="true"
          @managerCommentChange="newBooking.managerComment = $event"
          :startManagerComment="newBooking.managerComment"
        )
        calendar-apply(
          :applyBooking="applyBooking"
          @setQueryState="setQueryState($event)"
        )

</template>

<script>
import { Notify } from 'quasar'

import CalendarRoom from './Modules/CalendarRoom'
import CalendarComment from './Modules/CalendarComment'
import CalendarApply from './Modules/CalendarApply'
export default {
  name: 'NewTechnicalDialog',
  components: { CalendarApply, CalendarComment, CalendarRoom },
  data () {
    return {
      newBooking: {}
    }
  },
  computed: {
    room () {
      return (this.newBooking.room) || {}
    }
  },
  methods: {
    setQueryState (state) {
      this.$emit('setQueryState', state)
    },
    setParamsForPost () {
      if (!this.newBooking.room) {
        Notify.create({
          message: `Выберите зал`,
          color: 'negative',
          position: 'bottom-left',
          icon: 'warning'
        })
        return null
      }
      const params = {
        room: { id: this.newBooking.room.id },
        reserveFrom: this.newBooking.reservedFrom,
        reserveTo: this.newBooking.reservedTo,
        managerComment: this.newBooking.managerComment || ''
      }
      return params
    },
    async applyBooking () {
      const payload = this.setParamsForPost()
      if (payload) {
        await this.$app.bookings.addNewTechnical(payload)
        if (this.$app.bookings.idOfJustAdded !== 0) {
          this.$emit('setQueryState', true)
        }
      }
      // console.log(9, this.newBooking.id, index)
    }
  },
  props: {
    booking: Object,
    filter: Object,
    dialogState: Boolean,
  },
  watch: {
    booking (v) {
      this.newBooking = Object.assign({}, {
        room: v.room,
        managerComment: v.managerComment,
        reservedFrom: this.$moment(v.reservedFrom).format('YYYY-MM-DDTHH:mm:ss+03:00'),
        reservedTo: this.$moment(v.reservedTo).format('YYYY-MM-DDTHH:mm:ss+03:00'),
        technical: true
      })
    }
  }
}
</script>

<style scoped>

</style>
