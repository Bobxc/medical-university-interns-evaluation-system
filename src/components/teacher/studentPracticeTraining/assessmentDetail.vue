<template>
  <div class="container">
    <el-card class="assessment-detail-title-card">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item>一级菜单</el-breadcrumb-item>
        <el-breadcrumb-item>二级菜单</el-breadcrumb-item>
        <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="assessment-detail-title">临床实习出科评定</div>
      <div class="assessment-detail-content">
        <span>学生姓名：{{ studentInfoData.stuname }}</span>
        <span>学号：{{ studentInfoData.stuxh }}</span>
        <span>级数：{{ studentInfoData.stuyear }}</span>
        <span>专业：{{ studentInfoData.stuzy }}</span>
        <span>班级：{{ studentInfoData.stubj }}</span>
        <span
          >实习科室：{{
            studentInfoData.f_xks
              ? studentInfoData.f_xks
              : studentInfoData.ksname
          }}</span
        >
        <span style="color: #5864ff; cursor: pointer" @click="toStudentDetail"
          >查看更多 ></span
        >
      </div>
    </el-card>
    <div class="main-card">
      <!-- 考勤情况 -->
      <el-card class="attendance">
        <el-row>
          <div></div>
          <span>考勤情况</span>
        </el-row>
        <div class="attendance-content">
          <div>
            <!-- <span>实习时间：</span><span>2020年01月12日至2020年10月12日</span> -->
            <span>实习时间：</span><span>{{ F_Stime }}至{{ F_Etime }}</span>
          </div>
          <div>
            <span>应实习天数：</span><span>{{ KhMainData.F_Daysx }}天</span>
          </div>
          <div>
            <span>实际实习天数：</span><span>{{ KhMainData.F_Daysjsx }}天</span>
          </div>
          <div>
            <span>病假：</span><span>{{ KhMainData.F_Daybj }}天</span>
          </div>
          <div>
            <span>事假：</span><span>{{ KhMainData.F_Daysj }}天</span>
          </div>
          <div>
            <span>旷假：</span><span>{{ KhMainData.F_Daykj }}天</span>
          </div>
        </div>
      </el-card>
      <!-- 平时成绩 -->
      <el-card class="usual-grades-detail-container-card">
        <div class="detail-item">
          <el-row class="title-row">
            <div></div>
            <span>平时成绩</span>
          </el-row>
          <div
            v-for="(item, index) in dataList"
            :key="index"
            style="margin-bottom: 15px"
          >
            <el-row class="header-row">
              <el-col :span="4" class="title-col">
                <img src="@/assets/image/组 1270.png" alt="" />
                <span>{{ item.title }}</span>
              </el-col>
              <el-col :span="20">
                <el-row style="padding-left: 36px">
                  <el-col
                    :span="10"
                    class="fraction-col"
                    style="transform: translateX(-18px)"
                    >要求</el-col
                  >
                  <el-col :span="7" class="fraction-col">分数</el-col>
                  <el-col :span="7" class="description-col">说明</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row
              class="body-row"
              v-for="(item_, index) in item.nameList"
              :key="index"
            >
              <el-col :span="4" class="h-col"> {{ item_.nName }} </el-col>
              <el-col :span="20" class="b-col">
                <el-row
                  class="b-row"
                  v-for="(item__, index) in item_.nTitleList"
                  :key="index"
                >
                  <el-col :span="10">{{ item__.nTitle }}</el-col>
                  <el-col class="radio-col" :span="7">
                    {{ item__.numVal }}
                  </el-col>
                  <el-col class="input-col" :span="7">
                    {{ item__.descriptionVal }}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row class="total-row">
          <el-col :span="4" class="total-text-col">
            <div>合计（平时成绩）</div>
          </el-col>
          <el-col :span="20">
            <el-row
              style="
                padding-left: 36px;
                height: 100%;
                display: flex;
                align-items: center;
              "
            >
              <el-col :span="10" style="visibility: hidden">.</el-col>
              <el-col :span="14" class="num-col"
                >{{ KhMainData.F_totalNumb }}分</el-col
              >
              <!-- <el-col :span="7" class="last-col">-</el-col> -->
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <!-- 出科总成绩 -->
      <el-card class="total-grades">
        <el-row class="first-row">
          <div></div>
          <span>出科总成绩</span>
        </el-row>
        <el-row class="second-row">
          <el-col :span="6">理论成绩（占30%）</el-col>
          <el-col :span="6">操作成绩（占30%）</el-col>
          <el-col :span="6">平时成绩（占40%）</el-col>
          <el-col :span="6">总评</el-col>
        </el-row>
        <el-row class="third-row">
          <el-col
            :span="6"
            style="border-right: 1px solid rgba(18, 32, 115, 0.07)"
            >{{ KhMainData.llnumb }}分</el-col
          >
          <el-col
            :span="6"
            style="border-right: 1px solid rgba(18, 32, 115, 0.07)"
            >{{ KhMainData.cznumb }}分</el-col
          >
          <el-col
            :span="6"
            style="border-right: 1px solid rgba(18, 32, 115, 0.07)"
            >{{ KhMainData.psnumb }}分</el-col
          >
          <el-col :span="6" style="color: #16d090; font-weight: 800"
            >{{ KhMainData.zpnumb }}分</el-col
          >
        </el-row>
      </el-card>
      <!-- 反馈给管理人员的相关问题 -->
      <el-card class="feedback-question-card">
        <el-row class="feedback-question-title">
          <div></div>
          <span>反馈给管理人员的相关问题</span>
        </el-row>

        <el-row class="feedback-question-content">
          <div>
            {{ KhMainData.F_glContent }}
          </div>
        </el-row>
      </el-card>
      <!-- 对学生反思日记的点评 -->
      <el-card class="student-diary-card">
        <el-row class="student-diary-title">
          <div></div>
          <span>对学生反思日记的点评</span>
        </el-row>
        <el-row class="student-diary">
          <span>学生反思日记：</span>
          <span>{{ f_diary }}</span>
          <div class="triangle"></div>
        </el-row>
        <el-row class="student-diary-content">
          <div>
            {{ KhMainData.F_jyContent }}
          </div>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { timeFormatSeconds } from "utils/timeFormatSeconds";
