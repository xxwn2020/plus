<template>
  <div>
    <el-card>
      <div slot="header">
        <span>角色管理</span>
        <el-button @click="addForm = true" style="float: right; padding: 3px 0" type="text">添加角色</el-button>
      </div>
      <el-alert :closable="false" title="!!尽量不要删除用户角色!!, 否则会造成用户角色混乱！请谨慎编辑。" type="warning"></el-alert>
      <el-main>
        <el-table :data="roles" border stripe>
          <el-table-column prop="name" label="角色唯一的标识"/>
          <el-table-column prop="display_name" label="角色展示名称"/>
          <el-table-column prop="description" label="角色描述"/>
          <el-table-column prop="non_delete" label="是否可删除">
            <template slot-scope="scope">{{ scope.row.non_delete ? '不可删除' : '可删除'}}</template>
          </el-table-column>
          <el-table-column prop="non_delete" label="创建时间">
            <template slot-scope="scope">{{ scope.row.created_at | localTime }}</template>
          </el-table-column>
          <el-table-column label="更多操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editRole(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-card>
    <el-dialog :before-close="cleanForm" title="添加角色" :visible.sync="showAddForm">
      <el-form :model="role">
        <el-form-item label="关键字">
          <el-input v-model="role.name" placeholder="英文,并且唯一" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="role.display_name" placeholder="角色展示的名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="role.description" placeholder="角色描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cleanForm">取 消</el-button>
        <el-button type="primary" @click="saveRole">新 增</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :fullscreen="true"
      :before-close="cleanForm"
      title="修改角色权限"
      :visible.sync="showEditForm"
    >
      <el-form v-loading="abilityLoading" :model="role">
        <el-input v-model="editForm.id" style="display: none"/>
        <el-form-item label="用户角色">
          <el-input v-model="editForm.display_name" :disabled="true" placeholder></el-input>
        </el-form-item>
        <el-form-item label="选择权限">
          <el-checkbox-group v-model="editForm.abilities">
            <el-checkbox v-for="ability in abilities" :key="item.key" :label="item.label"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cleanForm">取 消</el-button>
        <el-button type="primary" @click="saveRole">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ManagementUsersRole",
  data: () => ({
    roles: [],
    showAddForm: false,
    showEditForm: false,
    editForm: {},
    abilityLoading: false,
    role: {
      id: null,
      name: null
    },
    abilities: []
  }),
  methods: {
    /* 获取所有的角色 */
    fetchRoles() {
      this.$api.roles.list().then(({ data }) => {
        this.$set(this, "roles", data);
      });
    },
    /* 获取所有权限节点 */
    fetchAbilities() {
      const { abilityLoading } = this;
      if (abilityLoading) {
        return false;
      }
      this.$set(this, "abilityLoading", true);
      this.$api.abilities
        .list()
        .then(({ data }) => {
          console.log(data);
        })
        .catch(this.showApiError)
        .finally(() => {
          this.$set(this, "abilityLoading", false);
        });
    },
    /* 更新/添加角色 */
    saveRole() {
      const { role } = this;
      this.$api.roles
        .save(role, role.id)
        .then(({ data }) => {
          this.$message({
            type: "success",
            message: this.$t("admin.success")
          });
          this.cleanForm();
          this.fetchRoles();
        })
        .catch(this.showApiError);
    },
    /* 打开权限节点编辑框 */
    editRole(role) {
      this.$set(this, "editForm", role);
      this.$set(this, "showEditForm", true);
      this.fetchAbilities();
    },
    /* 重置并关闭Dialog */
    cleanForm(done = null) {
      const { role } = this;
      typeof done === "function"
        ? done()
        : this.$set(this, "showAddForm", false);
      this.$set(this, "role", {
        id: null,
        name: null,
        display_name: null,
        description: null
      });
    }
  },
  beforeMount() {
    this.fetchRoles();
  }
};
</script>
