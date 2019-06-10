<template>
  <el-main>
    <el-alert
      :title="$t('admin.storage.channels.channelIntro')"
      type="error"
      :closable="false"
    >
    </el-alert>

    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('admin.storage.channels.publicChannel')}}</span>
        <el-button plain style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <el-form v-loading="getLoading" ref="form" label-width="80px">
        <el-alert
          style="margin-bottom: 10px"
          :title="$t('admin.storage.channels.publicIntro')"
          type="warning"
          :closable="false"
          :show-icon="true"
        >
        </el-alert>
        <el-form-item :label="$t('admin.storage.filesystems.root')">
          <el-select v-model="filesystem" placeholder="请选择文件系统">
            <el-option
              v-for="fileSystem in filesystems"
              :key="fileSystem.value"
              :label="fileSystem.name"
              :value="fileSystem.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="savePublicChannel" :loading="saveLoading">{{$t('admin.submit')}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
  export default {
    name: 'channels',
    data: () => ({
      filesystem: '',
      getLoading: false,
      saveLoading: false
    }),
    computed: {
      filesystems () {
        return [
          { value: 'local', name: this.$t('admin.storage.channels.locate') },
          { value: 'AliyunOSS', name: this.$t('admin.storage.channels.AliOss') }
        ]
      }
    },
    methods: {
      /* 获取配置 */
      getPublicChannel () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getPublicChannel().then(({ data: { filesystem } }) => {
            this.$set(this, 'filesystem', filesystem)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      /* 保存配置 */
      savePublicChannel () {
        const { saveLoading, filesystem } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.savePublicChannel({ filesystem }).then(() => {
            this.showSuccess(this.$t('admin.success'))
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getPublicChannel()
    }
  }
</script>

<style scoped>

</style>
