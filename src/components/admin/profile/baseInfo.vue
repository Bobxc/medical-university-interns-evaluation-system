
  <template>
  <div class="account-container">
    <el-card class="account-title-card" shadow="never"> 账号设置 </el-card>
    <el-card
      class="account-content-card"
      shadow="never"
      :body-style="{ padding: '38px' }"
    >
      <div class="account-form">
        <el-row class="phone-row">
          <div class="phone">账号</div>
          <el-input v-model="form.phone" disabled></el-input>
        </el-row>
        <el-row class="password-row">
          <div class="password">旧密码</div>
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="form.oldPassword"
                type="password"
                ref="oldPasswordRef"
              ></el-input
            ></el-col>
            <el-col :span="9" class="prompt" v-show="oldPasswordShow">
              <div class="div-diabox" style="display: flex">
                <span class="arrow-left-out"></span>
                <span class="arrow-left-in"></span>
                <img src="@/assets/image/叹号.png" alt="" />
                <div class="prompt-tip">密码长度6-20位</div>
              </div>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="password-row">
          <div class="password">新密码</div>
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="form.newPassword"
                type="password"
                ref="newPasswordRef"
              ></el-input
            ></el-col>
            <el-col :span="9" class="prompt" v-show="newPasswordShow">
              <div class="div-diabox" style="display: flex">
                <span class="arrow-left-out"></span>
                <span class="arrow-left-in"></span>
                <img src="@/assets/image/叹号.png" alt="" />
                <div class="prompt-tip">密码长度6-20位</div>
              </div>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="checkPassword-row">
          <div class="checkPassword">确认密码</div>
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="form.checkPassword"
                type="password"
                ref="checkPasswordRef"
              ></el-input
            ></el-col>
            <el-col :span="9" class="prompt-copy" v-show="checkPasswordShow">
              <div class="div-diabox-copy" style="display: flex">
                <span class="arrow-left-out-copy"></span>
                <span class="arrow-left-in-copy"></span>
                <img src="@/assets/image/叹号.png" alt="" />
                <div class="prompt-tip-copy">两次输入密码不一致!</div>
              </div>
            </el-col>
          </el-row>
        </el-row>
        <button class="btn" @click="submit">确定</button>
      </div>
    </el-card>
  </div>
</template>
<script>
import md5 from "js-md5";
import { submitResetPassword } from "api/student-api/profile";
import { resetRouter } from "@/router/index";
export default {
  name: "BaseInformation",
  data() {
    return {
      oldPasswordShow: false,
      newPasswordShow: false,
      checkPasswordShow: false,
      form: {
        phone: "",
        oldPassword: "",
        newPassword: "",
        checkPassword: "",
      },
    };
  },
  created() {
    this.form.phone = window.sessionStorage.getItem("useraccount");
  },
  methods: {
    submit() {
      console.log(this.$refs.newPasswordRef.value.length);
      if (
        this.$refs.newPasswordRef.value.length < 6 ||
        this.$refs.newPasswordRef.value.length > 20
      ) {
        this.newPasswordShow = true;
        console.log("密码长度6-20位");
      } else if (
        this.$refs.newPasswordRef.value.length !==
        this.$refs.checkPasswordRef.value.length
      ) {
        this.newPasswordShow = false;
        this.checkPasswordShow = true;
        console.log("两次输入密码不一致!");
      } else {
        this.newPasswordShow = false;
        this.checkPasswordShow = false;
        console.log("成功");
        let data = {
          userid: window.sessionStorage.getItem("userid"),
          oldPassword: md5(this.form.oldPassword),
          password: md5(this.form.newPassword),
        };
        console.log(data);
        submitResetPassword(data).then((res) => {
          console.log(res);
          if (res.data.code == 100) {
            this.$message({
              message: res.data.message,
              type: "success",
              center: true,
            });
            setTimeout(() => {
              window.sessionStorage.clear();
              resetRouter();
              this.$store.commit("CLEAR_MENU_LIST");
              this.$router.push("/login");
            }, 500);
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
              center: true,
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.account-container {
  .account-title-card {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: 800;
    color: #122073;
    opacity: 1;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
  }
  .account-content-card {
    height: calc(100vh - 300px);
    margin: 20px;
    .account-form {
      .phone-row {
        width: 26%;
        margin-bottom: 30px;
        .phone {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #122073;
          opacity: 1;
          margin-bottom: 12px;
        }
      }
      .password-row {
        width: 45%;
        margin-bottom: 30px;
        .password {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #122073;
          opacity: 1;
          margin-bottom: 12px;
        }
        .prompt {
          height: 40px;
          opacity: 1;
          display: flex;
          padding: 5px 10px;
          align-items: center;
          .div-diabox {
            width: 100%;
            border-style: solid;
            border-width: 1px;
            border-radius: 3px;
            border-color: #c9ceff;
            background-color: #f5f6ff;
            position: relative;
            padding: 10px;
            display: flex;
            align-items: center;
            .arrow-left-out {
              width: 0px;
              height: 0px;
              border-style: solid;
              border-color: transparent#C9CEFF transparent transparent;
              border-width: 7px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: -14px;
            }
            .arrow-left-in {
              width: 0px;
              height: 0px;
              border-style: solid;
              border-color: transparent#F5F6FF transparent transparent;
              border-width: 7px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: -12px;
            }
            img {
              width: 15px;
              height: 15px;
              margin-right: 5px;
            }
            .prompt-tip {
              font-size: 14px;
              font-family: "PingFang SC";
              font-weight: 500;
              color: #122073;
              opacity: 1;
            }
          }
        }
      }
      .checkPassword-row {
        width: 45%;
        margin-bottom: 30px;
        .checkPassword {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #122073;
          opacity: 1;
          margin-bottom: 12px;
        }
        .prompt-copy {
          height: 40px;
          opacity: 1;
          display: flex;
          padding: 5px 10px;
          align-items: center;
          .div-diabox-copy {
            width: 100%;
            border-style: solid;
            border-width: 1px;
            border-radius: 3px;
            border-color: #c9ceff;
            background-color: #f5f6ff;
            position: relative;
            padding: 10px;
            display: flex;
            align-items: center;
            .arrow-left-out-copy {
              width: 0px;
              height: 0px;
              border-style: solid;
              border-color: transparent#C9CEFF transparent transparent;
              border-width: 7px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: -14px;
            }
            .arrow-left-in-copy {
              width: 0px;
              height: 0px;
              border-style: solid;
              border-color: transparent#F5F6FF transparent transparent;
              border-width: 7px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: -12px;
            }
            img {
              width: 15px;
              height: 15px;
              margin-right: 5px;
            }
            .prompt-tip-copy {
              font-size: 14px;
              font-family: "PingFang SC";
              font-weight: 500;
              color: #122073;
              opacity: 1;
            }
          }
        }
      }
      .btn {
        width: 106px;
        height: 42px;
        background: #5864ff;
        opacity: 1;
        border-radius: 6px;
        outline: none;
        border: none;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
