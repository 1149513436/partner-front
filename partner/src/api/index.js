/* 
    存储所有的接口地址
*/

import request from "../utils/request"
// 用户登录
export const ReqUserLogin=(data)=>request({url:'/login',data,method:'post'});
// 用户注册
export const ReqUserRegister=(data)=>request({url:'/register',data,method:'post'});