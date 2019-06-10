<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>钱包统计</span>
    </div>
    <el-table
      v-loading="getLoading"
      :data="statistics"
      style="width: 100%">
      <el-table-column
        prop="type"
        label="类型"
        width="180">
        <template slot-scope="{row}">
          {{row.type | type}}
        </template>
      </el-table-column>
      <el-table-column
        prop="count"
        label="总数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sum"
        label="总金额">
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script>
  export default {
    name: 'statistics',
    data: () => ({
      statistics: [],
      getLoading: false
    }),
    filters: {
      type (val) {
        if (val === 'expenditure') {
          return '支出'
        } else if (val === 'income') {
          return '收入'
        } else {
          return '未知'
        }
      }
    },
    methods: {
      /* 获取统计状态 */
      getStatistics () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getStatistics().then(({ data }) => {
            let format = []
            Object.keys(data).map(key => {
              format.push({
                type: key,
                count: data[key].count,
                sum: data[key].sum || 0
              })
            })
            this.$set(this, 'statistics', format)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getStatistics()
    }
  }
</script>

<style scoped>

</style>
