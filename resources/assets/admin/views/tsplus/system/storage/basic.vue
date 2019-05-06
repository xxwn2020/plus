<template>
  <el-main class="storage-basic">
    <file-size/>
    <mimes></mimes>
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $t('admin.storage.basic.picture') }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </el-main>

</template>

<script>
  import FileSize from './blocks/fileSize'
  import Mimes from './blocks/mimes'

  export default {
    components: { FileSize, Mimes },
    name: 'basic'
  }
</script>

<style scoped lang="scss">
  @import "./_storage.scss";
</style>
