<template>
  <div>
    <el-card shadow="never" style="margin-bottom: 20px;">
      <div slot="header">
        <span>{{ $t('admin.roles.default') }}</span>
      </div>
        <el-alert
          :title="$t('admin.roles.defaultRoleText')"
          type="warning"
          :closable="false"
          show-icon
          style="margin-bottom: 20px;"
        ></el-alert>
        <el-form>
          <el-form-item :label="$t('admin.roles.default')">
            <el-select v-model="defaultRole">
              <el-option
                :value="role.id"
                v-for="role in roles"
                :key="role.id"
                :label="role.display_name"
              >{{role.display_name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              plain
              :loading="settingLoading"
              type="primary"
              @click="saveDefaultRole"
            >{{ $t('admin.submit') }}
            </el-button>
          </el-form-item>
        </el-form>
    </el-card>

    <el-card shadow="never">
      <div slot="header">
        <span>{{ $t('admin.roles.management') }}</span>
        <el-button
          @click="showAddForm = true"
          style="float: right; padding: 3px 0"
          type="text"
        >{{ $t('admin.roles.add') }}
        </el-button>
      </div>
      <el-alert
        :closable="false"
        show-icon
        :title="$t('admin.roles.deletedRoleWarn')"
        type="warning"
      ></el-alert>
        <el-table v-loading="tableLoading" :data="roles" border stripe>
          <el-table-column prop="name" label="角色唯一的标识"/>
          <el-table-column prop="display_name" label="角色展示名称"/>
          <el-table-column prop="description" label="角色描述"/>
          <el-table-column prop="non_delete" label="创建时间">
            <template slot-scope="scope">{{ scope.row.created_at | localTime }}</template>
          </el-table-column>
          <el-table-column label="更多操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" @click="editRole(scope.row)">编辑</el-button>
              <el-button size="mini"
                v-if="!scope.row.non_delete"
                type="danger"
                plain
                @click="delRole(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-button plain @click="cleanForm">取 消</el-button>
        <el-button plain :loading="saveLoading" type="primary" @click="saveRole">新 增</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :fullscreen="true"
      :before-close="closeEditForm"
      title="修改角色权限"
      :visible.sync="showEditForm"
    >
      <el-form v-loading="abilityLoading" :model="editForm">
        <el-form-item label="用户角色">
          <el-input v-model="editForm.display_name" :disabled="true" placeholder></el-input>
        </el-form-item>
        <el-form-item label="选择权限">
          <el-checkbox-group v-model="checked">
            <el-checkbox
              v-for="ability in abilities"
              :key="ability.id"
              :label="ability.id"
            >{{ability.display_name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="closeEditForm">取 消</el-button>
        <el-button plain :loading="saveLoading" type="primary" @click="saveAbilities">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ManagementUsersRole',
    data: () => ({
      roles: [],
      showAddForm: false,
      showEditForm: false,
      editForm: {
        abilities: []
      },
      abilityLoading: false,
      tableLoading: false,
      saveLoading: false,
      delLoading: false,
      settingLoading: false,
      role: {
        id: null,
        name: null
      },
      abilities: [],
      checked: [],
      defaultRole: null
    }),
    methods: {
      /* 获取用户设置 */
      fetchUserSetting () {
        this.$api.users.userSetting().then(({ data: { current_role } }) => {
          this.$set(this, 'defaultRole', current_role)
        })
      },
      /* 保存默认角色 */
      saveDefaultRole () {
        const { defaultRole: role, settingLoading } = this
        if (!settingLoading) {
          this.$set(this, 'settingLoading', true)
          this.$api.users.setUserSetting(role).then(({ data }) => {
            this.$message({
              type: 'success',
              message: this.serverMessage(data)
            })
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'settingLoading', false)
          })
        }
      },
      /* 获取所有的角色 */
      fetchRoles () {
        const { tableLoading } = this
        if (tableLoading) return false
        this.$set(this, 'tableLoading', true)
        this.$api.roles.list().then(({ data }) => {
          this.$set(this, 'roles', data)
        }).catch(this.showApiError).finally(() => {
          this.$set(this, 'tableLoading', false)
        })
      },
      /* 更新角色的权限节点 */
      saveAbilities () {
        const {
          checked,
          editForm: { id },
          saveLoading
        } = this
        if (saveLoading) return false
        this.$set(this, 'saveLoading', true)
        this.$api.roles.save({ abilities: checked }, id).then(({ data }) => {
          this.closeEditForm()
          this.$message({
            type: 'success',
            message: this.serverMessage(data)
          })
        }).catch(this.showApiError).finally(() => {
          this.$set(this, 'saveLoading', false)
        })
      },
      /* 更新/添加角色 */
      saveRole () {
        const { role, saveLoading } = this
        if (saveLoading) return false
        this.$set(this, 'saveLoading', true)
        this.$api.roles.save(role, role.id).then(({ data }) => {
          this.$message({
            type: 'success',
            message: this.$t('admin.success')
          })
          this.cleanForm()
          this.fetchRoles()
        }).catch(this.showApiError).finally(() => {
          this.$set(this, 'saveLoading', false)
        })
      },
      /* 删除角色 */
      delRole (role) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: this.$t('admin.confirm'),
          cancelButtonText: this.$t('admin.cancel'),
          type: 'warning'
        }).then(() => {
          const { delLoading } = this
          if (delLoading) return false
          this.$set(this, 'delLoading', true)
          this.$api.roles.del(role.id).then(() => {
            this.$message({
              type: 'success',
              message: this.serverMessage(this.$t('admin.success'))
            })
            this.fetchRoles()
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'delLoading', false)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      /* 打开权限节点编辑框 */
      editRole (role) {
        this.fetchRoleAbilities(role)
      },
      /* 获取角色已有权限 */
      fetchRoleAbilities (roleObject) {
        const { abilityLoading } = this
        if (abilityLoading) {
          return false
        }
        this.$set(this, 'abilityLoading', true)
        // 是否查询所有的权限节点
        const query = this.abilities.length
          ? { abilities: true }
          : { all_abilities: true, abilities: true }
        this.$set(this, 'showEditForm', true)
        this.$api.roles.get(roleObject.id, query).then(({ data: { role, abilities = [] } }) => {
          let checked = []
          role.abilities.map(ability => {
            checked.push(ability.id)
          })
          this.$set(this, 'checked', checked)
          this.$set(this, 'editForm', role)
          !this.abilities.length && this.$set(this, 'abilities', abilities)
        }).catch(this.showApiError).finally(() => {
          this.$set(this, 'abilityLoading', false)
        })
      },
      /* 重置并关闭Dialog */
      cleanForm (done = null) {
        const { role } = this
        typeof done === 'function'
          ? done()
          : this.$set(this, 'showAddForm', false)
        this.$set(this, 'role', {
          id: null,
          name: null,
          display_name: null,
          description: null
        })
      },
      closeEditForm (done = null) {
        const { editForm } = this
        typeof donw === 'function'
          ? done()
          : this.$set(this, 'showEditForm', false)

        this.$set(this, 'checked', [])
        this.$set(this, 'editForm', { abilities: [] })
      }
    },
    beforeMount () {
      this.fetchUserSetting()
      this.fetchRoles()
    }
  }
</script>
