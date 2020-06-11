<template>
    <div id="user" style="margin-top: 30px;width: 100%">
        <div id="search" style="margin-left: 60px">
            <div id="row1">
                <div class="sou">
                    <span style="margin-right: 5px">单位名称</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="searchCompany.companyName"
                            clearable style="width: 70%">
                    </el-input>
                </div>
                <div class="sou" style="margin-left: 35px">
                    <span style="margin-right: 5px;">单位标识</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="searchCompany.companyNo"
                            clearable style="width: 70%">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="btu" style="margin-top: 30px;margin-bottom: 10px;display: flex;justify-content: space-between;flex-flow: row-reverse;width: 90% ">
            <div style="display: flex;flex-flow: row-reverse">
                <div style="margin-left: 5px">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="action"
                            :on-success="handleSuccess"
                            :headers="header"
                            :on-error="handleError"
                            :on-remove="handleRemove"
                            :on-change="handleChange"
                            :data="{token:'chinasoftkeyforimport20200223end'}"
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
                <el-button type="primary" icon="el-icon-plus" @click="addCompany()">新增</el-button>
                <el-button type="primary" icon="el-icon-refresh-left" @click="reset()">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="searchInfo()">搜索</el-button>
            </div>
            <!--<div id="row3">-->
                <!---->
            <!--</div>-->
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
                    :border=true
                    :default-sort="{prop: 'date'}">
                <el-table-column
                        prop="parentCompanyName"
                        label="上级单位名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="companyName"
                        label="单位名称"
                        sortable
                        width="200">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="companyId"
                        label="单位ID"
                        sortable width="200">
                </el-table-column>
                <el-table-column
                        sortable
                        prop="companyNo"
                        label="单位标识"
                        width="120">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="负责人手机"
                width="100">
                </el-table-column>
                <el-table-column
                        prop="platformName"
                        label="所属平台"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="companyLink"
                        label="companyLink"
                        width="250">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width=150>
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteCompany(scope.row)"
                                type="text"
                                size="small" icon="el-icon-delete">
                            删除
                        </el-button>
                        <el-button
                                @click.native.prevent="editCompany(scope.row)"
                                type="text"
                                size="small" icon="el-icon-edit">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-top: 5px;text-align:center">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchCompany.pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="this.searchCompany.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>


    export default {
        name: "organizationManage",
        data() {
            return {
                menuName: "组织管理",
                // tableHeight: 350,
                value1: "",
                input: "",
                action:'',
                header:{
                    'accessToken':'',
                    'telPhone':''
                },
                tableData: [],
                fileList:[],
                searchCompany: {
                    companyName: '',
                    companyNo: '',
                    companyId: '',
                    platform:'',
                    pageNum: 1,
                    pageSize: 10
                },
                pageInfo: [],
                dialogVisible: false, // 是否显示对话框
            }
        },
        watch:{
            '$store.state.curCompanyId'(newValue,oldValue){
                let postUrl = this.GLOBAL.baseURL + '/virusCompany/queryList';
                this.searchCompany.companyId=newValue;
                this.$http({
                    method: "post",
                    url: postUrl,
                    headers: {'Content-Type': "application/json"},
                    data: JSON.stringify(this.searchCompany),
                }).then((res) => {
                    this.tableData = res.data.data.list;
                    this.pageInfo=res.data.data
                }).catch((error) => {
                    this.$message(error.data.msg)
                })
                console.log(newValue);
                console.log(oldValue);
            },
            //deep:true
        },
        computed: {
            fileName() {
                return this.fileList.length > 0 ? this.fileList[0].name : '';
            }
        },
        methods: {
            addCompany: function () {
                this.$router.push({path: '/main/organization/addOrganization'});
            },
            reset: function () {
                    this.searchCompany.companyName = '',
                    this.searchCompany.companyNo = ''
                    //this.searchCompany.companyId = '',
                    //this.searchCompany.platform = ''
            },
            searchInfo: function () {
                let postUrl = this.GLOBAL.baseURL + '/virusCompany/queryList';
                this.searchCompany.companyId=localStorage.getItem('curCompanyId');
                this.$http({
                    method: "post",
                    url: postUrl,
                    headers: {'Content-Type': "application/json"},
                    data: JSON.stringify(this.searchCompany),
                }).then((res) => {
                    this.tableData = res.data.data.list;
                    this.pageInfo=res.data.data
                }).catch((error) => {
                    this.$message(error.data.msg)
                })
            },
            deleteCompany: function (row) {
                const companyId=row.companyId;
                let postUrl = this.GLOBAL.baseURL+'/virusCompany/del/'+companyId;
                this.$confirm('确定删除单位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: "get",
                        url: postUrl,
                    }).then((res) => {
                        this.$message(res.data.data);
                        this.searchInfo();
                    }).catch(function (error) {
                        this.$message(error.data.msg)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSizeChange(val) {
                this.searchCompany.pageSize = val;
                this.searchInfo();
            },
            handleCurrentChange(val) {
                this.searchCompany.pageNum = val;
                this.searchInfo();
            },
            editCompany(row){
                this.$router.push({path: '/main/organization/editOrganization', query: row});
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            submitUpload() {
                this.dialogVisible = false;
                this.$refs.upload.submit();
            },
             handleSuccess:function (res) {
                this.dialogVisible = false;
                const result=JSON.stringify(res.data);
                let tipMsg = '';
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
                 this.dialogVisible = false;
                 if(res.code===401){
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
                window.open(this.GLOBAL.baseURL+"/公司导入模板.xlsx");
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
        mounted() {
            this.action=this.GLOBAL.yjgcrest+ "/feiyan/uploadChannelAndUnit";
            let postUrl = this.GLOBAL.baseURL + '/virusCompany/queryList';
            let id=localStorage.getItem('curCompanyId');
            if(!id){
                id=localStorage.getItem('companyId');
            }
            this.searchCompany.companyId=id;
            this.header.accessToken=localStorage.getItem('accessToken');
            this.header.telPhone=localStorage.getItem('telPhone');
            this.$http({
                method: "post",
                url: postUrl,
                headers: {'Content-Type': "application/json"},
                data: JSON.stringify(this.searchCompany),
            }).then((res) => {
                this.tableData = res.data.data.list;
                this.pageInfo = res.data.data;
            }).catch((error) => {
                console.log(error)
            })
        },
    }
</script>

<style scoped>
    #user {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    #search {
        width: 100%;
    }

    .btu {
        /*width: 350px;*/
        margin-left: 75px;
        margin-bottom: 25px;
        display: flex;
        justify-content: left;
    }

    #row1 {
        display: flex;
        margin-top: 10px;
        justify-content: left;
    }

    #tabs {
        width: 90%;
        display: flex;
        margin-left: 90px;
        margin-top: 20px;
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