import {
  getCheckData,
  getJyInfo,
  getPjStudentData,
} from "api/teacher-api/studentPracticeTraining";
export default {
  name: "AssessmentDetail",
  data() {
    return {
      f_id: "",
      F_Stime: "",
      F_Etime: "",
      f_diary: "",
      studentInfoData: {},
      KhListData: [],
      KhMainData: {},
      dataList: [
        {
          title: "思想素质",
          nameList: [
            {
              nName: "专业思想",
              nTitleList: [
                {
                  numId: "num1",
                  desId: "text1",
                  nTitle: "专业思想稳定，责任心强，工作认真负责",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "个人修养(语言、行为)",
              nTitleList: [
                {
                  numId: "num2",
                  desId: "text2",
                  nTitle: "语言文明，关心尊重病人，态度和蔼可亲",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "人际沟通",
              nTitleList: [
                {
                  numId: "num3",
                  desId: "text3",
                  nTitle: "行为文明，仪表大方，举止端庄，穿着整洁",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "学习态度",
              nTitleList: [
                {
                  numId: "num4",
                  desId: "text4",
                  nTitle: "虚心好学，学习主动、积极、专研",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "劳动纪律",
              nTitleList: [
                {
                  numId: "num5",
                  desId: "text5",
                  nTitle: "服从实习安排，无迟到、早退，按规定请假",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
          ],
        },
        {
          title: "能力",
          nameList: [
            {
              nName: "观察能力",
              nTitleList: [
                {
                  numId: "num6",
                  desId: "text6",
                  nTitle: "著虐观察病情、及时发现问题",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },

            {
              nName: "分析能力",
              nTitleList: [
                {
                  numId: "num7",
                  desId: "text7",
                  nTitle: "独立、正确地分析、判断病情变化",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },

            {
              nName: "学习能力",
              nTitleList: [
                {
                  numId: "num8",
                  desId: "text8",
                  nTitle: "能及时提出问题，并查阅有关资料指导实践",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },

            {
              nName: "适应能力",
              nTitleList: [
                {
                  numId: "num9",
                  desId: "text9",
                  nTitle: "能较快适应工作环境，较快地进入工作角色",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },

            {
              nName: "表达能力",
              nTitleList: [
                {
                  numId: "num10",
                  desId: "text10",
                  nTitle: "理解力：能正确理解医嘱、教师指导等",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num11",
                  desId: "text11",
                  nTitle: "语言表达：准确明了、及时、完整",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num12",
                  desId: "text12",
                  nTitle: "书写：病案书写正确、及时、完整",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num13",
                  desId: "text13",
                  nTitle: "较好地进行健康指导",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },

            {
              nName: "基础操作",
              nTitleList: [
                {
                  numId: "num14",
                  desId: "text14",
                  nTitle: "积极、主动参与基础技能操作能力",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },

            {
              nName: "专科操作",
              nTitleList: [
                {
                  numId: "num15",
                  desId: "text15",
                  nTitle: "积极、主动参与专科技能操作能力",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
          ],
        },

        {
          title: "教学活动",
          nameList: [
            {
              nName: "小讲课",
              nTitleList: [
                {
                  numId: "num16",
                  desId: "text16",
                  nTitle: "积极、按时参加，积极提问",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "大 课",
              nTitleList: [
                {
                  numId: "num17",
                  desId: "text17",
                  nTitle: "按时参加，认证听讲",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "教学查房",
              nTitleList: [
                {
                  numId: "num18",
                  desId: "text18",
                  nTitle: "积极、按时参加，准备充足",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "病例讨论",
              nTitleList: [
                {
                  numId: "num19",
                  desId: "text19",
                  nTitle: "按要求参加，认证听讲病例分析",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
          ],
        },
        {
          title: "其他",
          nameList: [
            {
              nName: "参加其他活动情况",
              nTitleList: [
                {
                  numId: "num20",
                  desId: "text20",
                  nTitle: "参与其他实习相关活动情况的态度、参与程度、 取得效果",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    this.f_id = this.$route.query.f_id;
    console.log(this.f_id);
    this.studentInfo();
    this.jyInfo();
    this.checkData();
  },
  methods: {
    /* 获取学生信息 */
    studentInfo() {
      let params = {
        keyValue: this.f_id,
      };
      getPjStudentData(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.studentInfoData = res.data[0];
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* 获取学生反思日记 */
    jyInfo() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
        keyValue: this.f_id,
      };
      getJyInfo(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          if (res.data.length !== 0) {
            this.f_diary = res.data[0].f_diary;
          } else {
            this.f_diary = "暂无书写";
          }
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* 获取表格信息 */
    checkData() {
      let params = {
        keyValue: this.f_id,
      };
      getCheckData(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.KhMainData = res.data.KhMainData;
          this.KhListData = res.data.KhListData;
          this.F_Stime = timeFormatSeconds(0, this.KhMainData.F_Stime);
          this.F_Etime = timeFormatSeconds(0, this.KhMainData.F_Etime);
          this.dataList = this.dataList.map((item) => ({
            ...item,
            nameList: item.nameList.map((sub) => ({
              ...sub,
              nTitleList: sub.nTitleList.map((val) => ({
                ...val,
                numVal: this.KhListData.find(
                  (dep) => dep.F_itemName == val.numId
                ).F_itemValue,
                descriptionVal: this.KhListData.find(
                  (dep) => dep.F_itemName == val.desId
                ).F_itemValue,
              })),
            })),
          }));
          console.log(this.dataList);
        } else {
          this.$message({
            message: "请求失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* to学生信息详情 */
    toStudentDetail() {
      this.$router.push({
        path: "/teacher/studentdetail",
        query: {
          f_suserid: this.studentInfoData.f_suserid,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  .assessment-detail-title-card {
    height: 147px;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
    /deep/.el-card__body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /deep/.el-breadcrumb {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
    }
    /deep/.el-breadcrumb__inner {
      color: #122073;
    }
    .assessment-detail-title {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .assessment-detail-content {
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
  .main-card {
    height: calc(100vh - 278px);
    overflow: auto;
    margin: 20px;
    box-sizing: border-box;
    .attendance {
      height: 183px;
      margin-bottom: 14px;
      .el-row {
        height: 49px;
        display: flex;
        align-items: center;
        padding: 0 25px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        margin-bottom: 15px;
        :nth-child(1) {
          width: 5px;
          height: 19px;
          background: #5864ff;
          opacity: 1;
          margin-right: 10px;
        }
        :nth-child(2) {
          height: 25px;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 800;
          line-height: 25px;
          color: #122073;
          opacity: 1;
        }
      }
      .attendance-content {
        display: flex;
        margin-top: 50px;
        padding: 0 25px;
        box-sizing: border-box;
        div {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          margin-right: 64px;
        }
      }
    }
    .usual-grades-detail-container-card {
      overflow: auto;
      box-sizing: border-box;
      margin-bottom: 14px;
      .detail-item {
        .title-row {
          height: 49px;
          display: flex;
          align-items: center;
          padding: 0 25px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          margin-bottom: 15px;
          :nth-child(1) {
            width: 5px;
            height: 19px;
            background: #5864ff;
            opacity: 1;
            margin-right: 10px;
          }
          :nth-child(2) {
            height: 25px;
            font-size: 18px;
            font-family: "PingFang SC";
            font-weight: 800;
            line-height: 25px;
            color: #122073;
            opacity: 1;
          }
        }
        .header-row {
          width: 80%;
          height: 46px;
          display: flex;
          align-items: center;
          background: #5864ff;
          opacity: 1;
          border-radius: 6px 6px 0px 0px;
          margin: 0 25px;
          .title-col {
            display: flex;
            align-items: center;
            padding-left: 27px;
            img {
              width: 13px;
              height: 16px;
              margin-right: 10px;
            }
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: bold;
              color: #ffffff;
              opacity: 1;
            }
          }
          .fraction-col,
          .description-col {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #ffffff;
            opacity: 1;
          }
        }
        .body-row {
          width: 80%;
          display: flex;
          align-items: center;
          margin: 0 25px;
          // border: 1px solid rgba(18, 32, 115, 0.04);
          background: rgba(88, 100, 255, 0.04);
          .h-col {
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 46px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
          }
          .b-col {
            .b-row {
              height: 51px;
              display: flex;
              align-items: center;
              padding-left: 36px;
              border: 1px solid rgba(18, 32, 115, 0.05);
              box-sizing: border-box;
              border-top: none;
              border-right: none;
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #122073;
              opacity: 1;
              .el-col {
                height: 100%;
                display: flex;
                align-items: center;
              }
              .radio-col {
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(88, 100, 255, 0.04);
              }
              .input-col {
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
      .total-row {
        margin-left: 25px;
        width: 80%;
        height: 54px;
        display: flex;
        background: rgba(88, 100, 255, 0.04);
        margin-bottom: 38px;
        .total-text-col {
          display: flex;
          align-items: center;
          div {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
            transform: translateX(240px);
          }
        }
        .num-col {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 800;
          color: #16d090;
          opacity: 1;
          background: rgba(88, 100, 255, 0.04);
        }
        .last-col {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
        }
      }
    }
    .total-grades {
      height: 211px;
      margin-bottom: 14px;
      .first-row {
        height: 49px;
        display: flex;
        align-items: center;
        padding: 0 25px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        margin-bottom: 15px;
        :nth-child(1) {
          width: 5px;
          height: 19px;
          background: #5864ff;
          opacity: 1;
          margin-right: 10px;
        }
        :nth-child(2) {
          height: 25px;
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 800;
          line-height: 25px;
          color: #122073;
          opacity: 1;
        }
      }
      .second-row {
        width: 80%;
        height: 46px;
        background: #5864ff;
        opacity: 1;
        border-radius: 6px 6px 0px 0px;
        margin: 0 25px;
        .el-col {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .third-row {
        width: 80%;
        height: 72px;
        margin: 0 25px;
        background: rgba(88, 100, 255, 0.04);
        .el-col {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
        }
      }
    }
    .feedback-question-card {
      height: 250px;
      margin-bottom: 14px;
      .feedback-question-title {
        height: 50px;
        display: flex;
        padding-left: 25px;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        :nth-child(1) {
          width: 5px;
          height: 19px;
          background: #5864ff;
          opacity: 1;
          margin-right: 10px;
        }
        :nth-child(2) {
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 800;
          color: #122073;
          opacity: 1;
        }
      }
      .feedback-question-content {
        width: 90%;
        // padding-left: 25px;
        margin-left: 25px;
        box-sizing: border-box;
        div {
          width: 100%;
          height: 132px;
          background: #ffffff;
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
          opacity: 1;
          border-radius: 6px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          margin-top: 20px;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }
    .student-diary-card {
      // height: 480px;
      // margin-bottom: 80px;
      .student-diary-title {
        height: 50px;
        display: flex;
        padding-left: 25px;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        :nth-child(1) {
          width: 5px;
          height: 19px;
          background: #5864ff;
          opacity: 1;
          margin-right: 10px;
        }
        :nth-child(2) {
          font-size: 18px;
          font-family: "PingFang SC";
          font-weight: 800;
          color: #122073;
          opacity: 1;
        }
      }
      .student-diary {
        width: 90%;
        padding: 25px 30px;
        box-sizing: border-box;
        // height: 127px;
        // padding: 27px 30px;
        margin: 35px 0px 13px 25px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: rgba(88, 100, 255, 0.04);
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 800;
        color: #5864ff;
        opacity: 1;
        .triangle {
          display: block;
          height: 0px;
          width: 0px;
          border: 10px solid transparent;
          border-top-color: rgba(88, 100, 255, 0.04);
          background: none;
          position: absolute;
          bottom: -20px;
          left: calc(10% - 10px);
        }
      }
      .student-diary-content {
        width: 90%;
        height: 152px;
        background: #ffffff;
        border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        opacity: 1;
        border-radius: 6px;
        margin-left: 25px;
        padding: 20px;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
      }
    }
  }
}
</style>