import file from '../api/file'
import plusMessageBundle from 'plus-message-bundle'

export default {
  methods: {
    showApiError (error, defaultMessage = null) {
      error = this.$api.normError(error)

      let { message } = error
      const { canceled } = error

      if (!message && defaultMessage) {
        message = defaultMessage
      }

      if (!canceled && message) {
        // this.$message.error(message)
        this.showErrorUnClosable(message)
      }
    },
    /* 返回上一页 */
    goBack (confirm = false) {
      if (confirm) {
        this.$confirm('退出后不会保存已经填写的内容,要继续吗?', '提示', {
          confirmButtonText: this.$t('admin.confirm'),
          cancelButtonText: this.$t('admin.cancel'),
          type: 'warning'
        })
          .then(() => {
            this.$router.back()
          })
          .catch(this.showApiError)
      } else {
        this.$router.back()
      }
    },
    /* 路由导航 */
    goTo (params) {
      this.$router.push(params)
    },
    /* 获取服务端信息 */
    serverMessage (message, defaultMessage) {
      return plusMessageBundle(message, defaultMessage).getMessage()
    },
    /* 展示成功信息 */
    showSuccess (message) {
      this.$message({
        type: 'success',
        message: this.serverMessage(message)
      })
    },
    /* 展示错误信息 */
    showError (message) {
      this.$message({
        type: 'error',
        message: this.serverMessage(message)
      })
    },
    showErrorUnClosable (message) {
      this.$notify({
        title: '出错了',
        message: this.serverMessage(message),
        duration: 0,
        type: 'error'
      })
    },
    /* 展示提示信息 */
    showInfo (message) {
      this.$message({
        type: 'info',
        message: this.serverMessage(message)
      })
    },
    /* 重置表单 */
    resetForm (formRef) {
      this.$refs[formRef].resetFields()
    }
  },

  filters: {
    localTime (value) {
      return value ? (new Date(`${value}Z`))
        .toLocaleString(
          navigator.language, { hour12: false }
        ) : '-'
    },

    fileUrl (id, params = {}) {
      if ('json' in params) {
        delete params.json
      }

      return file.url(id, params)
    }
  }
}
