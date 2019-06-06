<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>意见反馈</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-form style="max-width: 100vw; margin-bottom: 20px;" ref="feedBackFilter" :model="query" :inline="true">
      <el-form-item>
        <el-input size="mini" v-model="query.keyword" placeholder="搜索内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select size="mini" v-model="query.type">
          <el-option
            v-for="type in types"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" plain :loading="getLoading" @click="doSearch">{{$t('admin.submit')}}
        </el-button>
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
        label="#ID">
      </el-table-column>
      <el-table-column
        label="类型">
        <template slot-scope="{row:feedback}">
          {{conversionTypeDisplay(feedback.type)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="发起用户">
      </el-table-column>
      <el-table-column
        prop="target.name"
        label="目标用户">
      </el-table-column>
      <el-table-column
        prop="target.content"
        label="内容">
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="{row:feedback}">
          {{feedback.created_at | localTime}}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('admin.operation')"
      >
        <template slot-scope="{row: feedback}">
          <el-button type="danger" plain :loading="deleting === feedback.id" @click="delFeedback(feedback.id)">
            {{$t('admin.delete')}}
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
  import setQuery from '@/mixins/setQuery'

  export default {
    mixins: [setQuery],
    name: 'index',
    data: () => ({
      page: {},
      query: {
        limit: 15,
        page: 1,
        type: '',
        keyword: ''
      },
      types: [
        { label: '全部', value: '' },
        { label: '意见反馈', value: 'feedback' },
        { label: '系统消息', value: 'system' }
      ],
      getLoading: false,
      deleting: 0
    }),
    methods: {
      conversionTypeDisplay (type) {
        for (let i = 0; i < this.types.length; i++) {
          if (type === this.types[i].value) {
            return this.types[i].label
          }
        }
      },
      fetchData () {
        this.fetchFeedbacks()
      },
      fetchFeedbacks () {
        const { query, getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.feedback.list(query).then(({ data }) => {
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      delFeedback (id) {
        const { deleting } = this
        if (!deleting) {
          this.$set(this, 'deleting', id)
          this.$api.feedback.del(id).then(({ data }) => {
            this.showSuccess(data)
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'deleting', 0)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
