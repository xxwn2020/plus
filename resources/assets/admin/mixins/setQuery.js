export default {
  data: () => ({
    query: {},
    page: {
      current_page: 1,
      total: 0
    }
  }),
  watch: {
    '$route': function(to) {
      this.query = {
        ...this.query,
        ...{
          ...this.$route.query,
          ...{
            limit: parseInt(to.query.limit || 15),
            page: parseInt(to.query.page || 1)
          }
        }
      }
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
  },
  mounted () {
    this.fetchData()
  },
  created () {
    this.query = {
      ...this.query,
      ...{
        ...this.$route.query,
        ...{
          limit: parseInt(this.$route.query.limit || 15),
          page: parseInt(this.$route.query.page || 1)
        }
      }
    }
  }
}
