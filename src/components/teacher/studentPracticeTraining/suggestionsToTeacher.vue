<template>
  <div class="container" v-loading="loading">
    <el-card class="suggestion-to-teacher-title-card">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item>一级菜单</el-breadcrumb-item>
        <el-breadcrumb-item>二级菜单</el-breadcrumb-item>
        <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="suggestion-to-teacher-title">学生对带教的建议</div>
      <div class="suggestion-to-teacher-content">
        <span>提交时间：</span>
        <span>{{ f_createdte }}</span>
      </div>
    </el-card>
    <el-card class="suggestion-to-teacher-main">
      <span>{{ f_jycontent }}</span>
    </el-card>
  </div>
</template>
<script>
import {
  getJyInfo,
  getCheckInfo,
} from "api/teacher-api/studentPracticeTraining";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "SuggestionsToTeacher",
  data() {
    return {
      f_id: "",
      f_suserid: "",
      f_jycontent: "",
      f_createdte: "",
      loading: false,
    };
  },
  created() {
    this.f_recordeid = this.$route.query.f_recordeid;
    this.f_suserid = this.$route.query.f_suserid;
    this.checkInfoData();
  },
  methods: {
    /* 获取出科考核记录 */
    checkInfoData() {
      this.loading = true;
      let params = {
        keyValue: this.f_recordeid,
        type: 1,
        userid: this.f_suserid,
      };
      getCheckInfo(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.f_id = res.data[0].f_id;
          this.jyInfo();
        } else {
          this.loading = false;
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },

    jyInfo() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
        keyValue: this.f_id,
      };
      getJyInfo(params).then((res) => {
        console.log(res);
        this.loading = false;
        if (res.code == 100) {
          if (res.data.length !== 0) {
            this.f_jycontent = res.data[0].f_jycontent;
            this.f_createdte = timeFormatSeconds(0, res.data[0].f_createdate);
          } else {
            this.f_jycontent = "暂无书写";
          }
        } else {
          this.$message({
            message: "请求失败",
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
  .suggestion-to-teacher-title-card {
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
    .suggestion-to-teacher-title {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .suggestion-to-teacher-content {
      display: flex;
      font-family: "PingFang SC";
      font-weight: 400;
      font-size: 14px;
      color: rgba(18, 32, 115, 0.5);
    }
  }
  .suggestion-to-teacher-main {
    height: calc(100vh - 300px);
    margin: 20px;
    padding: 32px 38px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #122073;
    opacity: 1;
  }
}
</style>