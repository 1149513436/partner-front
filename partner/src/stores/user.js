import { defineStore } from "pinia";
import { ReqUserLogin,ReqUserRegister } from "../api/index";
// import { mande } from 'mande'

// const loginAPI=mande()
export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    async userLogin(form) {
      let res = await ReqUserLogin(form);
      if (res.code === "200") {
        this.setUser(res.data); //使用action存储数据
        console.log(this.user);
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
        return Promise.reject(new Error("用户注册请求失败"));
      }
    },
  },
  // 开启数据持久哈
  persist: true,
});
