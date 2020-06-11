<template>
    <div id="user">
        <div id="search" style="margin-left: 60px;margin-bottom: 30px;">
            <div id="row1">
                <div class="sou">
                    <span style="margin-right: 5px">用户名</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="searchUser.userName"
                            clearable style="width: 70%">
                    </el-input>
                </div>
                <div class="sou" style="margin-left: 35px">
                    <span style="margin-right: 5px;">身份证</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="searchUser.identityNumber"
                            clearable style="width: 70%">
                    </el-input>
                </div>
                <div class="sou">
                    <span style="margin-right: 5px;margin-left: 10px">手机号</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="searchUser.mobile"
                            clearable style="width: 70%">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="btu" style="margin-bottom: 10px;display: flex;justify-content: space-between;flex-flow: row-reverse;width: 90% ">
            <div style="display: flex;flex-flow: row-reverse">
                <div style="margin-left: 5px">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="action"
                            :data="{token:'chinasoftkeyforimport20200223end'}"
                            :on-success="handleSuccess"
                            :headers="header"
                            :on-error="handleError"
                            :on-change="handleChange"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                        <el-button slot="trigger" type="primary">上传文件</el-button>
                        <!-- <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button> -->
                    </el-upload>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-download" @click="gettempfile()">下载模板</el-button>
                </div>
            </div>
            <div style="margin-right: 5px">
                <el-button type="primary" icon="el-icon-plus" @click="addUser()">新增</el-button>
                <el-button type="primary" icon="el-icon-refresh-left" @click="reset()">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
            </div>
            <!--<a :href="gettempfile()" style="margin-right: 220px">下载模板</a>-->
            <el-dialog
                title="上传文件须知"
                :visible.sync="dialogVisible"
                width="30%"
                :close-on-click-modal="false"
                :show-close="false"
                >
                <p>1、导入文件中，上级单位必须存在或名称填写正确，如果提示上级单位不存在，可以先创建上级单位，再导入。</p>
                <p>2、导入文件中，单位名称、联系方式不能与系统中的重复。</p>
                <p>3、导入文件中，渠道一页为系统管理员使用，可以不用填写。</p>
                <p>4、导入文件中，单位类型可以不填。</p>
                <p>5、导入文件中，单位页的渠道编码:软件谷填写为valley，未来城填写为future。可参照文件中的说明页。</p>
                <a class="el-upload-file-name">
                    <i class="el-icon-document"></i>
                    {{fileName}}
                </a>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelBtn">取 消</el-button>
                    <el-button style="margin-left: 10px;" type="primary" @click="submitUpload">上传到服务器</el-button>
                </span>
            </el-dialog>

        </div>
        <div id="tabs">
            <el-table
                    ref="table"
                    :data="tableData"
                    style="width: 100%"
                    :border="true"
                    :default-sort="{prop: 'date'}">
                <el-table-column
                        fixed
                        prop="mobile"
                        label="手机号"
                        sortable
                        width="120">
                </el-table-column>
                <el-table-column
                        sortable
                        prop="userName"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="identityNumber"
                        label="身份证"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="oftenProvince"
                        label="地址"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="departmentName"
                        label="部门"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="companyName"
                        label="单位名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="170">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteUser(scope.row)"
                                type="text"
                                size="small" icon="el-icon-delete">
                            删除
                        </el-button>
                        <el-button
                                @click="editUser(scope.row)"
                                type="text"
                                size="small" icon="el-icon-edit">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-top: 10px;width: 90%;text-align:center">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchUser.pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="this.searchUser.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data() {
            return {
                limitNum: 1,  // 上传excell时，同时允许上传的最大数
                fileList: [],   // excel文件列表
                // tableHeight: 350,
                value1: "",
                action:'',
                menuName: "用户管理",
                input: "",
                tableData: [],
                header:{
                    'accessToken':'',
                    'telPhone':''
                },
                searchUser: {
                    userName: '',
                    mobile: '',
                    identityNumber: '',
                    companyId:'',
                    pageNum:1,
                    pageSize:10
                },
                pageInfo:[],
                updateUser:{
                    userId:"",
                    userState:""
                },
                dialogVisible: false, // 是否显示对话框
            }
        },
        computed: {
            fileName() {
                return this.fileList.length > 0 ? this.fileList[0].name : '';
            }
        },
        watch:{
            '$store.state.curCompanyId'(newValue,oldValue){
                let postUrl = this.GLOBAL.baseURL+'/virusVisitors/queryList';
                //let companyId=this.$store.getters.getCurCompanyId;
                this.searchUser.companyId=newValue;
                console.log(newValue);
                this.$http({
                    method: "post",
                    url: postUrl,
                    headers: {'Content-Type': "application/json"},
                    data: JSON.stringify(this.searchUser),
                }).then((res) => {
                    // console.log(res.data.data);
                    this.tableData = res.data.data.list
                    this.pageInfo=res.data.data
                    // this.$router.push({path: '/main'});
                }).catch((error) => {
                    console.log(error)
                });
                console.log(newValue);
                console.log(oldValue);
            },
            deep:true
        },
        methods: {
            addUser: function () {
                this.$router.push({path: '/main/user/addUser'});
            },
            editUser: function (row) {
                this.$router.push({path: '/main/user/editUser', query: row});
            },
            reset: function () {
                this.searchUser.userName = '',
                this.searchUser.identityNumber = '',
                this.searchUser.mobile = ''
            },
            searchInfo:function () {
                let postUrl = this.GLOBAL.baseURL+'/virusVisitors/queryList';
                let companyId=localStorage.getItem('curCompanyId');
                this.searchUser.companyId=companyId;
                console.log(companyId);
                this.$http({
                    method: "post",
                    url: postUrl,
                    headers: {'Content-Type': "application/json"},
                    data: JSON.stringify(this.searchUser),
                }).then((res) => {
                    // console.log(res.data.data);
                    this.tableData = res.data.data.list
                    this.pageInfo=res.data.data
                    // this.$router.push({path: '/main'});
                }).catch((error) => {
                    console.log(error)
                })
            },
            deleteUser:function (row) {
                let postUrl = this.GLOBAL.baseURL+'/virusVisitors/del/'+row.id;
                this.$confirm('确定删除用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: "get",
                        url: postUrl,
                    }).then((res) => {
                        this.$message(res.data.data) ;
                        ///window.location.reload()
                        this.searchInfo();
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    // this.$router.push({path: '/main/organization/organizationManage'});
                });

            },
            handleSizeChange:function (val) {
                this.searchUser.pageSize=val;
                this.searchInfo();
            },
            handleCurrentChange:function (val) {
                this.searchUser.pageNum=val;
                this.searchInfo();
            },

            handleRemove:function (file, fileList) {
                console.log(file, fileList);
            },
            submitUpload() {
                this.dialogVisible = false;
                this.$refs.upload.submit();
            },
            handleSuccess:function (res) {
                console.log(res);
                this.dialogVisible = false;
                 const result=JSON.stringify(res.data);
                 let tipMsg='';
                 if(res.code==='000001') {
                    if (result=='[]'){
                        tipMsg=res.msg;
                    } else {
                        for(let key in result){
                            tipMsg+=result[key];
                        }
                    }
                 } else {
                     tipMsg=res.msg;
                 }
                const msgBoxText = tipMsg.replace('["', '').replace('"]', '').replace(/","/g, '<br />');
                this.$alert('<span>'+msgBoxText+'</span>', '消息', {
                    dangerouslyUseHTMLString: true
                });
             },
             handleError:function (res) {
                console.log(res);
                this.dialogVisible = false;
                if(res.response&&res.response.status===401){
                    this.$router.push({path: '/'});
                }
                this.$msgbox({
                    title: '消息',
                    message: res,
                    showCancelButton: false,
                    confirmButtonText: '确定',
                });
             },
            gettempfile:function () {
                window.open(this.GLOBAL.baseURL+"/用户导入模板.xlsx");
            },
            handleChange (file, fileList) {
                this.fileList = fileList;
                if(fileList.length > 0 && !file.response) {
                    this.dialogVisible = true;
                }
            },
            cancelBtn () {
                this.fileList.pop();
                this.dialogVisible = false;
            }
        },
        // created(){
        //     this.searchUser.companyId=this.GLOBAL.companyId;
        // },
        mounted() {
            this.action=this.GLOBAL.yjgcrest+"/feiyan/importVisitorsExcel";
            let postUrl = this.GLOBAL.baseURL+'/virusVisitors/queryList';
            let id=localStorage.getItem('curCompanyId');
            console.log(id);
            if(!id){
                id=localStorage.getItem('companyId');
            }
            this.searchUser.companyId=id;
            this.header.accessToken=localStorage.getItem('accessToken');
            this.header.telPhone=localStorage.getItem('telPhone');
            this.$http({
                method: "post",
                url: postUrl,
                headers: {'Content-Type': "application/json"},
                data: JSON.stringify(this.searchUser),
            }).then((res) => {
                this.tableData = res.data.data.list;
                this.pageInfo=res.data.data
            }).catch((error) => {
                console.log(error)
            })
        },
    }
</script>

<style scoped>
    #user {
        min-height: calc(100% - 80px);
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }

    #pageHeader {
        width: 100%;
        text-align: center;
        /*padding-top: 1%;*/
    }

    #search {
        /*height: 20%;*/
        width: 100%;
        /*border: #404040 1px solid;*/
    }

    .btu {

        margin-left: 95px;
        margin-bottom: 25px;
        display: flex;
        justify-content: left;
    }

    #row1 {
        display: flex;
        margin-top: 10px;
        justify-content: left;
    }

    #row3 {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    #tabs {
        width: 90%;
        display: flex;
        margin-left: 100px;
        margin-top: 20px;
    }

    #pageHelper {
        margin-top: 10px;
    }
    .el-upload-file-name {
        color: #409eff;
        display: block;
        margin-top: 20px;
        font-size: 14px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        transition: color .3s;
        white-space: nowrap;
        text-decoration: none;
        cursor: default;
    }
</style>
<style>
    .el-upload-list {
        display: none;
    }
    .el-message-box__message {
        max-height: 50vh;
        overflow-y: auto;
    }
</style>