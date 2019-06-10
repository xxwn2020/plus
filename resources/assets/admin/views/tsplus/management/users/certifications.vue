<template>
  <div class="certification-list-page">
    <el-card shadow="never">
      <div slot="header">
        <span>{{$t('admin.certifications.list')}}</span>
        <el-button
          @click="goTo({name: 'management-users-certifications-add'})"
          style="float: right; padding: 3px 0"
          type="text"
        >{{$t('admin.certifications.create')}}
        </el-button>
      </div>
      <el-form class="filterForm" ref="filterForm" :model="query" :inline="true">
        <el-form-item>
          <el-autocomplete
            :fetch-suggestions="queryUsers"
            v-model="query.name"
            placeholder="可模糊搜索用户名"
            @select="selectUser"
            value-key="name"
            :debounce="500"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.status">
            <el-option
              v-for="item in statuss.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.certification_name" placeholder="placeholder">
            <el-option label="全部" value=""/>
            <el-option
              v-for="item in categories"
              :key="item.name"
              :label="item.display_name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="doSearch" :loading="getLoading" type="primary">{{$t('admin.submit')}}</el-button>
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
      ></el-pagination>
      <el-table v-loading="getLoading" :data="page.data" border stripe>
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
          <template slot-scope="{row: certification}">
            <el-button plain type="primary" v-if="certification.status === 1">已审</el-button>
            <el-button plain type="warning" v-else>待审</el-button>
          </template>
        </el-table-column>
        <el-table-column width="90px" :label="$t('admin.createdAt')">
          <template slot-scope="{row: certification}">{{certification.created_at | localTime }}</template>
        </el-table-column>
        <el-table-column :label="$t('admin.operation')">
          <template slot-scope="{row: certification}">
            <div v-if="certification.status === 0">
              <el-button :loading="operating === certification.id"
                         @click="auditCertification(certification.id, 'pass')" plain type="primary">通过
              </el-button>
              <el-button :loading="operating === certification.id"
                         @click="auditCertification(certification.id, 'reject')" plain type="warning">驳回
              </el-button>
            </div>
            <div v-else>
              <el-button
                @click="goTo({name: 'management-users-certifications-edit', params: {id: certification.id}})"
                plain
                type="primary"
                v-if="certification.status === 1"
              >{{$t('admin.edit')}}
              </el-button>
              <el-button plain v-else type="danger">已驳回</el-button>
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
    </el-card>
  </div>
</template>
<script>
  import File from '@/api/file'
  import setQuery from '@/mixins/setQuery'
  import searchUser from '@/mixins/searchUser'

  export default {
    name: 'ManagementUserCertifications',
    mixins: [setQuery, searchUser],
    data: () => ({
      query: {
        page: 1,
        limit: 15,
        certification_name: '',
        user: 0,
        status: '',
        name: ''
      },
      statuss: {
        display: ['待审核', '已审核', '已驳回'],
        data: [
          { label: '全部', value: '' },
          { label: '待审核', value: 0 },
          { label: '已审核', value: 1 },
          { label: '已驳回', value: 2 }
        ]
      },
      page: {},
      counts: {},
      getLoading: false,
      categories: [],
      operating: 0
    }),
    beforeMount () {
      const { '$route': { query: { status = '' } = {} } = {} } = this
      this.$set(this, 'query', {
        ...this.query,
        status: status !== '' ? parseInt(status) : ''
      })
    },
    created () {

      this.fetchCategories()
    },
    methods: {
      /* 使用远程搜索结果 */
      selectUser (user) {
        const { id, name } = user
        this.$set(this.query, 'user', id)
        this.$set(this, 'search', name)
      },
      auditCertification (id, type) {
        let params = {}
        this.$prompt('输入备注', '提示').then(({ value }) => {
          if (type === 'reject') {
            params.reject_content = value
          } else {
            params.desc = value
          }
          this.$set(this, 'operating', id)
          this.$api.certifications.auditCertificate({ id, type, params }).then(({ data }) => {
            this.showSuccess(data)
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'operating', 0)
          })
        }).catch(() => {
          this.showInfo('已取消')
        })
      },
      url (node) {
        return File.url(node, { w: 50, h: 50 })
      },
      fetchData () {
        this.fetchCertifications()
      },
      /* 认证分类 */
      fetchCategories () {
        this.$api.certifications.getCates().then(({ data }) => {
          this.$set(this, 'categories', data)
        }).catch(this.showApiError).finally(() => {

        })
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
