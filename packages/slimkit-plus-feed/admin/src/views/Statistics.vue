<template>
  <el-main>
    <el-card shadow="never"
      class="box-card">
      <div slot="header"
        class="clearfix">
        <span>{{ i18n('statistics') }}</span>
      </div>
      <div v-for="o in 4"
        :key="o"
        class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </el-main>
</template>

<script>
export default {
  name: 'Statistics',
  created() {
    this.fetchStatistics()
  },
  methods: {
    fetchStatistics() {
      this.$api.getStatistics()
        .then(({data}) => {
          console.log(data)
      })
    }
  }
}
</script>
