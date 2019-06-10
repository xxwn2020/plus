<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span>{{ $t('admin.sensitive.root') }}</span>
        <el-button
          @click="showDialog = true"
          style="float: right; padding: 3px 0"
          type="text"
        >{{ $t('admin.sensitive.add') }}
        </el-button>
      </div>
      <el-form ref="sensitiveFilterForm" :inline="true" :model="query" class="filterForm">
        <el-form-item>
          <el-input v-model="query.word" placeholder="检索敏感词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.type">
            <el-option
              v-for="item in [{value: '', label: '全部'},{value: 'replace', label: '替换'},{value: 'warning', label: '提示'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="doSearch" :loading="listLoading" type="primary">{{$t('admin.submit')}}</el-button>
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
      <el-table v-loading="listLoading" :data="page.data" border stripe>
        <el-table-column
          v-for="col in [{id: 'id', label: '#'},{id: 'word', label: '敏感词'},{id: 'replace', label: '替换词'}]"
          :prop="col.id"
          :key="col.id"
          :label="col.label"
        />
        <el-table-column :label="$t('admin.category')">
          <template slot-scope="{row: {type}}">{{type === 'replace' ? '替换' : '提示'}}</template>
        </el-table-column>
        <el-table-column :label="$t('admin.operation')">
          <template slot-scope="{row: sensitive}">
            <el-button plain type="primary" @click="openDialog(sensitive)">编辑</el-button>
            <el-button plain type="danger" @click="delSensitive(sensitive)">删除</el-button>
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
    <el-dialog
      :title="`${word.id ? '修改' : '新增'}敏感词`"
      :visible.sync="showDialog"
      @before-close="cleanForm"
      @close="cleanForm"
    >
      <el-form :model="word" ref="word" label-width="80px">
        <el-form-item prop="word" :label="$t('admin.sensitive.root')">
          <el-input v-model="word.word"></el-input>
        </el-form-item>
        <el-form-item prop="type" :label="$t('admin.category')">
          <el-radio-group v-model="word.type">
            <el-radio
              border
              v-for="item in [{title: '替换', label: 'replace'}, {title: '提示', label: 'warning'}]"
              :key="item.label"
              :label="item.label"
            >{{item.title}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="word.type === 'replace'">
          <el-form-item prop="replace" label="替换词">
            <el-input v-model="word.replace"></el-input>
          </el-form-item>
        </template>
      </el-form>

      <span slot="footer">
        <el-button plain @click="cleanForm">{{$t('admin.cancel')}}</el-button>
        <el-button plain type="primary" @click="saveWord">{{$t('admin.submit')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import setQuery from '@/mixins/setQuery'

  export default {
    mixins: [setQuery],
    name: 'OperationSensitiveWords',
    data: () => ({
      page: {},
      listLoading: false,
      saveLoading: false,
      showDialog: false,
      word: {
        id: null,
        type: null,
        replace: null,
        word: null
      },
      query: {
        limit: 15,
        offset: 0,
        word: '',
        type: ''
      },
      total: 0
    }),
    methods: {
      fetchData () {
        this.fetchWords()
      },
      /* 关闭dialog */
      cleanForm (done = null) {
        typeof done === 'function'
          ? done()
          : this.$set(this, 'showDialog', false)

        this.$set(this, 'word', {
          id: null,
          type: null,
          replace: null,
          word: null
        })
      },
      openDialog (word) {
        this.$set(this, 'word', word)
        this.$set(this, 'showDialog', true)
      },
      delSensitive (word) {
        this.$confirm('此操作将删除此敏感词, 继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$api.sensitiveWords.del(word.id).then(() => {
            this.showSuccess(this.$t('admin.success'))
            this.fetchWords()
          }).catch(this.showApiError)
        }).catch(() => {
        })
      },
      /* 保存敏感词 */
      saveWord () {
        const { word, saveLoading } = this
        if (!saveLoading) {
          this.$set(this, 'saveLoading')
          this.$api.sensitiveWords.save(word, word.id).then(({ data }) => {
            this.showSuccess(data)
            this.cleanForm()
            this.fetchWords()
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'saveLoading', false)
          })
        }
      },
      /* 获取列表 */
      fetchWords () {
        const { listLoading, query } = this
        if (!listLoading) {
          this.$set(this, 'listLoading', true)
          this.$api.sensitiveWords.list(query).then(({ data }) => {
            this.$set(this, 'page', data)
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'listLoading', false)
          })
        }
      }
    },
    beforeMount () {
      this.fetchWords()
    }
  }
</script>

