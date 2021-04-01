<template>
  <div class="container" v-loading="loading">
    <el-card class="release-title-card"> 角色管理 </el-card>
    <el-card class="release-content-card">
      <el-row type="flex" align="middle" justify="space-between">
        <div class="row-left">
          <div class="addBtn" @click="addRoleDialogVisible = true">
            <img src="@/assets/image/组 2094.png" alt="" />
            <span>新增</span>
          </div>
        </div>
      </el-row>
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="540">
        <el-table-column prop="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="F_Account" label="账号" width="246">
        </el-table-column>
        <el-table-column prop="F_RealName" label="姓名" width="135">
        </el-table-column>
        <el-table-column label="性别" width="146">
          <template slot-scope="scope">
            <div v-if="scope.row.F_Gender == 1">男</div>
            <div v-if="scope.row.F_Gender == 2">女</div>
          </template>
        </el-table-column>
        <el-table-column prop="F_Mobile" label="手机" width="246">
        </el-table-column>
        <el-table-column label="类型" width="246">
          <template slot-scope="scope">
            <div v-if="scope.row.F_Type == 1">学生</div>
            <div v-if="scope.row.F_Type == 2">带教老师</div>
            <div
              v-if="
                scope.row.F_Type == null ||
                scope.row.F_Type == 3 ||
                scope.row.F_Type == ''
              "
            >
              管理人员
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="146">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.F_EnabledMark == 1">正常</el-tag>
            <el-tag v-if="scope.row.F_EnabledMark == 0" type="danger"
              >已禁用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div style="display: inline-block; width: 32px; height: 22px;">
              <span
              v-show="scope.row.F_Type == 1 || scope.row.F_Type == 2"
              style="color: #5864ff; cursor: pointer;"
              @click="edit(scope.row)"
              >编辑</span
            >
            </div>
            <div style="display: inline-block; width: 32px; height: 22px;">
              <span
              style="color: #5864ff; cursor: pointer; margin-left: 10px"
              @click="deleted(scope.row)"
              >删除</span
            >
            </div>
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
    <!-- 添加用户弹框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addRoleDialogVisible"
      @closed="addRoleDialogClose"
      width="895px"
      center
    >
      <div class="add-training-dialog">
        <el-row style="margin-bottom: 28px">
          <div class="row1">
            <el-col :span="11">
              <div class="hospital">用户类型</div>
              <el-select
                v-model="roleTypeVal"
                placeholder="选择机构"
                style="width: 100%"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <div class="department">账号</div>
              <el-input
                v-model="accountVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
        </el-row>
        <el-row style="margin-bottom: 28px">
          <div class="row2">
            <el-col :span="11">
              <div class="add-time">密码</div>
              <el-input
                v-model="passwordVal"
                placeholder="请输入内容"
                type="password"
              ></el-input>
            </el-col>
            <el-col :span="11">
              <div class="add-address">确认密码</div>
              <el-input
                v-model="checkPasswordVal"
                placeholder="请输入内容"
                type="password"
              ></el-input>
            </el-col>
          </div>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogClose">取 消</el-button>
        <el-button type="primary" @click="roleSave">确 定</el-button>
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
import md5 from "js-md5";
import { getRole, postDeleteRole } from "api/admin-api/profile";
import { postRegister } from "api/login";
export default {
  name: "Role",
  data() {
    return {
      loading: false,
      keyValue: "",
      depid: "",
      page: 1,
      size: 8,
      total: 0,
      sord: "",
      tableData: [],
      addRoleDialogVisible: false,
      deleteDialogVisible: false,
      F_UserId: "",
      accountVal: "",
      roleTypeVal: "",
      roleOptions: [
        {
          id: 1,
          text: "学生",
        },
        {
          id: 2,
          text: "老师",
        },
        {
          id: 3,
          text: "管理员",
        },
      ],
      passwordVal: "",
      checkPasswordVal: "",
    };
  },
  created() {
    this.roleListData();
  },
  methods: {
    roleListData() {
      let params = {
        keyValue: this.keyValue,
        depid: this.depid,
        page: this.page,
        size: this.size,
        sord: this.sord,
      };
      this.loading = true;
      getRole(params).then((res) => {
        this.loading = false;
        console.log(res);
        this.total = res.data.records;
        this.tableData = res.data.rows;
        this.tableData = this.tableData.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
      });
    },
    roleSave() {
      if (this.roleTypeVal == "") {
        this.$message({
          message: "请选择用户类型！",
          type: "warning",
          center: true,
        });
      } else if (this.accountVal == "") {
        this.$message({
          message: "请输入账号！",
          type: "warning",
          center: true,
        });
      } else if (this.passwordVal == "") {
        this.$message({
          message: "请输入密码！",
          type: "warning",
          center: true,
        });
      } else if (this.checkPasswordVal == "") {
        this.$message({
          message: "请再次输入密码！",
          type: "warning",
          center: true,
        });
      } else if (this.passwordVal !== this.checkPasswordVal) {
        this.$message({
          message: "两次密码不一致！",
          type: "warning",
          center: true,
        });
      } else {
        let data = {
          F_Account: this.accountVal,
          F_Password: md5(this.passwordVal),
          F_Type: this.roleTypeVal,
        };
        console.log(data);
        this.loading = true;
        postRegister(data).then((res) => {
          this.loading = false;
          if (res.code == 100) {
            this.$message({
              message: "新增成功!",
              type: "success",
              center: true,
            });
            this.addRoleDialogClose();
            this.roleListData();
          } else {
            this.$message({
              message: res.message,
              type: "error",
              center: true,
            });
          }
        });
      }
    },
    addRoleDialogClose() {
      this.addRoleDialogVisible = false;
      this.roleTypeVal = "";
      this.accountVal = "";
      this.passwordVal = "";
      this.checkPasswordVal = "";
    },
    edit(scope) {
      console.log(scope);
      if (scope.F_Type == 1) {
        console.log("学生");
        this.$router.push({
          path: "/admin/editstu",
          query: {
            F_UserId: scope.F_UserId,
          },
        });
      } else if (scope.F_Type == 2) {
        console.log("教师");
        this.$router.push({
          path: "/admin/edittea",
          query: {
            F_UserId: scope.F_UserId,
          },
        });
      } else {
        console.log("管理员");
      }
    },
    deleted(scope) {
      console.log(scope);
      this.F_UserId = scope.F_UserId;
      this.deleteDialogVisible = true;
    },
    dialogDeleted() {
      let data = {
        F_UserId: this.F_UserId,
      };
      this.loading = true;
      postDeleteRole(data).then((res) => {
        this.loading = false;
        this.$message({
          message: res.data,
          type: "success",
          center: true,
        });
        this.deleteDialogVisible = false;
        this.roleListData();
      });
    },
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.roleListData();
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