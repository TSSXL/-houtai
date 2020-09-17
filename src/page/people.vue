<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>烈士浏览记录</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">烈士浏览记录</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
<!--                <div class="chose">-->
<!--                    <div class="item">-->
<!--                         <span>选择分类:</span>-->
<!--                        <el-select v-model="value" placeholder="请选择分类" clearable  @change="changeType">-->
<!--                            <el-option-->
<!--                                    v-for="item in options"-->
<!--                                    :key="item.value"-->
<!--                                    :label="item.label"-->
<!--                                    :value="item.value">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </div>-->

<!--                </div>-->

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
                        prop="number"
                        label="用户名"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="picurl"
                        label="头像"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <div class="spic" v-if="scope.row.picurl!==null">
                            <img :src="`https://syyl.shangyu.gov.cn/${scope.row.picurl}`" alt="">
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="number"
                        label="烈士名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="picurl"
                        label="烈士图"
                        align="center"
                       >
                    <template slot-scope="scope">
                        <div class="spic" v-if="scope.row.picurl!==null">
                            <img :src="`https://syyl.shangyu.gov.cn/${scope.row.picurl}`" alt="">
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="创建时间"
                        align="center"
                        >
                </el-table-column>
<!--                <el-table-column-->
<!--                        label="操作"-->
<!--                        align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                type="primary"-->
<!--                                @click="handleShow(scope.$index, scope.row.id)">查看</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
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


<!--               查看详情-->
        <el-dialog title="信息详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="标题" >
                    <el-input  v-model="form.discount" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="图片" >
                    <div class="pic">
                        <img :src="circleUrl" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="详情" >
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}"  v-model="form.remarks" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="创建时间" >
                    <el-input  v-model="form.created_at" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <!--               订单编辑-->
        <el-dialog title="编辑订单" :visible.sync="EditdialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="订单编号" >
                    <el-input  v-model="form.number" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="订单状态" >
                    <el-select v-model="form.status" @change="changeType2">
                        <el-option

                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单备注" >
                    <el-input    type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="form.remarks" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </div>
        </el-dialog>




    </div>
</template>

<script>
    import  {getOrder,getOrderInfo,editDing} from "../util/lang";
    import  qs from 'qs'
    export default {
        name: "user",
        data(){
            return{
                number:'',
                total_s:'',
                total_b:'',
                activeNum:1,
                InactiveNum:0,
                Currentpage:1,
                options: [{
                    value: 1,
                    label: '待付款'
                }, {
                    value: 2,
                    label: '待发货'
                },{
                    value: 3,
                    label: '待收货'
                },
                    {
                        value: 4,
                        label: '待评价'
                    }
                ],
                value: '',
                status:'',
                readonly:true,
                totalPage:0,
                Editreadonly:false,
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                tableData: [],
                form:{
                    order_address:{}
                }
            }
        },
        filters:{
            dataFormat(n) {
                if(n===1){
                    return '待付款'
                }else if(n===2){
                    return '待发货'
                }else if(n===3){
                    return '待收货'
                }else if(n===4){
                    return '待评价'
                }
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            aClass(n){
                return 'color'+n
            },
            // 查看详情
            handleShow(n,id) {
                this.dialogTableVisible=true
                const url = `${getOrderInfo(id)}`
                this.$axios.post(url)
                    .then(res => {
                        this.form=res.data.data
                            console.log(res.data.data)
                    });
            },
            confirmSearch2(){
                const url = `${getOrder()}`
                this.$axios.post(url,qs.stringify(
                    {
                        status:this.value,
                        number:this.number,
                       total_s: this.total_s,
                        total_b: this.total_b
                    }
                )).then(res => {
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                    this.Currentpage=1
                    // this.value=''
                })
            },
            handleEdit(n,id){
                this.EditdialogTableVisible=true
                const url = `${getOrderInfo(id)}`
                this.$axios.post(url)
                    .then(res => {
                        this.form=res.data.data
                        this.status=this.form.status
                    });
            },
            shuaxin(){
                location.reload()
            },
            changeType(value){
                this.value=value
                // const url = `${getOrder()}`
                // this.$axios.post(url,qs.stringify(
                //     {
                //         status:value
                //     }
                // )).then(res => {
                //     this.tableData=res.data.data.data
                //     this.totalPage=res.data.data.last_page
                //     this.Currentpage=1
                //     // this.value=''
                // })
            },
            // 编辑状态
            changeType2(value){
                this.status=value
            },
            handleChangeEdit(value){
                this.form.orderid=value
            },
            // 获取全部分类数据
            getList(){
                const url = `${getOrder()}`
                this.$axios.post(url).then(res => {
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                    this.Currentpage=1
                    this.value=''
                })
            },
            // 确定编辑
            confirmEdit(){
                let form={
                    id:'',
                    status:'',
                    remarks:''
                }
                form.id=this.form.id
                form.remarks=this.form.remarks
                form.status=this.status
                this.EditdialogTableVisible=false
                const url = `${editDing()}`
                this.$axios.post(url,qs.stringify(form))
                    .then(res => {
                        if (res.data.code===200) {
                            location.reload()
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                    });
            },
            handleCurrentChange(val) {
                if(val<=this.totalPage){
                    this.$nextTick(()=>{
                        const url = `${getOrder()}`
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
                position: relative;
                .chose{
                    width:90%;
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    justify-content: space-between;
                    .item{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        width:30%;
                        .el-button{
                            margin-left: 10px !important;
                        }
                        span{
                            font-size: 14px;
                            line-height: 30px;
                            text-align: center;
                        }
                        .el-input, .el-select{
                            width:60% !important;
                            margin-left: 20px !important;
                        }
                        .price{
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            width:70%;
                            span{
                                text-align: center;
                                display: inline-block;
                                width:10%;
                                margin-left: 10px;
                            }
                            .el-input{
                                width:40% !important;
                                margin-left: 10px !important;
                            }
                        }
                    }
                    .item:nth-child(1){
                        width:25%;
                    }
                    .item:nth-child(2),.item:nth-child(3){
                        width:35%;
                    }
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
    .allPro{
        width:100%;
    }
    .allPro .item{
        border: 1px solid #e6e6e6;
        width:90%;
        padding: 20px 5%;
        margin-bottom: 20px;
    }
    .allPro .item p{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 15px;
    }
    .allPro .item p span{
        font-weight: bolder;
        display: inline-block;
        margin-right: 10px;
    }
    .color1{
      color:#ff0000;
    }
    .color2{
        color: #caa100;
    }
    .color3{
        color: #00a20b;
    }
    .color4{
        color: #0074ce;
    }
</style>

