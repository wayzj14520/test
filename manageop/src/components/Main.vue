<template>
    <div id="main">
        <div class="header" >
            <Header></Header>
        </div>
        <div class="center">
            <div class="aside">
                <div class="fixedMenu">
                    <Menu></Menu>
                </div>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header"
    import Menu from "../components/Menu"
    export default {
        name: "Main",
        components: {
            Header,
            Menu
        }
    }
</script>

<style scoped>
    #main{
        width: 100%;
        height: 100%;
    }
    .header {
        width: 100%;
        background-color: rgba(68, 68, 68, 0.82);;
    }

    .center {
        width: 100%;
        display: flex;
        margin-top: 50px;
        min-height: calc(100% - 50px);
    }

    .aside {
        /* min-height: 790px; */
        background-color: #20222A;
        width: 220px;
    }

    .fixedMenu {
        position: fixed;
        width: 220px;
    }

    .main {
        /* min-height: 790px; */
        width: calc(100% - 220px);
        background-color: rgba(255, 255, 255, 0);
    }
</style>
<style>
    body {
        overflow-x: hidden;
    }
</style>