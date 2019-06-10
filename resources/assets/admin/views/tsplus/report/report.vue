<template>
  <el-main class="report">
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('admin.reports.root')}}</span>
      </div>
      <el-form class="filterForm" ref="queryForm" :model="query" :inline="true">
        <el-form-item>
          <el-select v-model="query.state">
            <el-option
              v-for="item in [{label: '全部', value: null},{label: '待审核', value: 0},{label: '已通过', value: 1}, {label: '已驳回', value: 2}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="doSearch" :loading="getLoading" type="primary">{{$t('admin.submit')}}</el-button>
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
          prop="id"
          label="#ID"
          width="80px"
        >
        </el-table-column>
        <el-table-column
          prop="user.name"
          label="举报人">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="举报内容">
        </el-table-column>
        <el-table-column
          label="资源类型"
          width="80px"
        >
          <template slot-scope="{row:report}">
            {{report.reportable_type | moduleName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reason"
          label="理由"
          width="150px"
        >
        </el-table-column>
        <el-table-column
          prop="mark"
          label="处理备注"
          width="150px"
        >
        </el-table-column>
        <el-table-column
          label="举报时间"
        >
          <template slot-scope="{row:report}">
            {{report.created_at | localTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="处理状态"
          width="80px"
        >
          <template slot-scope="{row:report}">
            {{report.status | status}}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('admin.operation')"
          fixed="right"
        >
          <template slot-scope="{row:report}">
            <el-link :href="report.view" target="_blank">查看</el-link>
            <template v-if="report.status === 0">
              <el-button plain type="primary" @click="fillMark(report.id, 'deal')" :loading="report.id === deal"
              >通过
              </el-button>
              <el-button plain type="primary" @click="fillMark(report.id, 'reject')" :loading="report.id === reject"
              >驳回
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
    </el-card>
  </el-main>
</template>

<script>
  import setQuery from '@/mixins/setQuery'

  export default {
    mixins: [setQuery],
    data: () => ({
      page: {},
      query: {
        limit: 15,
        page: 1,
        state: null
      },
      getLoading: false,
      saveLoading: false,
      deal: null,
      reject: null,
      mark: null
    }),
    beforeMount () {
      const { '$route': { query: { state = null } = {} } = {} } = this
      this.query = {
        ...this.query,
        state: state !== null ? parseInt(state) : state
      }
    },
    filters: {
      status (val) {
        let title = '待审核'
        if (val == 1) {
          title = '已处理'
        } else if (val == 2) {
          title = '已驳回'
        }
        return title
      },
      moduleName (val) {
        switch (val) {
          case 'users':
            return '用户'
          case 'types/models/feed-topics':
            return '话题'
          case 'comments':
            return '评论'
          case 'feeds':
            return '动态'
          default:
            return '未知'
        }
      }
    },
    methods: {
      fetchData () {
        this.list()
      },
      list () {
        const { getLoading, query } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.report.list(query).then(({ data }) => {
            this.$set(this, 'page', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },

      /* 填写备注 */
      fillMark (id, type) {
        this.$prompt('请输入备注', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.dealReport(id, type, value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      /* 处理举报 */
      dealReport (id, type, mark) {
        if (!type || !id) return
        if (!mark) {
          this.$message.error('请填写备注')
          return
        }
        this.$set(this, type, id)
        this.$api.report.dealReport({ id, params: { mark }, type }).then(({ data }) => {
          this.fetchData()
        }).catch(this.showApiError).finally(() => {
          this.$set(this, type, null)
        })
      }
    }
  }
</script>
