<template>
  <div class="container" v-loading="loading">
    <el-card class="title-card">
      <div class="title-top">带教列表</div>
      <div class="title-bottom">
        <div><span>{{teacherCount}}</span> 名带教教师</div>
      </div>
    </el-card>
    <el-card class="content-card">
      <!-- 搜索条件 -->
      <div class="search-condition">
        <div class="search-left" style="visibility: hidden;">
          <el-select
            v-model="gradeVal"
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
            v-model="specialtyVal"
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
            v-model="classVal"
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
        <el-table-column prop="f_realname" label="带教姓名" align="center" width="185">
        </el-table-column>
        <el-table-column prop="f_dksname" label="科室" align="center" width="185">
        </el-table-column>
        <el-table-column prop="f_zc" label="职称" align="center" width="185">
        </el-table-column>
        <el-table-column prop="f_djnx" label="带教年限" align="center" width="185">
        </el-table-column>
        <el-table-column prop="yxdjcount" label="优教被推荐数" align="center" width="185">
        </el-table-column>
        <el-table-column prop="yxkscount" label="科室被推荐数" align="center" width="185">
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center" width="185">
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
import { getTeacherList } from "api/admin-api/trainingPractice";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "TeacherInfo",
  data() {
    return {
      loading: false,
      page: 1,
      size: 8,
      total: 0,
      keyword: "",
      teacherCount: "",
      inputVal: "",
      gradeVal: "",
      gradeOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      specialtyVal: "",
      specialtyOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      classVal: "",
      classOptions: [
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
    this.getTeacherListData();
  },
  methods: {
    /* 获取教师列表(全部) */
    getTeacherListData() {
      this.loading = true;
      let params = {
        keyword: this.keyword,
        page: this.page,
        size: this.size,
        sord: "F_CreateDate",
      };
      getTeacherList(params).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.code == 100) {
          this.total = res.data.records;
          this.teacherCount = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          console.log(this.tableData);
        } else {
          this.$message({
            message: "请求失败!",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* to详情列表 */
    toDetail(data) {
      console.log(data);
      data.f_cjgztime = timeFormatSeconds(0, data.f_cjgztime);
      console.log(data);
      this.$router.push({
        path: "/admin/teacherdetail",
        query: { ...data },
      });
    },

    searchVal() {
      let params = {
        keyword: this.inputVal,
        page: this.page,
        size: this.size,
        sord: "F_CreateDate",
      };
      this.loading = true;
      getTeacherList(params).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.code == 100) {
          this.total = res.data.records;
          this.teacherCount = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          console.log(this.tableData);
        } else {
          this.$message({
            message: "请求失败!",
            type: "error",
            center: true,
          });
        }
      });
    },

    /* 切换页码 */
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getTeacherListData();
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
