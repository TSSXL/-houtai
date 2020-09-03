<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">订单管理</span>
            </div>
        </div>
        <div class="form">
<!--            <div class="add">-->
<!--                <div class="chose">-->
<!--                    <el-select v-model="value" placeholder="请选择订单状态" @change="changeType">-->
<!--                        <el-option-->
<!--                                v-for="item in options"-->
<!--                                :key="item.value"-->
<!--                                :label="item.label"-->
<!--                                :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->

<!--                </div>-->

<!--                <div class="refresh" @click="shuaxin">-->
<!--                    <i class="el-icon-refresh-right"></i>-->
<!--                </div>-->

<!--            </div>-->
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
                        label="订单编号"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="订单状态"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <span :class="aClass(scope.row.status)">{{ scope.row.status | dataFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="total"
                        label="订单金额"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="创建时间"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="updated_at"
                        label="更新时间"
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
                                @click="handleShow(scope.$index, scope.row.id)">查看</el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
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


<!--               查看详情-->
        <el-dialog title="订单详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="订单编号" >
                    <el-input  v-model="form.number" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="订单状态" >
                    <el-select v-model="form.status" disabled>
                        <el-option

                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单产品" >
                    <div class="allPro">
                        <div class="item" v-for="(item,index) in form.order_product" :key="index">
                            <p><span>产品标题:</span>{{item.title}}</p>
                            <p><span>产品简介:</span>{{item.description}}</p>
                            <p><span>产品图片:</span>
                                <img :src="`https://cn-flt.com/${item.picurl}`" alt="">
                            </p>
                            <p><span>产品单价:</span>{{item.price}}</p>
                            <p><span>数量:</span>x{{item.num}}</p>
                            <p><span>配送方式:</span>{{item.post_type}}</p>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="收货人地址" >
                    <div class="address">
                        <p>
                            <span style="font-weight: bolder">地址:</span>
                            {{form.order_address.province}}     {{form.order_address.city}}  {{form.order_address.area}}
                        </p>
                        <p>
                            <span style="font-weight: bolder">具体地址:</span>
                            {{form.order_address.address}}
                        </p>
                    </div>
                </el-form-item>
                <el-form-item label="创建时间" >
                    <el-input  v-model="form.created_at" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="更新时间" >
                    <el-input  v-model="form.updated_at" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="折扣" >
                    <el-input  v-model="form.discount" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="运费" >
                    <el-input  v-model="form.postage" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="总金额" >
                    <el-input  v-model="form.total" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="下单备注" >
                    <el-input  v-model="form.message" autocomplete="off" :readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="订单备注" >
                    <el-input  v-model="form.remarks" autocomplete="off" :readonly="readonly" ></el-input>
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
                    <el-input  v-model="form.remarks" autocomplete="off" ></el-input>
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
                console.log(value)
                // const url = `${getOrder()}`
                // this.$axios.post(url,qs.stringify({
                //     page:1,
                //     type:value
                // })).then(res => {
                //     this.tableData=res.data.data.data
                //     this.totalPage=res.data.data.last_page
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
                display: flex;
                flex-direction: row;
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

