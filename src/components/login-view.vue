<template>
  <div class="login" style="margin: auto;">
    <div class="login-form-box">
      <p class="login-title">Three-Dの站</p>
      <p class="login-sub-title">登录</p>
      <div>
        <el-form
            :model="login_form"
            :rules="rules"
            ref="login_ref"
            label-width="0px">

          <el-form-item prop="email">
            <el-input v-model="login_form.email" placeholder="email" autocomplete="off" clearable>
            </el-input>
          </el-form-item>

          <el-form-item prop="pwd">
            <el-input v-model="login_form.pwd" placeholder="密码" autocomplete="off" clearable></el-input>
          </el-form-item>


          <div style="text-align: center">
            <input type="button" @click="submitForm('login_form')" value="登录" class="sub-btn">
          </div>


        </el-form>
      </div>
      <div class="link">
        <router-link to="/register">创建账号</router-link>

        <a href="#" class="error">无法登录？</a>
      </div>
    </div>
    <div class="login-background">
      <img src="../assets/img/天气之子.png" alt="H+" id="background">
    </div>
  </div>
</template>
<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import {login} from "@/api/user";
const router = useRouter();
const login_form=ref({
  email:'',
  pwd:''
})
const login_ref = ref(null)
const rules=ref({
  email: [
    { type: 'email', required: true, message: '请输入正确邮箱', trigger: 'change' }
  ],
  pwd:[
    {type:'string',required: true,message:'请输入密码',trigger: 'change'},
    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
  ]
})
const submitForm=()=>{
  login_ref.value.validate(valid => {
    if (valid) {
      login(login_form.value)
          .then(response => {
            // 登录成功，重定向到新页面
            if (response.data.data.is) {
              localStorage.setItem("token",response.data.data.token)
              router.push('/home');
            } else {
              // 登录失败，弹窗提示
              //alert('用户名或密码错误');
              router.push('/videoplay');
            }
          })
          .catch(error => {
            console.log(error);
          });
    }

  })
}

</script>


<style scoped>
.main {
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0;
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
}

.login {
  display: flex;
  width: 1280px;
  height: 720px;
  box-shadow: 4px 4px 8px rgb(159, 159, 159, 0.7);
  background-color: white;
  overflow: hidden;

}

.login .login-form-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(400px - 128px);
  height: calc(100% - 128px);
  background-color: white;
  padding: 64px;
  animation: login-box 2s;
}

.login .login-form-box .login-title {
  margin: 0 0 64px 0;
  font-size: 32px;
}

.login .login-form-box .login-sub-title {
  margin: 0 0 16px 0;
  font-size: 24px;
}

.login .login-form-box .login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 120px;
}

.login .login-form-box .login-form .remember-box {
  display: flex;
  width: 280px;
  height: 32px;
}

.sub-btn {
  margin-top: 80px;
  border: 2px solid #EDEDED;
  border-radius: 16px;
  width: 64px;
  height: 64px;
  outline: none;
  background: transparent url("../assets/ico/login-button.png") no-repeat center center;
  background-size: 32px;
  cursor: pointer;
  transition: all 0.5s;
}

.sub-btn:hover {
  opacity: 0.5;
  border: 2px solid rgb(0, 174, 255);
  background: url("../assets/ico/login-button-hover.png") center center no-repeat;
  background-size: 32px;
}

.login .login-form-box .link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.login .login-form-box .link a {
  margin-bottom: 8px;
  outline: none;
  text-decoration: none;
  color: black;
  transition: all 0.5s;
}

.login .login-form-box .link a:hover {
  color: rgb(0, 174, 255);
}

.login .login-background {
  width: 880px;
  height: 100%;
  animation: background 2s;
}

.login .login-background img {
  width: 100%;
  height: 100%;
}

.el-input{
  height: 45px;
  background-color: #EDEDED;
}
.seng-code-box{
  display: flex;
}
.seng-code-box>.el-form-item{
  width: 100px;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
}
.seng-code-box>button{
  height: 39px;
  flex: 1;
}
</style>