<template>
  <div class="specialist-operation-container" v-loading="loading">
    <el-card class="title-card">
      <el-row type="flex" justify="space-between" style="height: 90px">
        <el-col :span="20" class="title-card-first-col">
          <span class="title-card-name">各科室专科操作实习记录</span>
          <span class="title-card-description"
            >各项操作按实际完成次数和情况在“观摩、指导完成、独立完成”栏内打“√”。
            如某项操作三种形式均有经历过，可均填写，均无做过填“0”，并在备注栏里说明原因。“其它”栏要求填写项目中未罗列而实际有学习的操作名称和完成形式。</span
          >
        </el-col>
        <el-col :span="3" class="title-card-second-col">
          <div class="card-btn" @click="resetDialogVisible = true">
            <img src="@/assets/image/路径 1013.png" alt="" />
            <span>重置</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <div class="specialist-content">
      <el-card v-for="(item, index) in dataList" :key="index">
        <el-row class="specialist-header" type="flex">
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
              ></el-checkbox>
              <el-checkbox
                v-model="item_.F_FollowGuide"
                style="transform: translateX(-10px)"
              ></el-checkbox>
              <el-checkbox
                v-model="item_.F_IndependentCompletion"
                style="transform: translateX(-12px)"
              ></el-checkbox>

              <div @click="addRemarkDialogVisibleShow(item_)">
                <img
                  v-if="item_.remark"
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
    <div class="footer">
      <div class="cancel" @click="$router.push('/specope/default')">取消</div>
      <div class="save" @click="saveForm">保存</div>
    </div>
    <!-- 添加备注弹框 -->
    <el-dialog
      title="添加备注"
      :visible.sync="addRemarkDialogVisible"
      width="30%"
      center
      class="add-remark-dialog"
    >
      <div class="dialog-content">
        <el-input
          type="textarea"
          :rows="2"
          v-model="textarea"
          placeholder="请输入"
          class="dialog-main"
        ></el-input>
        <el-row type="flex" justify="end">
          <el-col
            class="remark-cancel"
            :span="4"
            @click.native="addRemarkDialogVisible = false"
            >取消</el-col
          >
          <el-col class="remark-save" :span="4" @click.native="remarkSave"
            >保存</el-col
          >
        </el-row>
      </div>
    </el-dialog>
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
  getDepartmentExpertiseRecordList,
  getSxList,
  getListContentByStuAndInternship,
  postSaveList,
  postSaveForm,
} from "api/student-api/departmentExpertiseRecord";
export default {
  name: "SpecialistOperation",
  data() {
    return {
      page: 1,
      size: 10,
      loading: false,
      textarea: "",
      addRemarkDialogVisible: false,
      resetDialogVisible: false,
      f_recordeid: "",
      listid: "",
      remarkid: "",
      dataList: [],
      listContentData: [],
    };
  },

  mounted() {
    this.getPageList();
  },
  methods: {
    /* 各科室专科操作实习记录表分页列表数据 */
    getPageList() {
      this.loading = true;
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getSxList(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.f_recordeid = res.data.find(
            (item) => item.f_stupj == 0 && item.f_djpj == 0
          ).f_recordeid;
          console.log(this.f_recordeid);
          let params = {
            stuid: window.sessionStorage.getItem("userid"),
            internshipid: this.f_recordeid,
          };
          getListContentByStuAndInternship(params).then((res) => {
            if (res.code == 100) {
              if (res.data.length) {
                console.log("有数据表");
                this.listid = res.data[0].F_ListId;
                this.listContentData = res.data;
                console.log(this.listContentData);
                getDepartmentExpertiseRecordList().then(
                  (res) => {
                    console.log(res);
                    if (res.code == 100) {
                      this.dataList = res.data;
                      this.dataList = this.dataList.map((item) => ({
                        ...item,
                        child: item.child.map((item_) => ({
                          ...item_,
                          remark:
                            this.listContentData.find(
                              (sub) => sub.F_AssessmentContentId == item_.id
                            ) !== undefined
                              ? this.listContentData.find(
                                  (sub) => sub.F_AssessmentContentId == item_.id
                                ).F_Remark
                              : "",
                          F_Observation:
                            this.listContentData.find(
                              (sub) => sub.F_AssessmentContentId == item_.id
                            ) !== undefined
                              ? this.listContentData.find(
                                  (sub) => sub.F_AssessmentContentId == item_.id
                                ).F_Observation == 1
                                ? true
                                : false
                              : false,
                          F_FollowGuide:
                            this.listContentData.find(
                              (sub) => sub.F_AssessmentContentId == item_.id
                            ) !== undefined
                              ? this.listContentData.find(
                                  (sub) => sub.F_AssessmentContentId == item_.id
                                ).F_FollowGuide == 1
                                ? true
                                : false
                              : false,
                          F_IndependentCompletion:
                            this.listContentData.find(
                              (sub) => sub.F_AssessmentContentId == item_.id
                            ) !== undefined
                              ? this.listContentData.find(
                                  (sub) => sub.F_AssessmentContentId == item_.id
                                ).F_IndependentCompletion == 1
                                ? true
                                : false
                              : false,
                        })),
                      }));
                      this.loading = false;
                      console.log("ttt", this.dataList);
                    }
                  },
                  (error) => {
                    console.log(error);
                    this.loading = false;
                  }
                );
              } else {
                console.log("无数据表");
                getDepartmentExpertiseRecordList().then(
                  (res) => {
                    if (res.code == 100) {
                      this.dataList = res.data;
                      this.dataList = this.dataList.map((dep) => {
                        return {
                          id: dep.id,
                          name: dep.name,
                          child: dep.child.map((dep_) => {
                            return {
                              id: dep_.id,
                              name: dep_.name,
                              F_Observation: false,
                              F_FollowGuide: false,
                              F_IndependentCompletion: false,
                              remark: "",
                            };
                          }),
                        };
                      });
                      console.log(this.dataList);
                      this.loading = false;
                    } else {
                      this.$message({
                        message: res.message,
                        type: "error",
                        center: true,
                      });
                      this.loading = false;
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            }
          });
        }
      });
    },
    /* 提交表单 */
    saveForm() {
      console.log(this.dataList);
      console.log(this.listContentData);
      this.loading = true;
      if (this.listContentData.length == 0) {
        console.log("无内容，需新建数据表");
        let data = {
          F_StuId: window.sessionStorage.getItem("userid"),
          F_InternshipId: this.f_recordeid,
        };
        postSaveList(data).then((res) => {
          console.log(res);
          if (res.code == 100) {
            this.listid = res.data;
            let idArr = [];
            let valueArr = [];
            this.dataList.map((item) =>
              item.child.map((sub) => {
                idArr.push(sub.id);
                valueArr.push(
                  `${sub.F_Observation}|${sub.F_FollowGuide}|${sub.F_IndependentCompletion}|${sub.remark}`
                );
              })
            );
            let data = {
              listid: this.listid,
              id: idArr,
              value: valueArr,
            };
            console.log(data);
            console.log(JSON.stringify(data));
            postSaveForm(JSON.stringify(data)).then((res) => {
              console.log(res);
              this.loading = false;
              if (res.code == 100) {
                console.log(res.message);
                this.$router.push("/specope/success");
              } else {
                console.log(res.message);
                this.$router.push("/specope/default");
              }
            });
          }
        });
      } else {
        console.log("有数据表");
        console.log(this.listid);
        let idArr = [];
        let valueArr = [];
        this.dataList.map((item) =>
          item.child.map((sub) => {
            idArr.push(sub.id);
            valueArr.push(
              `${sub.F_Observation}|${sub.F_FollowGuide}|${sub.F_IndependentCompletion}|${sub.remark}`
            );
          })
        );
        let data = {
          listid: this.listid,
          id: idArr,
          value: valueArr,
        };
        console.log(data);
        console.log(JSON.stringify(data));
        postSaveForm(JSON.stringify(data)).then((res) => {
          console.log(res);
          this.loading = false;
          if (res.code == 100) {
            console.log(res.message);
            this.$router.push("/specope/success");
          } else {
            console.log(res.message);
            this.$router.push("/specope/default");
          }
        });
      }
    },

    /* 重置 */
    reset() {
      this.loading = true;
      this.resetDialogVisible = false;
      getDepartmentExpertiseRecordList().then(
        (res) => {
          if (res.code == 100) {
            this.dataList = res.data;
            this.dataList = this.dataList.map((dep) => {
              return {
                id: dep.id,
                name: dep.name,
                child: dep.child.map((dep_) => {
                  return {
                    id: dep_.id,
                    name: dep_.name,
                    F_Observation: false,
                    F_FollowGuide: false,
                    F_IndependentCompletion: false,
                    remark: "",
                  };
                }),
              };
            });
            console.log(this.dataList);
            this.loading = true;
            if (this.listContentData.length == 0) {
              console.log("无内容，需新建数据表");
              let data = {
                F_StuId: window.sessionStorage.getItem("userid"),
                F_InternshipId: this.f_recordeid,
              };
              postSaveList(data).then((res) => {
                console.log(res);
                if (res.code == 100) {
                  this.listid = res.data;
                  let idArr = [];
                  let valueArr = [];
                  this.dataList.map((item) =>
                    item.child.map((sub) => {
                      idArr.push(sub.id);
                      valueArr.push(
                        `${sub.F_Observation}|${sub.F_FollowGuide}|${sub.F_IndependentCompletion}|${sub.remark}`
                      );
                    })
                  );
                  let data = {
                    listid: this.listid,
                    id: idArr,
                    value: valueArr,
                  };
                  console.log(data);
                  console.log(JSON.stringify(data));
                  postSaveForm(JSON.stringify(data)).then((res) => {
                    console.log(res);
                    this.loading = false;
                    if (res.code == 100) {
                      console.log(res.message);
                    } else {
                      console.log(res.message);
                    }
                  });
                }
              });
            } else {
              console.log("有数据表");
              console.log(this.listid);
              let idArr = [];
              let valueArr = [];
              this.dataList.map((item) =>
                item.child.map((sub) => {
                  idArr.push(sub.id);
                  valueArr.push(
                    `${sub.F_Observation}|${sub.F_FollowGuide}|${sub.F_IndependentCompletion}|${sub.remark}`
                  );
                })
              );
              let data = {
                listid: this.listid,
                id: idArr,
                value: valueArr,
              };
              console.log(data);
              console.log(JSON.stringify(data));
              postSaveForm(JSON.stringify(data)).then((res) => {
                console.log(res);
                this.loading = false;
                if (res.code == 100) {
                  console.log(res.message);
                } else {
                  console.log(res.message);
                }
              });
            }
          } else {
            this.$message({
              message: res.message,
              type: "error",
              center: true,
            });
            this.loading = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    addRemarkDialogVisibleShow(item_) {
      console.log(item_);
      this.remarkid = item_.id;
      this.textarea = item_.remark;
      this.addRemarkDialogVisible = true;
    },
    remarkSave() {
      this.dataList = this.dataList.map((item) => ({
        ...item,
        child: item.child.map((val) => ({
          ...val,
          remark: val.id == this.remarkid ? this.textarea : val.remark,
        })),
      }));
      this.addRemarkDialogVisible = false;
      console.log(this.dataList);
    },
  },
};
</script>
<style lang="less" scoped >
.specialist-operation-container {
  position: relative;
  .title-card {
    height: 156px;
    box-shadow: none;
    padding: 20px;
    margin-top: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
  .specialist-content {
    height: calc(100vh - 359px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px;
    .el-card {
      width: 49%;
      height: calc(100vh - 380px);
      margin-bottom: 20px;
      box-shadow: none;
      /deep/.el-card__body {
        padding: 0;
      }
      .specialist-header {
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
  .footer {
    height: 74px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    padding-right: 20px;
    .cancel,
    .save {
      width: 228px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      border-radius: 4px;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
    }
    .cancel {
      background: #d0d2e3;
    }
    .save {
      background: #5864ff;
      margin-left: 16px;
    }
  }
  .add-remark-dialog {
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
      .el-row {
        flex: 1;
        align-items: flex-end;
        .remark-cancel,
        .remark-save {
          width: 105px;
          height: 42px;
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
        .remark-cancel {
          background: #d0d2e3;
          margin-right: 14px;
        }
        .remark-save {
          background: #5864ff;
        }
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