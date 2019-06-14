export default {
  data: () => ({
    saving: false,
    getting: false
  }),
  beforeMount () {
    const { $route: { query: { limit = 15, page = 1 } = {} } = {} } = this
    this.$set(this, 'query', {
      ...this.query,
      limit: parseInt(limit),
      page: parseInt(page)
    })

    this.fetchData()
  },
  watch: {
    '$route': function (to) {
      const {
        query: { limit = 15, page = 1 } = {}
      } = to
      this.$set(this, 'query', {
        ...this.query,
        limit: parseInt(limit),
        page: parseInt(page)
      })
      this.fetchData()
    }
  },
  methods: {
    /**
     * 页面数量更改
     */
    handleSizeChange (limit) {
      this.setQuery({ limit, page: 1 })
    },
    /**
     * 分页切换
     * @param page
     */
    pageChange (page) {
      this.setQuery({ page })
    },
    /**
     * 搜索
     */
    doSearch () {
      this.setQuery({ page: 1 })
    },
    /**
     * 设置query
     * @param {*} query
     * @param routeName
     */
    setQuery (query = {}, routeName = this.routeName) {
      let oldQ = Object.assign({}, this.query)
      let oldQuery = JSON.parse(JSON.stringify(oldQ))
      query = { ...oldQuery, ...query }
      this.$router.push({
        name: routeName,
        query
      })
    }
  }
}
