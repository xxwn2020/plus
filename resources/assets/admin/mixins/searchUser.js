export default {
  name: 'searchUser',
  data: () => ({
    search: ''
  }),
  methods: {
    /* 远程搜索用户 */
    queryUsers (queryString, cb) {
      const { search } = this
      if (!queryString || queryString === search) {
        cb([])
        return false
      }
      this.$api.users.list({ name: queryString }).
        then(({ data: { users } }) => {
          cb(users)
          if (!users.length) {
            this.$message({
              type: 'info',
              message: '没有找到用户'
            })
          }
        })
    }
  }
}
