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
