<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.finance.cashes')}}</span>
    </div>
    <el-main>
      <el-form class="el-form" :inline="true" ref="cashForm" style="max-width: none" :model="query">
        <el-autocomplete
          :fetch-suggestions="queryUsers"
          v-model="query.username"
          placeholder="可模糊搜索用户名"
          @select="handleUserSelect"
          value-key="name"
          :debounce="500"
          size="mini"
        ></el-autocomplete>
        <el-select size="mini" v-model="query.status">
          <el-option value="all" label="全部"></el-option>
          <el-option :value="0" label="待审批"></el-option>
          <el-option :value="1" label="已审批"></el-option>
          <el-option :value="2" label="被拒绝"></el-option>
        </el-select>
        <el-select size="mini" v-model="query.order">
          <el-option value="desc" label="最后申请"></el-option>
          <el-option value="asc" label="最先申请"></el-option>
        </el-select>
        <el-button type="primary" size="mini" :loading="getLoading" @click="doSearch">{{$t('admin.search.root')}}
        </el-button>
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
        v-loading="getLoading"
        :data="page.data"
        style="width: 100%">
        <el-table-column
          label="用户(ID)"
        >
          <template slot-scope="{row}">
            {{row.user.name}}({{row.user.id}})
          </template>
        </el-table-column>
        <el-table-column
          label="金额"
        >
          <template slot-scope="{row}">
            {{row.value / 100}}
          </template>
        </el-table-column>
        <el-table-column
          label="账号">
          <template slot-scope="{row}">
            {{
            row.type === 'alipay' ? '支付宝：' : '微信：'
            }} {{row.account}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="{row}">
            <el-button v-if="row.status === 1" type="success">{{$t('admin.state.success')}}</el-button>
            <el-button v-else-if="row.status === 2" type="error">{{$t('admin.state.error')}}</el-button>
            <el-button v-else type="info">{{$t('admin.state.waiting')}}</el-button>
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
    </el-main>
  </el-card>
</template>

<script>
  import setQuery from '@/mixins/setQuery'

  export default {
    name: 'cashes',
    mixins: [setQuery],
    data: () => ({
      page: {},
      getLoading: false,
      saveLoading: false,
      query: {
        limit: 15,
        page: 1,
        username: null,
        user: null,
        status: 'all',
        order: 'desc'
      },
      searchedUsername: null
    }),
    watch: {
      'query.username' (to) {
        if (!to) {
          this.$set(this, 'searchedUsername', null)
          this.$set(this.query, 'user', null)
        }
      }
    },
    methods: {
      /* mixins */
      fetchData () {
        this.getWalletCashes()
      },
      /* 获取列表 */
      getWalletCashes () {
        const { getLoading, query } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getWalletCashes(query).then(({ data }) => {
            this.$set(this, 'page', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      /* 远程搜索用户 */
      handleUserSelect (user) {
        const { id, name } = user
        this.$set(this.query, 'user', id)
        this.$set(this, 'searchedUsername', name)
      },
      /* 远程搜索用户 */
      queryUsers (queryString, cb) {
        const { searchedUsername } = this
        if (!queryString || queryString === searchedUsername) {
          cb([])
          return false
        }
        this.$api.users.list({ name: queryString }).then(({ data: { users } }) => {
          cb(users)
          if (!users.length) {
            this.$message({
              type: 'info',
              message: '没有找到用户'
            })
          }
        })
      }
    },
    beforeMount () {
      this.getWalletCashes()
    }
  }
</script>

<style scoped lang="scss">
  .el-form {
    margin-bottom: 20px;
  }
</style>
