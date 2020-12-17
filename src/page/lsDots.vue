<template>
    <div class="main">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>展品</el-breadcrumb-item>
                </el-breadcrumb>
                <span class="them">展品</span>
            </div>
        </div>
        <div class="form">
            <div class="add">
                <el-button type="primary" @click="addOne">添加展品</el-button>
                <div class="chose">
                    <el-select v-model="type" clearable  placeholder="请选择产品分类" @change="changeList" @clear="getList">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
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
                        label="展品名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="flag"
                        label="属性"
                        align="center"
                        width="200">

                </el-table-column>
                <el-table-column
                        prop="years"
                        label="时期"
                        align="center"
                        width="200">
                </el-table-column>
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
                                @click="handleShow(scope.row)">查看
                        </el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
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
        <el-dialog title="添加展品" :visible.sync="AddialogTableVisible">
            <el-form :model="form" label-width="100px">
                <el-form-item label="展品名称">
                    <el-input v-model="form.title" autocomplete="off" placeholder="请输入展品名称"></el-input>
                </el-form-item>
                <el-form-item label="编号">
                    <el-input v-model="form.number" autocomplete="off" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item label="年代">
                    <el-input v-model="form.years" autocomplete="off" placeholder="请输入年代"></el-input>
                </el-form-item>
                <el-form-item label="展品banner">
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="1"
                            list-type="picture-card"
                            :file-list="fileList6"
                            :on-change="handleUploadChange6"
                            :auto-upload="false"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="展品缩略图">
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

                <el-form-item label="分类">
                    <el-select v-model="form.type" placeholder="请选择类别">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="展品简介">
                    <el-input v-model="form.content" type="textarea"
                              :rows="5" autocomplete="off" placeholder="请输入展品简介"></el-input>
                </el-form-item>


                <el-form-item label="属性">
                    <el-checkbox-group v-model="cities" @change="handleCheckedCitiesChange">
                        <el-checkbox label="推荐"></el-checkbox>
                    </el-checkbox-group>
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

        <!--       查看图片-->
        <el-dialog title="展品详情" :visible.sync="dialogTableVisible">
            <el-form :model="form" label-width="100px">
                <el-form-item label="展品名称">
                    <el-input v-model="form.title" autocomplete="off" placeholder="展品名称"
                              :readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="编号">
                    <el-input v-model="form.number" autocomplete="off" placeholder="请输入编号" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="年代">
                    <el-input v-model="form.years" autocomplete="off" placeholder="请输入年代" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="展品banner">
                    <div class="pic">
                        <img :src="`http://tyxxc.sansg.com/${form.banner}`" alt="" :key="index">
                    </div>
                </el-form-item>

                <el-form-item label="展品缩略图">
                    <div class="pic">
                        <img :src="`http://tyxxc.sansg.com/${form.picurl}`" alt="" :key="index">
                    </div>
                </el-form-item>


                <el-form-item label="分类">
                    <el-select v-model="form.type" placeholder="请选择类别" disabled>
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="展品简介">
                    <el-input v-model="form.content" type="textarea"
                              :rows="5" autocomplete="off" placeholder="展品简介" :readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="属性">
                    <el-checkbox-group v-model="form.flag" >
                        <el-checkbox label="推荐" disabled></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="排序">
                    <el-input-number type="number" v-model="form.orderid" controls-position="right"
                                      :min="1" :max="10000" :disabled="true"></el-input-number>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible=false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <!--      编辑图片详情-->
        <el-dialog title="编辑展品" :visible.sync="EditdialogTableVisible">
            <el-form :model="form" label-width="100px">
                <el-form-item label="展品名称">
                    <el-input v-model="form.title" autocomplete="off" placeholder="请输入展品名称"></el-input>
                </el-form-item>

                <el-form-item label="编号">
                    <el-input v-model="form.number" autocomplete="off" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item label="年代">
                    <el-input v-model="form.years" autocomplete="off" placeholder="请输入年代"></el-input>
                </el-form-item>

                <el-form-item label="展品banner">
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :limit="1"
                            list-type="picture-card"
                            :file-list="fileList6"
                            :on-change="handleUploadChange6"
                            :auto-upload="false"
                            :on-remove="handleRemove2"
                    >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="展品缩略图">
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



                <el-form-item label="分类">
                    <el-select v-model="form.type" placeholder="请选择类别">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="展品简介">
                    <el-input v-model="form.content" type="textarea"
                              :rows="5" autocomplete="off" placeholder="请输入展品简介"></el-input>
                </el-form-item>


                <el-form-item label="属性">
                    <el-checkbox-group v-model="cities" @change="handleCheckedCitiesChange">
                        <el-checkbox label="推荐"></el-checkbox>
                    </el-checkbox-group>
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
    import {getGoods, addGoods, updateGoods, deleteGoods, editGoods, getType} from "../util/lang";
    import qs from 'qs'

    export default {
        name: "user",
        data() {
            return {
                cities: [],
                type:'',
                page: '',
                val: '',
                options: [],
                index: 0,
                Currentpage: 1,
                value: '',
                value1: '',
                fileList4: [],
                fileList6: [],
                readonly: true,
                Editreadonly: false,
                dialogTableVisible: false,
                EditdialogTableVisible: false,
                AddialogTableVisible: false,
                totalPage: 0,
                tableData: [],
                form: {
                    title: '',
                    picurl: '',
                    number: '',
                    years: '',
                    type: '',
                    banner: '',
                    content: '',
                    flag: '',
                    orderid: ''
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.getAllType();
                this.getList()
            }, 100)
        },
        methods: {
            // 获取分类
            getAllType() {
                const url = `${getType()}`;
                this.$axios.post(url).then(res => {
                    this.options = res.data.data.data
                })
            },
            changeList(val) {
                const url = `${getGoods()}`;
                this.$axios.post(url, qs.stringify(
                    {
                        page: 1,
                        type: val
                    }
                )).then(res => {
                    this.tableData = res.data.data.data;
                    this.totalPage = res.data.data.last_page;
                    this.Currentpage = 1
                })
            },
            // 获取属性
            handleCheckedCitiesChange(val) {
                if (val.length > 0) {
                    this.form.flag = val[0]
                } else {
                    this.form.flag = ''
                }
            },
            // 修改排序
            handleChange(value,row) {
                this.form=row;
               this.form.orderid=value;
                this.confirmEdit()
            },
            handleChangeEdit(value) {
                this.form.orderid = value
            },
            handleRemove2(fileList) {
                this.form.picurl = '';
                console.log(fileList)
            },
            handleUploadChange5(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传的图片大小不能超过2M！");
                } else {
                    const formData = new FormData(); // 声明一个FormData对象
                    formData.append("file", file.raw);
                    const url = "http://tyxxc.sansg.com/api/Upload";
                    this.$axios
                        .post(url, formData, {
                            headers: {
                                "content-type": "multer/form-data"
                            }
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.form.picurl = res.data.path
                            }
                        });
                }
            },
            handleUploadChange6(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传的图片大小不能超过2M！");
                } else {
                    const formData = new FormData(); // 声明一个FormData对象
                    formData.append("file", file.raw);
                    const url = "http://tyxxc.sansg.com/api/Upload";
                    this.$axios
                        .post(url, formData, {
                            headers: {
                                "content-type": "multer/form-data"
                            }
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.form.banner = res.data.path
                            }
                        });
                }
            },
            shuaxin() {
                location.reload()
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                if (val <= this.totalPage) {
                    this.$nextTick(() => {
                        const url = `${getGoods()}`;
                        this.$axios.post(url, qs.stringify(
                            {
                                page: val++
                            }
                        )).then(res => {
                            this.tableData = res.data.data.data
                        })
                    })
                } else {
                    this.$notify({
                        title: 'Prompt',
                        message: 'Already Loaded',
                        offset: 100
                    });
                }
            },
            // 获取全部分类数据
            getList() {
                const url = `${getGoods()}`;
                this.$axios.post(url).then(res => {
                    this.tableData = res.data.data.data;
                    this.totalPage = res.data.data.last_page;
                    this.Currentpage = 1
                })
            },
            addOne() {
                this.fileList4 = [];
                this.fileList6=[];
                this.cities=[];
                this.form = {
                    title: '',
                    picurl: '',
                    number: '',
                    years: '',
                    type: '',
                    banner: '',
                    content: '',
                    flag: '',
                    orderid: ''
                };
                this.AddialogTableVisible = true
            },
            handleAdd() {
                let newForm = JSON.parse(JSON.stringify(this.form));
                const url = `${addGoods()}`;
                this.$axios.post(url, qs.stringify(newForm)).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getList()
                    }
                });
                this.AddialogTableVisible = false
            },
            confirmEdit() {
                if(this.form.flag!=''){
                    this.form.flag='推荐'
                }else{
                    this.form.flag=''
                }
                this.EditdialogTableVisible = false;

                let newForm = JSON.parse(JSON.stringify(this.form));
                const url = `${updateGoods()}`;
                this.$axios.post(url, qs.stringify(newForm)).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        const url = `${getGoods()}`;
                        this.$axios.post(url, qs.stringify(
                            {
                                page: this.page
                            }
                        )).then(res => {
                            this.tableData = res.data.data.data
                        })
                    }
                })
            },
            // 删除
            delete(id) {
                const url = `${deleteGoods(id)}`;
                this.$axios.post(url)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: '已删除',
                                type: 'success'
                            });
                            const url = `${getGoods()}`;
                            this.$axios.post(url, qs.stringify(
                                {
                                    page: this.page
                                }
                            )).then(res => {
                                this.tableData = res.data.data.data
                            })
                        }
                    });
            },
            // 查看详情
            handleShow(row) {
                this.dialogTableVisible = true;
                const url = `${editGoods(row.id)}`;
                this.$axios.post(url)
                    .then(res => {
                        let flag=[];
                        if (res.data.code === 200) {
                            if(res.data.data.flag!=''){
                                flag[0]=res.data.data.flag
                            }
                            this.form = res.data.data;
                            this.form.flag=flag
                        }
                    });
            },
            // 编辑详情
            handleEdit(row) {
                this.fileList4 = [];
                this.fileList6 = [];
                this.cities=[];
                setTimeout(() => {
                    this.EditdialogTableVisible = true;
                    const url = `${editGoods(row.id)}`;
                    this.$axios.post(url)
                        .then(res => {
                            if (res.data.code === 200) {

                                if (res.data.code === 200) {
                                    if(res.data.data.flag!='' && res.data.data.flag){
                                        this.cities.push('推荐')
                                    }
                                    this.form = res.data.data
                                }
                                if (this.form.picurl !== null && this.form.picurl !== "") {
                                    this.fileList4.push({url: 'http://tyxxc.sansg.com/' + this.form.picurl})
                                } else {
                                    this.fileList4 = []
                                }
                                if (this.form.banner !== null && this.form.banner !== "") {
                                    this.fileList6.push({url: 'http://tyxxc.sansg.com/' + this.form.banner})
                                } else {
                                    this.fileList6 = []
                                }
                            }
                        });
                }, 600)
            },
            // 删除该产品
            handleDelete(row) {
                this.delete(row.id)
            }
        }
    }
