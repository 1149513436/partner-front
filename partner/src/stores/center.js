import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { ReqGetUserInfo,ReqUpdateUserInfo } from "@/api";
export const useCenterStore=defineStore("center",{
    state:()=>({
        userinfo:{
            
        }
    }),

    actions:{
       async GETUSERINFO(id){
            let res=await ReqGetUserInfo(id);
            if(res.code==='200'){
                return res.data
            }else{
                return  Promise.reject(new Error(res.msg))
            }       
        },
        //获取token
        GETTOKEN(type){    
            // type为1就是不带Bearer 的
  
            if(type==="token"){
                return useUserStore().getToken ||""
            }else if(type==="BearerToken"){
               console.log(useUserStore().getBearerToken);
                return useUserStore().getBearerToken || ""
            }
            
        },
       async UPDATEUSERINFO(userInfo){
          let res=await  ReqUpdateUserInfo(userInfo)
          if(res.code==='200'){
            return res.data
        }else{
            return  Promise.reject(new Error(res.msg))
        }     
        }
    }
})