<template>
  <div class="login noselect">
    <div class="container login_container" v-if="isLogin">
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
        没有账号？<span @click="isLogin = false">立即注册</span>
      </div>
      <input
        type="button"
        value="登录"
        class="btn"
        @click="login()"
        v-loading.fullscreen.lock="fullscreenLoading"
      />
    </div>
    <div class="container sign_container" v-if="!isLogin">
      <div class="systemTit">疫情防控后台管理系统</div>
      <input
        type="text"
        placeholder="请输入账号"
        class="username"
        v-model="sign_username"
        autocomplete="off"
      />
      <input
        type="password"
        placeholder="请输入密码"
        class="password"
        v-model="sign_password"
        autocomplete="off"
      />
      <input
        type="password"
        placeholder="请再次输入密码"
        class="repassword"
        v-model="sign_repassword"
        autocomplete="off"
      />
      <div class="change_type">
        已有账号？<span @click="isLogin = true">立即登录</span>
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
import { userLogin } from "@/api/user/user.js";
export default {
  name: "Login",
  data() {
    return {
      isLogin: true,
      fullscreenLoading: false, //屏幕遮罩层开关
      login_username: null,
      login_password: null,
      sign_username: null,
      sign_password: null,
      sign_repassword: null,
    };
  },
  methods: {
    getUser() {},
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
                message: res.message,
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
      } else {
        //异步提交
        let user = {
          userId: this.sign_username,
          passWord: this.sign_password,
        };
        console.log(user);
        this.fullscreenLoading = true;
        //未完成
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000);
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
  height: 400px;
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