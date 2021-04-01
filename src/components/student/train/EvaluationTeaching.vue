<template>
  <div class="evaluation-teaching-container" v-loading="loading">
    <el-card class="evaluation-teaching-title-card" shadow="never">
      临床实习学生评教
    </el-card>
    <el-card
      class="evaluation-teaching-content-card"
      shadow="never"
      :body-style="{ padding: '46px 52px' }"
    >
      <el-row class="evaluation-teaching-content">
        <el-col
          class="evaluation-teaching-item"
          :style="{
            background:
              item.f_stupj == 1
                ? 'linear-gradient(180deg, #717bff 0%, #5864ff 100%)'
                : 'linear-gradient(180deg, #F3F4FF 0%, #CFD3FF 100%)',
          }"
          v-for="(item, index) in dataList"
          :key="index"
          @click.native="toDetailOrEdit(item)"
        >
          <div class="noreview" v-if="item.f_stupj == 0">未评</div>
          <div class="item-left">
            <img
              src="@/assets/image/组 1972.png"
              v-if="item.f_stupj == 1"
              alt=""
            />
            <img src="@/assets/image/组 1715.png" v-else alt="" />
          </div>

          <div class="item-right">
            <span
              >科室：{{ item.f_xks !== null ? item.f_xks : item.ksname }}</span
            >
            <span>带教姓名：{{ item.teachername }}</span>
          </div>
        </el-col>
        <el-col
          class="add-evaluation-teaching"
          @click.native="addEvaluationTeachingDialogVisible = true"
        >
          <img src="@/assets/image/组 1933.png" alt="" />
          <span>添加评教记录</span>
        </el-col>
      </el-row>
    </el-card>
    <!-- 新增评教记录弹框 -->
    <el-dialog
      title="新增评教记录"
      :visible.sync="addEvaluationTeachingDialogVisible"
      @closed="addEvaluationTeachingDialogClose"
      width="895px"
      center
    >
      <div class="add-evaluation-dialog">
        <el-row style="margin-bottom: 28px">
          <div class="row1">
            <el-col :span="11">
              <div class="hospital">医院</div>
              <el-select
                v-model="hospitalVal"
                placeholder="选择医院"
                @change="selectHospital"
                style="width: 100%"
              >
                <el-option
                  v-for="item in hospitalOptions"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <div class="department">当前实习科室</div>
              <el-select
                v-model="departmentVal"
                placeholder="选择科室"
                @change="selectDepartment"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in departmentOptions"
                  :key="index"
                  :label="item.ItemName"
                  :value="item.ItemValue"
                >
                </el-option>
              </el-select>
            </el-col>
          </div>
        </el-row>

        <el-row style="margin-bottom: 28px">
          <div class="row2">
            <el-col :span="11">
              <div class="secondDepartment">二级科室</div>
              <el-input
                v-model="secondDepartmentVal"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
            <el-col :span="11">
              <div class="teacher">带教老师</div>
              <el-select
                v-model="teacherVal"
                placeholder="选择老师"
                style="width: 100%"
              >
                <el-option
                  v-for="item in teacherOptions"
                  :key="item.userId"
                  :label="item.realName"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-col>
          </div>
        </el-row>

        <el-row style="margin-bottom: 28px">
          <div class="row3">
            <el-col :span="11">
              <div class="add-time">开始时间</div>
              <el-date-picker
                style="width: 100%"
                v-model="startTimeVal"
                type="date"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="11">
              <div class="add-time">结束时间</div>
              <el-date-picker
                style="width: 100%"
                v-model="endTimeVal"
                type="date"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </div>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEvaluationTeachingDialogClose">取 消</el-button>
        <el-button type="primary" @click="addSxRecordBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getSxList,
  getCompany,
  getItemDetail,
  getUserList,
  addSxRecord,
} from "api/student-api/studentEvaluation";
import { timeFormatSeconds } from "utils/timeFormatSeconds";

