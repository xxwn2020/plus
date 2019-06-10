<template>
  <el-card shadow="never">
    <div slot="header">
      <span>缓存管理</span>
    </div>
    <el-form>
      <el-alert title="清除所有数据缓存, 不包括配置和路由缓存" type="warning" :closable="false" show-icon></el-alert>
      <el-form-item label="数据缓存">
        <el-button
          type="danger"
          plain
          :loading="dataCacheLoading"
          @click="cleanDataCache"
        >清理数据缓存
        </el-button>
      </el-form-item>
      <el-alert title="清除配置缓存,并重新缓存,此操作能提高性能" type="success" :closable="false" show-icon></el-alert>
      <el-form-item label="配置缓存">
        <el-button
          type="danger"
          plain
          :loading="configCacheLoading"
          @click="cleanConfigCache"
        >重置配置缓存
        </el-button>
      </el-form-item>
      <el-alert title="清除路由缓存,并重新缓存,此操作能提高性能" type="success" :closable="false" show-icon></el-alert>
      <el-form-item label="路由缓存">
        <el-button
          type="danger"
          plain
          :loading="routeCacheLoading"
          @click="cleanRouteCache"
        >重置路由缓存
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  export default {
    name: 'OperationBasicCache',
    data: () => ({
      dataCacheLoading: false,
      configCacheLoading: false,
      routeCacheLoading: false
    }),
    methods: {
      /* 清理数据缓存 */
      cleanDataCache () {
        const { dataCacheLoading } = this
        this.$confirm('此操作将清除所有已经缓存的数据, 继续?', '提示', {
          type: 'warning'
        }).then(() => {
          if (!dataCacheLoading) {
            this.$set(this, 'dataCacheLoading', true)
            this.$api.caches.cleanDataCache().then(({ data }) => {
              this.showSuccess('数据缓存清理成功')
            }).catch(this.showApiError).finally(() => {
              this.$set(this, 'dataCacheLoading', false)
            })
          }
        })
      },
      /* 重新缓存文件配置 */
      cleanConfigCache () {
        const { configCacheLoading } = this

        if (!configCacheLoading) {
          this.$set(this, 'configCacheLoading', true)
          this.$api.caches.cleanConfigCache().then(({ data }) => {
            this.showSuccess('配置缓存清理成功')
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'configCacheLoading', false)
          })
        }
      },
      /* 重新缓存路由配置 */
      cleanRouteCache () {
        const { routeCacheLoading } = this
        if (!routeCacheLoading) {
          this.$set(this, 'routeCacheLoading', true)
          this.$api.caches.cleanConfigCache().then(({ data }) => {
            this.showSuccess('路由缓存清理成功')
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'routeCacheLoading', false)
          })
        }
      }
    }
  }
</script>
