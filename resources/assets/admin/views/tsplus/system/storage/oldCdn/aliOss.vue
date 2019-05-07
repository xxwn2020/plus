<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>Ali Oss</span>
    </div>
    <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
      <cdn-select-module :handle-select="handleSelect" :value="value"/>
      <el-form-item label="存储空间" prop="bucket">
        <el-input v-model="form.bucket" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="访问域名" prop="endpoint">
        <el-alert
          title="设置「阿里云-对象存储」的存储空间对应的访问域名(endpoint)。"
          :closable="false"
          type="warning">
        </el-alert>
        <el-input v-model="form.endpoint" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="Access Key" prop="AccessKeyId">
        <el-input v-model="form.AccessKeyId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="Secret Key" prop="AccessKeySecret">
        <el-input v-model="form.AccessKeySecret" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="是否加速" prop="isPublic">
        <el-radio-group v-model="form.isCname">
          <el-radio :label="true">已开启</el-radio>
          <el-radio :label="false">未开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否公开" prop="isPublic">
        <el-radio-group v-model="form.isPublic">
          <el-radio :label="true">公开</el-radio>
          <el-radio :label="false">私有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="SSL" prop="ssl">
        <el-alert
          title="是否开启SSL协议"
          :closable="false"
          type="warning">
        </el-alert>
        <el-select v-model="form.ssl" placeholder="placeholder">
          <el-option
            v-for="item in [{value: true, label: '开启'},{value: false, label: '关闭'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权期限" prop="expires">
        <el-input :disabled="true" v-model="form.expires" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveAliOssConfiguration" :loading="saveLoading" type="primary">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import CdnSelectModule from './select'

  export default {
    components: { CdnSelectModule },
    name: 'aliOss',
    props: {
      value: {
        required: true,
        type: String
      },
      handleSelect: { type: Function, required: true }
    },
    data: () => ({
      form: {
        bucket: null,
        ssl: true,
        isPublic: false,
        isCname: false,
        expires: 3600,
        AccessKeyId: null,
        AccessKeySecret: null,
        endpoint: null
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      getAliOssConfiguration () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getCdnConfiguration('alioss').then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      saveAliOssConfiguration () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveCdnConfiguration(form, 'alioss').then(({ data }) => {
            this.showSuccess(data)
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getAliOssConfiguration()
    }
  }
</script>

<style scoped>

</style>
