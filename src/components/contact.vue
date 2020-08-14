<template>
  <div class="contact">
<!--    <div class="icon" @click="showPop">-->
<!--      <div class="content">-->
<!--        <i class="iconfont iconwodekefu"></i>-->
<!--        <span>联系我们</span>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="pop" :class="{popshow:visible}">-->
<!--      <p>您的专属客服：李瑞霞</p>-->
<!--      <p>服务时间（0:00-24:00）</p>-->
<!--      <div class="tel">-->
<!--        <i class="el-icon-phone"></i>-->
<!--        13372349346-->
<!--      </div>-->
<!--      <div class="qq">-->
<!--        <a href="http://wpa.qq.com/msgrd?v=3&uin=2713583390&site=qq&menu=yes" target="_blank">-->
<!--          <i class="iconfont iconqq"></i> QQ咨询-->
<!--        </a>-->
<!--      </div>-->
<!--      <div class="qrcode">-->
<!--        <div class="item">-->
<!--          <img src="../assets/qrcode.jpg" alt />-->
<!--          <span>客服微信</span>-->
<!--        </div>-->
<!--        &lt;!&ndash; <div class="item">-->
<!--          <img src="../assets/qrcode.png" alt />-->
<!--          <span>客服微信</span>-->
<!--        </div> &ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    showPop() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style lang="less" scoped>
.contact {
  position: fixed;
  right: 10px;
  bottom: 100px;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #1890ff;
    position: relative;
    box-shadow: 0 0 10px 0 gray;
    cursor: pointer;
    .content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        font-size: 30px;
        color: white;
      }
      span {
        color: white;
        font-size: 12px;
        white-space: nowrap;
      }
    }
  }
  .pop {
    display: none;
    //   width: 200px;
    padding: 20px;
    position: absolute;
    bottom: 0;
    right: 90px;
    background-color: white;
    box-shadow: 0 0 10px 0 rgb(173, 173, 173);
    border-radius: 5px;
    p {
      white-space: nowrap;
    }
    p:nth-child(1) {
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 37px;
    }
    p:nth-child(2) {
      font-size: 12px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 37px;
    }
    .tel {
      font-size: 19px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: rgba(64, 169, 255, 1);
      line-height: 58px;
      white-space: nowrap;
    }
    .qq {
      width: 100px;
      // height: 30px;
      padding: 5px 0;
      background-color: #40a9ff;
      border-radius: 5px;
      text-align: center;
      color: white;
      a {
        color: white;
        text-decoration-line: none;
        i {
          color: white;
        }
      }
    }
    .qrcode {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: space-around;
      margin-top: 20px;
      .item {
        width: 100%;
        text-align: center;
        img {
          width: 100%;
        }
        span {
          margin-top: 10px;
          font-size: 12px;
          font-family: Source Han Sans SC;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 37px;
        }
      }
    }
  }
  .popshow {
    display: block;
  }
}
</style>
