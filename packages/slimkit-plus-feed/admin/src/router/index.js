import Vue from 'vue'
import Router from 'vue-router'
import statistics from './module/statistics'
import setting from './module/setting'
import feeds from './module/feeds'
import topics from './module/topics'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  // 此配置在vue.config.js中配置baseUrl
  base: process.env.BASE_URL,
  routes: [
    statistics,
    setting,
    feeds,
    topics
  ]
})
