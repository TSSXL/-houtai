<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>烈士墓</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">烈士墓</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
                <el-button type="primary" @click="addOne">添加烈士墓</el-button>
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

                <div class="search" style="display: flex;flex-direction: row;">
                    <el-input v-model="search" placeholder="请输入要搜索的烈士墓" @change="searchVal" style="margin: 0 20px"></el-input>
                    <el-select v-model="form.town" clearable  placeholder="请选择城镇" @change="searchVal2">
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item">
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
                        prop="title"
                        label="烈士墓名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="map"
                        label="经纬度"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="town"
                        label="城镇"
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
        <el-dialog title="添加烈士墓" :visible.sync="AddialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="烈士墓名称" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入烈士墓名称" ></el-input>
                </el-form-item>

                <el-form-item label="经纬度" >
                    <el-input  v-model="form.map"   autocomplete="off" placeholder="请输入经纬度" ></el-input>
                </el-form-item>

                <el-form-item label="城镇" >
                    <el-select v-model="form.town" placeholder="请选择城镇">
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
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
        <el-dialog title="烈士墓详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="烈士墓名称" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="陵园名称" :readonly="readonly"></el-input>
                </el-form-item>


                <el-form-item label="经纬度" >
                    <el-input  v-model="form.map"   autocomplete="off" placeholder="经纬度"  :readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="城镇" >
                    <el-select v-model="form.town" placeholder="城镇" disabled>
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
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
        <el-dialog title="编辑烈士墓" :visible.sync="EditdialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="烈士墓名称" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入烈士墓名称" ></el-input>
                </el-form-item>

                <el-form-item label="经纬度" >
                    <el-input  v-model="form.map"   autocomplete="off" placeholder="请输入经纬度" ></el-input>
                </el-form-item>

                <el-form-item label="城镇" >
                    <el-select v-model="form.town" placeholder="城镇">
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
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
    import  {getTomb,editTomb,changeTomb,deleteTomb,addTomb,updateTomb} from "../util/lang";
    import  qs from 'qs'
    export default {
        name: "user",
        data(){
            return{
                title:'',
                page:'',
                val:'',
                search:'',
                options:[
                    '曹娥街道',
                    '陈溪乡',
                    '丰惠镇',
                    '梁湖镇',
                    '上浦镇',
                    '小越镇',
                    '驿亭镇',
                    '永和镇',
                    '章镇镇'
                ],
                isUpload:true,
                activeNum:1,
                index:0,
                InactiveNum:0,
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
                    checkinfo:1,
                    town:'',
                    map:''
                }
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
                this.getList()
            },100)
        },
        methods:{
            searchVal(val){
                this.title=val
                const url = `${getTomb()}`
                this.$axios.post(url,qs.stringify(
                    {
                        page:1,
                        title:val,
                        town:this.town
                    }
                )).then(res => {
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                    this.Currentpage=1
                })
            },
            searchVal2(val){
                this.town=val
                const url = `${getTomb()}`
                this.$axios.post(url,qs.stringify(
                    {
                        page:1,
                        title:this.title,
                        town:val
                    }
                )).then(res => {
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                    this.Currentpage=1
                })
            },
            shuaxin(){
                location.reload()
            },
            // 是否显示
            changeStatus(value,id){
                const url = `${changeTomb()}`
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
                this.page=val
                if(val<=this.totalPage){
                    this.$nextTick(()=>{
                        const url = `${getTomb()}`
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
                const url = `${getTomb()}`
                this.$axios.post(url).then(res => {
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                    this.Currentpage=1
                })
            },
            addOne(){
                this.form={
                    title:'',
                    checkinfo:1,
                    map:'',
                    town:''
                }
                this.AddialogTableVisible=true
            },
            handleAdd(){
                let newForm=JSON.parse(JSON.stringify(this.form))
                const url = `${addTomb()}`
                this.$axios.post(url,qs.stringify(newForm)).then(res => {
                    if (res.data.code===200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getList()
                    }
                })
                this.AddialogTableVisible=false
            },
            confirmEdit(){
                this.EditdialogTableVisible=false
                let newForm=JSON.parse(JSON.stringify(this.form))
                const url = `${updateTomb()}`
                this.$axios.post(url,qs.stringify(newForm)).then(res => {
                    if (res.data.code===200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        const url = `${getTomb()}`
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
            // 删除
            delete(id) {
                const url = `${deleteTomb(id)}`
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.$message({
                                message: '已删除',
                                type: 'success'
                            });
                            const url = `${getTomb()}`
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
                this.fileList=[]
                this.dialogTableVisible=true
                const url = `${editTomb(row.id)}`
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.form=res.data.data
                        }
                    });
            },
            // 编辑详情
            handleEdit(row) {
                setTimeout(()=>{
                    this.EditdialogTableVisible=true
                    const url = `${editTomb(row.id)}`
                    this.$axios.post(url)
                        .then(res => {
                            if (res.data.code===200) {
                                this.form=res.data.data
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
