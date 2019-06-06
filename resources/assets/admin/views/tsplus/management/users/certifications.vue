<template>
  <div class="certification-list-page">
    <el-card>
      <div slot="header">
        <span>{{$t('admin.certifications.list')}}</span>
        <el-button
          plain
          @click="goTo({name: 'management-users-certifications-add'})"
          style="float: right; padding: 3px 0"
          type="text"
        >{{$t('admin.certifications.create')}}
        </el-button>
      </div>
      <el-main v-loading="getLoading">
        <el-form ref="filterForm" :model="query" :inline="true">
          <el-select v-model="query.status">
            <el-option
              v-for="item in optionsList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        ></el-pagination>
        <el-table :data="page.data" border stripe>
          <el-table-column prop="id" label="#ID"></el-table-column>
          <el-table-column prop="data.name" :label="$t('admin.name')"></el-table-column>
          <el-table-column prop="data.phone" :label="$t('admin.phone')"></el-table-column>
          <el-table-column prop="data.number" :label="$t('admin.identify')"></el-table-column>
          <el-table-column prop="data.desc" :label="$t('admin.certifications.description')"></el-table-column>
          <el-table-column prop="data.org_name" :label="$t('admin.certifications.orgName')"></el-table-column>
          <el-table-column prop="data.org_address" :label="$t('admin.certifications.orgAddress')"></el-table-column>
          <el-table-column prop="category.display_name" label="认证类型"></el-table-column>
          <el-table-column label="证件照片">
            <template slot-scope="scope">
              <div v-if="scope.row.certification_name === 'org'">
                <a target="_blank" :href="url(scope.row.front)">证件照片</a>
              </div>
              <div v-else>
                <a target="_blank" :href="url(scope.row.front)">证件照片正面</a>
                <br>
                <a target="_blank" :href="url(scope.row.back)">证件照片反面</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="80px" :label="$t('admin.status')">
            <template slot-scope="scope">
              <el-button plain type="primary" v-if="scope.row.status === 1">已审</el-button>
              <el-button plain type="warning" v-else>待审</el-button>
            </template>
          </el-table-column>
          <el-table-column width="90px" :label="$t('admin.createdAt')">
            <template slot-scope="scope">{{scope.row.created_at | localTime }}</template>
          </el-table-column>
          <el-table-column :label="$t('admin.operation')">
            <template slot-scope="scope">
              <div v-if="scope.row.status !== 1">
                <el-button plain type="primary" v-if="scope.row.status === 1">已审</el-button>
                <el-button plain type="warning" v-else>待审</el-button>
              </div>
              <div v-else>
                <el-button
                  @click="goTo({name: 'management-users-certifications-edit', params: {id: scope.row.id}})"
                  plain
                  type="primary"
                  v-if="scope.row.status === 1"
                >{{$t('admin.edit')}}
                </el-button>
              </div>
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
        ></el-pagination>
      </el-main>
    </el-card>
  </div>
</template>
<script>
  import File from '@/api/file'
  import setQuery from '@/mixins/setQuery'

  export default {
    name: 'ManagementUserCertifications',
    mixins: [setQuery],
    data: () => ({
      query: {
        page: 1,
        limit: 15,
        certification_name: null,
        keyword: null,
        status: null
      },

      page: {},
      getLoading: false
    }),
    methods: {
      url (node) {
        return File.url(node, { w: 50, h: 50 })
      },
      fetchData () {
        this.fetchCertifications()
      },
      fetchCertifications () {
        const { query, getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.certifications.list(query).then(({ data: { counts, items } }) => {
            this.$set(this, 'page', items)
            this.$set(this, 'counts', counts)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    }
  }
</script>
