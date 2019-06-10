<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('admin.storage.basic.picture') }}</span>
    </div>
    <el-form v-loading="getLoading" ref="imageForm" :model="form">
      <el-alert
        :title="$t('admin.storage.basic.dimension')"
        :closable="false"
        :show-icon="true"
        type="warning">
      </el-alert>
      <el-form-item :label="$t('admin.storage.basic.minWidth')">
        <el-input v-model.number="form.width.min" placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.storage.basic.maxWidth')">
        <el-input v-model.number="form.width.max" placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.storage.basic.minHeight')">
        <el-input v-model.number="form.height.min" placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="$t('admin.storage.basic.minHeight')">
        <el-input v-model.number="form.height.max" placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="saveLoading" @click="saveImageDimension" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'pictureControl',
    data: () => ({
      form: {
        width: {
          min: 0,
          max: 0
        },
        height: {
          min: 0,
          max: 0
        }
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      /* 获取服务端设置 */
      getImageDimension () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getImageDimension().then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      /* 保存设置 */
      saveImageDimension () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveImageDimension(form).then(() => {
            this.showSuccess(this.$t('admin.success'))
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getImageDimension()
    }
  }
</script>

<style scoped>

</style>
