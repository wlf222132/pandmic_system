import axios from "axios";
// import { Message } from "element-ui";

//创建axios实例
const service = axios.create({
    baseURL: 'http://facetocode.xyz:9090',
    timeout: 15000
})

//request 请求拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//respone 响应拦截器
service.interceptors.response.use(
    respone => {
        return respone.data;
    },
    error => {
        // console.log(error.respone)
        // if (error.respone.status == 400) {
        //     Message({
        //         message: "参数信息有误",
        //         center: true
        //     });
        //     return;
        // } else if (error.respone.status == 500) {
        //     Message({
        //         message: "服务器内部错误",
        //         center: true
        //     });
        //     return;
        // }
        // Message({
        //     message: error.message,
        //     type: "error",
        //     duration: 5 * 1000
        // })
        return Promise.reject(error);
    }
);

export default service;