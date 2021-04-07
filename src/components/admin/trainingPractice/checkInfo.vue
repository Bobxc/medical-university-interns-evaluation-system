<template>
  <div class="container" v-loading="loading">
    <el-card class="detail-title-card">
      <div class="title-left">
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="detail-title">考核内容列表</div>
      </div>
    </el-card>
    <el-card class="content-card">
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="540">
        <el-table-column prop="index" label="序号" align="center" width="210">
        </el-table-column>
        <el-table-column prop="f_name" label="考核项目" width="1070">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span
              style="color: #5864ff; cursor: pointer; margin-right: 10px"
              @click="add(scope.row)"
              >新增版本</span
            >
            <span
              style="color: #5864ff; cursor: pointer"
              @click="toDetail(scope.row)"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :total="total"
        style="display: flex; justify-content: center"
      >
      </el-pagination>
    </el-card>
    <!-- 新增弹框 -->
    <el-dialog title="是否读取旧版本的考核表?" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="请输入新版本号"
        :visible.sync="noKhTableVisible"
        @closed="cancelVerson"
        append-to-body
      >
        <el-input placeholder="请输入" v-model="f_version"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelVerson">取消</el-button>
          <el-button type="primary" @click="confirmVersion">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        width="30%"
        title="请输入新版本号"
        :visible.sync="yesKhTableVisible"
        @closed="cancelVerson2"
        append-to-body
      >
        <el-input placeholder="请输入" v-model="f_version2"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelVerson2">取消</el-button>
          <el-button type="primary" @click="confirmVersion2">确定</el-button>
        </div>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="noKhTableVisible = true">否</el-button>
        <el-button type="primary" @click="yesKhTableVisible = true"
          >是</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCheckInfoList,
  postAddAssessmentSettings,
  postSaveAssessmentContent,
  getOldAssessmentContent,
} from "api/admin-api/trainingPractice";
export default {
  name: "checkInfo",
  data() {
    return {
      page: 1,
      size: 8,
      total: 0,
      f_version: "",
      f_version2: "",
      f_id: "",
      f_name: "",
      f_assessment: "",
      f_assessmentid: "",
      loading: false,
      noKhTableVisible: false,
      yesKhTableVisible: false,
      outerVisible: false,
      oldTableData: [],
      tableData: [],
    };
  },
  created() {
    this.tableList();
  },
  methods: {
    tableList() {
      this.loading = true;
      let params = {
        page: this.page,
        size: this.size,
      };
      getCheckInfoList(params).then((res) => {
        console.log(res);
        this.loading = false;
        if (res.code == 100) {
          // this.total = res.data.records;
          this.tableData = res.data;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
        } else {
          this.$message({
            message: "请求失败!",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* 新增 */
    add(data) {
      console.log(data);
      this.outerVisible = true;
      this.f_id = data.f_id;
      this.f_name = data.f_name;
      this.f_assessment = data.f_assessment;
    },
    /* to详情页 */
    toDetail(data) {
      console.log(data);
      if (data.f_assessment == 3) {
        console.log("轮转期间学习病种记录");
        this.$router.push({
          path: "/admin/diseaseset",
          query: {
            f_id: data.f_id,
            f_name: data.f_name,
            type: "detail",
          },
        });
      } else {
        this.$router.push({
          path: "/admin/practicerecord",
          query: {
            f_id: data.f_id,
            f_name: data.f_name,
            type: "detail",
          },
        });
      }
    },
    /* 切换页码 */
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.tableList();
    },
    confirmVersion() {
      //不赋值新增
      if (this.f_version == "") {
        this.$message({
          message: "请输入新版本号",
          type: "warning",
          center: true,
        });
      } else {
        console.log(this.f_id);
        let data = {
          F_Assessment: this.f_assessment,
          F_Version: this.f_version,
        };
        this.loading = true;
        postAddAssessmentSettings(data).then((res) => {
          this.loading = false;
          if (res.code == 100) {
            if (this.f_assessment == 3) {
              this.$router.push({
                path: "/admin/diseaseset",
                query: {
                  f_id: res.data,
                  f_name: this.f_name,
                  f_assessment: this.f_assessment,
                  f_version: this.f_version,
                },
              });
            } else {
              this.$router.push({
                // path: "/admin/addcheckinfo",
                path: "/admin/practicerecord",
                query: {
                  f_id: res.data,
                  f_name: this.f_name,
                  f_assessment: this.f_assessment,
                  f_version: this.f_version,
                },
              });
            }
          } else {
            this.$message({
              message: "新增考核表失败！",
              type: "error",
              center: true,
            });
          }
          console.log(res);
        });
      }
    },
    confirmVersion2() {
      //赋值
      if (this.f_version2 == "") {
        this.$message({
          message: "请输入新版本号",
          type: "warning",
          center: true,
        });
      } else {
        console.log(this.f_id);
        // 1、读取旧表数据
        let params = {
          type: Number(this.f_assessment),
        };
        this.loading = true;
        getOldAssessmentContent(params).then((res) => {
          if (res.code !== 100) {
            this.loading = false;
            this.$message({
              message: "获取旧考核表失败！",
              type: "error",
              center: true,
            });
          } else {
            this.oldTableData = res.data;
            console.log(this.oldTableData);
            let data = {
              F_Assessment: this.f_assessment,
              F_Version: this.f_version2,
            };
            postAddAssessmentSettings(data).then((res) => {
              if (res.code !== 100) {
                this.loading = false;
                this.$message({
                  message: "新增考核表失败！",
                  type: "error",
                  center: true,
                });
              } else {
                this.f_assessmentid = res.data;
                if (this.oldTableData.length) {
                  if (this.f_assessment == 3) {
                    this.oldTableData.map((item) => {
                      let data = {
                        F_AssessmentId: this.f_assessmentid,
                        F_Name: item.name,
                        F_ParentId: 0,
                      };
                      postSaveAssessmentContent(data).then((res) => {
                        this.loading = false;
                        if (res.code !== 100) {
                          this.$message({
                            message: "请求错误！",
                            type: "error",
                            center: true,
                          });
                        } else {
                          console.log(item);
                          if (item.child) {
                            item.child.map((sub) => {
                              let data = {
                                F_AssessmentId: this.f_assessmentid,
                                F_Name: sub.name,
                                F_ParentId: res.data,
                              };
                              postSaveAssessmentContent(data).then((res) => {
                                if (res.code !== 100) {
                                  this.$message({
                                    message: "请求错误！",
                                    type: "error",
                                    center: true,
                                  });
                                } else {
                                  if (sub.child) {
                                    sub.child.map((dep) => {
                                      let data = {
                                        F_AssessmentId: this.f_assessmentid,
                                        F_Name: dep.name,
                                        F_ParentId: res.data,
                                      };
                                      postSaveAssessmentContent(data).then(
                                        (res) => {
                                          if (res.code !== 100) {
                                            this.$message({
                                              message: "请求错误！",
                                              type: "error",
                                              center: true,
                                            });
                                          } else {
                                            this.$router.push({
                                              path: "/admin/diseaseset",
                                              query: {
                                                f_id: this.f_assessmentid,
                                                f_name: this.f_name,
                                                type: "detail",
                                              },
                                            });
                                          }
                                        }
                                      );
                                    });
                                  } else {
                                    this.$router.push({
                                      path: "/admin/diseaseset",
                                      query: {
                                        f_id: this.f_assessmentid,
                                        f_name: this.f_name,
                                        type: "detail",
                                      },
                                    });
                                  }
                                }
                              });
                            });
                          } else {
                            this.$router.push({
                              path: "/admin/diseaseset",
                              query: {
                                f_id: this.f_assessmentid,
                                f_name: this.f_name,
                                type: "detail",
                              },
                            });
                          }
                        }
                      });
                    });
                  } else {
                    this.oldTableData.map((item) => {
                      let data = {
                        F_AssessmentId: this.f_assessmentid,
                        F_Name: item.name,
                        F_ParentId: 0,
                      };
                      postSaveAssessmentContent(data).then((res) => {
                        this.loading = false;
                        if (res.code !== 100) {
                          this.$message({
                            message: "请求错误！",
                            type: "error",
                            center: true,
                          });
                        } else {
                          console.log(item);
                          if (item.child) {
                            item.child.map((sub) => {
                              let data = {
                                F_AssessmentId: this.f_assessmentid,
                                F_Name: sub.name,
                                F_ParentId: res.data,
                              };
                              postSaveAssessmentContent(data).then((res) => {
                                if (res.code !== 100) {
                                  this.$message({
                                    message: "请求错误！",
                                    type: "error",
                                    center: true,
                                  });
                                } else {
                                  this.$router.push({
                                    path: "/admin/practicerecord",
                                    query: {
                                      f_id: this.f_assessmentid,
                                      f_name: this.f_name,
                                      type: "detail",
                                    },
                                  });
                                }
                              });
                            });
                          } else {
                            this.$router.push({
                              path: "/admin/practicerecord",
                              query: {
                                f_id: this.f_assessmentid,
                                f_name: this.f_name,
                                type: "detail",
                              },
                            });
                          }
                        }
                      });
                    });
                  }
                } else {
                  //直接进详情页
                  this.loading = false;
                  if (this.f_assessment == 3) {
                    this.$router.push({
                      path: "/admin/diseaseset",
                      query: {
                        f_id: this.f_assessmentid,
                        f_name: this.f_name,
                        type: "detail",
                      },
                    });
                  } else {
                    this.$router.push({
                      path: "/admin/practicerecord",
                      query: {
                        f_id: this.f_assessmentid,
                        f_name: this.f_name,
                        type: "detail",
                      },
                    });
                  }
                }
              }
            });
          }
        });
      }
    },

    cancelVerson() {
      this.f_version = "";
      this.noKhTableVisible = false;
    },
    cancelVerson2() {
      this.f_version2 = "";
      this.yesKhTableVisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-table::before {
  height: 0; // 将高度修改为0
}
/deep/ .el-table th,
.el-table tr {
  background: #f7f8fb;
}
/deep/.el-table thead {
  font-size: 18px;
  font-family: "PingFang SC";
  font-weight: 500;
  color: #122073;
  opacity: 1;
}
/deep/.el-table {
  font-size: 16px;
  font-family: "PingFang SC";
  font-weight: 400;
  color: rgba(18, 32, 115, 0.85);
}
.container {
  .detail-title-card {
    height: 110px;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    /deep/.el-card__body {
      width: 100%;
      height: 100%;
      display: flex;
    }
    /deep/.el-breadcrumb {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
    }
    /deep/.el-breadcrumb__inner {
      color: #122073;
    }
    .title-left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .detail-title {
        font-size: 20px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .detail-content {
        display: flex;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
        span {
          margin-right: 74px;
        }
      }
    }
  }
  .content-card {
    height: calc(100vh - 260px);
    margin: 20px;
    padding: 20px 28px;
    box-sizing: border-box;
    .search-condition {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .search-left {
        display: flex;
      }
    }
  }
}
</style>