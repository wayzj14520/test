import Dialog from "./Dialog.vue"
const DialogBox = {}

DialogBox.install = (Vue) => {
    const dialogInstance = Vue.extend(Dialog)
    let currentDialog;
    const initInstance = () => {
        currentDialog = new dialogInstance()
        let popupBoxEl = currentDialog.$mount().$el
        document.body.appendChild(popupBoxEl)
    }
    Vue.prototype.$dialog = options => {
        if (!currentDialog) {
            initInstance()
        }
        // 参数兼容处理
        if (typeof options === 'string') {
            currentDialog.title = options
        } else if (typeof options === 'object') {
            Object.assign(currentDialog, options)
        }
        // 返回 Promise
        return currentDialog.showPopup().then(() => {
            return Promise.resolve()
        }).catch(() => {
            return Promise.reject()
        })
    }
}

export default DialogBox;