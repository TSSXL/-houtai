<template>
  <div class="login">
    <div class="box">
      <p class="title">登录</p>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" ></el-input>
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
  import  {login} from "../util/lang";
  import  qs from 'qs'
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
      const url = `${login()}`
      this.$axios.post(url,qs.stringify(this.form)).then(res => {
        if(res.data.code===200){
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.$router.push({
            path: "/user"
          });
        }
      })
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
