<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>积分流水</span>
      <!--      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    </div>
    <el-form ref="queryForm" class="filterForm" :model="query" :inline="true">
      <el-form-item>
        <el-select v-model="query.action" placeholder="筛选流水类型">
          <el-option
            v-for="item in [{label: '全部', value: null},{label:'收入', value: 1},{label:'支出', value: -1}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.state" placeholder="流水状态">
          <el-option
            v-for="item in [{label: '全部', value: null},{label:'等待', value: 0},{label:'成功', value: 1},{label:'失败', value: -1}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-autocomplete
          :fetch-suggestions="queryUsers"
          v-model="query.name"
          placeholder="可模糊搜索用户名"
          @select="selectUser"
          value-key="name"
          :debounce="500"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button @click="doSearch" :loading="getLoading" type="primary" plain>{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="getLoading"
      :data="page.data"
      style="width: 100%">
      <el-table-column
        prop="user.id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="currency"
        label="积分">
      </el-table-column>
      <el-table-column
        prop="body"
        label="交易信息"
      >
      </el-table-column>
      <el-table-column
        label="类型"
      >
        <template slot-scope="{row:turnover}">
          {{turnover.type | type}}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="{row:turnover}">
          {{turnover.state | state}}
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="时间"
      >
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
  import searchUser from '@/mixins/searchUser'

  export default {
    mixins: [setQuery, searchUser],
    data: () => ({
      page: {},
      query: {
        limit: 15,
        page: 1,
        name: null,
        user: 0,
        action: null,
        state: null
      },
      getLoading: false,
      saveLoading: false,
      searchedUsername: null
    }),
    beforeMount () {
      this.$set(this, 'query', {
        ...this.query,
        state: this.$route.query.state ? parseInt(this.$route.query.state) : null,
        action: this.$route.query.action ? parseInt(this.$route.query.action) : null
      })
    },
    watch: {
      'query.name' (to) {
        if (!to) {
          this.$set(this, 'searchedUsername', null)
          this.$set(this.query, 'user', 0)
        }
      }
    },
    methods: {
      /* 使用远程搜索结果 */
      selectUser (user) {
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
      },
      fetchData () {
        this.fetchTurnover()
      },
      fetchTurnover () {
        const { query, getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.currency.list(query).then(({ data }) => {
            this.$set(this, 'page', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    },
    filters: {
      type (val) {
        return val === 1 ? '增加' : '减少'
      },
      state (val) {
        switch (val) {
          case 0:
            return '等待'
          case 1:
            return '成功'
          case -1:
            return '失败'
          default:
            return '未知'
        }
      }
    }
  }
</script>
