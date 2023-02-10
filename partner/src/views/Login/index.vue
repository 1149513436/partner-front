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
  <!-- 弹框 -->
  <el-dialog v-model="passwordVisible" title="忘记密码" :close-on-click-modal=false>
    <el-form :model="passwordForm" ref="passwordRuleFormRef" :rules="passwordRules" status-icon>
      <el-form-item label="请输入你的邮箱" label-width="100px" prop="email">
        <el-input v-model="passwordForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" label-width="100px" prop="emailcode">
        <div style="display: flex">
          <el-input style="flex: 1" v-model="passwordForm.emailcode" clearable></el-input>
          <el-button style="width: 120px; margin-left: 5px" @click="sendEmail1" :disabled="time > 0">
            点击发送
            <span v-if="time">（{{ time }}）</span></el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordVisible = false">取消</el-button>
        <el-button type="primary" @click="resetPassword">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue';
// import  {FormRules } from 'element-plus' //type是typescript中的
import { Lock, User } from '@element-plus/icons-vue'  //导入图标
import router from '../../router';
import request from '../../utils/request'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';

const formSize = ref('default')
const ruleFormRef = ref() //需要定义一个引用和最上面ref=ruleFormRef名字保持一致
const passwordRuleFormRef = ref()
const interval = ref(-1)
const time = ref(0)
const passwordVisible = ref(false)
const passwordForm = reactive({})
const form = reactive({})
const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 25, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 11, message: 'Length should be 3 to 11', trigger: 'blur' },
  ],
})


// 验证邮箱是否合法
const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
const checkEmail = (rule, value, callback) => {
  if (!reg.test(value)) {  // test可以校验你的输入值
    return callback(new Error('邮箱格式不合法'));
  }
  callback()
}
const passwordRules = reactive({
  email: [
        { validator: checkEmail, trigger: 'blur' },
    ],
  emailcode: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { message: 'Length should be 3 to 11', trigger: 'blur' },
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
    }
    else {
      alert("账号或密码校验错误")
    }
  })
}
// 忘记密码按钮，弹框出现
function handleResetPassword() {
  // vue3中ref的值需要.value
  passwordVisible.value = true
  // 防止点击元素时还没有元素
  nextTick(()=>{
    passwordRuleFormRef.value.resetFields();
  })
}
/*
倒计时方法 
 */
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
const sendEmail1 = async () => {
  if (!reg.test(passwordForm.email)) {  // test可以校验你的输入值
    ElMessage.warning("请输入合法的邮箱")
    return
  }
  //  发送请求
  try {
    const store = useUserStore()
    await store.sendEmeil(passwordForm.email, "RESETPWD")
    times()//发送成功就倒计时
    ElMessage.success("邮件发送传成功")
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 确认重置密码
async function resetPassword() {
  passwordRuleFormRef.value.validate(async valid => {  //使用验证，当valid为ture时响应
    if (valid) {
      try {
        const store = useUserStore()      
       let res=await store.StoreResetPassword(passwordForm)
        passwordVisible.value = false
        console.log("修改密码的回调",res.data);
        // 小问题，不能使用逗号，必须用加号链接
        ElMessage.success("密码更改成功，你的密码为"+res.data)
        router.push('/login')
      } catch (error) {
        
        ElMessage.error(error.message)
      }
    }
    else {
      alert("校验错误")
    }
  })

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