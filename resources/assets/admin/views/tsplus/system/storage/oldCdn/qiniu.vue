<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>七牛</span>
    </div>
    <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
      <cdn-select-module :handle-select="handleSelect" :value="value"/>
      <el-form-item label="域名" prop="domain">
        <el-alert
          title="设置「七牛」的 CDN 或者储存空间访问域名，必须携带访问协议。"
          :closable="false"
          type="warning">
        </el-alert>
        <el-input v-model="form.domain" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="签名" prop="sign">
        <el-alert
          title="设置资源地址是否需要签名"
          :closable="false"
          type="warning">
        </el-alert>
        <el-select v-model="form.sign" placeholder="placeholder">
          <el-option
            v-for="item in [{value: true, label: '私有'},{value: false, label: '公开'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Access Key" prop="ak">
        <el-input v-model="form.ak" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="Secret Key" prop="sk">
        <el-input v-model="form.sk" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-alert
          title="选择七牛平台使用类型。"
          :closable="false"
          type="warning">
        </el-alert>
        <el-select v-model="form.type" placeholder="placeholder">
          <el-option
            v-for="item in [{value: 'object', label: '对象存储'},{value: 'cdn', label: '融合CDN'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签字期限" prop="expires">
        <el-input v-model="form.expires" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveQiniuConfiguration" :loading="saveLoading" type="primary">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import CdnSelectModule from './select'

  export default {
    name: 'qiniu',
    components: { CdnSelectModule },
    props: {
      value: {
        required: true,
        type: String
      },
      handleSelect: { type: Function, required: true }
    },
    data: () => ({
      form: {
        domain: '',
        sign: false,
        ak: '',
        sk: '',
        expires: 3600,
        type: 'object',
        bucket: null
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      getQiniuConfiguration () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getCdnConfiguration('qiniu').then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }

      },
      saveQiniuConfiguration () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveCdnConfiguration(form, 'qiniu').then(({ data }) => {
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getQiniuConfiguration()
    }
  }
</script>

<style scoped>

</style>
