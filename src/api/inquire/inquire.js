import axios from '../index.js'

//获取实时疫情数据
const URL_API_GETEPIDEMIC = '/getSinaData'
export function getEpidemic(){
    return axios({
        method:"get",
        url:URL_API_GETEPIDEMIC
    })
}
