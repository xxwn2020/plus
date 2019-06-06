<template>
  <el-main>
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{adId ? $t('admin.promotion.ad.edit') : $t('admin.promotion.ad.add')}}</span>
        <el-button plain @click="goBack(true)" style="float: right; padding: 3px 0" type="text">{{$t('admin.back')}}
        </el-button>
      </div>
      <el-form v-loading="getLoading" ref="addAd" :model="ad" label-width="120px">
        <el-form-item :label="$t('admin.promotion.ad.title')" prop="title">
          <el-input v-model="ad.title" :placeholder="$t('admin.promotion.ad.titleDesc')" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.promotion.ad.position')" prop="space_id">
          <el-select v-model="ad.space_id" :placeholder="$t('admin.promotion.ad.positionDesc')">
            <el-option
              v-for="item in adSpaces"
              :key="item.id"
              :label="item.alias"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('admin.promotion.ad.type')" prop="type">
          <el-select v-model="ad.type" :placeholder="$t('admin.promotion.ad.typeDesc')">
            <el-option
              v-for="item in types"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <template v-show="ad.type">
          <template v-for="(rule, index) in format" >
            <el-form-item :label="rule.split('|')[0]" :key="index">
              <el-input v-if="index === 'link'" :placeholder="rule.split('|')[2]" v-model="ad.data[index]"></el-input>
              <el-input v-model="ad.data[index]" :placeholder="rule.split('|')[2]"
                        v-else-if="index === 'title'"></el-input>
              <el-input v-model="ad.data[index]" :placeholder="rule.split('|')[2]"
                        v-else-if="index === 'from'"></el-input>
              <el-input v-model="ad.data[index]" :placeholder="rule.split('|')[2]"
                        v-else-if="index === 'duration'"></el-input>
              <el-input v-model="ad.data[index]" :placeholder="rule.split('|')[2]"
                        v-else-if="index === 'name'"></el-input>
              <el-input type="textarea" :autosize="{minRows: 3, maxRows: 8}" v-model="ad.data[index]"
                        :placeholder="rule.split('|')[2]"
                        v-else-if="index === 'content'"></el-input>
              <el-date-picker
                v-else-if="index === 'time'"
                v-model="ad.data[index]"
                type="datetime"
                :placeholder="rule.split('|')[2]">
              </el-date-picker>
              <el-input disabled v-model="ad.data[index]"
                        :placeholder="rule.split('|')[2]"
                        v-else-if="index === 'image'">
                <el-button plain @click="uploadImage('imageUpload')" slot="append"
                           icon="el-icon-upload"></el-button>
              </el-input>
              <el-input disabled v-model="ad.data[index]"
                        :placeholder="rule.split('|')[2]"
                        v-else-if="index === 'avatar'">
                <el-button plain @click="uploadImage('avatarUpload')" slot="append"
                           icon="el-icon-upload"></el-button>
              </el-input>
            </el-form-item>
          </template>
        </template>
        <el-form-item :label="$t('admin.promotion.ad.sort')" prop="sort">
          <el-input v-model="ad.sort" :placeholder="$t('admin.promotion.ad.sortDesc')"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="saveAd" :loading="saveLoading" type="primary">{{$t('admin.submit')}}</el-button>
        </el-form-item>
        <input type="file" accept="image/*" @change="imageChosen" ref="imageUpload" style="display: none"/>
        <input type="file" accept="image/*" @change="avatarChosen" ref="avatarUpload" style="display: none"/>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Storage from '@/mixins/storage'

  export default {
    name: 'addAd',
    mixins: [Storage],
    data: () => ({
      ad: {
        title: '',
        space_id: null,
        type: '',
        sort: 0,
        data: {
          image: null,
          title: null,
          link: null,
          from: null,
          time: '',
          avatar: null,
          name: null,
          duration: null
        }
      },
      getLoading: false,
      saveLoading: false
    }),
    methods: {
      uploadImage (ref) {
        this.$refs[ref].click()
      },
      uploadedCallback (node, column) {
        this.$set(this.ad.data, column, node)
        console.log(`${column}Upload`)
        this.$refs[`${column}Upload`].value = ''
      },
      imageChosen ({ target: { files: { [0]: file } } }) {
        this.upload({ file, callback: this.uploadedCallback, url: true, column: 'image' })
      },
      avatarChosen ({ target: { files: { [0]: file } } }) {
        this.upload({ file, callback: this.uploadedCallback, url: true, column: 'avatar' })
      },
      /* 保存广告 */
      saveAd () {
        const { ad, saveLoading, adId } = this
        if (!saveLoading) {
          this.sLoading(true)
          this.$api.promotion.save(ad, adId).then(({ data }) => {
            this.showSuccess(data)
            this.goBack()
          }).catch(this.showApiError).finally(() => {
            this.sLoading(false)
          })
        }
      },
      fetchAd() {
        const {adId, getLoading} = this;
        if (adId && !getLoading) {
          this.gLoading(true)
          this.$api.promotion.get(adId).then(({ data }) => {
            this.$set(this, 'ad', data)
          }).catch(this.showApiError).finally(() => {
            this.gLoading(false)
          })
        }
      }
    },
    computed: {
      ...mapGetters(['adSpaces']),
      format () {
        const { ad: { type, space_id } } = this
        if (!type) return []
        const { format: { [type]: rules } } = this.adSpaces.find(space => (
          space.id === space_id
        ))
        return rules
      },
      types () {
        const { ad: { space_id } } = this
        if (!space_id) return []
        const space = this.adSpaces.find(space => (
          space.id === space_id
        ))
        return space.allow_type.split(',')
      },
      adId() {
        const {'$route': {params: {id = 0} = {}} = {}} = this;
        return id
      }
    },
    async created () {
      await this.$store.dispatch('ad/fetchAdSpaces')
      const {adId} = this;
      if (adId !== 0) {
        this.fetchAd();
      }
    }
  }
</script>

<style scoped>

</style>
