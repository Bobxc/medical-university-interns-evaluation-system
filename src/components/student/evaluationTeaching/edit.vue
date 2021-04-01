<template>
  <div class="evaluation-teaching-edit-container" v-loading="loading">
    <el-card
      class="evaluation-teaching-edit-title-card"
      >
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/evateach' }">一级菜单</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/evateach/edit' }">二级菜单</el-breadcrumb-item>
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
      class="evaluation-teaching-edit-container-card"
    >
      <div class="edit-item">
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
        <div>总分</div>
        <div>{{totalNum}}分</div>
        <div><input placeholder="请输入" v-model="totalContent"></input></div>
      </el-row>
    </el-card>
    <!-- 学生评优 -->
    <el-card :body-style="{ padding: '0px' }" shadow="never" class="student-evaluation-card">
      <el-row class="student-evaluation-title">
        <div></div>
        <span>学生评优</span>
      </el-row>
      <el-row class="student-evaluation-content">
          <div class="student-evaluation-description">是否推荐为优秀带教教师：</div>
          <el-radio-group v-model="isyxjs">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <el-input placeholder="请输入说明" v-model="yxjsContent"></el-input>
      </el-row>
      <el-row class="student-evaluation-content">
        <div class="student-evaluation-description">是否推荐为优秀科室：</div>
          <el-radio-group v-model="isyxks">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <el-input placeholder="请输入说明" v-model="yxksContent"></el-input>
      </el-row>
    </el-card>
    <!-- 学生反馈给管理人员的相关问题 -->
    <el-card :body-style="{ padding: '0px' }" shadow="never" class="student-feedback-question-card">
      <el-row class="student-feedback-question-title">
        <div></div>
        <span>学生反馈给管理人员的相关问题</span>
      </el-row>
      <!-- <el-row class="student-feedback-question-content">
          <div class="student-feedback-question-description">是否有需要反馈的相关问题：</div>
          <el-radio-group v-model="isFeedback">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
      </el-row> -->
      <el-row  class="student-feedback-question-textipt">
       <el-input type="textarea" :rows="8" placeholder="请输入相关问题，字数不限" v-model="glContent"></el-input>
      </el-row>
      
    </el-card>
    <!-- 学生对带教教师的建议 -->
    <el-card :body-style="{ padding: '0px' }" shadow="never" class="student-suggest-card">
      <el-row class="student-suggest-title">
        <div></div>
        <span>学生对带教教师的建议</span>
      </el-row>
      <!-- <el-row class="student-suggest-content">
          <div class="student-suggest-description">是否有建议：</div>
          <el-radio-group v-model="isSuggest">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
      </el-row> -->
      <el-row  class="student-suggest-textipt">
       <el-input type="textarea" :rows="8" placeholder="请输入相关问题，字数不限" v-model="jyContent"></el-input>
      </el-row>
    </el-card>
    <!-- 学生实习反思日记 -->
    <el-card :body-style="{ padding: '0px' }" shadow="never" class="student-diary-card">
      <el-row class="student-diary-title">
        <div></div>
        <span>学生实习反思日记</span>
      </el-row>
      <el-row  class="student-diary-textipt">
       <el-input id="el-textarea" type="textarea" :rows="9"  v-model="diary"></el-input>
      </el-row>
    </el-card>
    </div>
    
    <div class="footer">
      <div class="cancel" @click="$router.go(-1)">取消</div>
      <div class="save" @click="addPjData">提交</div>
    </div>
  </div>
