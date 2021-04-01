<template>
  <div class="disease-container" v-loading="loading">
    <el-card class="title-card">
      <el-row type="flex" justify="space-between">
        <el-col class="title-card-first-col" :span="20">
          <span class="title-card-name">轮转期间学习病种及其例数记录</span>
        </el-col>
        <el-col class="title-card-second-col" :span="3">
          <div class="card-btn" @click="resetDialogVisible = true">
            <img src="@/assets/image/路径 1013.png" alt="" />
            <span>重置</span>
          </div>
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
        <el-row class="header-row" type="flex" align="center">
          <el-col>
            <div></div>
            <span>{{ item.name }}</span>
          </el-col>
        </el-row>
        <el-row class="body-row">
          <el-col
            :span="7"
            style="height: 100%; margin-right: 26px"
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
                        ? 'rgba(234, 236, 246, 0.27)'
                        : 'rgba(234, 236, 246, 0.53)',
                  }"
                  >{{ item__.name }}</el-col
                >
                <el-col
                  class="col2"
                  :span="7"
                  :style="{
                    background:
                      index % 2 == 0
                        ? 'rgba(234, 236, 246, 0.53)'
                        : 'rgba(234, 236, 246, 1)',
                  }"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="item__.inputval"
                    type="number"
                    oninput="value=value.replace('-','')"
                  ></el-input>
                </el-col>
                <el-col
                  class="col3"
                  :span="4"
                  :style="{
                    background:
                      index % 2 == 0
                        ? 'rgba(234, 236, 246, 0.53)'
                        : 'rgba(234, 236, 246, 1)',
                  }"
                >
                  <div class="add" @click="add(item__)">
                    <img src="@/assets/image/组 2030.png" alt="" />
                  </div>
                  <div class="subtract" @click="subtract(item__)">
                    <img src="@/assets/image/组 2031.png" alt="" />
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="footer">
      <div class="cancel">取消</div>
      <div class="save" @click="saveForm">保存</div>
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
} from "api/student-api/rotationStudyRecord";
export default {
  name: "Disease",
  data() {
    return {
      addIptVal: "",
      resetDialogVisible: false,
      loading: false,
      f_recordeid: "",
      listid: "",
      dataList: [],
      listContentData: [],
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    /* 获取轮转期间学习病种及其例数考核表内容 */
    getPageList() {
      this.loading = true;
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getSxList(params).then((res) => {
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
                this.listid = res.data[0].F_ListId;
                this.listContentData = res.data;
                console.log(this.listContentData);
                getRotationStudyRecordList().then(
                  (res) => {
                    console.log(res);
                    this.dataList = res.data;
                    this.dataList = this.dataList.map((dep) => {
                      return {
                        id: dep.id,
                        name: dep.name,
                        child: dep.child.slice(0, 3).map((dep_) => {
                          return {
                            id: dep_.id,
                            name: dep_.name,
                            child: dep_.child.map((dep__) => {
                              return {
                                id: dep__.id,
                                name: dep__.name,
                                inputval: 0,
                              };
                            }),
                          };
                        }),
                      };
                    });
                    this.dataList = this.dataList.map((item) => ({
                      ...item,
                      child: item.child.map((val) => ({
                        ...val,
                        child: val.child.map((sub) => ({
                          ...sub,
                          inputval:
                            this.listContentData.find(
                              (dep) => dep.F_AssessmentContentId == sub.id
                            ) !== undefined
                              ? this.listContentData.find(
                                  (dep_) => dep_.F_AssessmentContentId == sub.id
                                ).F_Times !== undefined
                                ? this.listContentData.find(
                                    (dep_) =>
                                      dep_.F_AssessmentContentId == sub.id
                                  ).F_Times
                                : 0
                              : 0,
                        })),
                      })),
                    }));
                    console.log(this.dataList);
                    this.loading = false;
                  },
                  (error) => {
                    console.log(error);
                    this.loading = false;
                  }
                );
              } else {
                console.log("无数据表");
                console.log(this.dataList);
                getRotationStudyRecordList().then(
                  (res) => {
                    console.log(res);
                    this.dataList = res.data;
                    this.dataList = this.dataList.map((dep) => {
                      return {
                        id: dep.id,
                        name: dep.name,
                        child: dep.child.slice(0, 3).map((dep_) => {
                          return {
                            id: dep_.id,
                            name: dep_.name,
                            child: dep_.child.map((dep__) => {
                              return {
                                id: dep__.id,
                                name: dep__.name,
                                inputval: 0,
                              };
                            }),
                          };
                        }),
                      };
                    });
                    console.log(this.dataList);
                    this.loading = false;
                  },
                  (error) => {
                    console.log(error);
                    this.loading = false;
                  }
                );
              }
            }
          });
        }
      });
    },
    add(item__) {
      console.log(item__);
      if (item__.inputval !== "") {
        item__.inputval++;
      }
      console.log(this.dataList);
    },
    subtract(item__) {
      if (item__.inputval !== "" && item__.inputval > 0) {
        item__.inputval--;
      }
      console.log(this.dataList);
    },
    /* 提交表单 */
    saveForm() {
      this.loading = true;
      console.log(this.listContentData);
      if (this.listContentData.length == 0) {
        console.log("无内容，需新建数据表");
        console.log(this.dataList);
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
              item.child.map((val) =>
                val.child.map((sub) => {
                  idArr.push(`${sub.id}`);
                  valueArr.push(`${sub.inputval}`);
                })
              )
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
                this.$router.push("/disease/success");
              } else {
                this.$router.push("/disease/default");
              }
            });
          }
        });
      } else {
        console.log("有数据表");
        console.log(this.dataList);
        this.dataList = this.dataList.map((item) => ({
          ...item,
          child: item.child.map((sub) => ({
            ...sub,
            child: sub.child.map((val) => ({
              ...val,
              inputval: val.inputval == "" ? 0 : val.inputval,
            })),
          })),
        }));
        let idArr = [];
        let valueArr = [];
        this.dataList.map((item) =>
          item.child.map((val) =>
            val.child.map((sub) => {
              idArr.push(`${sub.id}`);
              valueArr.push(`${sub.inputval}`);
            })
          )
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
            this.$router.push("/disease/success");
          } else {
            this.$router.push("/disease/default");
          }
        });
      }
    },

    /* 重置 */
    reset() {
      this.loading = true;
      this.resetDialogVisible = false;
      getRotationStudyRecordList().then(
        (res) => {
          console.log(res);
          this.dataList = res.data;
          this.dataList = this.dataList.map((dep) => {
            return {
              id: dep.id,
              name: dep.name,
              child: dep.child.slice(0, 3).map((dep_) => {
                return {
                  id: dep_.id,
                  name: dep_.name,
                  child: dep_.child.map((dep__) => {
                    return {
                      id: dep__.id,
                      name: dep__.name,
                      inputval: 0,
                    };
                  }),
                };
              }),
            };
          });
          console.log(this.dataList);
          this.saveForm();
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
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
    height: calc(100vh - 303px);
    overflow: auto;
    margin: 20px;
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
        .el-col {
          display: flex;
          align-items: center;
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
        height: 520px;
        padding: 15px 0 0 25px;
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
            .col2 {
              .el-input {
                height: 48px;
                /deep/.el-input__inner {
                  height: 100%;
                  border: none;
                  background: none;
                  font-size: 16px;
                  font-family: "PingFang SC";
                  font-weight: 400;
                  color: rgba(18, 32, 115, 0.2);
                }
              }
              /deep/input[type="number"] {
                -moz-appearance: textfield;
              }
              /deep/input[type="number"]::-webkit-inner-spin-button,
              /deep/input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            }
            .col3 {
              height: 48px;
              display: flex;
              justify-content: space-around;
              align-items: center;
              .add,
              .subtract {
                cursor: pointer;
              }
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
        .ipt-disease-row {
          .ipt1 {
            /deep/.el-input__inner {
              height: 47px;
              border: none;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: rgba(18, 32, 115, 0.2);
              padding-left: 0;
            }
          }

          .col-btn {
            width: 46px;
            height: 34px;
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
          }
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