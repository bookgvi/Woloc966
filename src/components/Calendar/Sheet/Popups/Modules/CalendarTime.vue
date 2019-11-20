<template lang="pug">
  .q-py-sm.text-body2
    .row.span.q-pb-sm Интервал, {{ duration }}
    .row.justify-around
      .col-5
        q-input(
          dense
          outlined
          min="0"
          max="24"
          placeholder="0"
          @keydown="keyHandler(range.min, $event)"
          type="number"
          v-model.number="range.min"
        )
      .col-5
        q-input(
          dense
          outlined
          min="0"
          max="24"
          placeholder="0"
          @keydown="keyHandler(range.max, $event)"
          type="number"
          v-model.number="range.max"
        )
    .row.text-body2.q-py-sm Зеленым отмечено свободное время.
    q-range.row.q-px-sm(
      v-model="range"
      :min="0"
      :max="24"
      color="green"
    ) {{ timeComp }}
</template>

<script>
export default {
  name: 'CalendarTime',
  data () {
    return {
      range: {
        min: this.startTime || 0,
        max: this.endTime || 24
      },
    }
  },
  computed: {
    duration () {
      const foo = this.range.max - this.range.min
      const bar = ([1, 21].includes(foo)) ? 'час' : ([0, 2, 3, 4, 22, 23, 24].includes(foo))
        ? 'часа' : 'часов'
      return `${foo} ${bar}`
    },
    timeComp () {
      return this.timeChange()
    }
  },
  methods: {
    timeChange () {
      this.$emit('timeChange', {
        from: this.range.min,
        to: this.range.max
      })
    },
    keyHandler (val, evt) {
      if (evt.key === '-' || evt.key === '+' || evt.key === 'e') {
        evt.preventDefault()
      }
      if (Number.isNaN(evt.key)) {
        evt.preventDefault()
      }
      if (Number(val + evt.key) > 24) {
        evt.preventDefault()
      }
    },
  },
  props: ['startTime', 'endTime'],
  watch: {
    startTime (v) {
      this.range.min = v
    },
    endTime (v) {
      this.range.max = v
    },
  }
}
</script>

<style scoped>

</style>
