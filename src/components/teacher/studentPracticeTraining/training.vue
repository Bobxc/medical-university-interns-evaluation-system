<template>
  <div class="train-container" v-loading="loading">
    <el-card class="train-title-card"> 培训活动 </el-card>
    <!-- <div class="train-add" @click="addTrainingRecordDialogVisible = true">
      <div class="train-add-content">
        <span>添加培训</span>
        <img src="@/assets/image/组 1156.png" alt="" />
      </div>
    </div> -->
    <!-- 培训活动表单 -->
    <el-card class="train-form-card">
      <el-row style="margin-bottom: 16px">
        <el-col :span="4" style="margin-right: 14px; display: none">
          <el-select
            v-model="value"
            placeholder="查询条件"
            @change="selectVal"
            style="width: 100%; color: red"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" style="margin-right: 14px">
          <el-input v-model="searchVal" placeholder="输入关键字"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button @click="search" style="background: #5864ff; color: #ffffff"
            >查询</el-button
          >
        </el-col>
      </el-row>
      <div v-if="!searchListShow">
        <el-table :data="tableData" stripe style="width: 100%" height="435">
          <el-table-column prop="index" label="序号" width="140">
          </el-table-column>
          <el-table-column prop="f_hospital" label="医院" width="150">
          </el-table-column>
          <el-table-column prop="f_department" label="科室" width="150">
          </el-table-column>
          <el-table-column prop="f_trainingdate" label="日期" width="150">
          </el-table-column>
          <el-table-column
            prop="f_address"
            label="地点"
            width="350"
          ></el-table-column>
          <el-table-column
            prop="f_trainingcontent"
            label="内容"
            width="350"
          ></el-table-column>
          <el-table-column
            prop="f_lecturer"
            label="主讲老师"
            width="107"
          ></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <span
                @click="trainDetailDialogVisibleShow(scope.row)"
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
          style="display: flex; justify-content: center; margin-top: 50px"
        >
        </el-pagination>
      </div>
      <div v-else>
        <el-table :data="searchData" stripe style="width: 100%" height="520">
          <el-table-column prop="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="f_hospital" label="医院" width="150">
          </el-table-column>
          <el-table-column prop="f_department" label="科室" width="150">
          </el-table-column>
          <el-table-column prop="f_trainingdate" label="日期" width="150">
          </el-table-column>
          <el-table-column
            prop="f_address"
            label="地点"
            width="390"
          ></el-table-column>
          <el-table-column
            prop="f_trainingcontent"
            label="内容"
            width="390"
          ></el-table-column>
          <el-table-column
            prop="f_lecturer"
            label="主讲老师"
            width="107"
          ></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <span
                @click="trainDetailDialogVisibleShow(scope.row)"
                style="color: #5864ff; cursor: pointer"
                >详情</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 培训详情弹框 -->
    <el-dialog
      title="培训详情"
      :visible.sync="trainDetailDialogVisible"
      width="38%"
      center
    >
      <div class="train-detail-dialog">
        <div class="hospital-d">
          <span>医院：</span>
          <span>{{ trainDetailData.detailHospital }}</span>
        </div>
        <div class="department-d">
          <span>科室：</span>
          <span>{{ trainDetailData.detailDepartment }}</span>
        </div>
        <div class="date-d">
          <span>时间：</span>
          <span>{{ trainDetailData.detailDate }}</span>
        </div>
        <div class="type-d">
          <span>培训类型：</span>
          <span>{{ trainDetailData.detailType }}</span>
        </div>
        <div class="teacher-d">
          <span>主讲教师：</span>
          <span>{{ trainDetailData.detailTeacher }}</span>
        </div>
        <div class="address-d">
          <span>地点：</span>
          <span>{{ trainDetailData.detailAddress }}</span>
        </div>
        <div class="content-d">
          <span>培训内容：</span>
          <span>{{ trainDetailData.detailContent }}</span>
        </div>
      </div>
    </el-dialog>
    <!-- 添加培训记录弹框 -->
    <el-dialog
      title="添加培训记录"
      :visible.sync="addTrainingRecordDialogVisible"
      @closed="addTrainingRecordDialogClose"
      width="895px"
      center
    >
      <div class="add-training-dialog">
        <el-row style="margin-bottom: 28px">
          <div class="row1">
            <el-col :span="11">
              <div class="hospital">医院</div>
              <el-input
                v-model="trainAddData.hospitalIptVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
            <el-col :span="11">
              <div class="department">科室</div>
              <el-input
                v-model="trainAddData.departmentIptVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
        </el-row>
        <el-row style="margin-bottom: 28px">
          <div class="row2">
            <el-col :span="11">
              <div class="add-time">时间</div>
              <el-date-picker
                style="width: 100%"
                v-model="trainAddData.datePickerVal"
                type="date"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="11">
              <div class="add-address">地点</div>
              <el-input
                v-model="trainAddData.addressIptVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
        </el-row>
        <el-row style="margin-bottom: 28px">
          <div class="row3">
            <el-col :span="11">
              <div class="add-type">培训类型</div>
              <el-input
                v-model="trainAddData.typeIptVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
            <el-col :span="11">
              <div class="add-teacher">主讲教师</div>
              <el-input
                v-model="trainAddData.teacherIptVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <div class="row4">
            <el-col :span="24">
              <div class="training-content">培训内容</div>
              <el-input
                v-model="trainAddData.contentIptVal"
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </div>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTrainingRecordDialogClose">取 消</el-button>
        <el-button type="primary" @click="trainingSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTrainingPageList,
  postTrainingSave,
} from "api/student-api/trainingRecord";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "Train",
  data() {
    return {
      page: 1,
      size: 8,
      total: 0,
      value: "",
      searchVal: "",
      loading: false,
      searchListShow: false,
      records: "",
      searchRequire: "all",
      /* 表格数据 */
      tableData: [],
      searchData: [],
      allData: [],
      options: [
        {
          label: "所有",
          value: "all",
        },
        {
          label: "医院",
          value: "hospital",
        },
        {
          label: "科室",
          value: "department",
        },
        {
          label: "日期",
          value: "trainingdate",
        },
        {
          label: "地点",
          value: "address",
        },
        {
          label: "教师",
          value: "lecturer",
        },
      ],
      trainDetailDialogVisible: false,
      addTrainingRecordDialogVisible: false,
      /* 培训详情数据 */
      trainDetailData: {},
      /* 添加培训数据 */
      trainAddData: {
        hospitalIptVal: "",
        departmentIptVal: "",
        datePickerVal: "",
        addressIptVal: "",
        typeIptVal: "",
        teacherIptVal: "",
        contentIptVal: "",
      },
    };
  },
  created() {
    this.value = this.options[0].value;
  },
  mounted() {
    this.getPageList();
  },
  watch: {
    searchVal(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (this.searchRequire == "all" && newVal == "") {
        this.searchData = [];
        this.searchListShow = false;
      }
    },
  },
  methods: {
    /* 获取培训记录分页列表数据 */
    getPageList() {
      this.loading = true;
      let params = {
        page: this.page,
        size: this.size,
      };
      getTrainingPageList(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.records = res.data.records;
          this.total = res.data.records;
          this.tableData = res.data.rows;
          this.tableData = this.tableData.map((dep, index) => {
            return {
              index: `${index + 1}`,
              f_hospital: dep.f_hospital,
              f_department: dep.f_department,
              f_trainingdate: timeFormatSeconds(0, dep.f_trainingdate),
              f_trainingtype: dep.f_trainingtype,
              f_address: dep.f_address,
              f_trainingcontent: dep.f_trainingcontent,
              f_lecturer: dep.f_lecturer,
            };
          });
          console.log(this.tableData);
          this.getAllData();
          this.loading = false;
        } else {
          this.$message({
            message: res.message,
            center: true,
            type: "error",
          });
          this.loading = false;
        }
      });
    },
    /* 获取所有内容 */
    getAllData() {
      let params = {
        page: 1,
        size: this.records,
      };
      getTrainingPageList(params).then((res) => {
        if (res.code == 100) {
          this.allData = res.data.rows;
          this.allData = this.allData.map((dep, index) => {
            return {
              index: `${index + 1}`,
              f_hospital: dep.f_hospital,
              f_department: dep.f_department,
              f_trainingdate: timeFormatSeconds(0, dep.f_trainingdate),
              f_trainingtype: dep.f_trainingtype,
              f_address: dep.f_address,
              f_trainingcontent: dep.f_trainingcontent,
              f_lecturer: dep.f_lecturer,
            };
          });
          console.log("所有数据", this.allData);
        }
      });
    },
    /* 查看列表数据详情 */
    trainDetailDialogVisibleShow(scope) {
      this.trainDetailData = {
        detailHospital: scope.f_hospital,
        detailDepartment: scope.f_department,
        detailDate: scope.f_trainingdate,
        detailType: scope.f_trainingtype,
        detailTeacher: scope.f_lecturer,
        detailAddress: scope.f_address,
        detailContent: scope.f_trainingcontent,
      };
      this.trainDetailDialogVisible = true;
    },
    /* 添加培训 */
    trainingSave() {
      if (this.trainAddData.hospitalIptVal == "") {
        this.$message({
          message: "请输入医院！",
          type: "warning",
          center: true,
        });
      } else if (this.trainAddData.departmentIptVal == "") {
        this.$message({
          message: "请输入科室！",
          type: "warning",
          center: true,
        });
      } else if (this.trainAddData.datePickerVal == "") {
        this.$message({
          message: "请选择时间！",
          type: "warning",
          center: true,
        });
      } else if (this.trainAddData.addressIptVal == "") {
        this.$message({
          message: "请输入地点！",
          type: "warning",
          center: true,
        });
      } else if (this.trainAddData.typeIptVal == "") {
        this.$message({
          message: "请输入培训类型！",
          type: "warning",
          center: true,
        });
      } else if (this.trainAddData.teacherIptVal == "") {
        this.$message({
          message: "请输入主讲教师！",
          type: "warning",
          center: true,
        });
      } else if (this.trainAddData.contentIptVal == "") {
        this.$message({
          message: "请输入培训内容！",
          type: "warning",
          center: true,
        });
      } else {
        let data = {
          F_StuId: window.sessionStorage.getItem("userid"),
          F_Hospital: this.trainAddData.hospitalIptVal,
          F_Department: this.trainAddData.departmentIptVal,
          F_TrainingDate: timeFormatSeconds(0, this.trainAddData.datePickerVal),
          F_Address: this.trainAddData.addressIptVal,
          F_TrainingType: this.trainAddData.typeIptVal,
          F_Lecturer: this.trainAddData.teacherIptVal,
          F_TrainingContent: this.trainAddData.contentIptVal,
        };
        console.log(data);
        this.loading = true;
        postTrainingSave(data).then((res) => {
          console.log(res);
          if (res.code == 100) {
            this.loading = false;
            this.$message({
              message: "添加成功！",
              type: "success",
              center: true,
            });
            this.addTrainingRecordDialogClose();
            this.getPageList();
          }
        });
      }

      // this.addTrainingRecordDialogVisible = false
    },
    /* 添加培训弹框关闭 */
    addTrainingRecordDialogClose() {
      this.addTrainingRecordDialogVisible = false;
      this.trainAddData.hospitalIptVal = "";
      this.trainAddData.departmentIptVal = "";
      this.trainAddData.datePickerVal = "";
      this.trainAddData.addressIptVal = "";
      this.trainAddData.typeIptVal = "";
      this.trainAddData.teacherIptVal = "";
      this.trainAddData.contentIptVal = "";
    },
    /* 搜索条件选择 */
    selectVal(data) {
      console.log(data);
      this.searchRequire = data;
    },
    /* 查询 */
    search() {
      if (this.searchVal !== "") {
        let reg = new RegExp(this.searchVal);
        this.tableData = this.tableData.filter((item) => {
          if (reg.test(item.f_hospital)) {
            return item;
          }
          if (reg.test(item.f_department)) {
            return item;
          }
          if (reg.test(item.f_address)) {
            return item;
          }
          if (reg.test(item.f_trainingcontent)) {
            return item;
          }
          if (reg.test(item.f_lecturer)) {
            return item;
          }
        });
      } else {
        this.tableData = this.allData;
      }
    },
    /* 切换页码 */
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getPageList();
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
}
/deep/.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.train-container {
  .train-title-card {
    box-shadow: none;
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: 800;
    color: #122073;
    opacity: 1;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
  }
  .train-add {
    height: 49px;
    background: rgba(88, 100, 255, 0.05);
    border: 1px solid rgba(88, 100, 255, 0.32156862745098036);
    opacity: 1;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 20px;
    .train-add-content {
      display: flex;
      align-items: center;
      :nth-child(1) {
        width: 72px;
        height: 25px;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 500;
        line-height: 25px;
        color: #5864ff;
        opacity: 1;
        margin-right: 6px;
      }
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .train-form-card {
    height: 630px;
    box-shadow: none;
    padding: 20px;
    box-sizing: border-box;
    margin: 20px;
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
  .train-detail-dialog {
    height: 600px;
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
}
</style>