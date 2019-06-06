<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>比例</span>
    </div>
    <el-form v-loading="getLoading" ref="form" :model="form" label-width="120px">
      <el-alert
        title="设置「真实货币」与「钱包余额」的转换比例，以人民币为例，比例设置为0.01时，表示充值1元人民币获得0.01个钱包余额；比例设置为10时，充值1元人民币获得10个钱包余额"
        type="info"
        :closable="false"
      />
      <el-alert
        title="!!!如果有App客户端，请不要随意修改此配置项!!!"
        type="warning"
        :closable="false"
        :show-icon="true"
      />
      <el-alert
        title="!!!设置范围请务必在：「0.01 - 10」之间!!!"
        type="warning"
        :closable="false"
        :show-icon="true"
      />
      <el-form-item label="比例" prop="ratio">
        <el-input type="number" min="0.01" max="10" v-model="form.ratio" placeholder="输入充值比例"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="saveWalletRatio" :loading="saveLoading" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'walletRatio',
    data: () => ({
      form: {
        ratio: null
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      getWalletRatio () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getWalletRatio()
            .then(({ data: { ratio } }) => {
              this.$set(this.form, 'ratio', ratio / 100)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      saveWalletRatio () {
        const { form: { ratio }, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.finance.saveWalletRatio({ ratio: ratio * 100 })
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
      this.getWalletRatio()
    }
  }
</script>

<style scoped>

</style>
