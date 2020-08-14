<template>
  <div class="login">
    <div class="box">
      <p class="title">登录</p>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" value="15867348620"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" value="123456789"></el-input>
        </el-form-item>
        <!-- <el-button type="text" @click="gotoUser">手机号登录</el-button> -->

        <el-form-item class="btns">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>取消</el-button>
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
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('ssss')
      this.$router.push({
        path: "/home"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }
}
</style>
