<template>
  <div class="container" v-loading="loading">
    <el-card class="title-card">
      <el-row type="flex" justify="space-between">
        <el-col class="title-card-first-col" :span="20">
          <span class="title-card-name">{{ f_name }}</span>
        </el-col>
        <el-col class="title-card-second-col" :span="6">
          <div class="card-btn-add" @click="addDialogVisible = true">
            <img src="@/assets/image/组 2094.png" alt="" />
            <span>添加科室</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="container-body">
      <div style="display: flex; flex-wrap: wrap; justify-items: start">
        <div class="box" v-for="(item, index) in tableData" :key="index">
          <el-row type="flex" align="middle" style="margin-bottom: 18px">
            <div class="title-name">{{ item.name }}</div>
          </el-row>
          <el-row class="row-header">
            <el-col :span="16" :offset="1">项目</el-col>
          </el-row>
          <div class="main-body">
            <el-row
              class="row-body"
              v-for="(sub, index) in item.child"
              :key="index"
              :style="{
                background:
                  index % 2 == 0
                    ? 'rgba(234, 236, 246, 0.53)'
                    : 'rgba(234, 236, 246, 1)',
              }"
            >
              <el-col :span="16" :offset="1" v-show="!sub.iptShow">{{
                sub.name
              }}</el-col>

              <el-col :span="20" v-show="sub.iptShow"
                ><input type="text" v-model="sub.name"
              /></el-col>
              <el-col :span="4" v-show="sub.iptShow"
                ><div class="save" @click="save(item, sub)">保存</div></el-col
              >
            </el-row>

            <el-row
              class="row-add"
              v-show="item.addShow"
              @click.native="add(item)"
            >
              <el-col :span="4" class="add-icon"
                ><img src="@/assets/image/add.png" alt=""
              /></el-col>
              <el-col :span="20" class="add-text">添加项目</el-col>
            </el-row>
            <el-row class="row-input" v-show="!item.addShow">
              <el-col :span="20"
                ><input type="text" v-model="item.iptVal"
              /></el-col>
              <el-col :span="4"
                ><div class="add" @click="saveAdd(item)">保存</div></el-col
              >
            </el-row>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 新增弹框 -->
    <el-dialog
      title="新增评教记录"
      :visible.sync="addDialogVisible"
      @closed="addDialogClose"
      width="450px"
      center
      ><div class="add-dialog">
        <el-row style="margin-bottom: 20px">
          <el-col>
            <div class="parent">科室</div>
            <el-input v-model="department"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="saveAssessment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCheckInfoContent,
  postSaveAssessmentContent,
  postAddAssessmentSettings,
} from "api/admin-api/trainingPractice";
export default {
  name: "AddCheckInfo",
  data() {
    return {
      loading: false,
      f_id: "",
      f_name: "",
      f_assessment: "",
      f_version: "",
      addDialogVisible: false,
      department: "",
      tableData: [],
    };
  },
  created() {
    this.f_id = this.$route.query.f_id;
    this.f_name = this.$route.query.f_name;
    this.f_assessment = this.$route.query.f_assessment;
    this.f_version = this.$route.query.f_version;
    // this.checkInfoList();
    // this.addKhTable();
  },
  methods: {
    /* 新增考核表 */
    addKhTable() {
      let data = {
        F_Assessment: this.f_assessment,
        F_Version: this.f_version,
      };
      postAddAssessmentSettings(data).then((res) => {
        console.log(res);
      });
    },
    /* 获取考核配置内容 */
    checkInfoList() {
      this.loading = true;
      let params = {
        id: this.f_id,
      };
      getCheckInfoContent(params).then((res) => {
        this.loading = false;
        if (res.code == 100) {
          console.log(res.data);
          this.tableData = res.data;
          this.tableData = this.tableData.map((item) => ({
            ...item,
            checked: false,
            addShow: true,
            iptVal: "",
            child:
              item.child !== undefined
                ? item.child.map((sub) => ({
                    ...sub,
                    iptShow: false,
                  }))
                : [],
          }));
          console.log(this.tableData);
        } else {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        }
      });
    },

    save(item, sub) {
      let data = {
        F_Id: sub.id,
        F_AssessmentId: this.f_id,
        F_ParentId: item.id,
        F_Name: sub.name,
      };
      if (sub.name == "") {
        this.$message({
          message: "请输入项目名称！",
          type: "warning",
          center: true,
        });
      } else {
        postSaveAssessmentContent(data).then((res) => {
          sub.iptShow = false;
          if (res.code == 100) {
            this.$message({
              message: "修改成功！",
              type: "success",
              center: true,
            });
            this.checkInfoList();
          } else {
            this.$message({
              message: "修改失败！",
              type: "error",
              center: true,
            });
          }
        });
      }
    },
    add(item) {
      item.addShow = false;
      console.log(item);
    },
    saveAdd(item) {
      console.log(item);
      let data = {
        F_AssessmentId: this.f_id,
        F_ParentId: item.id,
        F_Name: item.iptVal,
      };
      console.log(data);
      if (item.iptVal == "") {
        this.$message({
          message: "请输入项目名称！",
          type: "warning",
          center: true,
        });
      } else {
        postSaveAssessmentContent(data).then((res) => {
          item.addShow = true;
          item.iptVal = "";
          if (res.code == 100) {
            this.$message({
              message: "新增成功！",
              type: "success",
              center: true,
            });

            this.checkInfoList();
          } else {
            this.$message({
              message: "新增失败！",
              type: "error",
              center: true,
            });
          }
        });
      }
    },
    /* 关闭新增弹框 */
    addDialogClose() {
      this.addDialogVisible = false;
      this.department = "";
    },
    /* 新增考核配置 */
    saveAssessment() {
      let data = {
        F_AssessmentId: this.f_id,
        F_ParentId: 0,
        F_Name: this.department,
      };
      console.log(data);
      if (this.department == "") {
        this.$message({
          message: "请输入科室！",
          type: "warning",
          center: true,
        });
      } else {
        postSaveAssessmentContent(data).then((res) => {
          this.addDialogClose();
          if (res.code == 100) {
            this.$message({
              message: "新增成功！",
              type: "success",
              center: true,
            });
            // this.checkInfoList();
          } else {
            this.$message({
              message: "新增失败！",
              type: "error",
              center: true,
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-checkbox__inner {
  width: 22px;
  height: 22px;
}
/deep/.el-checkbox__inner::after {
  box-sizing: content-box;
  content: "";
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 12px;
  left: 6px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 6px;
  // transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
}
/deep/.el-checkbox__label {
  height: 24px;
  font-size: 18px;
  font-family: "PingFang SC";
  font-weight: 800;
  color: #122073;
  opacity: 1;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  height: 24px;
  font-size: 18px;
  font-family: "PingFang SC";
  font-weight: 800;
  color: #122073;
  opacity: 1;
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

.container {
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
        margin-right: 12px;
        opacity: 1;
      }
    }
    .title-card-second-col {
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .card-btn-add {
        width: 116px;
        height: 46px;
        background: #5864ff;
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 16px;
        img {
          width: 15px;
          height: 15px;
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
      .card-btn-delete {
        width: 116px;
        height: 46px;
        background: #fdbe00;
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 15px;
          height: 17px;
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
  .container-body {
    height: calc(100vh - 250px);
    margin: 20px;
    padding: 35px;
    box-sizing: border-box;
    overflow: auto;
    .box {
      width: 30%;
      margin-right: 40px;
      margin-bottom: 40px;
      .title-name {
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .row-header {
        display: flex;
        align-items: center;
        height: 46px;
        background: #5864ff;
        opacity: 1;
        border-radius: 6px 6px 0px 0px;
        .el-col {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
        .col-delete,
        .col-edit {
          display: flex;
          justify-content: center;
        }
      }
      .main-body {
        height: calc(100vh - 450px);
        overflow: auto;
        .row-body {
          display: flex;
          align-items: center;
          height: 48px;
          background: #eaecf6;
          .el-col {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
          .col-delete {
            display: flex;
            justify-content: center;
            div {
              width: 19px;
              height: 19px;
              background: #ff6760;
              border-radius: 50%;
              opacity: 1;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .col-edit {
            display: flex;
            justify-content: center;
          }
          input {
            width: 80%;

            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            border: none;
            outline: none;
            background: none;
            margin-left: 25px;
          }
          .save {
            width: 46px;
            height: 34px;
            background: #5864ff;
            opacity: 1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #ffffff;
          }
        }
        .row-input {
          height: 48px;
          display: flex;
          align-items: center;
          background: rgba(234, 236, 246, 0.23);
          input {
            width: 80%;

            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            border: none;
            outline: none;
            background: none;
            margin-left: 25px;
          }
          .add {
            width: 46px;
            height: 34px;
            background: #5864ff;
            opacity: 1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #ffffff;
          }
        }
        .row-add {
          display: flex;
          align-items: center;
          height: 48px;
          background: rgba(234, 236, 246, 0.53);
          cursor: pointer;
          .add-icon {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .add-text {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #5864ff;
            opacity: 1;
          }
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
    }
  }
  .add-dialog {
    .parent,
    .child {
      height: 22px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      line-height: 22px;
      color: #122073;
      opacity: 1;
      margin-bottom: 12px;
    }
  }
  .el-button--default {
    width: 150px;
    height: 42px;
    background: #d0d2e3;
    opacity: 1;
    border-radius: 4px;

    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #ffffff;
  }
  .el-button--primary {
    width: 150px;
    height: 42px;
    background: #5864ff;
    opacity: 1;
    border-radius: 4px;
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #ffffff;
  }
}
</style>