<template>
  <el-card :body-style="{ padding: '0px' }">
    <div slot="header">
      <span>{{ $t('admin.users.edit') }}</span>
      <el-button @click="goBack(true)" style="float: right; padding: 3px 0" type="text">返回列表</el-button>
    </div>
    <el-main>
      <el-form :model="user" ref="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="账号密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-checkbox-group v-model="selecedRoles" >
            <el-checkbox
              :border="true"
              v-for="role in roles"
              :key="role.id"
              :label="role.id"
            >{{role.display_name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-loading="loading" @click="updateUser">修改</el-button>
          <el-button @click="goBack(true)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-card>
</template>
<script>
  export default {
    name: 'ManagementUsersEdit',
    data: () => ({
      user: {},
      roles: [],
      selecedRoles: [],
      password: null,
      loading: false
    }),
    methods: {
      getUser () {
        const { uid, loading } = this
        this.$api.users.get(uid, { show_role: 1 }).then(({ data: { user, roles } }) => {
          this.$set(this, 'user', user)
          this.$set(this, 'roles', roles)
          user.roles.forEach(role => this.selecedRoles.push(role.id))
        }).finally(() => {
          this.$set(this, 'loading', false)
        })
      },
      updateUser () {
        this.changeIn = true
        const {
          user: { id, name, phone, email },
          loading,
          selecedRoles: roles,
          password,
          uid
        } = this
        if (loading) {
          return false
        }
        this.$api.users.save({ name, phone, email, password, roles }, uid).then(({ data }) => {
          this.showSuccess(data)
          this.goBack()
        }).catch(this.showApiError).finally(() => {
          this.$set(this, 'loading', false)
        })
      }
    },
    computed: {
      uid () {
        const {
          params: { uid = 0 }
        } = this.$route
        return parseInt(uid)
      }
    },
    mounted () {
      this.getUser()
    }
  }
</script>

