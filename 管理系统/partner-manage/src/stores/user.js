import { defineStore } from 'pinia'
import router from "@/router";

export const useUserStore = defineStore('manager', {
    state: () => ({
        managerInfo: {}
    }),
    getters: {
        getUserId() {
            return this.managerInfo.user ? this.managerInfo.user.id : 0
        },
        getUser() {
            return this.managerInfo.user || {}
        },
        getBearerToken() {
            return this.managerInfo.token ? 'Bearer ' + this.managerInfo.token : ''
        },
        getToken() {
            return this.managerInfo.token || ""
        }
    },
    actions: {
        setManagerInfo(managerInfo) {
            this.managerInfo = managerInfo;
            // console.log(managerInfo);
        },
        setUser(user) {
            this.managerInfo.user = JSON.parse(JSON.stringify(user))
        },
        logout() {
            localStorage.removeItem('manager')
            router.push('/login')
        },
        getMenus() {
            // console.log("@@", this.managerInfo.menus);
            return this.managerInfo.menus || []
        },
        getAuths() {
            return this.managerInfo.auths || []
        }
    },
    // 开启数据持久化
    persist: true
})
