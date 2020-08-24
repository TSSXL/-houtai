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
            <div class="add">
                <el-button type="primary" @click="addOne">添加会员</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="nickname"
                        label="昵称"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="realname"
                        label="真实姓名"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="birth"
                        label="生日"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleShow(scope.$index, scope.row)">查看</el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


<!--       查看会员详情-->
        <el-dialog title="会员详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="头像" >
                    <div class="pic">
                        <img :src="circleUrl" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="二维码" >
                    <div class="pic">
                        <img src="../assets/code.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="昵称" >
                    <el-input v-model="form.name" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" >
                    <el-input v-model="form.realName" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="性别" >
                    <el-input v-model="form.sex" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="生日" >
                    <el-input v-model="form.birth" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="手机号" >
                    <el-input v-model="form.phone" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="form.email" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="所在城市" >
                    <el-input v-model="form.city" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" >
                    <el-input v-model="form.address" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="入会时间" >
                    <el-input v-model="form.time" autocomplete="off" :readonly="readonly"></el-input>
                </el-form-item>

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
                <el-form-item label="二维码" >
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="1"
                            list-type="picture-card"
                            :file-list="fileList2"
                            :on-change="handleUploadChange4"
                            :auto-upload="false"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="昵称" >
                    <el-input v-model="form.name" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" >
                    <el-input v-model="form.realName" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="性别" >
                    <el-input v-model="form.sex" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="生日" >
                    <el-input v-model="form.birth" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="手机号" >
                    <el-input v-model="form.phone" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="form.email" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="所在城市" >
                    <el-input v-model="form.city" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" >
                    <el-input v-model="form.address" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>
                <el-form-item label="入会时间" >
                    <el-input v-model="form.time" autocomplete="off" :readonly="Editreadonly"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditdialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="EditdialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {getUser} from "../util/lang";

    export default {
        name: "user",
        data(){
            return{
                fileList: [],
                fileList2:[],
                readonly:true,
                Editreadonly:false,
                circleUrl:'httpss://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                tableData: [
                    {
                        name:'用户1',
                        realName:'张小明',
                        sex:'男',
                        birth:'1990/09/09',
                        phone:'13257741212',
                        email:'132456@qq.com',
                        img:require('../assets/code.png'),
                        code:require('../assets/code.png'),
                        city:'浙江省宁波市',
                        address:'福建省 建瓯市 徐墩镇 丰乐村黄城150号',
                        time:'2020-8-8'
                    },
                    {
                        name:'用户2',
                        realName:'张应明',
                        sex:'女',
                        birth:'1990/09/09',
                        phone:'13257741212',
                        email:'132456@qq.com',
                        img:require('../assets/code.png'),
                        code:require('../assets/code.png'),
                        city:'浙江省宁波市',
                        address:'福建省 建瓯市 徐墩镇 丰乐村黄城150号',
                        time:'2020-8-9'
                    },
                    {
                        name:'用户4',
                        realName:'张小明',
                        sex:'男',
                        birth:'1990/09/09',
                        phone:'13257741212',
                        email:'132456@qq.com',
                        img:require('../assets/code.png'),
                        code:require('../assets/code.png'),
                        city:'浙江省宁波市',
                        address:'福建省 建瓯市 徐墩镇 丰乐村黄城150号',
                        time:'2020-8-10'
                    },
                    {
                        name:'用户4',
                        realName:'张小明',
                        sex:'男',
                        birth:'1990/09/09',
                        phone:'13257741212',
                        email:'132456@qq.com',
                        img:require('../assets/code.png'),
                        code:require('../assets/code.png'),
                        city:'浙江省宁波市',
                        address:'福建省 建瓯市 徐墩镇 丰乐村黄城150号',
                        time:''
                    },
                    {
                        name:'用户5',
                        realName:'张小明',
                        sex:'男',
                        birth:'1990/09/09',
                        phone:'13257741212',
                        email:'132456@qq.com',
                        img:require('../assets/code.png'),
                        code:require('../assets/code.png'),
                        city:'浙江省宁波市',
                        address:'福建省 建瓯市 徐墩镇 丰乐村黄城150号',
                        time:''
                    }
                ],
                form:{}
            }
        },
        mounted(){
            setTimeout(()=>{
                this.getList()
            })
        },
        methods:{
            // 获取全部分类数据
            getList(){
                const url = `${getUser()}`
                this.$axios.post(url).then(res => {
                    this.tableData=res.data.data.data
                   console.log( this.tableData )
                })
            },
            addOne(){
                this.EditdialogTableVisible=true
                this.form={}
            },
            handleUploadChange3(file) {
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
                this.form=row
                console.log(index,row)
                   this.dialogTableVisible=true
            },
        handleEdit(index, row) {
            this.form=row
                this.EditdialogTableVisible=true
        console.log(index, row);
    },
    handleDelete(index, row) {
                this.delete()
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
        }
    }

}
</style>
