<template>
  <el-card shadow="never" class="box-card">
    <div slot="header" class="clearfix">
      <span>管理热门城市</span>
    </div>
    <el-form ref="addPopularCityForm" :model="form" label-width="120px">
      <el-form-item label="名称" prop="content">
        <el-alert
          title="添加：直接输入地区名以空格分开， 例如：中国 四川省 成都市"
          :closable="false"
          type="success">
        </el-alert>
        <el-input v-model="form.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input type="number" v-model="form.sort" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="saveLoading" @click="savePopularCity" type="primary">{{$t('admin.submit')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="getLoading"
      :data="cities"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>
      <el-table-column
        :label="$t('admin.operation')">
        <template slot-scope="{row:city}">
          <el-button :loading="deleting === city.name" type="danger" @click="delPopularCity(city)" size="mini">
            {{$t('admin.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: 'popular-cities',
    data: () => ({
      cities: [],
      form: {
        content: null,
        sort: 0,
        update: 0
      },
      deleting: null,
      getLoading: false,
      saveLoading: false
    }),
    beforeMount () {
      this.getPopularCities()
    },
    methods: {
      getPopularCities () {
        const { getLoading } = this
        if (!getLoading) {
          this.gLoading(true)
          this.$api.area.getPopularCities().then(({ data: { data } }) => {
            this.$set(this, 'cities', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      },
      savePopularCity () {
        const { form, saveLoading } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.area.savePopularCity(form).then(({ data: { message = '', status = 0 } }) => {
            this.showSuccess(message)
            if (status === 1) {
              this.cities.push({
                name: form.content,
                sort: form.sort
              })
            }
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      delPopularCity (city) {
        this.$confirm('是否要将该城市移除热门城市？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$set(this, 'deleting', city.name)
          const index = this.cities.indexOf(city)
          const params = { content: city.name, update: 1, sort: city.sort }
          this.$api.area.savePopularCity(params).then(({ data: { message = '', status } }) => {
            this.showSuccess(message)
            this.cities.splice(index, 1)
          }).catch(this.showApiError).finally(() => {
            this.$set(this, 'deleting', null)
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style scoped>

</style>
