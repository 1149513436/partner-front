import { defineStore } from "pinia";
import { ReqUserLogin,ReqUserRegister,ReqGetEmail,ReqResetPassord, ReqGetUserInfo} from "../api/index";
/* 登录注册相关 */
export const useUserStore = defineStore("user", {
  state: () => ({
    loginInfo: {
      user:{
        id:'',
        name:'',
        email:'',
        uid:'',
        avatar:''
      },
     token:''
    },//user和token
  }),
  actions: {
    setLogininfo(loginInfo) {
      this.loginInfo = loginInfo;
    },
    async userLogin(form) {
      let res = await ReqUserLogin(form);
      if (res.code === "200") {
        this.setLogininfo(res.data); //使用action存储数据
        console.log(this.loginInfo);
      } else {
        return Promise.reject(new Error("用户登录请求失败"));
      }
    },
    // 用户注册
    async userRegister(form) {
      let res = await ReqUserRegister(form);
      if (res.code === "200") {
            return 'ok'
      } else {
        return Promise.reject(new Error(res.msg));
      }
    },
    // 发送邮件
    async sendEmeil(email,type){
      let result=await ReqGetEmail(email,type);
      console.log(result);
      if(result.code!=='200'){
        // console.log("@@@@@@@@@@@666");
        return Promise.reject(new Error(result.msg))
      }else{
        return 'ok';
      }
    },
    // 重置密码,防止与vue文件中重名
   async StoreResetPassword(passwordForm){
      let result=await ReqResetPassord(passwordForm);
      if(result.code!=='200'){
        // console.log("@@@@@@@@@@@666");
        return Promise.reject(new Error(result.msg))
      }else{
        return result;
      }
    },
    // 退出登录
    LOGOUT(){
      this.loginInfo={}
    },
    //设置用户信息
    setUser(user){
        this.loginInfo.user=user
    }
  },
  getters:{
    getUserUid(){
      return this.loginInfo.user.uid
    },
    getBearerToken(){
      return this.loginInfo.token ? "Bearer "+this.loginInfo.token :''
    },
    getToken(){
      return this.loginInfo.token ? this.loginInfo.token :''
    }
  },
  // 开启数据持久化
  persist: true,
});
