<template>
  <div class="wrapper">
    <!-- 通知区域 -->
    <div class="notice" v-if="false">
      {{ a }}
    </div>
    <!-- 主体区域 -->
    <el-card class="main-card">
      <div class="search">
        <div class="search-left" style="visibility: hidden">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              选择条件<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus"
                >狮子头</el-dropdown-item
              >
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
            v-model="searchVal"
            placeholder="请输入..."
            name=""
            id=""
          />
          <div class="search-icon">
            <img src="@/assets/image/路径 262.png" alt="" />
          </div>
        </div>
        <div class="search-right">
          <div class="major-box">
            <div v-if="majorThousands !== null" class="a-box1">
              {{ majorThousands }}
            </div>
            <div v-if="majorHundreds !== null" class="a-box2">
              {{ majorHundreds }}
            </div>
            <div v-if="majorTens !== null" class="a-box3">{{ majorTens }}</div>
            <div v-if="majorUnits !== null" class="a-box4">
              {{ majorUnits }}
            </div>
            <div class="a-box5">个专业</div>
          </div>
          <div class="class-box">
            <div v-if="classThousands !== null" class="b-box1">
              {{ classThousands }}
            </div>
            <div v-if="classHundreds !== null" class="b-box2">
              {{ classHundreds }}
            </div>
            <div v-if="classTens !== null" class="b-box3">{{ classTens }}</div>
            <div v-if="classUnits !== null" class="b-box4">
              {{ classUnits }}
            </div>
            <div class="b-box5">个班级</div>
          </div>
          <div class="student-box">
            <div v-if="studentThousands !== null" class="c-box1">
              {{ studentThousands }}
            </div>
            <div v-if="studentHundreds !== null" class="c-box2">
              {{ studentHundreds }}
            </div>
            <div v-if="studentTens !== null" class="c-box3">
              {{ studentTens }}
            </div>
            <div v-if="studentUnits !== null" class="c-box4">
              {{ studentUnits }}
            </div>
            <div class="c-box5">名实习生</div>
          </div>
          <div class="teacher-box">
            <div v-if="teacherThousands !== null" class="d-box1">
              {{ teacherThousands }}
            </div>
            <div v-if="teacherHundreds !== null" class="d-box2">
              {{ teacherHundreds }}
            </div>
            <div v-if="teacherTens !== null" class="d-box3">
              {{ teacherTens }}
            </div>
            <div v-if="teacherUnits !== null" class="d-box4">
              {{ teacherUnits }}
            </div>
            <div class="d-box5">名实习生</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="top">
          <div class="box">
            <div class="peopleNum">
              <span>{{ yearNumb1 }}</span>
              人
            </div>
            <div class="title">{{ major1 }}</div>
          </div>
          <div class="box">
            <div class="peopleNum">
              <span>{{ yearNumb2 }}</span>
              人
            </div>
            <div class="title">{{ major2 }}</div>
          </div>
          <div class="box">
            <div class="peopleNum">
              <span>{{ yearNumb3 }}</span>
              人
            </div>
            <div class="title">{{ major3 }}</div>
          </div>
          <div class="box">
            <div class="peopleNum">
              <span>{{ yearNumb4 }}</span>
              人
            </div>
            <div class="title">{{ major4 }}</div>
          </div>
          <div
            class="box"
            @click="checkDialogVisible = true"
            style="text-align: center; cursor: pointer"
          >
            <div class="peopleNum" style="margin-left: 0px">
              <img src="@/assets/image/组 829.png" alt="" />
            </div>
            <div class="title" style="margin-left: 0px">查看往届</div>
          </div>
          <div class="box-release">
            <div>信息发布</div>
            <img
              src="@/assets/image/加3.png"
              @click="addDialogVisible = true"
              alt=""
            />
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-left">
            <div class="f-title">
              <div>2021级全级成绩排名TOP50</div>
              <div @click="top50DialogVisibleShow">···</div>
            </div>
            <div class="f-content" id="top50"></div>
          </div>
          <div class="bottom-middle">
            <div class="t-title">
              <div>各专业不同届别成绩对比</div>
              <div @click="differentDialogVisibleShow">···</div>
            </div>
            <div class="t-content" id="different-compare"></div>
          </div>
          <div class="bottom-right">
            <div class="k-title">
              <div>本年度各专业平均成绩对比</div>
              <div @click="yearDialogVisibleShow">···</div>
            </div>
            <div class="k-content" id="year-compare"></div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 查看往届dialog -->
    <el-dialog
      title="历年各专业人数"
      :visible.sync="checkDialogVisible"
      @opened="checkDialogOpen"
      width="550px"
      center
      ><el-select
        v-model="checkYearVal"
        @change="selectCheck"
        clearable
        placeholder="选择年份"
        style="width: 50%; margin-left: 20px; margin-bottom: 10px"
      >
        <el-option
          v-for="item in checkYearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="checkContent">
        <div
          class="main-box"
          v-for="(item, index) in checkDialogData"
          :key="index"
        >
          <div
            style="
              font-size: 16px;
              font-weight: 400;
              color: #122073;
              margin-left: 20px;
            "
          >
            年级： {{ item.year }}
          </div>
          <div
            style="display: flex; flex-wrap: wrap; align-content: flex-start"
          >
            <div
              class="box"
              v-for="(_item, index) in item.majornumb"
              :key="index"
            >
              <div class="peopleNum">
                <span>{{ _item.numb }}</span
                >人
              </div>
              <div class="title">{{ _item.major }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 信息发布dialog -->
    <el-dialog
      title="信息发布"
      :visible.sync="addDialogVisible"
      @closed="addDialogClose"
      @opened="opened"
      width="800px"
      center
      ><div class="add-dialog">
        <el-row style="margin-bottom: 20px">
          <el-col>
            <div class="parent">标题</div>
            <el-input placeholder="请输入" v-model="titleVal"></el-input>
          </el-col>
        </el-row>
        <el-row class="main-text">正文内容</el-row>
        <editor ref="editorOne" v-model="detailVal"></editor>
        <el-row style="margin-top: 20px">
          <el-col
            :span="3"
            style="
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              color: #122073;
            "
            >查看权限</el-col
          >
          <el-col
            :span="21"
            style="
              font-size: 16px;
              font-weight: 400;
              line-height: 22px;
              color: #122073;
            "
          >
            <el-radio v-model="radio" label="0">所有人</el-radio>
            <el-radio v-model="radio" label="2">仅学生</el-radio>
            <el-radio v-model="radio" label="1">仅教师</el-radio>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- top50dialog -->
    <el-dialog
      class="top50-dialog"
      title="2021级全级成绩排名TOP50"
      :visible.sync="top50DialogVisible"
      @open="top50Open"
      width="600px"
      center
    >
      <el-scrollbar style="height: 500px">
        <div style="height: 800px; width: 550px" id="top50-dialog"></div>
      </el-scrollbar>
    </el-dialog>
    <!-- 各专业不同届别成绩对比dialog -->
    <el-dialog
      class="different-dialog"
      title="各专业不同届别成绩对比"
      :visible.sync="differentDialogVisible"
      @open="differentOpen"
      width="600px"
      center
    >
      <el-scrollbar style="height: 500px">
        <div style="height: 480px; width: 600px" id="different-dialog"></div>
      </el-scrollbar>
    </el-dialog>
    <!-- 本年度成绩对比dialog -->
    <el-dialog
      class="year-dialog"
      title="本年度各专业平均成绩对比"
      :visible.sync="yearDialogVisible"
      @open="yearOpen"
      width="600px"
      center
    >
      <el-scrollbar style="height: 500px">
        <div style="height: 800px; width: 550px" id="year-dialog"></div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
import * as echarts from "echarts";
import Editor from "@/components/admin/informationRelease/editor";

import {
  getBaseNumb,
  getYearNumb,
  getCjpmList,
  getClassYear,
  getMajorAve,
} from "api/admin-api/welcome";
import { postSaveInformation } from "api/admin-api/information";
export default {
  name: "AdminWelcome",
  data() {
    return {
      a: "仁济学院/2019级/护理本科专业/02班 ",
      yearNumb1: "",
      major1: "",
      yearNumb2: "",
      major2: "",
      yearNumb3: "",
      major3: "",
      yearNumb4: "",
      major4: "",
      searchVal: "",
      addDialogVisible: false,
      checkDialogVisible: false,
      checkYearVal: "",
      checkYearOptions: [
        {
          label: "2021年",
          value: 2021,
        },
        {
          label: "2020年",
          value: 2020,
        },
        {
          label: "2019年",
          value: 2019,
        },
        {
          label: "2018年",
          value: 2018,
        },
        {
          label: "2017年",
          value: 2017,
        },
        {
          label: "2016年",
          value: 2016,
        },
        {
          label: "2015年",
          value: 2015,
        },
        {
          label: "2014年",
          value: 2014,
        },
        {
          label: "2013年",
          value: 2013,
        },
        {
          label: "2012年",
          value: 2012,
        },
        {
          label: "2011年",
          value: 2011,
        },
        {
          label: "2010年",
          value: 2010,
        },
      ],
      checkDialogData: [],
      titleVal: "",
      detailVal: "",
      contentVal: "",
      radio: "0",
      baseYear: "",
      yearNum: [],
      yearYear: "",

      majorNum: "",
      majorUnits: "",
      majorTens: "",
      majorHundreds: "",
      majorThousands: "",

      classNum: "",
      classUnits: "",
      classTens: "",
      classHundreds: "",
      classThousands: "",

      studentNum: "",
      studentUnits: "",
      studentTens: "",
      studentHundreds: "",
      studentThousands: "",

      teacherNum: "",
      teacherUnits: "",
      teacherTens: "",
      teacherHundreds: "",
      teacherThousands: "",

      top50DialogVisible: false,
      differentDialogVisible: false,
      yearDialogVisible: false,
    };
  },
  components: {
    Editor,
  },
  watch: {
    majorNum(i) {
      this.getMajorUnits(i);
      this.getMajorTens(i);
      this.getMajorHundreds(i);
      this.getMajorThousands(i);
    },
    classNum(i) {
      this.getClassUnits(i);
      this.getClassTens(i);
      this.getClassHundreds(i);
      this.getClassThousands(i);
    },
    studentNum(i) {
      this.getStudentUnits(i);
      this.getStudentTens(i);
      this.getStudentHundreds(i);
      this.getStudentThousands(i);
    },
    teacherNum(i) {
      this.getTeacherUnits(i);
      this.getTeacherTens(i);
      this.getTeacherHundreds(i);
      this.getTeacherThousands(i);
    },
  },
  created() {
    this.yearNumb();
  },
  mounted() {
    this.baseNumb();
    // this.yearNumb();

    this.top50();
    this.differentCompare();
    this.yearCompare();
  },
  methods: {
    checkDialogOpen() {
      let params = {
        year: "",
      };
      getYearNumb(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          this.checkDialogData = res.data;
          console.log("hahahah", this.checkDialogData);
        }
      });
    },

    selectCheck(val) {
      console.log(val);
      let params = {
        year: val,
      };
      getYearNumb(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          this.checkDialogData = res.data;
          console.log("hahahah", this.checkDialogData);
        }
      });
    },
    opened() {
      this.detailVal = this.contentVal;
    },
    addDialogClose() {
      this.addDialogVisible = false;
      this.F_Id = "";
      this.titleVal = "";
      this.detailVal = "";
      this.radio = "0";
      this.contentVal = "";
    },
    commit() {
      if (this.titleVal == "") {
        this.$message({
          message: "请输入标题！",
          type: "warning",
          center: true,
        });
      } else if (this.detailVal == "") {
        this.$message({
          message: "请输入内容！",
          type: "warning",
          center: true,
        });
      } else {
        let data = {
          F_Id: this.F_Id,
          F_Title: this.titleVal,
          F_content: encodeURIComponent(this.detailVal),
          F_Power: this.radio,
        };
        console.log(data);
        postSaveInformation(data).then((res) => {
          if (res.code !== 100) {
            this.$message({
              message: "发布失败！",
              type: "error",
              center: true,
            });
          } else {
            // this.informationList();
            this.addDialogClose();
            this.$message({
              message: "发布成功！",
              type: "success",
              center: true,
            });
          }
        });
      }
    },
    baseNumb() {
      let params = {
        year: this.baseYear,
      };
      getBaseNumb(params).then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          this.majorNum = res.data[0].zynumb;
          this.classNum = res.data[0].bjnumb;
          this.studentNum = res.data[0].sxsnumb;
          this.teacherNum = res.data[0].djnumb;
        }
      });
    },
    yearNumb() {
      let date = new Date();
      let year = date.getFullYear();
      console.log(year);
      let params = {
        year: 2021,
      };
      getYearNumb(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          console.log(res);
          this.yearNumb = res.data[0].majornumb.slice(0, 4);
          this.yearNumb1 = this.yearNumb[0].numb;
          this.major1 = this.yearNumb[0].major;
          this.yearNumb2 = this.yearNumb[1].numb;
          this.major2 = this.yearNumb[1].major;
          this.yearNumb3 = this.yearNumb[2].numb;
          this.major3 = this.yearNumb[2].major;
          this.yearNumb4 = this.yearNumb[3].numb;
          this.major4 = this.yearNumb[3].major;
        }
      });
    },
    /* 2021级全级成绩排名TOP50 */
    top50() {
      let params = {
        year: "",
      };
      getCjpmList(params).then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          let dataName = [];
          let dataValue = [];
          res.data
            .slice(0, 8)
            .map(
              (item) => (
                dataName.push(item.username), dataValue.push(item.result)
              )
            );
          console.log(dataName);
          console.log(dataValue);

          let myChart = echarts.init(document.getElementById("top50"));

          myChart.setOption({
            grid: {
              left: "3%",
              right: "3%",
              bottom: "3%",
              top: "5%",
              // height: "500",
              containLabel: true,
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                saveAsImage: {
                  show: true,
                  title: "保存",
                  type: "png",
                  lang: ["点击保存"],
                },
              },
            },
            xAxis: {
              show: false,
              type: "value",
            },
            yAxis: [
              {
                type: "category",
                inverse: true,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#122073",
                    fontSize: "16",
                  },
                },
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                // data: [
                //   "NO.01 林芷梦",
                //   "NO.02 刘紫夏",
                //   "NO.03 曾念蕾",
                //   "NO.04 赵涵易",
                //   "NO.05 赵美倩",
                //   "NO.06 曾香巧",
                //   "NO.07 赵芷梦",
                //   "NO.09 赵涵易",
                // ],
                data: dataName,
              },
              {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                  textStyle: {
                    color: "#122073",
                    fontSize: "16",
                  },
                  formatter: function (value) {
                    return value.toLocaleString() + "分";
                  },
                },
                // data: [100, 90, 88, 78, 67, 60, 55, 30],
                data: dataValue,
              },
            ],
            series: [
              {
                name: "金额",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: (params) => {
                      //柱子颜色
                      let colors = [
                        "#FDBE00",
                        "#16D090",
                        "#FF6760",
                        "#0062FF",
                        "#96edc1",
                        "#ffe180",
                        "#4a5bdc",
                        "#28bf7e",
                      ];
                      return colors[params.dataIndex];
                    },
                  },
                },
                barWidth: 20,
                // data: [100, 90, 88, 78, 67, 60, 55, 30],
                data: dataValue,
              },
              {
                name: "背景",
                type: "bar",
                barWidth: 20,
                barGap: "-100%",
                data: [100, 100, 100, 100, 100, 100, 100, 100],
                itemStyle: {
                  normal: {
                    color: "#F3F3FB", //柱子背景色
                    barBorderRadius: 30,
                  },
                },
              },
            ],
          });
        }
      });
    },
    top50Dialog() {
      let params = {
        year: "",
      };
      getCjpmList(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          let dataName = [];
          let dataValue = [];
          res.data.map(
            (item) => (
              dataName.push(item.username), dataValue.push(item.result)
            )
          );

          let myChart = echarts.init(document.getElementById("top50-dialog"));
          myChart.setOption({
            grid: {
              left: "3%",
              right: "5%",
              bottom: "3%",
              top: "5%",
              containLabel: true,
            },
            toolbox: {
              show: true,

              feature: {
                mark: { show: true },
                saveAsImage: {
                  show: true,
                  title: "保存",
                  type: "png",
                  lang: ["点击保存"],
                },
              },
            },
            xAxis: {
              show: false,
              type: "value",
            },
            yAxis: [
              {
                type: "category",
                inverse: true,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#122073",
                    fontSize: "16",
                  },
                },
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                // data: [
                //   "NO.01 林芷梦",
                //   "NO.02 刘紫夏",
                //   "NO.03 曾念蕾",
                //   "NO.04 赵涵易",
                //   "NO.05 赵美倩",
                //   "NO.06 曾香巧",
                //   "NO.07 赵芷梦",
                //   "NO.08 赵涵易",
                //   "NO.09 刘紫夏",
                //   "NO.10 林芷梦",
                // ],
                data: dataName,
              },
              {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                  textStyle: {
                    color: "#122073",
                    fontSize: "16",
                  },
                  formatter: function (value) {
                    return value.toLocaleString() + "分";
                  },
                },
                // data: [100, 90, 88, 78, 67, 60, 55, 30, 30, 20],
                data: dataValue,
              },
            ],
            series: [
              {
                name: "金额",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: (params) => {
                      //柱子颜色
                      let colors = [
                        "#FDBE00",
                        "#16D090",
                        "#FF6760",
                        "#0062FF",
                        "#96edc1",
                        "#ffe180",
                        "#4a5bdc",
                        "#28bf7e",
                        "#0062FF",
                        "#16D090",
                      ];
                      return colors[params.dataIndex];
                    },
                  },
                },
                barWidth: 20,
                // data: [100, 90, 88, 78, 67, 60, 55, 30, 30, 20],
                data: dataValue,
              },
              {
                name: "背景",
                type: "bar",
                barWidth: 20,
                barGap: "-100%",
                data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                itemStyle: {
                  normal: {
                    color: "#F3F3FB", //柱子背景色
                    barBorderRadius: 30,
                  },
                },
              },
            ],
          });
        }
      });
    },
    /* 各专业不同届别成绩对比 */
    differentCompare() {
      getClassYear().then((res) => {
        console.log(res);
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          let dataName = [];
          let dataValue = [];
          res.data
            .slice(0, 5)
            .map(
              (item) => (dataName.push(item.fyear), dataValue.push(item.result))
            );

          let myChart = echarts.init(
            document.getElementById("different-compare")
          );
          myChart.setOption({
            title: {
              text: "分数",
              textStyle: {
                color: "#122073",
                fontSize: "14",
              },
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                saveAsImage: {
                  show: true,
                  title: "保存",
                  type: "png",
                  lang: ["点击保存"],
                },
              },
            },
            xAxis: {
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#122073",
                  fontSize: "14",
                },
              },
              type: "category",
              // data: ["2017级", "2018级", "2019级", "2020级", "2021级"],
              data: dataName,
            },
            yAxis: {
              type: "value",
              max: 100,
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#122073",
                  fontSize: "14",
                },
              },
            },
            series: [
              {
                // data: [70, 91, 72, 85, 80],
                data: dataValue,
                type: "bar",
                showBackground: true,
                color: "#5864FF",
                backgroundStyle: {
                  color: "#F3F3FB",
                },
              },
            ],
          });
        }
      });
    },
    differentDialog() {
      getClassYear().then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          let dataName = [];
          let dataValue = [];
          res.data.map(
            (item) => (dataName.push(item.fyear), dataValue.push(item.result))
          );

          let myChart = echarts.init(
            document.getElementById("different-dialog")
          );
          myChart.setOption({
            title: {
              text: "分数",
              textStyle: {
                color: "#122073",
                fontSize: "14",
              },
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                saveAsImage: {
                  show: true,
                  title: "保存",
                  type: "png",
                  lang: ["点击保存"],
                },
              },
            },
            xAxis: {
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#122073",
                  fontSize: "14",
                },
              },
              type: "category",
              // data: ["2017级", "2018级", "2019级", "2020级", "2021级"],
              data: dataName,
            },
            yAxis: {
              type: "value",
              max: 100,
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#122073",
                  fontSize: "14",
                },
              },
            },
            series: [
              {
                // data: [70, 91, 72, 85, 80],
                data: dataValue,
                type: "bar",
                showBackground: true,
                color: "#5864FF",
                backgroundStyle: {
                  color: "#F3F3FB",
                },
              },
            ],
          });
        }
      });
    },
    /* 本年度各专业平均成绩对比 */
    yearCompare() {
      let params = {
        year: "",
      };
      getMajorAve(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          let dataName = [];
          let thisYearValue = [];
          let otherYearValue = [];
          res.data
            .slice(0, 4)
            .map(
              (item) => (
                dataName.push(item.zy),
                thisYearValue.push(item.pjf),
                otherYearValue.push(item.pjcj)
              )
            );

          let myChart = echarts.init(document.getElementById("year-compare"));
          myChart.setOption({
            legend: {
              data: ["本年平均成绩", "历年平均成绩"],
            },
            grid: {
              left: "3%",
              // right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                saveAsImage: {
                  show: true,
                  title: "保存",
                  type: "png",
                  lang: ["点击保存"],
                },
              },
            },
            xAxis: {
              show: false,
              type: "value",
              // boundaryGap: [0, 0.01],
            },
            yAxis: [
              {
                type: "category",
                inverse: true, //数据正反排序
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#122073",
                    fontSize: "14",
                  },
                  // formatter: function (value) {
                  //   return value.toLocaleString() + "分";
                  // },
                },
                // data: [
                //   "护理本科专业",
                //   "中外合作办学",
                //   "护理专科",
                //   "仁济护理本科",
                // ],
                data: dataName,
              },
            ],
            series: [
              {
                name: "本年平均成绩",
                type: "bar",
                barWidth: 20,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: "#5864FF",
                  },
                },
                label: {
                  normal: {
                    show: true,
                    color: "#122073",
                    fontSize: 14,
                    position: "right",
                    formatter: function (value) {
                      return value.data + "分";
                    },
                  },
                },
                // data: [92, 87, 93, 97],
                data: thisYearValue,
              },
              {
                name: "历年平均成绩",
                type: "bar",
                barWidth: 20,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: "#FDBE00",
                  },
                },
                label: {
                  normal: {
                    show: true,
                    color: "#122073",
                    fontSize: 14,
                    position: "right",
                    formatter: function (value) {
                      return value.data + "分";
                    },
                  },
                },
                // data: [90, 88, 88, 97],
                data: otherYearValue,
              },
            ],
          });
        }
      });
    },
    yearDialog() {
      let params = {
        year: "",
      };
      getMajorAve(params).then((res) => {
        if (res.code !== 100) {
          this.$message({
            message: "请求数据失败！",
            type: "error",
            center: true,
          });
        } else {
          let dataName = [];
          let thisYearValue = [];
          let otherYearValue = [];
          res.data.map(
            (item) => (
              dataName.push(item.zy),
              thisYearValue.push(item.pjf),
              otherYearValue.push(item.pjcj)
            )
          );

          let myChart = echarts.init(document.getElementById("year-dialog"));
          myChart.setOption({
            legend: {
              data: ["本年平均成绩", "历年平均成绩"],
            },
            grid: {
              left: "3%",
              // right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                saveAsImage: {
                  show: true,
                  title: "保存",
                  type: "png",
                  lang: ["点击保存"],
                },
              },
            },
            xAxis: {
              show: false,
              type: "value",
              // boundaryGap: [0, 0.01],
            },
            yAxis: [
              {
                type: "category",
                inverse: true, //数据正反排序
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#122073",
                    fontSize: "14",
                  },
                  // formatter: function (value) {
                  //   return value.toLocaleString() + "分";
                  // },
                },
                // data: [
                //   "护理本科专业",
                //   "中外合作办学",
                //   "护理专科",
                //   "仁济护理本科",
                // ],
                data: dataName,
              },
            ],
            series: [
              {
                name: "本年平均成绩",
                type: "bar",
                barWidth: 20,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: "#5864FF",
                  },
                },
                label: {
                  normal: {
                    show: true,
                    color: "#122073",
                    fontSize: 14,
                    position: "right",
                    formatter: function (value) {
                      console.log(value);
                      return value.data + "分";
                    },
                  },
                },
                // data: [92, 87, 93, 97],
                data: thisYearValue,
              },
              {
                name: "历年平均成绩",
                type: "bar",
                barWidth: 20,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: "#FDBE00",
                  },
                },
                label: {
                  normal: {
                    show: true,
                    color: "#122073",
                    fontSize: 14,
                    position: "right",
                    formatter: function (value) {
                      console.log(value);
                      return value.data + "分";
                    },
                  },
                },
                // data: [90, 88, 88, 97],
                data: otherYearValue,
              },
            ],
          });
        }
      });
    },

    /* top50弹框显示 */
    top50DialogVisibleShow() {
      this.top50DialogVisible = true;
    },
    top50Open() {
      this.$nextTick(() => {
        this.top50Dialog();
      });
    },

    /* 各专业不同届别成绩对比 */
    differentDialogVisibleShow() {
      this.differentDialogVisible = true;
    },
    differentOpen() {
      this.$nextTick(() => {
        this.differentDialog();
      });
    },

    /* 年度成绩对比弹框显示 */
    yearDialogVisibleShow() {
      this.yearDialogVisible = true;
    },
    yearOpen() {
      this.$nextTick(() => {
        this.yearDialog();
      });
    },

    /* 计算专业部分 */
    getMajorUnits(number) {
      if (number <= 0) {
        this.majorUnits = null;
      } else {
        this.majorUnits = number % 10;
      }
    },
    getMajorTens(number) {
      if (number <= 9) {
        this.majorTens = null;
      } else {
        this.majorTens = parseInt(number / 10) % 10;
      }
    },
    getMajorHundreds(number) {
      if (number <= 99) {
        this.majorHundreds = null;
      } else {
        this.majorHundreds = parseInt(number / 100) % 10;
      }
    },
    getMajorThousands(number) {
      if (number <= 999) {
        this.majorThousands = null;
      } else {
        this.majorThousands = (parseInt(number / 1000) % 100) % 10;
      }
    },
    /* 计算班级部分 */
    getClassUnits(number) {
      if (number <= 0) {
        this.classUnits = null;
      } else {
        this.classUnits = number % 10;
      }
    },
    getClassTens(number) {
      if (number <= 9) {
        this.classTens = null;
      } else {
        this.classTens = parseInt(number / 10) % 10;
      }
    },
    getClassHundreds(number) {
      if (number <= 99) {
        this.classHundreds = null;
      } else {
        this.classHundreds = parseInt(number / 100) % 10;
      }
    },
    getClassThousands(number) {
      if (number <= 999) {
        this.classThousands = null;
      } else {
        this.classThousands = (parseInt(number / 1000) % 100) % 10;
      }
    },
    /* 计算学生部分 */
    getStudentUnits(number) {
      if (number <= 0) {
        this.studentUnits = null;
      } else {
        this.studentUnits = number % 10;
      }
    },
    getStudentTens(number) {
      if (number <= 9) {
        this.studentTens = null;
      } else {
        this.studentTens = parseInt(number / 10) % 10;
      }
    },
    getStudentHundreds(number) {
      if (number <= 99) {
        this.studentHundreds = null;
      } else {
        this.studentHundreds = parseInt(number / 100) % 10;
      }
    },
    getStudentThousands(number) {
      if (number <= 999) {
        this.studentThousands = null;
      } else {
        this.studentThousands = (parseInt(number / 1000) % 100) % 10;
      }
    },
    /* 计算教师部分 */
    getTeacherUnits(number) {
      if (number <= 0) {
        this.teacherUnits = null;
      } else {
        this.teacherUnits = number % 10;
      }
    },
    getTeacherTens(number) {
      if (number <= 9) {
        this.teacherTens = null;
      } else {
        this.teacherTens = parseInt(number / 10) % 10;
      }
    },
    getTeacherHundreds(number) {
      if (number <= 99) {
        this.teacherHundreds = null;
      } else {
        this.teacherHundreds = parseInt(number / 100) % 10;
      }
    },
    getTeacherThousands(number) {
      if (number <= 999) {
        this.teacherThousands = null;
      } else {
        this.teacherThousands = (parseInt(number / 1000) % 100) % 10;
      }
    },
  },
};
</script>
<style lang="less" scoped>
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
/deep/.el-scrollbar__bar.is-horizontal > div {
  display: none;
}
.wrapper {
  .notice {
    height: 44px;
    display: flex;
    align-items: center;
    background: rgba(255, 103, 96, 0.06);
    border: 1px solid rgba(255, 103, 96, 0.2784313725490196);
    opacity: 1;
    border-radius: 4px;
    margin: 20px;
    padding: 18px;
    box-sizing: border-box;

    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #ff4044;
  }
  .main-card {
    margin: 20px;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search-left {
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
      .search-right {
        display: flex;
        .major-box {
          display: flex;
          align-items: flex-end;
          .a-box1,
          .a-box2,
          .a-box3,
          .a-box4 {
            width: 26px;
            height: 32px;
            background: #122073;
            opacity: 1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: "Chalet NewYorkNineteenSixty";
            font-weight: 400;
            color: #ffffff;
            margin-right: 4px;
          }
          .a-box5 {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
        .class-box {
          display: flex;
          align-items: flex-end;
          margin-left: 36px;
          .b-box1,
          .b-box2,
          .b-box3,
          .b-box4 {
            width: 26px;
            height: 32px;
            background: #122073;
            opacity: 1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: "Chalet NewYorkNineteenSixty";
            font-weight: 400;
            color: #ffffff;
            margin-right: 4px;
          }
          .b-box5 {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
        .student-box {
          display: flex;
          align-items: flex-end;
          margin-left: 36px;
          .c-box1,
          .c-box2,
          .c-box3,
          .c-box4 {
            width: 26px;
            height: 32px;
            background: #122073;
            opacity: 1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: "Chalet NewYorkNineteenSixty";
            font-weight: 400;
            color: #ffffff;
            margin-right: 4px;
          }
          .c-box5 {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
        .teacher-box {
          display: flex;
          align-items: flex-end;
          margin-left: 36px;
          .d-box1,
          .d-box2,
          .d-box3,
          .d-box4 {
            width: 26px;
            height: 32px;
            background: #122073;
            opacity: 1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: "Chalet NewYorkNineteenSixty";
            font-weight: 400;
            color: #ffffff;
            margin-right: 4px;
          }
          .d-box5 {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
      }
    }
    .content {
      margin: 20px;
      .top {
        display: flex;
        justify-content: space-between;
        .box {
          width: 205px;
          height: 183px;
          background-image: url("../../../assets/image/蒙版组 1000.png");
          background-repeat: no-repeat;
          .peopleNum {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-left: 30px;
            margin-top: 50px;
            span {
              font-size: 46px;
              font-family: "Chalet NewYorkNineteenSixty";
              font-weight: 400;
              color: #122073;
              opacity: 1;
            }
          }
          .title {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-left: 30px;
            margin-top: 18px;
          }
        }
        .box-release {
          position: relative;
          width: 417px;
          height: 197px;
          background-image: url("../../../assets/image/组 2027.png");
          background-repeat: no-repeat;
          div {
            position: absolute;
            font-size: 24px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #5864ff;
            opacity: 1;
            left: 60%;
            top: 20%;
          }
          img {
            position: absolute;
            left: 60%;
            top: 42%;
            cursor: pointer;
          }
        }
      }
      .bottom {
        // background: orange;
        height: calc(100vh - 420px);
        display: flex;
        justify-content: space-between;
        .bottom-left {
          width: 450px;
          height: 100%;
          .f-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            :nth-child(1) {
              font-size: 18px;
              font-family: "PingFang SC";
              font-weight: 800;
              color: #122073;
              opacity: 1;
            }
            :nth-child(2) {
              letter-spacing: 6px;
              color: #838bb7;
              font-size: 48px;
              cursor: pointer;
            }
          }
          .f-content {
            height: calc(100% - 30px);
            overflow: auto;
            margin-top: 5px;
          }
        }
        .bottom-middle {
          width: 450px;
          height: 100%;
          .t-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            :nth-child(1) {
              font-size: 18px;
              font-family: "PingFang SC";
              font-weight: 800;
              color: #122073;
              opacity: 1;
            }
            :nth-child(2) {
              letter-spacing: 6px;
              color: #838bb7;
              font-size: 48px;
              cursor: pointer;
            }
          }
          .t-content {
            height: calc(100% - 30px);
            overflow: auto;
            margin-top: 5px;
          }
        }
        .bottom-right {
          width: 450px;
          height: 100%;
          .k-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            :nth-child(1) {
              font-size: 18px;
              font-family: "PingFang SC";
              font-weight: 800;
              color: #122073;
              opacity: 1;
            }
            :nth-child(2) {
              letter-spacing: 6px;
              color: #838bb7;
              font-size: 48px;
              cursor: pointer;
            }
          }
          .k-content {
            height: calc(100% - 30px);
            overflow: auto;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .add-dialog {
    .parent,
    .main-text {
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
  .el-button--default {
    width: 150px;
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
    width: 150px;
    height: 42px;
    background: #5864ff;
    opacity: 1;
    border-radius: 4px;
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #ffffff;
  }
  .checkContent {
    height: 500px;
    overflow: auto;

    .main-box {
      .box {
        width: 163px;
        height: 133px;
        // margin-right: 10px;
        .peopleNum {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          margin-left: 30px;
          margin-top: 20px;
          span {
            font-size: 46px;
            font-family: "Chalet NewYorkNineteenSixty";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
        }
        .title {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          margin-left: 30px;
          margin-top: 18px;
        }
      }
    }
  }
  .checkContent::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    height: 100px;
  }
  .checkContent::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 9px;
    background: #e3e4ee;
  }
  .checkContent::-webkit-scrollbar-track {
    /*滚动条里面轨道背景*/
    border-radius: 10px;
  }
}
</style>