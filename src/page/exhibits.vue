<template>
  <div class="exhibits">
    <div class="top">
      <div class="left">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>展品上传</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="them">展品上传</span>
      </div>
      <div class="right" @click="addExhibits('新增展品')">
        <i class="el-icon-plus"></i>
        新增展品
      </div>
    </div>
    <div class="content">
      <el-card class="item" shadow="hover" v-for="(item,index) in List" :key="index">
        <div class="img_box">
          <img :src="`${item.picurl}`" class="image" />
        </div>
        <div class="tag">
          <span>{{item.keywords}}</span>
          <span>{{item.title}}</span>
        </div>
        <div class="btn">
          <div class="l" @click="deleteDialog(index)">
            删除
            <div class="tooltiptext" :class="{showtooltiptext:deleteDialogShow&&index==num}">
              <div class="text">
                <i class="el-icon-info"></i>
                确认删除？
              </div>
              <div class="btn">
                <el-button type="primary" size="mini" @click.stop="confirmDelete(item.id)">确认</el-button>
                <el-button size="mini" @click.stop="hideDeleteDialog">取消</el-button>
              </div>
            </div>
          </div>
          <div class="r" @click="editExhibits('编辑展品',item.id)">编辑</div>
        </div>
      </el-card>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addExhibitsDialog"
      @close="closeDialog"
      @open="openDialog"
    >
      <el-form class="form" :model="form" :rules="rules" ref="exhibitsForm" label-width="200px">
        <el-form-item label="展品封面：" required>
          <el-upload
            class="avatar-uploader"
            action="#"
            list-type="picture-card"
            :show-file-list="false"
            :limit="1"
            :on-change="handleUploadChange"
            :auto-upload="false"
          >
            <img v-if="form.picurl" :src="`${form.picurl}`" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="upload_logo_text">图片要求：2M以下的jpg或png，大小为：225px*160px</div>
        </el-form-item>
        <el-form-item label="封面视频：">
          <el-upload
            action="#"
            :show-file-list="false"
            list-type="picture-card"
            :limit="1"
            :on-change="handleUploadChange2"
            :auto-upload="false"
          >
            <img v-if="form.invite_video" :src="`${form.invite_video}`" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="upload_logo_text">视频要求：请上传20M以下的视频</div>
        </el-form-item>
        <el-form-item label="内容形式：" >
          <el-radio-group v-model="contentType">
            <el-radio label="文本"></el-radio>
            <el-radio label="图片"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展品名称：" required prop="title">
          <el-input v-model="form.title" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item v-if="contentType=='文本'" label="展品介绍：">
          <el-input type="textarea" v-model="form.content" placeholder="请输入简介6-2000字"></el-input>
        </el-form-item>
        <el-form-item v-else label="展品介绍：">
          <el-upload
            class="avatar-uploader"
            action="#"
            :limit="3"
            list-type="picture-card"
            :before-remove="removePic"
            :file-list="fileList"
            :on-change="handleUploadChange3"
            :auto-upload="false"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="展品类别：" prop="keywords">
          <el-select v-model="form.keywords" placeholder="请选择展品类型">
            <el-option label="仪器" value="mesxitong"></el-option>
            <el-option label="设备" value="zhubanafang"></el-option>
            <el-option label="原料" value="diaokeji"></el-option>
            <el-option label="产品" value="diaokeji"></el-option>
            <el-option label="技术" value="diaokeji"></el-option>
            <el-option label="其他" value="diaokeji"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="展品卖点：">
          <el-input v-model="form.sellpoint" placeholder="请输入展品卖点"></el-input>
        </el-form-item>-->
        <div class="row">
          <el-form-item label="产地：" prop="made_in">
            <el-input v-model="form.made_in" placeholder="请输入产地"></el-input>
          </el-form-item>
          <el-form-item label="产能：" prop="capacity">
            <el-input v-model="form.capacity" placeholder="请输入产地"></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="可用库存：" prop="stock">
            <el-input v-model="form.stock" placeholder="请输入可用库存"></el-input>
          </el-form-item>
          <el-form-item label="库存时间：" prop="release_time">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.release_time"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="网站地址：" prop="linkurl">
          <el-input v-model="form.linkurl" placeholder="请输入网站地址"></el-input>
        </el-form-item>
        <!-- <div class="row1">
          <el-form-item label="显示顺序：" prop="orderid">
            <el-input type="number" v-model="form.orderid" :value="form.showNum"></el-input>
          </el-form-item>
          <i class="el-icon-circle-plus-outline" @click="add"></i>
          <i class="el-icon-remove-outline" @click="reduce"></i>
        </div>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMerchantPro, editMerchantPro, delMerchantPro } from "../util/lang";
