<template>
  <div>
    <user-group style="margin-bottom: 20px"></user-group>
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('admin.userConfig.config')}}</span>
      </div>
      <el-form v-loading="getLoading" ref="userConfigForm" style="max-width: 60%" :model="form" label-width="160px">
        <el-form-item :label="$t('admin.userConfig.register.method')" prop="method">
          <el-radio-group v-model="form.method" size="mini">
            <el-radio border label="all">开放注册</el-radio>
            <el-radio border disabled label="invited">仅邀请注册</el-radio>
            <el-radio border disabled label="thirdPart">仅三方注册</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('admin.userConfig.register.type')" prop="type">
          <el-radio-group v-model="form.type" size="mini">
            <el-radio border label="mobile-only">仅手机</el-radio>
            <el-radio border label="mail-only">仅邮箱</el-radio>
            <el-radio border label="all">手机或邮箱或第三方</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('admin.userConfig.register.fixed')" prop="fixed">
          <el-radio-group v-model="form.fixed" size="mini">
            <el-radio border :label="true">注册时强制完善</el-radio>
            <el-radio border :label="false">不需要强制完善</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('admin.userConfig.register.showTerms')" prop="showTerms">
          <el-radio-group v-model="form.showTerms" size="mini">
            <el-radio border :label="true">开启</el-radio>
            <el-radio border :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('admin.userConfig.register.terms')" prop="content">
          <el-input v-model="form.content" placeholder="支持markdown" type="textarea"
                    :autosize="{minRows: 3, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="saveLoading" @click="saveUserConfig" type="primary">{{$t('admin.submit')}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import UserGroup from './components/userGroup'

  export default {
    components: { UserGroup },
    name: 'config',
    data: () => ({
      form: {
        showTerms: false,
        fixed: 'need',
        method: 'all',
        type: 'all',
        content: ''
      },
      getLoading: false,
      saveLoading: false
    }),
    beforeMount () {
      this.getUserConfig()
    },
    methods: {
      getUserConfig () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.userConfig.getUserConfig()
            .then(({ data }) => {
              this.$set(this, 'form', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      saveUserConfig () {
        const { form, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.userConfig.saveUserConfig(form)
            .then(({ data }) => {
              this.showSuccess(data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
