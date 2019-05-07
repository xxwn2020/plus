<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>本地存储</span>
    </div>
    <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
      <cdn-select-module :handle-select="handleSelect" :value="value"/>
      <el-form-item label="磁盘" prop="disk">
        <el-select v-model="form.disk">
          <el-option
            v-for="item in [{ value: 'local', label: '本地'},{value: 'public', label: '本地公开'},{value: 's3', label: 'Amazon S3'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <public-file-system v-if="form.disk === 'public'"/>
      <local-file-system v-else-if="form.disk === 'local'"/>
      <s3 v-else-if="form.disk === 's3'"/>
    </el-form>
  </el-card>
</template>

<script>
  import CdnSelectModule from './select'
  import S3 from './localFileSystem/s3'
  import LocalFileSystem from './localFileSystem/local'
  import PublicFileSystem from './localFileSystem/public'

  export default {
    components: { CdnSelectModule, S3, LocalFileSystem, PublicFileSystem },
    name: 'local',
    data: () => ({
      form: {
        disk: null
      },
      getLoading: false
    }),
    props: {
      value: {
        required: true,
        type: String
      },
      handleSelect: { type: Function, required: true }
    },
    methods: {
      getLocalConfiguration () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getLocalConfiguration().then(({ data: { disk } }) => {
            this.$set(this.form, 'disk', disk)
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
