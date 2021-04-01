<template>
  <div class="container" v-loading="loading">
    <el-card class="release-title-card"> 信息发布列表 </el-card>
    <el-card class="release-content-card">
      <el-row type="flex" align="middle" justify="space-between">
        <div class="row-left">
          <div class="addBtn" @click="addDialogVisible = true">
            <img src="@/assets/image/组 2094.png" alt="" />
            <span>新增</span>
          </div>
          <!-- <div class="editBtn">
            <img src="@/assets/image/路径 1080.png" alt="" />
            <span>编辑</span>
          </div>
          <div class="deleteBtn">
            <img src="@/assets/image/组 1365.png" alt="" />
            <span>删除</span>
          </div> -->
        </div>
        <div class="row-right">
          <el-select
            v-model="value"
            placeholder="选择条件"
            style="width: 50%; visibility: hidden"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            placeholder="输入关键字"
            v-model="inputVal"
            @keyup.enter.native="searchVal"
            ><i
              class="el-icon-date el-input__icon"
              slot="suffix"
              @click="searchVal"
            >
            </i>
          </el-input>
        </div>
      </el-row>
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="550">
        <!-- <el-table-column type="selection" width="100"> </el-table-column> -->
        <el-table-column prop="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="F_Title" label="标题" width="588">
        </el-table-column>
        <el-table-column prop="F_Power" label="权限" width="250">
          <template slot-scope="scope">
            <span v-if="scope.row.F_Power == 0">所有人</span>
            <span v-if="scope.row.F_Power == 1">教师</span>
            <span v-if="scope.row.F_Power == 2">学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="F_CreateTime" label="日期" width="250">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span
              style="color: #5864ff; cursor: pointer"
              @click="toDetail(scope.row)"
              >详情</span
            >
            <span
              style="color: #5864ff; cursor: pointer; margin-left: 10px"
              @click="edit(scope.row)"
              >编辑</span
            >
            <span
              style="color: #5864ff; cursor: pointer; margin-left: 10px"
              @click="deleted(scope.row)"
              >删除</span
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
        style="display: flex; justify-content: center; margin-top: 2px"
      >
      </el-pagination>
    </el-card>
    <!-- 信息发布弹框 -->
    <el-dialog
      title="信息发布"
      :visible.sync="addDialogVisible"
      @closed="addDialogClose"
      @opened="opened"
      width="800px"
      center
      ><div class="add-dialog">
        <el-row style="margin-bottom: 20px">
          <el-col>
            <div class="parent">标题</div>
            <el-input placeholder="请输入" v-model="titleVal"></el-input>
          </el-col>
        </el-row>
        <el-row class="main-text">正文内容</el-row>
        <editor
          ref="editorOne"
          v-model="detailVal"
          @change="changeEditor"
        ></editor>
        <el-row style="margin-top: 20px">
          <el-col
            :span="3"
            style="
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              color: #122073;
            "
            >查看权限</el-col
          >
          <el-col
            :span="21"
            style="
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              color: #122073;
            "
          >
            <el-radio v-model="radio" label="0">所有人</el-radio>
            <el-radio v-model="radio" label="2">仅学生</el-radio>
            <el-radio v-model="radio" label="1">仅教师</el-radio>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除提示弹框 -->
    <el-dialog
      :visible.sync="deleteDialogVisible"
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
            <span>删除提示</span>
            <span>确定删除？</span>
          </div>
        </div>
        <div class="reset-footer-dialog">
          <div class="reset-cancel" @click="deleteDialogVisible = false">
            取消
          </div>
          <div class="reset-reset" @click="dialogDeleted">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Editor from "@/components/admin/informationRelease/editor";
