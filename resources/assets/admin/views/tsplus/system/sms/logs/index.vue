<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>短信记录</span>
    </div>
    <el-form :inline="true" ref="query" :model="query" class="filterForm">
      <el-form-item label="" prop="keyword">
        <el-input v-model="query.keyword" placeholder="输入要搜索的手机号码"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-select v-model="query.state">
          <el-option :label="$t('admin.all')" :value="-1"></el-option>
          <el-option label="未发送" :value="0"></el-option>
          <el-option label="发送成功" :value="1"></el-option>
          <el-option label="发送失败" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="doSearch" type="primary">{{ $t('admin.filter') }}</el-button>
      </el-form-item>
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
      v-loading="listLoading"
      :data="smsLogs">
      <el-table-column
        prop="account"
        label="手机号码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="code"
        label="验证码"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="{row: {status}}">
          <span>{{ status === 0 ? '未发送' : (status === 1 ? '发送成功' : '发送失败') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="{row: {created_at}}">
          {{created_at | localTime }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="bottom"
      @size-change="handleSizeChange"
      @current-change="pageChange"
      :current-page="page.current_page"
      :page-sizes="[15, 30, 50]"
      :page-size="query.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
  </el-card>
</template>

<script>
  import setQuery from '@/mixins/setQuery'

  export default {
    name: 'SystemSmsLogs',
    mixins: [setQuery],
    data: () => ({
      query: {
        state: -1,
        keyword: '',
        page: 1,
        limit: 15
      },
      smsLogs: [],
      listLoading: false
    }),
    beforeMount () {
      const { '$route': { query: { state = -1 } } = {} } = this
      this.$set(this, 'query', {
        ...this.query,
        state: parseInt(state)
      })
    },
    methods: {
      /* 获取短信记录列表 */
      fetchSmsLogs () {
        const { query, listLoading } = this
        if (!listLoading) {
          this.$set(this, 'listLoading', true)
          this.$api.sms.smsLogs(query).then(({ data, headers: { 'x-sms-total': total = 0 } }) => {
              this.$set(this, 'smsLogs', data)
              this.$set(this.page, 'total', ~~total)
            }
          ).catch(this.showApiError).finally(() => {
            this.$set(this, 'listLoading', false)
          })
        }
      },
      /* mixin */
      fetchData () {
        this.fetchSmsLogs()
      }
    }
  }
</script>
