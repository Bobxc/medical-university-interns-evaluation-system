<template>
  <div class="container" v-loading="loading">
    <el-card class="title-card">
      <div class="title-top">学生评教</div>
    </el-card>
    <el-card class="content-card">
      <!-- 搜索条件 -->
      <div class="search-condition">
        <div class="search-left" style="visibility: hidden">
          <el-select
            v-model="value"
            placeholder="全部专业"
            style="width: 70%; margin-right: 14px"
          >
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="value"
            placeholder="全部专业"
            style="width: 70%; margin-right: 14px"
          >
            <el-option
              v-for="item in specialtyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="全部专业" style="width: 70%">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-right" style="width: 356px">
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
      </div>
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="540">
        <el-table-column prop="index" label="序号" align="center" width="185">
        </el-table-column>
        <el-table-column prop="ksname" label="科室" align="center" width="260">
          <template slot-scope="scope">
            <span v-if="scope.row.f_xks !== null && scope.row.f_xks !== ''"
              >{{ scope.row.ksname }} - {{ scope.row.f_xks }}</span
            >
            <span v-else>{{ scope.row.ksname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="teachername"
          label="带教老师"
          align="center"
          width="240"
        >
        </el-table-column>
        <el-table-column label="实习时间" align="center" width="260">
          <template slot-scope="scope">
            <span>{{ scope.row.stime }}至{{ scope.row.etime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="是否反馈问题"
          align="center"
          width="160"
        >
          <template
            slot-scope="scope"
            style="display: flex; align-items: center"
          >
            <span
              v-if="scope.row.f_isfkgly == 1"
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #5864ff;
                margin-right: 5px;
                transform: translateY(-2px);
              "
            ></span>
            <span
              v-if="scope.row.f_isfkgly == 0"
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #cfd2e3;
                margin-right: 5px;
                transform: translateY(-2px);
              "
            ></span>
            <!-- #CFD2E3 -->
            <span v-if="scope.row.f_isfkgly == 1">是</span>
            <span v-if="scope.row.f_isfkgly == 0">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="对带教是否有建议"
          align="center"
          width="180"
        >
          <template
            slot-scope="scope"
            style="display: flex; align-items: center"
          >
            <span
              v-if="scope.row.f_isyj == 1"
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #5864ff;
                margin-right: 5px;
                transform: translateY(-2px);
              "
            ></span>
            <span
              v-if="scope.row.f_isyj == 0"
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #cfd2e3;
                margin-right: 5px;
                transform: translateY(-2px);
              "
            ></span>
            <span v-if="scope.row.f_isyj == 1">是</span>
            <span v-if="scope.row.f_isyj == 0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span
              style="color: #5864ff; cursor: pointer"
              @click="toDetail(scope.row)"
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
        style="display: flex; justify-content: center"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { timeFormatSeconds } from "utils/timeFormatSeconds";
import { getStuDpjList } from "api/student-api/studentEvaluation";
export default {
  name: "EvaluationTeaching",
  data() {
    return {
      page: 1,
      size: 8,
      total: 0,
      value: "",
      f_suserid: "",
      loading: false,
      dataListLength: true,
      dataList: [],
      tableData: [],
      gradeOptions: [],
      specialtyOptions: [],
      classOptions: [],
      inputVal: "",
      stime: "",
      etime: "",
    };
  },
  created() {
    this.f_suserid = this.$route.query.f_suserid;
    this.evaluationList();
  },

  methods: {
    /* 获取列表 */
    evaluationList() {
      let queryJson = {
        keyword: this.inputVal,
        stime: this.stime,
        etime: this.etime,
      };
      let params = {
        userid: this.f_suserid,
        pjid: "",
        keyValue: "",
        page: this.page,
        size: this.size,
        sord: "stime",
        queryJson: JSON.stringify(queryJson),
      };
      console.log(params);
      this.loading = true;
      getStuDpjList(params).then(
        (res) => {
          console.log(res);
          if (res.code == 100) {
            this.loading = false;
            this.tableData = res.data.rows;
            this.total = res.data.records;
            console.log(this.tableData);
            this.tableData = this.tableData.map((item, index) => ({
              ...item,
              index: index + 1,
              stime:
                item.stime !== null ? timeFormatSeconds(0, item.stime) : "",
              etime:
                item.etime !== null ? timeFormatSeconds(0, item.etime) : "",
            }));
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
    toDetail(item) {
      console.log(item);
      this.$router.push({
        path: "/admin/detaillist",
        query: {
          f_userid: item.f_suserid,
          f_id: item.f_id,
          f_recordeid: item.f_recordeid,
          f_teachid: item.f_teachid,
          teachername: item.teachername,
          yyname: item.yyname,
          ksname: item.ksname,
          f_xks: item.f_xks,
        },
      });
    },
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.evaluationList();
    },
    searchVal() {
      this.evaluationList();
    },
  },
};
</script>
<style lang="less" scoped>
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
  .title-card {
    height: 130px;
    margin-top: 5px;
    padding: 28px 30px 0px 30px;
    box-sizing: border-box;
    /deep/.el-card__body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title-top {
        font-size: 20px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #122073;
        opacity: 1;
      }
      .title-bottom {
        display: flex;
        div {
          // display: inline-block;
          display: flex;
          // width: 130px;
          height: 63px;
          line-height: 63px;
          text-align: center;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          margin-right: 42px;
          span {
            font-size: 22px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
            margin-right: 5px;
          }
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
.activeClass {
  color: #5864ff !important;
  border-bottom: 3px solid #5864ff;
}
</style>