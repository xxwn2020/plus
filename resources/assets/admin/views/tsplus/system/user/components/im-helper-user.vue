<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.userConfig.imHelper.root')}}</span>
    </div>
    <el-form v-loading="getLoading" label-width="120px">
      <el-form-item :label="$t('admin.userConfig.imHelper.label')">
        <el-autocomplete
          :fetch-suggestions="queryUsers"
          v-model="searched"
          placeholder="可模糊搜索用户名"
          @select="selectUser"
          value-key="name"
          :debounce="500"
        >
          <span slot="append">已设置用户ID: {{user}}</span>
        </el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveImHelper" :loading="saveLoading" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'im-helper-user',
    data: () => ({
      user: null,
      getLoading: false,
      saveLoading: false,
      searchedUsername: null,
      searched: null
    }),
    beforeMount () {
      this.getImHelper()
    },
    methods: {
      getImHelper () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.userConfig.getImHelper()
            .then(({ data: { user } }) => {
              this.$set(this, 'user', user)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      saveImHelper () {
        const { saveLoading, user } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.userConfig.saveImHelper({ user })
            .then(() => {
              this.showSuccess()
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
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
      /* 使用远程搜索结果 */
      selectUser (user) {
        const { id, name } = user
        this.$set(this, 'user', id)
        this.$set(this, 'searchedUsername', name)
      }
    }
  }
</script>

<style scoped>

</style>
