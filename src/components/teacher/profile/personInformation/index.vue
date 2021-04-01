<template>
  <div class="container" v-loading="loading">
    <el-card class="profile-title-card"> 个人信息 </el-card>
    <el-card class="profile-content-card">
      <el-row class="header-row"> 基本信息 </el-row>
      <el-row>
        <el-row class="first-row">
          <el-col :span="6">
            <div class="row-name" style="display: flex; align-items: center">
              <div
                style="
                  font-size: 16px;
                  font-weight: 500;
                  color: #122073;
                  margin-bottom: 12px;
                "
              >
                个人联系方式
              </div>
              <img
                style="margin-bottom: 12px"
                src="@/assets/image/星号.png"
                alt=""
              />
            </div>
            <el-input
              placeholder="请输入"
              v-model="phoneVal"
              disabled
            ></el-input>
          </el-col>

          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div
                style="
                  font-size: 16px;
                  font-weight: 500;
                  color: #122073;
                  margin-bottom: 12px;
                "
              >
                所在医院
              </div>
              <img
                style="margin-bottom: 12px"
                src="@/assets/image/星号.png"
                alt=""
              />
            </div>
            <el-select
              v-model="hospitalVal"
              placeholder="请选择"
              @change="selectHospital"
            >
              <el-option
                v-for="item in hospitalOptions"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div
                style="
                  font-size: 16px;
                  font-weight: 500;
                  color: #122073;
                  margin-bottom: 12px;
                "
              >
                姓名
              </div>
              <img
                style="margin-bottom: 12px"
                src="@/assets/image/星号.png"
                alt=""
              />
            </div>
            <el-input placeholder="请输入" v-model="nameVal"></el-input>
          </el-col>
        </el-row>
        <el-row class="second-row">
          <el-col :span="6">
            <div class="row-name" style="display: flex; align-items: center">
              <div
                style="
                  font-size: 16px;
                  font-weight: 500;
                  color: #122073;
                  margin-bottom: 12px;
                "
              >
                科室
              </div>
              <img
                style="margin-bottom: 12px"
                src="@/assets/image/星号.png"
                alt=""
              />
            </div>
            <el-select
              v-model="departmentVal"
              placeholder="请选择"
              @change="selectDepartment"
            >
              <el-option
                v-for="item in departmentOptions"
                :key="item.ItemValue"
                :label="item.ItemName"
                :value="item.ItemValue"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>二级科室</span>
            <el-input
              placeholder="请输入"
              v-model="secondDepartmentVal"
            ></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>毕业学校</span>
            <el-input placeholder="请输入" v-model="schoolVal"></el-input>
          </el-col>
        </el-row>
        <el-row class="three-row">
          <el-col :span="6">
            <span>学历</span>
            <el-select v-model="educationVal" placeholder="请选择">
              <el-option
                v-for="item in educationOptions"
                :key="item.ItemValue"
                :label="item.ItemName"
                :value="item.ItemValue"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>学位</span>
            <el-select v-model="degreeVal" placeholder="请选择">
              <el-option
                v-for="item in degreeOptions"
                :key="item.ItemValue"
                :label="item.ItemName"
                :value="item.ItemValue"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>职称</span>
            <el-input placeholder="请输入" v-model="jobTitleVal"></el-input>
          </el-col>
        </el-row>
        <el-row class="four-row">
          <el-col :span="6">
            <span>职务</span>
            <el-input placeholder="请输入" v-model="jobVal"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>参加工作时间</span>
            <el-date-picker
              style="width: 100%"
              v-model="dateVal"
              type="date"
              format="yyyy-MM-dd"
              :clearable="false"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="6" :offset="1">
            <span>带教年限</span>
            <el-input placeholder="请输入" v-model="yearsVal"></el-input>
          </el-col>
        </el-row>
        <el-row class="five-row">
          <el-col :span="6">
            <span>院区</span>
            <el-input placeholder="请输入" v-model="courtyardVal"></el-input>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
    <el-row class="profile-footer-row">
      <!-- <div class="cancel">取消</div> -->
      <div class="save" @click="userInfoEdit">保存</div>
    </el-row>
  </div>
</template>
<script>
import {
  getUserInformation,
  getItemDetail,
  getHospital,
  postUserEdit,
} from "api/teacher-api/profile";
import { timeFormatSeconds } from "utils/timeFormatSeconds";

