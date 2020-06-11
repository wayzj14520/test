export function qq(value) {
    return value.match(/[1-9][0-9]{4,}/);
}
export function email(value) {
    return value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
}
export function idCard(value) {
    return value.match(/^\d{15}|\d{18}$/)||value.match(/^([0-9]){7,18}(x|X)?$/)
}
export function phone(value) {
    return value.match(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/)
}
export function password(value) {
    //以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    return value.match(/^[a-zA-Z]\w{5,17}$/)
}
export function passwordS(value) {
    //强密码：必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
    return value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/)
}
export function ip(value) {
    return value.match(/((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/)
}
export function money(value) {
    return value.match(/^[0-9]+(.[0-9]{2})?$/)
}
export function account(value) {
    return value.match(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/)
}
// export function Inter(item) {
//     return item.match(/^+[1-9]\d*$/)
// }