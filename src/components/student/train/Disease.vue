<template>
  <div class="disease-container" v-loading="loading">
    <el-card class="title-card">
      <el-row type="flex" justify="space-between">
        <el-col class="title-card-first-col" :span="20">
          <span class="title-card-name">轮转期间学习病种及其例数记录</span>
        </el-col>
        <!-- <el-col class="title-card-second-col" :span="3">
          <div class="card-btn" @click="resetDialogVisible = true">
            <img src="@/assets/image/路径 1013.png" alt="" />
            <span>重置</span>
          </div>
        </el-col> -->
      </el-row>
    </el-card>
    <!-- 内容卡片部分 -->
    <div class="container" v-if="internshipid">
      <el-card
        class="container-card"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <el-row class="header-row" type="flex" align="middle">
          <!-- <el-col :span="2">
            <div></div>
            <span>{{ item.name }}</span>
          </el-col> -->
          <div class="title">
            <div></div>
            <span>{{ item.name }}</span>
          </div>
          <img
            src="@/assets/image/路径 1085.png"
            style="width: 16px; height: 16px; cursor: pointer"
            @click="toEdit(item)"
            alt=""
            v-if="item.child"
          />
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
                >
                  <div
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
    <div
      class="container"
      v-else
      style="font-size: 16px; font-weight: 500; color: #122073; opacity: 1"
    >
      请先添加评教记录
    </div>
    <!-- 重置弹框 -->
    <el-dialog
      :visible.sync="resetDialogVisible"
      width="30%"
      center
      class="reset-dialog"
    >
      <div class="reset-container-dialog">
        <div class="reset-content-dialog">
          <div class="reset-pic-dialog">
            <img src="@/assets/image/组 1368.png" alt="" />
          </div>
          <div class="reset-text-dialog">
            <span>确定重置？</span>
            <span>若重置，此页填写的信息将丢失。</span>
          </div>
        </div>
        <div class="reset-footer-dialog">
          <div class="reset-cancel" @click="resetDialogVisible = false">
            取消
          </div>
          <div class="reset-reset" @click="reset">重置</div>
        </div>
      </div>
    </el-dialog>
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
      resetDialogVisible: false,
      loading: false,
      internshipid: null,
      dataList: [],
      dataContent: [],
      listContentData: [],
      assessmentTableData: [],
      hasContentRootData: [],
    };
  },
  created() {
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
          this.currentId();
        }
      });
    },
    /* 获取internshipid */
    currentId() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getCurrentId(params).then((res) => {
        if (res.code !== 100) {
          thsi.loading = false;
          this.$message({
            message: "获取当前实习记录id失败！",
            type: "error",
            center: true,
          });
        } else {
          this.loading = false;
          if (res.data.length) {
            this.internshipid = res.data[0].f_id;
            this.listContentByStuAndInternship();
          }
        }
      });
    },
    /* 获取考核表内容 */
    listContentByStuAndInternship() {
      let params = {
        stuid: window.sessionStorage.getItem("userid"),
        internshipid: this.internshipid,
      };
      getListContentByStuAndInternship(params).then((res) => {
        if (res.code !== 100) {
          this.loading = false;
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
                    child:
                      sub.child !== undefined
                        ? sub.child.map((dep) => ({
                            ...dep,
                            value:
                              this.hasContentRootData.find(
                                (val) => val.F_AssessmentContentId == dep.id
                              ) !== undefined
                                ? this.hasContentRootData.find(
                                    (val) => val.F_AssessmentContentId == dep.id
                                  ).F_Times
                                : 0,
                          }))
                        : "",
                  }))
                : "",
          }));
          let params = {
            stuid: window.sessionStorage.getItem("userid"),
            internshipid: this.internshipid,
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
          });
        }
      });
    },
    toEdit(item) {
      console.log(item);
      this.$router.push({
        path: "/disease/edit",
        query: {
          allData: encodeURIComponent(JSON.stringify(item)),
          internshipid: this.internshipid,
        },
      });
    },

    /* 重置 */
    reset() {},
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

  .reset-dialog {
    /deep/.el-dialog__title {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    /deep/.el-dialog__header {
      padding: 20px;
    }
    /deep/.el-dialog__body {
      padding: 0;
    }
    .reset-container-dialog {
      height: 250px;
      padding: 30px 30px 30px 50px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .reset-content-dialog {
        display: flex;
        .reset-pic-dialog {
          width: 90px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .reset-text-dialog {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          :nth-child(1) {
            font-size: 24px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
          }
          :nth-child(2) {
            font-size: 18px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
      }
      .reset-footer-dialog {
        display: flex;
        justify-content: flex-end;
        .reset-cancel {
          width: 105px;
          height: 42px;
          background: #d0d2e3;
          opacity: 1;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
          margin-right: 14px;
        }
        .reset-reset {
          width: 105px;
          height: 42px;
          background: #5864ff;
          opacity: 1;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>