<template>
  <div class="container" v-loading="loading">
    <el-card class="assessment-edit-title-card">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/evateach' }"
          >一级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/evateach/edit' }"
          >二级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="assessment-edit-title">临床实习出科评定</div>
      <div class="assessment-edit-content">
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
        <span style="color: #5864ff; cursor: pointer" @click="toStudentDetail">查看更多 ></span>
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
          <!-- 实习时间 -->
          <div class="practice-time">
            <div
              style="
                width: 140px;
                font-size: 16px;
                font-weight: 400;
                color: #122073;
              "
            >
              实习时间：
            </div>
            <el-date-picker
              style="width: 70%"
              v-model="startVal"
              type="date"
              :clearable="false"
              placeholder="选择日期"
            >
            </el-date-picker>
            <div
              style="
                font-size: 16px;
                font-weight: 900;
                color: #122073;
                margin: 0px 10px;
              "
            >
              -
            </div>
            <el-date-picker
              style="width: 70%"
              v-model="endVal"
              type="date"
              :clearable="false"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <!-- 应实习天数 -->
          <div class="practice-day">
            <div
              style="
                width: 100px;
                font-size: 16px;
                font-weight: 400;
                color: #122073;
              "
            >
              应实习天数：
            </div>
            <div class="num-input">
              <el-input
                placeholder="请输入"
                v-model="practiceDayVal"
                type="number" 
                oninput="if(value<0)value=0"
              ></el-input>
              <div class="num-add" @click="practiceDayVal++" style="cursor: pointer">
                <img src="@/assets/image/组 2030.png" alt="" />
              </div>
              <div class="num-subtract" @click="practiceSub" style="cursor: pointer">
                <img src="@/assets/image/组 2031.png" alt="" />
              </div>
            </div>
            <div
              style="
                font-size: 16px;
                font-weight: 400;
                color: #122073;
                margin-left: 6px;
              "
            >
              天
            </div>
          </div>
          <!-- 实际实习天数 -->
          <div class="actual-practice-day">
            <div
              style="
                width: 120px;
                font-size: 16px;
                font-weight: 400;
                color: #122073;
              "
            >
              实际实习天数：
            </div>
            <div class="actual-num-input">
              <el-input
                placeholder="请输入"
                v-model="actulPracticeDayVal"
                type="number"
                oninput="if(value<0)value=0"
              ></el-input>
              <div class="actual-num-add" @click="actulPracticeDayVal++" style="cursor: pointer">
                <img src="@/assets/image/组 2030.png" alt="" />
              </div>
              <div class="actual-num-subtract" @click="actulPracSub" style="cursor: pointer">
                <img src="@/assets/image/组 2031.png" alt="" />
              </div>
            </div>
            <div
              style="
                font-size: 16px;
                font-weight: 400;
                color: #122073;
                margin-left: 6px;
              "
            >
              天
            </div>
          </div>
          <!-- 病假 -->
          <div class="sick-leave">
            <div
              style="
                width: 50px;
                font-size: 16px;
                font-weight: 400;
                color: #122073;
              "
            >
              病假：
            </div>
            <div class="sick-leave-input">
              <el-input
                placeholder="请输入"
                v-model="sickLeaveVal"
                type="number"
                oninput="if(value<0)value=0"
              ></el-input>
              <div class="sick-leave-add" @click="sickLeaveVal++" style="cursor: pointer">
                <img src="@/assets/image/组 2030.png" alt="" />
              </div>
              <div class="sick-leave-subtract" @click="sickLeaveSub" style="cursor: pointer">
                <img src="@/assets/image/组 2031.png" alt="" />
              </div>
            </div>
            <div
              style="
                font-size: 16px;
                font-weight: 400;
                color: #122073;
                margin-left: 6px;
              "
            >
              天
            </div>
          </div>
          <!-- 事假 -->
          <div class="personal-leave">
            <div
              style="
                width: 50px;
                font-size: 16px;
                font-weight: 400;
                color: #122073;
              "
            >
              事假：
            </div>
            <div class="personal-leave-input">
              <el-input
                placeholder="请输入"
                v-model="personalLeaveVal"
                type="number"
                oninput="if(value<0)value=0"
              ></el-input>
              <div class="personal-leave-add" @click="personalLeaveVal++" style="cursor: pointer">
                <img src="@/assets/image/组 2030.png" alt="" />
              </div>
              <div class="personal-leave-subtract" @click="personalLeaveSub" style="cursor: pointer">
                <img src="@/assets/image/组 2031.png" alt="" />
              </div>
            </div>
            <div
              style="
                font-size: 16px;
                font-weight: 400;
                color: #122073;
                margin-left: 6px;
              "
            >
              天
            </div>
          </div>
          <!-- 旷假 -->
          <div class="absenteeism">
            <div
              style="
                width: 50px;
                font-size: 16px;
                font-weight: 400;
                color: #122073;
              "
            >
              旷假：
            </div>
            <div class="absenteeism-input">
              <el-input
                placeholder="请输入"
                v-model="absenteeismVal"
                type="number"
                oninput="if(value<0)value=0"
              ></el-input>
              <div class="absenteeism-add" @click="absenteeismVal++" style="cursor: pointer">
                <img src="@/assets/image/组 2030.png" alt="" />
              </div>
              <div class="absenteeism-subtract" @click="absenteeismSub" style="cursor: pointer">
                <img src="@/assets/image/组 2031.png" alt="" />
              </div>
            </div>
            <div
              style="
                font-size: 16px;
                font-weight: 400;
                color: #122073;
                margin-left: 6px;
              "
            >
              天
            </div>
          </div>
        </div>
      </el-card>
      <!-- 平时成绩 -->
      <el-card class="usual-grades-card">
      <div class="edit-item">
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
            <el-col :span="10" class="title-col">
              <img src="@/assets/image/组 1270.png" alt="" />
              <span>{{ item.title }}</span>
            </el-col>
            <el-col :span="10" class="fraction-col">
              <span>5分</span>
              <span>4分</span>
              <span>3分</span>
              <span>2分</span>
              <span>1分</span>
            </el-col>
            <el-col :span="4" class="description-col">
              <span>说明</span>
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
                <el-col :span="7">{{ item__.nTitle }}</el-col>
                <el-col class="radio-col" :span="12">
                  <el-radio-group v-model="item__.numVal">
                    <el-radio :label="5"></el-radio>
                    <el-radio :label="4"></el-radio>
                    <el-radio :label="3"></el-radio>
                    <el-radio :label="2"></el-radio>
                    <el-radio :label="1"></el-radio>
                  </el-radio-group>
                </el-col>
                <el-col class="input-col" :span="5">
                  <el-input
                    placeholder="请输入"
                    v-model="item__.descriptionVal"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row class="total-row">
        <div>合计（平时成绩）</div>
        <div>{{totalNum}}分</div>
        <!-- <div><input placeholder="请输入" v-model="totalContent"></input></div> -->
      </el-row>
      </el-card>
      <!-- 出科总成绩 -->
      <el-card class="total-grades">
        <el-row class="first-row">
          <div></div>
          <span>出科总成绩</span>
        </el-row>
        <el-row class="second-row">
          <el-col :span="5">理论成绩（占30%）</el-col>
          <el-col :span="5">操作成绩（占30%）</el-col>
          <el-col :span="5">平时成绩（占40%）</el-col>
          <el-col :span="9">总评</el-col>
        </el-row>
        <el-row class="third-row">
          <el-col :span="5" style="border-right: 1px solid rgba(18,32,115,0.07)">
            <input placeholder="请输入" v-model="llcj" type="number" oninput="if(value>100)value=30;if(value<0)value=0"></input>
          </el-col>
          <el-col :span="5" style="border-right: 1px solid rgba(18,32,115,0.07)"><input placeholder="请输入" v-model="czcj" type="number" oninput="if(value>100)value=30;if(value<0)value=0"></input></el-col>
          <el-col :span="5" style="border-right: 1px solid rgba(18,32,115,0.07)"><input placeholder="请输入" v-model="pscj" type="number" oninput="if(value>100)value=30;if(value<0)value=0"></input></el-col>
          <el-col :span="9">{{zpcj}}</el-col>
        </el-row>
      </el-card>
      <!-- 反馈给管理人员的相关信息 -->
      <el-card class="feedback-question-card">
      <el-row class="feedback-question-title">
        <div></div>
        <span>反馈给管理人员的相关问题</span>
      </el-row>
      <!-- <el-row class="feedback-question-content">
          <div class="feedback-question-description">是否有需要反馈的相关问题：</div>
          <el-radio-group v-model="radio">
            <el-radio :label="3">是</el-radio>
            <el-radio :label="6">否</el-radio>
          </el-radio-group>
      </el-row> -->
      <el-row  class="feedback-question-textipt">
       <el-input type="textarea" :rows="5" placeholder="请输入相关问题，字数不限" v-model="glContent"></el-input>
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
          <span>{{diray}}</span>
          <div class="triangle"></div>
        </el-row>
        <el-row  class="student-diary-textipt">
          <el-input id="el-textarea" placeholder="请输入建议，字数不限" type="textarea" :rows="9"  v-model="jyContent"></el-input>
        </el-row>
      </el-card>
    </div>
    <el-row class="footer-row">
      <div class="cancel" @click="$router.go(-1)">取消</div>
      <div class="save" @click="submit">保存</div>
    </el-row>
  </div>
