<script setup>
import {reactive, ref} from "vue"
import { User, Lock } from '@element-plus/icons-vue'
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import { setRoutes } from "../../router";

  const loginData = reactive({})
  const rules = reactive({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 20, message: '密码长度在3-20位之间', trigger: 'blur' },
    ],
  })
  const ruleFormRef = ref()
  const login = () => {
    ruleFormRef.value.validate(valid => {
      if (valid) {
        // 发送表单数据给后台
        request.post('/login', loginData).then(res => {
          if (res.code === '200') {
            ElMessage.success('登录成功')
            const userStore = useUserStore()
            userStore.setManagerInfo(res.data)
            // setRoutes() //因为和上一行代码的顺序不是代码先后顺序，可能
            //你的数据还没有存进去就已经用了
            router.push('/')
          } else {
            ElMessage.error(res.msg)
          }
        })
      }
    })
  }

</script>

<template>
  <div style="height: 100vh; overflow: hidden; background-color: aliceblue">
    <div style="width: 400px; margin: 150px auto; background-color: white; border: 1px solid #ddd; padding: 30px; border-radius: 10px">
      <el-form
          ref="ruleFormRef"
          :model="loginData"
          :rules="rules"
          size="large"
          status-icon
      >
        <div style="text-align: center; color: dodgerblue; font-size: 30px; font-weight: bold; margin-bottom: 30px">登 录</div>
        <el-form-item prop="username">
          <el-input v-model="loginData.username" placeholder="请输入账号"  :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginData.password" show-password placeholder="请输入密码" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
