<template>
  <div class="ability-list-page">
    <el-card shadow="never">
      <div slot="header">
        <span>{{$t('admin.abilities.root')}}</span>
        <el-button
          @click="showDialogForm = true"
          style="float: right; padding: 3px 0"
          type="text"
        >{{$t('admin.abilities.add')}}
        </el-button>
      </div>
      <el-table v-loading="listLoading" :data="abilities" border stripe>
        <el-table-column prop="id" :label="$t('admin.idField')"></el-table-column>
        <el-table-column prop="name" :label="$t('admin.abilities.name')"></el-table-column>
        <el-table-column prop="display_name" :label="$t('admin.abilities.displayName')"></el-table-column>
        <el-table-column prop="description" :label="$t('admin.abilities.description')"></el-table-column>
        <el-table-column prop="updated_at" :label="$t('admin.updatedAt')"></el-table-column>
        <el-table-column :label="$t('admin.operation')">
          <template slot-scope="scope">
            <el-button
              plain
              type="danger"
              @click="deleteAbility(scope.row)"
            >{{$t('admin.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :before-close="closeDialogForm"
      :title="ability.id ? $t('admin.editTitle') : $t('admin.addTitle')"
      :visible.sync="showDialogForm"
    >
      <el-form :model="ability">
        <el-form-item :label="$t('admin.abilities.name')">
          <el-input :placeholder="$t('admin.abilities.name')" v-model="ability.name" placeholder></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.abilities.displayName')">
          <el-input :placeholder="$t('admin.abilities.displayName')" v-model="ability.display_name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.abilities.description')">
          <el-input :placeholder="$t('admin.abilities.description')" v-model="ability.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="closeDialogForm">取 消</el-button>
        <el-button plain :loading="saveLoading" type="primary" @click="saveAbility">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import setQuery from '@/mixins/setQuery'

  export default {
    mixins: [setQuery],
    name: 'ManagementUserAbilities',
    data: () => ({
      abilities: [],
      query: {
        page: 1,
        limit: 1,
        display_name: null
      },
      ability: {
        id: null,
        name: null,
        display_name: null,
        decription: null
      },
      showDialogForm: false,
      listLoading: false,
      saveLoading: false
    }),
    methods: {
      /* 保存节点 */
      saveAbility () {
        const { ability, saveLoading } = this
        if (!saveLoading) {
          this.$set(this, 'saveLoading', true)
          this.$api.abilities.save(ability, ability.id).then(({ data }) => {
            this.$message({
              type: 'success',
              message: this.$t('admin.success')
            })
            this.closeDialogForm()
            this.fetchData()
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'saveLoading', false)
          })
        }
      },
      /* 删除权限节点 */
      deleteAbility (ability) {
        this.$confirm(
          this.$t('admin.abilities.deleteAbility'),
          this.$t('admin.notice'),
          {
            confirmButtonText: this.$t('admin.confirm'),
            cancelButtonText: this.$t('admin.cancel'),
            type: 'warning'
          }
        ).then(() => {
          this.$api.abilities.del(ability.id).then(() => {
            this.$message({
              type: 'success',
              message: this.$t('admin.success')
            })
            this.fetchData()
          }).catch(this.showApiError).finally(() => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('admin.canceled')
          })
        })
      },
      /* 关闭对话框 */
      closeDialogForm (done = null) {
        const { ability } = this
        typeof donw === 'function'
          ? done()
          : this.$set(this, 'showDialogForm', false)

        this.$set(this, 'ability', {
          id: null,
          name: null,
          display_name: null,
          decription: null
        })
      },
      /* 混入公用方法 */
      fetchData () {
        this.fetchAbilities()
      },
      /* 获取权限节点列表 */
      fetchAbilities () {
        const { listLoading, query } = this
        if (!listLoading) {
          this.$set(this, 'listLoading', true)
          this.$api.abilities.list(query).then(({ data }) => {
            this.$set(this, 'abilities', data)
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'listLoading', false)
          })
        }
      }
    },
    beforeMount () {
      this.fetchData()
    }
  }
</script>
<style lang='less'>
  .ability-list-page {
  }
</style>

