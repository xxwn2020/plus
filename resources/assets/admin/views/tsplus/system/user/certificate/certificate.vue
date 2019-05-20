<template>
  <div class="certificate">
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('admin.userConfig.certificate.type')}}</span>
      </div>
      <el-table
        v-loading="getLoading"
        :data="cates"
        style="width: 100%">
        <el-table-column
          prop="name"
          :label="$t('admin.userConfig.certificate.type')">
        </el-table-column>
        <el-table-column
          prop="display_name"
          :label="$t('admin.userConfig.certificate.title')">
        </el-table-column>
        <el-table-column
          prop="description"
          :label="$t('admin.userConfig.certificate.description')">
        </el-table-column>
        <el-table-column
          :label="$t('admin.operation')">
          <template slot-scope="{row: cate}">
            <el-button @click="editCate(cate)" type="primary" size="mini">{{$t('admin.edit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="$t('admin.userConfig.certificate.edit')"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="edit-dialog"
    >
      <el-form ref="editCate" :model="edit" label-width="120px">
        <el-form-item :label="$t('admin.userConfig.certificate.type')" prop="name">
          <el-input :disabled="true" v-model="edit.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.userConfig.certificate.title')" prop="display_name">
          <el-input v-model="edit.display_name"></el-input>
        </el-form-item>
        <el-form-item class="cate-icon" :label="$t('admin.userConfig.certificate.icon')" prop="icon">
          <el-input :disabled="true" v-model="edit.icon">
            <a :href="edit.icon" target="_blank" v-if="edit.icon" class="preview" slot="prepend">预览</a>
            <el-button type="primary" :loading="uploading" @click="triggerFileInput" class="upload" slot="append">
              {{edit.icon ? '修改' : '上传'}}
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.userConfig.certificate.description')" prop="">
          <el-input v-model="edit.description" type="textarea" :autosize="{minRows: 3, maxRows: 6}"></el-input>
        </el-form-item>
        <input type="file" ref="iconFileInput" style="display:none;" @change="uploadIcon">
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './_certificate.scss'

  export default {
    data: () => ({
      cates: [],
      uploading: false,
      getLoading: false,
      saveLoading: false,
      dialogVisible: false,
      edit: {}
    }),
    beforeMount () {
      this.getCates()
    },
    methods: {
      /* 模拟点击文件输入框事件 */
      triggerFileInput () {
        this.$refs.iconFileInput.click()
      },
      /* 打开dialog对话框 */
      editCate (cate) {
        this.$set(this, 'edit', Object.assign({}, cate))
        this.$set(this, 'dialogVisible', true)
      },
      /* dialog关闭事件的处理 */
      handleClose (done = null) {
        if (typeof done === 'function') {
          done()
        } else {
          this.$set(this, 'dialogVisible', false)
        }
        this.$set(this, 'edit', {})
      },
      /* 获取用户认证类型列表 */
      getCates () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.certifications.getCates()
            .then(({ data }) => {
              this.$set(this, 'cates', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      /* 更新认证分类 */
      saveCate () {
        const { edit, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.certifications.saveCate({ name: edit.name, params: edit })
            .then(({ data }) => {
              this.handleClose()
              this.showSuccess(data)
              this.getCates()
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
      },
      /* 上传认证类型图标 */
      uploadIcon (e) {
        const { edit: { name } } = this
        let file = e.target.files[0]
        let params = new FormData()
        params.append('icon', file)
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.$set(this, 'uploading', true)
          this.$api.certifications.updateIcon({
              name,
              params
            }
          ).then(({ data: { icon } }) => {
            this.$set(this.edit, 'icon', icon)
          }).catch(({ response: { data } = {} }) => {
            this.showError(data)
          })
            .finally(() => {
              this.$set(this, 'uploading', false)
            })
        }
      }
    }
  }
</script>
