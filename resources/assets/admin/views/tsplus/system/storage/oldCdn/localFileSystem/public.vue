<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item>
      <el-button plain @click="savePublicConfiguration" :loading="saveLoading" type="primary">{{$t('admin.submit')}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'public',
    data: () => ({
      form: {},
      saveLoading: false
    }),
    methods: {
      savePublicConfiguration () {
        const { saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveLocalFileSystemConfiguration({}, 'public').then(({ data }) => {
            this.showSuccess(data)
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
