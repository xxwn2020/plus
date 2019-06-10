<template>
  <el-card shadow="never" class="add-certificated-page">
    <div slot="header">
      <span>{{ $t('admin.certifications.add') }}</span>
    </div>
      <el-form :rules="rules" :model="certificated" ref="certificated" label-width>
        <el-form-item prop="username" :label="$t('admin.username')">
          <el-autocomplete
            :fetch-suggestions="queryUsers"
            v-model="certificated.username"
            placeholder="可模糊搜索用户名"
            @select="selectUser"
            value-key="name"
            :debounce="500"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item prop="name" :label="$t('admin.name')">
          <el-input v-model="certificated.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone" :label="$t('admin.phone')">
          <el-input v-model="certificated.phone"></el-input>
        </el-form-item>
        <el-form-item prop="number" :label="$t('admin.identify')">
          <el-input v-model="certificated.number"></el-input>
        </el-form-item>
        <el-form-item prop="type" :label="$t('admin.certifications.category')">
          <el-select v-model="certificated.type" :placeholder="$t('admin.certifications.category')">
            <el-option label="个人认证" value="user"></el-option>
            <el-option label="机构认证" value="org"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="certificated.type === 'user' ? `${$t('admin.identifyPhoto')}${$t('admin.identifyFront')}` : `${$t('admin.identifyPhoto')}`"
          prop="front"
        >
          <el-upload
            class="identify-uploader"
            :show-file-list="false"
            action
            :http-request="uploadFront"
            :multiple="false"
            :disabled="frontUploading"
            accept="image/*"
            :limit="1"
            :auto-upload="true"
          >
            <div v-if="!frontUploading">
              <img v-if="frontUrl" :src="frontUrl" class="cover_node">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </div>
            <el-progress v-else type="circle" :percentage="frontPercentage"/>
            <div
              slot="tip"
              class="el-upload__tip"
            >{{certificated.type === 'org' ? `${$t('admin.identifyPhoto')}` :
              `${$t('admin.identifyPhoto')}${$t('admin.identifyFront')}`}}
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          v-show="certificated.type === 'user'"
          :label="`${$t('admin.identifyPhoto')}${$t('admin.identifyBack')}`"
          prop="back"
        >
          <el-upload
            class="identify-uploader"
            :show-file-list="false"
            action
            :http-request="uploadBack"
            :multiple="false"
            :disabled="backUploading"
            accept="image/*"
            :limit="1"
            :auto-upload="true"
          >
            <div v-if="!backUploading">
              <img v-if="backUrl" :src="backUrl" class="cover_node">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </div>
            <el-progress v-else type="circle" :percentage="backPercentage"/>
            <div
              slot="tip"
              class="el-upload__tip"
            >{{$t('admin.identifyPhoto')}}{{ $t('admin.identifyBack')}}
            </div>
          </el-upload>
        </el-form-item>
        <div v-show="certificated.type === 'org'">
          <el-form-item prop="org_name" :label="$t('admin.certifications.orgName')">
            <el-input
              v-model="certificated.org_name"
              :placeholder="$t('admin.certifications.orgAddress')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="org_address" :label="$t('admin.certifications.orgAddress')">
            <el-input
              v-model="certificated.org_address"
              :placeholder="$t('admin.certifications.orgAddress')"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item prop="desc" :label="$t('admin.certifications.description')">
          <el-input type="textarea" v-model="certificated.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="saveLoading"
            @click="saveCertificated"
          >{{ $t('admin.submit') }}
          </el-button>
          <el-button plain @click="goBack(true)">{{ $t('admin.cancel') }}</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>
