<template>
  <div class="login noselect">
    <div class="container login_container" v-if="isLogin1">
      <div class="systemTit">疫情防控后台管理系统</div>
      <input
        type="text"
        placeholder="请输入账号"
        class="username"
        v-model="login_username"
        autocomplete="off"
        @keyup.enter="login()"
      />
      <input
        type="password"
        placeholder="请输入密码"
        class="password"
        v-model="login_password"
        autocomplete="off"
        @keyup.enter="login()"
      />
      <div class="change_type">
        没有账号？<span @click="isLog1()">立即注册</span>
      </div>
      <input
        type="button"
        value="登录"
        class="btn"
        @click="login()"
        v-loading.fullscreen.lock="fullscreenLoading"
      />
    </div>
    <div class="container sign_container_1" v-if="isLogin2">
      <div class="systemTit">疫情防控后台管理系统</div>
      <input
        type="email"
        placeholder="请输入邮箱"
        class="email"
        v-model="sign_email"
        autocomplete="off"
        @keyup.enter="signCode()"
      />
      <div class="change_type">
        已有账号？<span @click="isLog2()">立即登录</span>
      </div>
      <input
        type="button"
        value="获取验证码"
        class="btn"
        @click="signCode()"
        v-loading.fullscreen.lock="fullscreenLoading"
      />
    </div>
    <div class="container sign_container" v-if="isLogin3">
      <div class="systemTit">疫情防控后台管理系统</div>
      <input
        type="text"
        placeholder="请输入账号"
        class="username"
        v-model="sign_username"
        autocomplete="off"
        @keyup.enter="sign()"
      />
      <input
        type="password"
        placeholder="请输入密码"
        class="password"
        v-model="sign_password"
        autocomplete="off"
        @keyup.enter="sign()"
      />
      <input
        type="password"
        placeholder="请再次输入密码"
        class="repassword"
        v-model="sign_repassword"
        autocomplete="off"
        @keyup.enter="sign()"
      />
      <input
        type="code"
        placeholder="请输入验证码"
        class="text"
        v-model="sign_code"
        autocomplete="off"
        @keyup.enter="sign()"
      />
      <div class="change_type">
        已有账号？<span @click="isLog3()">立即登录</span>
      </div>
      <input
        type="button"
        value="注册"
        class="btn"
        @click="sign()"
        v-loading.fullscreen.lock="fullscreenLoading"
      />
    </div>
  </div>
