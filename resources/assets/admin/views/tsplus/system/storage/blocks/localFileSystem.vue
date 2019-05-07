<template>
  <el-card shadow="never" style="margin-top: 20px" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.storage.filesystems.local')}}</span>
    </div>
    <el-form v-loading="getLoading" ref="defaultFileSystem">
      <el-form-item :label="$t('admin.storage.filesystems.disk')">
        <el-alert
          :title="$t('admin.storage.filesystems.diskIntro')"
          :show-icon="true"
          :closable="false"
          type="warning">
        </el-alert>
        <el-select v-model="disk" placeholder="请选择要使用的磁盘">
          <el-option
            v-for="disk in disks"
            :key="disk"
            :label="disk"
            :value="disk">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('admin.storage.filesystems.expiresTime')">
        <el-alert
          :title="$t('admin.storage.filesystems.eTIntro')"
          :show-icon="true"
          :closable="false"
          type="warning">
        </el-alert>
        <el-input v-model.number="timeout"
                  :placeholder="$t('admin.storage.filesystems.expiresTimePlaceholder')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveLocalFileSystem" :loading="saveLoading" type="primary">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'localFileSystem',
    data: () => ({
      disk: null,
      disks: [],
      timeout: null,
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      /* 获取配置 */
      getLocalFileSystem () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getLocalFileSystem().then(({ data: { disk, disks, timeout } }) => {
            this.$set(this, 'disk', disk)
            this.$set(this, 'disks', disks)
            this.$set(this, 'timeout', timeout)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }

      },
      /* 保存配置 */
      saveLocalFileSystem () {
        const { saveLoading, disk, timeout } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveLocalFileSystem({ disk, timeout }).then(() => {
            this.showSuccess(this.$t('admin.success'))
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getLocalFileSystem()
    }
  }
</script>

<style scoped>

</style>
