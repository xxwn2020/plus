<template>

</template>

<script>
  export default {
    name: 'currency-statistics',
    data: () => ({
      items: [],
      getLoading: false
    }),
    beforeMount () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.currency.statistics().then(({ data }) => {
            console.log(data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
