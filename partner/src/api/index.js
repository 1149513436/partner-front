/* 
    存储所有的接口地址
*/

import request from "../utils/request"
// 用户登录
export const ReqUserLogin=(data)=>request({url:'/login',data,method:'post'});
// 用户注册
export const ReqUserRegister=(data)=>request({url:'/register',data,method:'post'});
// 注册时发送邮件
export const ReqGetEmail=(email,type)=>request({url:'/email',params:{email,type},method:'get'})
//重置密码
export const ReqResetPassord=(data)=>request({url:'/password/reset',method:'post',data});
// 根据id获取用户信息
export const ReqGetUserInfo=(id)=>request({url:`/user/${id}`,method:'get'})
// 更新用户的信息
export const ReqUpdateUserInfo=(data)=>request({url:'/user',data,method:'put',})
