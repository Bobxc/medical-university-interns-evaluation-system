<template>
  <div class="container" v-loading="loading">
    <el-card class="title-card">
      <div class="title-top">出科评定列表</div>
    </el-card>
    <el-card class="content-card">
      <!-- 搜索条件 -->
      <div class="search-condition">
        <div class="search-left" style="visibility: hidden;">
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
          <el-select
            v-model="value"
            placeholder="全部专业"
            style="width: 70%"
          >
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
          <!-- <el-input
            placeholder="输入关键字"
            suffix-icon="el-icon-date"
            v-model="inputVal"
          >
          
          </el-input> -->
          <el-input placeholder="输入关键字" v-model="inputVal" @keyup.enter.native="searchVal"
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
        <el-table-column prop="f_ks" label="科室" align="center" width="260">
        </el-table-column>
        <el-table-column prop="teachername" label="带教老师" align="center" width="260">
        </el-table-column>
        <el-table-column prop="" label="实习时间" align="center" width="260">
          <template slot-scope="scope">
            <span>{{ scope.row.f_stime }}至{{ scope.row.f_etime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="带教是否反馈问题" align="center" width="260">
          <template
            slot-scope="scope"
            style="display: flex; align-items: center"
          >
            <span
            v-if="scope.row.f_tisfk == 1"
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
            v-if="scope.row.f_tisfk == 0"
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #CFD2E3;
                margin-right: 5px;
                transform: translateY(-2px);
              "
            ></span>
            <span v-if="scope.row.f_tisfk == 1">是</span>
            <span v-if="scope.row.f_tisfk == 0">否</span>
          </template>
        </el-table-column>
        
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
import { getCkPageList } from "api/teacher-api/studentPracticeTraining";
import { timeFormatSeconds } from "utils/timeFormatSeconds";

export default {
  name: "Assessment",
  data() {
    return {
      value: "",
      loading: false,
      page: 1,
      size: 8,
      total: 0,
      f_djpj: "",
      studentid: "",
      teacherid: "",
      dataListLength: true,
      dataList: [],
      tableData: [],
      inputVal: "",
      stime: "",
      etime: "",
      gradeOptions: [],
      specialtyOptions: [],
      classOptions: [],
    };
  },
  created() {
    this.studentid = this.$route.query.studentid;
    this.teacherid = this.$route.query.teacherid;
    this.checkInfoData();
  },
  methods: {
    /* 获取实习记录列表 */
    checkInfoData() {
      let queryJson = {
        keyword: this.inputVal,
        stime: this.stime,
        etime: this.etime,
      };
      let params = {
        page: this.page,
        size: this.size,
        sord: "F_CreateDte",
        keyValue: "",
        userid: this.studentid,
        teacherid: this.teacherid,
        type: 1,
        queryJson: JSON.stringify(queryJson),
      };
      console.log(params);
      getCkPageList(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.tableData = res.data.rows;
          this.total = res.data.records;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
            f_stime:
              item.f_stime !== null ? timeFormatSeconds(0, item.f_stime) : "",
            f_etime:
              item.f_etime !== null ? timeFormatSeconds(0, item.f_etime) : "",
          }));
          console.log(this.tableData);
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    toDetail(item) {
      console.log(item.f_id);
      this.$router.push({
        path: "/admin/detaillist",
        query: {
          f_userid: this.studentid,
          f_id: item.f_id,
          f_recordeid: item.f_recordeid,
          f_teachid: this.teacherid,
          teachername: item.teachername,
          yyname: item.yyname,
          ksname: item.f_ks,
          f_xks: item.f_xks,
        },
      });
    },
    searchVal() {
      this.checkInfoData();
    },
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.checkInfoData();
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