<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('admin.payment.payTypes')}}</span>
    </div>

    <el-form v-loading="getLoading" label-width="120px">
      <el-alert
        title="如果将充值选项全部取消，则表示关闭充值功能"
        :show-icon="true"
        :closable="false"
        type="warning">
      </el-alert>
      <el-alert
        title="单个平台多个选择时针对不同场景的分类，关闭某个场景，某个场景则无支付。"
        :show-icon="true"
        :closable="false"
        type="warning">
      </el-alert>
      <el-form-item :label="$t('admin.payment.types')" prop="">
        <el-checkbox-group v-model="types">
          <el-checkbox v-for="(type, key) in support" :label="key" :key="key">{{type}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button plain :loading="saveLoading" @click="saveRechargeTypes" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'payType',
    data: () => ({
      support: {},
      types: [],
      getLoading: false,
      saveLoading: false
    }),
    beforeMount () {
      this.getRechargeTypes()
    },
    methods: {
      getRechargeTypes () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getRechargeTypes()
            .then(({ data: { support, types } }) => {
              this.$set(this, 'support', support)
              this.$set(this, 'types', types)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      },
      saveRechargeTypes () {
        const { saveLoading, types } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.finance.saveRechargeTypes({ types })
            .then(({ data }) => {
              this.showSuccess(data)
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
