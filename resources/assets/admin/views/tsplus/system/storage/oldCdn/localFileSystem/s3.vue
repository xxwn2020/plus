<template>
  <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
    <el-alert
      title="在使用 AWS S3 之前，你需要使用 Composer 安装相应的支持软件包： league/flysystem-aws-s3-v3"
      :show-icon="true"
      :closable="false"
      type="error">
    </el-alert>
    <el-form-item label="Key" prop="key">
      <el-input v-model="form.key" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="Secret" prop="secret">
      <el-input v-model="form.secret" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="Region" prop="region">
      <el-input v-model="form.region" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="Bucket" prop="bucket">
      <el-input v-model="form.bucket" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="saveS3Configuration" type="primary">{{$t('admin.submit')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 's3',
    data: () => ({
      form: {
        key: null,
        secret: null,
        region: null,
        bucket: null
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      /* 保存配置 */
      saveS3Configuration () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveLocalFileSystemConfiguration(form, 's3').then(({ data }) => {
            this.showSuccess(data)
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      getS3Configuration () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getLocalFileSystemConfiguration('s3').then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getS3Configuration()
    }
  }
</script>

<style scoped>

</style>
