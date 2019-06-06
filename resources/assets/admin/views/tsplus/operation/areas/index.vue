<template>
  <div class="areas">
    <el-main>
      <popular-cities style="margin-bottom: 20px"></popular-cities>
      <el-card v-loading="getLoading" shadow="never">
        <div slot="header">
          <span>地区管理</span>
        </div>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          class="areas-tree"
          accordion
          ref="tree2"
          :data="countries"
          node-key="id"
          :props="{label: 'name', children: 'childNodes'}"
          :default-expand-all="false"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          :default-expanded-keys="defaultExpandedKeys"
          @node-expand="nodeExpand"
          @node-collapse="nodeCollapse"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            plain
            @click="() => showAddForm(data)">
            添加子级地区
          </el-button>
          <el-button
            type="text"
            plain
            @click="() => remove(node, data)">
            删除该地区
          </el-button>
        </span>
      </span>
        </el-tree>
      </el-card>
    </el-main>
    <el-dialog
      title="添加区域"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form ref="addAreaForm" :model="form" label-width="120px">
        <el-form-item label="父级地区">
          <el-input v-model="parent.name" disabled></el-input>
        </el-form-item>
        <el-form-item :rules="[{required: true, message:'名称必填', trigger: 'blur'}]" label="名称" prop="name">
          <el-input v-model="form.name" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="拓展信息" prop="extends">
          <el-alert
            title="拓展信息赋予单条信息而外的数据，例如国家设置，中国的拓展信息设置的3,用于在app开发中UI层展示几级选择菜单，所以，只有在业务需求下，设置拓展信息才是有用的。其他情况下留空即可。"
            type="success"
            :closable="false"
          >
          </el-alert>
          <el-input v-model="form.extends" placeholder="输入拓展信息[选填]"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button plain @click="handleClose">取 消</el-button>
        <el-button plain type="primary" :loading="saveLoading" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

  import { mapGetters } from 'vuex'
  import { createHieArr } from '@/utils/tools'
  import PopularCities from './popular-cities'

  export default {
    name: 'OperationAreas',
    components: { PopularCities },
    data: () => ({
      form: {
        name: null,
        extends: null,
        pid: 0
      },
      saveLoading: false,
      getLoading: false,
      opened1: 0,
      opened2: 0,
      opened3: 0,
      filterText: '',
      dialogVisible: false,
      changing: null,
      defaultExpandedKeys: [1]
    }),
    async beforeMount () {
      this.gLoading(true)
      await this.$store.dispatch('area/getFirstList')
      this.gLoading(false)
    },
    computed: {
      ...mapGetters(['areas']),
      /* 列出所有的第一级 */
      countries () {
        const { format = [] } = this
        return format.length ? format.filter(area => (
            area.pid === 0
        )) : []
      },
      format () {
        const { areas } = this
        const deepAreas = Object.assign([], areas)

        return createHieArr(deepAreas, { id_parent: 'pid', ID: 'id' })
      },
      /* 显示添加地区时的上级地区 */
      parent () {
        const { form: { pid }, areas } = this
        if (!pid) {
          return {}
        }
        return areas.find(item => (
            item.id === pid
        ))
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      nodeExpand (data, { id }) {
        this.defaultExpandedKeys.push(id)
      },
      nodeCollapse () {
        const { defaultExpandedKeys } = this
        defaultExpandedKeys.pop()
      },
      /* 保存新增 */
      async save () {
        const { form, saving } = this
        if (!saving) {
          this.sLoading(true)
          await this.$store.dispatch('area/addSingleArea', form)
          this.sLoading(false)
          this.handleClose()
          this.showSuccess()
        }
      },
      /* 打开添加对话框 */
      showAddForm (data) {
        const { id } = data
        this.$set(this.form, 'pid', id)
        this.$set(this, 'dialogVisible', true)
        this.$set(this, 'changing', data)
      },
      /* 关闭对话框 */
      handleClose (done = null) {
        if (typeof done === 'function') {
          done()
        }
        this.$set(this, 'form', {
          name: null,
          extends: null,
          pid: 0
        })
        this.$set(this, 'dialogVisible', false)
      },
      /* 删除地区 */
      remove (node, data) {
        if (data.childNodes.length > 0) {
          this.$alert('请先删除该地区的下级地区', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return
        } else {
          this.$confirm('确定要删除此地区吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('area/delSingleArea', data.id)
          }).catch(() => {})
        }
      },
      /* 过滤器 */
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      }
    }
  }
</script>
<style lang="scss" scoped>
  .areas {
    &-tree {
      margin-top: 20px;
    }
  }
</style>
