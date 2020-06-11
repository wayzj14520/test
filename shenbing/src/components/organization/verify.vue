<!--verify 验证-->
<template>
  <div class="verify">
    <div class="header">
      <img :src="banner" />
    </div>
    <div class="verify-content" v-if="verifyWay">
      <div class="verify-warpper">
        <p class="verify-warpper-title">手机验证</p>
        <div class="form-warpper">
          <input
            class="inputall phoneInput phoneInputWay"
            type="tel"
            maxlength="11"
            @input="handleChangeHave"
            @blur="handleChangeBlur"
            v-model="havePhone"
            placeholder="输入您的手机号码"
          />
        </div>
        <div class="verify-list-next verify-list-nextway" @click="handleNext">下一步</div>
      </div>
      <div class="footer-title">
        <img src="../../assets/image/jointforce.png" alt />
        <div class="footer-title-text">
          <p>页面由中软国际解放号免费提供</p>
          <p></p>
          <p>www.jfh.com</p>
        </div>
      </div>
    </div>
    <div class="verify-content" v-else>
      <div v-if="showChildPage">
        <div class="verify-warpper">
          <p class="verify-warpper-title">手机验证</p>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label label-width="0">
              <div class="form-warpper">
                <input
                  class="inputall phoneInput"
                  type="tel"
                  maxlength="11"
                  @input="handleChangeInput"
                  @blur="handleChange"
                  v-model="form.phone"
                  placeholder="输入您的手机号"
                />
              </div>
            </el-form-item>
            <el-form-item label label-width="0">
              <div class="verify-warpper-graphCode form-warpper">
                <input
                  class="inputall graphCodeInput"
                  type="text"
                  maxlength="4"
                  v-model="form.graphCode"
                  placeholder="输入图形验证码"
                />
                <img :src="imgCodeUrl" alt @click="handleImgCode" />
              </div>
            </el-form-item>
            <el-form-item label label-width="0">
              <div class="verify-warpper-Code form-warpper">
                <input
                  class="inputall codeInput"
                  type="text"
                  maxlength="4"
                  @input="handleCodeChange"
                  v-model="form.code"
                  placeholder="输入验证码"
                />
                <p class="haveCode" @click="handleCode">{{ codeNum.name }}</p>
                <p class="form-warpper-p" v-show="showCode">请输入正确的短信验证码</p>
              </div>
            </el-form-item>
          </el-form>
          <div class="verify-list-next" @click="handleNext">下一步</div>
        </div>
        <div class="footer-title">
          <img src="../../assets/image/jointforce.png" alt />
          <div class="footer-title-text">
            <p>页面由中软国际解放号免费提供</p>
            <p></p>
            <p>www.jfh.com</p>
          </div>
        </div>
      </div>
      <div v-else>
        <verify-one
          :channel-code="channelCodeSec"
          :qrcode-id="qrcodeId"
          :url-type="urlType"
          :child-data="childData"
          :phone="form.phone"
          v-if="childShow == 'A'"
        ></verify-one>
        <verify-two
          :channel-code="channelCodeSec"
          :qrcode-id="qrcodeId"
          :url-type="urlType"
          :child-data="childData"
          :phone="form.phone"
          v-else-if="childShow == 'B'"
        ></verify-two>
        <verify-th
          :channel-code="channelCodeSec"
          :qrcode-id="qrcodeId"
          :url-type="urlType"
          :child-data="childData"
          :phone="form.phone"
          v-else
        ></verify-th>
      </div>
    </div>
    <div class="messTip" v-if="messTip">{{ messTip }}</div>
    <div class="app-toast" v-if="isShowToastMessage">未登录或登录失效，请重新登录</div>
  </div>
