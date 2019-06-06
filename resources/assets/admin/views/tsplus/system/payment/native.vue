<template>
  <div class="native-payment">
    <el-form v-loading="getLoading" ref="nativeForm" :model="form" label-width="120px">
      <el-card shadow="never" class="box-card">
        <div slot="header" class="clearfix">
          <span>微信支付</span>
        </div>
        <el-form-item label="微信公众号ID" prop="wechatPay.appId">
          <el-input v-model="form.wechatPay.appId" placeholder="微信公众号ID"></el-input>
        </el-form-item>
        <el-form-item label="开放平台应用ID" prop="wechatPay.openId">
          <el-input v-model="form.wechatPay.openId" placeholder="开放平台应用ID"></el-input>
        </el-form-item>
        <el-form-item label="微信小程序ID" prop="wechatPay.microId">
          <el-input v-model="form.wechatPay.microId" placeholder="微信小程序ID, 选填"></el-input>
        </el-form-item>
        <el-form-item label="微信商户密钥" prop="wechatPay.apiKey">
          <el-input type="password" v-model="form.wechatPay.apiKey" placeholder="微信商户支付密钥"></el-input>
        </el-form-item>
        <el-form-item label="微信商户号" prop="wechatPay.mchId">
          <el-input v-model="form.wechatPay.mchId" placeholder="微信商户号"></el-input>
        </el-form-item>
      </el-card>
      <el-card shadow="never" class="box-card">
        <div slot="header" class="clearfix">
          <span>支付宝</span>
        </div>
        <el-form-item label="支付宝AppId" prop="alipay.appId">
          <el-input v-model="form.alipay.appId" placeholder="支付宝AppId"></el-input>
        </el-form-item>

        <el-form-item label="签名方式" prop="alipay.signType">
          <el-alert
            title="新的支付宝支付已经不再支持RSA加密方式，请使用RSA2方式，更加安全"
            :closable="false"
            :show-icon="true"
            type="warning">
          </el-alert>
          <el-select v-model="form.alipay.signType" placeholder="签名方式">
            <el-option
              v-for="item in [{label: 'RSA2', value: 'RSA2'},{label: 'RSA', value: 'RSA'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用公钥" prop="alipay.publicKey">
          <el-input type="textarea" :autosize="{minRows: 3, maxRows: 10}" v-model="form.alipay.publicKey"
                    placeholder="应用公钥"></el-input>
        </el-form-item>
        <el-form-item label="应用密钥" prop="alipay.secretKey">
          <el-input v-model="form.alipay.secretKey" type="textarea" :autosize="{minRows: 3, maxRows: 10}"
                    placeholder="应用密钥"></el-input>
        </el-form-item>
        <el-form-item label="支付宝公钥" prop="alipay.alipayAlipayKey">
          <el-input type="textarea" :autosize="{minRows: 3, maxRows: 10}" v-model="form.alipay.alipayAlipayKey"
                    placeholder="支付宝公钥"></el-input>
        </el-form-item>
      </el-card>

      <el-form-item label="内部订单表示">
        <el-alert
          title="填写内部订单标识，默认是时间+4位随机字符，标识填写请参考支付宝以及微信的内部订单号标识为准"
          :closable="false"
          type="info">
        </el-alert>
        <el-input v-model="form.sign" placeholder="内部订单表示"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="saveNativePaymentSetting" :loading="saveLoading" type="primary">{{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
  export default {
    name: 'SystemPaymentNative',
    data: () => ({
      form: {
        wechatPay: {
          appId: '',
          apiKey: '',
          openId: '',
          microId: '',
          mchId: ''
        },
        alipay: {
          appId: '',
          publicKey: '',
          secretKey: '',
          signType: 'RSA2',
          alipayAlipayKey: ''
        },
        sign: ''
      },
      getLoading: false,
      saveLoading: false
    }),
    beforeMount () {
      this.getNativePaymentSetting()
    },
    methods: {
      saveNativePaymentSetting () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.finance.saveNativePaymentSetting(form)
            .then(({ data }) => {
              console.log(data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
      },
      getNativePaymentSetting () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getNativePaymentSetting()
            .then(({ data }) => {
              this.$set(this, 'form', { ...this.form, ...data })
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .native-payment {
    .box-card {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
