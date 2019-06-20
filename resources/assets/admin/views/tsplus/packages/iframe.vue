<style lang="css" module>
  .appIframe {
    position: absolute;
    top: 84px;
    height: 100%;
    width: 100%;
    overflow: auto;
    border: none;
  }
</style>

<template>
  <iframe class="appIframe" :src="uri"></iframe>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        manages: 'manageList'
      }),
      uri () {
        const { key } = this.$route.params
        const { [key]: { uri } = {} } = this.manages

        return uri
      }
    }
  }
</script>
