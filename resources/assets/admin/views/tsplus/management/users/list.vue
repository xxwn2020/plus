<template>
  <el-card class="user-list-page">
    <div slot="header">
      <span>{{$t('admin.users.userList')}}</span>
      <el-button
        @click="goTo({name: 'management-users-add'})"
        style="float: right; padding: 3px 0"
        type="text"
      >{{$t('admin.users.create')}}
      </el-button>
    </div>
    <el-main>
      <el-form
        style="width: auto;"
        :inline="true"
        :model="query"
        ref="userFilterForm"
        label-width="80px"
      >
        <div class="form-item" v-for="field in formFileds.fields" :key="field.id">
          <el-input
            :placeholder="$t(`admin.${formFileds.module}.search.${field.id}`)"
            v-if="field.type === 'input'"
            v-model="query[field.id]"
          ></el-input>
          <el-cascader
            :placeholder="$t(`admin.${formFileds.module}.search.${field.id}`)"
            v-if="field.type === 'cascader'"
            :options="field.options"
            v-model="query[field.id]"
            @change="handleChange"
          ></el-cascader>
          <el-select
            :placeholder="$t(`admin.${formFileds.module}.search.${field.id}`)"
            v-if="field.type === 'select'"
            v-model="query[field.id]"
          >
            <el-option
              v-for="item in field.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-if="field.type === 'dateTimeRange'"
            v-model="dateTimeRange"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            :range-separator="field.options.rangeSeparator"
            :start-placeholder="$t('admin.startDateTime')"
            :end-placeholder="$t('admin.endDateTime')"
            align="right"
          ></el-date-picker>
        </div>
        <div>
          <el-button
            type="primary"
            :loading="loading"
            @click="doSearch()"
          >{{ $t('admin.search.root') }}
          </el-button>
        </div>
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
        :default-sort="defaultSort"
        @sort-change="sortChange"
        v-loading="loading"
        :data="users"
        border
        stripe
      >
        <el-table-column
          sortable="custom"
          fixed
          width="80"
          prop="id"
          :label="$t('admin.users.search.userId')"
        />
        <el-table-column width="100" prop="name" :label="$t('admin.users.search.name')"/>
        <el-table-column width="110" prop="phone" :label="$t('admin.users.search.phone')"/>
        <!-- <el-table-column width="120" prop="location" :label="$t('admin.users.search.location')"/> -->
        <el-table-column width="60" prop="sex" :label="$t('admin.users.search.sex.root')">
          <template
            slot-scope="scope"
          >{{scope.row.sex === 0 ? $t('admin.users.search.sex.hide ') : (scope.row.sex === 1 ?
            $t('admin.users.search.sex.male ') : $t('admin.users.search.sex.female '))}}
          </template>
        </el-table-column>
        <el-table-column width="120" prop="email" :label="$t('admin.users.search.email')"/>
        <el-table-column width="95" :label="$t('admin.users.search.createdAt')">
          <template slot-scope="scope">{{ scope.row.created_at | localTime}}</template>
        </el-table-column>
        <el-table-column
          width="120"
          prop="currency.sum"
          :label="$t('admin.users.search.currency')"
        />
        <el-table-column fixed="right" :label="$t('admin.operation')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="goTo({name: 'management-users-edit', params: {uid: scope.row.id}})"
            >{{$t('admin.edit')}}
            </el-button>
            <template>
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row.recommended === null"
                @click="handleRecommend(scope.row)"
              >{{ $t('admin.users.recommend') }}
              </el-button>
              <el-button
                v-else
                size="mini"
                type="danger"
                @click="handleUnRecommend(scope.row)"
              >{{ $t('admin.users.unrecommend') }}
              </el-button>
            </template>
            <template v-if="scope.row.famous === null">
              <el-button
                size="mini"
                type="primary"
                @click="handleFollowedFamous(scope.row, 1)"
              >{{ $t('admin.users.followTa') }}
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleFollowedFamous(scope.row, 2)"
              >{{ $t('admin.users.followEachOthers') }}
              </el-button>
            </template>
            <template v-else>
              <el-button
                size="mini"
                type="danger"
                @click="handleUnFamous(scope.row)"
              >{{ $t('admin.users.cancelFollow') }}
              </el-button>
            </template>
            <el-button
              v-if="!scope.row.deleted_at"
              size="mini"
              type="danger"
              @click="handleTrash(scope.row)"
            >{{$t('admin.users.disable')}}
            </el-button>
            <el-button
              v-else
              size="mini"
              type="primary"
              @click="handleRestore(scope.row)"
            >{{$t('admin.users.restore')}}
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
    </el-main>
  </el-card>
</template>

