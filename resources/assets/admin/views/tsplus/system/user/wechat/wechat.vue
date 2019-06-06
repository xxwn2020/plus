<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.userConfig.thirdParts.wechat')}}</span>
    </div>
    <el-form v-loading="getLoading" ref="wechatForm" :model="form" label-width="120px">
      <el-alert
        title="该项用于在APP使用微信登录需要配置的数据，请前往「微信开放平台: https://open.weixin.qq.com」进行申请。"
        :show-icon="true"
        :closable="false"
        type="info">
      </el-alert>
      <el-form-item :label="$t('admin.userConfig.thirdParts.appID')" prop="appKey">
        <el-input v-model="form.appKey"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.userConfig.thirdParts.appKEY')" prop="appSecret">
        <el-input v-model="form.appSecret"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain="" :loading="saveLoading" @click="saveVendorSetting" type="primary">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'thirdParts-QQ',
    data: () => ({
      form: {
        appKey: null,
        appSecret: null
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
          this.$api.userConfig.saveVendorSetting({ params: form, type: 'wechat' }).then(() => {
            this.showSuccess()
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      getVendorSetting () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.userConfig.getVendorSetting('wechat').then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    }
  }
</script>
