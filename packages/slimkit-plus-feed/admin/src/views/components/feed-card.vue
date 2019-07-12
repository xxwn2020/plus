<template>
  <el-card shadow="hover"
    class="box-card"
  >
    <div class="feed-images"
      v-if="image">
      <el-image
        lazy
        :src="url(image.id, {w: 120, h: 120})"
        class="image"></el-image>
      <span class="image-number">
        {{feed.images.length}}张图片
      </span>
    </div>
    <div class="content">
      <p v-if="image"
        class="feed-content image-content">{{feed.feed_content}}</p>
      <p class="feed-content pure-text"
        v-else>{{feed.feed_content}} </p>
      <div class="bottom clearfix">
        <time class="time">{{ feed.created_at | localTime }}</time>
      </div>
      <el-divider></el-divider>
      <div class="actions">
        <el-tooltip v-if="feed.deleted_at === null"
          class="item"
          effect="dark"
          :content="pinnedAction.tip"
          placement="top">
          <el-button plain
            circle
            :loading="saving"
            type="success"
            class="button delete-button"
            icon="el-icon-upload2"
            @click="pinnedAction.action"
          >
          </el-button>
        </el-tooltip>
        <el-tooltip class="item"
          effect="dark"
          :content="feed.deleted_at === null ? '放入回收站' : '移出回收站'"
          placement="top">
          <el-button plain
            v-if="feed.deleted_at === null"
            circle
            :loading="deleting"
            @click="destroy"
            type="danger"
            class="button delete-button"
            icon="el-icon-delete">
          </el-button>
          <el-button plain
            v-else
            circle
            :loading="restoring"
            @click="restore"
            type="success"
            class="button delete-button"
            icon="el-icon-refresh">
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          :content="`评论数：${feed.feed_comment_count}`"
          placement="top">
          <el-button type="primary"
            plain
            circle
            icon="el-icon-chat-line-square">
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          :content="`点赞数：${feed.like_count}`"
          placement="top">
          <el-button type="primary"
            plain
            circle
            icon="el-icon-star-off">
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="预览动态"
          placement="top">
          <el-button type="primary"
            plain
            circle
            @click="showDialog = true"
            icon="el-icon-view">
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <el-dialog
      :fullscreen="feed.images.length === 0 ? false : true"
      width="50%"
      title="动态预览"
      :visible.sync="showDialog"
      :before-close="handleClose">
      <div :class="['feed-detail', {noImage: feed.images.length === 0 && !feed.video}]">
        <div class="user-info">
          <div class="avatar">
            <el-image v-if="avatar"
              :src="avatar"></el-image>
            <i v-else
              class="el-icon-user"></i>
          </div>
          <div class="info">
            <span>{{feed.user.name}}「#{{feed.user.id}}」</span>
            <span>签名：{{feed.user.bio}}</span>
          </div>
        </div>
        <div class="images">
          <el-image fit="cover"
            v-for="image in feed.images"
            :key="image.id"
            :src="url(image.id)"
            class="image"></el-image>
          <video :poster="url(feed.video.cover_id)"
                 class="video"
            :src="url(feed.video.video_id)"
            v-if="feed.video">
          </video>
        </div>
        <div class="content">
          {{feed.feed_content}}
        </div>
      </div>
      <span slot="footer"
        class="dialog-footer">
        <el-button type="primary"
          @click="showDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { url } from '@/utils/tools'

