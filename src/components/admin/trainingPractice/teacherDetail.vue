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
        <div class="detail-title">{{teacherInfoData.f_username}}</div>
      </div>
    </el-card>

    <div style="margin: 20px">
      <!-- 基本信息 -->
      <el-card class="basic-information-card">
        <el-row class="basic-information-header-row"> 基本信息 </el-row>
        <el-row class="basic-information-body-row">
          <el-col :span="5"
            ><span>所在医院：</span><span>{{teacherInfoData.companyname}}</span></el-col
          >
          <el-col :span="4" :offset="1"
            ><span>院区：</span><span>{{teacherInfoData.f_yyyq}}</span></el-col
          >
          <el-col :span="4" :offset="1"
            ><span>科室：</span><span>{{teacherInfoData.f_dksname}}</span></el-col
          >
          <el-col :span="4" :offset="1"
            ><span>毕业学校：</span><span>{{teacherInfoData.f_byyx}}</span></el-col
          >
          <el-col :span="3" :offset="1"
            ><span>学历：</span><span>{{teacherInfoData.xlName}}</span></el-col
          >
        </el-row>
        <el-row class="basic-information-body-row">
          <el-col :span="5"><span>学位：</span><span>{{teacherInfoData.xwName}}</span></el-col>
          <el-col :span="4" :offset="1"
            ><span>职称：</span><span>{{teacherInfoData.f_zc}}</span></el-col
          >
          <el-col :span="4" :offset="1"
            ><span>职务：</span><span>{{teacherInfoData.f_zw}}</span></el-col
          >
          <el-col :span="4" :offset="1"
            ><span>参加工作时间：</span><span>{{teacherInfoData.f_cjgztime}}</span></el-col
          >
          <el-col :span="3" :offset="1"
            ><span>带教年限：</span><span>{{teacherInfoData.f_djnx}}</span></el-col
          >
        </el-row>
        <el-row class="basic-information-body-row">
          <el-col :span="5"
            ><span>联系方式：</span><span>{{teacherInfoData.f_tel}}</span></el-col
          >
        </el-row>
      </el-card>

      <!-- 带教学生 -->
      <el-card class="teacher-student-card">
        <el-row class="header-title-row"> 带教学生 </el-row>
        <el-card class="content-card">
      <!-- 搜索条件 -->
      <!-- <div class="search-condition">
        <div class="search-left">
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
        
      </div> -->
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="calc(100vh - 670px)">
        <el-table-column prop="index" label="序号" align="center" width="162">
        </el-table-column>
        <el-table-column prop="f_major" label="专业" align="center" width="185">
        </el-table-column>
        <el-table-column prop="f_year" label="年级" align="center" width="185">
        </el-table-column>
        <el-table-column prop="f_username" label="姓名" align="center" width="185">
        </el-table-column>
        <el-table-column prop="isfkwt" label="学生是否反馈问题" align="center" width="200">
        </el-table-column>
        <el-table-column prop="isdjjy" label="学生对带教是否有建议" align="center" width="200">
        </el-table-column>
        <el-table-column prop="isdjfk" label="带教是否反馈问题" align="center" width="200">
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
      </el-card>
    </div>
  </div>
</template>
<script>
import { getStudentList, getItemList } from "api/admin-api/trainingPractice";
export default {
  name: "teacherDetail",
  data() {
    return {
      loading: false,
      page: 1,
      size: 3,
      total: 0,
      gradeVal: "",
      gradeOptions: [],
      specialtyVal: "",
      specialtyOptions: [],
      classVal: "",
      classOptions: [],
      teacherInfoData: {},
      tableData: [],
      xlData: [],
      xwData: [],
    };
  },
  created() {
    this.xl();
    this.xw();
    this.teacherInfoData = this.$route.query;
    this.studentList();
  },
  methods: {
    /* 获取学历 */
    xl() {
      let params = {
        itemCode: "xl",
      };
      getItemList(params).then((res) => {
        console.log(res);
        this.xlData = res;
        if (this.teacherInfoData.f_xl !== null) {
          this.teacherInfoData.xlName = this.xlData.find(
            (item) => item.ItemValue == this.teacherInfoData.f_xl
          ).ItemName;
        } else {
          this.teacherInfoData.xlName = "";
        }
      });
    },
    /* 获取学位 */
    xw() {
      let params = {
        itemCode: "xw",
      };
      getItemList(params).then((res) => {
        console.log(res);
        this.xwData = res;
        if (this.teacherInfoData.f_xw !== null) {
          this.teacherInfoData.xwName = this.xwData.find(
            (item) => item.ItemValue == this.teacherInfoData.f_xw
          ).ItemName;
        } else {
          this.teacherInfoData.f_xw = "";
        }
      });
    },
    studentList() {
      let params = {
        keyword: "",
        userid: this.teacherInfoData.f_userid,
        page: this.page,
        size: this.size,
        sord: "F_CreateDate",
      };
      getStudentList(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.total = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          console.log(this.xlData, this.xwData);
          console.log(this.tableData);
        } else {
          this.$message({
            message: "请求错误",
            type: "error",
            center: true,
          });
        }
      });
    },
    toDetail(scope) {
      console.log(scope);
      this.$router.push({
        path: "/admin/assessment",
        query: {
          // f_userid: scope.f_userid,
          // f_id: scope.f_id,
          studentid: scope.f_userid,
          teacherid: this.teacherInfoData.f_userid,
        },
      });
    },
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.studentList();
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
  .basic-information-card {
    height: 230px;
    margin-bottom: 14px;
    box-sizing: border-box;
    .basic-information-header-row {
      height: 49px;
      display: flex;
      align-items: center;
      padding-left: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .basic-information-body-row {
      margin-left: 52px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #122073;
      opacity: 1;
      margin-bottom: 26px;
    }
  }
  .teacher-student-card {
    height: calc(100vh - 485px);
    box-sizing: border-box;
    .header-title-row {
      height: 49px;
      display: flex;
      align-items: center;
      padding-left: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .content-card {
      height: calc(100vh - 570px);
      margin: 20px;
      // padding: 20px 28px;
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
}
</style>