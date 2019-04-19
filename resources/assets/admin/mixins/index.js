import file from '../api/file'
import plueMessageBundle from 'plus-message-bundle'
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
        this.$message.error(message)
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
    serverMessage (message, defaultMessage) {
      return plueMessageBundle(message, defaultMessage).getMessage()
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
