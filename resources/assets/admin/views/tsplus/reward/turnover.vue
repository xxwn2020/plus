<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>打赏清单</span>
    </div>
    <el-form style="max-width: 100vw; margin-bottom: 20px" ref="rewardsFilters" :model="query" :inline="true">
      <el-autocomplete
        size="mini"
        :fetch-suggestions="queryUsers"
        v-model="username"
        placeholder="打赏者，模糊搜索"
        @select="selectUser"
        value-key="name"
        :debounce="500"
      ></el-autocomplete>
      <el-select size="mini" v-model="query.type">
        <el-option
          v-for="type in types"
          :key="type.name"
          :label="type.alias"
          :value="type.name">
        </el-option>
      </el-select>
      <el-date-picker
        size="mini"
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
      <el-button size="mini" @click="doSearch" :loading="getLoading" type="primary" plain>
        {{$t('admin.submit')}}
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
        prop="id"
        label="#ID">
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="打赏用户">
      </el-table-column>
      <el-table-column
        prop="target.name"
        label="被打赏用户">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="打赏数量"
      >
      </el-table-column>
      <el-table-column
        label="应用"
      >
        <template slot-scope="{row:reward}">
          <span v-if="reward.rewardable_type ==='feeds'">动态</span>
          <span v-else-if="reward.rewardable_type ==='news'">资讯</span>
          <span v-else-if="reward.rewardable_type ==='users'">用户</span>
          <span v-else-if="reward.rewardable_type ==='question-answers'">问答</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column
        label="打赏时间"
      >
        <template slot-scope="{row:reward}">
          {{reward.created_at | localTime}}
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
    mixins: [setQuery],
    name: 'turnover',
    data: () => ({
      username: '',
      search: '',
      date: '',
      query: {
        page: 1,
        limit: 15,
        end: '',
        start: '',
        type: '',
        keyword: ''
      },
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
      page: {},
      getLoading: false,
      types: [
        { name: '', alias: '全部' },
        { name: 'feeds', alias: '动态打赏' },
        { name: 'news', alias: '资讯打赏' },
        { name: 'users', alias: '用户打赏' },
        { name: 'question-answers', alias: '问答打赏' }
      ]
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
      /* for mixins */
      fetchData () {
        this.fetchRewards()
      },
      /* 获取列表 */
      fetchRewards () {
        const { query, getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.reward.rewards(query).then(({ data }) => {
            this.$set(this, 'page', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      /* 远程搜索用户 */
      queryUsers (queryString, cb) {
        const { search } = this
        if (!queryString || queryString === search) {
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
      /* 使用远程搜索结果 */
      selectUser (user) {
        const { id, name } = user
        this.$set(this.query, 'keyword', id)
        this.$set(this, 'search', name)
      }

    }
  }
</script>

<style scoped>

</style>
