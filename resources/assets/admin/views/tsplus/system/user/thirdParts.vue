<template>
  <div>
    <qq class="setting-child"></qq>
    <wechat class="setting-child"/>
    <weibo class="setting-child"/>
    <wechat-mp class="setting-child"/>
    <easemob class="setting-child"></easemob>
  </div>
</template>

<script>
  import qq from './qq/qq'
  import wechat from './wechat/wechat'
  import weibo from './weibo/weibo'
  import wechatMp from './wechat-mp/wechat-mp'
  import easemob from './easemob/easemob'

  export default {
    components: { qq, wechat, weibo, wechatMp, easemob },
    name: 'thirdParts'
  }
</script>

<style scoped>

</style>
