
export default {
    install(Vue) {


        /**
         * 注意:  定义type 规则时 不用做非空验证
         *        只需要传入 required:true 即可
         * */
        /*保留两位小数*/
        const isvalidateMoney = (rule, value, callback) => {
            if(value != null && value != "") {
                if(!value.match(/^[0-9]+(.[0-9]{2})?$/)) {
                    callback(new Error('请输入正确的数字，最多保留两位小数!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }
        /*验证QQ号码*/
        const isvalidateQQ= (rule, value, callback) => {
            if(value != null && value != "") {
                if(!value.match(/[1-9][0-9]{4,}/)) {
                    callback(new Error('您输入的QQ号不正确!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }
        /*验证手机号*/
        const isvalidateMobile= (rule, value, callback) => {
            if(value != null && value != "") {
                // if(!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g.test(value))) {
                if(!(/^(1[3-9][0-9])\d{8}$/g.test(value))) {
                    callback(new Error('您输入的手机号不正确!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }

        /*含有非法字符(只能输入字母、汉字)*/
        const isvalidateRegexn= (rule, value, callback) => {
            if(value != null && value != "") {
                if(!value.match(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/)) {
                    callback(new Error('含有非法字符(只能输入字母、汉字)!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }
        /*请输入正整数*/
        const isvalidateIdCard= (rule, value, callback) => {
            if(value != null && value != "") {
                if(!value.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)) {
                    callback(new Error('请输入正确的身份证号码!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }

        const isvalidateEmail = (rule, value,callback)=>{
            if(value != null && value != "") {
                if(!value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
                    callback(new Error('请输入正确的邮箱格式!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }
        const isvalidateAge = (rule, value,callback)=>{
            let reg=/^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
            if(value != null && value != "") {
                if(!reg.test(value)){
                    callback(new Error('请输入1~120年龄!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }
        const isvalidateCnName = (rule, value,callback)=>{
            if(value != null && value != "") {
                if(!value.match(/^[\u4e00-\u9fa5]{2,4}$/)) {
                    callback(new Error('请输入2~4位中文姓名!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }
        const isvalidateEnName = (rule, value,callback)=>{
            if(value != null && value != "") {
                if(!value.match(/^[A-Za-z0-9]{6,12}$/)) {
                    callback(new Error('请输入6~12英文和数字!'))
                } else {
                    callback()
                }
            }
            else{
                callback();
            }
        }
        /**
         * 参数 item
         * required true  必填项
         * maxLength  字符串的最大长度
         * min 和 max 必须同时给 min < max  type=number
         * type 手机号 mobile
         *      邮箱   email
         *      网址   url
         *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
         *      https://blog.csdn.net/weixin_44346550/article/details/91891505
         * */

        Vue.prototype.filter_rules = function (item){
            let rules = [];
            if(item.required){
                rules.push({ required: true, message: '该输入项为必填项!', trigger: 'blur' });
            }
            if(item.maxLength){
                rules.push({ min:1,max:item.maxLength, message: '最多输入'+item.maxLength+'个字符!', trigger: 'blur' })
            }
            if(item.min&&item.max){
                rules.push({ min:item.min,max:item.max, message: '字符长度在'+item.min+'至'+item.max+'之间!', trigger: 'blur' })
            }
            if(item.type){
                let type = item.type;
                switch(type) {
                    case 'email':
                        rules.push({  validator: isvalidateEmail,trigger:'blur,change'  });
                        break;
                    case 'qq':
                        rules.push( { validator: isvalidateQQ, trigger: 'blur,change' });
                        break;
                    case 'phone':
                        rules.push( { validator: isvalidateMobile, trigger: 'blur,change' });
                        break;
                    case 'account':
                        rules.push( { validator: isvalidateRegexn, trigger: 'blur,change' });
                        break;
                    case 'money':
                        rules.push( { validator: isvalidateMoney, trigger: 'blur,change' });
                        break;
                    case 'idCard':
                        rules.push( { validator: isvalidateIdCard, trigger: 'blur,change' });
                        break;
                    case 'age':
                        rules.push( { validator: isvalidateAge, trigger: 'blur,change' });
                        break;
                    case 'cnName':
                        rules.push( { validator: isvalidateCnName, trigger: 'blur,change' });
                        break;
                    case 'enName':
                        rules.push( { validator: isvalidateEnName, trigger: 'blur,change' });
                        break;
                    default:
                        rules.push({});
                        break;
                }
            }


            return rules;
        };
    }
};
