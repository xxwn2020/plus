export default {
  data: () => ({
    query: {},
    page: {
      current_page: 1,
      total: 0
    }
  }),
  watch: {
    '$route': function (to) {
      this.query = {
        ...this.query,
        ...{
          ...this.$route.query,
          ...{
            limit: parseInt(this.$route.query.limit || 15),
            page: parseInt(this.$route.query.page || 1),
            role: parseInt(this.$route.query.role || 0),
            trashed: parseInt(this.$route.query.trashed || 0),
            follow: parseInt(this.$route.query.follow || 0),
            recommend: parseInt(this.$route.query.recommend || 0)
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
    */
    setQuery (query = {}, routeName = this.routeName) {
      let oldQ = Object.assign({}, this.query)
      let oldQuery = JSON.parse(JSON.stringify(oldQ))
      query = { ...oldQuery, ...query }
      Object.keys(query).map(key => {
        if (!query[key]) {
          delete query[key]
        }
      })
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
          page: parseInt(this.$route.query.page || 1),
          role: parseInt(this.$route.query.role || 0),
          trashed: parseInt(this.$route.query.trashed || 0),
          follow: parseInt(this.$route.query.follow || 0),
          recommend: parseInt(this.$route.query.recommend || 0)
        }
      }
    }
  }
}
