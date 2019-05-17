<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.userConfig.thirdParts.wechatMp')}}</span>
    </div>
    <el-form v-loading="getLoading" ref="mpForm" :model="form" label-width="120px">
      <el-alert
        title="该项用于在微信中打开h5页面时使用微信登录需要配置的数据，请前往「微信公众平台: https://mp.weixin.qq.com」进行申请。"
        :show-icon="true"
        :closable="false"
        type="info">
      </el-alert>
      <el-form-item :label="$t('admin.userConfig.thirdParts.appID')" prop="appId">
        <el-input v-model="form.appid"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.userConfig.thirdParts.secret')" prop="appKey">
        <el-input v-model="form.secret"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="saveLoading" @click="saveVendorSetting" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'thirdParts-QQ',
    data: () => ({
      form: {
        appid: null,
        secret: null
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
          this.$api.userConfig.saveVendorSetting({ params: form, type: 'wechat-mp' })
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
          this.$api.userConfig.getVendorSetting('wechat-mp')
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
