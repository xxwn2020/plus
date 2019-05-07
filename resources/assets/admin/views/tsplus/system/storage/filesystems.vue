<template>
  <el-main>
    <default-file-system/>
    <local-file-system/>
    <ali-oss/>
  </el-main>
</template>

<script>
  import DefaultFileSystem from './blocks/defaultFileSystem'
  import LocalFileSystem from './blocks/localFileSystem'
  import AliOss from './blocks/AliOss'

  export default {
    components: { DefaultFileSystem, LocalFileSystem, AliOss },
    name: 'filesystems'
  }
</script>

<style scoped>

</style>
