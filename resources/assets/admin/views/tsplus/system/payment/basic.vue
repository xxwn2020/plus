<template>
  <div>
    <secret-required></secret-required>
  </div>
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
