<template>
  <el-card>
    <div slot="header">
      <span>{{$t('admin.users.create')}}</span>
    </div>
    <el-main>
      <el-form :model="user" ref="addUserForm" label-width="80px">
        <el-form-item :label="$t('admin.uname')">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.users.phone')">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.users.email')">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.users.password')">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('admin.users.roles')">
          <el-checkbox-group v-model="user.roles">
            <el-checkbox
              border
              v-for="role in roles"
              :key="role.id"
              :label="role.id"
            >{{ role.display_name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUser">{{$t('admin.submit')}}</el-button>
          <el-button @click="goBack(true)">{{$t('admin.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-card>
</template>
<script>
  export default {
    name: 'ManagementUserAdd',
    data: () => ({
      user: {
        phone: null,
        email: null,
        roles: []
      },
      roles: []
    }),
    methods: {
      saveUser() {
        const {user} = this;
        this.$api.users.save(user)
        .then(({data}) => {
          this.$notify({
            title: this.$t('admin.success'),
            type: 'success',
            message: this.serverMessage(data)
          });
          this.goBack();
        });
      },

      fetchRoles() {
        this.$api.roles.list()
        .then(({data}) => {
          this.$set(this, 'roles', data);
        });
      }
    },

    beforeMount() {
      this.fetchRoles();
    }
  };
</script>
