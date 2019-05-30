<template>
  <el-main>
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('admin.promotion.ad.root')}}</span>
        <el-button @click="$router.push({name: 'Promotion-AddAd'})" type="text">{{$t('admin.add')}}</el-button>
      </div>
      <el-form ref="adFilter" :model="query" :inline="true">
        <el-form-item>
          <el-select size="mini" v-model="query.space_id">
            <el-option label="全部" :value="0"/>
            <el-option
              v-for="item in adSpaces"
              :key="item.id"
              :label="item.alias"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input size="mini" v-model="query.keyword" placeholder="广告搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" :loading="getLoading" @click="doSearch" size="mini">{{$t('admin.submit')}}
          </el-button>
        </el-form-item>
      </el-form>
      <el-pagination
        class="top"
        @size-change="handleSizeChange"
        @current-change="pageChange"
        :current-page="page.current_page"
        :page-sizes="[15, 30, 50]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      />
      <el-table
        v-loading="getLoading"
        :data="page.data"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="广告标题">
        </el-table-column>
        <el-table-column
          label="广告位">
          <template slot-scope="{row:ad}">
            {{ad.space_id | adPosition(adSpaces)}}
          </template>
        </el-table-column>
        <el-table-column
          label="广告图">
          <template slot-scope="{row: ad}">
            <el-link target="_blank" :underline="false" :href="ad.data.image">
              <img class='ad-image' v-if="ad.data.image" :src="ad.data.image"/>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="广告链接">
          <template slot-scope="{row: ad}">
            <el-link v-if="ad.data.link" target="_blank" :href="ad.data.link">点击跳转</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
        >
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="{row: ad}">
            {{ad.created_at | localTime }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('admin.operation')"
        >
          <template slot-scope="{row:ad}">
            <el-button size="mini" @click="$router.push({name: 'Promotion-EditAd', params: {id: ad.id}})" plain type="primary">{{$t('admin.edit')}}</el-button>
            <el-button size="mini" :loading="deleting === ad.id" @click="delAd(ad.id)" plain type="danger">{{$t('admin.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="bottom"
        @size-change="handleSizeChange"
        @current-change="pageChange"
        :current-page="page.current_page"
        :page-sizes="[15, 30, 50]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      />
    </el-card>
  </el-main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import setQuery from '@/mixins/setQuery'

  export default {
    mixins: [setQuery],
    name: 'ad',
    data: () => ({
      page: {},
      query: {
        limit: 15,
        page: 1,
        keyword: '',
        space_id: 0
      },
      deleting: null,
      getLoading: false,
      saveLoading: false
    }),
    filters: {
      adPosition (value, adSpaces) {
        const space = adSpaces.find(space => (
          space.id === value
        ))
        return space ? space.alias : '未知'
      }
    },
    computed: {
      ...mapGetters(['adSpaces'])
    },
    methods: {
      fetchData () {
        this.getAds()
      },
      getAds () {
        const { query, getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.promotion.list(query).then(({ data }) => {
            this.$set(this, 'page', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      delAd(id) {
        const {deleting} = this
        if (deleting !== id) {
          this.$confirm('此操作将删除此条广告，是否继续?', '提示', {
            type: 'warning'
          })
          .then(() => {
            this.$set(this, 'deleting', id);
            this.$api.promotion.del(id).then(({ data }) => {
              this.showSuccess()
              this.fetchData();
            }).catch(this.showApiError).finally(() => {
              this.$set(this, 'deleting', null)
            })
          })
            .catch(() => {})
        }
      }
    },
    async created () {
      this.query = {
        ...this.query,
        space_id: this.$route.query.space_id ? parseInt(this.$route.query.space_id) : 0
      }
      await this.$store.dispatch('ad/fetchAdSpaces')
    }
  }
</script>

<style scoped>
  .ad-image {
    max-width: 40px;
    max-height: 40px;
    padding: 4px;
    background-color: #f5f8fa;
    border: 1px solid #ddd;
  }
</style>
