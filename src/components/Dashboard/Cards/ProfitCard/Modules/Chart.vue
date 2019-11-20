<template lang="pug">
  q-card-section(style="height: 320px;")
    chart(
      :options="chartOptions"
      style="width: 100%; height: 100%;"
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
      if (!this.options) return [100]
      return this.options
    },
    chartOptions () {
      const chartOptions = {
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          axisLine: {
          },
          axisLabel: {
            fontSize: 9,
            margin: 5
          }
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            color: '#fff',
            fontFamily: 'Montserrat',
            fontSize: 12,
          },
          backgroundColor: '#262626',
          formatter: (args) => {
            let tooltip = `<p style="margin-bottom: 3px">${args[0].axisValue}</p> `
            let studioBuffer = ''
            args.forEach(({ marker, seriesName, value }) => {
              const studioAndLabel = seriesName.split('|::|')
              const studio = (studioAndLabel[0] === studioBuffer) ? ''
                : `<p style="margin-bottom: 3px; color: #B8B8B8"">${studioAndLabel[0]}</p>`
              value = value || [0, 0]
              tooltip += `${studio}<p style="margin-bottom: 3px">${marker} ${studioAndLabel[1]} • ${value[1]} p.</p>`
              studioBuffer = studioAndLabel[0]
            })
            return tooltip
          },
        },
        series: [{
          data: [100],
          type: 'line',
          showAllSymbol: true
        }]
      }
      if (this.chartData) {
        this.chartData.forEach((item, index) => {
          chartOptions.series[index] = Object.assign({
            name: item.studio + '|::|' + item.labelChart,
            type: 'line',
            color: item.color
          })
          chartOptions.series[index].data = item.data
        })
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
