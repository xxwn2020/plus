<template>
  <el-menu id="nav"
    :default-active="navIndex"
    :router="true"
    mode="horizontal">
    <el-menu-item
      v-for="(route, index) in routes"
      :key="index"
      :index="route.name"
      :route="{name: route.name}"
    >{{generateTitle(route.meta.title)}}
    </el-menu-item>
  </el-menu>
</template>
<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'NavBarInPage',
  data: () => ({
    routes: []
  }),
  methods: {
    generateTitle
  },
  computed: {
    navIndex () {
      const {
        $route: { name = '' }
      } = this

      return name
    }
  },
  created () {
    const { '$router': { options: { routes } } } = this

    this.$set(
      this,
      'routes',
      routes
    )
  }
}
</script>
