<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>图片管理</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">图片管理</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
                <el-button type="primary" @click="addOne">添加图片</el-button>
                <div class="chose">
                    <el-select v-model="value" placeholder="请选择图片类别">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>

            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="ID"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类别"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.type | dataFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="spic"
                        label="缩略图"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <div class="spic">
                            <img :src="scope.row.spic" alt="">
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="排序"
                        align="center"
                        width="300">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template slot-scope="scope">
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
            <div class="pager">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>

        </div>


        <!--       查看图片-->
        <el-dialog title="图片编辑" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="图片" >
                    <div class="pic">
                        <img :src="circleUrl" alt="">
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <!--      编辑图片详情-->
        <el-dialog title="编辑图片" :visible.sync="EditdialogTableVisible" >
            <el-form :model="form"   label-width="100px">
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
                    <el-form-item label="标题" >
                        <el-input  v-model="form.title" autocomplete="off" placeholder="请输入标题" ></el-input>
                    </el-form-item>
                    <el-form-item label="类别" >
                        <el-select v-model="form.type" placeholder="请选择图片类别">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序" >
                        <el-input-number v-model="form.num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                    </el-form-item>

                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditdialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="EditdialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <!--      添加-->
        <el-dialog title="添加图片" :visible.sync="AddialogTableVisible" >
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
                <el-form-item label="标题" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入标题" ></el-input>
                </el-form-item>
                <el-form-item label="类别" >
                    <el-select v-model="form.type" placeholder="请选择图片类别">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input-number v-model="form.num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="AddialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "user",
        data(){
            return{
                options: [{
                    value: 'a',
                    label: '首页banner'
                }, {
                    value: 'b',
                    label: '生活体验馆'
                }, {
                    value: 'c',
                    label: '实体店'
                }],
                value: '',
                fileList: [],
                fileList2: [],
                readonly:true,
                Editreadonly:false,
                circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                AddialogTableVisible:false,
                tableData: [
                    {
                         id:1,
                        title:'aaa',
                        type:'a',
                        spic:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                        num:1
                    },
                    {
                        id:1,
                        title:'aaa',
                        type:'b',
                        spic:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                        num:1
                    },
                    {
                        id:1,
                        title:'aaa',
                        type:'c',
                        spic:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                        num:5
                    },
                    {
                        id:1,
                        title:'aaa',
                        type:'a',
                        spic:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                        num:1
                    }
                ],
                form:{
                    title:'',
                    num:1,
                    type:'a'
                }
            }
        },
        filters:{
            dataFormat(n) {
               if(n=='a'){
                   return '首页banner'
               }else if(n=='b'){
                   return '生活体验馆'
               }else{
                   return '实体店'
               }
            }
        },
        methods:{
            handleChange(value) {
                console.log(value);
            },
            addOne(){
                this.AddialogTableVisible=true
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
                width:100%;
                display: flex;
                flex-direction: row;
                .chose{
                    margin: 0 30px;
                }
            }
            .spic{
                img{
                    width:60px;
                    height:60px;
                    object-fit: contain;
                }
            }
        }

    }
</style>
