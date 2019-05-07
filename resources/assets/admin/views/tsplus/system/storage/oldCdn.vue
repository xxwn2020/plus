<template>
  <el-main>
    <local :value="seleced" :handle-select="handleSelect" v-if="seleced === 'filesystem'"></local>
    <qiniu :value="seleced" :handle-select="handleSelect" v-if="seleced === 'qiniu'"/>
    <ali-oss :value="seleced" :handle-select="handleSelect" v-if="seleced === 'alioss'"/>
  </el-main>
</template>

<script>
  import Local from './oldCdn/local'
  import Qiniu from './oldCdn/qiniu'
  import AliOss from './oldCdn/aliOss'

  export default {
    components: {
      Local,
      Qiniu,
      AliOss
    },
    name: 'oldCdn',
    data: () => ({
      seleced: null,
      getLoading: false
    }),
    methods: {
      handleSelect (cdn) {
        this.seleced = cdn
      },
      /* 获取服务端配置 */
      getSelectedCdn () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getSelectedCdn().then(({ data: { seleced } }) => {
            this.$set(this, 'seleced', seleced)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getSelectedCdn()
    }
  }
</script>

<style scoped>

</style>
