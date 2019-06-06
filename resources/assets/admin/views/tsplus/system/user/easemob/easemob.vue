<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.userConfig.thirdParts.easemob')}}</span>
    </div>
    <el-form v-loading="getLoading" ref="easemobForm" :model="form" label-width="120px">
      <el-alert
        title="环信配置用于用户间的即时聊天，你需要去「环信官网：http://www.easemob.com/」注册帐号、创建应用后将应用信息填入次页。"
        :show-icon="true"
        :closable="false"
        type="info">
      </el-alert>
      <el-form-item :label="$t('admin.userConfig.thirdParts.switch')" prop="open">
        <el-select v-model="form.open">
          <el-option
            v-for="item in [{label: '开启', value: true},{label: '关闭', value: false}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('admin.userConfig.thirdParts.appKEY')" prop="appId">
        <el-input v-model="form.appKey"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.userConfig.thirdParts.clientId')" prop="clientId">
        <el-input v-model="form.clientId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.userConfig.thirdParts.clientSecret')" prop="clientSecret">
        <el-input v-model="form.clientSecret"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.userConfig.thirdParts.registerType')" prop="registerType">
        <el-select v-model="form.registerType">
          <el-option
            v-for="item in [{label: '授权注册', value: 1},{label: '开放注册', value: 0}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="saveLoading" @click="saveVendorSetting" type="primary">{{$t('admin.submit')}}
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
        open: false,
        appKey: '',
        clientId: '',
        clientSecret: '',
        registerType: 0
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
          this.$api.userConfig.saveVendorSetting({ params: form, type: 'easemob' }).then(() => {
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
          this.$api.userConfig.getVendorSetting('easemob').then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    }
  }
</script>
