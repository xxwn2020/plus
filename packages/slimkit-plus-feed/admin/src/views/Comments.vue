<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header"
        class="clearfix">
        <span>{{i18n('comment')}}</span>
      </div>
      <el-form ref="form"
        :model="query"
        :inline="true">
        <el-form-item>
          <el-autocomplete class="inline-input"
            :fetch-suggestions="queryUsers"
            v-model="query.username"
            placeholder="发布者，模糊搜索"
            @select="selectUser"
            value-key="name"
            :debounce="500"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword"
            placeholder="评论关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.feed"
            placeholder="动态ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.type"
            placeholder="placeholder">
            <el-option
              v-for="item in dateTime"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="query.type === 'customer'">
          <el-date-picker
            v-model="startEndDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.top"
            placeholder="placeholder">
            <el-option
              v-for="item in [{value:'all', label:'全部'},{value:'no', label:'非置顶'},{value:'yes', label:'置顶'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="query.top === 'yes'">
          <el-select v-model="query.pinned_type"
            placeholder="placeholder">
            <el-option
              v-for="item in [{value: 'all', label:'全部'},{value: 'yes', label:'未过期'},{value: 'no', label:'已过期'},{value: 'customer', label:'自定义时间'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="query.pinned_type === 'customer'">
          <el-date-picker
            v-model="pinnedStartEndDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :loading="getting"
            @click="doSearch"
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
        v-loading="getting"
        :data="page.data"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="#ID"
          width="60">
        </el-table-column>
        <el-table-column
          prop="body"
          :label="i18n('comment-body')"
          width="160">
        </el-table-column>
        <el-table-column
          prop="user.name"
          :label="i18n('comment-creator')"
          width="120"
        >
        </el-table-column>
        <el-table-column
          :label="i18n('comment-datetime')"
          width="95"
        >
          <template slot-scope="{row:comment}">{{comment.created_at | localTime}}</template>
        </el-table-column>
        <el-table-column
          :label="i18n('comment-pinned-status')"
        >
          <template slot-scope="{row: comment}">
            {{formatPinned(comment.id)}}
          </template>
        </el-table-column>
        <el-table-column
          label="置顶截止"
          width="95"
        >
          <template slot-scope="{row: comment}">
            {{formatExpiresAt(comment)}}
          </template>
        </el-table-column>
        <el-table-column
          label="置顶费用"
        >
          <template slot-scope="{row: comment}">
            {{pinnedAmount(comment.id)}}
          </template>
        </el-table-column>
        <el-table-column
          :label="i18n('operation')"
        >
          <template slot-scope="{row: comment}">
            <el-tooltip class="item"
              :loading="editing === comment.id"
              effect="dark"
              :content="i18n('comment-set-pinned')"
              placement="top">
              <el-button type="primary"
                circle
                plain
                @click="pinnedComment(comment)"
                icon="el-icon-upload2"></el-button>
            </el-tooltip>
            <el-tooltip class="item"
              :loading="deleting === comment.id"
              effect="dark"
              content="删除评论"
              placement="top">
              <el-button type="danger"
                circle
                plain
                @click="deleteComment(comment)"
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
  </el-main>
</template>

<script>
import setQuery from '@/mixins/setQuery'

