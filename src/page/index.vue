<template>
  <el-container>
    <!-- 左侧导航栏 -->
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-container>
        <el-header class="logo" :class="{hide_logo:isCollapse}">
<!--          <img class="logo_img" :class="{hide_logo_img:isCollapse}" src="../assets/logo.png" alt />-->
        </el-header>
        <el-main :class="{aside_main:isCollapse}">
          <el-menu
            background-color="#001529"
            text-color="#fff"
            active-text-color="#1890ff"
            :collapse-transition="false"
            :collapse="isCollapse"
            :router="true"
            :default-active="activePath"
          >
            <el-menu-item
              v-for="(item,index) in menuList"
              :key="index"
              :index="'/'+item.path"
              @click="saveNavstatus('/'+item.path)"
            >
              <!-- 图标 -->
              <i :class="iconsObj[index]"></i>
              <!-- 文字 -->
              <span class="menu_text">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-main>
      </el-container>
    </el-aside>
    <!-- 右侧主体 -->
    <el-main class="main">
      <el-container>
        <!-- 头部 -->
        <el-header class="main_head">
          <div class="head">
            <div class="hidenenu_img" @click="hidemenu" style="cursor: pointer">
              <img src="../assets/hidemenu.png" alt />
            </div>

            <div class="head_right">
              <!-- <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>-->
              <i class="iconfont iconxiaoxi" @click="gotoNotice"></i>
              <img class="user_img" :src="`${mInfo.picurl}`" alt />
              <div class="time_address">
                <span>{{mInfo.title}}</span>
                <span>{{mInfo.exhibition_hall}}-{{mInfo.seat_number}}</span>
              </div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="iconfont icongerenzhongxin"
                    @click.native="gotoMyInfo"
                  >个人中心</el-dropdown-item>
                  <el-dropdown-item icon="iconfont iconshezhi" @click.native="gotoBindAcount">设置</el-dropdown-item>
                  <el-dropdown-item icon="iconfont icontuichu_huaban1" @click.native="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <!-- 主体 -->
        <el-main class="main_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-main>
    <Contact />
  </el-container>
</template>

<script>
import { getMerchant } from "../util/lang";
import Cookies from "js-cookie";
import Contact from "../components/contact";
export default {
  data() {
    return {
      isCollapse: false,
      num: 0,
      activePath: "",
      mInfo: {},
      iconsObj: {
        0: "iconfont iconshouye",
        1: "iconfont iconbianji",
        2: "iconfont iconshangchuan",
        3: "iconfont iconqizhi",
        4: "iconfont iconfenxiang",
        5: "iconfont iconxiaoxi-",
        6: "iconfont iconyaoqinghaoyou",
        7: "iconfont iconmingpian",
        8: "iconfont iconrenminbi",
        9: "iconfont iconxiaoxi-",
        10: "iconfont icondianzan",
        11: "iconfont iconyaoqinghaoyou1",
        12: "iconfont icontext_icon",
        13: "iconfont iconmingpian1",
        14: "iconfont iconshangchuan",
        15: "iconfont iconanquan",
      },
      menuList: [
        {
          name: "首页",
          path: "home",
        },
        {
          name: "图片管理",
          path: "pics",
        },
        {
          name: "分类管理",
          path: "protype",
        },
        {
          name: "产品管理",
          path: "product",
        },
        {
          name: "会员管理",
          path: "user",
        }

        // {
        //   name: "自定义分享",
        //   path: "share",
        // },
        // {
        //   name: "贸易对接",
        //   path: "trade",
        // },
        // {
        //   name:'我的邀请',
        //   path:'invite'
        // },{
        //   name:'推广机会',
        //   path:'extend'
        // },
        // {
        //   name: "置顶助力",
        //   path: "assist",
        // },
        // {
        //   name: "留言管理",
        //   path: "leavemsg",
        // },
        // {
        //   name: "点赞管理",
        //   path: "thumbsup",
        // },
        // {
        //   name: "围观管理",
        //   path: "watch",
        // },
        // {
        //   name: "分享记录",
        //   path: "sharerecord",
        // },
        // {
        //   name: "我的信息",
        //   path: "mymsg",
        // },
        // {
        //   name:'我的案例',
        //   path:'mycase'
        // },
        // {
        //   name: "账号绑定",
        //   path: "account",
        // },
      ],
      options: [
        {
          value: "0",
          label: "重庆电子行业智能制造年会暨中研电子智",
        },
        {
          value: "1",
          label: "中研电子智造线上展厅",
        },
      ],
      value: "",
    };
  },
  components: { Contact },
  created() {
    this.activePath = window.sessionStorage.getItem("activepath");
  },
  mounted() {
    this.$nextTick(() => {
      // this.getTest(Cookies.get("mId"));
    });
  },
  methods: {
    getTest(id) {
      const url = `${getMerchant(id)}`;
      this.$axios.post(url).then((res) => {
        this.mInfo = res.data.data;
      });
    },
    hidemenu() {
      this.isCollapse = !this.isCollapse;
    },
    gotoNotice() {
      this.$router.push({
        path: "/notice",
      });
    },
    saveNavstatus(activepath) {
      window.sessionStorage.setItem("activepath", activepath);
    },
    gotoMyInfo() {
      this.$router.push("/mymsg");
    },
    gotoBindAcount() {
      this.$router.push("/account/bindaccount");
    },
    loginOut() {
      Cookies.remove("mId");
      Cookies.remove("userInfo");
      this.$router.push("/login");
      // console.log('aaa')
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #001529;
  color: white;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border: none;
}
.el-menu-item {
  position: relative;
}
.menu_item_active::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 80%;
  background-color: #1890ff;
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
}
.main {
  padding: 0;
}
.aside_main {
  padding: 0;
}
.logo {
  text-align: center;
  background-color: #002140;
}
.hide_logo {
  padding: 0 5px;
}
.logo_img {
  width: 80%;
  background-color: white;
  height: 60%;
  margin-top: 10px;
  cursor: pointer;
}
.hide_logo_img {
  margin-top: 20px;
  height: auto;
}
.main_head {
  padding: 0;
  box-shadow: 0px 0px 10px 0px red;
}
.head {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.hidenenu_img {
  padding-left: 20px;
}
.head_right {
  width: 12%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
}
.el-select {
  width: 60%;
}
.menu_text {
  margin-left: 10px;
}
.user_img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  border: 1px solid #108ee9;
}
.time_address {
  display: flex;
  flex-direction: column;
}
.time_address span {
  font-size: 12px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: rgba(120, 133, 146, 1);
  line-height: 14px;
}
.main_main {
  background-color: #f5f7fa;
  padding: 0;
}
</style>
