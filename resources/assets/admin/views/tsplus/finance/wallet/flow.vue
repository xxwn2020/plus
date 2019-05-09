<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>资金流水</span>
    </div>
    <el-form :inline="true" ref="form" :model="query" label-width="80px">
      <el-input v-model="uname" placeholder="英文,并且唯一" autocomplete="off"></el-input>
    </el-form>
    <el-pagination
      class="top"
      @size-change="handleSizeChange"
      @current-change="pageChange"
      :current-page="page.current_page"
      :page-sizes="[15, 30, 50]"
      :page-size="query.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
    <el-table
      :data="page.data"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="page.total"
      class="pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="parseInt(page.current_page) || 1"
      :page-size="query.limit"
      :page-sizes="[15, 30, 50, 100]"
      :total="page.total"
      @prev-click="pageChange"
      @next-click="pageChange"
      @current-change="pageChange"
      @size-change="handleSizeChange"
    />
  </el-card>
</template>

<script>
  import setQuery from '@/mixins/setQuery'

  export default {
    name: 'flow',
    mixins: [setQuery],
    data: () => ({
      page: {},
      getLoading: false,
      saveLoading: false,
      query: {
        limit: 15,
        page: 1,
        user: null,
        state: null
      }
    }),
    methods: {
      fetchData () {
        this.getFlow()
      },
      getFlow () {
        const { getLoading, query } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getFlow(query).
            then(({ data: { data = [], current_page = 1, last_page = 1, total = 0 } }) => {
              this.$set(this, 'page', {
                data,
                last_page,
                total,
                current_page
              })
              this.$set(this.query, 'page', current_page)
            }).
            catch(this.showApiError).
            finally(() => {
              this.gLoading(false)
            })
        }
      }
    },
    beforeMount () {
      this.getFlow()
    }
  }
</script>

<style scoped>

</style>
