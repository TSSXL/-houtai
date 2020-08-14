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
                <div class="chose">
                    <el-select v-model="value" placeholder="请选择产品分类">
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
                        prop="name"
                        label="产品名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="分类"
                        align="center"
                        width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.type | dataFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="counts"
                        label="销量"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="spic"
                        label="缩略图"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <div class="spic">
                            <img :src="scope.row.img" alt="">
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="排序"
                        align="center"
                        width="220">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.num" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
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
        <el-dialog title="产品详情" :visible.sync="dialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="产品图" >
                    <div class="pic">
                        <img :src="circleUrl" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="产品名称" >
                    <el-input  v-model="form.name" autocomplete="off" placeholder="请输入标题" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="价格" >
                    <el-input  v-model="form.price" autocomplete="off" placeholder="请输入标题" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="销量" >
                    <el-input  v-model="form.counts" autocomplete="off" placeholder="请输入标题" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="属性" >
                    <el-checkbox-group v-model="checkedCities" >
                        <el-checkbox v-for="city in cities" :label="city" :key="city" disabled>{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="选择规格" >
                    <div class="gg">
                        <p>
                            <i class="el-icon-circle-plus-outline" ></i>
                        </p>
                        <div class="ggs" >
                            <div class="item" v-for="(item,index) in form.gList" :key="index">
                                <div class="l">
                                    <i class="el-icon-remove-outline" ></i>
                                </div>
                                <div class="r">
                                    <div class="oItem">
                                        <span>产品图</span>
                                        <div class="s2">
                                            <img :src="item.img" alt="">
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>规格</span>
                                        <div class="s2">
                                            <el-input v-model="item.gg"  autocomplete="off" placeholder="请输入规格" :readonly="readonly"></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>库存</span>
                                        <div class="s2">
                                            <el-input-number v-model="item.num"  controls-position="right" @change="handleChange" :min="1" :max="10000"   :disabled="true" ></el-input-number>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="分类" >
                    <el-select v-model="form.type" placeholder="请选择产品分类" disabled >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" >
                    <el-input-number v-model="form.num" controls-position="right" @change="handleChange" :min="1" :max="100" :disabled="true"></el-input-number>
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
                            :file-list="fileList"
                            :on-change="handleUploadChange3"
                            :auto-upload="false"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="产品名称" >
                    <el-input  v-model="form.name" autocomplete="off" placeholder="请输入产品名称" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="价格" >
                    <el-input  v-model="form.price" autocomplete="off" placeholder="请输入价格" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="销量" >
                    <el-input  v-model="form.counts" autocomplete="off" placeholder="请输入销量" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="属性" >
                    <el-checkbox-group v-model="checkedCities" >
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="选择规格" >
                    <div class="gg">
                        <p>
                            <i class="el-icon-circle-plus-outline" @click="addItem2"></i>
                        </p>
                        <div class="ggs" >
                            <div class="item" v-for="(item,index) in form.gList" :key="index">
                                <div class="l">
                                    <i class="el-icon-remove-outline" @click="removeItem2(index)"></i>
                                </div>
                                <div class="r">
                                    <div class="oItem">
                                        <span>产品图</span>
                                        <div class="s2">
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
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>规格</span>
                                        <div class="s2">
                                            <el-input v-model="item.gg"  autocomplete="off" placeholder="请输入规格" ></el-input>
                                        </div>
                                    </div>
                                    <div class="oItem">
                                        <span>库存</span>
                                        <div class="s2">
                                            <el-input-number v-model="item.num"  controls-position="right" @change="handleChange" :min="1" :max="10000"    ></el-input-number>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="分类" >
                    <el-select v-model="form.type" placeholder="请选择产品分类"  >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input-number v-model="form.num" controls-position="right" @change="handleChange" :min="1" :max="100"    ></el-input-number>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditdialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="EditdialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <!--      添加-->
        <el-dialog title="添加产品" :visible.sync="AddialogTableVisible" >
            <el-form :model="form"   label-width="100px">
                <el-form-item label="产品图" >
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
                <el-form-item label="产品名称" >
                    <el-input  v-model="form.name" autocomplete="off" placeholder="请输入产品名称" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="价格" >
                    <el-input  v-model="form.price" autocomplete="off" placeholder="请输入价格" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="销量" >
                    <el-input  v-model="form.counts" autocomplete="off" placeholder="请输入销量" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="属性" >
                    <el-checkbox-group v-model="checkedCities" >
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="选择规格" >
                    <div class="gg">
                        <p>
                            <i class="el-icon-circle-plus-outline" @click="addItem"></i>
                        </p>
                        <div class="ggs" >
                             <div class="item" v-for="(item,index) in gList" :key="index">
                                 <div class="l">
                                     <i class="el-icon-remove-outline" @click="removeItem(index)"></i>
                                 </div>
                                 <div class="r">
                                        <div class="oItem">
                                             <span>产品图</span>
                                             <div class="s2">
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
                                             </div>
                                        </div>
                                     <div class="oItem">
                                         <span>规格</span>
                                         <div class="s2">
                                             <el-input   autocomplete="off" placeholder="请输入规格" ></el-input>
                                         </div>
                                     </div>
                                     <div class="oItem">
                                         <span>库存</span>
                                         <div class="s2">
                                             <el-input-number v-model="item.num"  controls-position="right" @change="handleChange" :min="1" :max="10000"    ></el-input-number>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="分类" >
                    <el-select v-model="form.type" placeholder="请选择产品分类"  >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input-number v-model="form.num" controls-position="right" @change="handleChange" :min="1" :max="100"    ></el-input-number>
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
                checkedCities: ['推荐', '新品'],
                cities:['推荐', '新品'],
                options: [{
                    value: 'a',
                    label: '产品分类1'
                }, {
                    value: 'b',
                    label: '产品分类2'
                }, {
                    value: 'c',
                    label: '产品分类3'
                }],
                value: '',
                fileList: [],
                fileList2: [],
                readonly:true,
                Editreadonly:false,
                circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                gList:[],
                dialogTableVisible:false,
                EditdialogTableVisible:false,
                AddialogTableVisible:false,
                tableData: [
                    {
                        id:1,
                        price:'8000~10000',
                        name:'明殿沙发',
                        content:`这是详情<br>aaaaa<br>bbbbb`,
                        type:'a',
                        num:10,
                        counts:'1000',
                        img:require('../assets/code.png'),
                        gList:[
                            {
                                img:require('../assets/code.png'),
                                gg:'明殿沙发三人位（有档）',
                                num:1000
                            },
                            {
                                img:require('../assets/code.png'),
                                gg:'明殿沙发三人位（无档）',
                                num:990
                            }
                        ]
                    },
                    {
                        id:2,
                        price:'8000~10000',
                        name:'明殿沙发2',
                        content:`这是详情<br>aaaaa<br>bbbbb`,
                        type:'b',
                        num:10,
                        counts:'1000',
                        img:require('../assets/code.png')
                    }
                ],
                form:{

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
        methods:{
            removeItem(n){
                this.gList.splice(n,1)
            },
            addItem(){
                this.gList.push({
                    img:'',
                    gg:'',
                    num:1000
                })
            },
            removeItem2(n){
                this.form.gList.splice(n,1)
            },
            addItem2(){
                this.form.gList.push({
                    img:'',
                    gg:'',
                    num:1000
                })
            },
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
