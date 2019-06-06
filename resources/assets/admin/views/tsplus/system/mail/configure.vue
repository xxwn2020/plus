<template>
  <div class="mail-configure">
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('admin.mail.root')}}</span>
      </div>
      <el-form ref="configure" :model="configure">
        <el-form-item :label="$t('admin.mail.smtpAddress')">
          <el-input v-model="configure.host" placeholder="输入SMTP主机地址"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.mail.smtpPort')">
          <el-input v-model="configure.port" placeholder="请输入SMTP主机端口"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.mail.mailAddress')">
          <el-input v-model="configure.from.address" placeholder="发件箱地址"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.mail.mailName')">
          <el-input v-model="configure.from.name" placeholder="请输入发件人名称"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.mail.protocol')">
          <el-radio-group v-model="configure.encryption">
            <el-radio label="ssl">SSL</el-radio>
            <el-radio label="tls">TLS</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('admin.mail.mailAccount')">
          <el-input v-model="configure.username" placeholder="请输入SMTP服务器用户名"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.mail.mailPassword')">
          <el-input type="password" v-model="configure.password" placeholder="请输入SMTP服务账号密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain :loading="saveLoading" @click="saveMailConfigure" type="primary" >
            {{$t('admin.submit')}}
          </el-button>
          <el-button plain type="info" @click="goBack(true)">{{$t('admin.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>邮件发送测试</span>
        <el-button plain style="padding: 3px 0" type="text">发送</el-button>
      </div>
      <el-form ref="testEmail" :model="form" label-width="80px">
        <el-form-item prop="mail" label="邮件地址">
          <el-input v-model="form.email" placeholder="接收测试内容的邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="邮件内容">
          <el-input v-model="form.content" placeholder="邮件内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain :loading="sendLoading" @click="sendTestMail" type="primary" >{{$t('admin.submit')}}
          </el-button>
          <el-button plain @click="cleanFrom" type="info" >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'SystemMailIndex',
    data () {
      return {
        configure: {
          from: {}
        },
        listLoading: false,
        saveLoading: false,
        sendLoading: false,
        form: {
          content: null,
          email: null
        }
      }
    },
    methods: {
      /* 重置form表单 */
      cleanFrom (formName) {
        this.$refs[formName].resetFields()
      },
      /* 发送测试邮件 */
      sendTestMail () {
        const { form, sendLoading } = this
        if (!sendLoading) {
          this.$set(this, 'sendLoading', true)
          this.$api.mail.test(form)
            .then(({ data }) => {
              this.showSuccess(data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'sendLoading', false)
              this.resetForm('testEmail')
            })
        }
      },
      /* 更新配置 */
      saveMailConfigure () {
        const { saveLoading, configure } = this
        if (!saveLoading) {
          this.$set(this, 'saveLoading', true)
          this.$api.mail.save(configure)
            .then(({ data }) => {
              this.showSuccess(data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'saveLoading', false)
            })
        }
      },
      /* 获取配置 */
      getConfigure () {
        const { listLoading } = this
        if (!listLoading) {
          this.$set(this, 'listLoading', true)
          this.$api.mail.list()
            .then(({ data }) => {
              this.$set(this, 'configure', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'listLoading', false)
            })
        }

      }
    },
    beforeMount () {
      this.getConfigure()
    }
  }
</script>
