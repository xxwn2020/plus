<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span>{{$t('admin.tags.list')}}</span>
        <el-button
          @click="showEditDialog = true"
          style="float: right; padding: 3px 0"
          type="text"
        >新增分类</el-button>
      </div>
      <el-main v-loading="listLoading">
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
        <el-table :data="categories" border stripe>
          <el-table-column prop="id" label="#"></el-table-column>
          <el-table-column prop="name" :label="$t('admin.tags.name')"></el-table-column>
          <el-table-column prop="tags_count" label="拥有标签数量"></el-table-column>
          <el-table-column prop="weight" :label="$t('admin.tags.weight')"></el-table-column>
          <el-table-column :label="$t('admin.operation')">
            <template slot-scope="{row: category}">
              <el-button
                size="mini"
                type="primary"
                @click="editCategory(category)"
              >{{ $t('admin.edit') }}</el-button>

              <el-button
                size="mini"
                type="danger"
                @click="delCategory(category)"
              >{{$t('admin.delete')}}</el-button>
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
    <el-dialog
      :before-close="cleanForm"
      :title="category.id ? '编辑分类' : '新增分类'"
      :visible.sync="showEditDialog"
    >
      <el-form :rules="rules" ref="category" :model="category">
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类权重" prop="weight">
          <el-input v-model.number="category.weight" :placeholder="`${$t('admin.tags.weight')}`"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cleanForm">取 消</el-button>
        <el-button
          :loading="saveLoading"
          type="primary"
          @click="saveCategory"
        >{{$t('admin.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import setQuery from "@/mixins/setQuery";
export default {
  mixins: [setQuery],
  name: "tagCategories",
  data: () => ({
    query: {
      page: 1,
      limit: 15
    },
    category: {},
    categories: [],
    saveLoading: false,
    listLoading: false,
    showEditDialog: false
  }),
  computed: {
    rules() {
      return {
        name: [{ required: true, message: "分类名称必填", trigger: "blur" }],
        weight: [{ required: true, message: "标签权重必填", trigger: "blur" }]
      };
    }
  },
  methods: {
    /* get categories of tags */
    fetchCategeroies() {
      const { query, listLoading } = this;
      if (!listLoading) {
        this.$set(this, "listLoading", this);
        this.$api.tags
          .list(query)
          .then(({ data: { data, total } }) => {
            this.$set(this, "categories", data);
            this.$set(this.page, "total", total);
          })
          .catch(this.showApiError)
          .finally(() => {
            this.$set(this, "listLoading", false);
          });
      }
    },
    /* close dialog */
    cleanForm(done = null) {
      const { category } = this;
      typeof done === "function"
        ? done()
        : this.$set(this, "showEditDialog", false);
      this.$set(this, "category", {});
    },
    /* open dialog */
    editCategory(category) {
      this.$set(this, "category", category);
      this.$set(this, "showEditDialog", true);
    },
    /* delete category */
    delCategory(category) {
      this.$confirm("此操作将删除此分类,并无法恢复,是否继续", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$api.tags
            .del(category.id)
            .then(() => {
              this.showSuccess(this.$t("admin.success"));
              this.fetchData();
            })
            .catch(this.showApiError);
        })
        .catch(() => {
          this.showInfo("以取消删除");
        });
    },

    /* save category */
    saveCategory() {
      const { category, saveLoading } = this;
      this.$refs.category.validate(valid => {
        if (valid) {
          this.$set(this, "saveLoading", true);
          this.$api.tags
            .save(category, category.id)
            .then(({ data }) => {
              this.showSuccess(this.serverMessage(data));
              this.cleanForm();
              this.fetchData();
            })
            .catch(this.showApiError)
            .finally(() => {
              this.$set(this, "saveLoading", false);
            });
        }
      });
    },

    /* mixin */
    fetchData() {
      this.fetchCategeroies();
    }
  }
};
</script>
