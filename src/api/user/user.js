import axios from '../index.js'
//登录
const URL_API_LOGIN = '/admin/login'
export function userLogin(params){
    return axios({
        method: "post",
        url: URL_API_LOGIN,
        params
    })
}
//邮箱获取验证码
const URL_API_EMAIL = '/admin/sendEmail'
export function userEmail(params){
    return axios({
        method: "post",
        url: URL_API_EMAIL,
        params
    })
}
//注册
const URL_API_SIGN = '/admin/register'
export function userSign(params){
    return axios({
        method: "post",
        url: URL_API_SIGN,
        data:JSON.stringify(params),
        headers:{
            "Content-Type":"application/json"
        }
    })
}