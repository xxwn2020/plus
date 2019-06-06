<template>
  <div class="clients">
    <el-main>
      <el-card v-loading="getLoading" shadow="never" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{$t('admin.client.root')}}</span>
        </div>
        <el-form ref="clientSettings" :model="settings" label-width="120px">
          <el-form-item :label="$t('admin.client.web.open')" prop="web.open">
            <el-radio-group v-model="settings.web.open">
              <el-radio border :label="true">{{$t('admin.state.open')}}</el-radio>
              <el-radio border :label="false">{{$t('admin.state.close')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('admin.client.web.url')" prop="web.url">
            <el-input v-model="settings.web.url" :placeholder="$t('admin.client.web.url')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('admin.client.spa.open')" prop="spa.open">
            <el-radio-group v-model="settings.spa.open">
              <el-radio border :label="true">{{$t('admin.state.open')}}</el-radio>
              <el-radio border :label="false">{{$t('admin.state.close')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('admin.client.spa.url')" prop="spa.url">
            <el-input v-model="settings.spa.url" :placeholder="$t('admin.client.spa.url')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain type="primary" @click="saveClientSetting" :loading="saveLoading">{{$t('admin.submit')}}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </div>
</template>
<script>
  export default {
    data: () => ({
      settings: {
        web: { open: false, url: null },
        spa: { open: false, url: null }
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      /* 获取配置 */
      getClient () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.client.list().then(({ data }) => {
            this.$set(this, 'settings', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      /* 保存 */
      saveClientSetting () {
        const { saveLoading, settings } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.client.saveClientSetting(settings).then(() => {
            this.showSuccess()
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getClient()
    }
  }
</script>
