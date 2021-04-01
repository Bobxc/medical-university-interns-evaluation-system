<template>
  <div class="disease-container" v-loading="loading">
    <el-card class="title-card">
      <el-row type="flex" justify="space-between">
        <el-col class="title-card-first-col" :span="20">
          <span class="title-card-name">轮转期间学习病种及其例数记录</span>
        </el-col>
      </el-row>
    </el-card>
    <!-- 内容卡片部分 -->
    <div class="container">
      <el-card
        class="container-card"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <el-row class="header-row" type="flex" align="middle">
          <div class="title">
            <div></div>
            <span>{{ item.name }}</span>
          </div>
        </el-row>
        <div class="body-row">
          <div
            style="width: 30%; height: 100%; margin-right: 26px; flex-shrink: 0"
            v-for="(item_, index) in item.child"
            :key="index"
          >
            <el-row class="item-header">{{ item_.name }}</el-row>
            <div class="item-body">
              <el-row v-for="(item__, index) in item_.child" :key="index">
                <el-col
                  class="col1"
                  :span="13"
                  :style="{
                    background:
                      index % 2 == 0
                        ? 'rgba(234, 236, 246, 0.66)'
                        : 'rgba(234, 236, 246, 0.86)',
                  }"
                  ><div
                    :title="item__.name"
                    style="
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ item__.name }}
                  </div></el-col
                >
                <el-col
                  class="col2"
                  :span="11"
                  :style="{
                    background:
                      index % 2 == 0
                        ? 'rgba(234, 236, 246, 0.76)'
                        : 'rgba(234, 236, 246, 1)',
                  }"
                >
                  <el-row
                    type="flex"
                    justify="center"
                    align="middle"
                    style="font-size: 16px; font-weight: 400; color: #122073"
                  >
                    {{ item__.value }}
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import {
  getRotationStudyRecordList,
  getSxList,
  getListContentByStuAndInternship,
  postSaveList,
  postSaveForm,
  getAssessmentTableRoot,
  getAssessmentTable,
  getHasContentRoot,
  getAllChildAssessmentByParent,
  getCurrentId,
} from "api/student-api/rotationStudyRecord";
export default {
  name: "Disease",
  data() {
    return {
      loading: false,
      internshipid: "",
      f_suserid: "",
      f_id: "",
      f_recordeid: "",
      dataList: [],
      dataContent: [],
      listContentData: [],
      assessmentTableData: [],
      hasContentRootData: [],
    };
  },
  created() {
    this.f_suserid = this.$route.query.f_suserid;
    this.f_id = this.$route.query.f_id;
    this.f_recordeid = this.$route.query.f_recordeid;
    this.assessmentTable();
  },
  mounted() {},
  methods: {
    /* 获取考核表 */
    assessmentTable() {
      this.loading = true;
      getAssessmentTable().then((res) => {
        if (res.code !== 100) {
          this.loading = false;
          this.$message({
            message: "获取考核表失败！",
            type: "error",
            center: true,
          });
        } else {
          this.assessmentTableData = res.data;
          console.log(this.assessmentTableData);
          this.listContentByStuAndInternship();
          // this.currentId();
        }
      });
    },

    /* 获取internshipid */
    // currentId() {
    //   let params = {
    //     userid: this.f_suserid,
    //   };
    //   getCurrentId(params).then((res) => {
    //     if (res.code !== 100) {
    //       thsi.loading = false;
    //       this.$message({
    //         message: "获取当前实习记录id失败！",
    //         type: "error",
    //         center: true,
    //       });
    //     } else {
    //       this.loading = false;
    //       if (res.data.length) {
    //         console.log("有实习记录id");
    //         this.internshipid = res.data[0].f_id;
    //         this.listContentByStuAndInternship();
    //       } else {
    //         this.listContentByStuAndInternship();
    //       }
    //     }
    //   });
    // },

    /* 获取考核表内容 */
    listContentByStuAndInternship() {
      let params = {
        stuid: this.f_suserid,
        internshipid: this.f_recordeid,
      };
      getListContentByStuAndInternship(params).then((res) => {
        this.loading = false;
        if (res.code !== 100) {
          this.$message({
            message: "获取考核表内容失败！",
            type: "error",
            center: true,
          });
        } else {
          this.hasContentRootData = res.data;
          console.log(this.hasContentRootData);
          this.dataList = this.assessmentTableData.map((item) => ({
            ...item,
            child:
              item.child !== undefined
                ? item.child.map((sub) => ({
                    ...sub,
                    child: sub.child.map((dep) => ({
                      ...dep,
                      value:
                        this.hasContentRootData.find(
                          (val) => val.F_AssessmentContentId == dep.id
                        ) !== undefined
                          ? this.hasContentRootData.find(
                              (val) => val.F_AssessmentContentId == dep.id
                            ).F_Times
                          : 0,
                    })),
                  }))
                : "",
          }));
          /* let params = {
            stuid: this.f_suserid,
          };
          getHasContentRoot(params).then((res) => {
            this.loading = false;
            if (res.code !== 100) {
              this.$message({
                message: "获取已考核内容失败！",
                type: "error",
                center: true,
              });
            } else {
              this.dataList = this.dataList.map((item) => ({
                ...item,
                listid:
                  res.data.find((sub) => sub.f_name == item.name) !== undefined
                    ? res.data.find((sub) => sub.f_name == item.name).f_id
                    : "",
              }));
              console.log(this.dataList);
            }
          }); */
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.disease-container {
  .title-card {
    height: 100px;
    box-shadow: none;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
    .title-card-first-col {
      display: flex;
      align-items: center;
      .title-card-name {
        font-size: 20px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
    }
    .title-card-second-col {
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .card-btn {
        width: 84px;
        height: 42px;
        background: #fdbe00;
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 18px;
          height: 19px;
          margin-right: 7px;
        }
        span {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          opacity: 1;
        }
      }
    }
  }
  .container {
    height: calc(100vh - 250px);
    overflow: auto;
    // margin: 20px;
    padding: 20px;
    .container-card {
      height: 600px;
      margin-bottom: 15px;
      box-shadow: none;
      /deep/.el-card__body {
        padding: 0;
      }
      .header-row {
        height: 49px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        padding-left: 25px;
        .title {
          display: flex;
          align-items: center;
          margin-right: 20px;
          :nth-child(1) {
            width: 5px;
            height: 19px;
            background: #5864ff;
            opacity: 1;
            margin-right: 10px;
          }
          :nth-child(2) {
            font-size: 18px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
          }
        }
      }
      .body-row {
        height: 535px;
        padding: 15px 0 0 25px;
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        .item-header {
          height: 46px;
          background: #5864ff;
          opacity: 1;
          border-radius: 6px 6px 0px 0px;
          padding-left: 25px;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #ffffff;
        }
        .item-body {
          height: 474px;
          overflow: auto;
          .el-row {
            height: 48px;
            .col1 {
              height: 48px;
              display: flex;
              align-items: center;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #122073;
              opacity: 1;
              padding-left: 15px;
            }
          }
        }
        .item-body::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 10px;
          height: 100px;
        }
        .item-body::-webkit-scrollbar-thumb {
          /*滚动条里面的滑块*/
          border-radius: 9px;
          background: #e3e4ee;
        }
        .item-body::-webkit-scrollbar-track {
          /*滚动条里面轨道背景*/
          border-radius: 10px;
        }

        .add-disease-row {
          height: 47px;
          padding-left: 15px;
          background: rgba(234, 236, 246, 0.27);
          .add-disease-col {
            height: 47px;
            display: flex;
            align-items: center;
            cursor: pointer;
            img {
              width: 15px;
              height: 15px;
              margin-right: 5px;
            }
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #5864ff;
              opacity: 1;
            }
          }
        }
      }
      .body-row::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 30px;
        height: 10px;
      }
      .body-row::-webkit-scrollbar-thumb {
        /*滚动条里面的滑块*/
        border-radius: 9px;
        background: #e3e4ee;
      }
      .body-row::-webkit-scrollbar-track {
        /*滚动条里面轨道背景*/
        border-radius: 10px;
      }
    }
  }
}
</style>