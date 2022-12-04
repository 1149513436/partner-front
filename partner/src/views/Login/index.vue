<template>
  <div class="form-box">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" status-icon>
      <h2 style="text-align: center; color: dodgerblue">登 录</h2>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入账号或邮箱" :prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" show-password placeholder="请输入密码" autocomplete="new-password"
          :prefix-icon="Lock"></el-input>
      </el-form-item>
      <div style="margin-bottom: 0.83em">
        <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
      </div>
      <div>
        <el-button link style="float: left" @click="handleResetPassword">忘记密码</el-button>
        <el-button type="primary" link @click="router.push('/register')" style="float: right">没有账号？请注册</el-button>
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
const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 11, message: 'Length should be 3 to 11', trigger: 'blur' },
  ],
})

async function login() {
  // alert("登录")
  ruleFormRef.value.validate(async valid => {  //使用验证，当valid为ture时响应
    if (valid) {
      try {
        const store = useUserStore()
        await store.userLogin(form)
        ElMessage.success("登录成功")
        router.push('/')
      } catch (error) {
        ElMessage.error(error.message)
      }

      /* request.post("/login",form).then(res=>{
          // console.log(res);
          if(res.code==='200'){
            const store=useUserStore() //使用pinia,实例化对象
            // store.$patch({user:res.data})  //存储数据
            store.setUser(res.data)//使用action存储数据
           console.log(store.user);
             
              
          }else{
             
          }
      }) */
    }
    else {
      alert("账号或密码校验错误")
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
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, .5);
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>