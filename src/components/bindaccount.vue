<template>
  <div>
    <div class="content">
      <div class="item">
        <div class="l">
          <span>手机号</span>
          <span>{{phone}}</span>
        </div>
        <div class="r">
          <el-button type="text" @click="gotoChangePhone">更改手机号</el-button>
        </div>
      </div>
      <div class="item">
        <div class="l">
          <span>用户名和密码</span>
          <span></span>
        </div>
        <div class="r">
          <el-button type="text" @click="gotoChangeAccount">更改密码</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      phone:''
    };
  },
  mounted(){
    this.phone=JSON.parse(Cookies.get('userInfo')).phone
  },
  methods:{
    gotoChangePhone(){
      this.$router.push({
        name:'changephone'
      })
    },
    gotoChangeAccount(){
      this.$router.push({
        name:'changeaccount'
      })
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 95%;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 10px 0;
    .l {
      width: 30%;
      display: flex;
      justify-content: space-between;
      span {
        color: #999999;
        font-size: 14px;
        font-family: Source Han Sans SC;
      }
    }
    .r {
      width: 20%;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #cccccc;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>