<template>
  <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
    <el-alert
      title="本地磁盘不会将文件存放在公开目录，文件将存放在 storage/app 目录下，你需要使用其他方式部署静态资源访问服务，部署完成后将访问地址填入此处。"
      type="warning"
      :show-icon="true"
      :closable="false"
    >
    </el-alert>
    <el-form-item label="公开地址" prop="public">
      <el-input v-model="form.public" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button plain :loading="saveLoading" @click="saveLocalConfiguration" type="primary">{{$t('admin.submit')}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'local',
    data: () => ({
      form: {
        public: null
      },
      saveLoading: false,
      getLoading: false
    }),
    methods: {
      /* 保存配置 */
      saveLocalConfiguration () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveLocalFileSystemConfiguration(form, 'local').then(({ data }) => {
            this.showSuccess(data)
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      getLocalConfiguration () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getLocalFileSystemConfiguration('local').then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getLocalConfiguration()
    }
  }
</script>

<style scoped>

</style>
