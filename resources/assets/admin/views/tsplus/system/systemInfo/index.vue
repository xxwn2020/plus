<template>
  <el-card :body-style="{ padding: '0px' }">
    <div slot="header">
      <span>系统信息</span>
    </div>
    <el-main v-loading="loading">
      <ul class="list-group">
        <li v-for="(per, index) in system" :key="index" class="list-group-item">
          <span style="font-size: 16px;">{{ translates[index] }} :</span>
          <span>{{ per }}</span>
        </li>
      </ul>
    </el-main>
  </el-card>
</template>

<script>
export default {
  name: "SystemInfo",
  data: () => ({
    translates: {
      app_version: "Plus 版本",
      php_version: "PHP 版本",
      os: "操作系统",
      server: "运行环境",
      domain_ip: "域名 / IP",
      db: "数据库",
      root: "程序目录",
      laravel_version: "Laravel 版本",
      max_upload_size: "最大上传限制",
      server_date: "服务器时间",
      local_date: "本地时间",
      protocol: "通信协议",
      port: "监听端口",
      execute_time: "执行时间",
      agent: "你使用的浏览器",
      user_ip: "你的IP",
      disk: "服务端剩余磁盘空间"
    },
    system: {
      agent: null,
      app_version: null,
      db: null,
      disk: null,
      domain_ip: null,
      execute_time: null,
      laravel_version: null,
      local_date: null,
      max_upload_size: null,
      os: null,
      php_version: null,
      port: null,
      protocol: null,
      root: null,
      server: null,
      server_date: null,
      user_ip: null
    },
    loading: false
  }),
  methods: {
    getSystemInfo() {
      this.$set(this, "loading", true);
      this.$api.systemInfo
        .getSystemInfo()
        .then(({ data = {} }) => {
          this.system = data;
        })
        .catch(({ response: { data: { message = "加载失败" } = {} } = {} }) => {
          this.error = true;
          this.$notify({
            title: "错误",
            message,
            type: "error"
          });
        })
        .finally(() => {
          this.$set(this, "loading", false);
        });
    }
  },
  mounted() {
    this.getSystemInfo();
  }
};
</script>
<style>
.list-group {
  border: 1px solid #d3e0e9;
  padding: 0;
  margin: 0;
  border-radius: 3px;
}
.list-group li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-top: -1px;
  background-color: #fff;
  border: 1px solid #d3e0e9;
  border-width: 1px 0;
  word-break: break-all;
}
.list-group li:last-child {
  border-width: 1px 0 0 0;
}
</style>