</script>

<style lang="less" scoped>
    .main {
        width: 100%;

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

        .form {
            width: 80%;
            margin: 60px auto;

            .add {
                margin: 30px 0;
                width: 100%;
                display: flex;
                flex-direction: row;
                position: relative;

                .chose {
                    margin: 0 30px;
                }

                .refresh {
                    position: absolute;
                    right: 0;
                    top: 0;

                    i {
                        font-size: 30px;
                        cursor: pointer;
                        color: #409EFF;
                    }
                }
            }

            .spic {
                img {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                }
            }
        }

    }
</style>
<style scoped>
    .ggs .item {
        width: 95%;
        padding: 20px 2.5%;
        border: 1px solid #e6e6e6;
        margin-bottom: 30px;
    }

    .pic img {
        width: 148px;
        height: 148px;
        object-fit: cover;
        margin-right: 10px;
    }

    .s2 img {
        width: 148px;
        height: 148px;
        object-fit: cover;
    }

    .s22 {
        position: relative;
    }

    .s22 img {
        width: 148px;
        height: 148px;
    }

    .s22 i {
        position: absolute;
        right: -40px;
        top: 0;
        cursor: pointer;
        font-size: 25px;
    }

    .ggs .item .r .oItem span {
        display: block;
        width: 70px;
    }
</style>
