<template>
  <el-card style="margin-top: 20px" shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.storage.filesystems.local')}}</span>
    </div>
    <el-form v-loading="getLoading" :model="form" ref="AliOSS">
      <el-form-item label="AliOSS Bucket" prop="bucket">
        <el-input v-model="form.bucket" placeholder="Ali Oss Bucket 名字"></el-input>
      </el-form-item>
      <el-form-item label="AccessKey" prop="accessKeyId">
        <el-input v-model="form.accessKeyId" placeholder="阿里云AccessKey"></el-input>
      </el-form-item>
      <el-form-item label="accessKeySecret" prop="accessKeySecret">
        <el-input v-model="form.accessKeySecret" placeholder="阿里云accessKeySecret"></el-input>
      </el-form-item>
      <el-form-item prop="acl" label="Bucket读写权限">
        <el-alert
          title="请选择与AliOSS管控台相同的权限"
          :show-icon="true"
          :closable="false"
          type="warning">
        </el-alert>
        <el-select v-model="form.acl" placeholder="Bucket读写权限">
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="domain" label="AliOSS外网域名">
        <el-input v-model="form.domain" placeholder="外网域名"></el-input>
      </el-form-item>

      <el-form-item prop="insideDomain" label="AliOSS内网域名">
        <el-alert
          title="请绝对保持服务器与OSS在同一可用区域，否则会出访问速度很慢的情况"
          :show-icon="true"
          :closable="false"
          type="warning">
        </el-alert>
        <el-input v-model="form.insideDomain" placeholder="内网域名"></el-input>
      </el-form-item>
      <el-form-item prop="timeout" :label="$t('admin.storage.filesystems.expiresTime')">
        <el-alert
          title="过期时间用于上传的签名有效期，如果是私有读写权限，也是文件签字有效期。"
          :show-icon="true"
          :closable="false"
          type="warning">
        </el-alert>
        <el-input v-model.number="form.timeout"
                  :placeholder="$t('admin.storage.filesystems.expiresTimePlaceholder')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="saveAliOssConfiguration" :loading="saveLoading" type="primary">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'AliOss',
    data: () => ({
      form: {
        accessKeyId: null,
        accessKeySecret: null,
        bucket: null,
        acl: 'public-read',
        timeout: 3600,
        domain: null,
        insideDomain: null
      },
      saveLoading: false,
      getLoading: false
    }),
    computed: {
      options () {
        return [
          {
            value: 'private',
            label: '私有'
          },
          {
            value: 'public-read',
            label: '公共读'
          },
          {
            value: 'public-read-write',
            label: '公共读写'
          }
        ]
      }
    },
    methods: {
      /* 获取配置 */
      getAliOssConfiguration () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getAliOssConfiguration().then(({ data }) => {
            this.$set(this, 'form', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }

      },
      /* 保存配置 */
      saveAliOssConfiguration () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveAliOssConfiguration(form).then(() => {
            this.showSuccess(this.$t('admin.success'))
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
