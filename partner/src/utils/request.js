import { ElMessage } from 'element-plus'
import router from '../router'
import config from '../../config';
import axios from "axios";
import {useUserStore} from '@/stores/user.js'
const request = axios.create({
    baseURL: "/api",
    timeout: 5000
})
// console.log("查看服务器请求地址",config.serverUrl);
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // yml中设置的token名字
   const token= useUserStore().getBearerToken
    config.headers['Authorization'] = token;  // 设置请求头,Bearer是设置的前缀后有一个空格
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 当权限验证不通过的时候给出提示
        if (res.code === '401') {
            ElMessage.error(res.msg);
            router.push("/login")
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request
