<template>
  <div class="container">
    <el-card class="information-release-detail-title-card">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/teacher/release' }"
          >一级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/teacher/releasedetail' }"
          >二级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="detail-title">
        {{ queryData.F_Title }}
      </div>
      <div class="detail-time">
        <span>发布时间：</span>
        <span>{{ queryData.F_CreateTime }}</span>
      </div>
    </el-card>
    <el-card class="information-release-detail-content-card">
      <p v-html="queryData.F_Content"></p>
    </el-card>
  </div>
</template>
<script>
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "InformationReleaseDetail",
  data() {
    return {
      queryData: {},
    };
  },
  created() {
    this.queryData = JSON.parse(decodeURIComponent(this.$route.query.allData));
    this.queryData.F_CreateTime = timeFormatSeconds(
      0,
      this.queryData.F_CreateTime
    );
    console.log(this.queryData);
  },
};
</script>
<style lang="less" scoped>
.container {
  .information-release-detail-title-card {
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
    .detail-title {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .detail-time {
      display: flex;

      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 0.5;
    }
  }
  .information-release-detail-content-card {
    height: calc(100vh - 300px);
    margin: 20px;
    padding: 32px 38px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #122073;
    overflow: auto;
    opacity: 1;
    p {
      text-indent: 2em;
    }
  }
}
</style>