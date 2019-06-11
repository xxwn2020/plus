<template>
  <el-main>
    <el-card shadow="never"
             class="box-card">
      <div slot="header"
           class="clearfix">
        <span>{{ i18n('setting') }}</span>
      </div>
      <el-form v-loading="getting" ref="feedSetting"
               label-width="120px"
               :model="config">
        <el-form-item :label="i18n('reward-switch')"
                      prop="reward">
          <el-alert
            :title="i18n('reward-intro')"
            type="info"
            :closable="false"
          >
          </el-alert>
          <el-radio-group v-model="config.reward">
            <el-radio :label="true">{{ i18n('open') }}</el-radio>
            <el-radio :label="false">{{ i18n('close') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="i18n('payControl')"
                      prop="open">
          <el-alert
            :title="i18n('payControl-intro')"
            type="info"
            :closable="false"
          >
          </el-alert>
          <el-radio-group v-model="config.open">
            <el-radio :label="true">{{ i18n('open') }}</el-radio>
            <el-radio :label="false">{{ i18n('close') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="i18n('payItems')"
                      prop="payItems">
          <el-alert
            :title="i18n('payItems-intro')"
            type="info"
            :closable="false"
          >
          </el-alert>
          <el-tag
            :key="tag"
            v-for="(tag, index) in config.payItems"
            closable
            :disable-transitions="false"
            @close="handleDeleteOption(index)">
            {{tag}}
          </el-tag>
          <el-button plain v-if="!showItemInput" @click="showInput" type="primary"
                     class="button-new-tag">{{ i18n('addItem') }}
          </el-button>
          <el-input v-else ref="saveTagInput"
                    class="input-new-tag"
                    v-model="item"
                    @blur="handleInputConfirm"
                    @keyup.enter.native="handleInputConfirm"
                    :placeholder="i18n('itemInputIntro')"></el-input>
        </el-form-item>
        <el-form-item :label="i18n('textLength')"
                      prop="textLength">
          <el-alert
            :title="i18n('textLength-intro')"
            type="info"
            :closable="false"
          >
          </el-alert>
          <el-input v-model="config.textLength"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="saving" plain @click="saveConfig" type="primary">{{ i18n('save') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
  export default {
    name: 'Setting',
    data: () => ({
      saving: false,
      getting: false,
      config: {
        reward: false,
        open: false,
        payItems: [],
        textLength: 50
      },
      showItemInput: false,
      item: null
    }),
    beforeMount () {
      this.fetchConfig()
    },
    methods: {
      /**
       * 显示输入框
       */
      showInput () {
        this.showItemInput = true
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      /**
       * 删除价格
       * @param index 价格选项的key
       */
      handleDeleteOption (index) {
        const { config: { payItems } } = this
        payItems.splice(index, 1)
      },
      /**
       * 回车按键
       */
      handleInputConfirm () {
        const { config: { payItems } } = this
        let inputValue = this.item
        if (inputValue) {
          payItems.push(inputValue)
          this.$set(this, 'config', {
            ...this.config,
            payItems: Array.from(new Set(payItems))
          })
        }
        this.showItemInput = false
        this.item = null
      },
      /**
       * 保存配置
       */
      saveConfig () {
        const { saving, config } = this
        if (!saving) {
          this.sLoading(true)
          this.$api.saveConfig(config).then(() => {
            this.Success()
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      /**
       * 获取服务端配置
       */
      fetchConfig () {
        const { getting } = this
        if (!getting) {
          this.gLoading(true)
          this.$api.payControl().then(({ data }) => {
            this.$set(this, 'config', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 120px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
