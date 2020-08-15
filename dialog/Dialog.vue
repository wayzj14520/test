<template>
  <transition name="fade">
    <div class="mask" v-show="show">
      <div class="window">
        <div class="content">{{content}}</div>
        <div>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="btn-groups">
          <div
            class="btn cancel"
            @click="cancel"
            :class="{active: active === 'cancel'}"
            data-name="cancel"
          >{{cancelButtonText}}</div>
          <div
            class="btn confirm"
            @click="confirm"
            :class="{active: active === 'confirm'}"
            data-name="confirm"
          >{{confirmButtonText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    content: String,
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    confirmButtonText: {
      type: String,
      default: "确认"
    }
  },
  mounted() {},
  data() {
    return {
      active: "",
      show: false,
      resolve: "",
      reject: "",
      promise: "",
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    };
  },
  methods: {
  // DOM更新时调用方法
    showPopup() {
      this.active = "";
      this.show = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise;
    },
    // 取消按钮处理函数
    cancel(event) {
      this.active = event.target.dataset.name;
      this.show = false;
      this.reject();
    },
    // 确认按钮处理函数
    confirm(event) {
      this.active = event.target.dataset.name;
      this.show = false;
      this.resolve();
    }
  }
};
</script>

<style scoped>
.mask {
  position: fixed;
  top: 100px;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.mask {
  z-index: 999;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  font-size: 18px;
}
  .window {
    color: #555;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 70%;
    border-radius: 12px;
  }
    .btn-groups {
      display: flex;
      flex-direction: row;
    }
      .btn {
        width: 50%;
        text-align: center;
        padding: 16px 0;
        border-top: 1px solid #f1f1f1;
        box-sizing: border-box;
      }
      .active {
        background-color: rgba(0,0,0,0.1);
      }
      .confirm {
        border-left: 1px solid #f1f1f1;
        color: #67c23a;
      }
  .content {
      text-align: center;
      padding: 28px 6px;
    }
</style>