import qs from "qs";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      num: "",
      addExhibitsDialog: false,
      dialogTitle: "",
      deleteDialogShow: false,
      List: [],
      contentType: "文本",

      form: {
        merchant_id: "",
        id: "",
        picurl: "",
        invite_video: "",
        title: "",
        content: "",
        contentarr: [],
        keywords: "",
        made_in: "",
        // sellpoint: "",
        capacity: "",
        stock: "",
        release_time: "",
        linkurl: ""
        // orderid: 1
      },
      picList: [],
      fileList: [],
      rules: {
        title: [{ required: true, message: "请输入展品名称", trigger: "blur" }],
      }
    };
  },
  mounted() {
    // this.form.merchant_id=Cookies.get('mId')
    this.$nextTick(() => {
      // this.getExhibitsList(Cookies.get('mId'))
    })
  },
  methods: {
    getExhibitsList(id) {
      const url = `${getMerchantPro(id)}`;
      this.$axios.post(url).then(res => {
        this.List = res.data.data;
      });
    },
    addExhibits(text) {
      this.form.picurl = "";
      this.dialogTitle = text;
      this.addExhibitsDialog = true;
    },
    async editExhibits(text, id) {
      this.form.id = id;
      const url = `${editMerchantPro(id)}`;
      await this.$axios.post(url).then(res => {
        this.dialogTitle = text;
        this.addExhibitsDialog = true;

        this.$nextTick(() => {
          this.form.picurl = res.data.data.picurl;
          this.form.title = res.data.data.title;
          this.form.content = res.data.data.content;
          this.form.keywords = res.data.data.keywords;
          this.form.made_in = res.data.data.chandi;
          this.form.capacity = res.data.data.capacity;
          this.form.stock = res.data.data.stock;
          this.form.release_time = res.data.data.release_time;
          this.form.linkurl = res.data.data.linkurl;
          this.form.contentarr = res.data.data.contentarr;
          if (res.data.data.contentarr != null) {
            this.picList = JSON.parse(res.data.data.contentarr);
            this.picList.map(item => {
              this.fileList.push({
                url: item
              });
            });
          }
        });
      });
    },
    handleUploadChange(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过2M！");
      } else {
      const formData = new FormData(); // 声明一个FormData对象
      formData.append("file", file.raw);
      const url = "https://cloud.carbonconf.cn/common/uploadImg.php";
      this.$axios
        .post(url, formData, {
          headers: {
            "content-type": "multer/form-data"
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.form.picurl = res.data.path;
          }
        });
      }
    },
    handleUploadChange2(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("上传的视频大小不能超过20M！");
      } else {
      const formData = new FormData(); // 声明一个FormData对象
      formData.append("file", file.raw);
      const url = "https://cloud.carbonconf.cn/common/uploadVideo.php";
      this.$axios
        .post(url, formData, {
          headers: {
            "content-type": "multer/form-data"
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.form.invite_video = res.data.path;
          }
        });
      }
    },
    handleUploadChange3(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过2M！");
      } else {
      const formData = new FormData(); // 声明一个FormData对象
      formData.append("file", file.raw);
      const url = "https://cloud.carbonconf.cn/common/uploadImg.php";
      this.$axios
        .post(url, formData, {
          headers: {
            "content-type": "multer/form-data"
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.picList.push(res.data.path);
          }
        });
      }
    },
    // add() {
    //   this.form.orderid = parseInt(this.form.orderid);
    //   this.form.orderid = this.form.orderid + 1;
    // },
    // reduce() {
    //   this.form.orderid = parseInt(this.form.orderid);
    //   if (this.form.orderid != 0) {
    //     this.form.orderid = this.form.orderid - 1;
    //   }
    // },
    deleteDialog(index) {
      this.num = index;
      this.deleteDialogShow = true;
    },
    hideDeleteDialog() {
      this.deleteDialogShow = false;
    },
    confirmDelete(id) {
      const url = `${delMerchantPro(id)}`;
      this.$axios.post(url).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功！");
          this.addExhibitsDialog = false;
          this.getExhibitsList(Cookies.get("mId"));
        } else {
          this.$message.error("删除失败!");
        }
      });
      this.deleteDialogShow = false;
    },
    cancel() {
      this.addExhibitsDialog = false;
    },
    confirm() {
      if(this.form.picurl&&(this.form.content||this.form.contentarr.length!=0)){
        if (this.dialogTitle == "新增展品") {
        var form1 = JSON.stringify(this.form) ;
        form1=JSON.parse(form1)
        delete form1.id;

        form1.contentarr = JSON.stringify(this.picList);

        const url = "/api/pc/addMerchantPro";
        this.$axios.post(url, qs.stringify(form1)).then(res => {
          if (res.data.code == 200) {
            this.$message.success("添加成功！");

            this.addExhibitsDialog = false;
            this.getExhibitsList(window.sessionStorage.getItem("mId"));
          } else {
            this.$message.error("添加失败！");
          }
        });
      } else {
        var form = JSON.stringify(this.form) ;
        form=JSON.parse(form)
        delete form.merchant_id;
        delete form.orderid
        form.contentarr = JSON.stringify(this.picList);
        const url2 = "/api/pc/updateMerchantPro";
        this.$axios.post(url2, qs.stringify(form)).then(res => {
          if (res.data.code == 200) {
            this.$message.success("修改成功！");

            this.addExhibitsDialog = false;
            this.getExhibitsList(window.sessionStorage.getItem("mId"));
          } else {
            this.$message.error("修改失败！");
          }
        });
      }
      }
      else{
        this.$message.error('请将信息填写完整！')
      }

    },
    openDialog() {
      if (this.$refs.exhibitsForm) {
        this.$refs.exhibitsForm.resetFields();
      }
    },
    closeDialog() {
      this.$emit("sendFormData", this.exhibitsForm);
      this.picList = [];
      this.fileList = [];
    },
    removePic(file){
      this.picList.forEach((item,index)=>{
        if(item==file.url){
          this.picList.splice(index,1)
        }
      })
    }
  }
};
</script>


