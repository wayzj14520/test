<template>
    <div class="dialog-modal" v-if="showDialog">
        <div class="dialog-box">
            <div class="ele-message-header">{{title}}</div>
            <div class="ele-message-content">{{content}}</div>
            <div class="ele-message-btn">
                <button @click="okCancel">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    props: {
        title: {
            type: String,
            default: '提示'
        },
        content: {
            type: String,
            required: true
        },
        showDialog: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    },
    methods: {
        okCancel () {
            this.$emit("closed");
        }
    },
}
</script>

<style scoped>
.dialog-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    overflow: hidden;
}
.dialog-box {
    position: absolute;
    width: 14rem;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.2rem;
    padding-bottom: 10px;
}
.ele-message-header {
    padding: 0.75rem 0.75rem 0.5rem;
}
.ele-message-content {
    padding: 0.5rem 0.75rem;
    word-break: break-all;
}
.ele-message-btn {
    padding: 0.25rem 0.75rem 0;
    text-align: right;
}
.ele-message-btn button {
    padding: 0.5rem 0.75rem;
    font-size: 0.6rem;
    border-radius: 0.2rem;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    cursor: pointer;
    border: none;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
}

</style>

