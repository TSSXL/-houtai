<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>烈士管理</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">烈士管理</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
                <el-button type="primary" @click="addOne">添加烈士</el-button>
                <!--                <div class="chose">-->
                <!--                    <el-select v-model="value" placeholder="请选择产品分类">-->
                <!--                        <el-option-->
                <!--                                v-for="item in options"-->
                <!--                                :key="item.value"-->
                <!--                                :label="item.label"-->
                <!--                                :value="item.value">-->
                <!--                        </el-option>-->
                <!--                    </el-select>-->

                <!--                </div>-->
                <div class="search" style="margin-left: 20px">
                    <el-input v-model="search" placeholder="请输入要搜索的烈士" @change="searchVal"></el-input>
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
                        label="烈士名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="picurl"
                        label="烈士头像"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <div class="spic" v-if="scope.row.picurl!==null">
                            <img :src="`https://tyxxc.sansg.com/${scope.row.picurl}`" alt="">
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="native_place"
                        label="籍贯"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="sacrifice_place"
                        label="牺牲地点"
                        align="center"
                        width="200">
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
        <el-dialog title="添加烈士" :visible.sync="AddialogTableVisible"  >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="烈士姓名" >
                    <el-input  v-model="form.name" autocomplete="off" placeholder="请输入烈士姓名" ></el-input>
                </el-form-item>
                <el-form-item label="烈士头像" >
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="1"
                            list-type="picture-card"
                            :file-list="fileList4"
                            :on-change="handleUploadChange5"
                            :auto-upload="false"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>


                <el-form-item label="烈士生平" >
                    <el-input  v-model="form.content"   type="textarea"
                               :rows="5" autocomplete="off" placeholder="请输入陵园简介" ></el-input>
                </el-form-item>



                <el-form-item label="烈士位置" >
                    <el-input  v-model="form.map"   autocomplete="off" placeholder="请输入经纬度" ></el-input>
                </el-form-item>

                <el-form-item label="籍贯" >
                    <el-input  v-model="form.native_place"   autocomplete="off" placeholder="请输入籍贯" ></el-input>
                </el-form-item>

                <el-form-item label="牺牲地点" >
                    <el-input  v-model="form.sacrifice_place"   autocomplete="off" placeholder="请输入牺牲地点" ></el-input>
                </el-form-item>


                <el-form-item label="选择陵园" >
                    <el-checkbox-group v-model="form.cemetery_id"   >
                        <el-checkbox v-for="(item,index) in lyList" :label="item.id" :key="index"  >{{item.title}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="选择烈士墓" >
                    <el-checkbox-group v-model="form.tomb_id" >
                        <el-checkbox v-for="(item,index) in lsList" :label="item.id" :key="index"  >{{item.title}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>



                <el-form-item label="出生时间" >
                    <el-date-picker
                            v-model="form.birth_time"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="牺牲时间" >
                    <el-date-picker
                            v-model="form.sacrifice_time"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>

        <!--       查看图片-->
        <el-dialog title="烈士详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="烈士姓名" >
                    <el-input  v-model="form.name" autocomplete="off" placeholder="烈士姓名" :readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="烈士头像" >
                    <div class="pic">
                        <img  :src="`https://tyxxc.sansg.com/${form.picurl}`" alt="" :key="index">
                    </div>
                </el-form-item>

                <el-form-item label="烈士生平" >
                    <el-input  v-model="form.content"   type="textarea"
                               :rows="5" autocomplete="off" placeholder="陵园简介" :readonly="readonly" ></el-input>
                </el-form-item>



<!--                <el-form-item label="烈士位置" >-->
<!--                    <el-input  v-model="form.map"   autocomplete="off" placeholder="经纬度"  :readonly="readonly"></el-input>-->
<!--                </el-form-item>-->

                <el-form-item label="选择陵园" >
                    <el-checkbox-group v-model="form.cemetery_id"  >
                        <el-checkbox v-for="(item,index) in lyList" :label="item.id" :key="index"  disabled>{{item.title}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="选择烈士墓" >
                    <el-checkbox-group v-model="form.tomb_id" >
                        <el-checkbox v-for="(item,index) in lsList" :label="item.id" :key="index"  disabled>{{item.title}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>


                <el-form-item label="出生时间" >
                    <el-date-picker
                            v-model="form.birth_time"
                            type="date"
                            disabled
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="牺牲时间" >
                    <el-date-picker
                            v-model="form.sacrifice_time"
                            type="date"
                            disabled
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="籍贯" >
                    <el-input  v-model="form.native_place"   autocomplete="off" placeholder="请输入籍贯"  :readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="牺牲地点" >
                    <el-input  v-model="form.sacrifice_place"   autocomplete="off" placeholder="请输入牺牲地点" :readonly="readonly" ></el-input>
                </el-form-item>


                <el-form-item label="是否显示" >
                    <el-switch
                            v-model="form.checkinfo"
                            active-color="#409EFF"
                            inactive-color="#dcdfe6"
                            :active-value="activeNum"
                            :inactive-value="InactiveNum"
                            disabled
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <!--      编辑图片详情-->
        <el-dialog title="编辑烈士信息" :visible.sync="EditdialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="烈士姓名" >
                    <el-input  v-model="form.name" autocomplete="off" placeholder="烈士姓名" ></el-input>
                </el-form-item>
                <el-form-item label="烈士头像" >
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="1"
                            list-type="picture-card"
                            :file-list="fileList4"
                            :on-change="handleUploadChange5"
                            :auto-upload="false"
                            :on-remove="handleRemove2"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="烈士生平" >
                    <el-input  v-model="form.content"   type="textarea"
                               :rows="5" autocomplete="off" placeholder="请输入烈士生平" ></el-input>
                </el-form-item>




<!--                <el-form-item label="烈士位置" >-->
<!--                    <el-input  v-model="form.map"   autocomplete="off" placeholder="请输入经纬度" ></el-input>-->
<!--                </el-form-item>-->

                <el-form-item label="籍贯" >
                    <el-input  v-model="form.native_place"   autocomplete="off" placeholder="请输入籍贯" ></el-input>
                </el-form-item>

                <el-form-item label="牺牲地点" >
                    <el-input  v-model="form.sacrifice_place"   autocomplete="off" placeholder="请输入牺牲地点" ></el-input>
                </el-form-item>

                <el-form-item label="选择陵园" >
                    <el-checkbox-group v-model="form.cemetery_id"  >
                        <el-checkbox v-for="(item,index) in lyList" :label="item.id" :key="index" >{{item.title}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="选择烈士墓" >
                    <el-checkbox-group v-model="form.tomb_id" >
                        <el-checkbox v-for="(item,index) in lsList" :label="item.id" :key="index" >{{item.title}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="出生时间" >
                    <el-date-picker
                            v-model="form.birth_time"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="牺牲时间" >
                    <el-date-picker
                            v-model="form.sacrifice_time"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
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
                <el-button @click="EditdialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import  {Cemetery_Tomb,getMartyr,editMartyr,changeMartyr,deleteMartyr,addMartyr,updateMartyr} from "../util/lang";
    import  qs from 'qs'
    export default {
        name: "user",
        data(){
            return{
                page:'',
                search:'',
                lyList:[],
                lsList:[],
                activeNum:1,
                index:0,
                InactiveNum:0,
                Currentpage:1,
                value: '',
                fileList4:[],
                readonly:true,
                Editreadonly:false,
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                AddialogTableVisible:false,
                totalPage:0,
                tableData: [],
                form:{
                    name:'',
                    picurl:'',
                    birth_time:'',
                    sacrifice_time:'',
                    native_place:'',
                    sacrifice_place:'',
                    content:'',
                    checkinfo:1,
                    cemetery_id:'',
                    tomb_id:'',
                    checkValue1:[],
                    checkValue2:[],
                },
            }
        },
        // filters:{
        //     dataFormat(n) {
        //         if(n=='a'){
        //             return '产品分类一'
        //         }else if(n=='b'){
        //             return '产品分类二'
        //         }else{
        //             return '产品分类三'
        //         }
        //     }
        // },
        mounted(){
            setTimeout(()=>{
                this.getType();
                this.getList()
            },100)
        },
        methods:{
            searchVal(val){
                const url = `${getMartyr()}`;
                this.$axios.post(url,qs.stringify(
                    {
                        page:1,
                        name:val

                    }
                )).then(res => {
                    this.tableData=res.data.data.data;
                    this.totalPage=res.data.data.last_page;
                    this.Currentpage=1
                })
            },
            shuaxin(){
                location.reload()
            },
            handleRemove2(fileList) {
                this.form.picurl='';
                console.log(fileList)
            },
            // 是否显示
            changeStatus(value,id){
                const url = `${changeMartyr()}`;
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
            // 分页
            handleCurrentChange(val) {
                this.page=val;
                if(val<=this.totalPage){
                    this.$nextTick(()=>{
                        const url = `${getMartyr()}`;
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
                const url = `${getMartyr()}`;
                this.$axios.post(url).then(res => {
                    this.tableData=res.data.data.data;
                    this.totalPage=res.data.data.last_page;
                    this.Currentpage=1
                })
            },
            getType(){
                const url = `${Cemetery_Tomb()}`;
                this.$axios.post(url).then(res => {
                    this.lyList=res.data.cemetery;
                    this.lsList=res.data.tomb
                })
            },
            addOne(){
                this.fileList4=[];
                this.form={
                    name:'',
                    picurl:'',
                    birth_time:'',
                    sacrifice_time:'',
                    native_place:'',
                    sacrifice_place:'',
                    content:'',
                    checkinfo:1,
                    tomb_id:[],
                    cemetery_id:[],
                };
                this.AddialogTableVisible=true
            },
            handleAdd(){
                let newForm=JSON.parse(JSON.stringify(this.form));
                 newForm.cemetery_id=JSON.stringify(newForm.cemetery_id);
                newForm.tomb_id=JSON.stringify(newForm.tomb_id);
                const url = `${addMartyr()}`;
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
                newForm.cemetery_id=JSON.stringify(newForm.cemetery_id);
                newForm.tomb_id=JSON.stringify(newForm.tomb_id);
                const url = `${updateMartyr()}`;
                this.$axios.post(url,qs.stringify(newForm)).then(res => {
                    if (res.data.code===200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        const url = `${getMartyr()}`;
                        this.$axios.post(url,qs.stringify(
                            {
                                page:this.page
                            }
                        )).then(res => {
                            this.tableData=res.data.data.data
                        })
                    }
                })
            },
            handleUploadChange5(file) {
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
            // 删除
            delete(id) {
                const url = `${deleteMartyr(id)}`;
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.$message({
                                message: '已删除',
                                type: 'success'
                            });
                            const url = `${getMartyr()}`;
                            this.$axios.post(url,qs.stringify(
                                {
                                    page:this.page
                                }
                            )).then(res => {
                                this.tableData=res.data.data.data
                            })
                        }
                    });
            },
            // 查看详情
            handleShow(row) {
                this.dialogTableVisible=true;
                const url = `${editMartyr(row.id)}`;
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.form=res.data.data
                        }
                    });
            },
            // 编辑详情
            handleEdit(row) {
                this.fileList4=[];
                setTimeout(()=>{
                    this.EditdialogTableVisible=true;
                    const url = `${editMartyr(row.id)}`;
                    this.$axios.post(url)
                        .then(res => {
                            if(res.data.data.tomb_id==null){
                                res.data.data.tomb_id=[]
                            } else if(res.data.data.cemetery_id==null){
                                res.data.data.cemetery_id=[]
                            }
                            if (res.data.code===200) {
                                this.form=res.data.data;
                                if(this.form.picurl!==null && this.form.picurl!==""){
                                    this.fileList4.push({url:'http://syyl.shangyu.gov.cn'+this.form.picurl})
                                }else{
                                    this.fileList4=[]
                                }
                            }
                        });
                },600)
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
</style>
