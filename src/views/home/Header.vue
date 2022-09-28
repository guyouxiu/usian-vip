<template>
  <div>
    <router-link to="/" class="link">
      <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="" />
      <span class="title">积云会员管理系统</span>
    </router-link>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $store.state.UserInfo.username || ""
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changepass">修改密码</el-dropdown-item>
        <el-dropdown-item command="goout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "changepass":
          this.handlechange();
      }
      switch (command) {
        case "goout":
          this.handleout();
      }
    },
    handlechange() {
      alert("修改密码");
    },
    async handleout() {
      // alert("退出登录");
      const response= await this.$store.dispatch('handleLogout')
      this.$router.push('/login')
      this.$message.success('退出成功')
    },
  },
};
</script>

<style scoped >
.el-dropdown {
  float: right;
  margin-right: 30px;
  color: #fff;
  line-height: 50px;
}
.link {
  text-decoration: none;
  /* height: 50px !important ; */
  line-height: 50px;
}
.title {
  /* text-decoration: none; */
  color: #fff;
  vertical-align: middle;
  margin-left: 15px;
}
img {
  width: 25px;
  vertical-align: middle;
}
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2d3a4b;
  height: 50px !important ;
  color: #fff;
}

.el-aside {
  background-color: #555c64;
  color: #fff;
  height: 100%;
}

.el-main {
  background-color: #fff;
  color: #fff;
  height: 100%;
}
</style>