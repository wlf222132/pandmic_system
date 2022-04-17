import axios from '../index.js'
//按日期查询每日流量中个码统计
const URL_API_SELECT_PASSINfO = '/PassInfo/selectCount'
export function SelectPassinfo(params){
    return axios({
        method: "post",
        url: URL_API_SELECT_PASSINfO,
        params
    })
}
//近七天的疫情统计
const URL_API_SELECT_GETSEVEN = '/PassInfo/getSeven'
export function SelectGetSeven(params){
    return axios({
        method: "post",
        url: URL_API_SELECT_GETSEVEN,
        params
    })
}
//实时通过(index page3)
const URL_API_SELECT_GETNOW = '/PassInfo/getNow'
export function GetNow(params){
    return axios({
        method: "post",
        url: URL_API_SELECT_GETNOW,
        params,
    })
}



//查询用户信息
const URL_API_SELECT_USER = '/userInfo/getUserAll'
export function SelectUser(params){
    return axios({
        method: "post",
        url: URL_API_SELECT_USER,
        params
    })
}
//添加用户
const URL_API_ADD_USER = '/userInfo/addUser'
export function SelectAddUser(params){
    return axios({
        method: "post",
        url: URL_API_ADD_USER,
        data:JSON.stringify(params),
        headers:{
            "Content-Type":"application/json"
        }
    })
}
//删除用户
const URL_API_DEL_USER = '/userInfo/deleteById'
export function SelectDelUser(params){
    return axios({
        method: "post",
        url: URL_API_DEL_USER,
        params
    })
}
//根据id查询用户
const URL_API_SELECT_USERID = '/userInfo/getUserById'
export function SelectUserId(params){
    return axios({
        method: "post",
        url: URL_API_SELECT_USERID,
        params
    })
}
//根据id更改用户
const URL_API_UPDATA_USERID = '/userInfo/updateById'
export function UpdataUserId(params){
    return axios({
        method: "post",
        url: URL_API_UPDATA_USERID,
        data:JSON.stringify(params),
        headers:{
            "Content-Type":"application/json"
        }
    })
}


//统计系统人数
const URL_API_GET_SYSTEM = '/userInfo/getCount'
export function GetSystemCount(){
    return axios({
        method: "post",
        url: URL_API_GET_SYSTEM
    })
}
