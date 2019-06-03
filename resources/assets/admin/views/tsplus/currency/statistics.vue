<template>
  <div>
    <el-row :gutter="10">

      <el-col v-if="loaded" :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie :total-fee="totalFee" title="交易总量" class-name="currency-charts"/>
        </div>
      </el-col>
      <el-col v-if="loaded" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie :total-fee="count" title="交易笔数" class-name="currency-charts"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Pie from './components/PieChart'

  export default {
    name: 'currency-statistics',
    components: { Pie },
    data: () => ({
      items: [],
      loaded: false,
      getLoading: false
    }),
    beforeMount () {
      this.fetchData()
    },
    computed: {
      totalFee () {
        const { items = {} } = this
        let data = []
        Object.keys(items).map(key => {
          if (key === 'recharge') {
            data.push({
              value: items[key].sum || 0,
              name: '充值'
            })
          } else {
            data.push({
              value: items[key].sum || 0,
              name: '提现'
            })
          }
        })
        return data
      },
      count () {
        const { items = {} } = this
        let data = []
        Object.keys(items).map(key => {
          if (key === 'recharge') {
            data.push({
              value: items[key].count || 0,
              name: '充值'
            })
          } else {
            data.push({
              value: items[key].count || 0,
              name: '提现'
            })
          }
        })
        return data
      }
    },
    methods: {
      fetchData () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.currency.statistics().then(({ data }) => {
            this.$set(this, 'items', data)
            this.$set(this, 'loaded', true)
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
