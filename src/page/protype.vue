<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>分类管理</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">分类管理</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
                <el-button type="primary" @click="addOne">添加分类</el-button>
                <div class="chose">
                    <el-select v-model="value" placeholder="请选择图片类别" @change="changeType">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>

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
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="分类名称"
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
                        prop="picurl"
                        label="缩略图"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <div class="spic" v-if="scope.row.picurl!==null">
                            <img :src="`https://cn-flt.com/${scope.row.picurl}`" alt="">
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="orderid"
                        label="排序"
                        align="center"
                        width="250">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.orderid" controls-position="right"  @change="((value)=>{handleChange(value, scope.row.id)})" :min="1" :max="10000"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="checkinfo"
                        label="是否显示"
                        align="center"
                        width="150">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.checkinfo"
                                active-color="#409EFF"
                                inactive-color="#dcdfe6"
                                :active-value="activeNum"
                                :inactive-value="InactiveNum"
                                @change="((value)=>{changeStatus(value, scope.row.id)})"
                        >
                        </el-switch>
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
                        layout="prev, pager, next"
                        background
                        @current-change="handleCurrentChange"
                        :current-page="Currentpage"
                        :page-count="totalPage">
                </el-pagination>
            </div>

        </div>


        <!--       查看图片-->
        <el-dialog title="分类详情" :visible.sync="dialogTableVisible" >
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

        <!--      编辑分类-->
        <el-dialog title="编辑分类" :visible.sync="EditdialogTableVisible" >
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
                                :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="分类名称" >
                        <el-input  v-model="form.name" autocomplete="off" placeholder="请输入标题" ></el-input>
                    </el-form-item>
                    <el-form-item label="类别" >
                        <el-select v-model="form.type">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序" >
                        <el-input-number type="number" v-model="form.orderid" controls-position="right" @change="handleChangeEdit" :min="1" :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="是否显示" >
                        <el-switch
                                v-model="form.checkinfo"
                                active-color="#409EFF"
                                inactive-color="#dcdfe6"
                                :active-value="activeNum"
                                :inactive-value="InactiveNum"
                        >
                        </el-switch>
                    </el-form-item>

                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditdialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </div>
        </el-dialog>

        <!--      添加分类-->
        <el-dialog title="添加分类" :visible.sync="AddialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="图片" >
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
                <el-form-item label="分类名称" >
                    <el-input  v-model="form.name" autocomplete="off" placeholder="请输入分类名称" ></el-input>
                </el-form-item>
                <el-form-item label="类别" >
                    <el-select v-model="form.type" placeholder="请选择分类类别">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input-number type="number" v-model="form.orderid" controls-position="right" @change="handleChangeEdit" :min="1" :max="10000"></el-input-number>
                </el-form-item>
                <el-form-item label="是否显示" >
                    <el-switch
                            v-model="form.checkinfo"
                            active-color="#409EFF"
                            inactive-color="#dcdfe6"
                            :active-value="activeNum"
                            :inactive-value="InactiveNum">
                    </el-switch>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import  {getCategory,editCategory,deleteCategory,editCategoryOrder,addCategory} from "../util/lang";
    import  qs from 'qs'
    export default {
        name: "user",
        data(){
            return{
                activeNum:1,
                InactiveNum:0,
                Currentpage:1,
                options: [{
                    value: "1",
                    label: '品类'
                }, {
                    value: "2",
                    label: '系列'
                }],
                value: '',
                fileList: [
                    {url:''}
                ],
                fileList2: [],
                readonly:true,
                totalPage:0,
                Editreadonly:false,
                circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                AddialogTableVisible:false,
                tableData: [],
                form:{
                    name:'',
                    orderid:'',
                    type:"1",
                    checkinfo:1,
                    picurl:''
                }
            }
        },
        filters:{
            dataFormat(n) {
                if(n==1){
                    return '品类'
                }else if(n==2){
                    return '系列'
                }
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            shuaxin(){
                location.reload()
            },
            handleRemove(fileList) {
                this.form.picurl=''
                console.log(fileList)
            },
            changeType(value){
                this.value=value
                const url = `${getCategory()}`
                this.$axios.post(url,qs.stringify({
                    page:1,
                    type:value
                })).then(res => {
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                })
            },
            // 是否显示
            changeStatus(value,id){
                // let val=''
                const url = `${editCategoryOrder()}`
                this.$axios.post(url,qs.stringify({
                    id:id,
                    checkinfo:value
                })).then(res => {
                    if (res.data.code===200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                })
            },
            // 修改排序
            handleChange(value,id) {
                const url = `${editCategoryOrder()}`
                this.$axios.post(url,qs.stringify({
                    id:id,
                    orderid:value
                })).then(res => {
                    if (res.data.code===200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                })
            },
            handleChangeEdit(value){
                this.form.orderid=value
            },
            // 获取全部分类数据
            getList(){
                const url = `${getCategory()}`
                this.$axios.post(url).then(res => {
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                    this.Currentpage=1
                    this.value=''
                })
            },
            handleCurrentChange(val) {
                if(val<=this.totalPage){
                    this.$nextTick(()=>{
                        const url = `${getCategory()}`
                        this.$axios.post(url,qs.stringify(
                            {
                                page:val++,
                                type:this.value
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
            addOne(){
                this.fileList2=[]
                this.AddialogTableVisible=true
                this.form={
                    name:'',
                    orderid:'',
                    type:"1",
                    checkinfo:1,
                    picurl:''
                }
            },
            handleAdd(){
                this.AddialogTableVisible=false
                const url = `${addCategory()}`
                this.$axios.post(url,qs.stringify(this.form))
                    .then(res => {
                        if (res.data.code===200) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getList()
                        }
                    });
            },
            // 确定编辑
            confirmEdit(){
                this.EditdialogTableVisible=false
                const url = `${editCategory()}`
                this.$axios.post(url,qs.stringify(this.form))
                    .then(res => {
                        if (res.data.code===200) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                    });
            },
            // 编辑上传图片接口
            handleUploadChange3(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传的图片大小不能超过2M！");
                } else {
                    const formData = new FormData(); // 声明一个FormData对象
                    formData.append("file", file.raw);
                    const url = "https://cn-flt.com/api/Upload";
                    this.$axios
                        .post(url, formData, {
                            headers: {
                                "content-type": "multer/form-data"
                            }
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.form.picurl=res.data.path
                                this.fileList[0].url='https://cn-flt.com/'+res.data.path
                            }
                        });
                }
            },
            // 添加上传图片接口
            handleUploadChange4(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传的图片大小不能超过2M！");
                } else {
                    const formData = new FormData(); // 声明一个FormData对象
                    formData.append("file", file.raw);
                    const url = "https://cn-flt.com/api/Upload";
                    this.$axios
                        .post(url, formData, {
                            headers: {
                                "content-type": "multer/form-data"
                            }
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.form.picurl=res.data.path
                                this.fileList2[0].url='https://cn-flt.com/'+res.data.path
                            }
                        });
                }
            },
            // 删除
            delete(id) {
                const url = `${deleteCategory(id)}`
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
            handleShow(index, row) {
                this.form=row
                this.fileList[0].url='https://cn-flt.com/'+this.form.picurl
                this.dialogTableVisible=true
            },
            handleEdit(index, row) {
                this.fileList=[{
                    url:''
                }]
                this.form=row
                this.EditdialogTableVisible=true
                if(this.form.picurl!==null && this.form.picurl!==""){
                    this.fileList[0].url='https://cn-flt.com/'+this.form.picurl
                }else{
                    this.fileList=[]
                }
            },
            handleDelete(index, row) {
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