<script>
  import axios from 'axios'
  import md5 from 'js-md5'
  import File from '@/api/file'

  export default {
    name: 'ManagementUserAddCertificated',
    data: () => ({
      certificated: {
        user_id: null,
        name: null,
        phone: null,
        number: null,
        username: null,
        org_name: null,
        org_address: null,
        desc: null,
        type: 'user',
        front: null,
        back: null
      },
      frontUploading: false,
      backUploading: false,
      saveLoading: false,
      frontPercentage: 0,
      frontUrl: null,
      backUrl: null,
      searchedUsername: null,
      backPercentage: 0
    }),
    computed: {
      rules () {
        const {
          certificated: { type }
        } = this
        return {
          username: [
            {
              required: true,
              message: `${this.$t('admin.type')}${this.$t('admin.username')}`,
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              message: `${this.$t('admin.type')}${this.$t('admin.name')}`,
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: `${this.$t('admin.type')}${this.$t('admin.phone')}`,
              trigger: 'blur'
            }
          ],
          type: [
            {
              required: true,
              message: `${this.$t('admin.select')}${this.$t(
                'admin.certifications.category'
              )}`,
              trigger: 'blur'
            },
            {
              type: 'enum',
              enum: ['user', 'org'],
              message: `${this.$t('admin.select')}${this.$t(
                'admin.correct'
              )}${this.$t('admin.certifications.category')}`
            }
          ],
          front: [
            {
              required: true,
              message:
                type === 'org'
                  ? `${this.$t('admin.upload')}${this.$t('admin.identifyPhoto')}`
                  : `${this.$t('admin.upload')}${this.$t(
                  'admin.identifyPhoto'
                  )}${this.$t('admin.identifyFront')}`,
              trigger: 'blur'
            }
          ],
          back: [
            {
              required: type === 'user',
              message: `${this.$t('admin.upload')}${this.$t(
                'admin.identifyPhoto'
              )}${this.$t('admin.identifyBack')}`,
              trigger: 'blur'
            }
          ],
          org_name: [
            {
              required: type === 'org',
              message: `${this.$t('admin.type')}${this.$t(
                'admin.certifications.orgName'
              )}`,
              trigger: 'blur'
            }
          ],
          org_address: [
            {
              required: type === 'org',
              message: `${this.$t('admin.type')}${this.$t(
                'admin.certifications.orgAddress'
              )}`,
              trigger: 'blur'
            }
          ],
          number: [
            {
              required: true,
              message: `${this.$t('admin.type')}${this.$t('admin.identify')}`,
              trigger: 'blur'
            }
          ],
          desc: [
            {
              required: true,
              message: `${this.$t('admin.type')}${this.$t(
                'admin.certifications.description'
              )}`,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    watch: {
      'certificated.type' () {
        if (this.certificated.type === 'user') {
          this.certificated.back = this.backUrl = null
        }
      }
    },
    methods: {
      /**
       * 证件照正面上传
       * 覆盖upload组件的默认上传事件
       */
      async uploadFront ({ file }) {
        const { data: task } = await this.createTask(file)
        const { headers, method, uri, node } = task
        this.frontUploading = true
        const instance = axios.create()
        instance.defaults.timeout = 100000
        instance.defaults.onUploadProgress = ({ loaded, total }) => {
          this.frontPercentage = parseInt((loaded / total).toFixed(2) * 100)
        }
        instance.defaults.validateStatus = s => [200, 201, 203, 204].includes(s)
        instance.request({
          method: method.toLowerCase(),
          url: uri,
          headers,
          data: file
        }).then(() => {
          this.$set(this, 'frontPercentage', 0)
          this.$set(this.certificated, 'front', node)
          this.$set(this, 'frontUrl', File.url(node))
        }).catch(this.showApiError).finally(() => {
          this.frontUploading = false
        })
      },
      /**
       * 证件照反面上传
       * 覆盖upload组件的默认上传事件
       */
      async uploadBack ({ file }) {
        const { data: task } = await this.createTask(file)
        const { headers, method, uri, node } = task
        this.backUploading = true
        const instance = axios.create()
        instance.defaults.timeout = 100000
        instance.defaults.onUploadProgress = ({ loaded, total }) => {
          this.backPercentage = parseInt((loaded / total).toFixed(2) * 100)
        }
        instance.defaults.validateStatus = s => [200, 201, 203, 204].includes(s)
        instance.request({
          method: method.toLowerCase(),
          url: uri,
          headers,
          data: file
        }).then(() => {
          this.$set(this, 'backPercentage', 0)
          this.$set(this.certificated, 'back', node)
          this.$set(this, 'backUrl', File.url(node))
        }).catch(this.showApiError).finally(() => {
          this.backUploading = false
        })
      },
      /**
       * 获取文件md5
       * @param file
       * @returns {Promise<any>}
       */
      hashFile (file) {
        return new Promise(resolve => {
          let reader = new window.FileReader()
          reader.onload = event => resolve(md5(event.target.result))
          reader.readAsArrayBuffer(file)
        })
      },
      /**
       * 服务器创建上传任务
       * @param file
       * @returns {Promise<any>}
       */
      async createTask (file) {
        const result = await this.$api.storage.save({
          filename: file.name,
          size: file.size,
          mime_type: file.type,
          storage: {
            channel: 'public'
          },
          hash: await this.hashFile(file)
        })
        return result
      },
      /* 保存新的认证信息 */
      saveCertificated () {
        this.$refs.certificated.validate(valid => {
          if (valid) {
            if (!this.saveLoading) {
              this.$set(this, 'saveLoading', true)
              let certificated = Object.assign({}, this.certificated)
              certificated.files = []
              if (certificated.type === 'user') {
                certificated.files[0] = certificated.front
                certificated.files[1] = certificated.back
              } else {
                certificated.files[0] = certificated.front
              }
              this.$api.certifications.save(certificated, certificated.id).then(({ data }) => {
                this.$message({
                  type: 'success',
                  message: data.message || this.$t('admin.success')
                })
                this.goBack()
              }).catch(this.showApiError).finally(() => {
                this.$set(this, 'saveLoading', false)
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: this.$t('admin.formInvalid')
            })
            return false
          }
        })
      },
      /* 远程搜索用户 */
      queryUsers (queryString, cb) {
        const { searchedUsername } = this
        if (!queryString || queryString === searchedUsername) {
          cb([])
          return false
        }
        this.$api.users.list({ name: queryString }).then(({ data: { users } }) => {
          cb(users)
          if (!users.length) {
            this.$message({
              type: 'info',
              message: '没有找到用户'
            })
          }
        })
      },
      /* 使用远程搜索结果 */
      selectUser (user) {
        const { id, name } = user
        this.$set(this.certificated, 'user_id', id)
        this.$set(this, 'searchedUsername', name)
      }
    }
  }
</script>

<style lang="less">
  .add-certificated-page {
    .identify-uploader {
      .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:hover {
          border-color: #409eff;
        }
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px !important;
        text-align: center;
        border: 1px solid #efefef;
        margin-bottom: 2px;
      }

      .cover_node {
        padding: 2px;
        width: 146px;
        height: 146px;
        border: 1px solid #efefef;
        margin-right: 2px;
        border-radius: 6px;
        margin-bottom: 2px;
      }
    }
  }
</style>
