<template>
  <el-main class="storage-basic">
    <file-size/>
    <mimes/>
    <pictureControl/>
  </el-main>
</template>

<script>
  import FileSize from './blocks/fileSize'
  import Mimes from './blocks/mimes'
  import PictureControl from './blocks/pictureControl'

  export default {
    components: { FileSize, Mimes, PictureControl },
    name: 'basic'
  }
</script>

<style scoped lang="scss">
  @import "./_storage.scss";
</style>