export default {
  name: 'feed-card',
  props: {
    feed: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    saving: false,
    deleting: false,
    restoring: false,
    showDialog: false
  }),
  methods: {
    url,
    handleClose (done) {
      done()
      this.$set(this, 'showDialog', false)
    },
    destroy () {
      const { feed: { id } } = this
      this.$confirm(`确定要将该条动态放入回收站吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$set(this, 'deleting', true)
        this.$api.destroy(id).then(() => {
          this.Success()
          this.callback()
        }).catch(this.showApiError).finally(() => {
          this.$set(this, 'deleting', false)
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },
    restore () {
      const { feed: { id } } = this
      this.$confirm(`确定要将该条动态移出回收站吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$set(this, 'restoring', true)
        this.$api.restore(id).then(() => {
          this.Success()
          this.callback()
        }).catch(this.showApiError).finally(() => {
          this.$set(this, 'restoring', false)
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },
    settingAction () {
      this.$prompt('该动态当前为非置顶状，需要人工置顶请输入需要置顶的天数！', '置顶动态', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '输入大于0并且是整数的天数',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '请输入正整数'
      }).then(({ value }) => {
        this.setPinned(value)
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },
    setPinned (day) {
      if (!day) {
        this.$notify({
          title: '错误',
          message: '请输入置顶天数',
          type: 'error'
        })
        return
      }
      const { feed: { id } = {} } = this
      this.sLoading(true)
      this.$api.setPinned(id, day).then(({ data }) => {
        this.Success(data)
        this.callback()
      }).catch(this.showApiError).finally(() => {
        this.sLoading(false)
      })
    },
    passAction () {
      const { pinnedAction: { amount, day, id } } = this
      this.$confirm(`该动态使用${amount}积分申请置顶${day}天，是否同意？`, '提示', {
        confirmButtonText: '同意',
        cancelButtonText: '驳回',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then(() => {
        this.sLoading(true)
        this.$api.passPinned(id).then(({ data }) => {
          this.Success(data)
          this.callback()
        }).catch(this.showApiError).finally(() => {
          this.sLoading(false)
        })
      }).catch(action => {
        if (action === 'cancel') {
          this.sLoading(true)
          this.$api.rejectPinned(id).then(() => {
            this.Success()
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        } else {
          this.$message.info('取消操作')
        }
      })
    },
    unPinned () {
      const { pinnedAction: { id } } = this
      this.$confirm(`是否要取消该动态的置顶状态？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sLoading(true)
        this.$api.unPinned(id).then(() => {
          this.Success()
          this.callback()
        }).catch(this.showApiError).finally(() => {
          this.sLoading(false)
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    }
  },
  computed: {
    avatar () {
      const { feed: { user: { avatar: { url = '' } = {} } = {} } = {} } = this
      return url
    },
    image () {
      const { feed: { images = [] } = {} } = this
      return images.length > 0 ? images[0] : false
    },
    /**
     * 置顶按钮的显示内容
     * @returns {{action: default.methods.unPinned, tip: string}|{action: default.methods.settingAction, tip: string}|{action: default.methods.passAction, tip: string}}
     */
    pinnedAction () {
      const { feed: { pinned } = {} } = this
      if (!pinned) {
        return {
          tip: '设置置顶',
          action: this.settingAction
        }
      }
      const { expires_at: expiresAt = null, amount, day, id } = pinned
      if (!expiresAt) {
        return {
          tip: '审核置顶',
          action: this.passAction,
          amount,
          day,
          id
        }
      }
      let now = new Date()
      let expiresAtTime = new Date(expiresAt)
      if (now.getTime() < expiresAtTime.getTime()) {
        return {
          tip: '取消置顶',
          action: this.unPinned,
          id
        }
      }

      return {
        tip: '设置置顶',
        action: this.settingAction
      }
    }
  }
}
</script>

<style scoped
  lang="scss">
  .el-button {
    margin: 2px !important;
  }

  .box-card {
    .feed-detail {
      display: flex;
      flex-direction: row;

      &.noImage {
        flex-direction: column;

        .user-info {
          display: flex;
          flex-direction: row;

          .avatar {
            flex: 1
          }

          .info {
            justify-content: space-between;
            align-items: baseline;
            display: flex;
            flex-direction: column;
            font-size: 18px;
            padding-left: 20px;
          }
        }

        .content {
          margin-top: 20px;
          padding: 20px;
        }
      }

      .user-info {
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
        padding-right: 20px;

        .avatar {
          flex: 2;

          .el-image {
            border-radius: 100%;
          }
        }

        .info {
          flex: 4;
          display: flex;
          justify-content: flex-start;
          padding-right: 20px;
          flex-direction: column;
          align-items: flex-end;
        }
      }

      .images {
        flex: 2;
        video {
          width: 100%;
        }
      }

      .content {
        flex: 1;
        padding: 0 20px;
        box-sizing: border-box;
        justify-content: center;
        word-break: break-all;
        font-size: 16px;
        line-height: 1.6;
        background: rgba(0, 0, 0, .1);
        color: #666;
      }
    }

    .feed-images {
      position: relative;

      .image {
        width: 100%;
      }

      .image-number {
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        font-size: 12px;
        color: #fff;
        border-radius: 3px;
        background: rgba(0, 0, 0, .3);
      }
    }

    .content {
      .feed-content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        color: slategray;

        &.image-content {
          -webkit-line-clamp: 2;
        }

        &.pure-text {
          -webkit-line-clamp: 15;
        }
      }

      .bottom {
        .time {
          color: #e4e5e5;
        }
      }

      .actions {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        flex-wrap: wrap;
        justify-content: space-around;

        .button {
          display: block;
        }
      }
    }

  }
</style>
