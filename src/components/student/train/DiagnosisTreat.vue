<template>
  <div class="diagnosis-treat-container" v-loading="loading">
    <el-card class="title-card">
      <el-row type="flex" justify="space-between" style="height: 90px">
        <el-col :span="20" class="title-card-first-col">
          <span class="title-card-name">各科室诊疗操作实习记录</span>
          <span class="title-card-description"
            >各项操作按实际完成次数和情况在“观摩、指导完成、独立完成”栏内打“√”。
            如某项操作三种形式均有经历过，可均填写，均无做过填“0”，并在备注栏里说明原因。“其它”栏要求填写项目中未罗列而实际有学习的操作名称和完成形式。</span
          >
        </el-col>
      </el-row>
    </el-card>
    <div class="diagnosis-content" v-if="internshipid">
      <el-card v-for="(item, index) in dataList" :key="index">
        <el-row class="diagnosis-header" type="flex">
          <el-col :span="12" style="display: flex; align-items: center">
            <div
              style="
                width: 5px;
                height: 19px;
                background: #5864ff;
                margin-right: 10px;
                opacity: 1;
              "
            ></div>
            <span class="header-title">{{ item.name }}</span>
            <img
              src="@/assets/image/路径 1085.png"
              style="margin-left: 20px; cursor: pointer"
              @click="toEdit(item)"
              alt=""
              v-if="item.child"
            />
          </el-col>
          <el-col :span="12" class="header-container">
            <span>观摩</span>
            <span>指导完成</span>
            <span>独立完成</span>
            <span>备注</span>
          </el-col>
        </el-row>
        <div class="body-container">
          <el-row
            class="item-row"
            v-for="(item_, index) in item.child"
            :key="index"
          >
            <el-col class="first-col" :span="12">{{ item_.name }}</el-col>
            <el-col class="second-col" :span="12">
              <el-checkbox
                v-model="item_.F_Observation"
                style="transform: translateX(5px)"
                disabled
              ></el-checkbox>
              <el-checkbox
                v-model="item_.F_FollowGuide"
                style="transform: translateX(-10px)"
                disabled
              ></el-checkbox>
              <el-checkbox
                v-model="item_.F_IndependentCompletion"
                style="transform: translateX(-12px)"
                disabled
              ></el-checkbox>

              <div @click="addRemarkDialogVisibleShow(item_)">
                <img
                  v-if="item_.F_Remark"
                  src="@/assets/image/组 2028.png"
                  alt=""
                  style="cursor: pointer; transform: translateX(5px)"
                />
                <img
                  v-else
                  src="@/assets/image/路径 856.png"
                  alt=""
                  style="cursor: pointer; transform: translateX(5px)"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div
      class="diagnosis-content"
      v-else
      style="font-size: 16px; font-weight: 500; color: #122073; opacity: 1"
    >
      请先添加评教记录
    </div>
    <!-- 添加备注弹框 -->
    <el-dialog
      title="备注"
      :visible.sync="addRemarkDialogVisible"
      width="30%"
      center
      class="remark-dialog"
    >
      <div class="dialog-content">
        <div>{{ textarea }}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDepartmentTreatmentRecordList,
  getSxList,
  getListContentByStuAndInternship,
  postSaveList,
  postSaveForm,
  getCurrentId,
  getHasContentRoot,
} from "api/student-api/departmentTreatmentRecord";
export default {
  name: "DiagnosisTreat",
  data() {
    return {
      loading: false,
      textarea: "",
      addRemarkDialogVisible: false,
      loading: false,
      listid: "",
      remarkid: "",
      internshipid: null,
      dataList: [],
      listContentData: [],
      assessmentTableData: [],
      hasContentRootData: [],
    };
  },
  mounted() {
    this.assessmentTable();
  },
  methods: {
    /* 获取考核表 */
    assessmentTable() {
      this.loading = true;
      getDepartmentTreatmentRecordList().then((res) => {
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
                    F_Observation:
                      this.hasContentRootData.find(
                        (val) => val.F_AssessmentContentId == sub.id
                      ) !== undefined
                        ? this.hasContentRootData.find(
                            (val) => val.F_AssessmentContentId == sub.id
                          ).F_Observation == 1
                          ? true
                          : false
                        : false,
                    F_FollowGuide:
                      this.hasContentRootData.find(
                        (val) => val.F_AssessmentContentId == sub.id
                      ) !== undefined
                        ? this.hasContentRootData.find(
                            (val) => val.F_AssessmentContentId == sub.id
                          ).F_FollowGuide == 1
                          ? true
                          : false
                        : false,
                    F_IndependentCompletion:
                      this.hasContentRootData.find(
                        (val) => val.F_AssessmentContentId == sub.id
                      ) !== undefined
                        ? this.hasContentRootData.find(
                            (val) => val.F_AssessmentContentId == sub.id
                          ).F_IndependentCompletion == 1
                          ? true
                          : false
                        : false,
                    F_Remark:
                      this.hasContentRootData.find(
                        (val) => val.F_AssessmentContentId == sub.id
                      ) !== undefined
                        ? this.hasContentRootData.find(
                            (val) => val.F_AssessmentContentId == sub.id
                          ).F_Remark
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
      this.$router.push({
        path: "/student/diagtreat/edit",
        query: {
          allData: encodeURIComponent(JSON.stringify(item)),
          internshipid: this.internshipid,
        },
      });
    },

    /* 显示备注 */
    addRemarkDialogVisibleShow(item_) {
      console.log(item_);
      this.remarkid = item_.id;
      this.textarea = item_.F_Remark;
      this.addRemarkDialogVisible = true;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #ffffff;
}
/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #5864ff;
  border-color: #5864ff;
}
.diagnosis-treat-container {
  position: relative;
  .title-card {
    height: 156px;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    margin-top: 5px;
    box-sizing: border-box;
    .title-card-first-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title-card-name {
        font-size: 20px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .title-card-description {
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
        opacity: 0.5;
      }
    }
    .title-card-second-col {
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
  .diagnosis-content {
    width: 100%;
    height: calc(100vh - 260px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    .el-card {
      width: 49%;
      height: calc(100vh - 380px);
      margin-bottom: 20px;
      box-shadow: none;
      /deep/.el-card__body {
        padding: 0;
      }
      .diagnosis-header {
        height: 49px;
        align-items: center;
        padding: 0 29px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        .header-title {
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 800;
          color: #122073;
          opacity: 1;
        }
      }
      .header-container {
        display: flex;
        justify-content: space-around;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
        opacity: 1;
      }
      .body-container {
        height: 500px;
        overflow: auto;
        box-sizing: border-box;
        .item-row {
          height: 47px;
          padding: 0 29px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          .first-col {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 500;
            color: #122073;
            opacity: 1;
          }
          .second-col {
            display: flex;
            justify-content: space-around;
            .el-checkbox-group {
              width: 65%;
              display: flex;
              justify-content: space-between;
            }
            /deep/.el-checkbox__label {
              display: none;
            }
          }
        }
        .ipt-row {
          height: 47px;
          padding: 0 29px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          .ipt-col {
            /deep/ .el-input__inner {
              padding-left: 0;
              border: none;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: rgba(18, 32, 115, 0.3);
            }
          }
          .ipt-btn {
            height: 29px;
            background: #5864ff;
            opacity: 1;
            border-radius: 4px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
        .add-row {
          height: 47px;
          padding: 0 29px;
          .el-col {
            display: flex;
            align-items: center;
            cursor: pointer;
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #5864ff;
              opacity: 1;
              margin-right: 6px;
            }
            img {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
      .body-container::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px;
        height: 100px;
      }
      .body-container::-webkit-scrollbar-thumb {
        /*滚动条里面的滑块*/
        border-radius: 9px;
        background: #e3e4ee;
      }
      .body-container::-webkit-scrollbar-track {
        /*滚动条里面轨道背景*/
        border-radius: 10px;
      }
    }
  }

  .remark-dialog {
    /deep/.el-dialog__title {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    /deep/.el-dialog__header {
      padding: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    /deep/.el-dialog__body {
      padding: 0;
    }
    .dialog-content {
      height: 230px;
      padding: 26px 35px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      div {
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #122073;
        opacity: 1;
        // border: 1px solid rgba(0, 0, 0, 0.1);
      }
      .dialog-main {
        /deep/.el-textarea__inner {
          height: 108px;
          padding: 10px 16px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          box-sizing: border-box;
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        }
      }
    }
  }
}
</style>