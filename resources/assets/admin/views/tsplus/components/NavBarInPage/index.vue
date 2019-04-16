<template>
  <el-menu class="el-menu-demo" :default-active="navIndex" :router="true" mode="horizontal">
    <el-menu-item
      v-for="(route, index) in routes"
      :key="index"
      :index="route.name"
      :route="{name: route.name}"
    >{{generateTitle(route.meta.title)}}</el-menu-item>
  </el-menu>
</template>
<script>
import { generateTitle } from "@/utils/i18n";
export default {
  name: "NavBarInPage",
  data: () => ({
    routes: []
  }),
  methods: {
    generateTitle,
    getBrotherRoutes(firstLevelRoute, deep) {
      deep--;
      if (deep === 0) {
        return firstLevelRoute.children;
      } else {
        const nextLevelRoute = firstLevelRoute.children.find(
          route => route.name === this.allRouteName[deep]
        );
        return this.getBrotherRoutes(nextLevelRoute, deep);
      }
    }
  },
  computed: {
    allRouteName() {
      return this.$route.matched.reverse().map(match => match.name);
    },
    navIndex() {
      const {
        $route: { name = "" }
      } = this;

      return name;
    }
  },
  created() {
    if (this.$route.meta.tabs) {
      // 父级路由深度, 扣除当前路由
      const deep = this.$route.matched.length - 1;
      // 第一级路由名称
      const firstLevelRouteName = this.$route.matched[0].name;

      const firstLevelRoute = this.$router.options.routes.find(
        item => item.name === firstLevelRouteName
      );

      this.$set(
        this,
        "routes",
        this.getBrotherRoutes(firstLevelRoute, deep).filter(
          item => item.hidden !== true
        )
      );
    }
  }
};
</script>

