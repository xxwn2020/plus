<template>
  <el-main class="configure">
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>短信配置</span>
        <el-button :loading="saveLoading" @click="saveSmsConfigure" style="padding: 3px 0" type="text">
          保存设置
        </el-button>
      </div>
      <el-form ref="gateways" label-width="80px">
        <el-form-item label="网关开关">
          <el-checkbox-group v-model="allowed_gateways">
            <el-checkbox v-for="gateway in gateways" :label="gateway" :key="gateway">{{gateway}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-for="allowGateWay in allowed_gateways" shadow="never" :key="allowGateWay" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{allowGateWay}}</span>
      </div>
      <el-form :ref="`form-${allowGateWay}`" :model="gatewaysConfig[allowGateWay]">
        <template v-for="key in getConfigureKey(gatewaysConfig[allowGateWay])">
          <template v-if="key !== 'template'">
            <el-form-item :label="$t(`admin.sms.configure.${key}`)">
              <el-input v-model="gatewaysConfig[allowGateWay][key]"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <template
              v-for="temp in getConfigureKey(gatewaysConfig[allowGateWay][key]).filter(item => (item !== ':code'))">
              <el-form-item :label="$t(`admin.sms.configure.${temp}`)">
                <el-alert
                  :closable="false"
                  v-if="['yunpian', 'huyi'].includes(allowGateWay)"
                  :title="$t('admin.sms.configure.content_tip')"
                  type="warning">
                </el-alert>
                <el-input v-model="gatewaysConfig[allowGateWay][key][temp]"></el-input>
              </el-form-item>
            </template>
          </template>
        </template>
      </el-form>
    </el-card>
  </el-main>

</template>

<script>
  /**
   * 短信设置
   */
  export default {
    name: 'SystemSmsConfigure',
    props: {},
    data () {
      return {
        listLoading: false,
        allowed_gateways: [],
        default_gateways: [],
        gateways: [],
        gatewaysConfig: {},
        saveLoading: false
      }
    },
    methods: {
      /* 获取配置的键名 */
      getConfigureKey (channel) {
        return Object.keys(channel) || []
      },
      /* 保存配置 */
      saveSmsConfigure () {
        const { saveLoading, allowed_gateways, gatewaysConfig } = this
        if (!saveLoading) {
          this.$confirm('请确认打开的网关设置了相应的短信设置!!', '提示', {
            type: 'warning'
          }).then(() => {
            this.$set(this, 'saveLoading', true)
            this.$api.sms.saveSmsConfigure({ allowed_gateways, gatewaysConfig }).then(({ data }) => {
              this.showSuccess(data)
            }).catch(this.showApiError).finally(() => {
              this.$set(this, 'saveLoading', false)
            })
          }).catch()
        }

      },
      /* 获取配置 */
      fetchConfigures () {
        const { listLoading } = this
        if (!listLoading) {
          this.$set(this, 'listLoading', true)
          this.$api.sms.list().then(({ data }) => {
            this.$set(this, 'allowed_gateways', data.allowed_gateways)
            this.$set(this, 'default_gateways', data.default_gateways)
            this.$set(this, 'gateways', data.gateways)
            this.$set(this, 'gatewaysConfig', data.gatewaysConfig)
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'listLoading', false)
          })
        }
      }
    },
    beforeMount () {
      this.fetchConfigures()
    }
  }
</script>

<style lang="scss">
  @import "./_configure.scss";
</style>
