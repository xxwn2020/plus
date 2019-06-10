<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>打赏统计</span>
    </div>
    <el-form class="filterForm" ref="rewardStatisticsForm" :model="query" :inline="true">
      <el-form-item>
        <el-select v-model="query.type">
          <el-option
            v-for="type in types"
            :key="type.name"
            :label="type.alias"
            :value="type.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.scope">
          <el-option value="today" label="今日"></el-option>
          <el-option value="week" label="近七天"></el-option>
          <el-option value="custom" label="自定义时间段"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="query.scope === 'custom'">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="doSearch" :loading="getLoading" type="primary" plain>
          {{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
    <line-chart v-loading="getLoading" :chart-data="option"/>
  </el-card>
</template>

<script>
  import LineChart from './components/line-chart'
  import setQuery from '@/mixins/setQuery'

  export default {
    mixins: [setQuery],
    components: {
      LineChart
    },
    name: 'reward-statistics',
    data: () => ({
      date: null,
      query: {
        scope: 'today',
        type: '',
        date_start: '',
        date_end: ''
      },
      types: [
        { name: '', alias: '全部' },
        { name: 'feeds', alias: '动态打赏' },
        { name: 'news', alias: '资讯打赏' },
        { name: 'users', alias: '用户打赏' },
        { name: 'question-answers', alias: '问答打赏' }
      ],
      getLoading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
      },
      option: {
        title: {
          subtext: '打赏数量：0 打赏次数：0',
          left: 50
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['打赏次数', '打赏数量'],
          orient: 'horizontal',
          x: 'center',
          y: 'top',
          borderWidth: 1,
          padding: 10,
          itemGap: 20
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '打赏次数',
            type: 'line',
            stack: '总量',
            borderWidth: 2,
            data: []
          },
          {
            name: '打赏数量',
            type: 'line',
            stack: '总量',
            borderWidth: 2,
            data: []
          }
        ]
      }
    }),
    beforeMount () {
      this.$set(this, 'query', {
        ...this.query,
        date_start: this.$route.query.date_start || '',
        date_end: this.$route.query.date_end || ''
      })
      this.$set(this, 'date', [this.$route.query.date_start || '', this.$route.query.date_end || ''])
    },
    watch: {
      date (to) {
        if (to) {
          const [date_start, date_end] = to
          this.$set(this, 'query', {
            ...this.query,
            date_end,
            date_start
          })
        } else {
          this.$set(this, 'query', {
            ...this.query,
            date_end: '',
            date_start: ''
          })
        }
      },
      'query.scope' (to) {
        if (to !== 'custom') {
          this.$set(this, 'date', [])
          this.$set(this, 'query', {
            ...this.query,
            date_start: '',
            date_end: ''
          })
        }
      }
    },
    methods: {
      fetchData () {
        this.getRewardStatistics()
      },
      // 初始化 Echarts
      initEcharts (data) {

        let option = this.option

        option.xAxis.data = []
        option.series[0].data = []
        option.series[1].data = []

        let total_count = 0
        let total_amount = 0

        data.forEach(function(n, key) {

          total_count = total_count + data[key].reward_count
          total_amount = parseInt(data[key].reward_amount) + parseInt(total_amount)

          option.xAxis.data.push(data[key].reward_date)
          option.series[0].data.push(data[key].reward_count)
          option.series[1].data.push(data[key].reward_amount)

        })
        option.title.subtext = '打赏总量：' + (total_amount)
        option.title.subtext += ' 打赏次数：' + total_count + ' 次'
      },
      getRewardStatistics () {
        const { query, getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.reward.getRewardStatistics(query).then(({ data }) => {
            this.initEcharts(data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
