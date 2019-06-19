<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>资金流水</span>
    </div>
    <el-form class="el-form filterForm" :inline="true" ref="form" :model="query">
      <el-form-item>
        <el-select v-model="query.state">
          <el-option
            v-for="item in [{value: '', label: '全部'}, {value: 0, label: '等待'}, {value: 1, label: '成功'}, {value: -1, label: '失败'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-autocomplete
          :fetch-suggestions="queryUsers"
          v-model="query.username"
          placeholder="可模糊搜索用户名"
          @select="handleUserSelect"
          value-key="name"
          :debounce="500"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="doSearch" :loading="getLoading" type="primary">{{$t('admin.search.root')}}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      v-loading="getLoading"
      :data="page.data"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="#">
      </el-table-column>
      <el-table-column
        prop="owner_id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{row}">
          {{row.target_type | targetType }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="body"
        label="内容"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="增减"
      >
        <template slot-scope="{row}">
          {{ row.type | actions }}
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="金额"
      >
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="{row}">
          {{row.state | state}}
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
      >
        <template slot-scope="{row}">
          {{row.created_at | localTime }}
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
        state: null,
        username: null
      },
      searchedUsername: null
    }),

    filters: {
      state (val) {
        switch (val) {
          case 0:
            return '等待'
            break
          case 1:
            return '成功'
            break
          case -1:
            return '失败'
            break
          default:
            return '未知'
            break
        }
      },
      targetType (val) {
        switch (val) {
          case 'user':
            return '用户之间转账'
            break
          case 'recharge_ping_p_p':
            return 'Ping ++ 充值'
            break
          case 'Wechat-Native':
            return '微信充值'
            break
          case 'Alipay-Native':
            return '支付宝充值'
            break
          case 'reward':
            return '打赏'
            break
          case 'widthdraw':
            return '提现'
            break
          case 'transform':
            return '兑换货币、积分'
            break
          default:
            return '未知'
            break
        }
      },
      actions (val) {
        switch (val) {
          case 1:
            return '增加'
            break
          case -1:
            return '减少'
            break
          default:
            return '未知'
            break
        }
      }
    },
    watch: {
      'query.username' (to) {
        if (!to) {
          this.$set(this, 'searchedUsername', null)
          this.$set(this.query, 'user', null)
        }
      }
    },
    methods: {
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
      },
      /* 远程搜索用户 */
      handleUserSelect (user) {
        const { id, name } = user
        this.$set(this.query, 'user', id)
        this.$set(this, 'searchedUsername', name)
      }
      ,
      /* mixins */
      fetchData () {
        this.getFlow()
      }
      ,
      /* 获取流水数据 */
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
    }
    ,
    beforeMount () {
      const { '$route': { query: { state = '' } = {} } = {} } = this
      this.$set(this, 'query', {
        ...this.query,
        state: state !== '' ? parseInt(state) : state
      })
      this.getFlow()
    }
  }
</script>

<style scoped lang="scss">
  .el-form {
    margin-bottom: 20px;
  }
</style>
