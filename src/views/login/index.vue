<template>
  <div class="login-container" v-loading="loading">
    <div class="login-box">
      <div class="form-left">
        <img src="@/assets/image/组 2294.png" alt="" />
      </div>
      <div class="form-right">
        <div class="title-container">
          <div class="title-left">
            <img src="@/assets/image/组 818.png" alt="" />
          </div>
          <div class="title-right">
            <span>温州医科大学仁济学院</span>
            <span>临床毕业实习管理系统</span>
          </div>
        </div>
        <!-- 登录表单 -->
        <el-form
          :rules="rules"
          ref="loginFormRef"
          class="login-form"
          :model="loginForm"
        >
          <!-- 账号 -->
          <el-form-item prop="account">
            <el-input
              placeholder="手机号"
              prefix-icon="el-icon-login-user"
              v-model="loginForm.account"
            >
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-login-password"
              v-model="loginForm.password"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <!-- <div class="btns" @click="login">登录</div> -->
            <el-button class="btns" @click="login">登录</el-button>
          </el-form-item>
          <!-- 自动登录、忘记密码 -->
          <el-form-item>
            <div class="utils">
              <div class="auto-login" style="visibility: hidden;">
                <el-checkbox v-model="checked">自动登录</el-checkbox>
              </div>
              <div class="forget-password" @click="forgetPassword">
                忘记密码
              </div>
              <div class="register" @click="$router.push('/register')">
                现在注册
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import { postLogin } from "api/login";
import { studentRoutes, teacherRoutes } from "@/router";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        account: "gly",
        password: "123456",
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      checked: true,
    };
  },
  mounted() {},
  methods: {
    login() {
      let _this = this;
      _this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        const data = {
          account: this.loginForm.account,
          password: md5(this.loginForm.password),
        };
        this.loading = true;
        postLogin(data).then((res) => {
          this.loading = false;
          console.log(res);
          if (res.code == 200)
            return _this.$message({
              message: res.message,
              center: true,
              type: "error",
            });
          _this.$message({
            message: res.message,
            center: true,
            type: "success",
          });
          window.sessionStorage.setItem("token", res.data.Token);
          window.sessionStorage.setItem("role", res.data.User.logintype);
          window.sessionStorage.setItem("userid", res.data.User.userid);
          window.sessionStorage.setItem("username", res.data.User.username);
          window.sessionStorage.setItem(
            "useraccount",
            res.data.User.useraccount
          );
          _this.$router.push("/home").catch(() => {});
        });
      });
    },
    forgetPassword() {
      this.$message({
        message: "请联系管理员！",
        type: "warning",
        center: true,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  position: relative;
  height: 100%;
  background-image: url("../../assets/image/蒙版组 222.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1391px;
    height: 691px;
    background: linear-gradient(180deg, #ffffff 0%, #f1f7ff 100%);
    box-shadow: 0px 6px 31px rgba(0, 62, 123, 0.14);
    opacity: 1;
    border-radius: 20px;
    display: flex;
    .form-left {
      img {
        width: 773px;
        height: 691px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }
    .form-right {
      flex: 1;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      .title-container {
        display: flex;
        justify-content: center;
        margin-top: 105px;
        .title-left {
          img {
            width: 64px;
            height: 64px;
          }
        }
        .title-right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          :nth-child(1) {
            // width: 260px;
            height: 26px;
            font-size: 19px;
            font-family: "PingFang SC";
            font-weight: 500;
            line-height: 26px;
            color: #5864ff;
            letter-spacing: 8px;
            opacity: 1;
          }
          :nth-child(2) {
            // width: 260px;
            height: 37px;
            font-size: 26px;
            font-family: "PingFang SC";
            font-weight: 800;
            line-height: 37px;
            color: #5864ff;
            opacity: 1;
          }
        }
      }
      /deep/ .el-icon-login-user {
        background: url("../../assets/image/组 2073.png") center no-repeat;
        background-size: 15px 22px;
      }
      /deep/ .el-icon-login-user:before {
        content: "\66ff";
        font-size: 16px;
        visibility: hidden;
      }
      /deep/ .el-icon-login-password {
        background: url("../../assets/image/组 2074.png") center no-repeat;
        background-size: 19px 20px;
      }
      /deep/ .el-icon-login-password:before {
        content: "\66ff";
        font-size: 16px;
        visibility: hidden;
      }
      .login-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        margin-top: 78px;
        .el-form-item {
          width: 439px;
          height: 48px;
          /deep/.el-input__inner {
            width: 439px;
            height: 48px;
            background: rgba(88, 100, 255, 0.1);
            border-radius: 33px;
            font-size: 18px;
            padding-left: 55px;
          }
          /deep/.el-input__icon {
            width: 50px;
          }
        }
        .btns {
          width: 439px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #5864ff 0%, #2131ff 100%);
          box-shadow: 0px 6px 9px rgba(0, 18, 255, 0.2);
          opacity: 1;
          border-radius: 24px;
          border: none;
          margin-top: 33px;
          font-size: 20px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
        }
        .utils {
          width: 100%;
          display: flex;
          margin-top: 44px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #122073;
          opacity: 1;
          /deep/.el-checkbox__inner {
            /* width: 20px;
            height: 20px; */
            background: #5864ff;
            border-color: #5864ff;
          }
          /deep/.el-checkbox__label {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 500;
            color: #122073;
          }
          .forget-password {
            transform: translateX(180px);
            cursor: pointer;
          }
          .register {
            transform: translateX(220px);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>