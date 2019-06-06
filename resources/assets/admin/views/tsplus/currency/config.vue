<template>
  <div>
    <el-row :gutter="32">
      <el-col :span="24">
        <el-card shadow="never" class="box-card">
          <div slot="header" class="clearfix">
            <span>积分基础配置</span>
          </div>
          <el-form v-loading="getLoading" ref="basicForm" :model="basic" label-width="120px">
            <el-form-item label="积分规则" prop="rule">
              <el-input v-model="basic.rule" placeholder="积分规则" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="积分提现开关" prop="cash.status">
              <el-radio-group v-model="basic.cash.status">
                <el-radio border :label="true">开启</el-radio>
                <el-radio border :label="false">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="积分提现规则" prop="cash.rule">
              <el-input v-model="basic.cash.rule" placeholder="积分提现规则" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="积分充值开关" prop="recharge.status">
              <el-radio-group v-model="basic.recharge.status">
                <el-radio border :label="true">开启</el-radio>
                <el-radio border :label="false">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="积分充值规则" prop="">
              <el-input v-model="basic.recharge.rule" placeholder="积分充值规则" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain :loading="saveLoading" @click="saveBasicConfig" plain type="primary">{{$t('admin.submit')}}
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="32">
      <el-col :span="24">
        <el-card shadow="never" class="box-card">
          <div slot="header" class="clearfix">
            <span>积分扩展配置</span>
          </div>
          <el-form v-loading="getLoading" ref="optionsForm" :model="options" label-width="130px">
            <el-form-item label="充值选项" prop="recharge-option">
              <el-alert
                title="每一个选项表示多少积分"
                type="info"
                :closable="false"
              />
              <el-input v-model="options['recharge-option']" placeholder="placeholder"></el-input>
            </el-form-item>
            <el-form-item label="兑换比例" prop="recharge-ratio">
              <el-alert
                title="兑换比例，人民币一元可兑换的积分数量，默认1:100，此项「「万万不可」」随意修改"
                type="warning"
                :closable="false"
              >
              </el-alert>
              <el-input v-model="options['recharge-ratio']" placeholder="placeholder"></el-input>
            </el-form-item>
            <el-form-item label="单笔最大充值额度" prop="recharge-max">
              <el-input v-model="options['recharge-max']" placeholder="单笔最大提现额度"></el-input>
            </el-form-item>
            <el-form-item label="单笔最小充值额度" prop="recharge-min">
              <el-input v-model="options['recharge-min']" placeholder="单笔最小提现额度"></el-input>
            </el-form-item>
            <el-form-item label="单笔最大提现额度" prop="cash-max">
              <el-input v-model="options['cash-max']" placeholder="单笔最大提现额度"></el-input>
            </el-form-item>
            <el-form-item label="单笔最小提现额度" prop="cash-min">
              <el-input v-model="options['cash-min']" placeholder="单笔最小提现额度"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain :loading="optionSaveLoading" @click="saveOptionalConfig" type="primary">
                {{$t('admin.submit')}}
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'currency-config',
    data: () => ({
      basic: {
        rule: null,
        cash: {
          status: true,
          rule: null
        },
        recharge: {
          status: true,
          rule: null
        }
      },
      options: {
        'cash-min': null,
        'cash-max': null,
        'recharge-min': null,
        'recharge-max': null,
        'recharge-option': null,
        'recharge-ratio': null
      },
      getLoading: false,
      saveLoading: false,
      optionSaveLoading: false
    }),
    beforeMount () {
      this.fetchConfig()
    },
    methods: {
      fetchConfig () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.currency.fetchConfig().then(({ data: { basic_conf, detail_conf } }) => {
            let conf = this.options
            let curr = this.basic
            // 基础配置
            curr.rule = basic_conf['rule']
            curr.cash.rule = basic_conf['cash.rule']
            curr.cash.status = basic_conf['cash.status']
            curr.recharge.rule = basic_conf['recharge.rule']
            curr.recharge.status = basic_conf['recharge.status']
            // 详细配置
            conf['cash-min'] = detail_conf['cash-min']
            conf['cash-max'] = detail_conf['cash-max']
            conf['recharge-min'] = detail_conf['recharge-min']
            conf['recharge-max'] = detail_conf['recharge-max']
            conf['recharge-option'] = detail_conf['recharge-options']
            conf['recharge-ratio'] = detail_conf['recharge-ratio'] * 100
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      saveBasicConfig () {
        const { basic, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.currency.saveBasicConfig(basic).then(({ data }) => {
            this.showSuccess(data)
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      saveOptionalConfig () {
        const { options, optionSaveLoading } = this
        if (!optionSaveLoading) {
          options['recharge-ratio'] /= 100
          console.log(options)
          this.$set(this, 'optionSaveLoading', true)
          this.$api.currency.saveOptionalConfig(options).then(({ data }) => {
            this.showSuccess()
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'optionSaveLoading', false)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
