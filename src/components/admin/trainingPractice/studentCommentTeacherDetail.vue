<template>
  <div class="evaluation-teaching-detail-container" v-loading="loading">
    <el-card class="evaluation-teaching-detail-title-card" shadow="never">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/evateach' }"
          >一级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/evateach/detail' }"
          >二级菜单</el-breadcrumb-item
        >
        <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="evaluation-title">临床实习学生评教</div>
      <div class="evaluation-content">
        <span>带教教师：{{ teachername }}</span>
        <span>医院：{{ yyname }}</span>
        <span>科室：{{ f_xks !== null && f_xks !== "" ? f_xks : ksname }}</span>
      </div>
    </el-card>
    <div class="main-card">
      <!-- 学生评教 -->
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="evaluation-teaching-detail-container-card"
      >
        <div class="detail-item">
          <el-row class="title-row">
            <div></div>
            <span>学生评教</span>
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
                  <el-col :span="7" style="visibility: hidden">.</el-col>
                  <el-col :span="10" class="fraction-col">分数</el-col>
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
                  <el-col :span="7">{{ item__.nTitle }}</el-col>
                  <el-col class="radio-col" :span="10">
                    {{ item__.numVal }}分
                  </el-col>
                  <el-col class="input-col" :span="7">
                    {{
                      item__.descriptionVal !== "" ? item__.descriptionVal : "-"
                    }}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row class="total-row">
          <el-col :span="4" class="total-text-col">
            <div>总分</div>
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
              <el-col :span="7" style="visibility: hidden">.</el-col>
              <el-col :span="10" class="num-col"
                >{{
                  PjMainData.F_totalNumb !== null ? PjMainData.F_totalNumb : ""
                }}分</el-col
              >
              <el-col :span="7" class="last-col">{{
                PjMainData.F_totalContent !== null &&
                PjMainData.F_totalContent !== ""
                  ? PjMainData.F_totalContent
                  : "-"
              }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <!-- 学生评优 -->
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="student-evaluation-card"
      >
        <el-row class="student-evaluation-title">
          <div></div>
          <span>学生评优</span>
        </el-row>
        <el-row class="student-evaluation-content">
          <div class="student-evaluation-description">
            是否推荐为优秀带教教师：
          </div>
          <div class="student-evalution-res">
            {{ PjMainData.F_Isyxjs == 1 ? "是" : "否" }}
          </div>
          <div class="student-evalution-res-text">
            说明：{{ PjMainData.F_yxjsContent }}
          </div>
        </el-row>
        <el-row class="student-evaluation-content">
          <div class="student-evaluation-description">是否推荐为优秀科室：</div>
          <div class="student-evalution-res">
            {{ PjMainData.F_Isyxks == 1 ? "是" : "否" }}
          </div>
          <div class="student-evalution-res-text">
            说明：{{ PjMainData.F_yxksContent }}
          </div>
        </el-row>
      </el-card>
      <!-- 学生反馈给管理人员的相关问题 -->
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="student-feedback-question-card"
      >
        <el-row class="student-feedback-question-title">
          <div></div>
          <span>学生反馈给管理人员的相关问题</span>
        </el-row>
        <el-row class="student-feedback-question-content">
          <div class="student-feedback-question-description">
            是否有需要反馈的相关问题：
          </div>
          <div style="font-size: 16px; font-weight: 400; color: #122073">
            {{
              PjMainData.F_glContent !== null && PjMainData.F_glContent !== ""
                ? "是"
                : "否"
            }}
          </div>
        </el-row>
        <el-row class="student-feedback-question-textipt">
          <div>
            {{ PjMainData.F_glContent }}
          </div>
        </el-row>
      </el-card>
      <!-- 学生对带教教师的建议 -->
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="student-suggest-card"
      >
        <el-row class="student-suggest-title">
          <div></div>
          <span>学生对带教教师的建议</span>
        </el-row>
        <el-row class="student-suggest-content">
          <div class="student-suggest-description">是否有建议：</div>
          <div style="font-size: 16px; font-weight: 400; color: #122073">
            {{
              PjMainData.F_jyContent !== null && PjMainData.F_jyContent !== ""
                ? "是"
                : "否"
            }}
          </div>
        </el-row>
        <el-row class="student-suggest-textipt">
          <div>
            {{ PjMainData.F_jyContent }}
          </div>
        </el-row>
      </el-card>
      <!-- 学生实习反思日记 -->
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="student-diary-card"
      >
        <el-row class="student-diary-title">
          <div></div>
          <span>学生实习反思日记</span>
        </el-row>
        <el-row class="student-diary-textipt">
          <div>
            {{ PjMainData.F_Diary }}
          </div>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getPjData } from "api/student-api/studentEvaluation";
