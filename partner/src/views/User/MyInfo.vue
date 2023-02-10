<template>
    <div class="">
        <div class="main">
            <el-form :model="state.userInfo" label-width="80px" class="userForm">
                <el-form-item label="">
                    <el-upload class="avatar-uploader" :action="url" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="errorUpload"
                        :headers="state.header">
                        <img v-if="state.userInfo.avatar" :src="state.userInfo.avatar" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="state.userInfo.username" disabled />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="state.userInfo.name" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="state.userInfo.email" />
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="save">保 存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref,onMounted } from 'vue';
import { useCenterStore } from '@/stores/center'
import { useUserStore } from '@/stores/user'
import { Plus,User,Message,Histogram, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import config from '../../../config';
import router from '../../router';
const store = useCenterStore()
const url = ref("http://"+config.serverUrl + '/file/upload')
const usertoken=ref('')
let state = reactive({
    userInfo: {
        avatar:store.userinfo.avatar||''
    },
    header:{
        Authorization:usertoken
    }
})

const imageUrl = ref('')

onMounted(() => {
    load()
    usertoken.value=useCenterStore().GETTOKEN("BearerToken")
    // console.log(usertoken.value);
})
// 表单填充
async function load() {
    try {
        let result = await store.GETUSERINFO(useUserStore().loginInfo.user.id)
        //    console.log(result);
        state.userInfo = result
    } catch (error) {
        ElMessage.error(error.message)
    }
}

const handleAvatarSuccess = (response, file) => {
    // 直接log response 返回一个object Object。
    // 处理头像url，因为在后端显示图片需要token才能放行
    state.userInfo.avatar=response.data+`?loginId=${useUserStore().getUserUid}&token=${store.GETTOKEN("token")}`
    console.log(state.userInfo.avatar);
}

const beforeAvatarUpload = (res) => {
        console.log("图片发送之前",res);
}
const errorUpload = (error, file, files) => {
    ElMessage.error(error)
    // console.log("处理回调函数"+error);
}

// 保存更新用户信息
const save= async()=>{
    try {
        await store.UPDATEUSERINFO(state.userInfo)
        // 把最新的值保存在仓库中
        useUserStore().setUser(state.userInfo)
        ElMessage.success('保存成功')
        router.push('/home')
    } catch (error) {
        ElMessage.error(error.message)
    }
    
}

</script>

<style lang="less" scoped>
    .main {
        background-color: white;
        padding: 30px 0 10px 90px; 
        min-height: 100vh;
        .avatar-uploader .avatar {
                width: 120px;
                height: 120px;
                display: block;
                background-color: black;
            }
            .avatar-uploader-icon{
                width: 120px;
                height: 120px;
            }
        .userForm {
            width: 60%;
           
        }
    }
</style>
