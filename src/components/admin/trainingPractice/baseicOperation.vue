<template>
  <div class="basic-operation-container" v-loading="loading">
    <el-card class="title-card">
      <span>基础操作实习记录</span>
      <div class="description">
        <div class="skill">
          <img src="@/assets/image/组 1247.png" alt="" />
          <span>熟练</span>
        </div>
        <div class="unskill">
          <img src="@/assets/image/组 1240.png" alt="" />
          <span>不熟练</span>
        </div>
        <div class="nooperation">
          <img src="@/assets/image/组 1248.png" alt="" />
          <span>无操作</span>
        </div>
      </div>
    </el-card>
    <!-- <div class="department-add" @click="chooseDepartmentDialogVisible = true">
      <div class="department-add-content">
        <span>添加操作记录</span>
        <img src="@/assets/image/组 1156.png" alt="" />
      </div>
    </div> -->
    <el-card class="content-card">
      <el-row class="head">
        <el-col :span="3" class="head-department">实习阶段(科室)</el-col>
        <el-col :span="21" class="head-chooseD">操作记录</el-col>
      </el-row>

      <div
        class="main-body"
        style="height: calc(100vh - 450px); overflow: auto"
      >
        <el-row
          class="body"
          v-for="(item, index) in dataList"
          :key="index"
          :style="{
            background: index % 2 == 0 ? '' : 'rgba(149, 156, 193, 0.06)',
          }"
        >
          <div class="item-body" style="display: flex">
            <div
              class="body-title"
              :span="3"
              :style="{
                background:
                  index % 2 == 0
                    ? 'rgba(246, 248, 251, 0.55)'
                    : 'rgba(149, 156, 193, 0.06)',
              }"
            >
              <span>{{ item.ksName }}</span>
            </div>

            <div
              class="body-content"
              style="
                width: 100%;
                display: flex;
                overflow-x: scroll;
                white-space: nowrap;
              "
            >
              <div
                style="display: flex; flex-shrink: 0; width: 430px"
                v-for="(item_, index) in item.data"
                :key="index"
              >
                <div class="d-title">{{ item_.f_name }}</div>
                <div class="d-skill">
                  <img src="@/assets/image/组 1247.png" alt="" />
                  <span>{{ item_.f_skilledcount }}项</span>
                </div>
                <div class="d-unskill">
                  <img src="@/assets/image/组 1240.png" alt="" />
                  <span>{{ item_.f_unskilledcount }}项</span>
                </div>
                <div class="d-nooperation">
                  <img src="@/assets/image/组 1248.png" alt="" />
                  <span>{{ item_.f_noopscount }}项</span>
                </div>
                <div class="go-detail" @click="goDetail(item_)">
                  <img src="@/assets/image/组 1908.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </el-row>
      </div>
    </el-card>
    <!-- 记录详情弹框 -->
    <el-dialog
      title="记录详情"
      :visible.sync="recordDetailDialogVisible"
      @closed="recordDetailDialogClosed"
      width="38%"
      center
    >
      <div class="record-detail-dialog">
        <el-row type="flex">
          <el-col class="dialog-title" :span="3">呼吸内科</el-col>
          <el-col class="dialog-skill" :span="5">
            <img src="@/assets/image/组 1247.png" alt="" />
            <span>熟练：{{ f_skilledcount }}项</span>
          </el-col>
          <el-col class="dialog-unskill" :span="5">
            <img src="@/assets/image/组 1240.png" alt="" />
            <span>不熟练：{{ f_unskilledcount }}项</span>
          </el-col>
          <el-col class="dialog-nooperation" :span="5">
            <img src="@/assets/image/组 1248.png" alt="" />
            <span>无操作：{{ f_noopscount }}项</span>
          </el-col>
        </el-row>
        <div
          class="dialog-content"
          v-for="(item, index) in detailList"
          :key="index"
        >
          <el-row type="flex" align="middle" class="d-header">
            <el-col :span="10" style="display: flex; align-items: center">
              <img
                src="@/assets/image/组 1270.png"
                alt=""
                style="margin-right: 10px"
              />
              <span>{{ item.name }}</span>
            </el-col>
            <el-col :span="5" style="display: flex; justify-content: center"
              >熟练</el-col
            >
            <el-col :span="5" style="display: flex; justify-content: center"
              >不熟练</el-col
            >
            <el-col :span="4" style="display: flex; justify-content: center"
              >无操作</el-col
            >
          </el-row>

          <el-row
            type="flex"
            align="middle"
            class="d-body"
            v-for="(item_, index) in item.child"
            :key="index"
          >
            <el-col :span="10">{{ item_.name }}</el-col>
            <el-col :span="5" style="display: flex; justify-content: center">
              <img
                v-if="item_.value == '熟练'"
                src="@/assets/image/组 1247.png"
                alt=""
              />
            </el-col>
            <el-col :span="5" style="display: flex; justify-content: center"
              ><img
                v-if="item_.value == '不熟练'"
                src="@/assets/image/组 1240.png"
                alt=""
            /></el-col>
            <el-col :span="4" style="display: flex; justify-content: center"
              ><img
                v-if="item_.value == '无操作'"
                src="@/assets/image/组 1248.png"
                alt=""
            /></el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getBaseInternshipStatistics,
  getAllChildAssessmentByParent,
  getArrangement,
  postSaveList,
  postSaveForm,
} from "api/student-api/baseInternshipRecord";
export default {
  name: "BasicOperation",
  data() {
    return {
      loading: false,
      f_skilledcount: 0,
      f_unskilledcount: 0,
      f_noopscount: 0,
      departmentVal: "",
      recordDetailDialogVisible: false,
      chooseDepartmentDialogVisible: false,
      writeProjectDialogVisible: false,
      dataList: [],
      detailList: [],
      projectList: [],
      value: "",
      listid: "",
      f_suserid: "",
      f_id: "",
    };
  },
  created() {
    this.f_suserid = this.$route.query.f_suserid;
    this.f_id = this.$route.query.f_id;
    this.baseInternshipStatistics();
  },
  methods: {
    /* 获取基础操作实习记录列表 */
    baseInternshipStatistics() {
      let params = {
        stuid: this.f_suserid,
      };
      this.loading = true;
      getBaseInternshipStatistics(params).then((res) => {
        this.loading = false;
        if (res.code !== 100) {
          this.$message({
            message: "获取列表失败！",
            type: "error",
            center: true,
          });
        } else {
          console.log(res.data);
          this.dataList = res.data.map((item) => ({
            ...item,
            data: item.data,
          }));
          console.log(this.dataList);
        }
      });
    },
    /* 查看详情 */
    goDetail(item_) {
      console.log(item_);
      this.f_skilledcount = item_.f_skilledcount;
      this.f_unskilledcount = item_.f_unskilledcount;
      this.f_noopscount = item_.f_noopscount;
      let params = {
        listid: item_.f_listid,
      };
      getAllChildAssessmentByParent(params).then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "请求记录详情失败！",
            type: "error",
            center: true,
          });
        } else {
          console.log(res.data);
          this.detailList = res.data;
        }
      });
      this.recordDetailDialogVisible = true;
    },

    /* 关闭详情弹框 */
    recordDetailDialogClosed() {
      this.f_skilledcount = 0;
      this.f_unskilledcount = 0;
      this.f_noopscount = 0;
      this.detailList = [];
    },
  },
};
</script>
<style lang="less" scoped>
.basic-operation-container {
  .title-card {
    height: 134px;
    box-shadow: none;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    :nth-child(1) {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .description {
      display: flex;
      margin-top: 20px;
      .skill,
      .unskill,
      .nooperation {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
        margin-right: 20px;
        img {
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
      }
    }
  }
  .department-add {
    height: 49px;
    background: rgba(88, 100, 255, 0.05);
    border: 1px solid rgba(88, 100, 255, 0.32156862745098036);
    opacity: 1;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 20px;
    .department-add-content {
      display: flex;
      align-items: center;
      :nth-child(1) {
        // width: 72px;
        height: 25px;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 500;
        line-height: 25px;
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
  .content-card {
    height: calc(100vh - 350px);
    box-shadow: none;
    margin: 20px;
    padding: 20px;
    box-sizing: border-box;
    .head {
      display: flex;
      // width: 100%;
      height: 62px;
      background: rgba(246, 248, 251, 0.55);
      display: flex;
      .head-department {
        // width: 179px;
        height: 62px;
        background: rgba(149, 156, 193, 0.06);
        display: flex;
        align-items: center;
        padding-left: 30px;
        box-sizing: border-box;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #122073;
      }
      .head-chooseD {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #122073;
        box-sizing: border-box;
        padding-left: 56px;
      }
    }

    .main-body::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px;
      height: 100px;
    }
    .main-body::-webkit-scrollbar-thumb {
      /*滚动条里面的滑块*/
      border-radius: 9px;
      background: #e3e4ee;
    }
    .main-body::-webkit-scrollbar-track {
      /*滚动条里面轨道背景*/
      border-radius: 10px;
    }
    .body {
      height: 62px;
      .item-body {
        .el-col {
          height: 62px;
        }
        .body-title {
          width: 12%;
          height: 62px;
          padding-left: 30px;
          display: flex;
          align-items: center;
          .body-img {
            width: 27px;
            height: 27px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
          }
          span {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
          }
        }
        .body-content {
          display: flex;
          align-items: center;
          // overflow-x: scroll;
          .d-title {
            width: 30%;
            font-size: 16px;
            padding-left: 56px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
          }
          .d-skill {
            display: flex;
            align-items: center;
            width: 15%;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-right: 20px;
            img {
              margin-right: 6px;
            }
          }
          .d-unskill {
            display: flex;
            align-items: center;
            width: 15%;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-right: 20px;
            img {
              margin-right: 6px;
            }
          }
          .d-nooperation {
            display: flex;
            align-items: center;
            width: 15%;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-right: 20px;
            img {
              margin-right: 6px;
            }
          }
          .go-detail {
            width: 21px;
            height: 21px;
            margin-right: 10px;
            cursor: pointer;
          }
        }

        .body-content::-webkit-scrollbar {
          /*滚动条整体样式*/
          height: 8px;
        }
        .body-content::-webkit-scrollbar-thumb {
          /*滚动条里面的滑块*/
          border-radius: 9px;
          background: #e3e4ee;
        }
        .body-content::-webkit-scrollbar-track {
          /*滚动条里面轨道背景*/
          border-radius: 10px;
        }
      }
    }
  }
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
  .record-detail-dialog {
    height: 600px;
    padding: 25px;
    overflow: auto;
    box-sizing: border-box;
    .dialog-title {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .dialog-skill {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
      img {
        margin-right: 5px;
      }
    }
    .dialog-unskill {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
      img {
        margin-right: 5px;
      }
    }
    .dialog-nooperation {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
      img {
        margin-right: 5px;
      }
    }
    .dialog-content {
      .d-header {
        height: 48px;
        background: #5864ff;
        opacity: 1;
        border-radius: 8px 8px 0px 0px;
        margin-top: 24px;
        padding-left: 31px;
        .el-col {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .d-body {
        height: 47px;
        padding-left: 31px;
        border: 1px solid rgba(18, 32, 115, 0.07);
        .el-col {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
        }
      }
    }
  }
  .record-detail-dialog::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    height: 100px;
  }
  .record-detail-dialog::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 9px;
    background: #e3e4ee;
  }
  .record-detail-dialog::-webkit-scrollbar-track {
    /*滚动条里面轨道背景*/
    border-radius: 10px;
  }
  .choose-department-dialog {
    // height: 600px;
    padding: 25px;
    box-sizing: border-box;
    .department-item {
      :nth-child(1) {
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
      }
    }
    .department-dialog-btn {
      margin-top: 35px;
      margin-bottom: 20px;
      .cancel {
        width: 176px;
        height: 42px;
        background: #d0d2e3;
        opacity: 1;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }
      .next {
        width: 176px;
        height: 42px;
        background: #5864ff;
        opacity: 1;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .write-project-dialog-wrapper {
    height: 670px;
    .write-project-dialog {
      height: 600px;
      padding: 25px 25px 25px 25px;
      box-sizing: border-box;
      overflow: auto;
      .description-row {
        background: rgba(88, 100, 255, 0.06);
        border: 1px solid rgba(88, 100, 255, 0.2784313725490196);
        opacity: 1;
        border-radius: 4px;
        padding: 9px 13px;
        .description-col {
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
        }
      }
      .descirption-dialog-content {
        .des-header {
          display: flex;
          align-items: center;
          height: 48px;
          background: #5864ff;
          opacity: 1;
          border-radius: 8px 8px 0px 0px;
          margin-top: 14px;
          padding-left: 31px;
          .el-col {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: #ffffff;
            opacity: 1;
          }
        }
        .des-body {
          height: 47px;
          display: flex;
          align-items: center;
          padding-left: 31px;
          border: 1px solid rgba(18, 32, 115, 0.07);
          /deep/.el-radio__label {
            display: none;
          }
          .el-col {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
      }
    }
    .project-dialog-footer {
      height: 70px;
      overflow: hidden;
      .el-row {
        margin-top: 10px;
        .cancel {
          height: 42px;
          background: #d0d2e3;
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
        .last {
          height: 42px;
          background: #fdbe00;
          opacity: 1;
          border-radius: 4px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 10px;
          cursor: pointer;
        }
        .commit {
          height: 42px;
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
    }
  }

  .write-project-dialog::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    height: 100px;
  }
  .write-project-dialog::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 9px;
    background: #e3e4ee;
  }
  .write-project-dialog::-webkit-scrollbar-track {
    /*滚动条里面轨道背景*/
    border-radius: 10px;
  }
}
</style>