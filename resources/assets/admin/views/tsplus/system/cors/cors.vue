<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>跨域设置</span>
    </div>
    <div>
    </div>
    <el-main v-loading="getLoading">
      <el-form ref="cors" :model="cors">
        <el-alert
          title="以下设置，请咨询开发人员后再进行设置"
          type="warning"
          :closable="false"
          :show-icon="true"
        />
        <el-form-item label="Access-Control-Allow-Credentials">
          <el-radio-group v-model="cors.credentials">
            <el-radio :label="false">false</el-radio>
            <el-radio :label="true">true</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-for="showField in showFields" :key="showField.field" :label="showField.label">
          <el-table
            :data="cors[showField.field]"
            border
          >
            <el-table-column
              label="Header"
            >
              <template slot-scope="{row}">
                {{row}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="{row}">
                <el-button size="mini" type="danger" @click="delOption(showField.field, row)">{{$t('admin.delete')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex; margin-top: 10px;">
            <el-input style="flex: 9; padding-right: 10px;" v-model="form[showField.inputName]"></el-input>
            <el-button :disabled="!form[showField.inputName]" @click="addOption(showField.inputName, showField.field)"
                       type="primary">
              {{$t('admin.add')}}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="Access-Control-Max-Age" prop="maxAge">
          <el-input v-model="cors.maxAge"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" :loading="saveLoading" @click="saveData" type="primary">{{$t('admin.submit')}}
          </el-button>
          <el-button size="mini" @click="goBack(true)" type="info">{{$t('admin.cancel')}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-card>
</template>

<script>
  const fields = [
    {
      label: 'Access-Control-Allow-Headers',
      field: 'allowHeaders',
      inputName: 'allowHeader'
    },
    {
      label: 'Access-Control-Expose-Headers',
      field: 'exposeHeaders',
      inputName: 'exposeHeader'
    },
    {
      label: 'Access-Control-Allow-Methods',
      field: 'methods',
      inputName: 'method'
    },
    {
      label: 'Access-Control-Allow-Origin',
      field: 'origins',
      inputName: 'origin'
    }
  ]
  export default {
    data () {
      return {
        saveLoading: false,
        getLoading: false,
        showFields: fields,
        cors: {
          credentials: false,
          exposeHeaders: [],
          maxAge: 0,
          methods: [],
          origins: [],
          allowHeaders: []
        },
        form: {
          exposeHeader: null,
          allowHeader: null,
          method: null,
          origin: null
        }
      }
    },
    methods: {
      /* 保存设置 */
      saveData () {
        const { cors, saveLoading } = this
        if (!saveLoading) {
          this.$set(this, 'saveLoading', true)
          this.$api.cors.save(cors)
            .then(() => {
              this.showSuccess(this.$t('admin.success'))
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'saveLoading', false)
            })
        }

      },
      /* 添加选项 */
      addOption (inputName, field) {
        const { form: { [inputName]: value } } = this
        if (value) {
          this.cors[field].push(value)
          this.$set(this.form, inputName, null)
        }
      },
      /* 删除配置项的一条内容 */
      delOption (field, value) {
        let { [field]: fields } = this.cors
        fields.splice(fields.findIndex(item => (item === value)), 1)
      },
      /* 获取配置信息 */
      getCors () {
        const { getLoading } = this
        if (!getLoading) {
          this.$set(this, 'getLoading', true)
          this.$api.cors.list()
            .then(({ data }) => {
              this.$set(this, 'cors', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'getLoading', false)
            })
        }
      }

    },
    beforeMount () {
      this.getCors()
    }
  }
</script>
