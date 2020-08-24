<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>产品管理</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">产品管理</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
                <el-button type="primary" @click="addOne">添加产品</el-button>
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
                        label="产品名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="cname"
                        label="品类名称"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="sname"
                        label="系列名称"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="attribute"
                        label="属性"
                        align="center"
                        width="150">
                    <template slot-scope="scope">
                     <el-button class="aBtn" size="mini" type="primary"  v-for="(item,index) in scope.row.attribute" :key="index" >{{item}}</el-button>
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
                        :page-count="totalPage">
                </el-pagination>
            </div>

        </div>


        <!--      添加-->
        <el-dialog title="添加产品" :visible.sync="AddialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="产品名称" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入产品名称" ></el-input>
                </el-form-item>
                <el-form-item label="产品图片" >
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="10"
                            list-type="picture-card"
                            :file-list="fileList"
                            :on-change="handleUploadChange3"
                            :auto-upload="false"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="品类" >
                    <el-select v-model="form.class" placeholder="请选择品类"  >
                        <el-option
                                v-for="item in category.class"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系列" >
                    <el-select v-model="form.series" placeholder="请选择系列"  >
                        <el-option
                                v-for="item in category.series"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="属性" >
                    <el-checkbox-group v-model="cities" @change="handleCheckedCitiesChange">
                        <el-checkbox label="推荐"></el-checkbox>
                        <el-checkbox label="新品"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="添加规格" >
                    <div class="gg">
                        <p>
                            <i class="el-icon-circle-plus-outline" @click="addItem" style="font-size: 20px;cursor: pointer"></i>
                        </p>
                        <div class="ggs" >
                            <div class="item" v-for="(item,index) in form.product_list" :key="index">
                                <div class="l">
                                    <i class="el-icon-remove-outline" @click="removeItem(index)" ></i>
                                </div>
                                <div class="r">
                                    <div class="oItem">
                                        <span>产品图</span>
                                        <div class="s2" @click="getIndex(index)">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    action="#"
                                                    :limit="1"
                                                    list-type="picture-card"
                                                    :file-list="fileList"
                                                    :on-change="handleUploadChange4"
                                                    :auto-upload="false"
                                            >
                                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>规格名称</span>
                                        <div class="s2">
                                            <el-input  v-model="item.p_name" autocomplete="off" placeholder="请输入规格" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>价格</span>
                                        <div class="s2">
                                            <el-input  v-model="item.price" autocomplete="off" placeholder="请输入价格" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>描述</span>
                                        <div class="s2">
                                            <el-input  v-model="item.description" autocomplete="off" placeholder="请输入描述" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>销量</span>
                                        <div class="s2">
                                            <el-input  v-model="item.sales_num" autocomplete="off" placeholder="请输入销量" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>库存</span>
                                        <div class="s2">
                                            <el-input-number v-model="item.stock"  controls-position="right"  :min="1" :max="10000"    ></el-input-number>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="详情" >
                    <mavon-editor v-model="form.details" :ishljs = "true" ref=md @imgAdd="$imgAdd" />
                </el-form-item>

                <el-form-item label="排序" >
                    <el-input-number v-model="form.orderid" controls-position="right"  :min="1" :max="100"    ></el-input-number>
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
        <el-dialog title="产品详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="产品图" >
                    <div class="pic">
                        <img v-for="(item,index) in form.picarr" :src="`https://cn-flt.com/${item}`" alt="" :key="index">
                    </div>
                </el-form-item>
                <el-form-item label="产品名称" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入标题" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="属性" >
                    <el-checkbox-group v-model="form.attribute" >
                        <el-checkbox v-for="city in cities2" :label="city" :key="city" disabled>{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="选择规格" >
                    <div class="gg">
<!--                        <p>-->
<!--                            <i class="el-icon-circle-plus-outline" ></i>-->
<!--                        </p>-->
                        <div class="ggs" >
                            <div class="item" v-for="(item,index) in form.product_list" :key="index">
<!--                                <div class="l">-->
<!--                                    <i class="el-icon-remove-outline" ></i>-->
<!--                                </div>-->
                                <div class="r">
                                    <div class="oItem">
                                        <span>产品图</span>
                                        <div class="s2">
                                            <img :src="`https://cn-flt.com/${item.picurl}`" alt="">
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>规格名称</span>
                                        <div class="s2">
                                            <el-input  v-model="item.p_name" autocomplete="off" placeholder="请输入规格" :readonly="readonly" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>价格</span>
                                        <div class="s2">
                                            <el-input  v-model="item.price" autocomplete="off" placeholder="请输入价格" :readonly="readonly" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>描述</span>
                                        <div class="s2">
                                            <el-input  v-model="item.description" autocomplete="off" placeholder="请输入描述"  :readonly="readonly"></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>销量</span>
                                        <div class="s2">
                                            <el-input  v-model="item.sales_num" autocomplete="off" placeholder="请输入销量" :readonly="readonly" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>库存</span>
                                        <div class="s2">
                                            <el-input-number v-model="item.stock"  controls-position="right" @change="handleChange" :min="1" :max="10000"  :disabled="true"  ></el-input-number>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="详情" >
                    <mavon-editor v-model="form.details" :ishljs = "true"  />
                </el-form-item>
                <el-form-item label="品类" >
                    <el-select v-model="form.class" placeholder="请选择品类" disabled >
                        <el-option
                                v-for="item in category.class"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系列" >
                    <el-select v-model="form.series" placeholder="请选择系列" disabled >
                        <el-option
                                v-for="item in category.series"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" >
                    <el-input-number v-model="form.orderid" controls-position="right" @change="handleChange" :min="1" :max="100" :disabled="true"></el-input-number>
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
        <el-dialog title="编辑产品" :visible.sync="EditdialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="产品图" >
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="10"
                            list-type="picture-card"
                            :file-list="fileList3"
                            :on-change="handleUploadChange3"
                            :auto-upload="false"
                            :on-remove="handleRemove"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="产品名称" >
                    <el-input  v-model="form.title" autocomplete="off" placeholder="请输入产品名称" ></el-input>
                </el-form-item>
                <el-form-item label="属性" >
                    <el-checkbox-group v-model="form.attribute" @change="handleCheckedCitiesChange2">
                        <el-checkbox label="推荐"></el-checkbox>
                        <el-checkbox label="新品"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="选择规格" >
                    <div class="gg">
                        <p>
                            <i class="el-icon-circle-plus-outline" @click="addItem2" style="font-size: 20px;cursor: pointer;"></i>
                        </p>
                        <div class="ggs" >
                            <div class="item" v-for="(item,index) in form.product_list" :key="index">
                                <div class="l">
                                    <i class="el-icon-remove-outline" @click="removeItem2(index,item.id)"></i>
                                </div>
                                <div class="r">
                                    <div class="oItem">
                                        <span>产品图</span>
                                        <div class="s2 s22" @click="getIndex(index)">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    action="#"
                                                    :limit="1"
                                                    list-type="picture-card"
                                                    :file-list="fileList2"
                                                    :on-change="handleUploadChange4"
                                                    :auto-upload="false"
                                            >
                                                <img  :src="`https://cn-flt.com/${item.picurl}`" class="avatar">
                                            </el-upload>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>规格名称</span>
                                        <div class="s2">
                                            <el-input  v-model="item.p_name" autocomplete="off" placeholder="请输入规格" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>价格</span>
                                        <div class="s2">
                                            <el-input  v-model="item.price" autocomplete="off" placeholder="请输入价格" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>描述</span>
                                        <div class="s2">
                                            <el-input  v-model="item.description" autocomplete="off" placeholder="请输入描述" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>销量</span>
                                        <div class="s2">
                                            <el-input  v-model="item.sales_num" autocomplete="off" placeholder="请输入销量" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>库存</span>
                                        <div class="s2">
                                            <el-input-number v-model="item.stock"  controls-position="right" @change="handleChange" :min="1" :max="10000"    ></el-input-number>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="详情" >
                    <mavon-editor v-model="form.details" :ishljs = "true" ref=md @imgAdd="$imgAdd" />
                </el-form-item>
                <el-form-item label="品类" >
                    <el-select v-model="form.class" placeholder="请选择品类"  >
                        <el-option
                                v-for="item in category.class"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系列" >
                    <el-select v-model="form.series" placeholder="请选择系列"  >
                        <el-option
                                v-for="item in category.series"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input-number v-model="form.orderid" controls-position="right" @change="handleChangeEdit" :min="1" :max="10000"    ></el-input-number>
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
    import  {getProduct,editProductOrder,deleteProduct,addProduct,editProduct,getProductInfo,deleteOne} from "../util/lang";
    import  qs from 'qs'
    export default {
        name: "user",
        data(){
            return{
                picarr:[],
                isUpload:true,
                category:[],
                activeNum:1,
                index:0,
                InactiveNum:0,
                cities:[],
                cities2:[
                    "推荐",
                    "新品"
                ],
                value: '',
                fileList: [],
                fileList2:[],
                fileList3:[],
                readonly:true,
                Editreadonly:false,
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                AddialogTableVisible:false,
                totalPage:0,
                tableData: [],
                form:{
                    title:'',
                    details:'',
                    class:'',
                    series:'',
                    orderid:1,
                    checkinfo:1,
                    picarr:[],
                    attribute:[],
                    product_list:[
                        {
                            p_name:'',
                            price:1000,
                            description:'',
                            stock:1000,
                            sales_num:10,
                            picurl:''
                        },
                        {
                            p_name:'',
                            price:1000,
                            description:'',
                            stock:1000,
                            sales_num:10,
                            picurl:''
                        }
                    ]
                }
            }
        },
        filters:{
            dataFormat(n) {
                if(n=='a'){
                    return '产品分类一'
                }else if(n=='b'){
                    return '产品分类二'
                }else{
                    return '产品分类三'
                }
            }
        },
        mounted(){
            setTimeout(()=>{
                this.getList()
            },100)
        },
        methods:{
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                const url = "https://cn-flt.com/api/Upload";
                this.$axios
                    .post(url, formdata, {
                        headers: {
                            "content-type": "multer/form-data"
                        }
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$refs.md.$img2Url(pos,'https://cn-flt.com/'+res.data.path);
                        }
                    });
            },
            handleRemove(fileList) {
                this.form.picarr.map((item,index)=>{
                    if(item==(fileList.url.split("https://cn-flt.com")[1].toString())){
                        this.form.picarr.splice(index,1)
                    }
                })
            },
            // 对应图片上传
            getIndex(n){
                this.index=n
            },
            // 获取属性
            handleCheckedCitiesChange(val){
              this.form.attribute=val
            },
            handleCheckedCitiesChange2(){
              console.log(this.form.attribute)
            },
            // 是否显示
            changeStatus(value,id){
                const url = `${editProductOrder()}`
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
                const url = `${editProductOrder()}`
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
            // 分页
            handleCurrentChange(val) {
                if(val<=this.totalPage){
                    this.$nextTick(()=>{
                        const url = `${getProduct()}`
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
                const url = `${getProduct()}`
                this.$axios.post(url).then(res => {
                    res.data.data.data.map((item)=>{
                        res.data.category.class.map((i)=>{
                            if(item.class==i.id){
                                item.cname=i.name
                            }
                        })
                        res.data.category.series.map((i)=>{
                            if(item.series==i.id){
                                item.sname=i.name
                            }
                        })
                    })
                    this.category=res.data.category
                    this.tableData=res.data.data.data
                    this.totalPage=res.data.data.last_page
                })
            },
            removeItem(n){
                this.form.product_list.splice(n,1)
            },
            addItem(){
                this.form.product_list.push({
                    p_name:'',
                    price:1000,
                    description:'',
                    stock:1000,
                    sales_num:10,
                    picurl:''
                })
            },
            removeItem2(n,id){
                const url = `${deleteOne(id)}`
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.$message({
                                message: '该规格已删除',
                                type: 'success'
                            });
                        }
                    });
                this.form.product_list.splice(n,1)
            },
            addItem2(){
                this.form.product_list.push({
                    p_name:'',
                    price:1000,
                    description:'',
                    stock:1000,
                    sales_num:10,
                    picurl:''
                })
            },
            addOne(){
                this.fileList=[]
                this.form={
                    title:'',
                    details:'',
                    class:'',
                    series:'',
                    orderid:1,
                    checkinfo:1,
                    picarr:[],
                    attribute:[],
                    product_list:[
                        {
                            p_name:'',
                            price:1000,
                            description:'',
                            stock:1000,
                            sales_num:10,
                            picurl:''
                        }
                    ]
                }
                this.AddialogTableVisible=true
            },
            handleAdd(){
                let newForm=JSON.parse(JSON.stringify(this.form))
                newForm.picarr=JSON.stringify(this.form.picarr)
                newForm.product_list=JSON.stringify(this.form.product_list)
                newForm.attribute=JSON.stringify(this.form.attribute)
                const url = `${addProduct()}`
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
                newForm.picarr=JSON.stringify(this.form.picarr)
                newForm.product_list=JSON.stringify(this.form.product_list)
                newForm.attribute=JSON.stringify(this.form.attribute)
                const url = `${editProduct()}`
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
            handleChangeEdit(value){
                this.form.orderid=value
            },
             // 添加图片
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
                                this.form.picarr.push(res.data.path)
                            }
                        });
                }
            },
            // 编辑图片上传
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
                                   this.isUpload=false
                                this.form.product_list[this.index].picurl=res.data.path
                            }
                        });
                }
            },
            // 删除
            delete(id) {
                const url = `${deleteProduct(id)}`
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
                this.fileList=[]
                this.dialogTableVisible=true
                const url = `${getProductInfo(row.id)}`
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code===200) {
                            this.form=res.data.data
                            this.form.picarr.map((item)=>{
                                this.fileList.push({url:'https://cn-flt.com'+item})
                            })
                        }
                    });
            },
            // 编辑详情
            handleEdit(row) {
                this.fileList3=[]
                setTimeout(()=>{
                    this.EditdialogTableVisible=true
                    const url = `${getProductInfo(row.id)}`
                    this.$axios.post(url)
                        .then(res => {
                            if (res.data.code===200) {
                                this.form=res.data.data
                                this.form.picarr.map((item)=>{
                                    this.fileList3.push({url:'https://cn-flt.com'+item})
                                })
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
<style scoped>
    .pic img{
        width:148px;
        height:148px;
        object-fit: contain;
        margin-right: 10px;
    }
    .s2 img{
        width:148px;
        height:148px;
        object-fit: contain;
    }
    .s22 img{
        width:148px;
        height:148px;
    }
    .ggs .item .r .oItem span{
        display: block;
        width:70px;
    }
</style>
