<template>
  <div class="container">
    <!-- assessment -->
    <el-card class="assessment-title-card">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item>一级菜单</el-breadcrumb-item>
        <el-breadcrumb-item>二级菜单</el-breadcrumb-item>
        <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="assessment-name">出科评定</div>
    </el-card>
    <el-card class="assessment-content-card">
      <div class="box" @click="toDetail">
        <img src="@/assets/image/组 1603.png" alt="" />
        <div>出科评定</div>
        <div>{{ f_djpj == 1 ? "已评" : "未评" }}</div>
      </div>
      <!-- <div class="add-box" @click="$router.push('/teacher/assessmentedit')">
        <img src="@/assets/image/组 11562.png" alt="" />
        <div>新增出科评定</div>
      </div> -->
    </el-card>
  </div>
</template>
<script>
import {
  getSxList,
  getCheckInfo,
} from "api/teacher-api/studentPracticeTraining";

export default {
  name: "Assessment",
  data() {
    return {
      f_suserid: "",
      f_recordeid: "",
      f_djpj: "",
      f_id: "",
    };
  },
  created() {
    this.f_recordeid = this.$route.query.f_id;
    this.f_suserid = this.$route.query.f_suserid;
    console.log(this.f_recordeid);
    // this.sxList();
    this.checkInfoData();
  },
  methods: {
    // /* 获取实习记录 */
    checkInfoData() {
      let params = {
        keyValue: this.f_recordeid,
        type: 1,
        userid: this.f_suserid,
      };
      getCheckInfo(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.f_djpj = res.data[0].f_djpj;
          this.f_id = res.data[0].f_id;
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    toDetail() {
      // $router.push('/teacher/assessmentdetail')
      if (this.f_djpj == 1) {
        // this.$router.push("/teacher/assessmentdetail");
        this.$router.push({
          path: "/teacher/assessmentdetail",
          query: {
            f_id: this.f_id,
          },
        });
      } else {
        this.$router.push({
          path: "/teacher/assessmentedit",
          query: {
            f_id: this.f_id,
          },
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-card__body {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.container {
  .assessment-title-card {
    height: 100px;
    margin-top: 5px;
    padding: 16px 20px;
    box-sizing: border-box;
    /deep/.el-breadcrumb__inner {
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: rgba(18, 32, 115, 0.5);
    }
    /deep/.el-card__body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .assessment-name {
        font-size: 20px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
    }
  }
  .assessment-content-card {
    height: calc(100vh - 260px);
    margin: 20px;
    padding: 48px 50px;
    box-sizing: border-box;
    .box {
      width: 196px;
      height: 210px;
      background: linear-gradient(180deg, #717bff 0%, #5864ff 100%);
      box-shadow: 0px 8px 15px rgba(88, 100, 255, 0.2);
      opacity: 1;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-right: 40px;
      :nth-child(2) {
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        opacity: 1;
        margin-top: 9px;
      }
      :nth-child(3) {
        width: 51px;
        height: 25px;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: rgba(255, 255, 255, 0.22);
        margin-top: 10px;
      }
    }
    .add-box {
      width: 196px;
      height: 210px;
      background: rgba(88, 100, 255, 0.1);
      border: 1px dotted #5864ff;
      opacity: 1;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      cursor: pointer;
      :nth-child(2) {
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #5864ff;
        opacity: 1;
      }
    }
  }
}
</style>