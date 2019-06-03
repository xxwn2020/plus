<template>
  <div :class="className" style="height:300px; width: 100%"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'

  require('echarts/theme/macarons') // echarts theme

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      totalFee: {
        type: Array
      },
      title: {
        type: String
      }
    },
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.initChart()
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart () {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: this.totalFee.map(item => (item.name))
          },
          calculable: true,
          series: [
            {
              name: this.title,
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: this.totalFee,
              animationEasing: 'cubicInOut',
              animationDuration: 1500
            }
          ]
        })
      }
    }
  }
</script>
