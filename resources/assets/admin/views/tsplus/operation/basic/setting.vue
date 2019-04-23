<template>
  <el-main v-loading="getLoading">
    <el-form :model="setting" ref="setting" label-width="80px">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="积分设置" name="1">
          <el-alert
            class="setting-alert"
            :closable="false"
            title="启动规则，用户完成相应的节点操作可以获取对应的奖励，关闭规则，用户完成相应的节点操作不能获取对应的奖励"
            type="warning"
            show-icon
          ></el-alert>
          <el-form-item prop="gold.status" label="积分开关">
            <el-radio-group v-model="setting.gold.status">
              <el-radio
                v-for="item in [{label: false, title: '关闭'},{label: true, title: '开启'}]"
                :key="item.key"
                :label="item.label"
              >{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="打赏设置" name="2">
          <el-alert
            class="setting-alert"
            :closable="false"
            title="用户打赏开启与关闭"
            type="warning"
            show-icon
          ></el-alert>
          <el-form-item prop="reward.status" label="打赏开关">
            <el-radio-group v-model="setting.reward.status">
              <el-radio
                v-for="item in [{label: false, title: '关闭'},{label: true, title: '开启'}]"
                :key="item.key"
                :label="item.label"
              >{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-alert
            class="setting-alert"
            :closable="false"
            title="打赏金额配置，单位(分)。最少为1分，多个金额用英文半角符号“,”分割 例如：5,10,15。"
            type="warning"
            show-icon
          ></el-alert>
          <el-form-item prop="reward.amounts" label="打赏金额">
            <el-input v-model="setting.reward.amounts"></el-input>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="昵称设置" name="3">
          <el-alert
            class="setting-alert"
            :closable="false"
            title="站点是否开启匿名，开启后用户可以选择匿名操作部分内容"
            type="warning"
            show-icon
          ></el-alert>
          <el-form-item prop="anonymous.status" label="匿名开关">
            <el-radio-group v-model="setting.anonymous.status">
              <el-radio
                v-for="item in [{label: false, title: '关闭'},{label: true, title: '开启'}]"
                :key="item.key"
                :label="item.label"
              >{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-alert
            class="setting-alert"
            :closable="false"
            title="不能被用户注册的昵称, 多个昵称用半角「,」隔开"
            type="warning"
            show-icon
          ></el-alert>
          <el-form-item prop="reserved_nickname" label="预留昵称">
            <el-input v-model="setting.reserved_nickname" placeholder></el-input>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="客服设置" name="4">
          <el-form-item prop="client_email" label="客服邮箱">
            <el-input v-model="setting.client_email" placeholder="客服邮箱"></el-input>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="其他设置" name="5">
          <el-form-item prop="user_invite_template" label="邀请模板">
            <el-input
              type="textarea"
              v-model="setting.user_invite_template"
              placeholder="短信邀请模板, App端使用"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-form-item class="submit-item">
        <el-button
          type="primary"
          :loading="saveLoading"
          @click="saveConfigures"
        >{{ $t('admin.submit') }}</el-button>
        <el-button @click="goBack(true)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
export default {
  name: "OperationBasicSetting",
  data: () => ({
    activeNames: "1",
    setting: {
      gold: {
        status: true
      },
      reward: {
        status: true,
        amounts: ""
      },
      reserved_nickname: "",
      client_email: "",
      user_invite_template: "",
      anonymous: {
        status: false,
        rule: ""
      },
      about_url: null
    },
    getLoading: false,
    saveLoading: false
  }),
  computed: {},
  methods: {
    /* 保存配置 */
    saveConfigures() {
      const { setting, saveLoading } = this;
      if (!saveLoading) {
        this.$set(this, "saveLoading", true);
        this.$api.configures
          .save({ site: setting })
          .then(({ data }) => {
            this.showSuccess(data);
          })
          .catch(this.showApiError)
          .finally(() => {
            this.$set(this, "saveLoading", false);
          });
      }
    },
    /* 获取配置 */
    fetchConfigures() {
      const { getLoading } = this;
      if (!getLoading) {
        this.$set(this, "getLoading", true);
        this.$api.configures
          .list()
          .then(({ data }) => {
            this.$set(this, "setting", data);
          })
          .catch(this.showApiError)
          .finally(() => {
            this.$set(this, "getLoading", false);
          });
      }
    }
  },
  mounted() {
    this.fetchConfigures();
  }
};
</script>
<style lang="css">
.submit-item {
  margin-top: 20px;
}
.setting-alert {
  margin-bottom: 10px;
}
</style>

