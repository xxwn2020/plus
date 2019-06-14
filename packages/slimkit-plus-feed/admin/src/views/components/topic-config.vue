<template>
  <el-card shadow="never"
    class="box-card">
    <div slot="header"
      class="clearfix">
      <span>{{i18n('topics-config')}}</span>
    </div>
    <el-form v-loading="getting"
      ref="topicConfig"
      :model="config"
      label-width="80px">
      <el-form-item :label="i18n('topics-review-switch')"
        prop="switch">
        <el-alert
          :title="i18n('review-intro')"
          :closable="false"
          type="info">
        </el-alert>
        <el-switch v-model="config.switch"
          :active-text="i18n('open')"
          :inactive-text="i18n('close')"
          active-color="#13ce66"
          inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          :loading="saving"
          @click="saveTopicConfiguration"
          plain>{{i18n('save')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'topic-config',
  data: () => ({
    config: {}
  }),
  created () {
    this.fetchConfig()
  },
  methods: {
    fetchConfig () {
      const { getting } = this
      if (!getting) {
        this.gLoading(true)
        this.$api.topicConfiguration().then(({ data }) => {
          this.$set(this, 'config', data)
        }).catch(this.showApiError).finally(() => {
          this.gLoading(false)
        })
      }
    },
    saveTopicConfiguration () {
      const { saving, config } = this
      if (!saving) {
        this.sLoading(true)
        this.$api.saveTopicConfiguration(config).then(({ data }) => {
          this.Success()
        }).catch(this.showApiError).finally(() => {
          this.sLoading(false)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
