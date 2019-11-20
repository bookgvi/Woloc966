<template lang="pug">
  q-card-section.q-pa-none
    q-markup-table.q-pb-md(
      style="min-width: 400px"
      wrap-cells
      separator="none"
      dense
      flat
    )
      thead.text-left
        tr
          th(style="width: 70%")
            span.text-bold.text-black.text-body2 Зал
          th.text-right
            span.text-bold.text-black.text-body2 %
          th.text-right
            span.text-bold.text-black.text-body2 р.
      tbody
        tr(
          v-for="(item, index) in chartData"
          :key="index"
        )
          td
            q-icon.q-mr-md(
              :style="{color: item.color}"
              name="far fa-circle"
            )
            span {{ item.name }}
          td.text-right
            span.text-grey.text-caption {{ item.percents }}
          td.text-right
            span.text-body1 {{ (+item.total).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true }) }}

</template>

<script>

export default {
  name: 'ProfitOptions',
  data () {
    return {
      checkedOptions: [],
    }
  },
  computed: {
    chartData () {
      if (!this.options) {
        return [{
          name: 'Зал',
          total: 0,
          percents: 100,
          color: 'black'
        }]
      }
      return this.options.slice()
    },
  },
  props: {
    options: Array,
  }
}
</script>

<style scoped>

</style>
