<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      this.$store.dispatch('manageList/getList')
    }
  }
</script>
