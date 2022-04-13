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