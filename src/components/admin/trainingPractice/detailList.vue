<template>
  <div class="container" v-loading="loading">
    <el-card class="detail-list-title-card">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/evateach' }"
          >一级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/evateach/edit' }"
          >二级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="detail-list-name">{{ mainInfo.F_UserName }}</div>
      <div class="detail-list-content">
        <span>学号：{{ mainInfo.F_xh }}</span>
        <span>级数：{{ mainInfo.F_year }}</span>
        <span>专业：{{ mainInfo.F_major }}</span>
        <span>班级：{{ mainInfo.F_Class }}</span>
        <span style="color: #5864ff; cursor: pointer" @click="toDetail"
          >查看更多 ></span
        >
      </div>
    </el-card>
    <el-card class="detail-list-content-card">
      <div class="box box1" @click="$router.push('/admin/training')">
        <div class="box-left">
          <img src="@/assets/image/组 1469.png" alt="" />
        </div>
        <div class="box-right">培训活动</div>
      </div>
      <div class="box box2" @click="toBaseicOperation">
        <div class="box-left">
          <img src="@/assets/image/组 1453.png" alt="" />
        </div>
        <div class="box-right">基础操作实习记录</div>
      </div>
      <div class="box box3" @click="toSpecialistOperation">
        <div class="box-left">
          <img src="@/assets/image/组 1476.png" alt="" />
        </div>
        <div class="box-right">各科室专科操作实习记录</div>
      </div>
      <div class="box box4" @click="toDiease">
        <div class="box-left">
          <img src="@/assets/image/组 1471.png" alt="" />
        </div>
        <div class="box-right">轮转期间学习病种及其例数记录</div>
      </div>
      <div class="box box5" @click="goDiagnosis">
        <div class="box-left">
          <img src="@/assets/image/组 1475.png" alt="" />
        </div>
        <div class="box-right">各科室诊疗操作实习记录</div>
      </div>
      <div class="box box6" @click="toSuggest">
        <div class="box-left">
          <img src="@/assets/image/组 2301.png" alt="" />
        </div>
        <div class="box-right">学生对带教的建议</div>
      </div>
      <div class="box box7" @click="toStudentCommentTeacher">
        <div class="box-left">
          <img src="@/assets/image/组 2053.png" alt="" />
        </div>
        <div class="box-right">学生评教</div>
      </div>
      <div class="box box8" @click="toAssess">
        <div class="box-left">
          <img src="@/assets/image/组 1473.png" alt="" />
        </div>
        <div class="box-right">出科评定</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getStudentInfo } from "api/admin-api/trainingPractice";

