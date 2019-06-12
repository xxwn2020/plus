<template>
  <el-main>
    <el-card shadow="never"
      class="box-card">
      <div slot="header"
        class="clearfix">
        <span>{{i18n('feeds')}}</span>
      </div>
      <el-form ref="form"
        :model="query"
        :inline="true"
      >
        <el-form-item>
          <el-input type="number"
            v-model="query.id"
            placeholder="动态ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword"
            placeholder="动态关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-autocomplete
            :fetch-suggestions="queryUsers"
            v-model="query.username"
            placeholder="发布者，模糊搜索"
            @select="selectUser"
            value-key="name"
            :debounce="500"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.pay">
            <el-option
              v-for="item in [{value: 'all', label: '全部'},{value: 'free', label: '免费动态'},{value: 'paid', label: '付费动态'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.top">
            <el-option
              v-for="item in [{value: 'all', label: '全部'},{value: 'no', label: '仅非置顶'},{value: 'yes', label: '仅已置顶'},{value: 'wait', label: '仅待审核'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.trashed">
            <el-option
              v-for="item in [{value: 0, label: '正常'},{value: 1, label: '回收站'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="getting"
            plain
            type="primary"
            @click="doSearch">筛选
          </el-button>
        </el-form-item>
      </el-form>
      <div>
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
        <div class="feeds"
          v-if="page.data.length > 0"
          v-loading="getting">
          <el-card shadow="hover"
            class="box-card"
            :key="feed.id"
            v-for="feed in page.data">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text"
                  class="button">操作按钮
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
        <div class="feeds noFeeds"
          v-else>
          还没有动态
        </div>
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
      </div>
    </el-card>
  </el-main>
</template>

<script>
import setQuery from '@/mixins/setQuery'

export default {
  mixins: [setQuery],
  name: 'Feeds',
  data: () => ({
    page: {
      data: []
    },
    query: {
      page: 1,
      limit: 15,
      user: null,
      id: '',
      keyword: '',
      pay: 'all',
      trashed: 0,
      top: 'all',
      username: ''
    },
    search: ''
  }),
  methods: {
    /* 使用远程搜索结果 */
    selectUser (user) {
      const { id, name } = user
      this.$set(this.query, 'user', id)
      this.$set(this, 'search', name)
    },
    /* 远程搜索用户 */
    queryUsers (queryString, cb) {
      const { search } = this
      if (!queryString || queryString === search) {
        cb([])
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
    fetchData () {
      this.fetchFeeds()
    },
    fetchFeeds () {
      const { query, getting } = this
      if (!getting) {
        this.gLoading(true)
        this.$api.fetchFeeds(query).then(({ data }) => {
          this.$set(this, 'page', data)
        }).catch(this.showApiError).finally(() => {
          this.gLoading(false)
        })
      }
    }
  }
}
</script>

<style scoped
  lang="scss">
  .feeds {
    width: 100%;
    min-height: 90px;

    &.noFeeds {
      color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
