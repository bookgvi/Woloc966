<template lang="pug">
  q-card-section.row.col-12.items-center {{ dateComp }} {{ studioComp }}
    .col-5(v-if="displayedButtons.dateString")
      span.text-body2.q-py-md {{ dateFormatForLabel }}
    .row.col.justify-start
      q-btn.q-mr-xs.col-3(
        v-if="displayedButtons.location"
        outline
        size="sm"
        label="Локация"
        no-caps
        @click="today"
        color="secondary"
      )
        q-popup-proxy
          q-option-group.text-body2.q-px-md.q-pt-md(
            color="black"
            :options="$app.studios.forOptions"
            v-model="studio"
          )
      q-btn.q-mr-xs.col-3(
        v-if="displayedButtons.today"
        outline
        size="sm"
        label="Сегодня"
        no-caps
        @click="today"
        color="secondary"
      )
      .row.col.justify-end
        q-btn-group(outline v-if="displayedButtons.dateString")
          q-btn.q-px-sm.q-mx-none(
            @click="datePrev"
            outline
            size="sm"
            icon="chevron_left"
            color="secondary"
          )
          q-separator(vertical, inset)
          q-btn.q-px-sm.q-mx-none(
            @click="dateNext"
            outline
            size="sm"
            icon="chevron_right"
            color="secondary"
          )
</template>

<script>

export default {
  name: 'NavBar',
  created () {
    this.date = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      date: this.startDate || '',
      studio: 0
    }
  },
  computed: {
    displayedButtons () {
      if (!this.buttons) {
        return {
          dateString: true,
          location: true,
          today: true,
          leftRight: true
        }
      } else {
        return {
          dateString: this.buttons.dateString || false,
          location: this.buttons.location || false,
          today: this.buttons.today || false,
          leftRight: this.buttons.leftRight || false
        }
      }
    },
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    dateFormatForLabel () {
      if (this.date === '') return '23 сентября, 2019'
      return `${this.$moment(this.date).format('D MMMM, YYYY')}`
    },
    dateComp () {
      return this.dateChange()
    },
    studioComp () {
      return this.studioChange()
    }
  },
  methods: {
    datePrev () {
      this.date = this.$moment(this.date).subtract({ days: 1 })
    },
    today () {
      this.date = this.$moment()
    },
    dateNext () {
      this.date = this.$moment(this.date).add({ days: 1 })
    },
    dateChange () {
      this.$emit('dateChange', this.date)
    },
    studioChange () {
      this.studio = (this.studio === 0) ? this.firstStudio : this.studio
      if (this.studio === 0) return
      this.$emit('studioChange', this.studio)
    },
  },
  props: {
    startDate: Object,
    buttons: Object
  },
  watch: {
    startDate (v) {
      this.date = v
    },
  }
}
</script>

<style scoped>

</style>
