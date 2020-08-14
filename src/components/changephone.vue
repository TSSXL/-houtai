<template>
  <div>
    <div v-if="!showChange" class="oldphone">
      <p class="title">手机号</p>
      <div class="con">
        <p class="phone">原手机号：{{phone}}</p>
        <div class="med">
          <el-input v-model="checkcode" placeholder="输入短信验证码"></el-input>
          <el-button type="text" @click="sendCheckCode">发送验证码</el-button>
        </div>
        <div class="bottom">
          <el-button type="primary" size="mini" @click="editphone">下一步</el-button>
          <el-button size="mini" @click="back">取消</el-button>
        </div>
      </div>
    </div>
    <div v-else class="newphone">
      <p class="title">换绑手机号</p>
      <div class="con">
        <el-form ref="form" :model="form" :rules="newrules" label-width="80px">
          <el-form-item label="新手机号" required prop="newphone">
            <el-input v-model="form.newphone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" required prop="newCheckCode">
            <el-input v-model="form.newCheckCode"></el-input>
            <el-button type="text" @click="sendNewCode">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="backpre">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendCode, editPhone, updatePhone } from "../util/lang";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      showChange: false,
      checkcode: "",
      phone: "",
      form: {
        newphone: "",
        newCheckCode: "",
      },
      newrules: {
        newphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        newCheckCode: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.phone = JSON.parse(Cookies.get("userInfo")).phone;
  },
  methods: {
    sendCheckCode() {
      const url = `${sendCode(this.phone, "4")}`;
      this.$axios.post(url).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("发送成功！");
        }
      });
    },
    back() {
      this.$router.push("/account");
    },
    backpre() {
      this.$router.go(-1);
    },
    sendNewCode() {
      const url = `${sendCode(this.form.newphone, "4")}`;
      this.$axios.post(url).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("发送成功！");
        }
      });
    },
    editphone() {
      if (this.checkcode) {
        const url = `${editPhone(this.newphone, this.checkcode)}`;
        this.$axios.post(url).then((res) => {
          if (res.data.code == 200) {
            this.showChange = true;
          } else {
            this.$message.error("手机号或验证码错误！");
          }
        });
      }
    },
    onSubmit() {
      const url = `${updatePhone(this.form.newphone, this.form.newCheckCode)}`;
      this.$axios.post(url).then((res) => {
        if (res.data.code == 200) {
          this.$$message.success("换绑成功！");
          setTimeout(() => {
            this.$router.push("/account");
          }, 600);
        } else {
          this.$message.error("换绑失败，请重试！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.oldphone {
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
    .phone {
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: lighter;
    }
    .med {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .bottom {
      margin-top: 20px;
    }
  }
}
.newphone {
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
}
</style>
<style scoped>
.el-form-item >>> .el-form-item__content {
  display: flex;
}
</style>