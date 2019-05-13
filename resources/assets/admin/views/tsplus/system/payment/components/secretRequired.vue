<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>支付密码</span>
    </div>
    <el-form v-loading="getLoading" ref="form" label-width="120px">
      <el-alert
        title="默认关闭，如果开启那么用户发生付款行为需要用户输入登录密码进行安全验证，关闭后则不需要输入密码验证！"
        type="warning"
        :show-icon="true"
        :closable="false"
      >
      </el-alert>
      <el-form-item label="支付密码开关">
        <el-button size="mini" :loading="saveLoading" v-if="form.switch" @click="savePayValidatePassword(false)"
                   type="success">
          已开启
        </el-button>
        <el-button size="mini" :loading="saveLoading" v-else @click="savePayValidatePassword(true)" type="danger">已关闭
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'secretRequired',
    data: () => ({
      form: { switch: null },
      getLoading: false,
      saveLoading: false
    }),
    beforeMount () {
      this.getPayValidatePassword()
    },
    methods: {
      getPayValidatePassword () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getPayValidatePassword()
            .then(({ data: { switch: old } }) => {
              this.$set(this.form, 'switch', old)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      savePayValidatePassword (status = true) {
        const { saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.finance.savePayValidatePassword({ switch: status })
            .then(() => {
              this.showSuccess()
              this.$set(this.form, 'switch', status)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
