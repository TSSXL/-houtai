<template>
  <div class="changephone">
    <p class="title">更改密码</p>
    <div class="con">
      <div class="con_input">
        原密码：
        <el-input type="password" v-model="Apassword" placeholder="请输入原密码"></el-input>
      </div>
      <div class="con_input">
        新密码：
        <el-input type="password"  v-model="Bpassword" placeholder="新密码"></el-input>
      </div>
      <div class="bottom">
        <el-button type="primary" size="mini" @click="submit">保存</el-button>
        <el-button size="mini" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {updatePassword} from '../util/lang'
export default {
  data() {
    return {
      checkcode: "",
      phone: "",
      Apassword: "",
      Bpassword: "",
    };
  },
  methods:{
    submit(){
      const url=`${updatePassword(
        window.sessionStorage.getItem('mId'),
        this.Apassword,
        this.Bpassword
      )}`
      this.$axios.post(url).then(res=>{
        if(res.data.code==200){
          this.$message.success('修改成功！')
          setTimeout(()=>{
            this.$router.push('/account')
          },600)
        }else{
          this.$message.error('修改失败！')
        }
      })
    },
    back() {
      this.$router.push("/account");
    },
  }
};
</script>

<style lang="less" scoped>
.changephone {
  width: 95%;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .title {
    font-size: 14px;
    color: #cccccc;
    font-family: Source Han Sans SC;
    position: relative;
    padding-bottom: 10px;
    &::after {
      display: inline-block;
      content: "";
      width: 100%;
      height: 1px;
      background-color: #ededed;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .con {
    margin-top: 20px;
    width: 300px;
    margin-left: 50px;
    .con_input {
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: lighter;
      margin-bottom: 20px;
    }
    .bottom {
      margin-top: 20px;
    }
  }
}
</style>