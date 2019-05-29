<template>
  <div class="menus">
    <el-main>

    </el-main>
  </div>
</template>

<script>
  export default {
    data: () => ({
      navs: [],
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      getPcNavs () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.template.getPcNavs(0).then(({ data }) => {
            console.log(data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getPcNavs()
    }
  }
</script>
