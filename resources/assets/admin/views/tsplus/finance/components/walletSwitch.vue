<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>开关</span>
    </div>
    <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
      <el-form-item prop="recharge" :label="$t('admin.finance.rechargeSwitch')">
        <el-radio-group v-model="form.recharge">
          <el-radio border :label="true">开启</el-radio>
          <el-radio border :label="false">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="cash" :label="$t('admin.finance.cashSwitch')">
        <el-radio-group v-model="form.cash">
          <el-radio border :label="true">开启</el-radio>
          <el-radio border :label="false">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="transform" :label="$t('admin.finance.walletTransform')">
        <el-radio-group v-model="form.transform">
          <el-radio border :label="true">开启</el-radio>
          <el-radio border :label="false">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="saveWalletSwitch" :loading="saveLoading">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  /* 钱包相关的开关 */
  export default {
    name: 'WalletSwitch',
    data: () => ({
      form: {},
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      getWalletSwitch () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getWalletSwitch()
            .then(({ data }) => {
              let format = {}
              Object.keys(data).map(key => {
                format[key] = data[key].status
              })
              this.$set(this, 'form', format)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      saveWalletSwitch () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.finance.saveWalletSwitch({ switch: form })
            .then(({ data }) => {
              this.showSuccess(data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
      }
    },
    beforeMount () {
      this.getWalletSwitch()
    }
  }
</script>

<style scoped>

</style>