<style lang="less" scoped>
.exhibits {
  .top {
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-shadow: 0 0 5px 0 #afafaf;
    background-color: white;
    margin-top: 1px;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      .them {
        font-size: 20px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #333333;
        line-height: 53px;
      }
    }
    .right {
      border: 2px dotted #108ee9;
      background: #e7f3fd;
      width: 130px;
      padding: 30px 0;
      text-align: center;
      color: #108ee9;
      display: table-cell;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .content {
    margin: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    //   justify-content: space-between;
    .item {
      width: 22%;
      margin: 0 1%;
      background-color: white;
      .img_box {
        // width: 80%;
        margin: auto;
        height: 210px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .tag {
        // margin: 0px 10px;
        margin-top: 10px;
        span:nth-child(1) {
          border: 1px solid #29c978;
          color: #29c978;
          font-size: 14px;
          padding: 2px;
          border-radius: 3px;
        }
        span:nth-child(2) {
          margin-left: 20px;
          font-size: 14px;
          font-family: Source Han Sans SC;
          color: #333333;
        }
      }
      .btn {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        .l,
        .r {
          width: 50%;
          text-align: center;
          line-height: 25px;
          color: #888;
          cursor: pointer;
        }
        .l {
          position: relative;
          .tooltiptext {
            display: none;
            width: 120px;
            background-color: white;
            color: #fff;
            text-align: center;
            padding: 10px 10px;
            border-radius: 6px;

            /* 定位 */
            position: absolute;
            width: 120px;
            bottom: 100%;
            left: 50%;
            margin-left: -60px;
            z-index: 1;
            box-shadow: 0 0 10px 0 #999999;
            .text {
              font-size: 16px;
              color: #333333;
              i {
                color: #faad14;
              }
            }
            .btn {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              margin-top: 10px;
            }
            &::after {
              content: " ";
              position: absolute;
              top: 100%; /* 提示工具底部 */
              left: 50%;
              margin-left: -5px;
              border-width: 5px;
              border-style: solid;
              border-color: white transparent transparent transparent;
            }
          }
          .showtooltiptext {
            display: block;
          }
          &::after {
            content: "";
            display: inline-block;
            height: 90%;
            width: 1px;
            background-color: #ededed;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      &:hover {
        .tag {
          span:nth-child(2) {
            color: #1890ff;
          }
        }
      }
    }
  }
  .form {
    width: 80%;
    margin: auto;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
  .upload_logo_text {
    font-size: 14px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .row1 {
    display: flex;
    align-items: center;
    i {
      cursor: pointer;
    }
    .el-icon-circle-plus-outline {
      font-size: 25px;
      color: red;
      margin-bottom: 22px;
      margin-left: 10px;
    }
    .el-icon-remove-outline {
      font-size: 25px;
      color: #409eff;
      margin-bottom: 22px;
      margin-left: 10px;
    }
  }
}
</style>
<style scoped>
.avatar-uploader >>> .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
