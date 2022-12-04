<template>
    <div class="form-box">
        <el-form ref="ruleFormRef" :model="form" :rules="rules" status-icon>
            <h2 style="text-align: center; color: dodgerblue">注册</h2>
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入账号或邮箱" :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" show-password placeholder="请输入密码" autocomplete="new-password"
                    :prefix-icon="Lock"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input v-model="form.confirmPassword" show-password placeholder="请确认密码" autocomplete="new-password"
                    :prefix-icon="Lock"></el-input>
            </el-form-item>
            <div style="margin-bottom: 0.83em">
                <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
            </div>
            <div>
                <el-button link style="float: left" @click="handleResetPassword">忘记密码</el-button>
                <el-button type="primary" link @click="router.push('/register')"
                    style="float: right">没有账号？请注册</el-button>
            </div>
        </el-form>
    </div>
</template>
 
<script setup>
import { reactive, ref } from 'vue';
// import  {FormRules } from 'element-plus' //type是typescript中的
import { Lock, User } from '@element-plus/icons-vue'  //导入图标
import router from '../../router';
import request from '../../utils/request'
import { ElMessage } from 'element-plus';
import { useUserStore } from '../../stores/user';

const formSize = ref('default')
const ruleFormRef = ref() //需要定义一个引用和最上面ref=ruleFormRef名字保持一致

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
    ]
})

function login() {
    // alert("登录")
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

function handleResetPassword() {
    alert("修改密码")
}
</script>
 
<style scoped>
.form-box {
    width: 300px;
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