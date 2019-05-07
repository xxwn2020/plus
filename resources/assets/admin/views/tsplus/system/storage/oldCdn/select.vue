<template>
  <el-form-item label="CDN">
    <el-alert
      title="选择你的 CDN 平台，如果选择非文件系统，则所有文件都将储存在「本地公开」磁盘上。"
      :closable="false"
      type="warning">
    </el-alert>
    <el-select :value="value" @change="handle">
      <el-option value="filesystem" label="文件系统"></el-option>
      <el-option value="qiniu" label="七牛"></el-option>
      <el-option value="alioss" label="阿里云 OSS"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  export default {
    name: 'select',
    props: {
      handleSelect: { type: Function, required: true },
      value: { type: String, required: true }
    },
    data: () => ({
      disk: 'public'
    }),
    methods: {
      handle (event) {
        this.handleSelect(event)
      }
    }
  }
</script>

<style scoped>

</style>
