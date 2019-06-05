<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span>{{$t('admin.tags.list')}}</span>
        <el-button
          @click="showEditDialog = true"
          style="float: right; padding: 3px 0"

          type="text"
        >{{$t('admin.tags.add')}}
        </el-button>
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
        <el-table :data="tags" border stripe>
          <el-table-column prop="id" label="#"></el-table-column>
          <el-table-column prop="name" :label="$t('admin.tags.name')"></el-table-column>
          <el-table-column prop="category.name" :label="$t('admin.tags.category')"></el-table-column>
          <el-table-column prop="taggable_count" :label="$t('admin.tags.taggableCount')"></el-table-column>
          <el-table-column prop="weight" :label="$t('admin.tags.weight')"></el-table-column>
          <el-table-column :label="$t('admin.operation')">
            <template slot-scope="{row: tag}">
              <el-button size="mini" type="primary" @click="editTag(tag)">{{ $t('admin.edit') }}
              </el-button>
              <el-button size="mini" type="danger" @click="deleteTag(tag)">{{ $t('admin.delete') }}
              </el-button>
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
      :title="tag.id ? $t('admin.tags.edit') : $t('admin.tags.add')"
      :visible.sync="showEditDialog"
    >
      <el-form :rules="rules" ref="tag" :model="tag">
        <el-form-item prop="name" :label="$t('admin.tags.name')">
          <el-input v-model="tag.name" placeholder="唯一" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="category" :label="$t('admin.tags.category')">
          <el-radio-group v-model="tag.category">
            <el-radio border v-for="category in categories" :label="category.id" :key="category.id">{{category.name}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('admin.tags.weight')" prop="weight">
          <el-input v-model.number="tag.weight" :placeholder="`${$t('admin.tags.weight')}`"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cleanForm">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="saveTag">{{$t('admin.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import setQuery from '@/mixins/setQuery'

  export default {
    name: 'tagList',
    mixins: [setQuery],
    data: () => ({
      query: {
        limit: 15,
        page: 1,
        category: null,
        keyword: null
      },
      tag: {
        id: null,
        name: null,
        weight: 0,
        category: null
      },
      tags: [],
      categories: [],
      showEditDialog: false,
      saveLoading: false,
      listLoading: false
    }),
    computed: {
      rules () {
        return {
          name: [
            {
              required: true,
              message: '请填写标签名称',
              trigger: 'blur'
            }
          ],
          category: [
            {
              required: true,
              message: '请选择标签分类',
              trigger: 'blur'
            }
          ],
          weight: [
            {
              type: 'number',
              message: '权重为整数',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      /* 保存标签 */
      saveTag () {
        const { saveLoading, tag } = this
        if (saveLoading) return
        this.$refs.tag.validate(valid => {
          if (valid) {
            this.$set(this, 'saveLoading', true)
            this.$api.tags.tagSave(tag, tag.id).then(({ data }) => {
              this.showSuccess(this.serverMessage(data))
              this.fetchTags()
            }).catch(this.showApiError).finally(() => {
              this.$set(this, 'saveLoading', false)
              this.$set(this, 'showEditDialog', false)
            })
          }
        })
      },
      /* 关闭dialog */
      cleanForm (done = null) {
        const { tag } = this
        typeof done === 'function'
          ? done()
          : this.$set(this, 'showEditDialog', false)

        this.$set(this, 'tag', {
          id: null,
          name: null,
          weight: 0,
          category: null
        })
      },
      deleteTag (tag) {
        this.$confirm('此操作将删除此标签,并且不能恢复,是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.tags.tagDel(tag.id).then(() => {
            this.showSuccess(this.$t('admin.success'))
            this.fetchTags()
          }).catch(this.showApiError)
        }).catch(() => {
          this.showInfo('操作已取消')
        })
      },
      /* 编辑标签 */
      editTag (tag) {
        let editTag = Object.assign({}, tag)
        editTag.category = tag.category.id
        this.$set(this, 'tag', editTag)
        this.$set(this, 'showEditDialog', true)
      },
      /* tag列表 */
      fetchTags () {
        const { query, listLoading } = this
        if (!listLoading) {
          this.$set(this, 'listLoading', true)
          this.$api.tags.tagList(query).then(({ data: { data, total } }) => {
            this.$set(this, 'tags', data)
            this.$set(this.page, 'total', total)
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'listLoading', false)
          })
        }
      },
      /* 获取标签分类 */
      fetchCategories () {
        this.$api.tags.tagCategories().then(({ data }) => {
          this.$set(this, 'categories', data)
        }).catch(this.showApiError)
      },
      /* for mixin */
      fetchData () {
        this.fetchTags()
      }
    },
    beforeMount () {
      this.fetchCategories()
    }
  }
</script>
