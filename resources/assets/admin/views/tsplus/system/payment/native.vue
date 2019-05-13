<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>原生支付</span>
    </div>
    <el-form ref="form" :model="form" label-width="120px">

    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'SystemPaymentNative',
    data: () => ({
      form: {}
    })
  }
</script>

<style scoped>

</style>
