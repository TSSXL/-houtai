<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>会员管理</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">会员管理</span>
            </div>
        </div>
        <div class="form">
<!--            <div class="add">-->
<!--                <el-button type="primary" @click="addOne">添加会员</el-button>-->
<!--                <div class="refresh" @click="shuaxin">-->
<!--                    <i class="el-icon-refresh-right"></i>-->
<!--                </div>-->
<!--            </div>-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="nickname"
                        label="昵称"
                        align="center"
                        width="300">
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="phone"-->
<!--                        label="手机号"-->
<!--                        align="center"-->
<!--                        width="200">-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="head_pic"
                        label="缩略图"
                        align="center"
                        width="300">
                    <template slot-scope="scope">
                        <div class="spic" v-if="scope.row.head_pic!==null">
                            <img :src="scope.row.head_pic" alt="" style="border-radius: 50%;width:80px;height:80px;">
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleShow(scope.$index, scope.row)">查看</el-button>
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                type="danger"-->
<!--                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>


<!--       查看会员详情-->
        <el-dialog title="会员详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="头像" >
                    <div class="pic">
                        <img :src="form.head_pic" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="昵称" >
                    <el-input v-model="form.nickname" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
<!--                <el-form-item label="手机号" >-->
<!--                    <el-input v-model="form.phone" autocomplete="off" :readonly="readonly"></el-input>-->
<!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <!--      编辑会员详情-->
        <el-dialog title="编辑详情" :visible.sync="EditdialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="头像" >
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="1"
                            list-type="picture-card"
                            :file-list="fileList"
                            :on-change="handleUploadChange3"
                            :auto-upload="false"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="昵称" >
                    <el-input v-model="form.nickname" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditdialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="EditdialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

<!--        <el-tooltip placement="top" content="返回顶部">-->
<!--            <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />-->
<!--        </el-tooltip>-->

    </div>
</template>

<script>
    import {getUser} from "../util/lang";
    export default {
        name: "user",
        data(){
            return{
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
                    background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
                },
                fileList: [],
                fileList2:[],
                readonly:true,
                Editreadonly:false,
                circleUrl:'httpss://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                tableData: [],
                form:{}
            }
        },
        mounted(){
            setTimeout(()=>{
                this.getList()
            })
        },
        methods:{
            shuaxin(){
                location.reload()
            },
            // 获取全部分类数据
            getList(){
                const url = `${getUser()}`;
                this.$axios.post(url).then(res => {
                    this.tableData=res.data.data.data
                })
            },
            addOne(){
                this.EditdialogTableVisible=true;
                this.form={}
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
                                  console.log("aa")
                            }
                        });
                }
            },
        handleUploadChange4(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传的图片大小不能超过2M！");
            } else {
                const formData = new FormData(); // 声明一个FormData对象
                formData.append("file", file.raw);
                const url = "httpss://cloud.carbonconf.cn/common/uploadImg.php";
                this.$axios
                    .post(url, formData, {
                        headers: {
                            "content-type": "multer/form-data"
                        }
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            console.log("aa")
                        }
                    });
            }
        },
            delete() {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleShow(index, row) {
                this.form=row;
                   this.dialogTableVisible=true
            },
        handleEdit(index, row) {
            this.form=row;
                this.EditdialogTableVisible=true;
            this.fileList.push({url:row.head_pic})
    },
    handleDelete(index, row) {
                this.delete();
        console.log(index, row);
    }
        }
    }
</script>

<style lang="less" scoped>
.main{
    width:100%;
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
    .form{
        width:80%;
        margin: 60px auto;
        .add{
            margin: 30px 0;
            position: relative;
            .refresh{
                position: absolute;
                right:0;
                top:0;
                i{
                    font-size: 30px;
                    cursor: pointer;
                    color:#409EFF;
                }
            }
        }
    }

}
</style>
