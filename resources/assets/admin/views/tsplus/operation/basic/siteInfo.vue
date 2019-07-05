<template>
  <el-card shadow="never">
    <div slot="header">
      <span>站点信息</span>
    </div>
    <el-form v-loading="getLoading" :rules="rules" :model="form" ref="infoForm" label-width="120px">
      <el-form-item label="站点名称" prop="name">
        <el-input placeholder v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input placeholder v-model="form.keywords"></el-input>
      </el-form-item>
      <el-form-item label="站点描述" prop="description">
        <el-input type="textarea" placeholder v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="站点Logo" prop="logo">
        <el-upload
          class="pc-logo-uploader"
          :show-file-list="false"
          action
          :http-request="uploadLogo"
          :multiple="false"
          :disabled="logoUploading"
          accept="image/*"
          :limit="1"
          :auto-upload="true"
        >
          <div v-if="!logoUploading">
            <img v-if="logoUrl" :src="logoUrl" style="width: 100px; height: 100px;" class="cover_node">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </div>
          <el-progress v-else type="circle" :percentage="logoPercentage"/>
          <div slot="tip" class="el-upload__tip">站点logo, 宽高比例为1:1</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="版权信息" prop="copyright">
        <el-input placeholder type="textarea" v-model="form.copyright"></el-input>
      </el-form-item>
      <el-form-item label="技术支持" prop="technical">
        <el-input placeholder v-model="form.technical"></el-input>
      </el-form-item>
      <el-form-item label="备案信息" prop="icp">
        <el-input placeholder v-model="form.icp"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="saveLoading" type="primary" @click="saveInfo">{{$t('admin.submit')}}</el-button>
        <el-button plain>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from 'axios'
  import md5 from 'js-md5'
  import File from '@/api/file'

  export default {
    name: 'operationBasicSiteinfo',
    data: () => ({
      form: {
        name: null,
        keywords: null,
        description: null,
        icp: null,
        copyright: null,
        technical: null,
        logo: null
      },
      logoUploading: false,
      logoPercentage: 0,
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      ...mapActions('manageList', ['getList']),
      /* 保存 */
      saveInfo () {
        const { saveLoading, form } = this
        this.$refs.infoForm.validate(valid => {
          if (valid && !saveLoading) {
            this.$set(this, 'saveLoading', true)
            this.$api.baseinfo.save(form).then(({ data }) => {
              this.showSuccess(data)
            }).catch(this.showApiError).finally(() => {
              this.$set(this, 'saveLoading', false)
            })
          }
        })
      },

      async uploadLogo ({ file }) {
        const { data: task } = await this.createTask(file)
        const { headers, method, uri, node } = task
        this.logoUploading = true
        const instance = axios.create()
        instance.defaults.timeout = 100000
        instance.defaults.onUploadProgress = ({ loaded, total }) => {
          this.logoPercentage = parseInt((loaded / total).toFixed(2) * 100)
        }
        instance.defaults.validateStatus = s => [200, 201, 203, 204].includes(s)
        instance.request({
          method: method.toLowerCase(),
          url: uri,
          headers,
          data: file
        }).then(() => {
          this.$set(this, 'logoPercentage', 0)
          this.$set(this.form, 'logo', node)
        }).catch(this.showApiError).finally(() => {
          this.logoUploading = false
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
      /* get baseinfo from server */
      getBaseInfo () {
        const { getLoading } = this
        if (!getLoading) {
          this.$set(this, 'getLoading', true)
          this.$api.baseinfo.list().then(({ data }) => {
            this.$set(this, 'form', { ...this.form, ...data })
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'getLoading', false)
          })
        }
      }
    },
    mounted () {
      this.getBaseInfo()
      this.getList()
    },
    computed: {
      /* 表单验证规则 */
      rules () {
        return {
          name: [{ required: true, message: '站点名称必填', trigger: 'blur' }]
        }
      },
      /* 获取扩展包后台入口 */
      ...mapGetters(['manageList']),
      /* 判断是否有pc包 */
      // hasPc () {
      //   return Object.keys(this.manageList).includes('pc')
      // },
      // /* pc logo */
      logoUrl () {
        const {
          form: {
            logo = ''
          }
        } = this
        if (!logo) {
          return null
        }
        return File.url(logo, { w: 200, h: 200 })
      }
      // /* pc 登录页面背景 */
      // loginBgUrl () {
      //   const {
      //     form: {
      //       pc: { loginbg = '' }
      //     }
      //   } = this
      //   if (!loginbg) {
      //     return null
      //   }
      //   return File.url(loginbg, { w: 100, h: 100 })
      // }
    }
  }
</script>
