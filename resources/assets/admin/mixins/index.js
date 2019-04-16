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
        this.$confirm('确定要退出吗')
          .then(() => {
            this.$router.back()
          })
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
