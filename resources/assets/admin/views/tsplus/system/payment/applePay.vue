<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('admin.payment.iapSetting')}}</span>
      </div>
      <el-form v-loading="configGetting" ref="form" :model="config" label-width="120px">
        <el-form-item :label="$t('admin.payment.iapSwitch')" prop="">
          <el-radio-group size="mini" v-model="config.IAP_only">
            <el-radio border :label="true">开 启</el-radio>
            <el-radio border :label="false">关 闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('admin.payment.iapRule')" prop="rule">
          <el-input v-model="config.rule" type="textarea" :autosize="{minRows: 2, maxRows:8 }"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="configSaving" @click="saveAppleIapSetting" type="primary">{{$t('admin.submit')}}
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="getLoading"
        :data="items"
        style="width: 100%">
        <el-table-column
          prop="product_id"
          label="#ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          label="金额">
          <template slot-scope="{row}">
            {{row.amount / 100}}
          </template>
        </el-table-column>
        <el-table-column
          prop="apple_id"
          label="Apple ID">
        </el-table-column>
        <el-table-column
          label="">
          <template slot="header" slot-scope="scope">
            <el-button size="mini" @click="showAddDialog = true" type="text">添加IAP产品</el-button>
          </template>
          <template slot-scope="{row}">
            <el-button size="mini" :loading="deleting === row.product_id" @click="deleteIapItem(row.product_id)"
                       type="danger">
              {{$t('admin.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :before-close="closeDialog" title="添加IAP产品" :visible.sync="showAddDialog">
      <el-form :model="form">
        <el-form-item label="产品ID" label-width="120px">
          <el-input v-model="form.product_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" label-width="120px">
          <el-input v-model="form.name">
          </el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input type="number" placeholder="单位: 元" v-model="form.amount">
          </el-input>
        </el-form-item>
        <el-form-item label="Apple ID" label-width="120px">
          <el-input v-model="form.apple_id">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="saveIapItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'applePay',
    data: () => ({
      items: [],
      config: {
        IAP_only: null,
        rule: null
      },

      form: {
        product_id: null,
        name: null,
        amount: null,
        apple_id: null
      },
      configSaving: false,
      configGetting: false,
      getLoading: false,
      saveLoading: false,
      deleting: null,
      showAddDialog: false
    }),
    methods: {
      closeDialog (done = null) {
        this.$set(this, 'form', {
          product_id: null,
          name: null,
          amount: null,
          apple_id: null
        })
        if (typeof done === 'function') {
          done()
        } else {
          this.$set(this, 'showAddDialog', false)
        }
      },
      deleteIapItem (id) {
        const { deleting } = this
        if (!deleting) {
          this.$confirm('删除操作不可恢复，确认要继续吗?', '提示', {
            type: 'warning'
          })
            .then(() => {
              this.$set(this, 'deleting', id)
              this.$api.finance.deleteIapItem(id)
                .then(({ data }) => {
                  this.showSuccess(data)
                  this.getIapItems()
                })
                .catch(this.showApiError)
                .finally(() => {
                  this.$set(this, 'deleting', null)
                })
            })
        }
      },
      saveIapItem () {
        const { saveLoading, form } = this
        if (!saveLoading) {
          form.amount *= 100
          this.sLoading(true)
          this.$api.finance.saveIapItem(form)
            .then(({ data }) => {
              this.closeDialog()
              this.getIapItems()
              this.showSuccess(data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.sLoading(false)
            })
        }
      },
      /* 获取iap配置信息 */
      getAppleIapSetting () {
        const { configGetting } = this
        if (!configGetting) {
          this.$set(this, 'configGetting', true)
          this.$api.finance.getAppleIapSetting()
            .then(({ data }) => {
              this.$set(this, 'config', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'configGetting', false)
            })
        }
      },
      saveAppleIapSetting () {
        const { configSaving, config } = this
        if (!configSaving) {
          this.$set(this, 'configSaving', true)
          this.$api.finance.saveAppleIapSetting(config)
            .then(({ data }) => {
              this.showSuccess(data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'configSaving', false)
            })
        }
      },
      getIapItems () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getIapItems()
            .then(({ data }) => {
              this.$set(this, 'items', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      }
    },
    beforeMount () {
      this.getAppleIapSetting()
      this.getIapItems()
    }
  }
</script>

<style scoped>

</style>
