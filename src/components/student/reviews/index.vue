<template>
  <div class="reviews-container" v-loading="loading">
    <el-card class="reviews-title-card" shadow="never"> 带教点评 </el-card>
    <el-card
      class="reviews-content-card"
      shadow="never"
      :body-style="{ padding: '45px 150px 20px 0px' }"
    >
      <el-row
        class="reviews-row-item"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <el-row class="reviews-row-top" type="flex">
          <img :src="item.pic" alt="" />
          <div class="tip">
            <span class="bot"></span>
            <span class="top"></span>
            <div class="tip-top">
              <div class="tip-t-left">
                <div>{{ item.hospital }}</div>
                <div></div>
                <div>{{ item.department }}</div>
                <div></div>
                <div>{{ item.name }}</div>
                <div>点评了你的日记：</div>
                <!-- <div>查看评教记录 ></div> -->
              </div>
              <div class="tip-t-right">{{ item.time1 }}</div>
            </div>
            <div class="tip-bottom">
              {{ item.comment }}
            </div>
          </div>
        </el-row>
        <el-row class="reviews-row-bottom">
          <div class="my-diary">
            <span>我的日记：</span>
            <span>{{ item.time2 }}</span>
          </div>
          <div class="my-diary-content">
            {{ item.diary }}
          </div>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getDpinfo } from "api/student-api/review";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "Reviews",
  data() {
    return {
      loading: false,
      dataList: [],
    };
  },
  mounted() {
    this.getReviewsList();
  },
  methods: {
    getReviewsList() {
      this.loading = true;
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getDpinfo(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.dataList = res.data;
          this.dataList = this.dataList.map((dep) => {
            return {
              pic: require("@/assets/image/组 1725.png"),
              hospital: dep.depname,
              department: dep.ksname,
              name: dep.username,
              time1: timeFormatSeconds(1, dep.f_createdate),
              comment: dep.f_jycontent,
              diary: dep.diary,
              time2: "2020-12-20 16:33",
            };
          });
          this.loading = false;
        } else {
          this.$message({
            message: res.message,
            center: true,
            type: "error",
          });
          this.loading = false;
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
          .bot {
            border-width: 15px;
            border-style: solid dashed dashed;
            border-color: #5864ff transparent transparent;
            left: 5%;
            bottom: -30px;
          }
          .top {
            border-width: 15px;
            border-style: solid dashed dashed;
            border-color: #fff transparent transparent;
            left: 5%;
            bottom: -28px;
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
      .reviews-row-bottom {
        width: 91.8%;
        margin-top: 30px;
        margin-left: 83px;
        .my-diary {
          display: flex;
          justify-content: space-between;
          :nth-child(1) {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: rgba(18, 32, 115, 0.5);
          }
          :nth-child(2) {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: rgba(18, 32, 115, 0.5);
          }
        }
        .my-diary-content {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          line-height: 28px;
          color: rgba(18, 32, 115, 0.5);
        }
      }
    }
  }
}
</style>