</template>
<script>
import {
  getPjStudentData,
  getJyInfo,
  postAddCheckData,
} from "api/teacher-api/studentPracticeTraining";
import { timeFormatSeconds } from "utils/timeFormatSeconds";
export default {
  name: "AssessmentEdit",
  data() {
    return {
      loading: false,
      f_id: "",
      startVal: "",
      endVal: "",
      diray: "",
      practiceDayVal: "",
      actulPracticeDayVal: "",
      sickLeaveVal: "",
      personalLeaveVal: "",
      absenteeismVal: "",
      // totalContent: "",
      glContent: "",
      jyContent: "",
      llcj: "",
      czcj: "",
      pscj: "",
      // zpcj: "",
      // totalNum: "",
      studentInfoData: {},
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
    this.studentDiray();
  },
  computed: {
    totalNum() {
      let arr = [];
      this.dataList.map((item) =>
        item.nameList.map((sub) => sub.nTitleList.map((val) => arr.push(val)))
      );
      return this.sum(arr);
    },
    zpcj() {
      return (this.llcj * 0.3 + this.czcj * 0.3 + this.pscj * 0.4).toFixed(2);
    },
  },
  methods: {
    /* 获取学生信息 */
    studentInfo() {
      this.loading = true;
      let params = {
        keyValue: this.f_id,
      };
      getPjStudentData(params).then((res) => {
        this.loading = false;
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
    studentDiray() {
      let params = {
        userid: window.sessionStorage.getItem("userid"),
        keyValue: this.f_id,
      };
      getJyInfo(params).then((res) => {
        if (res.code == 100) {
          console.log(res);
          if (res.data.length !== 0) {
            this.diray = res.data[0].f_diary;
          } else {
            this.diray = "暂无书写";
          }
        } else {
          this.$message({
            message: "获取学生反思日记失败！",
            type: "error",
            center: true,
          });
        }
      });
    },
    /* 计算分数总和 */
    sum(arr) {
      let res = 0;
      for (let i = 0; i < arr.length; i++) {
        res += Number(arr[i].numVal);
      }
      return res;
    },
    /* 提交信息 */
    submit() {
      let data = {
        keyValue: "",
        DataId: this.f_id,
        postData: {
          json: [
            {
              F_ITEMNAME: "num1", //打分输入框id
              F_itemValue: "", //打分输入框输入值
            },
            {
              F_ITEMNAME: "text1", //说明输入框id
              F_itemValue: "", //说明输入框输入值
            },
            {
              F_ITEMNAME: "num2",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text2",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num3",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text3",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num4",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text4",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num5",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text5",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num6",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text6",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num7",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text7",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num8",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text8",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num9",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text9",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num10",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text10",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num11",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text11",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num12",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text12",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num13",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text13",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num14",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text14",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num15",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text15",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num16",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text16",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num17",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text17",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num18",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text18",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num19",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text19",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "num20",
              F_itemValue: "",
            },
            {
              F_ITEMNAME: "text20",
              F_itemValue: "",
            },
          ],
          khdata: {
            F_Daybj: this.sickLeaveVal,
            F_Daykj: this.absenteeismVal,
            F_Daysj: this.personalLeaveVal,
            F_Daysjsx: this.actulPracticeDayVal,
            F_Daysx: this.practiceDayVal,
            F_Stime:
              this.startVal == "" ? "" : timeFormatSeconds(0, this.startVal),
            F_Etime: this.endVal == "" ? "" : timeFormatSeconds(0, this.endVal),
            F_PjId: this.f_id,
            F_glContent: this.glContent,
            F_jyContent: this.jyContent,
            F_totalNumb: this.totalNum,
            cznumb: this.czcj,
            llnumb: this.llcj,
            psnumb: this.pscj,
            zpnumb: this.zpcj,
          },
        },
      };

      let arr = [];
      this.dataList.map((item) =>
        item.nameList.map((sub) => sub.nTitleList.map((val) => arr.push(val)))
      );
      data.postData.json = data.postData.json.map((item) => {
        return {
          F_ITEMNAME: item.F_ITEMNAME,
          F_itemValue:
            arr.find((sub) => sub.numId == item.F_ITEMNAME) !== undefined
              ? arr.find((sub) => sub.numId == item.F_ITEMNAME).numVal
              : arr.find((sub) => sub.desId == item.F_ITEMNAME).descriptionVal,
        };
      });
      if (
        data.postData.khdata.F_Stime == "" ||
        data.postData.khdata.F_Etime == ""
      ) {
        this.$message({
          message: "请选择实习时间",
          type: "warning",
          center: true,
        });
      } else if (data.postData.khdata.F_Daysx == "") {
        this.$message({
          message: "请输入应实习天数",
          type: "warning",
          center: true,
        });
      } else if (data.postData.khdata.F_Daysjsx == "") {
        this.$message({
          message: "请输入实际实习天数",
          type: "warning",
          center: true,
        });
      } else if (this.sickLeaveVal == "") {
        this.$message({
          message: "请输入病假天数",
          type: "warning",
          center: true,
        });
      } else if (this.personalLeaveVal == "") {
        this.$message({
          message: "请输入事假天数",
          type: "warning",
          center: true,
        });
      } else if (this.absenteeismVal == "") {
        this.$message({
          message: "请输入旷假天数",
          type: "warning",
          center: true,
        });
      } else if (
        data.postData.json[0].F_itemValue == "" ||
        data.postData.json[2].F_itemValue == "" ||
        data.postData.json[4].F_itemValue == "" ||
        data.postData.json[6].F_itemValue == "" ||
        data.postData.json[8].F_itemValue == "" ||
        data.postData.json[10].F_itemValue == "" ||
        data.postData.json[12].F_itemValue == "" ||
        data.postData.json[14].F_itemValue == "" ||
        data.postData.json[16].F_itemValue == "" ||
        data.postData.json[18].F_itemValue == "" ||
        data.postData.json[20].F_itemValue == "" ||
        data.postData.json[22].F_itemValue == "" ||
        data.postData.json[24].F_itemValue == "" ||
        data.postData.json[26].F_itemValue == "" ||
        data.postData.json[28].F_itemValue == "" ||
        data.postData.json[30].F_itemValue == "" ||
        data.postData.json[32].F_itemValue == "" ||
        data.postData.json[34].F_itemValue == "" ||
        data.postData.json[36].F_itemValue == "" ||
        data.postData.json[38].F_itemValue == ""
      ) {
        this.$message({
          message: "请评分",
          type: "warning",
          center: true,
        });
      } else if (data.postData.khdata.llnumb == "") {
        this.$message({
          message: "请输入理论成绩",
          type: "warning",
          center: true,
        });
      } else if (data.postData.khdata.cznumb == "") {
        this.$message({
          message: "请输入操作成绩",
          type: "warning",
          center: true,
        });
      } else if (data.postData.khdata.psnumb == "") {
        this.$message({
          message: "请输入平时成绩",
          type: "warning",
          center: true,
        });
      } else {
        this.loading = true;
        postAddCheckData(data).then((res) => {
          console.log(res);
          this.loading = false;
          if (res.code == 100) {
            this.$message({
              message: "保存成功！",
              type: "success",
              center: true,
            });
            this.$router.go(-1);
            /* this.$router.push({
              path: "/teacher/assessmentdetail",
              query: {
                f_id: this.f_id,
              },
            }); */
          } else {
            this.$message({
              message: "保存失败",
              type: "error",
              center: true,
            });
          }
        });
      }

      // $router.push('/teacher/assessmentdetail')
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
    /* 应实习天数-- */
    practiceSub() {
      if (this.practiceDayVal > 0) {
        this.practiceDayVal--;
      }
    },
    /* 实际实习天数-- */
    actulPracSub() {
      if (this.actulPracticeDayVal > 0) {
        this.actulPracticeDayVal--;
      }
    },
    /* 病假-- */
    sickLeaveSub() {
      if (this.sickLeaveVal > 0) {
        this.sickLeaveVal--;
      }
    },
    /* 事假-- */
    personalLeaveSub() {
      if (this.personalLeaveVal > 0) {
        this.personalLeaveVal--;
      }
    },
    /* 旷假-- */
    absenteeismSub() {
      if (this.absenteeismVal > 0) {
        this.absenteeismVal--;
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-input__prefix {
  transform: translateX(200px);
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
.container {
  .assessment-edit-title-card {
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
    .assessment-edit-title {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .assessment-edit-content {
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
    // height: calc(100vh - 278px);
    height: calc(100vh - 350px);
    overflow: auto;
    margin: 20px;
    .attendance {
      height: 227px;
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
        padding: 20px 30px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .practice-time {
          display: flex;
          align-items: center;
        }
        .practice-day {
          display: flex;
          align-items: center;
          margin-left: 76px;
          .num-input {
            width: 200px;
            display: flex;
            align-items: center;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            /deep/input[type="number"] {
              -moz-appearance: textfield;
            }
            /deep/input[type="number"]::-webkit-inner-spin-button,
            /deep/input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            /deep/.el-input__inner {
              border: none;
            }
            .num-subtract {
              margin: 0 6px;
            }
          }
          .num-input:hover {
            border-color: #5864ff;
          }
        }
        .actual-practice-day {
          display: flex;
          align-items: center;
          margin-left: 76px;
          .actual-num-input {
            width: 200px;
            display: flex;
            align-items: center;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            /deep/input[type="number"] {
              -moz-appearance: textfield;
            }
            /deep/input[type="number"]::-webkit-inner-spin-button,
            /deep/input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            /deep/.el-input__inner {
              border: none;
            }
            .actual-num-subtract {
              margin: 0 6px;
            }
          }
          .actual-num-input:hover {
            border-color: #5864ff;
          }
        }
        .sick-leave {
          display: flex;
          align-items: center;
          margin-top: 22px;
          .sick-leave-input {
            width: 200px;
            display: flex;
            align-items: center;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            /deep/input[type="number"] {
              -moz-appearance: textfield;
            }
            /deep/input[type="number"]::-webkit-inner-spin-button,
            /deep/input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            /deep/.el-input__inner {
              border: none;
            }
            .sick-leave-subtract {
              margin: 0 6px;
            }
          }
          .sick-leave-input:hover {
            border-color: #5864ff;
          }
        }
        .personal-leave {
          display: flex;
          align-items: center;
          margin-top: 22px;
          margin-left: 74px;
          .personal-leave-input {
            width: 200px;
            display: flex;
            align-items: center;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            /deep/input[type="number"] {
              -moz-appearance: textfield;
            }
            /deep/input[type="number"]::-webkit-inner-spin-button,
            /deep/input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            /deep/.el-input__inner {
              border: none;
            }
            .personal-leave-subtract {
              margin: 0 6px;
            }
          }
          .personal-leave-input:hover {
            border-color: #5864ff;
          }
        }
        .absenteeism {
          display: flex;
          align-items: center;
          margin-top: 22px;
          margin-left: 74px;
          .absenteeism-input {
            width: 200px;
            display: flex;
            align-items: center;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            /deep/input[type="number"] {
              -moz-appearance: textfield;
            }
            /deep/input[type="number"]::-webkit-inner-spin-button,
            /deep/input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            /deep/.el-input__inner {
              border: none;
            }
            .absenteeism-subtract {
              margin: 0 6px;
            }
          }
          .absenteeism-input:hover {
            border-color: #5864ff;
          }
        }
      }
    }
    .usual-grades-card {
      overflow: auto;
      box-sizing: border-box;
      margin-bottom: 14px;
      .edit-item {
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
          width: 85%;
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
          .fraction-col {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 73px 0 88px;
            span {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 400;
              color: #ffffff;
              opacity: 1;
            }
          }
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
          width: 85%;
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
                border-right: 1px solid rgba(18, 32, 115, 0.04);
              }
              .radio-col {
                padding: 0 70px;
                /deep/.el-radio__label {
                  display: none;
                }
                .el-radio-group {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                }
              }
              .input-col {
                /deep/.el-input__inner {
                  height: 51px;
                  background: none;
                  outline: none;
                  border: none;
                  font-size: 16px;
                  font-family: "PingFang SC";
                  font-weight: 400;
                  color: rgba(18, 32, 115, 0.3);
                }
              }
            }
          }
        }
      }
      .total-row {
        margin-left: 25px;
        width: 85%;
        height: 54px;
        display: flex;
        background: rgba(88, 100, 255, 0.04);
        border: 1px solid rgba(0, 0, 0, 0.08);
        margin-bottom: 38px;
        :nth-child(1) {
          // width: 42.9%;
          width: 42.9%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 800;
          color: #122073;
          opacity: 1;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
        }
        :nth-child(2) {
          width: 57.1%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 800;
          color: #16d090;
          opacity: 1;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
        }
        // :nth-child(3) {
        //   width: 16.8%;
        //   input {
        //     width: 100%;
        //     height: 100%;
        //     border: none;
        //     outline: none;
        //     background: none;
        //     padding: 0 15px;
        //     font-size: 16px;
        //     font-family: "PingFang SC";
        //     font-weight: 400;
        //     color: rgba(18, 32, 115, 0.3);
        //   }
        //   input::-webkit-input-placeholder {
        //     // 谷歌
        //     color: rgba(18, 32, 115, 0.3);
        //     font-size: 16px;
        //   }
        // }
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
        width: 85%;
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
        width: 85%;
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
          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: none;
            padding: 0 15px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: rgba(18, 32, 115, 0.3);
            text-align: center;
          }
          /deep/input[type="number"] {
            -moz-appearance: textfield;
          }
          /deep/input[type="number"]::-webkit-inner-spin-button,
          /deep/input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }
    }
    .feedback-question-card {
      height: 299px;
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
        display: flex;
        align-items: center;
        padding-left: 25px;
        margin-top: 25px;
        .feedback-question-description {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          display: flex;
          margin-right: 20px;
        }
        .el-radio-group {
          display: flex;
          margin-right: 20px;
        }
      }
      .feedback-question-textipt {
        width: 60%;
        padding-left: 25px;
        margin-top: 25px;
        /deep/.el-textarea__inner {
          padding: 20px;
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        }
      }
    }
    .student-diary-card {
      height: 480px;
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
        width: 58%;
        height: 127px;
        padding: 27px 30px;
        margin: 23px 25px;
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
      .student-diary-textipt {
        width: 60%;
        padding-left: 25px;
        margin-top: 25px;
        /deep/.el-textarea__inner {
          padding: 20px;
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        }
      }
    }
  }
  .footer-row {
    // position: absolute;
    // bottom: 0;
    height: 74px;
    // width: calc(100% - 334px);
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #ffffff;
    .cancel,
    .save {
      width: 228px;
      height: 50px;
      opacity: 1;
      border-radius: 4px;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .cancel {
      background: #d0d2e3;
      margin-right: 12px;
    }
    .save {
      background: #5864ff;
      margin-right: 24px;
    }
  }
}
</style>