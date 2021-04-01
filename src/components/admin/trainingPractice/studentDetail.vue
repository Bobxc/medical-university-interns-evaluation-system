<template>
  <div class="container" v-loading="loading">
    <el-card class="detail-title-card">
      <div class="title-left">
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="detail-title">个人信息</div>
        <div class="detail-content">
          <span>姓名：{{ userInfomation.username }}</span>
          <span>学院：{{ userInfomation.university }}</span>
          <span>专业：{{ userInfomation.profession }}</span>
          <span>年级：{{ userInfomation.grade }}</span>
          <span>班级：{{ userInfomation.class }}</span>
          <span>学号：{{ userInfomation.xh }}</span>
        </div>
      </div>
    </el-card>
    <div style="height: calc(100vh - 300px); overflow: auto; margin: 20px">
      <!-- 基本信息 -->
      <el-card class="basic-information-card">
        <el-row class="basic-information-header-row"> 基本信息 </el-row>
        <el-row class="basic-information-body-row">
          <el-col :span="5"
            ><span>性别：</span><span v-if="userInfomation.sex == 1">男</span>
            <span v-if="userInfomation.sex == 2">女</span></el-col
          >
          <el-col :span="5" :offset="1"
            ><span>籍贯：</span
            ><span>{{ provinceName }}{{ cityName }}{{ areaName }}</span></el-col
          >
          <el-col :span="5" :offset="1"
            ><span>政治面貌：</span><span>{{ zzmmName }}</span></el-col
          >
        </el-row>
        <el-row class="basic-information-body-row">
          <el-col :span="5"
            ><span>实习医院：</span
            ><span>{{ userInfomation.hospital }}</span></el-col
          >
          <el-col :span="5" :offset="1"
            ><span>是否班干部：</span
            ><span v-if="userInfomation.isbgb == 1">是</span>
            <span v-if="userInfomation.isbgb == 0">否</span></el-col
          >
          <el-col :span="5" :offset="1"
            ><span>联系方式：</span
            ><span>{{ userInfomation.tel }}</span></el-col
          >
        </el-row>
      </el-card>
      <!-- 荣誉证书 -->
      <el-card class="honor-certificate-card">
        <el-row class="honor-certificate-header-row"> 荣誉证书 </el-row>
        <el-row
          class="honor-certificate-body-row"
          v-for="(item, index) in honorInfo"
          :key="index"
        >
          <el-col :span="6"
            ><span>证书名称：</span><span>{{ item.F_zsname }}</span></el-col
          >
          <el-col :span="4" :offset="1"
            ><span>颁发单位：</span><span>{{ item.F_bfdw }}</span></el-col
          >
        </el-row>
      </el-card>
      <!-- 家庭情况 -->
      <el-card class="family-situation-card">
        <el-row class="family-situation-header-row"> 家庭情况 </el-row>
        <el-row class="family-situation-address-row"
          ><el-col
            ><span>家庭住址：</span
            ><span>{{ userInfomation.address }}</span></el-col
          ></el-row
        >
        <el-row
          class="family-situation-parents-row"
          v-for="(item, index) in familyInfo"
          :key="index"
        >
          <el-col :span="2"
            ><span>关系：</span><span>{{ item.F_gx }}</span></el-col
          >
          <el-col :span="2" :offset="1"
            ><span>姓名：</span><span>{{ item.F_xm }}</span></el-col
          >
          <el-col :span="4" :offset="1"
            ><span>联系方式：</span><span></span>{{ item.F_lxfs }}</el-col
          >
        </el-row>
      </el-card>
      <!-- 个人兴趣 -->
      <el-card class="personal-interest-card">
        <el-row class="personal-interest-header-row"> 个人兴趣 </el-row>
        <el-row class="personal-interest-body-row">
          {{
            userInfomation.interest !== null ? userInfomation.interest : "无"
          }}
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import {
  getStudentInfo,
  getArea,
  getZzmm,
} from "api/teacher-api/studentPracticeTraining";
export default {
  name: "StudentDetail",
  data() {
    return {
      loading: false,
      f_suserid: "",
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      areaCode: "",
      areaName: "",
      zzmmName: "",
      zzmmListData: [],
      userInfomation: {},
      provinceData: [],
      familyInfo: [],
      honorInfo: [],
    };
  },
  created() {
    this.f_suserid = this.$route.query.f_suserid;
    this.getProvince();
    this.getZzmmData();
    // this.getStudentInfoData();
  },
  methods: {
    /* 获取省 */
    getProvince() {
      let params = {
        parentid: 0,
        keyword: "",
      };
      getArea(params).then((res) => {
        console.log(res);
        this.provinceData = res;
        this.getStudentInfoData();
      });
    },
    /* 获取政治面貌列表 */
    getZzmmData() {
      let params = {
        itemCode: "zzmm",
      };
      getZzmm(params).then((res) => {
        console.log(res);
        this.zzmmListData = res;
      });
    },
    getStudentInfoData() {
      this.loading = true;
      let params = {
        keyValue: this.f_suserid,
        type: 1,
      };
      getStudentInfo(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.userInfomation.username = res.data.mainInfo.F_UserName;
          this.userInfomation.university = res.data.mainInfo.F_xyName;
          this.userInfomation.profession = res.data.mainInfo.F_major;
          this.userInfomation.grade = res.data.mainInfo.F_year;
          this.userInfomation.class = res.data.mainInfo.F_Class;
          this.userInfomation.xh = res.data.mainInfo.F_xh;
          this.userInfomation.sex = res.data.mainInfo.F_xb;
          this.userInfomation.zzmm = res.data.mainInfo.F_zzmm;
          this.userInfomation.hospital = res.data.mainInfo.F_sxyy;
          this.userInfomation.isbgb = res.data.mainInfo.F_isbgb;
          this.userInfomation.tel = res.data.mainInfo.F_tel;
          this.userInfomation.interest = res.data.mainInfo.F_Grxq;
          this.userInfomation.address = res.data.mainInfo.F_jtdz;
          this.provinceCode = res.data.mainInfo.F_jgs;
          this.cityCode = res.data.mainInfo.F_jgshi;
          this.areaCode = res.data.mainInfo.F_jgx;
          this.honorInfo = res.data.ryzsInfo;
          this.familyInfo = res.data.jtcyInfo;

          if (this.userInfomation.zzmm !== null) {
            this.zzmmName = this.zzmmListData.find(
              (item) => item.ItemValue == this.userInfomation.zzmm
            ).ItemName;
          } else {
            this.zzmmName = "";
          }
          if (
            this.provinceCode !== null &&
            this.cityCode !== null &&
            this.areaCode !== null
          ) {
            this.provinceName = this.provinceData.find(
              (item) => item.F_AreaCode == this.provinceCode
            ).F_AreaName;
            console.log(this.provinceName);
            let params = {
              parentId: this.provinceCode,
              keyword: "",
            };
            getArea(params).then((res) => {
              console.log(res);
              this.cityName = res.find(
                (item) => item.F_AreaCode == this.cityCode
              ).F_AreaName;
              let params = {
                parentId: this.cityCode,
                keyword: "",
              };
              getArea(params).then((res) => {
                this.areaName = res.find(
                  (item) => item.F_AreaCode == this.areaCode
                ).F_AreaName;
              });
              this.loading = false;
            });
          } else {
            this.provinceName = "";
            this.cityName = "";
            this.areaName = "";
            this.loading = false;
          }
        } else {
          this.loading = false;
          this.$message({
            message: res.message,
            type: "error",
            center: true,
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  .detail-title-card {
    height: 147px;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    /deep/.el-card__body {
      width: 100%;
      height: 100%;
      display: flex;
    }
    /deep/.el-breadcrumb {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
    }
    /deep/.el-breadcrumb__inner {
      color: #122073;
    }
    .title-left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .detail-title {
        font-size: 20px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .detail-content {
        display: flex;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
        span {
          margin-right: 74px;
        }
      }
    }
    .title-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .edit-btn {
        width: 84px;
        height: 42px;
        background: #5864ff;
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .basic-information-card {
    height: 256px;
    margin-bottom: 14px;
    box-sizing: border-box;
    .basic-information-header-row {
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
    .basic-information-body-row {
      margin-left: 52px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #122073;
      opacity: 1;
      margin-bottom: 26px;
    }
  }
  .honor-certificate-card {
    // height: 146px;
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
    .honor-certificate-body-row {
      margin-left: 52px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #122073;
      opacity: 1;
      margin-bottom: 26px;
    }
  }
  .family-situation-card {
    margin-bottom: 14px;
    padding-bottom: 20px;
    .family-situation-header-row {
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
    .family-situation-address-row {
      margin-left: 52px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #122073;
      opacity: 1;
      margin-bottom: 26px;
    }
    .family-situation-parents-row {
      margin-left: 52px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #122073;
      opacity: 1;
      margin-bottom: 26px;
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
    .personal-interest-body-row {
      margin-left: 52px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #122073;
      opacity: 1;
      margin-bottom: 26px;
    }
  }
}
</style>