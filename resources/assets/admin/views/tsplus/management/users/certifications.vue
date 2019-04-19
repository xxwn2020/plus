<template>
  <div class="certification-list-page">
    <el-card>
      <div slot="header">
        <span>{{$t('admin.certifications.list')}}</span>
        <el-button
          @click="goTo({name: 'management-users-certifications-add'})"
          style="float: right; padding: 3px 0"
          type="text"
        >{{$t('admin.certifications.create')}}</el-button>
      </div>
      <el-main>
        <el-table v-loading="listLoading" :data="certifications" border stripe>
          <el-table-column prop="id" label="#"></el-table-column>
          <el-table-column prop="data.name" :label="$t('admin.name')"></el-table-column>
          <el-table-column width="110px" prop="data.phone" :label="$t('admin.phone')"></el-table-column>
          <el-table-column prop="data.number" :label="$t('admin.identify')"></el-table-column>
          <el-table-column prop="data.desc" :label="$t('admin.certifications.description')"></el-table-column>
          <el-table-column prop="data.org_name" :label="$t('admin.certifications.orgName')"></el-table-column>
          <el-table-column prop="data.org_address" :label="$t('admin.certifications.orgAddress')"></el-table-column>
          <el-table-column width="80px" prop="category.display_name" label="认证类型"></el-table-column>
          <el-table-column width="110px" label="证件照片">
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
              <el-button size="mini" type="primary" v-if="scope.row.status === 1">已审</el-button>
              <el-button size="mini" type="warning" v-else>待审</el-button>
            </template>
          </el-table-column>
          <el-table-column width="90px" :label="$t('admin.createdAt')">
            <template slot-scope="scope">{{scope.row.created_at | localTime }}</template>
          </el-table-column>
          <el-table-column :label="$t('admin.operation')">
            <template slot-scope="scope">
              <div v-if="scope.row.status !== 1">
                <el-button size="mini" type="primary" v-if="scope.row.status === 1">已审</el-button>
                <el-button size="mini" type="warning" v-else>待审</el-button>
              </div>
              <div v-else>
                <el-button
                  @click="goTo({name: 'management-users-certifications-edit', params: {id: scope.row.id}})"
                  size="mini"
                  type="primary"
                  v-if="scope.row.status === 1"
                >{{$t('admin.edit')}}</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-card>
  </div>
</template>
<script>
import File from "@/api/file";
export default {
  name: "ManagementUserCertifications",
  data: () => ({
    query: {
      page: 1,
      limit: 15,
      certification_name: null,
      keyword: null,
      status: null
    },
    counts: {},
    certifications: [],
    listLoading: false
  }),
  methods: {
    url(node) {
      return File.url(node, { w: 50, h: 50 });
    },
    fetchData() {
      this.fetchCertifications();
    },
    fetchCertifications() {
      const { query, listLoading } = this;
      if (!listLoading) {
        this.$api.certifications
          .list(query)
          .then(({ data: { counts, items } }) => {
            this.$set(this, "certifications", items);
            this.$set(this, "counts", counts);
          })
          .catch(this.showApiError)
          .finally(() => {
            this.$set(this, "listLoading", false);
          });
      }
    }
  },
  beforeMount() {
    this.fetchData();
  }
};
</script>
