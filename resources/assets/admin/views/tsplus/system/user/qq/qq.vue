<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.userConfig.thirdParts.qq')}}</span>
    </div>
    <el-form v-loading="getLoading" ref="qqForm" :model="form" label-width="120px">
      <el-alert
        title="腾讯 QQ 登录需要配置的数据，请前往「QQ 互联: https://connect.qq.com」进行申请。"
        :show-icon="true"
        :closable="false"
        type="info">
      </el-alert>
      <el-form-item :label="$t('admin.userConfig.thirdParts.appID')" prop="appId">
        <el-input v-model="form.appId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.userConfig.thirdParts.appKEY')" prop="appKey">
        <el-input v-model="form.appKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="saveLoading" @click="saveVendorSetting" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'thirdParts-QQ',
    data: () => ({
      form: {
        appId: null,
        appKey: null
      },
      getLoading: false,
      saveLoading: false
    }),
    beforeMount () {
      this.getVendorSetting()
    },
    methods: {
      saveVendorSetting () {
        const { form, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.userConfig.saveVendorSetting({ params: form, type: 'qq' })
            .then(() => {
              this.showSuccess()
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
      },
      getVendorSetting () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.userConfig.getVendorSetting('qq')
            .then(({ data }) => {
              this.$set(this, 'form', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      }
    }
  }
</script>
