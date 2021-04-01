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
    <div class="department-add" @click="chooseDepartmentDialogVisible = true">
      <div class="department-add-content">
        <span>添加操作记录</span>
        <img src="@/assets/image/组 1156.png" alt="" />
      </div>
    </div>
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
          <el-col class="dialog-title" :span="3">{{ detailTitle }}</el-col>
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
    <!-- 选择实习阶段、添加科室弹框 -->
    <el-dialog
      title="添加操作记录"
      :visible.sync="chooseDepartmentDialogVisible"
      @closed="choosedDepartmentDialogClosed"
      width="500px"
      center
    >
      <div class="choose-department-dialog">
        <div class="department-item">
          <el-row type="flex" align="middle">
            <el-col :span="10">选择实习阶段（科室）</el-col>
            <el-col :span="14">
              <el-select
                v-model="value"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.f_id"
                  :label="item.f_ksname"
                  :value="item.f_id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            align="middle"
            justify="space-between"
            style="margin-top: 30px"
          >
            <el-col :span="10">输入科室</el-col>
            <el-col :span="14">
              <el-input v-model="departmentVal" placeholder="请输入"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row class="department-dialog-btn" type="flex" justify="center">
          <el-col
            class="cancel"
            @click.native="chooseDepartmentDialogVisible = false"
          >
            取消
          </el-col>
          <el-col class="next" @click.native="next"> 下一步 </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 填写项目弹框 -->
    <el-dialog
      title="填写项目"
      :visible.sync="writeProjectDialogVisible"
      @closed="writeProjectDialogClosed"
      width="47%"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="write-project-dialog-wrapper">
        <div class="write-project-dialog">
          <el-row class="description-row">
            <el-col class="description-col">
              <img src="@/assets/image/叹号.png" alt="" />
              <span>
                “熟练”表示学生完全熟练掌握；“不熟练”表示学生有练过，但是练习不多；“没有操作”指学生没有练习该项操作。经历过的操作形式填写“√”。</span
              >
            </el-col>
          </el-row>
          <div
            class="descirption-dialog-content"
            v-for="(item, index) in projectList"
            :key="index"
          >
            <el-row class="des-header">
              <el-col :span="10" style="display: flex; align-items: center">
                <img
                  src="@/assets/image/组 1270.png"
                  alt=""
                  style="margin-right: 10px"
                />
                <span>{{ item.name }}</span>
              </el-col>

              <el-col
                :span="14"
                style="display: flex; justify-content: space-around"
              >
                <span>熟练</span>
                <span>不熟练</span>
                <span>无操作</span>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              class="des-body"
              v-for="(item_, index) in item.child"
              :key="index"
            >
              <el-col :span="10">{{ item_.name }}</el-col>
              <el-col :span="14" style="display: flex; justify-content: center"
                ><el-radio-group
                  v-model="item_.radioVal"
                  style="
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                  "
                >
                  <el-radio :label="1" style="transform: translateX(5px)">
                  </el-radio>
                  <el-radio :label="0" style="transform: translateX(-8px)">
                  </el-radio>
                  <el-radio :label="-1" style="transform: translateX(-8px)">
                  </el-radio> </el-radio-group
              ></el-col>
            </el-row>
          </div>
        </div>
        <div class="project-dialog-footer">
          <el-row type="flex" justify="center" align="center">
            <el-col :span="6" class="cancel" @click.native="projectCancel"
              >取消</el-col
            >
            <el-col :span="6" class="last" @click.native="projectLast"
              >上一步</el-col
            >
            <el-col :span="6" class="commit" @click.native="commit"
              >提交</el-col
            >
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
      radio: 3,
      form: {
        radioArray: ["1", "10", "14", "16"],
        radioArray1: [],
      },
      dataList: [],
      detailList: [],
      detailTitle: "",
      projectList: [],
      options: [],
      value: "",
      listid: "",
    };
  },
  created() {
    this.baseInternshipStatistics();
    this.arrangement();
  },
  methods: {
    /* 获取基础操作实习记录列表 */
    baseInternshipStatistics() {
      let params = {
        stuid: window.sessionStorage.getItem("userid"),
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
      this.detailTitle = item_.f_name;
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
    /* 获取实习阶段（科室） */
    arrangement() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getArrangement(params).then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "获取实习阶段（科室）失败！",
            type: "error",
            center: true,
          });
        } else {
          this.options = res.data;
          console.log(this.options);
          if (this.options.length) {
            this.value =
              this.options.find((item) => item.isdqjl == 1) !== undefined
                ? this.options.find((item) => item.isdqjl == 1).f_id
                : "";
          }
        }
      });
    },

    /* 关闭详情弹框 */
    recordDetailDialogClosed() {
      this.f_skilledcount = 0;
      this.f_unskilledcount = 0;
      this.f_noopscount = 0;
      this.detailList = [];
      this.detailTitle = "";
    },
    next() {
      // this.chooseDepartmentDialogVisible = false;
      if (this.value == "") {
        this.$message({
          message: "请选择实习阶段科室",
          type: "warning",
          center: true,
        });
      } else if (this.departmentVal == "") {
        this.$message({
          message: "请输入科室",
          type: "warning",
          center: true,
        });
      } else {
        let data = {
          F_StuId: window.sessionStorage.getItem("userid"),
          F_InternshipId: this.value,
          F_RootId: this.departmentVal,
        };
        postSaveList(data).then((res) => {
          console.log(res);
          if (res.code !== 100) {
            this.$message({
              message: res.message,
              type: "error",
              center: true,
            });
          } else {
            this.listid = res.data;
            let params = {
              listid: this.listid,
            };
            getAllChildAssessmentByParent(params).then((res) => {
              console.log(res);
              if (res.code !== 100) {
                this.$message({
                  message: "获取考核项失败！",
                  tpye: "error",
                  center: true,
                });
              } else {
                this.projectList = res.data;
                this.projectList = this.projectList.map((item) => ({
                  ...item,
                  child: item.child.map((sub) => ({
                    ...sub,
                    radioVal: "",
                  })),
                }));
                console.log(this.projectList);
                this.writeProjectDialogVisible = true;
              }
            });
          }
        });
      }
    },

    /* 提交填写项目内容 */
    commit() {
      if (
        this.projectList.some((item) =>
          item.child.some(
            (sub) =>
              sub.radioVal !== -1 && sub.radioVal !== 0 && sub.radioVal !== 1
          )
        )
      ) {
        this.$message({
          message: "请填写内容！",
          type: "warning",
          center: true,
        });
      } else {
        let idArr = [];
        let valueArr = [];
        this.projectList.map((item) =>
          item.child.map((sub) => {
            idArr.push(sub.id);
            valueArr.push(sub.radioVal);
          })
        );
        let data = {
          listid: this.listid,
          id: idArr,
          value: valueArr,
        };
        postSaveForm(JSON.stringify(data)).then((res) => {
          if (res.code !== 100) {
            this.$message({
              message: "添加项目内容失败！",
              tpye: "error",
              center: true,
            });
          } else {
            this.$message({
              message: "添加项目内容成功！",
              type: "success",
              center: true,
            });
            this.baseInternshipStatistics();
            this.projectCancel();
          }
        });
      }
    },
    choosedDepartmentDialogClosed() {
      if (this.value !== "") {
        this.chooseDepartmentDialogVisible = false;
        this.departmentVal = "";
        this.value = this.options.find((item) => item.isdqjl == 1).f_id;
      } else {
        this.chooseDepartmentDialogVisible = false;
        this.departmentVal = "";
      }
    },

    writeProjectDialogClosed() {
      this.writeProjectDialogVisible = false;
    },

    projectCancel() {
      this.writeProjectDialogVisible = false;
      this.chooseDepartmentDialogVisible = false;
    },
    projectLast() {
      this.writeProjectDialogVisible = false;
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