import plusMessageBundle from 'plus-message-bundle'
import { i18n } from '@/utils/i18n'
import { url } from '@/utils/tools'

export default {
  data: () => ({
    saving: false,
    getting: false
  }),
  methods: {
    i18n,
    gLoading (s) {
      this.$set(this, 'getting', s)
    },
    sLoading (s) {
      this.$set(this, 'saving', s)
    },
    /* 获取服务端信息 */
    serverMessage (message, defaultMessage) {
      return plusMessageBundle(message, defaultMessage).getMessage()
    },
    /* 展示成功信息 */
    Success (message = null, defaultMessage = '操作成功') {
      this.$message({
        type: 'success',
        message: this.serverMessage(message, defaultMessage)
      })
    },
    /* 展示错误信息 */
    Error (message = null, defaultMessage = '操作失败') {
      this.$message({
        type: 'error',
        message: this.serverMessage(message, defaultMessage)
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
    showApiError (error, defaultMessage = null) {
      error = this.$api.normError(error)

      let { message } = error
      const { canceled } = error

      if (!message && defaultMessage) {
        message = defaultMessage
      }

      if (!canceled && message) {
        this.showErrorUnClosable(message)
      }
    }
  },
  filters: {
    localTime (value) {
      return value ? (new Date(`${value}Z`)).toLocaleString(
        navigator.language, { hour12: false }
      ) : '-'
    },

    fileUrl (id, params = {}) {
      if ('json' in params) {
        delete params.json
      }

      return url(id, params)
    }
  }
}
