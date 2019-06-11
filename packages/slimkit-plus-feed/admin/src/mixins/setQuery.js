export default {
  data: () => ({
    saving: false,
    getting: false
  }),
  beforeMount () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      console.log('xxx')
    }
  }
}
