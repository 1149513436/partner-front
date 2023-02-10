<template>
    <div class="form-box">
        <el-form ref="ruleFormRef" :model="form" :rules="rules" status-icon>
            <h2 style="text-align: center; color: dodgerblue">注册</h2>
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="输入用户名" :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" show-password placeholder="请输入密码" autocomplete="new-password"
                    :prefix-icon="Lock"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input v-model="form.confirmPassword" show-password placeholder="请确认密码" autocomplete="new-password"
                    :prefix-icon="Lock"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" :prefix-icon="Message" autocomplete="true"></el-input>
            </el-form-item>
            <el-form-item prop="emailcode">
                <div style="display: flex">
                    <el-input style="flex: 1" v-model="form.emailcode"></el-input>
                    <el-button style="width: 120px; margin-left: 5px" @click="sendEmail" :disabled="time > 0">点击发送<span
                            v-if="time">（{{ time }}）</span></el-button>
                </div>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.name" placeholder="请设置昵称" :prefix-icon="UserFilled"></el-input>
            </el-form-item>
            <div style="margin-bottom: 0.83em">
                <el-button style="width: 100%" type="primary" @click="register()">注册</el-button>
            </div>
            <div>

                <el-button type="primary" link @click="router.push('/login')" style="float: right">已有账号？请登录</el-button>
            </div>
        </el-form>
    </div>
</template>
 
<script setup>
import { reactive, ref } from 'vue';
// import  {FormRules } from 'element-plus' //type是typescript中的
import { Lock, User, Message, UserFilled } from '@element-plus/icons-vue'  //导入图标
import router from '../../router';
import request from '../../utils/request'
import { ElMessage } from 'element-plus';
// 引入小仓库
import { useUserStore } from '@/stores/user';


const formSize = ref('default')
const ruleFormRef = ref() //需要定义一个引用和最上面ref=ruleFormRef名字保持一致
const time = ref(0)
const interval = ref(-1)
const form = reactive({})
const confirm = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    }
    if (value !== form.confirmPassword) {
        callback(new Error('两次密码不一致'))
    }
    callback()
}
// 验证邮箱是否合法
const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
const checkEmail = (rule, value, callback) => {
    if (!reg.test(value)) {  // test可以校验你的输入值
        return callback(new Error('邮箱格式不合法'));
    }
    callback()
}
const rules = reactive({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 11, message: 'Length should be 3 to 11', trigger: 'blur' },
    ],
    confirmPassword: [
        { validator: confirm, trigger: 'blur' }
    ],
    emailcode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ],
    email: [
        { validator: checkEmail, trigger: 'blur' },
    ],
})

function handleResetPassword() {
    alert("修改密码")
}

const times=()=>{
// 清空定时器
if (interval.value >= 0) {
        clearInterval(interval.value)
    }
    time.value = 10
    interval.value = setInterval(() => {
        if (time.value > 0) {
            time.value--
        }
    }, 1000)
}
// 发送邮件
const sendEmail = async () => {
    if (!reg.test(form.email)) {  // test可以校验你的输入值
        ElMessage.warning("请输入合法的邮箱")
        return
    }
    
    //  发送请求
    try {
        const store = useUserStore()
        await store.sendEmeil(form.email,"REGISTER")
        times()
        ElMessage.success("邮件发送传成功")
    } catch (error) {
        ElMessage.error(error.message)
    }
}
// 注册按钮
function register() {
    ruleFormRef.value.validate(async valid => {  //使用验证，当valid为ture时响应
        if (valid) {
            try {
                const store = useUserStore()
                await store.userRegister(form)
              
                ElMessage.success("注册成功")
                router.push('/login')
            } catch (error) {
                ElMessage.error(error.message)
            }
        }
        else {
            alert("格式错误")
        }
    })
}
</script>
 
<style scoped>
.form-box {
    width: 400px;
    border-radius: 10px;
    margin: 0 auto;
    background-image: linear-gradient(-225deg, #20E2D7 0%, #F9FEA5 100%);
    padding: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>