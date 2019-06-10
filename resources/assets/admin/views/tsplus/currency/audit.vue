<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>提现列表</span>
    </div>
    <el-form class="filterForm" ref="cashFilterForm" :model="query" :inline="true">
      <el-form-item>
        <el-autocomplete
          :fetch-suggestions="queryUsers"
          v-model="query.username"
          placeholder="申请人，模糊搜索"
          @select="selectUser"
          value-key="name"
          :debounce="500"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.state">
          <el-option value="" label="全部"></el-option>
          <el-option :value="0" label="等待"></el-option>
          <el-option :value="1" label="成功"></el-option>
          <el-option :value="-1" label="失败"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="getLoading" @click="doSearch" type="primary">{{$t('admin.submit')}}</el-button>
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
      v-loading="getLoading"
      :data="page.data"
      style="width: 100%">
      <el-table-column
        prop="owner_id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="提现数量">
      </el-table-column>
      <el-table-column
        label="审核状态">
        <template slot-scope="{row: cash}">
          {{cash.state | state}}
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间">
        <template slot-scope="{row: cash}">
          {{cash.created_at | localTime}}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('admin.operation')"
      >
        <template slot-scope="{row: cash}">
          <el-button :loading="auditing === cash.id" @click="handleAudit(cash.id,1)" type="primary" plain
                     :disabled="cash.state !== 0">通过
          </el-button>
          <el-button :loading="auditing === cash.id" type="danger" plain @click="handleAudit(cash.id,-1)"
                     class="btn btn-danger btn-sm"
                     :disabled="cash.state !== 0">拒绝
          </el-button>
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
  import searchUser from '@/mixins/searchUser'
  import setQuery from '@/mixins/setQuery'

  export default {
    mixins: [searchUser, setQuery],
    name: 'audit',
    data: () => ({
      query: {
        limit: 15,
        page: 1,
        user: '',
        state: ''
      },
      page: {},
      getLoading: false,
      auditing: 0
    }),
    filters: {
      state (val) {
        switch (val) {
          case 0:
            return '待审核'
            break
          case 1:
            return '通过'
            break
          case -1:
            return '驳回'
            break
          default:
            return '未知'
            break
        }
      }
    },
    methods: {
      // 审核提现申请
      handleAudit (id, state) {
        const { auditing } = this
        if (!auditing) {
          this.$prompt('请填写备注', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value: mark }) => {
            this.$set(this, 'auditing', id)
            this.$api.currency.handleAudit({ id, state, mark }).then(({ data }) => {
              this.showSuccess(data)
              this.fetchData()
            }).catch(this.showApiError).finally(() => {
              this.$set(this, 'auditing', 0)
            })
          })
        }

      },
      fetchData () {
        this.fetchCash()
      }
      ,
      fetchCash () {
        const { getLoading, query } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.currency.fetchCash(query).then(({ data }) => {
            this.$set(this, 'page', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
      ,
      /* 使用远程搜索结果 */
      selectUser (user) {
        const { id, name } = user
        this.$set(this.query, 'user', id)
        this.$set(this, 'search', name)
      }
    },
    watch: {
      'query.username' (to) {
        if (!to) {
          this.$set(this, 'search', '')
          this.$set(this.query, 'user', '')
        }
      }
    },
    beforeMount () {
      this.$set(this, 'search', this.$route.query.username)
    }
  }
</script>

<style scoped>

</style>