</template>
<script>
import { userLogin, userEmail, userSign } from "@/api/user/user.js";
export default {
  name: "Login",
  data() {
    return {
      isLogin1: true,
      isLogin2: false,
      isLogin3: false,
      fullscreenLoading: false, //屏幕遮罩层开关
      login_username: null,
      login_password: null,
      sign_username: null,
      sign_password: null,
      sign_repassword: null,
      sign_email: null,
      sign_code: null,
    };
  },
  methods: {
    isLog1() {
      this.isLogin1 = false;
      this.isLogin2 = true;
    },
    isLog2() {
      this.isLogin1 = true;
      this.isLogin2 = false;
    },
    isLog3() {
      this.isLogin1 = true;
      this.isLogin3 = false;
    },
    login() {
      if (this.login_username == null || this.login_username == "") {
        this.$notify.error({
          title: "错误",
          message: "账号不能为空",
        });
      } else if (this.login_password == null || this.login_password == "") {
        this.$notify.error({
          title: "错误",
          message: "密码不能为空",
        });
      } else {
        let user = {
          adminUser: this.login_username,
          adminPassWord: this.login_password,
        };
        this.fullscreenLoading = true;
        userLogin(user)
          .then((res) => {
            if (res.code == 200) {
              if (res.data != null && res.data != undefined) {
                //存用户信息
                window.sessionStorage["token"] = res.data.token.token;
                this.$user.userName = res.data.info.adminUser;
                this.$user.email = res.data.info.email;
                this.$user.userId = res.data.info.userId;
                this.$router.push("/");
              } else {
                this.fullscreenLoading = false;
                this.$notify.error({
                  title: "错误",
                  message: "网络错误",
                });
              }
            } else {
              this.fullscreenLoading = false;
              this.$notify.error({
                title: "错误",
                message: res.message || res.msg,
              });
            }
          })
          .catch((err) => {
            this.fullscreenLoading = false;
            this.$notify.error({
              title: "错误",
              message: "网络错误",
            });
            return err;
          });
      }
    },
    signCode() {
      
      if (this.sign_email == null || this.sign_email == "") {
        this.$notify.error({
          title: "错误",
          message: "邮箱不能为空",
        });
      } else {
        this.fullscreenLoading = true;
        userEmail({
          email: this.sign_email,
        })
          .then((res) => {
            this.fullscreenLoading = false;
            if (res.code == 200) {
              this.isLogin3 = true;
              this.isLogin2 = false;
            } else {
              this.$notify.error({
                title: "错误",
                message: res.message || res.msg,
              });
            }
          })
          .catch(() => {
            this.fullscreenLoading = false;
            this.$notify.error({
              title: "错误",
              message: "网络错误",
            });
          });
      }
    },
    sign() {
      if (this.sign_username == null || this.sign_username == "") {
        this.$notify.error({
          title: "错误",
          message: "账号不能为空",
        });
      } else if (this.sign_password == null || this.sign_password == "") {
        this.$notify.error({
          title: "错误",
          message: "密码不能为空",
        });
      } else if (this.sign_repassword == null || this.sign_repassword == "") {
        this.$notify.error({
          title: "错误",
          message: "确认密码不能为空",
        });
      } else if (this.sign_repassword != this.sign_password) {
        this.$notify.error({
          title: "错误",
          message: "两次密码输入不相同",
        });
      } else if (this.sign_code !== null || this.sign_code == "") {
        this.$notify.error({
          title: "错误",
          message: "验证码不能为空",
        });
      } else {
        //异步提交
        let user = {
          adminUser: this.sign_username,
          adminPassWord: this.sign_password,
          code: this.sign_code,
          email: this.sign_email,
        };
        this.fullscreenLoading = true;
        userSign(user).then((res) => {
          this.fullscreenLoading = false;
          if (res.code == 200) {
            this.$notify.success({
              title: "成功",
              message: res.message || res.msg,
            });
            this.isLogin1 = true;
            this.isLogin3 = false;
          } else {
            this.$notify.error({
              title: "错误",
              message: res.message || res.msg,
            });
          }
        }).catch(()=>{
          this.fullscreenLoading = false;
          this.$notify.error({
              title: "错误",
              message: "网络错误",
            });
        });
      }
    },
  },
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    125deg,
    rgba(0, 226, 123, 1),
    rgba(0, 166, 190, 1),
    rgba(229, 151, 64, 1),
    rgba(30, 189, 177, 1),
    rgba(159, 1, 234, 1)
  );
  background-size: 500%;
  animation: bgAnimation 30s linear infinite;
}
.container {
  width: 400px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  box-shadow: 20px 20px 50px rgb(0 0 0 / 50%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
}
.sign_container {
  height: 420px;
}
.sign_container_1 {
  height: 300px;
}
.container input {
  width: 80%;
  height: 40px;
  border-radius: 3px;
  text-indent: 15px;
  outline: none;
  border: none;
  margin-bottom: 18px;
  background-color: rgba(255, 255, 255, 0.7);
}
.container input:nth-last-child(3) {
  margin-bottom: 12px;
}
.container input[type="button"] {
  height: 45px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
.change_type {
  position: relative;
  left: -105px;
  font-size: 12px;
  color: rgb(144, 138, 138);
  margin-bottom: 30px;
}
.change_type > span {
  color: #333;
  cursor: pointer;
}
@keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.systemTit {
  margin-bottom: 25px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  letter-spacing: 2px;
}
</style>