<template>
    <div id="menu" class="menu-list">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#20222A"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true" style="width: 100%">
            <el-submenu v-for="menu in menuData" :key="menu.permissionName" :index="menu.sort" >
                <template slot="title">
                    <i :class="menu.iconCode"></i>
                    <span >{{menu.permissionName}}</span>
                </template>
                <el-menu-item v-for="children in menu.children" :key="children.permissionName" :index="children.sort" :route="children.tempPath">
                    <i :class="children.iconCode" style="margin-right: 5px"></i>
                    <span slot="title">{{children.permissionName}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data(){
            return{
                search: {
                    pageNum:1,
                    pageSize:10,
                    permissionType:0,
                    status: 0
                },
                menuData:[
                    {permissionName:"用户管理",sort:"1",iconCode:"el-icon-user",tempPath:"",children:
                        [
                            {permissionName:"用户列表",sort:"1-3",iconCode:"",tempPath:"/main/user/userManage",children:[]}
                        ]
                    },
                    {permissionName:"单位管理",sort:"2",iconCode:"el-icon-s-grid",tempPath:"",children:
                            [
                                {permissionName:"单位列表",sort:"2-3",iconCode:"",tempPath:"/main/organization/organizationManage",children:[]}
                            ]
                    }
                ],
                title:""
            }
        },
        methods: {
        },
    }
</script>

<style scoped>
    .menu-list{
        width: 100%;
        margin-top: 20px;
        text-align: center;
    }
    #menu > ul > li > div > span{
        font-size: 16px;
    }
    .el-submenu .el-menu-item{
        min-width: 30px;
    }
    .is-active {
        background-color: #009688 !important;
        color: #fff !important;
    }
</style>