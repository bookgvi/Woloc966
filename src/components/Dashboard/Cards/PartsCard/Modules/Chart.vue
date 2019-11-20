<template lang="pug">
  q-card-section(style="height: 400px;")
    chart(
      :options="chartOptions"
      style="width: 100%; height: 100%"
    )

</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts'

export default {
  name: 'Chart',
  components: {
    'chart': ECharts
  },
  data () {
    return {
    }
  },
  computed: {
    chartData () {
      if (!this.options) return [{ value: 100, itemStyle: { color: 'black' } }]
      return this.options.map((item) => {
        const piece = {
          value: item.total,
          name: item.name,
          itemStyle: { color: item.color }
        }
        return piece
      }).sort(function (a, b) {
        return a.value - b.value
      })
    },
    chartOptions () {
      const chartOptions = {
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: '#fff',
            fontFamily: 'Montserrat',
            fontSize: 12,
          },
          backgroundColor: '#262626',
          formatter: ({ marker, name, percent, value, data }) => {
            let tooltip = `<p style="margin-bottom: 3px; color: #B8B8B8"">${marker} ${data.name}</p><p style="margin-bottom: 3px">${percent}% • ${value} p.</p>`
            return tooltip
          },
        },
        series: [{
          type: 'pie',
          radius: ['40%', '90%'],
          data: [
            { value: 100, itemStyle: { color: 'black' } },
          ].sort(function (a, b) {
            return a.value - b.value
          }),
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
                show: false,
                position: 'center'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
        }]
      }
      if (this.chartData) {
        chartOptions.series[0].data = this.chartData
      }
      return chartOptions
    }
  },
  props: {
    options: Array,
  }
}
</script>

<style scoped>

</style>
