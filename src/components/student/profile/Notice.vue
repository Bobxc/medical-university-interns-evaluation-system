<template>
  <div class="container" v-loading="loading">
    <el-card class="notice-title-card"> 消息通知 </el-card>
    <el-card class="notice-content-card">
      <!-- 查询条件 -->
      <el-row style="margin-bottom: 16px">
        <el-col :span="3" style="margin-right: 14px; display: none">
          <el-select v-model="value" placeholder="查询条件" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="margin-right: 14px">
          <el-input
            v-model="searchVal"
            placeholder="输入关键字"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="1">
          <el-button style="background: #5864ff; color: #ffffff" @click="search"
            >查询</el-button
          >
        </el-col>
      </el-row>
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="550">
        <el-table-column prop="index" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="F_Title" label="标题" width="400">
        </el-table-column>
        <!-- <el-table-column prop="F_Content" label="内容" width="500">
        </el-table-column> -->
        <!-- <el-table-column prop="F_Power" label="发布人" width="150">
        </el-table-column> -->
        <el-table-column prop="F_CreateTime" label="发布时间" width="400">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span
              @click="detailDialogVisibleShow(scope.row)"
              style="color: #5864ff; cursor: pointer"
              >详情</span
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
        style="display: flex; justify-content: center; margin-top: 20px"
      >
      </el-pagination>
    </el-card>
    <!-- 消息通知详情弹框 -->
    <el-dialog
      title="消息通知详情"
      :visible.sync="detailDialogVisible"
      width="38%"
      center
    >
      <div class="train-detail-dialog">
        <div class="hospital-d">
          <span>标题：</span>
          <span>{{ detailData.F_Title }}</span>
        </div>
        <!-- <div class="department-d">
          <span>发布人：</span>
          <span>{{ detailData.F_Power }}</span>
        </div> -->
        <div class="date-d">
          <span>发布时间：</span>
          <span>{{ detailData.F_CreateTime }}</span>
        </div>
        <div class="type-d">
          <span>内容：</span>
          <span v-html="detailData.F_Content"></span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getNotice } from "api/teacher-api/profile";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "StudentNotice",
  data() {
    return {
      loading: false,
      searchVal: "",
      value: "",
      total: 0,
      page: 1,
      size: 10,
      power: "",
      detailData: {},
      detailDialogVisible: false,
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
  created() {
    this.notice();
  },
  methods: {
    /* 获取列表 */
    notice() {
      let params = {
        page: this.page,
        size: this.size,
        power: 2,
        searchValue: this.searchVal,
      };
      this.loading = true;
      getNotice(params).then((res) => {
        this.loading = false;
        if (res.code !== 100) {
          this.$message({
            message: "获取通知列表失败！",
            type: "error",
            center: true,
          });
        } else {
          console.log(res);
          this.total = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
            F_CreateTime: timeFormatSeconds(1, item.F_CreateTime),
          }));
        }
      });
    },
    detailDialogVisibleShow(scope) {
      this.detailData = {
        F_Title: scope.F_Title,
        F_Power: scope.F_Power,
        F_CreateTime: scope.F_CreateTime,
        F_Content: scope.F_Content,
      };
      this.detailDialogVisible = true;
    },
    search() {
      this.notice();
    },
    /* 切换页码 */
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.notice();
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-input--suffix .el-input__inner {
  color: #122073 !important;
}
/deep/.el-input--suffix .el-input__inner::-webkit-input-placeholder {
  color: #122073 !important;
  font-weight: 400 !important;
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
  .notice-title-card {
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
  .notice-content-card {
    height: 708px;
    margin: 14px 22px 0px 18px;
    padding: 20px 28px;
    box-sizing: border-box;
  }
  .train-detail-dialog {
    height: 600px;
    overflow: auto;
    .hospital-d,
    .department-d,
    .date-d,
    .type-d,
    .teacher-d,
    .address-d {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
    }
    .content-d {
      height: 25px;
      line-height: 25px;
      margin-top: 10px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
    }
  }

  .train-detail-dialog::-webkit-scrollbar {
    /*滚动条整体样式*/
    height: 8px;
    width: 10px;
  }
  .train-detail-dialog::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 9px;
    background: #e3e4ee;
  }
  .train-detail-dialog::-webkit-scrollbar-track {
    /*滚动条里面轨道背景*/
    border-radius: 10px;
  }

  /deep/.el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    height: 0;
  }
  /deep/ .el-table th,
  .el-table tr {
    background: #f7f8fb;
  }
  /deep/.el-table thead {
    color: #122073;
  }
  /deep/.el-table__row {
    color: rgba(18, 32, 115, 0.85);
  }
  /deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgba(246, 248, 251, 0.55);
  }
}
</style>