export default {
  name: "DetailList",
  data() {
    return {
      loading: false,
      // f_suserid: "",
      f_id: "",
      f_userid: "",
      f_recordeid: "",
      f_teachid: "",
      teachername: "",
      yyname: "",
      ksname: "",
      f_xks: "",

      mainInfo: {},
    };
  },
  created() {
    this.f_userid = this.$route.query.f_userid;
    this.f_id = this.$route.query.f_id;
    this.f_recordeid = this.$route.query.f_recordeid;
    this.f_teachid = this.$route.query.f_teachid;

    this.teachername = this.$route.query.teachername;
    this.yyname = this.$route.query.yyname;
    this.ksname = this.$route.query.ksname;
    this.f_xks = this.$route.query.f_xks;
    this.getStudentInfoData();
  },
  methods: {
    /* 获取学生信息 */
    getStudentInfoData() {
      // this.loading = true;
      let params = {
        keyValue: this.f_userid,
        type: 1,
      };
      console.log(params);
      getStudentInfo(params).then((res) => {
        console.log(res);
        this.loading = false;
        if (res.code == 100) {
          this.mainInfo = res.data.mainInfo;
        } else {
          this.$message({
            message: "获取数据失败",
            type: "error",
            center: true,
          });
        }
      });
    },
    toDetail() {
      this.$router.push({
        path: "/admin/studentdetail",
        query: {
          f_suserid: this.f_userid,
        },
      });
    },
    /* go基础操作实习记录 */
    toBaseicOperation() {
      this.$router.push({
        path: "/admin/basicope",
        query: {
          f_suserid: this.f_userid,
          f_id: this.f_id,
        },
      });
    },
    /* go各科室专科操作实习记录 */
    toSpecialistOperation() {
      this.$router.push({
        path: "/admin/specope",
        query: {
          f_suserid: this.f_userid,
          f_id: this.f_id,
          f_recordeid: this.f_recordeid,
        },
      });
    },
    /* go轮转期间学习病种及其例数记录 */
    toDiease() {
      this.$router.push({
        path: "/admin/disease",
        query: {
          f_suserid: this.f_userid,
          f_id: this.f_id,
          f_recordeid: this.f_recordeid,
        },
      });
    },
    /* go各科室诊疗操作实习记录 */
    goDiagnosis() {
      this.$router.push({
        path: "/admin/diagnosis",
        query: {
          f_suserid: this.f_userid,
          f_id: this.f_id,
          f_recordeid: this.f_recordeid,
        },
      });
    },
    /* go学生对带教的建议 */
    toSuggest() {
      this.$router.push({
        path: "/admin/sugtoteacher",
        query: {
          f_suserid: this.f_userid,
          f_recordeid: this.f_id,
          f_teachid: this.f_teachid,
        },
      });
    },
    /* 学生评教 */
    toStudentCommentTeacher() {
      this.$router.push({
        path: "/admin/sucomteadetail",
        query: {
          // f_suserid: this.f_userid,
          f_id: this.f_id,
          teachername: this.teachername,
          yyname: this.yyname,
          ksname: this.ksname,
          f_xks: this.f_xks,
        },
      });
    },
    /* go出科评定 */
    toAssess() {
      this.$router.push({
        path: "/admin/assessmentdetail",
        query: {
          // f_suserid: this.f_userid,
          f_id: this.f_id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-card__body {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.container {
  .detail-list-title-card {
    height: 147px;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
    /deep/.el-card__body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /deep/.el-breadcrumb {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
    }
    /deep/.el-breadcrumb__inner {
      color: #122073;
    }
    .detail-list-name {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .detail-list-content {
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
  .detail-list-content-card {
    height: calc(100vh - 300px);
    margin: 20px;
    padding: 43px 38px;
    box-sizing: border-box;
    display: flex;

    .box {
      width: 314px;
      height: 120px;
      background-size: 314px 120px;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      cursor: pointer;
      margin-right: 16px;
      margin-bottom: 30px;
      .box-left {
        width: 70px;
        height: 70px;
        opacity: 1;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 24px;
      }
      .box-right {
        width: 127px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        opacity: 1;
      }
    }
    .box1 {
      background: url("../../../assets/image/蒙版组 95.png") #8890ff;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #c9cdff 100%);
        box-shadow: 0px 8px 19px rgba(28, 44, 255, 0.2);
      }
      .box-right {
        text-shadow: 0px 6px 12px rgba(88, 100, 255, 0.3);
      }
    }
    .box2 {
      background: url("../../../assets/image/蒙版组 95(1).png") #27de9f;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #b7ffe6 100%);
        box-shadow: 0px 8px 19px rgba(23, 194, 135, 0.7);
      }
      .box-right {
        text-shadow: 0px 6px 12px rgba(8, 145, 98, 0.3);
      }
    }
    .box3 {
      background: url("../../../assets/image/蒙版组 95.png") #8890ff;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #c9cdff 100%);
        box-shadow: 0px 8px 19px rgba(28, 44, 255, 0.2);
      }
      .box-right {
        text-shadow: 0px 6px 12px rgba(88, 100, 255, 0.3);
      }
    }
    .box4 {
      background: url("../../../assets/image/蒙版组 98.png") #fdca00;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #ffeaaa 100%);
        box-shadow: 0px 8px 19px rgba(253, 190, 0, 0.45);
      }
      .box-right {
        text-shadow: 0px 6px 12px #fd8f00;
      }
    }
    .box5 {
      background: url("../../../assets/image/蒙版组 95.png") #8890ff;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #c9cdff 100%);
        box-shadow: 0px 8px 19px rgba(28, 44, 255, 0.2);
      }
      .box-right {
        text-shadow: 0px 6px 12px rgba(88, 100, 255, 0.3);
      }
    }
    .box6 {
      background: url("../../../assets/image/蒙版组 95(1).png") #27de9f;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #b7ffe6 100%);
        box-shadow: 0px 8px 19px rgba(23, 194, 135, 0.7);
      }
      .box-right {
        text-shadow: 0px 6px 12px rgba(8, 145, 98, 0.3);
      }
    }
    .box7 {
      background: url("../../../assets/image/蒙版组 98.png") #fdca00;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #ffeaaa 100%);
        box-shadow: 0px 8px 19px rgba(253, 190, 0, 0.45);
      }
      .box-right {
        text-shadow: 0px 6px 12px #fd8f00;
      }
    }
    .box8 {
      background: url("../../../assets/image/蒙版组 95(3).png") #ff6760;
      .box-left {
        background: linear-gradient(180deg, #ffffff 0%, #ffc9c7 100%);
        box-shadow: 0px 8px 19px rgba(255, 64, 68, 0.2);
      }
      .box-right {
        text-shadow: 0px 6px 12px rgba(255, 64, 68, 0.3);
      }
    }
  }
}
</style>