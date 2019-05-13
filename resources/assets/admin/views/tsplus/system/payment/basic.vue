<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>基础设置</span>
    </div>
    <secret-required></secret-required>
  </el-card>
</template>

<script>
  import SecretRequired from './components/secretRequired'

  export default {
    components: { SecretRequired },
    name: 'SystemPaymentBasic',
    data: () => ({
      form: {}
    })
  }
</script>

<style scoped>

</style>
