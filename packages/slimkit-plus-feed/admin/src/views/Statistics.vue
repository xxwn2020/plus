<template>
  <el-main>
    <el-card shadow="never"
      class="box-card">
      <div slot="header"
        class="clearfix">
        <span>{{ i18n('statistics') }}</span>
      </div>
      <el-form ref="feedFilter"
        :model="query"
        :inline="true"
      >
        <el-form-item>
          <el-select v-model="query.type"
            placeholder="placeholder">
            <el-option
              v-for="(type, key) in types"
              :key="key"
              :label="type"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetchStatistics"
            :loading="getting"
            type="primary"
            plain>筛 选
          </el-button>
        </el-form-item>
      </el-form>
      <bar-echart v-if="loaded"
        v-loading="getting"
        :chartData="option"/>
    </el-card>
  </el-main>
</template>

<script>
import BarEchart from '@/components/BarChart'

export default {
  name: 'Statistics',
  components: { BarEchart },
  data: () => ({
    query: {
      type: 'all'
    },
    types: {
      'all': '全部',
      'today': '今天',
      'yesterday': '昨天',
      'week': '过去一周',
      'lastDay': '截止昨天'
    },
    typeAlias: {
      commentsCount: '评论数量',
      feedsCount: '动态数量',
      payCount: '交易量',
      payFeedsCount: '收费动态',
      topComment: '置顶评论',
      topFeed: '置顶动态'
    },
    getting: false,
    loaded: false,
    option: {
      title: {
        subtext: '动态数据统计'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        boundaryGap: true
      },
      yAxis: {
        type: 'value',
        label: {
          show: false
        }
      },
      series: [
        {
          data: [],
          type: 'bar',
          stack: '总量'
        }]
    }
  }),
  created () {
    this.fetchStatistics()
  },
  methods: {
    initEchart (data) {
      let { option, typeAlias } = this
      option.xAxis.data = []
      option.series[0].data = []
      for (let key in data) {
        option.xAxis.data.push(typeAlias[key])
        option.series[0].data.push(data[key])
      }
    },
    fetchStatistics () {
      const { getting, query } = this
      if (!getting) {
        this.gLoading(true)
        // this.$set(this, 'loaded', false)
        this.$api.getStatistics(query).then(({ data }) => {
          this.initEchart(data)
          this.$set(this, 'loaded', true)
        }).finally(() => {
          this.gLoading(false)
        })
      }
    }
  }
}
</script>
