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
        class="el-table"
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
          label="金额[元]"
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
            <template v-if="row.status === 1">
              <el-button disabled size="mini" type="success">{{$t('admin.state.accept')}}
              </el-button>
              <el-alert
                class="remark"
                :title="row.remark"
                type="success"
                :closable="false"
              >
              </el-alert>
            </template>
            <template v-else-if="row.status === 2">
              <el-button disabled size="mini" type="danger">{{$t('admin.state.refuse')}}
              </el-button>
              <el-alert
                class="remark"
                :title="row.remark"
                type="error"
                :closable="false"
              >
              </el-alert>
            </template>
            <template v-else>
              <el-button disabled size="mini" type="info">{{$t('admin.state.waiting')}}</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="申请时间">
          <template slot-scope="{row}">
            {{row.created_at | localTime }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('admin.operation')"
        >
          <template slot-scope="{row}">
            <template v-if="row.status === 0">
              <el-button :loading="loadingItem === row.id" @click="operation(row.id, 'passed')"
                         type="primary"
                         size="mini">同意
              </el-button>
              <el-button :loading="loadingItem === row.id" @click="operation(row.id, 'refuse')"
                         type="danger"
                         size="mini">拒绝
              </el-button>
            </template>
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
      searchedUsername: null,
      loadingItem: null
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
      /* 审核操作 */
      operation (id, type) {
        this.$prompt('请填写备注', '提示', {
          inputPlaceholder: '请填写备注',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (x = '') => {
            if (x === null) {
              return '请填写备注'
            }
            const s = x.replace(/(^\s*)|(\s*$)/g, '')
            return s.length > 0
          },
          inputErrorMessage: '请填写备注'
        })
          .then(({ value }) => {
            this.$set(this, 'loadingItem', id)
            this.$api.finance.auditCash({ cashId: id, type, params: { remark: value } })
              .then(({ data }) => {
                this.showSuccess(data)
                const item = this.page.data.find(i => (i.id === id))
                this.$set(item, 'remark', value)
                this.$set(item, 'status', type === 'passed' ? 1 : 2)
              })
              .catch(this.showApiError)
              .finally(() => {
                this.$set(this, 'loadingItem', null)
              })
          })
          .catch(() => {
            this.showInfo('已放弃审核')
          })
      },
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

  .el-table {
    .remark {
      margin-top: 10px;
    }
  }
</style>
