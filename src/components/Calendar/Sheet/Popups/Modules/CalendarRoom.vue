<template lang="pug">
  q-option-group.col-12.justify-left.items-center.text-body2(
    v-model="room"
    :options="rooms"
    :dense="rooms.length > 9"
    keep-color
  ) {{ roomComp }}
</template>

<script>
import roomsColors from 'src/common/rooms/colors'
export default {
  name: 'CalendarRoom',
  data () {
    return {
      room: ''
    }
  },
  computed: {
    roomComp () {
      return this.roomChange()
    },
    selectedRoom () {
      if (!this.room || !this.filter) return {}
      return this.$app.rooms.getAvailable(this.filter).find(item => item.name === this.room)
    },
    rooms () {
      if (this.filter && this.$app.rooms.getAvailable(this.filter).length > 0) {
        const arr = this.$app.rooms.getAvailable(this.filter).map((item, index) => {
          const room = Object.assign({}, {
            id: item.id,
            value: item.name,
            label: item.name,
            color: roomsColors[index].color
          })
          return room
        })
        return arr
      } else return []
    }
  },
  methods: {
    roomChange () {
      this.$emit('roomChange', this.selectedRoom)
    }
  },
  props: ['filter', 'startRoom'],
  watch: {
    startRoom (v) {
      this.room = v
    }
  }
}
</script>

<style scoped>

</style>