export default {
  name: "EvaluationTeachingDetail",
  data() {
    return {
      loading: false,
      f_id: "",
      teachername: "",
      yyname: "",
      ksname: "",
      f_xks: "",
      PjListData: [],
      dataList: [
        {
          title: "指导教师",
          nameList: [
            {
              nName: "专业思想引导",
              nTitleList: [
                {
                  numId: "num1",
                  desId: "text1",
                  nTitle: "爱岗敬业起表率作用",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num2",
                  desId: "text2",
                  nTitle: "注重对学生专业思想引导",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "医德医风示范",
              nTitleList: [
                {
                  numId: "num3",
                  desId: "text3",
                  nTitle: "仪表端庄，行为得体",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num4",
                  desId: "text4",
                  nTitle: "对病人认真负责，关心病人",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "理论水平",
              nTitleList: [
                {
                  numId: "num5",
                  desId: "text5",
                  nTitle: "能解答学生提出的专业问题	",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num6",
                  desId: "text6",
                  nTitle: "对专业进展新知识把握好	",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "操作水平",
              nTitleList: [
                {
                  numId: "num7",
                  desId: "text7",
                  nTitle: "操作规范、熟练",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num8",
                  desId: "text8",
                  nTitle: "做到操作前示范、操作后讲评",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
            {
              nName: "带教意识",
              nTitleList: [
                {
                  numId: "num9",
                  desId: "text9",
                  nTitle: "教学经验丰富，热爱教学工作",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num10",
                  desId: "text10",
                  nTitle: "认真按照实习大纲安排教学内容",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num11",
                  desId: "text11",
                  nTitle: "严格要求学生但关心和尊重学生",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num12",
                  desId: "text12",
                  nTitle: "耐心解答学生所提问题",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num13",
                  desId: "text13",
                  nTitle: "放手不放眼，提供学习机会",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num14",
                  desId: "text14",
                  nTitle: "注重培养学生临床思维能力	",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num15",
                  desId: "text15",
                  nTitle: "组织教学讲课、查房准备充分",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
          ],
        },
        {
          title: "科室",
          nameList: [
            {
              nName: "教学条件",
              nTitleList: [
                {
                  numId: "num16",
                  desId: "text16",
                  nTitle: "重视教学工作，安排专人带教",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num17",
                  desId: "text17",
                  nTitle: "病区环境整洁",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num18",
                  desId: "text18",
                  nTitle: "科室医护团结协助氛围",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num19",
                  desId: "text19",
                  nTitle: "教学设施设备完善",
                  numVal: "",
                  descriptionVal: "",
                },
                {
                  numId: "num20",
                  desId: "text20",
                  nTitle: "病种丰富能满足实习教学的需要",
                  numVal: "",
                  descriptionVal: "",
                },
              ],
            },
          ],
        },
      ],
      PjMainData: {},
    };
  },
  created() {
    this.f_id = this.$route.query.f_id;
    this.teachername = this.$route.query.teachername;
    this.yyname = this.$route.query.yyname;
    this.ksname = this.$route.query.ksname;
    this.f_xks = this.$route.query.f_xks;
    console.log(this.f_id);
    console.log(this.teachername);
    console.log(this.yyname);
    console.log(this.ksname);
    console.log(this.f_xks);
    this.pjData();
  },
  mounted() {},
  methods: {
    /* 获取已评教数据 */
    pjData() {
      this.loading = true;
      let params = {
        pjid: this.f_id,
      };
      console.log(params);
      getPjData(params).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.PjListData = res.data.PjListData;
          this.dataList = this.dataList.map((item) => ({
            ...item,
            nameList: item.nameList.map((sub) => ({
              ...sub,
              nTitleList: sub.nTitleList.map((val) => ({
                ...val,
                numVal:
                  this.PjListData.find((dep) => dep.F_itemName == val.numId) !==
                  undefined
                    ? this.PjListData.find((dep) => dep.F_itemName == val.numId)
                        .F_itemValue
                    : "",
                descriptionVal:
                  this.PjListData.find((dep) => dep.F_itemName == val.desId) !==
                  undefined
                    ? this.PjListData.find((dep) => dep.F_itemName == val.desId)
                        .F_itemValue
                    : "",
              })),
            })),
          }));
          this.PjMainData = res.data.PjMainData;
          this.loading = false;
          console.log(this.dataList);
        } else {
          this.$message({
            message: "获取数据失败",
            type: "error",
            center: true,
          });
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.evaluation-teaching-detail-container {
  .evaluation-teaching-detail-title-card {
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
    .evaluation-title {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .evaluation-content {
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
    height: calc(100vh - 300px);
    overflow: auto;
    margin: 20px;
    .evaluation-teaching-detail-container-card {
      overflow: auto;
      box-sizing: border-box;
      margin-bottom: 14px;
      .detail-item {
        .title-row {
          height: 49px;
          display: flex;
          align-items: center;
          padding: 0 25px;
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
    .student-evaluation-card {
      height: 211px;
      margin-bottom: 14px;
      .student-evaluation-title {
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
      .student-evaluation-content {
        display: flex;
        align-items: center;
        padding-left: 25px;
        margin-top: 25px;
        .student-evaluation-description {
          width: 192px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          display: flex;
          justify-content: flex-end;
          margin-right: 20px;
        }
        .student-evalution-res,
        .student-evalution-res-text {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          margin-right: 20px;
        }
      }
    }
    .student-feedback-question-card {
      height: 299px;
      margin-bottom: 14px;
      .student-feedback-question-title {
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
      .student-feedback-question-content {
        display: flex;
        align-items: center;
        padding-left: 25px;
        margin-top: 25px;
        .student-feedback-question-description {
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
      .student-feedback-question-textipt {
        // width: 60%;
        width: 90%;
        padding-left: 25px;
        margin-top: 25px;
        div {
          height: 132px;
          background: #ffffff;
          opacity: 1;
          border-radius: 6px;
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }
    .student-suggest-card {
      // height: 299px;
      margin-bottom: 14px;
      .student-suggest-title {
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
      .student-suggest-content {
        display: flex;
        align-items: center;
        padding-left: 25px;
        margin-top: 25px;
        .student-suggest-description {
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
      .student-suggest-textipt {
        // width: 60%;
        width: 90%;
        padding-left: 25px;
        margin-top: 25px;
        margin-bottom: 25px;
        div {
          // height: 132px;
          background: #ffffff;
          opacity: 1;
          border-radius: 6px;
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }
    .student-diary-card {
      height: 325px;
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
      .student-diary-textipt {
        // width: 60%;
        width: 90%;
        padding-left: 25px;
        margin-top: 25px;
        div {
          height: 204px;
          background: #ffffff;
          opacity: 1;
          border-radius: 6px;
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: calc(100% - 334px);
    height: 74px;
    transform: translate(-20px, 0);
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    padding-right: 20px;
    .cancel,
    .save {
      width: 228px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      border-radius: 4px;
      font-size: 18px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
    }
    .cancel {
      background: #d0d2e3;
    }
    .save {
      background: #5864ff;
      margin-left: 16px;
    }
  }
}
</style>