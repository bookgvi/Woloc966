<template lang="pug">
  q-date.fit(
    v-model="selectedDate"
    minimal
    mask="YYYY-MM-DD"
  ) {{ dateComp }}
</template>

<script>
export default {
  name: 'CalendarDate',
  data () {
    return {
      selectedDate: this.date || ''
    }
  },
  computed: {
    dateComp () {
      return this.dateChange()
    },
  },
  methods: {
    dateChange () {
      this.$emit('dateChange', this.selectedDate)
    }
  },
  props: ['date'],
  watch: {
    date (v) {
      this.selectedDate = v
    }
  }
}
</script>

<style scoped>

</style>
