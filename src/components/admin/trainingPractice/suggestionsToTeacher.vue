<template>
  <div class="reviews-container" v-loading="loading">
    <el-card class="reviews-title-card" shadow="never"> 学生对带教的建议 </el-card>
    <el-card
      class="reviews-content-card"
      shadow="never"
      :body-style="{ padding: '45px 150px 20px 0px' }"
    >
      <div v-if="dataListLength">
        <el-row class="reviews-row-item" v-for="(item, index) in dataList" :key="index">
        <el-row class="reviews-row-top" type="flex">
          <img src="@/assets/image/组 1725.png" alt="" />
          <div class="tip">
            <div class="tip-top">
              <div class="tip-t-left">
                <div>{{item.xxname}}</div>
                <div></div>
                <div>{{item.stuname}}</div>
              </div>
              <div class="tip-t-right">{{item.f_createdate}}</div>
            </div>
            <div class="tip-bottom">
              {{item.f_jycontent}}
            </div>
          </div>
        </el-row>
        </el-row>
      </div>
      <el-row v-else class="reviews-row-item" style="font-size: 16px;font-weight: 400;color: #122073;">
        暂无建议
      </el-row>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getJyInfo } from "api/teacher-api/studentPracticeTraining";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "SuggestionsToTeacher",
  data() {
    return {
      f_suserid: "",
      f_jycontent: "",
      f_createdte: "",
      f_teachid: "",
      f_recordeid: "",
      dataListLength: true,
      loading: false,
      dataList: [],
    };
  },
  created() {
    this.f_suserid = this.$route.query.f_suserid;
    this.f_teachid = this.$route.query.f_teachid;
    this.f_recordeid = this.$route.query.f_recordeid;
    this.jyInfo();
  },
  methods: {
    jyInfo() {
      let params = {
        // userid: this.f_suserid,
        userid: this.f_teachid,
        keyValue: this.f_recordeid,
      };
      getJyInfo(params).then((res) => {
        console.log(res);
        this.loading = false;
        if (res.code == 100) {
          if (res.data.length) {
            this.dataList = res.data;
            this.dataList = this.dataList.map((item) => ({
              ...item,
              f_createdate: timeFormatSeconds(1, item.f_createdate),
            }));
          } else {
            this.dataListLength = false;
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
.reviews-container {
  .reviews-title-card {
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
  .reviews-content-card {
    height: calc(100vh - 231px);
    overflow: auto;
    margin: 20px;
    .reviews-row-item {
      padding-left: 38px;
      padding-bottom: 50px;
      margin-bottom: 44px;
      border-bottom: 1px solid rgba(18, 32, 115, 0.07);
      .reviews-row-top {
        img {
          width: 57px;
          height: 57px;
          margin-right: 26px;
        }
        .tip {
          width: 100%;
          padding: 22px 30px;
          border: 1px solid #5864ff;
          position: relative;
          border-radius: 5px;
          span {
            width: 0;
            height: 0;
            font-size: 0;
            overflow: hidden;
            position: absolute;
          }
          .tip-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            .tip-t-left {
              display: flex;
              align-items: center;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 800;
              color: #5864ff;
              opacity: 1;
              :nth-child(2) {
                width: 1px;
                height: 16px;
                margin: 0 12px;
                background: rgba(88, 100, 255, 0.3);
              }
              :nth-child(4) {
                width: 1px;
                height: 16px;
                margin: 0 12px;
                background: rgba(88, 100, 255, 0.3);
              }
              :nth-child(6) {
                font-size: 16px;
                font-family: "PingFang SC";
                font-weight: 400;
                color: #5864ff;
                opacity: 1;
                margin-left: 12px;
              }
              :nth-child(7) {
                font-size: 16px;
                font-family: "PingFang SC";
                font-weight: 400;
                color: rgba(88, 100, 255, 0.3);
                cursor: pointer;
              }
              :nth-child(7):hover {
                color: #5864ff;
              }
            }
            .tip-t-right {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #5864ff;
              opacity: 1;
            }
          }
          .tip-bottom {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #5864ff;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>