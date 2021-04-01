<template>
  <div class="profile-container" v-loading="loading">
    <el-card class="profile-title-card" shadow="never"> 个人信息 </el-card>
    <div class="profile-content">
      <!-- 基本信息 -->
      <el-card
        class="basic-information-card"
        shadow="never"
        :body-style="{ padding: '0px' }"
      >
        <el-row class="profile-header-row"> 基本信息 </el-row>
        <el-row class="profile-row">
          <el-col :span="6">
            <div class="row-name" style="display: flex; align-items: center">
              <div>个人联系方式</div>
              <img src="@/assets/image/星号.png" alt="" />
            </div>
            <el-input
              v-model="phoneVal"
              placeholder="请输入"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div>姓名</div>
              <img src="@/assets/image/星号.png" alt="" />
            </div>
            <el-input v-model="nameVal" placeholder="请输入"></el-input>
          </el-col>

          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div>学校</div>
              <img src="@/assets/image/星号.png" alt="" />
            </div>
            <!-- <el-input v-model="classVal"></el-input> -->
            <el-select
              v-model="universityVal"
              placeholder="请选择学校"
              @change="selectUniversity"
              style="width: 100%"
            >
              <el-option
                v-for="item in universityOptions"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="profile-row">
          <el-col :span="6">
            <div class="row-name" style="display: flex; align-items: center">
              <div>年级</div>
              <img src="@/assets/image/星号.png" alt="" />
            </div>
            <!-- <el-input v-model="gradeVal" placeholder="请输入"></el-input> -->
            <el-select
              v-model="gradeVal"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div>班级</div>
              <img src="@/assets/image/星号.png" alt="" />
            </div>
            <el-input
              v-model="classVal"
              type="number"
              placeholder="请输入"
            ></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div>专业</div>
              <img src="@/assets/image/星号.png" alt="" />
            </div>
            <el-input v-model="professionVal" placeholder="请输入"></el-input>
          </el-col>
        </el-row>
        <el-row class="profile-row">
          <el-col :span="6">
            <div class="row-name">辅导员</div>
            <el-input v-model="instructorVal" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div>性别</div>
            </div>
            <el-select
              v-model="sixVal"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in sixOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name" style="display: flex; align-items: center">
              <div>籍贯</div>
            </div>
            <el-cascader
              :options="homeTownOptions"
              clearable
              @change="selectHomeTown"
              v-model="addressInfo"
              style="width: 100%"
            ></el-cascader>
          </el-col>
        </el-row>
        <el-row class="profile-row">
          <el-col :span="6">
            <div class="row-name">学号</div>
            <el-input v-model="studentIDVal" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name">主实习医院</div>
            <el-select
              v-model="hospitalVal"
              placeholder="请选择"
              @change="selectHospital"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in hospitalOptions"
                :key="index"
                :label="item.text"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name">政治面貌</div>
            <el-select
              v-model="policitalStatusVal"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in policitalStatusOptions"
                :key="item.ItemValue"
                :label="item.ItemName"
                :value="item.ItemValue"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="profile-row">
          <el-col :span="6">
            <div class="row-name">是否班干部（学校）</div>
            <el-radio-group
              v-model="classLeaderVal"
              style="height: 40px; line-height: 40px"
            >
              <el-radio :label="1" style="margin-right: 48px">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="row-name">是否实习组长（医院）</div>
            <el-radio-group
              v-model="groupLeaderVal"
              style="height: 40px; line-height: 40px"
            >
              <el-radio :label="1" style="margin-right: 48px">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-card>
      <!-- 荣誉证书 -->
      <el-card
        class="honor-certificate-card"
        shadow="never"
        :body-style="{ padding: '0px' }"
      >
        <el-row class="honor-certificate-header-row"> 荣誉证书 </el-row>
        <el-row style="padding-left: 50px; margin-bottom: 12px">
          <el-col
            :span="6"
            class="relationship-col"
            style="display: flex; align-items: center"
            ><div>证书名称</div>
          </el-col>
          <el-col
            :span="6"
            class="name-col"
            style="display: flex; align-items: center"
            :offset="1"
            ><div>颁发单位</div>
          </el-col>
        </el-row>

        <el-row
          style="padding-left: 50px; margin-bottom: 20px"
          v-for="(item, index) in honorData"
          :key="index"
          type="flex"
          align="middle"
        >
          <el-col :span="6"
            ><el-input
              placeholder="请输入"
              v-model="honorData[index].F_zsname"
            ></el-input
          ></el-col>
          <el-col :span="6" :offset="1"
            ><el-input
              placeholder="请输入"
              v-model="honorData[index].F_bfdw"
            ></el-input
          ></el-col>
          <el-col :span="6" :offset="1"
            ><img
              src="@/assets/image/删 除 (1).png"
              style="cursor: pointer"
              @click="deleteHonor(index, item)"
              alt=""
          /></el-col>
        </el-row>
        <!-- 添加证书 -->
        <div class="add-certificate-btn" @click="addHonor">
          <div style="margin-right: 5px">添加证书</div>
          <img src="@/assets/image/组 1156.png" alt="" />
        </div>
        <!-- 家庭住址 -->
        <el-row style="padding-left: 50px; margin-bottom: 20px">
          <el-col style="width: 40%; margin-right: 48px">
            <div
              class="honor-certificate-row-name"
              style="display: flex; align-items: center"
            >
              <div>家庭住址</div>
            </div>
            <el-input v-model="addressVal" placeholder="请输入"></el-input>
          </el-col>
        </el-row>
        <!-- 关系、姓名、联系方式 -->
        <el-row style="padding-left: 50px; margin-bottom: 40px">
          <el-row style="margin-bottom: 12px">
            <el-col
              :span="6"
              class="relationship-col"
              style="display: flex; align-items: center"
              ><div>关系</div>
            </el-col>
            <el-col
              :span="6"
              class="name-col"
              style="display: flex; align-items: center"
              :offset="1"
              ><div>姓名</div>
            </el-col>
            <el-col
              :span="6"
              class="tel-col"
              style="display: flex; align-items: center"
              :offset="1"
              ><div>联系方式</div>
            </el-col>
          </el-row>
          <el-row
            style="margin-bottom: 20px"
            v-for="(item, index) in familyPeopleData"
            :key="index"
            type="flex"
            align="middle"
          >
            <el-col :span="6"
              ><el-input
                placeholder="请输入"
                v-model="familyPeopleData[index].F_gx"
              ></el-input
            ></el-col>
            <el-col :span="6" :offset="1"
              ><el-input
                placeholder="请输入"
                v-model="familyPeopleData[index].F_xm"
              ></el-input
            ></el-col>
            <el-col :span="6" :offset="1"
              ><el-input
                placeholder="请输入"
                v-model="familyPeopleData[index].F_lxfs"
              ></el-input
            ></el-col>
            <el-col :span="3" :offset="1"
              ><img
                src="@/assets/image/删 除 (1).png"
                style="cursor: pointer"
                @click="deleteFamilyPeople(index, item)"
                alt=""
            /></el-col>
          </el-row>
          <div class="add-family-people" @click="addFamilyPeopel">
            <div style="margin-right: 5px">添加家庭成员</div>
            <img src="@/assets/image/组 1156.png" alt="" />
          </div>
        </el-row>
      </el-card>
      <!-- 个人兴趣 -->
      <el-card
        class="personal-interest-card"
        shadow="never"
        :body-style="{ padding: '0px' }"
      >
        <el-row class="personal-interest-header-row"> 个人兴趣 </el-row>
        <el-row class="personal-interest-input-row">
          <el-input
            type="textarea"
            v-model="personalInterestVal"
            :rows="6"
            placeholder="请输入"
          ></el-input>
        </el-row>
      </el-card>
    </div>
    <div class="footer">
      <div class="cancel" @click="cancel">取消</div>
      <div class="save" @click="save">提交</div>
    </div>
    <!-- 提交成功提示 -->
    <div class="success-dialog" v-if="successDialogShow">
      <div class="success-dialog-content">
        <img src="@/assets/image/组 1810.png" alt="" />
        <span>提交成功</span>
      </div>
    </div>
    <!-- 提交失败提示 -->
    <div class="default-dialog" v-if="defaultDialogShow">
      <div class="default-dialog-content">
        <img src="@/assets/image/组 18101.png" alt="" />
        <span>提交失败</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getUniversity,
  getZzmm,
  postStudentInfo,
  getUserInfo,
} from "api/student-api/profile";
import citys from "utils/citys.json";
export default {
  name: "Profile",
  data() {
    return {
      loading: false,
      successDialogShow: false,
      defaultDialogShow: false,
      nameVal: "",
      professionVal: "",
      gradeVal: "",
      gradeOptions: [
        {
          label: "2011级",
          value: 2011,
        },
        {
          label: "2012级",
          value: 2012,
        },
        {
          label: "2013级",
          value: 2013,
        },
        {
          label: "2014级",
          value: 2014,
        },
        {
          label: "2015级",
          value: 2015,
        },
        {
          label: "2016级",
          value: 2016,
        },
        {
          label: "2017级",
          value: 2017,
        },
        {
          label: "2018级",
          value: 2018,
        },
        {
          label: "2019级",
          value: 2019,
        },
        {
          label: "2020级",
          value: 2020,
        },
        {
          label: "2021级",
          value: 2021,
        },
        {
          label: "2022级",
          value: 2022,
        },
        {
          label: "2023级",
          value: 2023,
        },
        {
          label: "2024级",
          value: 2024,
        },
      ],
      classVal: "",
      instructorVal: "",
      studentIDVal: "",
      phoneVal: "",
      classLeaderVal: 1,
      groupLeaderVal: 1,
      personalInterestVal: "",
      certificateNameVal: "",
      issuer: "",
      addressVal: "",
      sixVal: "",
      sixOptions: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      homeTownVal: "",
      homeTownOptions: [],
      areaCode: [],
      hospitalVal: "",
      hospitalOptions: [],
      hospitalName: "",
      policitalStatusVal: "",
      policitalStatusOptions: [],
      universityVal: "",
      universityName: "",
      universityOptions: [],
      familyPeopleData: [
        {
          F_gx: "",
          F_xm: "",
          F_lxfs: "",
        },
      ],
      honorData: [
        {
          F_zsname: "",
          F_bfdw: "",
        },
      ],
      addressInfo: [],
    };
  },
  created() {
    this.phoneVal = window.sessionStorage.getItem("useraccount");
    this.getUniversityData();
    this.getHospitalData();
    this.getZzmmData();
    console.log(citys);
    this.homeTownOptions = citys;
    this.userInfo();
  },
  methods: {
    /* 获取学生信息 */
    userInfo() {
      let params = {
        keyValue: window.sessionStorage.getItem("userid"),
        type: 1,
      };
      getUserInfo(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: res.message,
            type: "error",
            center: true,
          });
        } else {
          console.log(res.data);
          let date = new Date();
          let currentYear = date.getFullYear();
          console.log(currentYear);
          this.nameVal = res.data.mainInfo.F_UserName;
          this.universityVal = res.data.mainInfo.F_xyId;
          this.professionVal = res.data.mainInfo.F_major;
          this.gradeVal =
            res.data.mainInfo.F_year !== null
              ? Number(res.data.mainInfo.F_year)
              : Number(currentYear);
          this.classVal = res.data.mainInfo.F_Class;
          this.studentIDVal = res.data.mainInfo.F_xh;
          this.sixVal = res.data.mainInfo.F_xb;
          this.policitalStatusVal = res.data.mainInfo.F_zzmm;
          this.hospitalVal = res.data.mainInfo.F_sxyy;
          this.classLeaderVal = Number(res.data.mainInfo.F_isbgb);
          this.groupLeaderVal = Number(res.data.mainInfo.F_iszz);
          // this.tel = res.data.mainInfo.F_tel;
          this.instructorVal = res.data.mainInfo.F_fdy;
          this.personalInterestVal = res.data.mainInfo.F_Grxq;
          this.addressVal = res.data.mainInfo.F_jtdz;
          this.hospitalName = this.hospitalVal;
          this.honorData = res.data.ryzsInfo.map((item) => ({
            F_zsname: item.F_zsname,
            F_bfdw: item.F_bfdw,
          }));
          this.familyPeopleData = res.data.jtcyInfo.map((item) => ({
            F_gx: item.F_gx,
            F_xm: item.F_xm,
            F_lxfs: item.F_lxfs,
          }));
          this.addressInfo = [
            res.data.mainInfo.F_jgs,
            res.data.mainInfo.F_jgshi,
            res.data.mainInfo.F_jgx,
          ];
        }
      });
    },
    /* 学校列表 */
    getUniversityData() {
      let params = {
        type: 1,
      };
      getUniversity(params).then((res) => {
        console.log(res);
        this.universityOptions = res;
      });
    },
    /* 医院列表 */
    getHospitalData() {
      let params = {
        type: 2,
      };
      getUniversity(params).then((res) => {
        console.log(res);
        this.hospitalOptions = res;
      });
    },
    /* 政治面貌 */
    getZzmmData() {
      let params = {
        itemCode: "zzmm",
      };
      getZzmm(params).then((res) => {
        console.log(res);
        this.policitalStatusOptions = res;
      });
    },
    /* 选择学校 */
    selectUniversity(id) {
      console.log(id);
      this.universityName = this.universityOptions.find((item) => {
        return item.id == id;
      }).text;
    },
    /* 选择医院 */
    selectHospital(id) {
      console.log(id);
      this.hospitalName = this.hospitalOptions.find((item) => {
        return item.id == id;
      }).text;
      console.log(this.hospitalName);
    },
    /* 选择省市区 */
    selectHomeTown(params) {
      console.log(params);
      this.areaCode = params;
    },
    save() {
      if (this.nameVal == "") {
        this.$message({
          message: "请输入姓名！",
          type: "warning",
          center: true,
        });
      } else if (this.universityVal == "") {
        this.$message({
          message: "请选择学校！",
          type: "warning",
          center: true,
        });
      } else if (this.gradeVal == "") {
        this.$message({
          message: "请输入年级！",
          type: "warning",
          center: true,
        });
      } else if (this.classVal == "") {
        this.$message({
          message: "请输入班级！",
          type: "warning",
          center: true,
        });
      } else if (this.professionVal == "") {
        this.$message({
          message: "请输入专业！",
          type: "warning",
          center: true,
        });
      } else {
        this.loading = true;
        let data = {
          keyValue: window.sessionStorage.getItem("userid"),
          postData: {
            F_tel: this.phoneVal,
            F_UserName: this.nameVal,
            F_xyId: this.universityVal,
            F_xyName: this.universityName,
            F_Class: this.classVal,
            F_Grxq: this.personalInterestVal,
            F_fdy: this.instructorVal,
            F_isbgb: this.classLeaderVal,
            F_iszz: this.groupLeaderVal,
            /* F_jgs: this.areaCode[0],
            F_jgshi: this.areaCode[1],
            F_jgx: this.areaCode[2], */
            F_jgs: this.addressInfo[0],
            F_jgshi: this.addressInfo[1],
            F_jgx: this.addressInfo[2],
            F_jtdz: this.addressVal,
            F_major: this.professionVal,
            F_sxyy: this.hospitalName,
            F_xb: this.sixVal,
            F_xh: this.studentIDVal,
            F_year: this.gradeVal,
            F_zzmm: this.policitalStatusVal,
          },
          ryzs: this.honorData,
          jtcy: this.familyPeopleData,
        };
        console.log(data);
        postStudentInfo(data).then((res) => {
          console.log(res);
          if (res.code == 100) {
            this.loading = false;
            // this.successDialogShow = true;
            this.$message({
              message: "保存成功！",
              type: "success",
              center: true,
            });
            setTimeout(() => {
              this.$router.push({
                path: "/student/profile/index",
              });
              // this.successDialogShow = false;
              // this.$router.push("/profile/detail");
            }, 1000);
          } else {
            this.loading = false;
            this.$message({
              message: "保存失败！",
              type: "error",
              center: true,
            });
            // this.defaultDialogShow = true;
            // setTimeout(() => {
            //   this.successDialogShow = false;
            //   this.$router.push("/profile/detail");
            // }, 1000);
          }
        });
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    addFamilyPeopel() {
      this.familyPeopleData.push({
        F_gx: "",
        F_xm: "",
        F_lxfs: "",
      });
    },
    addHonor() {
      this.honorData.push({
        F_zsname: "",
        F_bfdw: "",
      });
    },
    deleteHonor(index, item) {
      this.honorData.splice(index, 1);
    },
    deleteFamilyPeople(index, item) {
      this.familyPeopleData.splice(index, 1);
    },
  },
};
</script>
<style lang="less" scoped>
.profile-container {
  .profile-title-card {
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
  .profile-content {
    height: calc(100vh - 303px);
    overflow: auto;
    margin: 20px;
    .basic-information-card {
      // height: 550px;
      margin-bottom: 14px;
      .profile-header-row {
        height: 49px;
        display: flex;
        align-items: center;
        padding-left: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .profile-row {
        margin-left: 50px;
        margin-bottom: 30px;
        .row-name {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 500;
          color: #122073;
          opacity: 1;
          margin-bottom: 12px;
        }
      }
    }
    .honor-certificate-card {
      margin-bottom: 14px;
      .honor-certificate-header-row {
        height: 49px;
        display: flex;
        align-items: center;
        padding-left: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .honor-certificate-row-name {
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #122073;
        opacity: 1;
        margin-bottom: 12px;
      }
      .add-certificate-btn {
        width: 162px;
        height: 42px;
        background: #ffffff;
        border: 1px solid #5864ff;
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 500;
        margin-left: 50px;
        margin-bottom: 20px;
        color: #5864ff;
        cursor: pointer;
      }
      .relationship-col,
      .name-col,
      .tel-col {
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #122073;
        opacity: 1;
      }
      .add-family-people {
        width: 162px;
        height: 42px;
        background: #ffffff;
        border: 1px solid #5864ff;
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #5864ff;
        cursor: pointer;
      }
    }
    .personal-interest-card {
      margin-bottom: 14px;
      .personal-interest-header-row {
        height: 49px;
        display: flex;
        align-items: center;
        padding-left: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .personal-interest-input-row {
        width: 57%;
        margin-left: 49px;
        margin-bottom: 74px;
        /deep/.el-textarea__inner {
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        }
      }
    }
  }
  .footer {
    height: 74px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    padding-right: 20px;
    .cancel,
    .save {
      width: 228px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      border-radius: 4px;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
    }
    .cancel {
      background: #d0d2e3;
    }
    .save {
      background: #5864ff;
      margin-left: 16px;
    }
  }
  .success-dialog,
  .default-dialog {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
    box-sizing: border-box;
    .success-dialog-content,
    .default-dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-bottom: 20px;
      }
      span {
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>