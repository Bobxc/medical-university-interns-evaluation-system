<template>
  <div class="container" v-loading="loading">
    <el-card class="release-title-card"> 机构管理 </el-card>
    <el-card class="release-content-card">
      <el-row type="flex" align="middle" justify="space-between">
        <div class="row-left">
          <div class="addBtn" @click="addOrganziationDialogVisible = true">
            <img src="@/assets/image/组 2094.png" alt="" />
            <span>新增</span>
          </div>
        </div>
      </el-row>
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="550">
        <el-table-column prop="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="companyName" label="机构名称" width="372">
        </el-table-column>
        <el-table-column prop="code" label="机构编码" width="250">
        </el-table-column>
        <el-table-column prop="companyShortName" label="机构简称" width="372">
        </el-table-column>
        <el-table-column label="机构类型" width="272">
          <template slot-scope="scope">
            <div v-if="scope.row.type == 1">学校</div>
            <div v-if="scope.row.type == 2">医院</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span
              style="color: #5864ff; cursor: pointer"
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
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        style="display: flex; justify-content: center; margin-top: 2px"
      >
      </el-pagination> -->
    </el-card>
    <!-- 添加机构弹框 -->
    <el-dialog
      title="添加机构"
      :visible.sync="addOrganziationDialogVisible"
      @closed="addOrganziationDialogClose"
      width="895px"
      center
    >
      <div class="add-training-dialog">
        <el-row style="margin-bottom: 28px">
          <div class="row1">
            <el-col :span="11">
              <div class="hospital">机构类型</div>
              <el-select
                v-model="organziationTypeVal"
                placeholder="选择机构"
                style="width: 100%"
              >
                <el-option
                  v-for="item in organziationOptions"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <div class="department">机构名称</div>
              <el-input
                v-model="organziationNameVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
        </el-row>
        <el-row style="margin-bottom: 28px">
          <div class="row2">
            <el-col :span="11">
              <div class="add-time">机构简称</div>
              <el-input
                v-model="organziationShortNameVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
            <el-col :span="11">
              <div class="add-address">机构编码</div>
              <el-input
                v-model="organziationEnCodeVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrganziationDialogClose">取 消</el-button>
        <el-button type="primary" @click="organziationSave">确 定</el-button>
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
import {
  getOrganziation,
  postAddOrganziation,
  postDeleteOrganziation,
} from "api/admin-api/profile";
export default {
  name: "Organziation",
  data() {
    return {
      loading: false,
      tableData: [],
      addOrganziationData: {},
      addOrganziationDialogVisible: false,
      deleteDialogVisible: false,
      organziationNameVal: "",
      organziationShortNameVal: "",
      organziationEnCodeVal: "",
      F_CompanyId: "",
      organziationOptions: [
        {
          id: "1",
          text: "学校",
        },
        {
          id: "2",
          text: "医院",
        },
      ],
      organziationTypeVal: "",
    };
  },
  created() {
    this.organziationData();
  },
  methods: {
    organziationData() {
      let params = {
        type: "",
      };
      this.loading = true;
      getOrganziation(params).then((res) => {
        this.loading = false;
        console.log(res);
        this.tableData = res.data;
        this.tableData = this.tableData.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
      });
    },

    organziationSave() {
      if (this.organziationTypeVal == "") {
        this.$message({
          message: "请选择机构类型！",
          type: "warning",
          center: true,
        });
      } else if (this.organziationNameVal == "") {
        this.$message({
          message: "请输入机构名称！",
          type: "warning",
          center: true,
        });
      } else if (this.organziationShortNameVal == "") {
        this.$message({
          message: "请输入机构简称！",
          type: "warning",
          center: true,
        });
      } else if (this.organziationEnCodeVal == "") {
        this.$message({
          message: "请输入机构编码！",
          type: "warning",
          center: true,
        });
      } else {
        let data = {
          F_FullName: this.organziationNameVal,
          F_ShortName: this.organziationShortNameVal,
          F_Type: this.organziationTypeVal,
          F_EnCode: this.organziationEnCodeVal,
          F_CompanyId: this.F_CompanyId,
          F_ParentId: 0,
        };
        this.loading = true;
        postAddOrganziation(data).then((res) => {
          console.log(res);
          this.loading = false;
          if (res.data == "机构名字已经存在") {
            this.$message({
              message: "机构名字已经存在！",
              type: "warning",
              center: true,
            });
          } else {
            this.addOrganziationDialogClose();
            this.$message({
              message: "保存成功！",
              type: "success",
              center: true,
            });
            this.organziationData();
          }
        });
      }
    },
    edit(scope) {
      console.log(scope);
      this.organziationTypeVal = scope.type;
      this.organziationNameVal = scope.companyName;
      this.organziationShortNameVal = scope.companyShortName;
      this.organziationEnCodeVal = scope.code;
      this.F_CompanyId = scope.companyId;
      this.addOrganziationDialogVisible = true;
    },
    deleted(scope) {
      console.log(scope);
      this.F_CompanyId = scope.companyId;
      this.deleteDialogVisible = true;
    },
    dialogDeleted() {
      let data = {
        F_CompanyId: this.F_CompanyId,
      };
      this.loading = true;
      postDeleteOrganziation(data).then((res) => {
        this.loading = false;
        this.$message({
          message: res.data,
          type: "success",
          center: true,
        });
        this.deleteDialogVisible = false;
        this.organziationData();
      });
    },
    addOrganziationDialogClose() {
      this.addOrganziationDialogVisible = false;
      this.organziationTypeVal = "";
      this.organziationNameVal = "";
      this.organziationShortNameVal = "";
      this.organziationEnCodeVal = "";
      this.F_CompanyId = "";
    },
  },
};
</script>
<style lang="less" scoped>
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
        .deleteBtn {
          // width: 88px;
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
          width: 120px;
          background: #5864ff;
          margin-right: 12px;
        }

        .deleteBtn {
          width: 88px;
          background: #fdbe00;
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
  .add-training-dialog {
    .row1 {
      display: flex;
      justify-content: space-between;
      .hospital {
        height: 22px;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        line-height: 22px;
        color: #122073;
        opacity: 1;
        margin-bottom: 12px;
      }
      .department {
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
    .row2 {
      display: flex;
      justify-content: space-between;
      /deep/.el-input__prefix {
        transform: translateX(355px);
      }
      /deep/.el-input--prefix .el-input__inner {
        padding-left: 15px;
      }
      /deep/ .el-icon-date {
        background: url("../../../assets/image/组 1234.png") center no-repeat;
        background-size: 20px 20px;
      }
      /deep/ .el-icon-date:before {
        content: "";
        font-size: 16px;
        visibility: hidden;
      }
      .add-time {
        height: 22px;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        line-height: 22px;
        color: #122073;
        opacity: 1;
        margin-bottom: 12px;
      }
      .add-address {
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
    .row3 {
      display: flex;
      justify-content: space-between;
      .add-type {
        height: 22px;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        line-height: 22px;
        color: #122073;
        opacity: 1;
        margin-bottom: 12px;
      }
      .add-teacher {
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
    .row4 {
      .training-content {
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
  }
  .el-button--default {
    width: 176px;
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
    width: 176px;
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