export default {
  name: "EvaluationTeaching",
  data() {
    return {
      hospitalVal: "",
      hospitalName: "",
      departmentVal: "",
      departmentName: "",
      secondDepartmentVal: "",
      teacherVal: "",
      startTimeVal: "",
      endTimeVal: "",
      addEvaluationTeachingDialogVisible: false,
      loading: false,
      dataList: [],
      hospitalOptions: [],
      departmentOptions: [],
      teacherOptions: [],
    };
  },
  created() {
    this.getHospitalList();
    this.getDepartmentList();
  },
  mounted() {
    this.evaluationList();
  },
  watch: {
    hospitalVal(val) {
      console.log(val);
      this.getTeacherList(val);
    },
  },
  methods: {
    /* 获取医院列表 */
    getHospitalList() {
      let params = {
        type: 2,
      };
      getCompany(params).then((res) => {
        console.log(res);
        this.hospitalOptions = res;
        this.hospitalVal = this.hospitalOptions[0].id;
        this.hospitalName = this.hospitalOptions[0].text;
      });
    },
    /* 获取科室列表 */
    getDepartmentList() {
      let params = {
        itemCode: "sxks",
      };
      getItemDetail(params).then((res) => {
        console.log(res);
        this.departmentOptions = res;
        this.departmentVal = this.departmentOptions[0].ItemValue;
        this.departmentName = this.departmentOptions[0].ItemName;
      });
    },
    /* 获取老师列表 */
    getTeacherList(depid) {
      let params = {
        depid,
      };
      getUserList(params).then((res) => {
        console.log(res);
        this.teacherOptions = res;
        this.teacherVal = res.length !== 0 ? this.teacherOptions[0].userId : "";
      });
    },
    /* 获取列表 */
    evaluationList() {
      this.loading = true;
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      console.log(params);
      getSxList(params).then(
        (res) => {
          console.log(res);
          if (res.code == 100) {
            this.dataList = res.data;
            this.loading = false;
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
    toDetailOrEdit(item) {
      console.log(item);
      if (item.f_stupj == 1) {
        console.log("已评");
        this.$router.push({
          path: "/evateach/detail",
          query: {
            f_id: item.f_id,
            teachername: item.teachername,
            yyname: item.yyname,
            ksname: item.ksname,
            f_xks: item.f_xks,
          },
        });
      }
      if (item.f_stupj == 0) {
        console.log("未评");
        this.$router.push({
          path: "/evateach/edit",
          query: {
            f_id: item.f_id,
            teachername: item.teachername,
            yyname: item.yyname,
            ksname: item.ksname,
            f_xks: item.f_xks,
          },
        });
      }
    },
    /* 新增评教记录 */
    addSxRecordBtn() {
      let data = {
        F_sUserId: window.sessionStorage.getItem("userid"),
        F_HospitalId: this.hospitalVal,
        F_HospitalName: this.hospitalName,
        F_djTeacherId: this.teacherVal,
        F_ksId: this.departmentVal,
        F_ksName: this.departmentName,
        F_xks: this.secondDepartmentVal,
        F_Stime: timeFormatSeconds(0, this.startTimeVal),
        F_Etime: timeFormatSeconds(0, this.endTimeVal),
      };
      if (this.teacherVal == "") {
        this.$message({
          message: "请选择带教老师",
          type: "warning",
          center: true,
        });
      } else if (this.startTimeVal == "") {
        this.$message({
          message: "请选择开始时间",
          type: "warning",
          center: true,
        });
      } else if (this.endTimeVal == "") {
        this.$message({
          message: "请选择结束时间",
          type: "warning",
          center: true,
        });
      } else {
        console.log(data);
        this.loading = true;
        addSxRecord(data).then((res) => {
          console.log(res);
          if (res.code == 100) {
            this.$message({
              message: "新增成功！",
              type: "success",
              center: true,
            });
            this.loading = false;
            this.addEvaluationTeachingDialogClose();
            this.evaluationList();
          } else {
            this.$message({
              message: "新增失败！",
              type: "error",
              center: true,
            });
            this.loading = false;
          }
        });
      }
    },
    selectHospital(id) {
      console.log(id);
      this.hospitalName = this.hospitalOptions.find((item) => {
        return item.id == id;
      }).text;
      console.log(this.hospitalName);
    },
    selectDepartment(ItemValue) {
      console.log(ItemValue);
      this.departmentName = this.departmentOptions.find((item) => {
        return item.ItemValue == ItemValue;
      }).ItemName;
    },
    /* 关闭新增评教记录弹框 */
    addEvaluationTeachingDialogClose() {
      this.addEvaluationTeachingDialogVisible = false;
      this.hospitalVal = this.hospitalOptions[0].id;
      this.hospitalName = this.hospitalOptions[0].text;
      this.departmentVal = this.departmentOptions[0].ItemValue;
      this.departmentName = this.departmentOptions[0].ItemName;
      this.secondDepartmentVal = "";
      this.startTimeVal = "";
      this.endTimeVal = "";
    },
  },
};
</script>
<style lang="less" scoped>
.evaluation-teaching-container {
  .evaluation-teaching-title-card {
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
  .evaluation-teaching-content-card {
    height: 700px;
    overflow: auto;
    margin: 20px;
    .evaluation-teaching-content {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .evaluation-teaching-item {
        position: relative;
        width: 23%;
        height: 162px;
        margin-right: 16px;
        margin-bottom: 16px;
        box-shadow: 0px 8px 15px rgba(88, 100, 255, 0.2);
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .noreview {
          position: absolute;
          top: 17px;
          right: 17px;
          width: 51px;
          height: 25px;
          border: 1px solid #5864ff;
          opacity: 1;
          border-radius: 13px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #5864ff;
        }
        .item-left {
          width: 127px;
          height: 78px;
        }
        .item-right {
          display: flex;
          flex-direction: column;
          span {
            font-size: 18px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #ffffff;
            opacity: 1;
          }
        }
      }
      .add-evaluation-teaching {
        width: 23%;
        height: 162px;
        background: rgba(88, 100, 255, 0.05);
        border: 1px solid rgba(88, 100, 255, 0.32156862745098036);
        opacity: 1;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 49px;
          height: 49px;
          margin-bottom: 21px;
        }
        span {
          width: 108px;
          height: 25px;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 400;
          line-height: 25px;
          color: rgba(88, 100, 255, 0.5);
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
  .add-evaluation-dialog {
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
      .secondDepartment {
        height: 22px;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        line-height: 22px;
        color: #122073;
        opacity: 1;
        margin-bottom: 12px;
      }
      .teacher {
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