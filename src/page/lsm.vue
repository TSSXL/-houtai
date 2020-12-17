<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>科普知识</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">科普知识</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
                <el-button type="primary" @click="addOne">添加科普</el-button>
                <div class="refresh" @click="shuaxin">
                    <i class="el-icon-refresh-right"></i>
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
                >
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        align="center"
                >
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="content"-->
<!--                        label="内容"-->
<!--                        align="center"-->
<!--                        width="300">-->
<!--                    <template slot-scope="scope">-->
<!--                        <div class="nr">-->
<!--                            <div v-html="scope.row.content"></div>-->
<!--                        </div>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="orderid"
                        label="排序"
                        align="center"
                        width="250">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.orderid" controls-position="right"  @change="((value)=>{handleChange(value, scope.row)})" :min="1" :max="10000"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleShow(scope.row)">查看</el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination
                        layout="prev, pager, next"
                        background
                        @current-change="handleCurrentChange"
                        :current-page="Currentpage"
                        :page-count="totalPage">
                </el-pagination>
            </div>

        </div>


        <!--      添加-->
        <el-dialog title="添加科普" :visible.sync="AddialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="标题" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入标题" ></el-input>
                </el-form-item>

                <el-form-item label="内容">
                    <tinymce v-if="isShow2" v-model="form.content" :height="500" @getHtml="getHtml" />
                </el-form-item>


                <el-form-item label="排序">
                    <el-input-number type="number" v-model="form.orderid" controls-position="right"
                                     @change="handleChangeEdit" :min="1" :max="10000"></el-input-number>
                </el-form-item>



            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>


        <!--      查看-->
        <el-dialog title="科普详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="标题" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入标题" :readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="内容" >
                    <div class="html" v-html="form.content" style="border: 1px solid #cccccc;">

                    </div>
                </el-form-item>

                <el-form-item label="排序">
                    <el-input-number type="number" v-model="form.orderid" controls-position="right"
                                     :min="1" :max="10000" :disabled="true"></el-input-number>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>


        <!--      编辑图片详情-->
        <el-dialog title="编辑科普" :visible.sync="EditdialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="标题" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入标题" ></el-input>
                </el-form-item>

                <el-form-item label="内容">
                    <tinymce v-if="isShow" v-model="form.content" :height="500" @getHtml="getHtml" />
                </el-form-item>

                <el-form-item label="排序">
                    <el-input-number type="number" v-model="form.orderid" controls-position="right"
                                     @change="handleChangeEdit" :min="1" :max="10000"></el-input-number>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditdialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import  {getArticle,editArticle,deleteArticle,addArticle,updateArticle} from "../util/lang";
    import  qs from 'qs'
    import Tinymce from '@/components/Tinymce'
    export default {
        name: "user",
        data(){
            return{
                isShow:false,
                isShow2:false,
                index:0,
                Currentpage:1,
                value: '',
                value1:'',
                readonly:true,
                Editreadonly:false,
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                AddialogTableVisible:false,
                totalPage:0,
                tableData: [],
                form:{
                    title:'',
                    content:''
                }
            }
        },
        components:{Tinymce},
        mounted(){
            setTimeout(()=>{
                this.getList()
            },100)
        },
        methods:{
            getHtml(val) {
                this.form.content = val
            },
            handleUploadChange(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传的图片大小不能超过2M！");
                } else {
                    const formData = new FormData(); // 声明一个FormData对象
                    formData.append("file", file.raw);
                    const url = "https://tyxxc.sansg.com/api/Upload";
                    this.$axios
                        .post(url, formData, {
                            headers: {
                                "content-type": "multer/form-data"
                            }
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.form.picurl=res.data.path
                            }
                        });
                }
            },
            shuaxin(){
                location.reload()
            },
            // 分页
            handleCurrentChange(val) {
                if(val<=this.totalPage){
                    this.$nextTick(()=>{
                        const url = `${getArticle()}`;
                        this.$axios.post(url,qs.stringify(
                            {
                                page:val++
                            }
                        )).then(res => {
                            this.tableData=res.data.data.data
                        })
                    })
                }else{
                    this.$notify({
                        title: 'Prompt',
                        message: 'Already Loaded',
                        offset: 100
                    });
                }
            },
            // 获取全部分类数据
            getList(){
                const url = `${getArticle()}`;
                this.$axios.post(url).then(res => {
                    this.tableData=res.data.data.data;
                    this.totalPage=res.data.data.last_page;
                    this.Currentpage=1
                })
            },
            searchVal(val){
                const url = `${getArticle()}`;
                this.$axios.post(url,qs.stringify(
                    {
                        page:1,
                        type:val
                    }
                )).then(res => {
                    this.tableData=res.data.data.data;
                    this.totalPage=res.data.data.last_page;
                    this.Currentpage=1
                })
            },
            addOne(){
                this.fileList=[];
                this.form={
                    title:'',
                    content:'',
                    orderid:1
                };
                this.AddialogTableVisible=true;
                this.isShow2=false;
                setTimeout(()=>{
                    this.isShow2=true
                },100)
            },
            handleAdd(){
                let newForm=JSON.parse(JSON.stringify(this.form));
                const url = `${addArticle()}`;
                this.$axios.post(url,qs.stringify(newForm)).then(res => {
                    if (res.data.code===200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getList()
                    }
                });
                this.AddialogTableVisible=false
            },
            confirmEdit(){
                this.EditdialogTableVisible=false;
                let newForm=JSON.parse(JSON.stringify(this.form));
                const url = `${updateArticle()}`;
                this.$axios.post(url,qs.stringify(newForm)).then(res => {
                    if (res.data.code===200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getList()
                    }
                })
            },
            // 删除
            delete(id) {
                const url = `${deleteArticle(id)}`;
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.$message({
                                message: '已删除',
                                type: 'success'
                            });
                            this.getList()
                        }
                    });
            },
            // 查看详情
            handleShow(row) {
                this.dialogTableVisible=true;
                const url = `${editArticle(row.id)}`;
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.form=res.data.data
                        }
                    });
            },
            // 编辑详情
            handleEdit(row) {
                this.fileList=[];
                this.isShow=false;
                setTimeout(()=>{
                    this.EditdialogTableVisible=true;
                    const url = `${editArticle(row.id)}`;
                    this.$axios.post(url)
                        .then(res => {
                            if (res.data.code===200) {
                             this.isShow=true;
                                this.form=res.data.data;
                                if(this.form.picurl!==null && this.form.picurl!==""){
                                    this.fileList.push({url:'http://tyxxc.sansg.com'+this.form.picurl})
                                }else{
                                    this.fileList=[]
                                }
                            }
                        });
                },600)
            },
            handleRemove2(fileList) {
                this.form.picurl='';
                console.log(fileList)
            },
            // 删除该产品
            handleDelete(row) {
                this.delete(row.id)
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
                position: relative;
                .chose{
                    margin: 0 30px;
                }
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
<style scoped>
    .ggs .item{
        width:95%;
        padding: 20px 2.5%;
        border: 1px solid #e6e6e6;
        margin-bottom: 30px;
    }
    .pic img{
        width:148px;
        height:148px;
        object-fit: cover;
        margin-right: 10px;
    }
    .s2 img{
        width:148px;
        height:148px;
        object-fit: cover;
    }
    .s22{
        position: relative;
    }
    .s22 img{
        width:148px;
        height:148px;
    }
    .s22 i{
        position: absolute;
        right:-40px;
        top:0;
        cursor: pointer;
        font-size: 25px;
    }
    .ggs .item .r .oItem span{
        display: block;
        width:70px;
    }
    .html >>> img{
        max-width: 100%;
        object-fit: contain;
    }
</style>
