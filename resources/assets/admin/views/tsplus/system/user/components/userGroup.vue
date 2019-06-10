<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>默认用户组</span>
    </div>
    <el-form v-loading="getLoading" label-width="120px">
      <el-form-item label="默认用户组">
        <el-alert
          title="选择用户注册成功后的默认用户组"
          :closable="false"
          type="info">
        </el-alert>
        <el-select v-model="role" placeholder="placeholder">
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.display_name"
            :value="role.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="saveLoading" @click="saveUserRole" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'userGroup',
    data: () => ({
      roles: [],
      role: null,
      getLoading: false,
      saveLoading: false
    }),
    beforeMount () {
      this.getUserRole()
    },
    methods: {
      saveUserRole () {
        const { role, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.userConfig.saveUserRole({ role }).then(({ data }) => {
            this.showSuccess(data)
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      getUserRole () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.userConfig.getUserRole().then(({ data: { roles, current_role } }) => {
            this.$set(this, 'roles', roles)
            this.$set(this, 'role', current_role)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
