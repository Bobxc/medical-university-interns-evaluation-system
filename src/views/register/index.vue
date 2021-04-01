<template>
  <div class="register-container" v-loading="loading">
    <div class="register-box">
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
        <!-- 注册表单 -->
        <el-form
          :rules="rules"
          class="register-form"
          :model="registerForm"
          ref="registerFormRef"
        >
          <!-- 姓名 -->
          <el-form-item class="item-phone" prop="name">
            <el-input
              class="ipt-phone"
              placeholder="姓名"
              prefix-icon="el-icon-user-solid"
              v-model="registerForm.name"
            >
            </el-input>
          </el-form-item>
          <!-- 电话号码 -->
          <el-form-item class="item-phone" prop="account">
            <el-input
              class="ipt-phone"
              placeholder="手机号"
              prefix-icon="el-icon-login-user"
              v-model="registerForm.account"
            >
            </el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item class="item-password" prop="password">
            <el-input
              class="ipt-password"
              placeholder="密码"
              prefix-icon="el-icon-login-password"
              type="password"
              v-model="registerForm.password"
            >
            </el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item class="item-confirm-password" prop="checkPass">
            <el-input
              class="ipt-confirm-password"
              placeholder="确认密码"
              prefix-icon="el-icon-login-password"
              type="password"
              v-model="registerForm.checkPass"
            >
            </el-input>
          </el-form-item>

          <!-- 选择部门 -->
          <!-- <div class="item-verification-code">
            <div>选择部门</div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div> -->
          <el-form-item>
            <el-radio v-model="registerForm.role" label="1">学生</el-radio>
            <el-radio v-model="registerForm.role" label="2">教师</el-radio>
          </el-form-item>
          <!-- 确定按钮 -->
          <div class="item-confirm-confirm" @click="confirm">确定</div>
          <!-- 已有账号，返回登录 -->
          <div class="item-to-login">
            <span>已有账号，</span
            ><span @click="$router.push('/login')">返回登录 ></span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import { postRegister } from "api/login";
export default {
  name: "Login",
  data() {
    const checkPass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("密码错误！"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      registerForm: {
        name: "",
        account: "",
        password: "",
        checkPass: "",
        role: "1",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名！", trigger: "blur" }],
        account: [
          { required: true, message: "请输入手机号！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
        ],
        // checkPass: [
        //   { required: true, message: "请再次输入密码", trigger: "blur" },
        // ],
        checkPass: [{ validator: checkPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    confirm() {
      this.$refs.registerFormRef.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        const data = {
          F_Realname: this.registerForm.name,
          F_Account: this.registerForm.account,
          F_Password: md5(this.registerForm.password),
          F_Type: this.registerForm.role,
        };
        postRegister(data).then((res) => {
          this.loading = false;
          if (res.code == 100) {
            this.$message({
              message: "注册成功!",
              type: "success",
              center: true,
            });
            this.$router.push("/login");
          } else {
            this.$message({
              message: res.message,
              type: "error",
              center: true,
            });
          }
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-radio__label {
  font-size: 18px;
}
/deep/.el-radio__inner {
  width: 18px;
  height: 18px;
}
/deep/.el-radio {
  margin-right: 150px;
}
.register-container {
  position: relative;
  min-width: 1900px !important;
  height: 100%;
  background-image: url("../../assets/image/蒙版组 222.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .register-box {
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
        margin-top: 81px;
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
      /deep/ .el-icon-user-solid {
        background: url("../../assets/image/用1户.png") center no-repeat;
        background-size: 20px 20px;
      }
      /deep/ .el-icon-user-solid:before {
        content: "\66ff";
        font-size: 16px;
        visibility: hidden;
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

      .register-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        margin-top: 45px;
        .item-phone {
          width: 439px;
          height: 48px;
          margin-bottom: 30px;
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
        .item-verification-code {
          position: relative;
          width: 439px;
          height: 48px;
          border-radius: none;
          display: flex;
          // justify-content: space-around;
          align-items: center;
          margin-bottom: 30px;
          div {
            font-size: 18px;
            color: #606266;
            margin-right: 10px;
          }
          .el-select {
            flex: 1;
          }
        }
        .item-password {
          width: 439px;
          height: 48px;
          margin-bottom: 30px;
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
        .item-confirm-password {
          width: 439px;
          height: 48px;
          margin-bottom: 35px;
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
        .item-confirm-confirm {
          width: 439px;
          height: 48px;
          background: linear-gradient(180deg, #5864ff 0%, #2131ff 100%);
          box-shadow: 0px 6px 9px rgba(0, 18, 255, 0.2);
          opacity: 1;
          border-radius: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px !important;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          margin-bottom: 25px;
        }
        .item-to-login {
          width: 439px;
          display: flex;
          justify-content: center;
          align-items: center;
          :nth-child(1) {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 500;
            line-height: 22px;
            color: #122073;
            opacity: 1;
          }
          :nth-child(2) {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 500;
            line-height: 22px;
            color: #5864ff;
            opacity: 1;
            cursor: pointer;
          }
        }
      }
    }
  }
  .send-verification-code {
    position: absolute;
    top: 300px;
    right: 51px;
    width: 140px;
    height: 48px;
    background: #16d090;
    opacity: 1;
    border-radius: 33px;
    font-size: 18px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .verification-code {
    position: absolute;
    top: 400px;
    right: 51px;
    width: 140px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(22, 208, 144, 0.25);
    opacity: 1;
    border-radius: 33px;
    font-size: 18px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }
  .send-again {
    position: absolute;
    top: 500px;
    right: 51px;
    width: 140px;
    height: 48px;
    background: #16d090;
    opacity: 1;
    border-radius: 33px;
    font-size: 18px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>