<script>
  import setQuery from '@/mixins/setQuery'

  const formFormatter = {
    module: 'users',
    fields: [
      {
        id: 'trashed',
        type: 'select',
        options: [
          {
            label: '正常用户',
            value: 0
          },
          {
            label: '禁用用户',
            value: 1
          }
        ]
      },
      {
        id: 'recommend',
        type: 'select',
        options: [
          {
            label: '全部',
            value: 0
          },
          {
            label: '推荐用户',
            value: 1
          }
        ]
      },
      {
        id: 'userId',
        type: 'input'
      },
      {
        id: 'email',
        type: 'input'
      },
      {
        id: 'name',
        type: 'input'
      },
      {
        id: 'role',
        type: 'select',
        options: [
          {
            label: '全部',
            value: 0
          }
        ]
      },
      {
        id: 'phone',
        type: 'input'
      },
      {
        id: 'dateTimeRange',
        type: 'dateTimeRange',
        options: {
          rangeSeparator: '至'
        }
      },
      // {
      //   id: "location",
      //   type: "cascader",
      //   options: []
      // },
      {
        id: 'follow',
        type: 'select',
        options: [
          {
            label: '全部',
            value: 0
          },
          {
            label: '注册时被关注',
            value: 1
          },
          {
            label: '注册时相互关注',
            value: 2
          }
        ]
      }
    ]
  }
  export default {
    name: 'ManagementUsersList',
    mixins: [setQuery],
    data: () => ({
      formFormatter,
      query: {
        userId: null,
        sort: 'down',
        email: null,
        name: null,
        role: 0,
        phone: null,
        regist_start_date: null,
        regist_end_date: null,
        location: null,
        perPage: 15,
        limit: 15,
        page: 1,
        follow: null,
        show_role: false,
        trashed: 0,
        recommend: 0
      },
      users: [],
      roles: [],
      page: {},
      loading: false
    }),
    computed: {
      formFileds () {
        return this.formFormatter
      },
      dateTimeRange: {
        get () {
          const {
            query: { regist_start_date, regist_end_date }
          } = this
          return [regist_start_date || '', regist_end_date || '']
        },
        set (to) {
          if (to) {
            this.$set(this.query, 'regist_start_date', to[0])
            this.$set(this.query, 'regist_end_date', to[1])
          } else {
            this.$set(this.query, 'regist_start_date', '')
            this.$set(this.query, 'regist_end_date', '')
          }
        }
      },
      trashed () {
        return ({ trashed = 0 } = this.$route.query || {})
      },
      defaultSort () {
        const {
          query: { sort }
        } = this
        return { prop: 'id', order: sort === 'up' ? 'ascending' : 'descending' }
      }
    },
    methods: {
      /* 更改排序 */
      sortChange (data) {
        const { prop, order } = data
        if (prop === 'id') {
          this.setQuery({ sort: order === 'ascending' ? 'up' : 'down' })
        }
      },
      /* 取消用户禁用 */
      handleRestore (user) {
        this.$api.users.restoreUser(user.id).then(() => {
          this.$notify({
            type: 'success',
            message: '用户已经启用！',
            title: '成功'
          })
          this.fetchData()
        }).catch(this.showApiError)
      },
      /* 禁用用户 */
      handleTrash (user) {
        this.$confirm(
          this.$t('admin.users.confirmDisable'),
          this.$t('admin.notice'),
          {
            confirmButtonText: this.$t('admin.confirm'),
            cancelButtonText: this.$t('admin.cancel'),
            type: 'warning'
          }
        ).then(() => {
          this.$api.users.del(user.id).then(() => {
            this.$message({
              type: 'success',
              message: '用户已被禁用！'
            })
            this.fetchData()
          }).catch(this.showApiError)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      /* 给mixin用的公共方法 */
      fetchData () {
        this.getUsers()
      },
      handleChange (value) {
        console.log(value)
      },
      /**
       * 获取列表用户.
       *
       * @author Seven Du <shiweidu@outlook.com>
       */
      getUsers () {
        const { loading, query, roles, showRole } = this
        if (loading) {
          return false
        }
        if (roles.length === 0) {
          query.show_role = true
        }
        this.loading = true
        this.$api.users.list(query).then(({ data }) => {
          const { users, roles: serverRoles, page } = data
          this.$set(this, 'users', users || [])
          this.$set(this, 'page', page)
          this.$set(this.query, 'show_role', false)
          if (roles.length === 0) {
            // 根据老的接口处理角色处理
            this.$set(this, 'roles', serverRoles)
            const roleField = this.formFormatter.fields.find(
              field => field.id === 'role'
            )
            let options = [{ label: '全部', value: 0 }]
            serverRoles.map(role => {
              options.push({
                label: role.display_name,
                value: role.id
              })
            })
            roleField.options = Array.from(new Set(options))
          }
        }).catch(this.show).finally(() => {
          this.$set(this, 'loading', false)
        })
      },
      /**
       * 推荐用户
       */
      handleRecommend (user) {
        this.$api.users.recommend(user.id).then(() => {
          this.$set(user, 'recommended', true)
        })
      },
      /**
       * 取消推荐
       */
      handleUnRecommend (user) {
        this.$api.users.unRecommend(user.id).then(() => {
          this.$set(user, 'recommended', null)
        })
      },
      /**
       * 设置用户是否在新用户注册时被新用户关注,或双向关注
       * @user 用户
       * @type 类型 1: 单向, 2: 双向
       */
      handleFollowedFamous (user, type) {
        this.$api.users.followedFamous(user.id, type).then(() => {
          this.$set(user, 'famous', true)
        }).catch(this.showApiError)
      },
      /**
       * 取消关注设置
       */
      handleUnFamous (user) {
        this.$api.users.unFamous(user.id).then(() => {
          this.$set(user, 'famous', null)
        }).catch(this.showApiError)
      },

      deleteUser (user) {
        if (window.confirm('确定要禁止用户吗？')) {
          this.$api.users.del(user.id).then(() => {
            this.doSearch()
          }).catch(this.showApiError)
        }
      }
    }
  }
</script>
<style lang="less">
  .user-list-page {
    .el-form {
      display: flex;
      margin-bottom: 20px;
      flex-wrap: wrap;

      .form-item {
        margin-right: 5px;
        margin-bottom: 20px;
      }
    }
  }
</style>

