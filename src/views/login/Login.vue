<template>
  <div class="login">
    <div class="form">
      <h2>积云会员管理系统</h2>
      <el-form ref="form" :rules="rules" :model="form" label-width="60px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: pink;
  background-image: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
h2 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
.form {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 160px auto;
  // height: 200px;
  overflow: hidden;
  border-radius: 20px;
  padding: 28px;
}
.el-form {
  margin-top: 20px;
}
</style>