<template>
  <el-card shadow="never">
    <div slot="header">
      <span>基本信息</span>
    </div>
    <el-main>
      <el-form :rules="rules" :model="form" ref="infoform" label-width="80px">
        <el-form-item label="站点名称" prop="name">
          <el-input placeholder v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input placeholder v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item label="站点描述" prop="description">
          <el-input type="textarea" placeholder v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="备案信息" prop="icp">
          <el-input placeholder v-model="form.icp"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveInfo">{{$t('admin.submit')}}</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-card>
</template>
<script>
export default {
  name: "operationBasicSiteinfo",
  data: () => ({
    form: {
      name: null,
      keywords: null,
      description: null,
      icp: null
    }
  }),
  methods: {
    saveInfo() {
      const { form } = this;
    }
  },
  computed: {
    rules() {
      return {
        name: [{ required: true, message: "站点名称必填", trigger: "blur" }]
      };
    }
  }
};
</script>
