<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>钱包使用规则</span>
    </div>
    <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
      <el-form-item label="钱包使用规则" prop="rule">
        <el-input :autosize="{ minRows: 6, maxRows: 10 }" v-model="form.rule" placeholder="请输入钱包使用规则"
                  type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="saveWalletRule" :loading="saveLoading" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  /* 提现设置 */
  export default {
    name: 'WalletRule',
    data: () => ({
      form: {
        rule: null
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      /* 获取规则 */
      getWalletRule () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getWalletRule()
            .then(({ data: { rule = null } } = {}) => {
              this.$set(this.form, 'rule', rule)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      /* 保存规则 */
      saveWalletRule () {
        const { form: { rule }, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.finance.saveWalletRule({ rule })
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
      this.getWalletRule()
    }
  }
</script>

<style scoped>

</style>
