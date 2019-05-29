<template>
  <div class="about-us">
    <el-main>
      <el-card v-loading="getLoading" shadow="never" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{$t('admin.templates.aboutUs')}}</span>
        </div>
        <el-form style="max-width: 100vw" ref="aboutUsForm" :model="form" label-width="120px">
          <el-form-item :label="$t('admin.templates.aboutUrl')" prop="url">
            <el-input v-model="form.url" :placeholder="$t('admin.templates.priority')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('admin.templates.aboutUsContent')">
            <mavon-editor placeholder="输入关于我们的markdown内容" v-model="form.content" @imgAdd="$imgAdd" ref="editor"
                          :apiHost="domain"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="saveAboutUs" :loading="saveLoading" type="primary">{{$t('admin.submit')}}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </div>
</template>

<script>
  import { mavonEditor } from '@slimkit/plus-editor'
  import '@slimkit/plus-editor/dist/css/index.css'
  import 'highlight.js/styles/github.css'
  import fileClass from '@/api/file'

  const domain = window.TS.domain || ''

  export default {
    components: { mavonEditor },
    data: () => ({
        form: {
          content: '',
          url: ''
        },
        domain,
        getLoading: false,
        saveLoading: false
      }
    ),
    beforeMount () {
      this.getAboutUs()
    }
    ,
    methods: {
      async uploadFile (file, callback) {
        const data = await fileClass.upload(file)
        callback(data)
      },
      // 绑定@imgAdd event
      $imgAdd (pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('image', $file)
        this.uploadFile($file, id => {
          this.$refs.editor.$img2Url(pos, id)
        })
      }
      ,
      getAboutUs () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.template.getAboutUs().then(({ data: { aboutUs } }) => {
            this.$set(this, 'form', aboutUs)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
      ,
      saveAboutUs () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.template.saveAboutUs(form).then(({ data }) => {
            this.showSuccess()
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    }
  }
</script>
