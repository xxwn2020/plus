<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('admin.storage.basic.mime') }}</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-form ref="mimeForm" label-width="150px">
      <el-form-item label="允许的MIME-TYPE">
        <el-tag
          class="el-tag-custom"
          :key="mime"
          v-for="(mime, index) in mimes"
          closable
          :disable-transitions="false"
          @close="handleClose(index)">
          {{mime}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          placeholder="输入完成后，直接回车"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveMimes" :loading="saveLoading" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'fileSystemsMimes',
    data: () => ({
      mimes: [],
      saveLoading: false,
      getLoading: false,
      inputVisible: false,
      inputValue: null
    }),
    methods: {
      showInput () {
        this.$set(this, 'inputVisible', true)
      },
      handleInputConfirm () {
        let inputValue = this.inputValue
        let mimes = Object.assign([], this.mimes)
        if (inputValue) {
          mimes.push(inputValue)
          mimes = Array.from(new Set(mimes))
        }
        this.$set(this, 'mimes', mimes)
        this.inputVisible = false
        this.inputValue = ''
      },
      getMimes () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.getMimes().then(({ data }) => {
            this.$set(this, 'mimes', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      saveMimes () {
        const { mimes, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveMimes({ extensions: mimes }).then(() => {
            this.showSuccess(this.$t('admin.success'))
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      }
    },
    beforeMount () {
      this.getMimes()
    }
  }
</script>

<style scoped lang="scss">
  .el-tag-custom {
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }
</style>
