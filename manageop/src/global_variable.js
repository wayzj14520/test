import store from './store'

const baseURL = process.env.VUE_APP_BASE_URL;
const token = store.getters.getToken;
const telPhone = store.getters.getMobile;
const yjgcrest=process.env.VUE_APP_YJGCREST;
const companyId =store.getters.getCompanyId;
export default {
    companyId,
    baseURL,
    token,
    telPhone,
    yjgcrest
}