</template>
<script>
import { util } from "@/libs/util.js";
import API from "@/serve/index.js";
import verifyOne from "./verify/verifyOne";
import verifyTwo from "./verify/verifyTwo";
import verifyTh from "./verify/verifyTh";
export default {
  data() {
    return {
      imgCodeUrl: "", // 获取图像验证码的路径
      codeNum: { name: "获取验证码" },
      showCode: "",
      verifyWay: false,
      showChildPage: true,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true,
      pageShow: false,
      messTip: "",
      showClick: false,
      havePhone: "",
      childShow: "A",
      childData: {
        title: "抗冠战役",
        banner: ""
      },
      form: {
        // phone:'18726046617',
        // phone:'19951977014',
        phone: "",
        graphCode: "",
        code: ""
      },
      timeout: true,
      banner: require("../../assets/image/headerTitle.png"),
      titlePage: "抗冠战役",
      channelCodeSec: "",
      urlType: "",
      qrcodeId: "",
      firstExists: "", //初次登录
      isRegister: false, // 是否注册
      isShowToastMessage: false, // 是否显示未登录提示
    };
  },
  components: {
    verifyOne,
    verifyTwo,
    verifyTh
  },
  created() {
    this.isShowToastMessage = !!this.$route.query.isShowToast;

    let channelCodeSec = this.$route.query.channelCodeSe;

    util.setTitle("手机验证");
    if (util.getCookie("userTel")) {
      this.$_cookiephone();
    } else {
      this.showClick = true;
      this.verifyWay = false;
      this.isRegister = true;
    }
    if (this.$route.query.homePage) {
      this.channelCodeSec = localStorage.getItem("channelCodeSec");
      util.setCookie("channelCodeSec", this.channelCodeSec);
    }
    if (channelCodeSec) {
      this.$_init(channelCodeSec);
      util.setCookie("channelCodeSec", channelCodeSec);
    } else if (util.getCookie("channelCodeSec")) {
      this.$_init(util.getCookie("channelCodeSec"));
    }
    if (util.getCookie("channelCodeSec")) {
      this.channelCodeSec = util.getCookie("channelCodeSec");
    } else {
      this.channelCodeSec = "";
    }
    // 获取图形验证码
    this.handleImgCode();
  },
  mounted() {
    // window.onresize监听页面高度的变化
    this.urlType = this.isRegister && localStorage.getItem("qrcodeId") ? 'question' : '';
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
    var _this = this;
    window.setTimeout(function () {
        _this.isShowToastMessage = false;
    }, 3000)
    
    if (this.$route.query.isShowChildPage) {
      this.verifyWay = false;
      this.showChildPage = false;
      console.log(!!this.$route.query.isShowChildPage)
    }
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  },
  methods: {
    //判断样式
    $_init(value) {
      API("get", "/yjgcrest/feiyan/channel?channelCodeSec=" + value)
        .then(res => {
          if (res.data.code == "000001") {
            let msg = res.data.data;
            let data = JSON.parse(msg.theme);
            this.banner = data.banner;
            if (msg.channelName == "软件谷") {
              this.childShow = "B";
              this.childData = {
                title: data.title,
                banner: data.banner
              };
            } else if (msg.channelName == "南京未来城") {
              this.childShow = "C";
              this.childData = {
                title: data.title,
                banner: data.banner
              };
            } else {
              this.childShow = "A";
              this.childData = {
                title: data.title,
                banner: data.banner
              };
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //图形验证码
    handleImgCode(type) {
      var random = Math.floor(Math.random() * 100);
      var url = "/yjgcrest/feiyan/getCaptcha?sm=" + random;
      this.imgCodeUrl =
        "https://" + this.$util.getHeaderRouter().imgCodeUrl + url;
    },
    //手机号输入框改变
    handleChangeInput(e) {
      if (e.target.value == util.getCookie("userTel") && this.pageShow) {
        this.verifyWay = true;
        this.showClick = true;
        this.havePhone = util.getCookie("userTel");
        this.$nextTick(() => {
          let btn = document.querySelector(".verify-list-nextway");
          btn.style.background = "#E4393C";
        });
      }
    },
    handleChange(e) {
      if (!/^1[3456789]\d{9}$/.test(e.target.value)) {
        this.messTip = "请输入正确的手机号码";
        var that = this;
        setTimeout(function() {
          that.messTip = "";
        }, 1000);
        return false;
      }
    },
    handleChangeHave(e) {
      let btn = document.querySelector(".verify-list-nextway");
      if (e.target.value.length == 11) {
        btn.style.background = "#E4393C";
        this.showClick = true;
      } else {
        btn.style.background = "#eee";
        this.showClick = false;
      }
      if (e.target.value !== util.getCookie("userTel")) {
        this.verifyWay = false;
        this.showChildPage = true;
        this.form.phone = e.target.value;
      } else {
        this.verifyWay = true;
      }
    },
    handleChangeBlur(e) {},
    //获取手机验证码
    handleCode() {
      let that = this;
      if (!this.form.phone) {
        this.messTip = "请输入正确的手机号码";
        setTimeout(function() {
          that.messTip = "";
        }, 1000);
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        this.messTip = "请输入正确的手机号码";
        setTimeout(function() {
          that.messTip = "";
        }, 1000);
        return;
      }
      if (!this.form.graphCode) {
        this.messTip = "请输入正确的图形验证码";
        setTimeout(function() {
          that.messTip = "";
        }, 1000);
        return;
      }
      let params = {
        captcha: this.form.graphCode,
        mobile: this.form.phone
      };
      if (!this.timeout) {
        this.timeout = false;
        return;
      }
      API("JSONPOST", "/yjgcrest/feiyan/sendSms", params)
        .then(res => {
          if (res.data.status == 200 && res.data.code == "000001") {
            let count = 60;
            let timer = setInterval(() => {
              this.timeout = false;
              count--;
              this.codeNum.name = "重新发送（" + count + "s）";
              if (count <= 0) {
                clearInterval(timer);
                this.$set(this.codeNum, "name", "获取验证码");
                this.timeout = true;
                count = 60;
              }
            }, 1000);
          } else {
            this.messTip = res.data.msg;
            this.handleImgCode();
            setTimeout(() => {
              this.messTip = "";
            }, 1000);
            this.timeout = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //确认按钮改变状态
    handleCodeChange(e) {
      let btn = document.querySelector(".verify-list-next");
      if (
        e.target.value.length == 4 &&
        this.form.phone != "" &&
        this.form.graphCode != ""
      ) {
        this.showClick = true;
        btn.style.background = "#E4393C";
      } else {
        btn.style.background = "#eee";
        this.showClick = false;
      }
    },
    //判断手机号是否存在
    $_cookiephone() {
      API(
        "get",
        "/yjgcrest/feiyan/mobileexists?mobile=" + util.getCookie("userTel")
      )
        .then(res => {
          if (res.data.code == "000001") {
            if (res.data.data.exists == 1) {
              this.firstExists = true;
            }

            if (res.data.data.exists == 1) {
              this.pageShow = true;
              this.verifyWay = true;
              this.showClick = true;

              this.havePhone = util.getCookie("userTel");
              this.$nextTick(() => {
                let btn = document.querySelector(".verify-list-nextway");
                btn.style.background = "#E4393C";
              });
              this.phone = "";
            } else {
              this.showClick = false;
              this.pageShow = false;
              this.verifyWay = false;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleNext() {
      if (!this.showClick) {
        return;
      }

      var channelCode = localStorage.getItem('channelCodeSec');
      var phoneNumber = "";
      if (this.verifyWay) {
        phoneNumber = this.havePhone;

        API('get', '/yjgcrest/feiyan/getInfoMobile', {mobile: phoneNumber}).then(res2 => {
            if (res2.data.code == '000001') {
                var curCodeList = [];
                if(res2.data.data && res2.data.data.length !== 0) {
                  var listData = res2.data.data;
                  curCodeList = listData.filter(function(item) {
                    return item.pf == channelCode
                  });
                }

                if(curCodeList.length > 0) {
                  this.firstExists = true;
                }

                if (curCodeList.length > 0 && localStorage.getItem("accessToken")) { // 表示是注册的用户
                  util.setCookie("userTel", phoneNumber);
                  for(let i = 0; i < curCodeList.length;i++) {
                    if (curCodeList[i].type == 1 || curCodeList[i].type == 2) { // 管理员或负责人
                      this.$router.push({
                        path: "/organization",
                        query: {
                          phone: phoneNumber,
                          channelCodeSe: channelCode
                        }
                      });
                      break;
                    }
                    if (curCodeList[i].type == 3) {
                      this.$router.push({ // 普通用户
                        path: "/entryNumber/index",
                        query: {
                          qrcodeId: localStorage.getItem('qrcodeId'),
                          channelCodeSe: channelCode
                        }
                      });
                      break;
                    }
                  }
                }
            }
          }).catch(error => {
            console.log(error);
          });
      } else {
        phoneNumber = this.form.phone;
        //如果是显示验证码的话就重新获取token

        this.urlShow();
      }
    },
    urlShow() {
      // var that = this;
      var phoneNumber = this.form.phone;
      var channelCode = localStorage.getItem('channelCodeSec');
      let params = `?sms=${this.form.code}
                    &mobile=${this.form.phone}
                    &identityNumber=
                    &oftenProvicne=
                    &userName=
                    &sex=
                    &birthday=
                    &companyId=
                    &departmentName=
                    &address=`;
      API("get", "/yjgcrest/feiyan/validateSms" + params)
        .then(res => {
          if (res.data.status == 200 && res.data.code == "000001") {
            localStorage.setItem("accessToken", res.data.data.accessToken);

            API('get', '/yjgcrest/feiyan/getInfoMobile', {mobile: phoneNumber}).then(res2 => {
                if (res2.data.code == '000001') {
                    var curCodeList = [];
                    if(res2.data.data && res2.data.data.length !== 0) {
                      var listData = res2.data.data;
                      curCodeList = listData.filter(function(item) {
                        return item.pf == channelCode
                      });
                    }

                    if (curCodeList.length > 0) { // 表示数据库有数据
                      this.firstExists = true;
                      util.setCookie("userTel", phoneNumber);

                      API("get", "/yjgcrest/feiyan/mobileexists?mobile=" + phoneNumber).then(resopnse => {
                        if (resopnse.data.code == '000001') {
                          var existsCode = resopnse.data.data.exists;

                          if (localStorage.getItem('isQrcode')) { // 表示扫描二维码过来的
                            if (existsCode == 1) { // 表示已注册
                              this.$router.push({
                                path: "/entryNumber/index",
                                query: {
                                  qrcodeId: localStorage.getItem('qrcodeId'),
                                  channelCodeSe: channelCode
                                }
                              });
                            } else {  // 表示未注册
                              if (this.childData.banner) {
                                util.setTitle(this.childData.title);
                                this.banner = this.childData.banner;
                              }
                              util.setCookie("userTel", this.form.phone);
                              if(channelCode != 'dmFsbGV5Ozkx') {
                                  this.verifyWay = false;
                                  this.showChildPage = false;
                                  this.urlType = (localStorage.getItem('qrcodeId') || this.$route.query.qrcodeId) ? 'question' : ''
                              } else {
                                this.$router.push({ // 软件谷渠道未注册
                                  path: "/entryNumber/index",
                                  query: {
                                    qrcodeId: localStorage.getItem('qrcodeId'),
                                    isShowTipPage: true,
                                    channelCodeSe: channelCode
                                  }
                                });
                              }
                            }
                          } else {
                            // 不是扫二维码进来的
                            if (existsCode == 1) { // 表示已注册
                              //成员表数据
                              const userData = curCodeList.filter(function(val){
                                  return val.type == 3;
                              })
                              for(let i = 0; i < curCodeList.length;i++) {
                                if (curCodeList[i].type == 1 || curCodeList[i].type == 2) { // 管理员或负责人
                                  // this.$router.push({
                                  //   path: "/organization",
                                  //   query: {
                                  //     phone: phoneNumber,
                                  //     channelCodeSe: channelCode
                                  //   }
                                  // });
                                  this.$router.push({
                                      path: "/entryNumber/index",
                                      query: {
                                        qrcodeId: (userData[0] && userData[0].qId) || localStorage.getItem('qrcodeId'),
                                        channelCodeSe: channelCode,
                                        isAdmin: true
                                      }
                                    });
                                  break;
                                }
                                if (curCodeList[i].type == 3) {
                                  this.$router.push({ // 普通用户
                                    path: "/entryNumber/index",
                                    query: {
                                      qrcodeId: userData[0].qId || localStorage.getItem('qrcodeId'),
                                      channelCodeSe: channelCode
                                    }
                                  });
                                  break;
                                }
                              }
                            } else {  // 表示非软件谷的未注册的管理员或负责人
                              if (this.childData.banner) {
                                util.setTitle(this.childData.title);
                                this.banner = this.childData.banner;
                              }
                              util.setCookie("userTel", this.form.phone);
                              if(channelCode != 'dmFsbGV5Ozkx') {
                                  this.verifyWay = false;
                                  this.showChildPage = false;
                                  this.urlType = (localStorage.getItem('qrcodeId') || this.$route.query.qrcodeId) ? 'question' : ''
                              } else {
                                this.$router.push({ // 软件谷渠道未注册
                                  path: "/entryNumber/index",
                                  query: {
                                    qrcodeId: localStorage.getItem('qrcodeId'),
                                    isShowTipPage: true,
                                    channelCodeSe: channelCode
                                  }
                                });
                              }
                            }
                          }
                        }
                      }).catch(errors => {
                        console.log(errors)
                      })
                    } else { // 未注册用户
                      if (this.childData.banner) {
                        util.setTitle(this.childData.title);
                        this.banner = this.childData.banner;
                      }
                      util.setCookie("userTel", this.form.phone);
                      if(channelCode != 'dmFsbGV5Ozkx') {
                          this.verifyWay = false;
                          this.showChildPage = false;
                          this.urlType = (localStorage.getItem('qrcodeId') || this.$route.query.qrcodeId) ? 'question' : ''
                      } else {
                        this.$router.push({ // 软件谷渠道未注册
                          path: "/entryNumber/index",
                          query: {
                            qrcodeId: localStorage.getItem('qrcodeId'),
                            isShowTipPage: true,
                            channelCodeSe: channelCode
                          }
                        });
                      }
                    }
                }
            }).catch(error => {
              console.log(error);
            });
          } else {
            this.messTip = res.data.msg;
            var that = this;
            setTimeout(function() {
              that.messTip = "";
            }, 1000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.verify {
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
}
.header {
  width: 100%;
  height: 6.25rem;
  overflow: hidden;
}
.header img {
  float: left;
  width: 100%;
  height: auto;
}
.verify-content {
  width: 100%;
  height: calc(100vh - 6.9rem);
  padding: 0.75rem 0.51rem;
  box-sizing: border-box;
}
.verify-warpper {
  padding: 1.225rem 1.3rem 1.325rem 1.45rem;
  background: #fff;
  border-radius: 0.4rem;
  width: 100%;
  /*height: 65vh;*/
  box-sizing: border-box;
}
.verify-warpper-title {
  font-size: 0.9rem;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 1.35rem;
}
.verify-warpper-title i {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #3366cc;
  float: left;
  margin-top: 0.45rem;
}
.verify-warpper-title span {
  margin-left: 0.4rem;
}
.form-warpper {
  position: relative;
}
.verify-warpper .form-warpper-p {
  position: absolute;
  color: red;
  bottom: -15px;
}
.phoneInput {
  width: 13.9rem;
}

.graphCodeInput {
  width: 8.513rem;
}
.codeInput {
  width: 13.9rem;
}
.verify-warpper-graphCode {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.verify-warpper-graphCode img {
  height: 1.375rem;
  width: 4.5rem;
  display: block;
}
.verify-warpper-Code {
  position: relative;
}
.haveCode {
  position: absolute;
  right: 0.5rem;
  top: 0.2rem;
  color: #3366cc;
  font-size: 0.8rem;
}
.inputall {
  height: 2rem;
  font-size: 0.8rem;
  /*box-shadow: 0px 0px 4px 0px rgba(102,102,102,0.2);*/
  border-radius: 4px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  padding: 0.1rem 0 0.1rem 0.85rem;
}
.phoneInputWay {
  height: 2.125rem;
}
.verify-list-next {
  text-align: center;
  width: 14.75rem;
  height: 2.5rem;
  margin: 0 auto;
  line-height: 2.5rem;
  background: #eee;
  font-size: 1rem;
  color: #fff;
  font-family: Microsoft YaHei;
  font-weight: 400;
  border-radius: 1.25rem;
  margin-top: 2.5rem;
}
.verify-list-nextway {
  margin-top: 60%;
  background: #e4393c;
}
.erify-list-nextred {
  background: #e4393c;
}
/* form表单 */
.form_title {
  font-size: 0.75rem;
  line-height: 0.9rem;
  padding-top: 1.2rem;
}
.verify-warpper .el-form-item {
  padding: 0;
  margin-bottom: 1rem;
}
.verify-warpper .input_style {
  margin-top: 0.7rem;
}
.verify-warpper .input_style /deep/ .el-input__inner {
  height: 2.75rem;
  padding: 0 0.7rem;
  line-height: 2.75rem;
  font-size: 0.8rem;
}
.form_title i {
  color: #f00;
  margin-left: 0.4rem;
}
.address_state {
  display: block;
  padding: 0.4rem 0.7rem;
  line-height: 1.2rem;
  font-size: 0.8rem;
  border: 1px solid #e9e9e9;
  background: #fff;
  border-radius: 4px;
  width: 14.75rem;
  box-sizing: border-box;
  position: relative;
}
.address_state b {
  font-weight: normal;
}
.address_state .arrow_right {
  position: absolute;
  right: 0.4rem;
  font-size: 1rem;
  top: 50%;
  margin-top: -0.5rem;
}
.address_state .tip {
  color: #ccc8c8;
  font-style: normal;
}
.warp_dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.warp_dialog .mark {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.4;
}
.dialog_content_address {
  width: 100%;
  height: 22rem;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #fff;
  border-radius: 0.2rem;
}
.show_selcet_address {
  width: 100%;
  color: #333;
}
.show_selcet_address {
  width: 100%;
  height: 5.8rem;
  padding: 1rem 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}
.show_selcet_address li {
  float: left;
  font-size: 0.6rem;
  color: #333;
  padding: 0.5rem 0.6rem;
}
.show_ullist_address {
  width: 100%;
  height: 14.2rem;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 1rem;
}
.show_ullist_address span {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 2px;
  margin: 0 0.6rem 0.4rem 0;
}

.footer-title {
  justify-content: center;
  align-items: center;
  display: flex;
  padding-bottom: 0.5rem;

  margin-top: 1.15rem;
  text-align: left;
  color: rgba(153, 153, 153, 1);
}
.footer-title img {
  width: 3.25rem;
  margin-right: 0.15rem;
}
.footer-title-text {
  font-size: 0.3rem;
}
.messTip {
  position: fixed;
  background: #000;
  opacity: 0.4;
  color: #fff;
  height: 1.6rem;
  font-size: 0.6rem;
  line-height: 1.6rem;
  top: 33%;
  left: 30%;
  padding: 0 1rem;
  border-radius: 0.2rem;
}

.app-toast {
  position: fixed;
  width: 13rem;
  border-radius: 4px;
  color: #e6a23c;
  font-size: 0.6rem;
  box-sizing: border-box;
  background-color: #fdf6ec;
  border-color: #faecd8;
  left: 50%;
  top: 3rem;
  transform: translateX(-50%);
  padding: 0.7rem;
  display: flex;
  align-items: center;
}
</style>
