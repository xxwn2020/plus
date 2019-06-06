<template>
  <el-card shadow="never" class="box-card pay-option">
    <div slot="header" class="clearfix">
      <span>充值选项</span>
    </div>
    <el-form v-loading="getLoading" :inline="true" ref="form" :model="form" label-width="80px">
      <el-alert
        title="设置充值选项可以让用户在充值页面快速选择充值金额(只能输入整数)，用户也可以选择输入自定义金额进行充值。最多6个选项"
        type="info"
        :closable="false"
      >
      </el-alert>
      <div style="display: flex; align-items: center">
        <el-tag
          :key="label"
          v-for="(label, index) in form.labels"
          closable
          :disable-transitions="false"
          @close="handleClose(index)">
          {{label / 100}}
        </el-tag>
        <el-input
          class="input-new-label"
          v-if="inputVisible"
          type="number"
          v-model="inputValue"
          ref="saveTagInput"

          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          placeholder="enter添加列表"
        >
        </el-input>
        <el-button plain :loading="saveLoading" v-if="showButton" class="button-new-tag"
                   size="small" @click="showInput">+ 添加
        </el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
  /* 钱包提现设置 */
  export default {
    name: 'payOption',
    data: () => ({
      form: {
        labels: []
      },
      inputValue: null,
      inputVisible: false,
      saveLoading: false,
      getLoading: false,
      deleteLoading: false
    }),
    computed: {
      showButton () {
        const { form: { labels }, inputVisible } = this
        return !inputVisible && labels.length < 6
      }
    },
    methods: {
      /* 删除 */
      handleClose (index) {
        const { form: { labels = [] } } = this
        this.deleteWalletPayOption(labels[index])
        this.form.labels.splice(index, 1)
      }
      ,
      /* 展示输入框 */
      showInput () {
        this.$set(this, 'inputVisible', true)
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      }
      ,
      /* 回车添加单个选项 */
      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          const { form: { labels = [] } = {} } = this
          if (labels.findIndex(label => (inputValue * 100 === label)) === -1) {
            this.sLoading(true)
            this.$api.finance.saveWalletPayOption({ label: inputValue * 100 })
              .then(({ data }) => {
                this.showSuccess(data)
                labels.push(inputValue * 100)
                this.$set(this.form, 'labels', Array.from(new Set(labels)))
                this.$set(this, 'inputValue', null)
                this.sLoading(false)
                this.$set(this, 'inputVisible', false)
              })
              .catch(this.showApiError)
          } else {
            this.showError('选项已存在，请不要重复输入')
          }
        }
      }
      ,
      /* 获取选项列表 */
      getWalletPayOption () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.finance.getWalletPayOption()
            .then(({ data }) => {
              this.$set(this.form, 'labels', data)
            })
            .catch(this.showApiError)
            .finally(() => {
              this.gLoading(false)
            })
        }
      }
      ,
      /* 删除选项 */
      deleteWalletPayOption (label) {
        const { deleteLoading } = this
        if (!deleteLoading) {
          this.$set(this, 'deleteLoading', true)
          this.$api.finance.deleteWalletPayOption(label)
            .then(() => {
              this.showSuccess(this.$t('admin.success'))
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, 'deleteLoading', false)
            })
        }
      }
    }
    ,
    beforeMount () {
      this.getWalletPayOption()
    }
  }
</script>

<style scoped lang="scss">
  .pay-option {
    .el-tag {
      margin: 10px 10px 10px 0;
    }

    .input-new-label {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
</style>
