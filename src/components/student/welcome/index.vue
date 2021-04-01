<template>
  <div class="home-container" v-loading="loading">
    <!-- 搜索部分 -->
    <div class="search-box" style="visibility: hidden">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          选择条件<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline"
            >螺蛳粉</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check"
            >蚵仔煎</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <input
        type="text"
        v-model="iptVal"
        placeholder="请输入..."
        name=""
        id=""
      />
      <div class="search-icon">
        <img src="@/assets/image/路径 262.png" alt="" />
      </div>
    </div>
    <!-- 培训活动等 -->
    <el-card class="box-card1" shadow="never">
      <div class="boxs">
        <div
          class="box1"
          style="margin-left: 15px"
          @click="$router.push('/student/train/index')"
        >
          <div>
            <span>{{ trainingNum }}</span
            ><span>条</span>
          </div>
          <span>培训活动</span>
          <div class="add" @click.stop="addTrainingRecordDialogVisible = true">
            <img src="@/assets/image/加5.png" alt="" />
          </div>
        </div>
        <div class="box2" @click="$router.push('/student/basicope/index')">
          <div>
            <span>{{ baseIntershipNum !== "" ? baseIntershipNum : 0 }}</span
            ><span>条</span>
          </div>
          <span>基础操作实习记录</span>
          <div class="add" @click.stop="chooseDepartmentDialogVisible = true">
            <img src="@/assets/image/加5.png" alt="" />
          </div>
        </div>
        <div class="box3" @click="$router.push('/student/specope/index')">
          <div>
            <span>{{
              departmentExpertiseRecordNum !== ""
                ? departmentExpertiseRecordNum
                : 0
            }}</span
            ><span>条</span>
          </div>
          <span>各科室专科操作实习记录</span>
        </div>
        <div class="box4" @click="$router.push('/student/disease/index')">
          <div>
            <span>{{
              rotationStudyRecordtNum !== "" ? rotationStudyRecordtNum : 0
            }}</span
            ><span>条</span>
          </div>
          <span>轮转期间学习病种及其例数记录</span>
        </div>
        <div class="box5" @click="$router.push('/student/diagtreat/index')">
          <div>
            <span>{{
              departmentTreatmentRecordNum !== ""
                ? departmentTreatmentRecordNum
                : 0
            }}</span
            ><span>条</span>
          </div>
          <span>各科室诊疗操作实习记录</span>
        </div>
      </div>
    </el-card>
    <!-- 带教点评等 -->
    <div class="bottom-container">
      <el-card class="box-card2">
        <div class="box-left">
          <div class="t-reviews">
            <div class="t-title">带教点评</div>
            <div class="t-content">
              带教老师对实习期间学生的 各方面素质进行客观点评
            </div>
          </div>
          <div class="s-comment">
            <div class="s-title">学生评教</div>
            <div class="s-content">
              学生对实习期间带教老师进 行客观的综合评价
            </div>
          </div>
        </div>
      </el-card>
      <!-- 实习考勤概况 -->
      <el-card class="box-card3" shadow="never">
        <div class="attendance-title">
          <span @click="attendanceDialogVisible = true">实习考勤概况</span>
          <span @click="attendanceDialogVisible = true">···</span>
        </div>
        <div class="attendance-container">
          <div
            class="attendance-item"
            v-for="(item, index) in attendanceDataSlice"
            :key="index"
          >
            <div class="i-top">
              <div class="i-title">{{ item.f_ksname }}</div>
              <div class="i-date">{{ item.starttime }}-{{ item.endtime }}</div>
            </div>
            <div class="i-bottom">
              <span>实际实习天数：{{ item.f_daysjsx }}天</span>
              <span>事假：{{ item.f_daysj }}天</span>
              <span>病假：{{ item.f_daybj }}天</span>
              <span>旷假：{{ item.f_daykj }}天</span>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 科室实习安排概况 -->
      <el-card class="box-card4" shadow="never">
        <div class="gear-title">
          <span @click="departmentDialogVisible = true">科室实习安排概况</span>
          <span @click="departmentDialogVisible = true">···</span>
        </div>
        <div style="height: 100%">
          <el-timeline>
            <el-timeline-item
              placement="top"
              v-for="(item, index) in arrangmentDataSlice"
              :key="index"
              :color="item.color"
            >
              <div class="gear-item">
                <div class="gear-left">
                  <!-- <div class="gear-img">
                    <img :src="item.pic" alt="" />
                  </div> -->
                  <div
                    class="gear-t"
                    :style="{ color: item.isdqjl == 1 ? '#122073' : '' }"
                  >
                    {{ item.f_ksname }}
                  </div>
                </div>
                <div
                  class="gear-right"
                  :style="{
                    'border-bottom':
                      index == arrangmentDataSlice.length - 1
                        ? ''
                        : '1px solid rgba(18, 32, 115, 0.07)',
                  }"
                >
                  <div class="g-left">
                    <span
                      :style="{ color: item.isdqjl == 1 ? '#122073' : '' }"
                      >{{ item.f_xks }}</span
                    >
                  </div>
                  <div class="g-right">
                    <div class="status" v-if="item.isdqjl == 1">当前</div>
                    <div v-else>
                      <span>{{ item.starttime }}</span
                      >-
                      <span>{{ item.endtime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div
          class="go-detail"
          v-if="arrangmentDataSlice.length"
          @click="departmentDialogVisible = true"
        >
          查看完整实习安排 >
        </div>
      </el-card>
    </div>
    <!-- 添加培训记录弹出层 -->
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
    <!-- 选择实习阶段、添加科室弹框 -->
    <el-dialog
      title="添加操作记录"
      :visible.sync="chooseDepartmentDialogVisible"
      @closed="choosedDepartmentDialogClosed"
      width="500px"
      center
    >
      <div class="choose-department-dialog">
        <div class="department-item">
          <el-row type="flex" align="middle">
            <el-col :span="10">选择实习阶段（科室）</el-col>
            <el-col :span="14">
              <el-select
                v-model="value"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.f_id"
                  :label="item.f_ksname"
                  :value="item.f_id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            align="middle"
            justify="space-between"
            style="margin-top: 30px"
          >
            <el-col :span="10">输入科室</el-col>
            <el-col :span="14">
              <el-input v-model="departmentVal" placeholder="请输入"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row class="department-dialog-btn" type="flex" justify="center">
          <el-col
            class="cancel"
            @click.native="chooseDepartmentDialogVisible = false"
          >
            取消
          </el-col>
          <el-col class="next" @click.native="next"> 下一步 </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 填写项目弹框 -->
    <el-dialog
      title="填写项目"
      :visible.sync="writeProjectDialogVisible"
      @closed="writeProjectDialogClosed"
      width="47%"
      center
    >
      <div class="write-project-dialog-wrapper">
        <div class="write-project-dialog">
          <el-row class="description-row">
            <el-col class="description-col">
              <img src="@/assets/image/叹号.png" alt="" />
              <span>
                “熟练”表示学生完全熟练掌握；“不熟练”表示学生有练过，但是练习不多；“没有操作”指学生没有练习该项操作。经历过的操作形式填写“√”。</span
              >
            </el-col>
          </el-row>
          <div
            class="descirption-dialog-content"
            v-for="(item, index) in projectList"
            :key="index"
          >
            <el-row class="des-header">
              <el-col :span="10" style="display: flex; align-items: center">
                <img
                  src="@/assets/image/组 1270.png"
                  alt=""
                  style="margin-right: 10px"
                />
                <span>{{ item.name }}</span>
              </el-col>

              <el-col
                :span="14"
                style="display: flex; justify-content: space-around"
              >
                <span>熟练</span>
                <span>不熟练</span>
                <span>无操作</span>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              class="des-body"
              v-for="(item_, index) in item.child"
              :key="index"
            >
              <el-col :span="10">{{ item_.name }}</el-col>
              <el-col :span="14" style="display: flex; justify-content: center"
                ><el-radio-group
                  v-model="item_.radioVal"
                  style="
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                  "
                >
                  <el-radio :label="1" style="transform: translateX(5px)">
                  </el-radio>
                  <el-radio :label="0" style="transform: translateX(-8px)">
                  </el-radio>
                  <el-radio :label="-1" style="transform: translateX(-8px)">
                  </el-radio> </el-radio-group
              ></el-col>
            </el-row>
          </div>
        </div>
        <div class="project-dialog-footer">
          <el-row type="flex" justify="center" align="center">
            <el-col :span="6" class="cancel" @click.native="projectCancel"
              >取消</el-col
            >
            <el-col :span="6" class="last" @click.native="projectLast"
              >上一步</el-col
            >
            <el-col :span="6" class="commit" @click.native="commit"
              >提交</el-col
            >
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 实习考勤概况弹出层 -->
    <el-dialog
      class="attendance-dialog"
      title="实习考勤概况"
      :visible.sync="attendanceDialogVisible"
      width="34%"
      center
    >
      <div class="attendance-container-dialog">
        <div
          class="i-attendance-d"
          v-for="(item, index) in attendanceData"
          :key="index"
        >
          <div class="top-attendance-d">
            <div class="title-attendance-d">{{ item.f_ksname }}</div>
            <div class="date-attendance-d">
              {{ item.starttime }}-{{ item.endtime }}
            </div>
          </div>
          <div class="bottom-attendance-d">
            <div class="attendance-day-d">
              <span>实际实习天数：</span><span>{{ item.f_daysjsx }}天</span>
            </div>
            <div class="attendance-thingvacation-d">
              <span>事假：</span><span>{{ item.f_daysj }}天</span>
            </div>
            <div class="attendance-illvacation-d">
              <span>病假：</span><span>{{ item.f_daybj }}天</span>
            </div>
            <div class="attendance-absenteeism-d">
              <span>旷假：</span><span>{{ item.f_daykj }}天</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 科室实习安排概况弹出层 -->
    <el-dialog
      class="department-dialog"
      title="科室实习安排概况"
      :visible.sync="departmentDialogVisible"
      width="800px"
      center
    >
      <div class="department-container-dialog">
        <el-timeline>
          <el-timeline-item
            placement="top"
            v-for="(item, index) in arrangmentData"
            :key="index"
            :color="item.color"
          >
            <div class="gear-item-dialog">
              <div class="gear-left-dialog">
                <div class="gear-img-dialog">
                  <img :src="item.pic" alt="" />
                </div>
                <div
                  class="gear-t-dialog"
                  :style="{ color: item.isdqjl == 1 ? '#122073' : '' }"
                >
                  {{ item.f_ksname }}
                </div>
              </div>
              <div
                class="gear-right-dialog"
                :style="{
                  'border-bottom':
                    index == practiceDialogData.length - 1
                      ? ''
                      : '1px solid rgba(18, 32, 115, 0.07)',
                }"
              >
                <div class="g-left-dialog">
                  <span :style="{ color: item.isdqjl == 1 ? '#122073' : '' }">{{
                    item.f_xks
                  }}</span>
                </div>
                <div class="g-right-dialog">
                  <div class="status-dialog" v-if="item.isdqjl == 1">当前</div>
                  <div style="height: 100%" v-else>
                    <span style="display: inline-block">{{
                      item.starttime
                    }}</span
                    >-
                    <span style="display: inline-block">{{
                      item.endtime
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAttendance,
  getArrangment,
  getStudentStatistics,
} from "api/student-api/welcome";
import {
  getTrainingPageList,
  postTrainingSave,
} from "api/student-api/trainingRecord";
import {
  getBaseInternshipStatistics,
  getAllChildAssessmentByParent,
  getArrangement,
  postSaveList,
  postSaveForm,
} from "api/student-api/baseInternshipRecord";
import { getDepartmentExpertiseRecordHasContentRoot } from "api/student-api/departmentExpertiseRecord";
import { getRotationStudyRecordHasContentRoot } from "api/student-api/rotationStudyRecord";
import { getDepartmentTreatmentRecordHasContentRoot } from "api/student-api/departmentTreatmentRecord";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "Welcome",
  data() {
    return {
      loading: false,
      trainingNum: "",
      baseIntershipNum: "",
      departmentExpertiseRecordNum: "",
      rotationStudyRecordtNum: "",
      departmentTreatmentRecordNum: "",
      departmentVal: "",
      addTrainingRecordDialogVisible: false,
      attendanceDialogVisible: false,
      departmentDialogVisible: false,
      chooseDepartmentDialogVisible: false,
      writeProjectDialogVisible: false,
      projectList: [],
      options: [],
      value: "",
      value1: "",
      iptVal: "",
      input: "",
      attendanceData: [],
      attendanceDataSlice: [],
      arrangmentData: [],
      arrangmentDataSlice: [],
      currentIndex: "",
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
      practiceDialogData: [],
    };
  },
  created() {
    this.attendance();
    this.arrangment();
    this.addOperation();
    this.trainingPageList();
    // this.baseInternshipStatisticsPageList();
    // this.departmentExpertiseRecordPageList();
    // this.rotationStudyRecordtPageList();
    // this.departmentTreatmentRecordPageList();
    this.studentStatistics();
  },
  methods: {
    /* 培训活动条数 */
    trainingPageList() {
      let params = {
        page: 1,
        size: 10,
      };
      getTrainingPageList(params).then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          this.trainingNum = res.data.records;
        }
      });
    },
    /* 获取学生填报统计条数 */
    studentStatistics() {
      let params = {
        stuid: window.sessionStorage.getItem("userid"),
      };
      getStudentStatistics(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "获取学生填报数据失败！",
            type: "error",
            center: true,
          });
        } else {
          console.log(res.data);
          if (res.data.length) {
            this.baseIntershipNum = res.data[0].f_baseinternshiprecordcount;
            this.departmentExpertiseRecordNum =
              res.data[0].f_departmentexpertiserecordcount;
            this.rotationStudyRecordtNum =
              res.data[0].f_rotationstudyrecordcount;
            this.departmentTreatmentRecordNum =
              res.data[0].f_departmenttreatmentrecordcount;
          }
        }
      });
    },

    attendance() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getAttendance(params).then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "获取实习考勤概况失败！",
            type: "error",
            center: true,
          });
        } else {
          this.attendanceData = res.data;
          this.attendanceDataSlice = res.data.slice(0, 4);
          console.log(this.attendanceDataSlice);
          console.log(this.attendanceData);
        }
      });
    },

    arrangment() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getArrangment(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "获取科室实习安排概况失败！",
            type: "error",
            center: true,
          });
        } else {
          this.arrangmentData = res.data;
          this.arrangmentData = this.arrangmentData.map((item) => ({
            ...item,
            color: item.isdqjl == 1 ? "rgba(88,100,255,1)" : "",
          }));
          this.currentIndex = this.indexOf(this.arrangmentData, 1);
          this.arrangmentData.splice(0, this.currentIndex);
          this.arrangmentDataSlice = this.arrangmentData.slice(0, 5);
          this.arrangmentDataSlice = this.arrangmentDataSlice.map((item) => ({
            ...item,
            color: item.isdqjl == 1 ? "rgba(88,100,255,1)" : "",
          }));
          console.log(this.arrangmentData);
          console.log(this.arrangmentDataSlice);
        }
      });
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
          this.loading = false;
          console.log(res);
          if (res.code == 100) {
            this.$message({
              message: "添加成功！",
              type: "success",
              center: true,
            });
            this.addTrainingRecordDialogClose();
          } else {
            this.$message({
              message: "添加失败！",
              type: "error",
              center: true,
            });
          }
        });
      }
    },

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

    choosedDepartmentDialogClosed() {
      if (this.value !== "") {
        this.chooseDepartmentDialogVisible = false;
        this.departmentVal = "";
        this.value = this.options.find((item) => item.isdqjl == 1).f_id;
      } else {
        this.chooseDepartmentDialogVisible = false;
        this.departmentVal = "";
      }
    },

    /* 获取实习阶段（科室） */
    addOperation() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
      };
      getArrangement(params).then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "获取实习阶段（科室）失败！",
            type: "error",
            center: true,
          });
        } else {
          this.options = res.data;
          // this.value = this.options.find((item) => item.isdqjl == 1).f_id;
          this.value =
            this.options.find((item) => item.isdqjl == 1) !== undefined
              ? this.options.find((item) => item.isdqjl == 1).f_id
              : "";
        }
      });
    },

    next() {
      // this.chooseDepartmentDialogVisible = false;
      if (this.departmentVal == "") {
        this.$message({
          message: "请输入科室",
          type: "warning",
          center: true,
        });
      } else {
        let data = {
          F_StuId: window.sessionStorage.getItem("userid"),
          F_InternshipId: this.value,
          F_RootId: this.departmentVal,
        };
        postSaveList(data).then((res) => {
          console.log(res);
          if (res.code !== 100) {
            this.$message({
              message: res.message,
              type: "error",
              center: true,
            });
          } else {
            this.listid = res.data;
            let params = {
              listid: this.listid,
            };
            getAllChildAssessmentByParent(params).then((res) => {
              console.log(res);
              if (res.code !== 100) {
                this.$message({
                  message: "获取考核项失败！",
                  tpye: "error",
                  center: true,
                });
              } else {
                this.projectList = res.data;
                this.projectList = this.projectList.map((item) => ({
                  ...item,
                  child: item.child.map((sub) => ({
                    ...sub,
                    radioVal: "",
                  })),
                }));
                console.log(this.projectList);
                this.writeProjectDialogVisible = true;
              }
            });
          }
        });
      }
    },

    /* 提交填写项目内容 */
    commit() {
      if (
        this.projectList.some((item) =>
          item.child.some(
            (sub) =>
              sub.radioVal !== -1 && sub.radioVal !== 0 && sub.radioVal !== 1
          )
        )
      ) {
        this.$message({
          message: "请填写内容！",
          type: "warning",
          center: true,
        });
      } else {
        let idArr = [];
        let valueArr = [];
        this.projectList.map((item) =>
          item.child.map((sub) => {
            idArr.push(sub.id);
            valueArr.push(sub.radioVal);
          })
        );
        let data = {
          listid: this.listid,
          id: idArr,
          value: valueArr,
        };
        this.loading = true;
        postSaveForm(JSON.stringify(data)).then((res) => {
          this.loading = false;
          if (res.code !== 100) {
            this.$message({
              message: "添加项目内容失败！",
              tpye: "error",
              center: true,
            });
          } else {
            this.$message({
              message: "添加项目内容成功！",
              type: "success",
              center: true,
            });
            this.chooseDepartmentDialogVisible = false;
            this.writeProjectDialogVisible = false;
          }
        });
      }
    },

    writeProjectDialogClosed() {
      this.writeProjectDialogVisible = false;
    },

    projectCancel() {
      this.writeProjectDialogVisible = false;
      this.chooseDepartmentDialogVisible = false;
    },

    projectLast() {
      this.writeProjectDialogVisible = false;
    },

    indexOf(arr, item) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isdqjl == item) {
          return i;
        }
      }
      return -1;
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  margin: 20px;
  height: 90%;
  .search-box {
    position: relative;
    width: 436px;
    height: 54px;
    background: #ffffff;
    opacity: 1;
    border-radius: 6px;
    display: flex;
    align-items: center;
    .el-dropdown {
      margin-left: 21px;
      cursor: pointer;
      .el-dropdown-link {
        width: 64px;
        height: 22px;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        line-height: 29px;
        color: #122073;
        opacity: 1;
      }
    }
    input {
      flex: 1;
      height: 54px;
      border: none;
      outline: none;
      padding: 0 54px 0 30px;

      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      line-height: 29px;
      color: #122073;
      opacity: 0.25;
    }
    .search-icon {
      position: absolute;
      right: 0;
      width: 54px;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .box-card1 {
    height: 220px;
    background: none;
    border: none;
    /deep/.el-card__body {
      padding: 0;
      background: none;
      .boxs {
        display: flex;
        background: #ffffff;
        transform: translateY(12px);
        border-radius: 12px;
        .box1,
        .box2,
        .box3,
        .box4,
        .box5 {
          width: 218px;
          height: 197px;
          padding: 30px 48px 34px 29px;
          background-image: url("../../../assets/image/蒙版组 1.png");
          background-size: 205px 183px;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          :nth-child(1) {
            :nth-child(1) {
              width: 29px;
              height: 63px;
              font-size: 52px;
              font-family: "Chalet NewYorkNineteenSixty";
              font-weight: 400;
              line-height: 95px;
              color: #122073;
              opacity: 1;
            }
            :nth-child(2) {
              width: 16px;
              height: 22px;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              line-height: 29px;
              color: #122073;
              opacity: 1;
            }
          }
          :nth-child(2) {
            height: 22px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            line-height: 29px;
            color: #122073;
            opacity: 1;
          }
        }
        .box1,
        .box2 {
          position: relative;
          transition: all 0.5s linear;
          .add {
            position: absolute;
            top: 18px;
            right: 20px;
            cursor: pointer;
            width: 38px;
            height: 38px;
            background: #5864ff;
            opacity: 1;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              border-radius: 6px;
            }
          }
        }
        .box1:hover {
          transform: scale(1.1);
          background: #5864ff;
          transition: all 0.5s linear;
          box-shadow: 0px 20px 20px rgba(88, 100, 255, 0.22);
          opacity: 1;
          border-radius: 12px;
          .add {
            background: #9fa6ff;
          }
          :nth-child(1) {
            color: #ffffff;
          }
          :nth-child(2) {
            color: #ffffff;
          }
        }
        .box2:hover {
          transform: scale(1.1);
          background: #5864ff;
          transition: all 0.5s linear;
          box-shadow: 0px 20px 20px rgba(88, 100, 255, 0.22);
          opacity: 1;
          border-radius: 12px;
          .add {
            background: #9fa6ff;
          }
          :nth-child(1) {
            color: #ffffff;
          }
          :nth-child(2) {
            color: #ffffff;
          }
        }
        .box3,
        .box4,
        .box5 {
          background: #ffffff;
          border: 1px solid #707070;
          opacity: 1;
          border-radius: 12px;
          margin-left: 13px;
        }
      }
    }
  }
  .bottom-container {
    display: flex;
    justify-content: space-between;
    margin-top: 18px;

    .box-card2 {
      height: 480px;
      background: none;
      box-shadow: none;
      border: none;
      /deep/.el-card__body {
        padding: 0;
        .box-left {
          width: 428px;
          height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .t-reviews {
            position: relative;
            height: 221px;
            background-image: url("../../../assets/image/组 1957.png");
            .t-title {
              position: absolute;
              top: 61px;
              left: 205px;
              width: 84px;
              height: 29px;
              font-size: 21px;
              font-family: "PingFang SC";
              font-weight: 800;
              line-height: 34px;
              color: #5864ff;
              opacity: 1;
            }
            .t-content {
              position: absolute;
              top: 104px;
              left: 205px;
              width: 192px;
              height: 100px;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              line-height: 24px;
              color: #5864ff;
              opacity: 0.55;
            }
          }
          .s-comment {
            position: relative;
            height: 221px;
            background-image: url("../../../assets/image/组 1958.png");
            .s-title {
              position: absolute;
              top: 61px;
              left: 205px;
              width: 84px;
              height: 29px;
              font-size: 21px;
              font-family: "PingFang SC";
              font-weight: 800;
              line-height: 34px;
              color: #5864ff;
              opacity: 1;
            }
            .s-content {
              position: absolute;
              top: 104px;
              left: 205px;
              width: 192px;
              height: 100px;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              line-height: 24px;
              color: #5864ff;
              opacity: 0.55;
            }
          }
        }
      }
    }
    .box-card3 {
      width: 35%;
      height: 480px;
      padding: 20px;
      box-sizing: border-box;
      .attendance-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        :nth-child(1) {
          height: 29px;
          font-size: 21px;
          font-family: "PingFang SC";
          font-weight: 800;
          line-height: 34px;
          color: #122073;
          opacity: 1;
          cursor: pointer;
        }
        :nth-child(2) {
          letter-spacing: 6px;
          color: #838bb7;
          font-size: 48px;
          cursor: pointer;
        }
      }
      .attendance-container {
        .attendance-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
          .i-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .i-title {
              width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 27px;
              background: #ffffff;
              border: 1px solid #5864ff;
              opacity: 1;
              border-radius: 14px;
              text-align: center;
              line-height: 27px;
              /* display: flex;
              justify-content: center;
              align-items: center; */
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: bold;
              color: #5864ff;
              padding: 0 10px;
              box-sizing: border-box;
            }
            .i-date {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              line-height: 44px;
              color: #122073;
              opacity: 0.35;
            }
          }
          .i-bottom {
            display: flex;
            justify-content: space-between;

            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            :nth-child(1) {
              width: 160px;
            }
            :nth-child(2) {
              width: 100px;
            }
            :nth-child(3) {
              width: 100px;
            }
            :nth-child(4) {
              width: 100px;
            }
          }
        }
      }
    }
    .box-card4 {
      width: 35%;
      height: 480px;
      padding: 20px;
      box-sizing: border-box;
      .gear-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        :nth-child(1) {
          height: 29px;
          font-size: 21px;
          font-family: "PingFang SC";
          font-weight: 800;
          line-height: 34px;
          color: #122073;
          opacity: 1;
          cursor: pointer;
        }
        :nth-child(2) {
          letter-spacing: 6px;
          color: #838bb7;
          font-size: 48px;
          cursor: pointer;
        }
      }
      /deep/.el-timeline-item__timestamp.is-top {
        padding-top: 0;
        margin-bottom: 0;
      }
      .gear-item {
        display: flex;
        justify-content: space-between;
        .gear-left {
          // width: 40%;
          width: 30%;
          display: flex;
          .gear-img {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .gear-t {
            height: 40px;
            display: flex;
            align-items: center;

            font-size: 18px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: rgba(18, 32, 115, 0.35);
          }
        }
        .gear-right {
          flex: 1;
          display: flex;
          justify-content: space-between;
          padding-bottom: 20px;

          .g-left {
            // width: 40%;
            display: flex;
            flex-direction: column;
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: rgba(18, 32, 115, 0.35);
              margin-top: 9px;
            }
          }
          .g-right {
            display: flex;
            flex-direction: column;
            margin-top: 9px;
            .status {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #5864ff;
              opacity: 1;
              margin-top: 9px;
              display: flex;
              justify-content: flex-end;
            }
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: rgba(18, 32, 115, 0.35);
              margin-top: 9px;
            }
          }
        }
      }
      .go-detail {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #5864ff;
        opacity: 1;
        cursor: pointer;
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
  .attendance-dialog {
    /deep/.el-dialog--center .el-dialog__body {
      padding: 0;
    }
    .attendance-container-dialog {
      height: 600px;
      padding: 25px 25px 30px;
      overflow: auto;
      .i-attendance-d {
        display: flex;
        flex-direction: column;
        margin-bottom: 34px;
        .top-attendance-d {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title-attendance-d {
            height: 27px;
            padding: 2px 16px;
            background: #ffffff;
            border: 1px solid #5864ff;
            opacity: 1;
            border-radius: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: #5864ff;
            box-sizing: border-box;
          }
          .date-attendance-d {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            line-height: 44px;
            color: #122073;
            opacity: 0.35;
          }
        }
        .bottom-attendance-d {
          display: flex;
          justify-content: space-between;
          .attendance-day-d {
            width: 160px;
            height: 22px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            line-height: 22px;
            color: #122073;
            opacity: 1;
          }
          .attendance-thingvacation-d {
            width: 100px;
            height: 22px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            line-height: 22px;
            color: #122073;
            opacity: 1;
          }
          .attendance-illvacation-d {
            width: 100px;
            height: 22px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            line-height: 22px;
            color: #122073;
            opacity: 1;
          }
          .attendance-absenteeism-d {
            width: 100px;
            height: 22px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            line-height: 22px;
            color: #122073;
            opacity: 1;
          }
        }
      }
    }
    .attendance-container-dialog::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px;
      height: 100px;
    }
    .attendance-container-dialog::-webkit-scrollbar-thumb {
      /*滚动条里面的滑块*/
      border-radius: 9px;
      background: #e3e4ee;
    }
    .attendance-container-dialog::-webkit-scrollbar-track {
      /*滚动条里面轨道背景*/
      border-radius: 10px;
    }
  }
  .department-dialog {
    /deep/.el-dialog--center .el-dialog__body {
      padding: 0;
    }
    .department-container-dialog {
      height: 550px;
      padding: 40px 75px 0px 35px;
      overflow: auto;
      /deep/.el-timeline-item__timestamp.is-top {
        padding-top: 0;
        margin-bottom: 0;
      }
      .gear-item-dialog {
        display: flex;
        justify-content: space-between;
        .gear-left-dialog {
          width: 40%;
          display: flex;
          .gear-img-dialog {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .gear-t-dialog {
            height: 40px;
            display: flex;
            align-items: center;

            font-size: 18px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: rgba(18, 32, 115, 0.35);
          }
        }
        .gear-right-dialog {
          flex: 1;

          display: flex;
          justify-content: space-between;
          padding-bottom: 20px;

          .g-left-dialog {
            width: 40%;
            display: flex;
            flex-direction: column;
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: rgba(18, 32, 115, 0.35);
              margin-top: 9px;
            }
          }
          .g-right-dialog {
            display: flex;
            flex-direction: column;
            .status-dialog {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #5864ff;
              opacity: 1;
              margin-top: 9px;
              display: flex;
              justify-content: flex-end;
            }
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: rgba(18, 32, 115, 0.35);
              margin-top: 9px;
            }
          }
        }
      }
    }
    .department-container-dialog::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px;
      height: 100px;
    }
    .department-container-dialog::-webkit-scrollbar-thumb {
      /*滚动条里面的滑块*/
      border-radius: 9px;
      background: #e3e4ee;
    }
    .department-container-dialog::-webkit-scrollbar-track {
      /*滚动条里面轨道背景*/
      border-radius: 10px;
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
  .choose-department-dialog {
    // height: 600px;
    padding: 25px;
    box-sizing: border-box;
    .department-item {
      :nth-child(1) {
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
      }
    }
    .department-dialog-btn {
      margin-top: 35px;
      margin-bottom: 20px;
      .cancel {
        width: 176px;
        height: 42px;
        background: #d0d2e3;
        opacity: 1;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }
      .next {
        width: 176px;
        height: 42px;
        background: #5864ff;
        opacity: 1;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .write-project-dialog-wrapper {
    height: 670px;
    .write-project-dialog {
      height: 600px;
      padding: 25px 25px 25px 25px;
      box-sizing: border-box;
      overflow: auto;
      .description-row {
        background: rgba(88, 100, 255, 0.06);
        border: 1px solid rgba(88, 100, 255, 0.2784313725490196);
        opacity: 1;
        border-radius: 4px;
        padding: 9px 13px;
        .description-col {
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
        }
      }
      .descirption-dialog-content {
        .des-header {
          display: flex;
          align-items: center;
          height: 48px;
          background: #5864ff;
          opacity: 1;
          border-radius: 8px 8px 0px 0px;
          margin-top: 14px;
          padding-left: 31px;
          .el-col {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: #ffffff;
            opacity: 1;
          }
        }
        .des-body {
          height: 47px;
          display: flex;
          align-items: center;
          padding-left: 31px;
          border: 1px solid rgba(18, 32, 115, 0.07);
          /deep/.el-radio__label {
            display: none;
          }
          .el-col {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
      }
    }
    .project-dialog-footer {
      height: 70px;
      overflow: hidden;
      .el-row {
        margin-top: 10px;
        .cancel {
          height: 42px;
          background: #d0d2e3;
          opacity: 1;
          border-radius: 4px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .last {
          height: 42px;
          background: #fdbe00;
          opacity: 1;
          border-radius: 4px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 10px;
          cursor: pointer;
        }
        .commit {
          height: 42px;
          background: #5864ff;
          opacity: 1;
          border-radius: 4px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }

  .write-project-dialog::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    height: 100px;
  }
  .write-project-dialog::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 9px;
    background: #e3e4ee;
  }
  .write-project-dialog::-webkit-scrollbar-track {
    /*滚动条里面轨道背景*/
    border-radius: 10px;
  }
}
</style>