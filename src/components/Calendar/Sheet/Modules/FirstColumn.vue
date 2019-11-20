<template lang="pug">
  q-markup-table.absolute.z-fab(
    flat
    square
    bordered
    style="box-sizing: border-box;"
  )
    tbody
      tr.text-body1.text-weight-bold.items-center(
      )
        td.row.col-12.items-center(
          style="height: 46px;"
          @click="allDay = !allDay"
        )
          span {{ "Время" }}
          q-space
          q-icon(
            name="fas fa-chevron-down"
          )
      tr.text-body1.text-weight-medium(
        v-for="(t, index) in timeIntervalForView"
        :key="index"
        :value="t"
      )
        td.row.col-12.items-center(
          :style="rowStyle(index)"
        )
          span {{ t }} {{ allDayComp }}
</template>

<script>
export default {
  name: 'FirstColumn',
  data () {
    return {
      times: Array.from(new Array(24), (item, index) => index).map(item => {
        const hour = String(item).padStart(2, '0')
        const hour1 = item + 1 === 24 ? '00' : String(item + 1).padStart(2, '0')
        return `${hour}:00–${hour1}:00`
      }),
      allDay: false
    }
  },
  computed: {
    timeIntervalForView () {
      return this.allDay ? this.times : this.times.slice(8)
    },
    firstRowForView () {
      return this.allDay ? '00:00-01:00' : '08:00-09:00'
    },
    allDayComp () {
      return this.allDayChange()
    }
  },
  methods: {
    rowStyle (index) {
      let height = 40
      if (index === 0) {
        height = 41
      } else if (index === this.timeIntervalForView.length - 1) {
        height = 38
      }
      return {
        height: height + 'px'
      }
    },
    allDayChange () {
      this.$emit('allDayChange', this.allDay || false)
    }
  },
  props: {
    isAllDay: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
