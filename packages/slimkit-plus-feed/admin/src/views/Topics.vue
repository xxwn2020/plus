<template>
  <el-main>
    <topic-config style="margin-bottom: 20px"></topic-config>
    <el-card shadow="never"
      class="box-card">
      <div slot="header"
        class="clearfix">
        <span>{{i18n('topic-list')}}</span>
        <el-button @click="dialogVisible = true"
          style="padding: 3px 0"
          type="text">{{i18n('create')}}
        </el-button>
      </div>
      <el-form ref="topicFilter"
        :model="query"
        :inline="true"
      >
        <el-form-item>
          <el-input v-model="query.id"
            type="number"
            placeholder="话题id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.name"
            placeholder="话题关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.hot">
            <el-option
              label="全部"
              :value="0">
            </el-option>
            <el-option
              label="热门"
              :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="doSearch"
            :loading="getting"
            type="primary">{{i18n('filter')}}
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
        sort-by="id"
        :sort-change="sortBy"
        v-loading="getting"
        :data="page.data"
        style="width: 100%"
        sortable="custom"
      >
        <el-table-column
          prop="id"
          label="#ID"
          width="60px"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          :label="i18n('topic-name')"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="desc"
          width="160px"
          :label="i18n('topic-desc')">
        </el-table-column>
        <el-table-column
          :label="`${i18n('topic-audited-status')}/${i18n('topic-hot-status')}`"
        >
          <template slot-scope="{row: topic}">
            <el-button :loading="updating === topic.id"
              @click="auditToggle(topic)"
              type="text">{{topic.status === 'passed' ? i18n('audit-passed') : (topic.status === 'waiting' ? i18n('audit-waiting'): i18n('audit-failed'))}}
            </el-button>
            <el-button :loading="deleting === topic.id"
              @click="hotToggle(topic)"
              type="text">{{topic.hot_at ? i18n('topic-is-hot') : i18n('topic-is-not-hot')}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          prop="feeds_count"
          :label="i18n('feed_count')"
        >
        </el-table-column>
        <el-table-column
          width="100px"
          prop="followers_count"
          :label="i18n('followers_count')"
        >
        </el-table-column>
        <el-table-column
          width="160px"
          prop="creator.name"
          :label="i18n('topic-creator')"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="i18n('operation')"
        >
          <template slot-scope="{row: topic}">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑话题"
              placement="top">
              <el-button @click="editTopic(topic)"
                type="primary"
                plain
                circle
                icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除话题"
              placement="top">
              <el-button @click="destroyTopic(topic.id)"
                :loading="deleting === topic.id"
                type="danger"
                plain
                circle
                icon="el-icon-delete"></el-button>
            </el-tooltip>
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
    <el-dialog
      :title="`${edit.id ? '编辑' : '创建'}话题`"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="topicForm"
        :model="edit"
        label-width="80px">
        <el-form-item :label="i18n('topic-name')"
          prop="name">
          <el-input v-model="edit.name"
          ></el-input>
        </el-form-item>
        <el-form-item :label="i18n('topic-desc')"
          prop="desc">
          <el-input type="textarea"
            :autosize="{minRows: 3, maxRows: 6}"
            v-model="edit.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
          @click="createTopic">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import setQuery from '@/mixins/setQuery'
import TopicConfig from './components/topic-config'

export default {
  name: 'Topics',
  mixins: [setQuery],
  components: { TopicConfig },
  data: () => ({
    page: {
      data: []
    },
    query: {
      page: 1,
      limit: 15,
      id: null,
      name: null,
      hot: 0,
      direction: 'desc'
    },
    edit: {
      id: null,
      name: null,
      desc: null
    },
    deleting: 0,
    updating: 0,
    dialogVisible: false
  }),
  beforeMount () {
    const { $route: { query: { hot = 0 } = {} } = {} } = this
    this.$set(this, 'query', {
      ...this.query,
      hot: parseInt(hot)
    })
  },
  methods: {
    sortBy (x) {
      console.log(x)
    },
    /* 审核操作 */
    auditToggle (topic) {
      const { status } = topic
      let config = {}
      switch (status) {
        case 'waiting':
          config = {
            content: '请设置该话题的审核状态',
            tip: '提示',
            confirmButtonText: this.i18n('audit-passed'),
            cancelButtonText: this.i18n('audit-failed'),
            confirm: 'passed',
            cancel: 'failed'
          }
          break
        case 'passed':
          config = {
            content: '请设置该话题的审核状态',
            tip: '提示',
            confirmButtonText: this.i18n('audit-waiting'),
            cancelButtonText: this.i18n('audit-failed'),
            confirm: 'waiting',
            cancel: 'failed'
          }
          break
        case 'failed':
          config = {
            content: '请设置该话题的审核状态',
            tip: '提示',
            confirmButtonText: this.i18n('audit-passed'),
            cancelButtonText: this.i18n('audit-waiting'),
            confirm: 'passed',
            cancel: 'waiting'
          }
          break
      }
      this.$confirm(config.content, config.tip, {
        distinguishCancelAndClose: true,
        confirmButtonText: config.confirmButtonText,
        cancelButtonText: config.cancelButtonText
      }).then(() => {
        this.$api.topicAuditToggle(topic.id, config.confirm).then(() => {
          this.Success()
          this.fetchData()
        }).catch(this.showApiError).finally(() => {

        })
      }).catch(action => {
        if (action === 'cancel') {
          this.$api.topicAuditToggle(topic.id, config.cancel).then(() => {
            this.Success()
            this.fetchData()
          })
        }
      })
    },
    /* 切换热门 */
    hotToggle (topic) {
      this.$confirm(`是否将该话题${topic.hot_at ? '取消热门' : '设为热门'}`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$api.topicHotToggle(topic.id).then(() => {
          this.Success()
          this.fetchData()
        }).catch(this.showApiError).finally(() => {

        })
      }).catch(() => {
        this.Info('cancel-operation')
      })
    },
    /* 关闭dialog */
    handleClose (done = null) {
      if (typeof done === 'function') {
        done()
      } else {
        this.$set(this, 'dialogVisible', false)
      }
      this.$set(this, 'edit', {})
    },
    editTopic (topic) {
      this.$set(this, 'edit', topic)
      this.$set(this, 'dialogVisible', true)
    },
    fetchData () {
      this.fetchTopics()
    },
    fetchTopics () {
      const { getting, query } = this
      if (!getting) {
        this.gLoading(true)
        this.$api.fetchTopics(query).then(({ data }) => {
          this.$set(this, 'page', data)
        }).catch(this.showApiError).finally(() => {
          this.gLoading(false)
        })
      }
    },
    destroyTopic (id) {
      const { deleting } = this
      this.$confirm('是否确认删除该话题，删除后无法恢复!', '提示', {
        type: 'warning'
      }).then(() => {
        if (!deleting) {
          this.$set(this, 'deleting', id)
          this.$api.destroyTopic(id).then(() => {
            this.Success()
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'deleting', 0)
          })
        }
      }).catch(() => {
        this.Info(this.i18n('cancel-operation'))
      })
    },
    /* 创建话题 */
    createTopic () {
      const { saving, edit } = this
      if (!saving) {
        this.sLoading(true)
        const { id } = edit
        this.$set(this, 'uploading', id)
        const method = id ? 'updateTopic' : 'createTopic'
        this.$api[method](edit, id).then(() => {
          this.handleClose()
          this.Success()
          this.fetchData()
        }).catch(this.showApiError).finally(() => {
          this.sLoading(false)
          this.$set(this, 'uploading', 0)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
