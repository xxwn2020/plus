<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.storage.filesystems.basic')}}</span>
    </div>
    <el-form v-loading="getLoading" ref="defaultFileSystem">
      <el-form-item :label="$t('admin.storage.filesystems.root')">
        <el-alert
          :title="$t('admin.storage.filesystems.basicIntro')"
          :show-icon="true"
          :closable="false"
          type="warning">
        </el-alert>
        <el-select v-model="filesystem" placeholder="请选择默认的文件系统">
          <el-option
            v-for="filesystem in filesystems"
            :key="filesystem.value"
            :label="filesystem.name"
            :value="filesystem.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveDefaultFileSystem" :loading="saveLoading" type="primary">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'defaultFileSystem',
    data: () => ({
      filesystem: 'local',
      filesystems: [
        { value: 'local', name: '本地存储' },
        { value: 'AliyunOSS', name: '阿里云 OSS' }
      ],
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      /* 获取配置 */
      getDefaultFileSystem () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getDefaultFileSystem().then(({ data: { filesystem } }) => {
            this.$set(this, 'filesystem', filesystem)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }

      },
      /* 保存配置 */
      saveDefaultFileSystem () {
        const { saveLoading, filesystem } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveDefaultFileSystem({ filesystem }).then(() => {
            this.showSuccess(this.$t('admin.success'))
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getDefaultFileSystem()
    }
  }
</script>

<style scoped>

</style>
