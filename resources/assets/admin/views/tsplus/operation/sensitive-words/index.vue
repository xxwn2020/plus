<template>
  <div>
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header">
        <span>{{ $t('admin.sensitive.root') }}</span>
        <el-button
          @click="showDialog = true"
          style="float: right; padding: 3px 0"
          type="text"
        >{{ $t('admin.sensitive.add') }}
        </el-button>
      </div>
      <el-main v-loading="listLoading">
        <el-table :data="sensitiveWords" border stripe>
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
              <el-button type="primary" size="mini" @click="openDialog(sensitive)">编辑</el-button>
              <el-button type="danger" size="mini" @click="delSensitive(sensitive)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
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
        <el-button @click="cleanForm">{{$t('admin.cancel')}}</el-button>
        <el-button type="primary" @click="saveWord">{{$t('admin.submit')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'OperationSensitiveWords',
    data: () => ({
      sensitiveWords: [],
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
        work: null
      },
      total: 0,
      canload: true
    }),
    methods: {
      /* 关闭dialog */
      cleanForm(done = null) {
        typeof done === 'function'
          ? done()
          : this.$set(this, 'showDialog', false)

        this.$refs.word.resetFields()
      },
      openDialog(word) {
        this.$set(this, 'word', word)
        this.$set(this, 'showDialog', true)
      },
      delSensitive(word) {
        this.$confirm('此操作将删除此敏感词, 继续?', '提示', {
          type: 'warning'
        })
        .then(() => {
          this.$api.sensitiveWords
          .del(word.id)
          .then(() => {
            this.showSuccess(this.$t('admin.success'))
            this.fetchWords()
          })
          .catch(this.showApiError)
        })
        .catch(() => {
        })
      },
      /* 保存敏感词 */
      saveWord() {
        const { word, saveLoading } = this
        if (! saveLoading) {
          this.$set(this, 'saveLoading')
          this.$api.sensitiveWords
          .save(word, word.id)
          .then(({ data }) => {
            this.showSuccess(data)
            this.cleanForm()
            this.fetchWords()
          })
          .catch(this.showApiError)
          .finally(() => {
            this.$set(this, 'saveLoading', false)
          })
        }
      },
      /* 获取列表 */
      fetchWords() {
        const { listLoading, query } = this
        if (! listLoading) {
          this.$set(this, 'listLoading', true)
          this.$api.sensitiveWords
          .list(query)
          .then(({ data, headers: { 'x-total': total = 0 } }) => {
            this.$set(this, 'total', total)
            this.$set(this, 'sensitiveWords', data)
          })
          .catch(this.showApiError)
          .finally(() => {
            this.$set(this, 'listLoading', false)
          })
        }
      }
    },
    beforeMount() {
      this.fetchWords()
    }
  }
</script>

