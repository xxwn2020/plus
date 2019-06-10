<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>应用列表</span>
      </div>
      <div class="manageBlocks">
        <router-link class="manageBlock" :to="{name: 'Package-Manage', params: {key}}" :key="manage.name"
                     v-for="(manage, key) in manages">
          <img class="__icon-img" :src="manage['icon']"
               v-if="manage['icon'].substr(4, 3) === '://' || manage['icon'].substr(5, 3) === '://'">
          <span v-else class="__icon">{{ manage['icon'] }}</span>
          <span>{{ manage['name'] }}</span>
        </router-link>
      </div>
    </el-card>
  </el-main>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'index',
    computed: {
      ...mapGetters({
        manages: 'manageList'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .manageBlocks {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .manageBlock {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 20px;
      user-select: none;

      .__icon {
        font-size: 64px;
        color: #78909c;
      }

      .__icon-img {
        border: none;
        width: 64px;
        height: 64px;

        &:after {
          display: block;
          content: '';
          padding-top: 100%;
        }
      }
    }

  }
</style>
