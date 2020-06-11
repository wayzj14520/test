<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    // import Header from "./components/Header"
    // import Menu from "./components/Menu"
    export default {
        // components: {
        //     Header,
        //     Menu
        // }
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* text-align: center; */
        color: #2c3e50;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 10px;
    }

    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
    }
</style>
