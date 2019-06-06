<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('admin.storage.basic.size') }}</span>
    </div>
    <el-form v-loading="getLoading" ref="fileSize" :model="size" label-width="80px">
      <el-alert
        :show-icon="true"
        :closable="false"
        style="margin-bottom: 20px"
        :title="`设置文件最小限制，有助于限制用户上传过小的非法文件，例如 1px * 1px 这类图片，当然图片有像素单独限制， 但是无法排除用户进行文件伪造上传，所以文件限制是第二道防护关卡。
      而文件最大限制，是为了防止用户仅无限制的大型文件上传以浪费文件储存空间！你的系统最大允许 ${system.max / 1024} KB
      ，所以最大不建议超出这个值！不正确的文件上传大小限制，将会影响到正常用户的上传！请配置适合你应用的限制信息。`"
        type="warning">
      </el-alert>
      <el-form-item prop="min" label="最小字节">
        <el-input v-model.number="size.min" placeholder="输入最小文件限制">
          <template slot="append">{{minFormat}} KB</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="max" label="最大字节">
        <el-input v-model.number="size.max" placeholder="输入最大文件限制">
          <template slot="append">{{maxFormat}} KB</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="saveConfigure" :loading="saveLoading">
          {{$t('admin.submit')}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'fileSize',
    data: () => ({
      system: 0,
      size: {
        max: 0,
        min: 0
      },
      getLoading: false,
      saveLoading: false
    }),
    computed: {
      maxFormat () {
        const { size: { max } } = this
        return ~~(max / 1024)
      },
      minFormat () {
        const { size: { min } } = this
        return ~~(min / 1024)
      }
    },
    methods: {
      /* 保存配置 */
      saveConfigure () {
        const { size, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.storageConfig.saveFileSize({ size }).then(() => {
            this.showSuccess(this.$t('admin.success'))
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      /* 获取服务器配置 */
      getConfigure () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.storageConfig.fileSize().then(({ data: { system, size } }) => {
            this.$set(this, 'system', system)
            this.$set(this, 'size', size)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }

      }
    },
    beforeMount () {
      this.getConfigure()
    }
  }
</script>