export default {
  name: 'Comments',
  mixins: [setQuery],
  data: () => ({
    page: {},
    dateTime: [
      {
        value: 'all',
        label: '全部'
      }, {
        value: 'today',
        label: '今天'
      }, {
        value: 'yesterday',
        label: '昨天'
      }, {
        value: 'week',
        label: '最近一周'
      }, {
        value: 'lastDay',
        label: '截止昨天'
      }, {
        value: 'customer',
        label: '自定义时间'
      }
    ],
    pinnedStartEndDate: [],
    query: {
      limit: 15,
      page:
        1,
      target_user:
        null,
      user_id:
        null,
      id:
        null,
      feed:
        null,
      keyword:
        null,
      top:
        'all',
      stime:
        '',
      etime:
        '',
      pinned_stime:
        '',
      pinned_etime:
        '',
      type:
        'all',
      pinned_type:
        'all',
      username:
        null
    },
    startEndDate: [],
    editing: 0,
    deleting:
      0,
    search:
      ''
  }),
  beforeMount () {
    const { $route: { query: { top = 'all', pinned_etime: pinnedEtime = '', pinned_stime: pinnedStime = '', user_id: userId = null, target_user: targetUser = '', stime = '', etime = null, type = 'all', pinned_type: pinnedType = 'all', keyword = '', feed = null } = {} } = {} } = this
    this.$set(this, 'startEndDate', [stime || '', etime || ''])
    this.$set(this, 'pinnedStartEndDate', [pinnedStime || '', pinnedEtime || ''])
    this.$set(this, 'query', {
      ...this.query,
      pinned_etime: pinnedEtime,
      pinned_stime: pinnedStime,
      user_id: userId,
      target_user: targetUser,
      stime,
      etime,
      keyword,
      feed,
      type,
      pinned_type: pinnedType,
      top
    })
  },
  watch: {
    'query.username' (to) {
      if (!to) {
        this.$set(this.query, 'user_id', null)
      }
    },
    startEndDate (to) {
      const [stime = null, etime = null] = to || []
      this.$set(this, 'query', {
        ...this.query,
        stime,
        etime
      })
    },
    pinnedStartEndDate (to) {
      const [pinned_stime = null, pinned_etime = null] = to || []
      this.$set(this, 'query', {
        ...this.query,
        pinned_stime,
        pinned_etime
      })
    },
    'query.pinned_type' (to) {
      if (to !== 'customer') {
        this.$set(this, 'query', {
          ...this.query,
          pinned_stime: '',
          pinned_etime: ''
        })
      }
    },
    'query.top' (to) {
      if (to !== 'top') {
        this.$set(this, 'query', {
          ...this.query,
          pinned_type: 'all'
        })
      }
    }
  },
  methods: {
    /* 使用远程搜索结果 */
    selectUser (user) {
      const { id, name } = user
      this.$set(this.query, 'user_id', id)
      this.$set(this, 'search', name)
    },
    /* 远程搜索用户 */
    queryUsers (queryString, cb) {
      const { search } = this
      if (!queryString || queryString === search) {
        cb(new Array(0))
        return false
      }
      this.$api.users({ name: queryString }).then(({ data: { users } }) => {
        cb(users)
        if (!users.length) {
          this.$message({
            type: 'info',
            message: '没有找到用户'
          })
        }
      })
    },
    /* 设置置顶 */
    pinnedComment (comment) {
      const status = this.formatPinned(comment.id, true)
      const pinned = this.page.pinneds.find(p => (p.target === comment.id)) || {}
      switch (status) {
        case 'none':
        case 'expired':
          this.$prompt('请输入置顶评论的天数', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder: '输入大于0并且是整数的天数',
            inputPattern: /^[1-9]\d*$/,
            inputErrorMessage: '请输入正整数'
          }).then(({ value }) => {
            this.setPinned(comment.id, value)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
          break
        case 'waiting':
          this.$confirm(`是否同意该评论的置顶申请`, '提示', {
            confirmButtonText: '同意',
            cancelButtonText: '驳回',
            distinguishCancelAndClose: true,
            type: 'warning'
          }).then(() => {
            // 同意置顶
            this.$api.acceptCommentPinned(comment.id, pinned.id).then(() => {
              this.Success()
              this.fetchData()
            }).catch(this.showApiError).finally(() => {

            })
          }).catch(action => {
            // 驳回置顶申请
            if (action === 'cancel') {
              this.sLoading(true)
              this.$api.rejectCommentPinned(pinned.id).then(() => {
                this.Success()
                this.fetchData()
              }).catch(this.showApiError).finally(() => {
                this.sLoading(false)
              })
            } else {
              this.$message.info('取消操作')
            }
          })
          break
        case 'acting':
          this.$confirm('是否要将此评论撤销置顶?', '提示', {
            type: 'warning'
          }).then(() => {
            this.$api.rejectCommentPinned(pinned.id).then(() => {
              this.Success()
              this.fetchData()
            }).catch(this.showApiError).finally(() => {

            })
          }).catch(() => {
            this.Info('取消操作')
          })
          break
      }
    },
    setPinned (id, day) {
      if (!day) {
        this.$notify({
          title: '错误',
          message: '请输入置顶天数',
          type: 'error'
        })
        return
      }

      this.sLoading(true)
      this.$api.pinnedComment(id, day).then(({ data }) => {
        this.Success(data)
        this.fetchData()
      }).catch(this.showApiError).finally(() => {
        this.sLoading(false)
      })
    },
    formatExpiresAt (comment) {
      const { page: { pinneds = [] } } = this
      if (pinneds.length === 0) {
        return status ? 'none' : this.i18n('comment-not-pinned')
      }
      const pinned = pinneds.find(p => (p.target === comment.id)) || {}
      if (Object.keys(pinned).length === 0) {
        return '未置顶'
      }
      if (pinned.expires_at === null) {
        return '待审核'
      }
      // 置顶未过期
      return this.toLocalTime(pinned.expires_at)
    },
    /* 计算置顶状态 */
    formatPinned (id, status = false) {
      const { page: { pinneds = [] } } = this
      if (pinneds.length === 0) {
        return status ? 'none' : this.i18n('comment-not-pinned')
      }
      const pinned = pinneds.find(p => (p.target === id)) || {}
      if (Object.keys(pinned).length === 0) {
        return status ? 'none' : this.i18n('comment-not-pinned')
      }
      if (pinned.expires_at === null) {
        return status ? 'waiting' : this.i18n('comment-pinned-waiting')
      }
      // 置顶未过期
      if (new Date(pinned.expires_at) > new Date()) {
        return status ? 'acting' : this.i18n('comment-pinned-acting')
      } else {
        return status ? 'expired' : this.i18n('comment-pinned-expired')
      }
    },
    fetchData () {
      this.fetchComments()
    },
    fetchComments () {
      const { query, getting } = this
      if (!getting) {
        this.gLoading(true)
        this.$api.fetchComments(query).then(({ data }) => {
          this.$set(this, 'page', data)
        }).catch(this.showApiError).finally(() => {
          this.gLoading(false)
        })
      }
    },
    pinnedAmount (id) {
      const { page: { pinneds = [] } = {} } = this
      const { amount = null } = pinneds.find(p => (p.target === id)) || {}
      return amount === 0 ? '管理员置顶' : (amount === null ? '' : amount)
    },
    deleteComment ({ id }) {
      this.$confirm('确定要删除此评论吗？', '提示', {
        type: 'warning'
      }).then(() => {
        const { deleting } = this
        if (!deleting) {
          this.$set(this, 'deleting', id)
          this.$api.deleteComment(id).then(() => {
            this.Success()
            this.fetchData()
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'deleting', 0)
          })
        }
      }).catch(() => {
        this.Info('已取消')
      })
    }
  }
}
</script>

<style scoped>

</style>