export default {
  name: "PersonInformation",
  data() {
    return {
      loading: false,
      nameVal: "",
      hospitalVal: "",
      hospitalName: "",
      hospitalOptions: [],
      courtyardVal: "",
      schoolVal: "",
      degreeVal: "",
      degreeOptions: [],
      yearsVal: "",
      phoneVal: "",
      dateVal: "",
      departmentVal: "",
      departmentName: "",
      departmentOptions: [],
      secondDepartmentVal: "",
      educationVal: "",
      educationOptions: [],
      jobTitleVal: "",
      jobVal: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
      value: "",
    };
  },
  created() {
    this.userInformation();
    this.phoneVal = window.sessionStorage.getItem("useraccount");
    this.departmentList();
    this.educationList();
    this.degreeList();
    this.hospitalList();
  },
  methods: {
    /* 获取科室列表 */
    departmentList() {
      let params = {
        itemCode: "sxks",
      };
      getItemDetail(params).then((res) => {
        console.log(res);
        this.departmentOptions = res;
      });
    },
    /* 学历列表 */
    educationList() {
      let params = {
        itemCode: "xl",
      };
      getItemDetail(params).then((res) => {
        console.log(res);
        this.educationOptions = res;
      });
    },
    /* 学位列表 */
    degreeList() {
      let params = {
        itemCode: "xw",
      };
      getItemDetail(params).then((res) => {
        console.log(res);
        this.degreeOptions = res;
      });
    },
    /* 医院列表 */
    hospitalList() {
      let params = {
        type: 2,
      };
      getHospital(params).then((res) => {
        console.log(res);
        this.hospitalOptions = res;
      });
    },
    /* 获取用户信息 */
    userInformation() {
      this.loading = true;
      let params = {
        keyValue: window.sessionStorage.getItem("userid"),
        type: 2,
      };
      getUserInformation(params).then((res) => {
        console.log(res);
        this.loading = false;
        if (res.code == 100) {
          this.hospitalVal = res.data.F_yyId;
          this.courtyardVal = res.data.F_yyyq;
          this.phoneVal = res.data.F_tel;
          this.departmentVal = res.data.F_dksId;
          this.secondDepartmentVal = res.data.F_xksName;
          this.schoolVal = res.data.F_byyx;
          this.educationVal = res.data.F_xl;
          this.degreeVal = res.data.F_xw;
          this.jobTitleVal = res.data.F_zc;
          this.jobVal = res.data.F_zw;
          this.dateVal = res.data.F_cjgzTime;
          this.yearsVal = res.data.F_djnx;
          this.nameVal = res.data.F_UserName;
        } else {
          this.$message({
            message: "请求错误",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* 修改用户信息 */
    userInfoEdit() {
      if (this.hospitalVal == "") {
        this.$message({
          message: "请选择所在医院！",
          type: "warning",
          center: true,
        });
      } else if (this.nameVal == "") {
        this.$message({
          message: "请输入姓名！",
          type: "warning",
          center: true,
        });
      } else if (this.departmentVal == "") {
        this.$message({
          message: "请选择科室！",
          type: "warning",
          center: true,
        });
      } else {
        this.loading = true;
        let data = {
          keyValue: window.sessionStorage.getItem("userid"),
          postData: {
            F_tel: window.sessionStorage.getItem("useraccount"),
            F_UserName: this.nameVal,
            F_dksId: this.departmentVal,
            F_dksName: this.departmentName,
            F_yyId: this.hospitalVal,
            F_yyName: this.hospitalName,
            F_yyyq: this.courtyardVal,
            F_byyx: this.schoolVal,
            F_cjgzTime: timeFormatSeconds(0, this.dateVal),
            F_djnx: this.yearsVal,
            F_xksName: this.secondDepartmentVal,
            F_xl: this.educationVal,
            F_xw: this.degreeVal,
            F_zc: this.jobTitleVal,
            F_zw: this.jobVal,
          },
        };
        console.log(data);
        postUserEdit(data).then((res) => {
          console.log(res);
          this.loading = false;
          if (res.code == 100) {
            this.$message({
              message: "保存成功！",
              type: "success",
              center: true,
            });
            this.userInformation();
          } else {
            this.$message({
              message: "保存失败！",
              type: "error",
              center: true,
            });
          }
        });
      }
    },
    selectDepartment(id) {
      this.departmentName = this.departmentOptions.find(
        (item) => item.ItemValue == id
      ).ItemName;
      console.log(this.departmentName);
    },
    selectHospital(id) {
      this.hospitalName = this.hospitalOptions.find(
        (item) => item.id == id
      ).text;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-input__prefix {
  right: 5px;
  left: unset;
}

/deep/.el-input--prefix .el-input__inner {
  padding-left: 15px;
}
/deep/ .el-icon-date {
  background: url("../../../../assets/image/组 1234.png") center no-repeat;
  background-size: 20px 20px;
}
/deep/ .el-icon-date:before {
  content: "";
  font-size: 16px;
  visibility: hidden;
}

.container {
  height: calc(100vh - 89px);
  .profile-title-card {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: 800;
    color: #122073;
    opacity: 1;
    padding-left: 30px;
    box-sizing: border-box;
    margin-top: 5px;
  }
  .profile-content-card {
    height: 700px;
    margin: 14px 20px 0px;
    padding: 0;
    .header-row {
      height: 49px;
      padding: 0 29px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
    .first-row,
    .second-row,
    .three-row,
    .four-row,
    .five-row {
      margin: 30px 50px;
      .el-col {
        display: flex;
        flex-direction: column;
        span {
          display: inline-block;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #122073;
          opacity: 1;
          margin-bottom: 12px;
        }
      }
    }
  }
  .profile-footer-row {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 74px;
    width: calc(100% - 334px);
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #ffffff;
    .cancel,
    .save {
      width: 228px;
      height: 50px;
      opacity: 1;
      border-radius: 4px;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .cancel {
      background: #d0d2e3;
      margin-right: 12px;
    }
    .save {
      background: #5864ff;
      margin-right: 24px;
    }
  }
}
</style>