import {
  getInformationList,
  postSaveInformation,
  postDeleteInformation,
} from "api/admin-api/information";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "InformationReleaseList",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      inputVal: "",
      titleVal: "",
      F_Id: "",
      value: "",
      loading: false,
      addDialogVisible: false,
      deleteDialogVisible: false,
      detailVal: "",
      contentVal: "",
      radio: "0",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      tableData: [],
    };
  },
  components: {
    Editor,
  },
  created() {
    this.informationList();
  },

  watch: {
    addDialogVisible() {
      this.$nextTick(() => {
        console.log(this.$refs.editorOne);
        this.detailVal = this.contentVal;
      });
    },
  },
  methods: {
    /* 通知列表 */
    informationList() {
      let params = {
        page: this.page,
        size: this.size,
        searchValue: this.inputVal,
      };
      this.loading = true;
      getInformationList(params).then((res) => {
        this.loading = false;
        if (res.code !== 100) {
          this.$message({
            message: "获取通知消息列表失败！",
            type: "error",
            center: true,
          });
        } else {
          console.log(res.data.rows);
          this.total = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
            F_CreateTime: timeFormatSeconds(0, item.F_CreateTime),
          }));
        }
        console.log(res);
      });
    },
    toDetail(scope) {
      // $router.push('/admin/infodetail')
      console.log(scope);
      this.$router.push({
        path: "/admin/infodetail",
        query: {
          allData: encodeURIComponent(JSON.stringify(scope)),
        },
      });
    },
    edit(scope) {
      console.log(this.$refs.editorOne);
      console.log(scope);
      this.F_Id = scope.F_Id;
      this.titleVal = scope.F_Title;
      this.contentVal = scope.F_Content;
      this.radio = scope.F_Power.toString();
      this.addDialogVisible = true;
    },
    deleted(scope) {
      this.F_Id = scope.F_Id;
      this.deleteDialogVisible = true;
    },
    dialogDeleted() {
      let params = {
        keyValue: this.F_Id,
      };
      postDeleteInformation(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "删除失败！",
            type: "error",
            center: true,
          });
        } else {
          this.$message({
            message: "删除成功！",
            type: "success",
            center: true,
          });
          this.F_Id = "";
          this.deleteDialogVisible = false;
          this.informationList();
        }
      });
    },
    commit() {
      if (this.titleVal == "") {
        this.$message({
          message: "请输入标题！",
          type: "warning",
          center: true,
        });
      } else if (this.detailVal == "") {
        this.$message({
          message: "请输入内容！",
          type: "warning",
          center: true,
        });
      } else {
        let data = {
          F_Id: this.F_Id,
          F_Title: this.titleVal,
          F_content: encodeURIComponent(this.detailVal),
          F_Power: this.radio,
        };
        console.log(data);
        this.loading = true;
        postSaveInformation(data).then((res) => {
          this.loading = false;
          if (res.code !== 100) {
            this.$message({
              message: "发布失败！",
              type: "error",
              center: true,
            });
          } else {
            this.informationList();
            this.addDialogClose();
            this.$message({
              message: "发布成功！",
              type: "success",
              center: true,
            });
          }
        });
      }
    },
    opened() {
      this.detailVal = this.contentVal;
    },
    addDialogClose() {
      this.addDialogVisible = false;
      this.F_Id = "";
      this.titleVal = "";
      this.detailVal = "";
      this.radio = "0";
      this.contentVal = "";
    },
    changeEditor(data) {},
    searchVal() {
      this.informationList();
    },
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.informationList();
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-input--suffix .el-input__inner {
  border: none;
}
/deep/ .el-icon-date {
  background: url("../../../assets/image/搜索.png") center no-repeat;
  background-size: 20px 20px;
}
/deep/ .el-icon-date:before {
  content: "";
  font-size: 16px;
  visibility: hidden;
}
/deep/.el-table::before {
  height: 0; // 将高度修改为0
}
/deep/ .el-table th,
.el-table tr {
  background: #f7f8fb;
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
  .release-title-card {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: 800;
    color: #122073;
    opacity: 1;
    padding-left: 30px;
    box-sizing: border-box;
    margin-top: 5px;
  }
  .release-content-card {
    height: 708px;
    margin: 20px;
    padding: 18px 28px;
    box-sizing: border-box;
    .el-row {
      height: 82px;
      .row-left {
        height: 100%;
        display: flex;
        align-items: center;
        .addBtn,
        .editBtn,
        .deleteBtn {
          width: 88px;
          height: 46px;
          opacity: 1;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          opacity: 1;
          cursor: pointer;
          box-sizing: border-box;
          img {
            margin-right: 10px;
          }
        }
        .addBtn {
          background: #5864ff;
          margin-right: 12px;
        }
        .editBtn {
          background: #5864ff;
          margin-right: 12px;
        }
        .deleteBtn {
          background: #fdbe00;
        }
      }
      .row-right {
        display: flex;
        border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        border-radius: 6px;
      }
    }
  }
  .add-dialog {
    .parent,
    .main-text {
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