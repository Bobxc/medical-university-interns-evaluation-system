<template>
  <div class="container" v-loading="loading">
    <el-card class="title-card">
      <div class="title-top">学生实习培训</div>
      <div class="title-bottom">
        <span
          v-for="(item, index) in navBarData"
          :key="index"
          :class="currentIndex == index ? 'activeClass' : ''"
          @click="chooseNavBar(index)"
          >{{ item.name }}</span
        >
      </div>
    </el-card>
    <el-card class="content-card">
      <!-- 搜索条件 -->
      <div class="search-condition">
        <div class="search-left" style="visibility: hidden">
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
        <el-table-column prop="index" label="序号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="smajor" label="专业" align="center" width="300">
        </el-table-column>
        <el-table-column prop="sgrade" label="年级" align="center" width="300">
        </el-table-column>
        <el-table-column prop="stuname" label="姓名" align="center" width="250">
        </el-table-column>
        <el-table-column label="是否评教建议" align="center" width="250">
          <template slot-scope="scope">
            <div
              v-if="scope.row.isjy == 1"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  width: 8px;
                  height: 8px;
                  background: #5864ff;
                  border-radius: 50%;
                  margin-right: 6px;
                "
              ></div>
              <div>是</div>
            </div>
            <div
              v-if="scope.row.isjy == 0"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  width: 8px;
                  height: 8px;
                  background: #cfd2e3;
                  border-radius: 50%;
                  margin-right: 6px;
                "
              ></div>
              <div>否</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出科考核状态" align="center" width="180">
          <template slot-scope="scope">
            <el-tag
              type="success"
              style="font-size: 14px; font-weight: 300"
              v-if="scope.row.iskh == 1"
              >已考核</el-tag
            >
            <el-tag
              type="warning"
              style="font-size: 14px; font-weight: 300"
              v-if="scope.row.iskh == 0"
              >未考核</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
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
import { getTrainingList } from "api/teacher-api/studentPracticeTraining";
export default {
  name: "StudentPracticeTraining",
  data() {
    return {
      loading: false,
      page: 1,
      size: 8,
      total: 0,
      currentIndex: 0,
      inputVal: "",
      navBarData: [
        {
          name: "全部",
        },
        {
          name: "未考核",
        },
        {
          name: "已考核",
        },
        /* {
          name: "待考核",
        }, */
      ],
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
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
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
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
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
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [],
    };
  },
  created() {
    this.getTrainingListData();
  },
  methods: {
    chooseNavBar(index) {
      this.currentIndex = index;
      this.page = 1;
      console.log(index);
      if (this.currentIndex == 1) {
        this.getTrainingListNoCheck();
      } else if (this.currentIndex == 2) {
        this.getTrainingListYesCheck();
      } else {
        this.getTrainingListData();
      }
    },
    toDetail(data) {
      this.$router.push({
        path: "/teacher/detaillist",
        query: {
          f_suserid: data.f_suserid,
          f_id: data.f_id,
        },
      });
      console.log(data);
    },
    /* 获取学生实习培训列表(全部) */
    getTrainingListData() {
      this.loading = true;
      let params = {
        userid: window.sessionStorage.getItem("userid"),
        page: this.page,
        size: this.size,
        sord: "F_CreateDate",
      };
      getTrainingList(params).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.code == 100) {
          this.total = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* 获取学生实习培训列表(未考核) */
    getTrainingListNoCheck() {
      this.loading = true;
      let params = {
        userid: window.sessionStorage.getItem("userid"),
        page: this.page,
        size: this.size,
        sord: "F_CreateDate",
        khtype: 0,
      };
      getTrainingList(params).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.code == 100) {
          this.total = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* 获取学生实习培训列表(已考核) */
    getTrainingListYesCheck() {
      this.loading = true;
      let params = {
        userid: window.sessionStorage.getItem("userid"),
        page: this.page,
        size: this.size,
        sord: "F_CreateDate",
        khtype: 1,
      };
      getTrainingList(params).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.code == 100) {
          this.total = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },

    /* 切换页码 */
    handleCurrentChange(newPage) {
      this.page = newPage;
      if (this.currentIndex == 0) {
        this.getTrainingListData();
      } else if (this.currentIndex == 1) {
        this.getTrainingListNoCheck();
      } else {
        this.getTrainingListYesCheck();
      }
    },

    searchVal() {
      if (this.inputVal !== "") {
        let reg = new RegExp(this.inputVal);
        this.tableData = this.tableData.filter((item) => {
          if (reg.test(item.smajor)) {
            return item;
          }
          if (reg.test(item.sgrade)) {
            return item;
          }
          if (reg.test(item.stuname)) {
            return item;
          }
        });
      } else {
        this.getTrainingListData();
      }
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
        span {
          display: inline-block;
          width: 130px;
          height: 63px;
          line-height: 63px;
          text-align: center;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          cursor: pointer;
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