</template>
<script>
import { postAddPjData } from "api/student-api/studentEvaluation";
export default {
  name: "EvaluationTeachingEdit",
  data() {
    return {
      loading: false,
      iptVal: "",
      // radio: "",
      isyxjs: "",
      yxjsContent: "",
      isyxks: "",
      yxksContent: "",
      isFeedback: "",
      isSuggest: "",
      glContent: "",
      jyContent: "",
      diary: "",
      // totalNum: "",
      totalContent: "",
      pjid: "",
      teachername: "",
      yyname: "",
      ksname: "",
      f_xks: "",
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
    };
  },
  created() {
    this.pjid = this.$route.query.f_id;
    this.teachername = this.$route.query.teachername;
    this.yyname = this.$route.query.yyname;
    this.ksname = this.$route.query.ksname;
    this.f_xks = this.$route.query.f_xks;
  },
  mounted() {
    document
      .getElementById("el-textarea")
      .setAttribute(
        "placeholder",
        "格式：(300-500字）\n(1) 本科室实习中发生了什么让你印象深刻的事情? \n(2) 在此过程中你学到了什么? \n(3) 你觉得将来你应该有什么改变? \n(4) 为此你需要深入学习什么呢? \n(5) 你准备什么时候和什么方式开展现实它呢?"
      );
  },
  computed: {
    totalNum() {
      let arr = [];
      this.dataList.map((item) =>
        item.nameList.map((sub) => sub.nTitleList.map((val) => arr.push(val)))
      );
      console.log(arr);
      return this.sum(arr);
    },
  },
  methods: {
    sum(arr) {
      let res = 0;
      for (let i = 0; i < arr.length; i++) {
        res += Number(arr[i].numVal);
      }
      return res;
    },
    addPjData() {
      // this.loading = true;
      let data = {
        keyValue: "", //该评价记录id(编辑的时候传对应值)
        pjid: this.pjid, //实习记录id
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
          pjdata: {
            F_PjId: this.pjid, //实习记录id
            F_totalNumb: this.totalNum, //给带教老师评分的总分数
            F_totalContent: this.totalContent,
            F_Isyxjs: this.isyxjs, //是否推荐为优秀教师  1是  0否
            F_Isyxks: this.isyxks, //是否推荐为优秀科室  1是  0否
            F_yxjsContent: this.yxjsContent, //推荐优秀老师的说明
            F_yxksContent: this.yxksContent, //推荐优秀科室的说明
            F_glContent: this.glContent, //反馈给管理员的说明
            F_jyContent: this.jyContent, //反馈给带教老师的建议
            F_Diary: this.diary, //实习生的实习小结
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
      console.log(this.dataList);
      console.log(data);
      if (
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
          message: "请给带教评分",
          type: "warning",
          center: true,
        });
      } else if (this.isyxjs !== 1 && this.isyxjs !== 0) {
        this.$message({
          message: "请选择是否推荐为优秀带教教师",
          type: "warning",
          center: true,
        });
      } else if (this.isyxks !== 1 && this.isyxks !== 0) {
        this.$message({
          message: "请选择是否推荐科室",
          type: "warning",
          center: true,
        });
      } else if (this.diary == "") {
        this.$message({
          message: "请填写学生实习反思日记",
          type: "warning",
          center: true,
        });
      } else {
        this.loading = true;
        postAddPjData(data).then((res) => {
          console.log(res);
          this.loading = false;
          // this.$router.push({
          //   path: "/evateach/detail",
          //   query: {
          //     f_id: this.pjid,
          //     teachername: this.teachername,
          //     yyname: this.yyname,
          //     ksname: this.ksname,
          //     f_xks: this.f_xks,
          //   },
          // });
          this.$message({
            message: "保存成功！",
            type: "success",
            center: true,
          });
          this.$router.go(-1);
          if (res.code == 100) {
          } else {
            this.$message({
              message: "提交失败！",
              type: "error",
              center: true,
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.evaluation-teaching-edit-container {
  .evaluation-teaching-edit-title-card {
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
    height: calc(100vh - 278px);
    overflow: auto;
    margin: 20px;
    .evaluation-teaching-edit-container-card {
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
          width: 40.3%;
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
        :nth-child(3) {
          width: 16.8%;
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
          }
          input::-webkit-input-placeholder {
            // 谷歌
            color: rgba(18, 32, 115, 0.3);
            font-size: 16px;
          }
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
        .el-radio-group {
          display: flex;
          margin-right: 20px;
        }
        /deep/.el-input {
          width: 65%;
          .el-input__inner {
            border: none;
            background: none;
            outline: none;
          }
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
          // width: 192px;
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
        width: 60%;
        padding-left: 25px;
        margin-top: 25px;
        /deep/.el-textarea__inner {
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        }
      }
    }
    .student-suggest-card {
      height: 299px;
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
        width: 60%;
        padding-left: 25px;
        margin-top: 25px;
        /deep/.el-textarea__inner {
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        }
      }
    }
    .student-diary-card {
      height: 325px;
      margin-bottom: 100px;
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
        width: 60%;
        padding-left: 25px;
        margin-top: 25px;
        /deep/.el-textarea__inner {
          border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: calc(100% - 334px);
    height: 74px;
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