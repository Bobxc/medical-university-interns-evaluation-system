<template>
  <div class="basic-operation-container">
    <el-card class="title-card">
      <span>基础操作实习记录</span>
      <div class="description">
        <div class="skill">
          <img src="@/assets/image/组 1247.png" alt="" />
          <span>熟练</span>
        </div>
        <div class="unskill">
          <img src="@/assets/image/组 1240.png" alt="" />
          <span>不熟练</span>
        </div>
        <div class="nooperation">
          <img src="@/assets/image/组 1248.png" alt="" />
          <span>无操作</span>
        </div>
      </div>
    </el-card>
    <div class="department-add" @click="chooseDepartmentDialogVisible = true">
      <div class="department-add-content">
        <span>添加科室</span>
        <img src="@/assets/image/组 1156.png" alt="" />
      </div>
    </div>
    <!-- <el-card class="content-card">
      <el-row class="head">
        <el-col :span="3" class="head-department">科室</el-col>
        <el-col :span="21" class="head-chooseD">所选科室</el-col>
      </el-row>
      <el-row
        class="body"
        v-for="(item, index) in dataList"
        :key="index"
        :style="{
          background: index % 2 == 0 ? '' : 'rgba(149, 156, 193, 0.06)',
        }"
      >
        <div class="item-body">
          <el-col
            class="body-title"
            :span="3"
            :style="{
              background:
                index % 2 == 0
                  ? 'rgba(246, 248, 251, 0.55)'
                  : 'rgba(149, 156, 193, 0.06)',
            }"
          >
            <div class="body-img">
              <img :src="item.img" alt="" />
            </div>
            <span>{{ item.title }}</span>
          </el-col>
          <el-col
            class="body-content"
            :span="7"
            v-for="(item_, index) in item.contentList"
            :key="index"
          >
            <div class="d-title">{{ item_.contentTitle }}</div>
            <div class="d-skill">
              <img src="@/assets/image/组 1247.png" alt="" />
              <span>{{ item_.skillNum }}项</span>
            </div>
            <div class="d-unskill">
              <img src="@/assets/image/组 1240.png" alt="" />
              <span>{{ item_.unskillNum }}项</span>
            </div>
            <div class="d-nooperation">
              <img src="@/assets/image/组 1248.png" alt="" />
              <span>{{ item_.nooperationNum }}项</span>
            </div>
            <div class="go-detail" @click="recordDetailDialogVisible = true">
              <img src="@/assets/image/组 1908.png" alt="" />
            </div>
          </el-col>
        </div>
      </el-row>
    </el-card> -->
    <!-- 记录详情弹框 -->
    <el-dialog
      title="记录详情"
      :visible.sync="recordDetailDialogVisible"
      width="38%"
      center
    >
      <div class="record-detail-dialog">
        <el-row type="flex">
          <el-col class="dialog-title" :span="3">呼吸内科</el-col>
          <el-col class="dialog-skill" :span="5">
            <img src="@/assets/image/组 1247.png" alt="" />
            <span>熟练：20项</span>
          </el-col>
          <el-col class="dialog-unskill" :span="5">
            <img src="@/assets/image/组 1240.png" alt="" />
            <span>不熟练：20项</span>
          </el-col>
          <el-col class="dialog-nooperation" :span="5">
            <img src="@/assets/image/组 1248.png" alt="" />
            <span>无操作：20项</span>
          </el-col>
        </el-row>
        <div
          class="dialog-content"
          v-for="(item, index) in detailList"
          :key="index"
        >
          <el-row type="flex" align="middle" class="d-header">
            <el-col :span="10" style="display: flex; align-items: center">
              <img
                src="@/assets/image/组 1270.png"
                alt=""
                style="margin-right: 10px"
              />
              <span>{{ item.title }}</span>
            </el-col>
            <el-col :span="5" style="display: flex; justify-content: center"
              >熟练</el-col
            >
            <el-col :span="5" style="display: flex; justify-content: center"
              >不熟练</el-col
            >
            <el-col :span="4" style="display: flex; justify-content: center"
              >无操作</el-col
            >
          </el-row>
          <el-row
            type="flex"
            align="middle"
            class="d-body"
            v-for="(item_, index) in item.contentList"
            :key="index"
          >
            <el-col :span="10">{{ item_.contentTitle }}</el-col>
            <el-col :span="5" style="display: flex; justify-content: center">
              <img
                v-if="item_.type == 1"
                src="@/assets/image/组 1247.png"
                alt=""
              />
            </el-col>
            <el-col :span="5" style="display: flex; justify-content: center"
              ><img
                v-if="item_.type == 2"
                src="@/assets/image/组 1240.png"
                alt=""
            /></el-col>
            <el-col :span="4" style="display: flex; justify-content: center"
              ><img
                v-if="item_.type == 3"
                src="@/assets/image/组 1248.png"
                alt=""
            /></el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 添加科室弹框 -->
    <el-dialog
      title="选择科室"
      :visible.sync="chooseDepartmentDialogVisible"
      width="895px"
      center
    >
      <div class="choose-department-dialog">
        <div
          class="department-item"
          v-for="(item, index) in departmentList"
          :key="index"
        >
          <div class="department-title">{{ item.title }}</div>
          <div class="department-content">
            <el-radio-group
              v-model="form.radioArray[index]"
              :key="index"
              style="display: flex; flex-wrap: wrap"
            >
              <el-radio
                v-for="(item_, index) in item.radioList"
                :label="item_.id"
                >{{ item_.radioName }}</el-radio
              >
              <div class="dialog-input" v-if="item.iptShow">
                <input
                  type="text"
                  placeholder="输入科室"
                  v-model="item.iptVal"
                />
                <div class="input-btn" @click="save(item, index)">确定</div>
              </div>
              <div
                class="add-btn"
                @click="addDepartment(item)"
                @mouseover="overshow(item)"
                @mouseout="overhidden(item)"
              >
                <img src="@/assets/image/加1.png" alt="" />
                <div class="tip" v-show="item.tipShow">
                  <p>添加二级科室</p>
                  <div class="triangle"></div>
                </div>
              </div>
            </el-radio-group>
          </div>
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
                <span>{{ item.title }}</span>
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
              v-for="(item_, index) in item.titleList"
              :key="item_.tid"
            >
              <el-col :span="10">{{ item_.name }}</el-col>
              <el-col :span="14" style="display: flex; justify-content: center"
                ><el-radio-group
                  v-model="form.radioArray1[index]"
                  style="
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                  "
                >
                  <el-radio :label="1" style="transform: translateX(5px)">
                  </el-radio>
                  <el-radio :label="2" style="transform: translateX(-8px)">
                  </el-radio>
                  <el-radio :label="3" style="transform: translateX(-8px)">
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
            <el-col :span="6" class="commit">提交</el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBaseInternshipRecordList } from "api/student-api/baseInternshipRecord";
export default {
  name: "BasicOperation",
  data() {
    return {
      recordDetailDialogVisible: false,
      chooseDepartmentDialogVisible: false,
      writeProjectDialogVisible: false,
      radio: 3,
      form: {
        radioArray: ["1", "10", "14", "16"],
        radioArray1: [],
      },
      dataList: [/* 
        {
          title: "内科",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "呼吸内科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
            {
              contentTitle: "呼吸内科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
            {
              contentTitle: "呼吸内科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
        {
          title: "外科",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "普外科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
            {
              contentTitle: "心胸外科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
        {
          title: "妇产科",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "妇科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
            {
              contentTitle: "产科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
        {
          title: "儿科",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "儿科病房",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
            {
              contentTitle: "新生儿病房",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
        {
          title: "手术室",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "手术室",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
        {
          title: "ICU",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "ICU",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
        {
          title: "急诊科",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "急诊科",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
        {
          title: "其他(自定义...",
          img: require("../../../assets/image/组 1245.png"),
          contentList: [
            {
              contentTitle: "自定义",
              skillNum: 20,
              unskillNum: 20,
              nooperationNum: 20,
            },
          ],
        },
       */],
      detailList: [
        {
          title: "护理书写",
          contentList: [
            {
              contentTitle: "健康教育、入院宣教",
              type: 1,
            },
            {
              contentTitle: "写交班报告、交班",
              type: 3,
            },
            {
              contentTitle: "整体护理完整病历书写",
              type: 1,
            },
            {
              contentTitle: "重病记录",
              type: 2,
            },
            {
              contentTitle: "加强监护记录",
              type: 2,
            },
            {
              contentTitle: "处理医嘱",
              type: 1,
            },
            {
              contentTitle: "出院指导",
              type: 1,
            },
          ],
        },
        {
          title: "护理书写",
          contentList: [
            {
              contentTitle: "健康教育、入院宣教",
              type: 1,
            },
            {
              contentTitle: "写交班报告、交班",
              type: 3,
            },
            {
              contentTitle: "整体护理完整病历书写",
              type: 1,
            },
            {
              contentTitle: "重病记录",
              type: 2,
            },
            {
              contentTitle: "加强监护记录",
              type: 2,
            },
            {
              contentTitle: "处理医嘱",
              type: 1,
            },
            {
              contentTitle: "出院指导",
              type: 1,
            },
          ],
        },
      ],
      departmentList: [
        {
          id: "000",
          title: "内科",
          iptVal: "",
          iptShow: false,
          tipShow: false,
          radioList: [
            {
              id: "1",
              radioName: "心血管内科",
            },
            {
              id: "2",
              radioName: "呼吸内科",
            },
            {
              id: "3",
              radioName: "消化内科",
            },
            {
              id: "4",
              radioName: "神经内科",
            },
            {
              id: "5",
              radioName: "血液内科",
            },
            {
              id: "6",
              radioName: "内分泌",
            },
            {
              id: "7",
              radioName: "感染",
            },
            {
              id: "8",
              radioName: "循环内科",
            },
            {
              id: "9",
              radioName: "泌尿",
            },
          ],
        },
        {
          id: "001",
          title: "外科",
          iptVal: "",
          iptShow: false,
          tipShow: false,
          radioList: [
            {
              id: "10",
              radioName: "普外科",
            },
            {
              id: "11",
              radioName: "心胸外科",
            },
            {
              id: "12",
              radioName: "骨科",
            },
            {
              id: "13",
              radioName: "脑外科",
            },
          ],
        },
        {
          id: "002",
          title: "妇产科",
          iptVal: "",
          iptShow: false,
          tipShow: false,
          radioList: [
            {
              id: "14",
              radioName: "妇科",
            },
            {
              id: "15",
              radioName: "产科",
            },
          ],
        },
        {
          id: "003",
          title: "儿科",
          iptVal: "",
          iptShow: false,
          tipShow: false,
          radioList: [
            {
              id: "16",
              radioName: "儿科病房",
            },
            {
              id: "17",
              radioName: "新生儿病房",
            },
          ],
        },
        {
          id: "004",
          title: "其他",
          iptVal: "",
          iptShow: false,
          tipShow: false,
          radioList: [],
        },
      ],
      projectList: [
        {
          pid: 1,
          title: "护理书写",
          titleList: [
            {
              tid: 1,
              name: "健康教育、入院宣教",
            },
            {
              tid: 2,
              name: "写交班报告、交班",
            },
            {
              tid: 3,
              name: "整体护理完整病历书写",
            },
            {
              tid: 4,
              name: "重病记录",
            },
            {
              tid: 5,
              name: "加强监护记录",
            },
            {
              tid: 6,
              name: "处理医嘱",
            },
            {
              tid: 7,
              name: "出院指导",
            },
          ],
        },
        {
          pid: 2,
          title: "护理书写233",
          titleList: [
            {
              tid: 8,
              name: "健康教育、入院宣教",
            },
            {
              tid: 9,
              name: "写交班报告、交班",
            },
            {
              tid: 10,
              name: "整体护理完整病历书写",
            },
            {
              tid: 11,
              name: "重病记录",
            },
            {
              tid: 12,
              name: "加强监护记录",
            },
            {
              tid: 13,
              name: "处理医嘱",
            },
            {
              tid: 14,
              name: "出院指导",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    getBaseInternshipRecordList().then((res) => {
      console.log(res);
    });
  },
  methods: {
    next() {
      // this.chooseDepartmentDialogVisible = false;
      this.writeProjectDialogVisible = true;
    },

    addDepartment(item) {
      console.log(item);
      item.iptShow = true;
    },
    save(item, index) {
      let n = Math.random();
      this.departmentList[index].radioList.push({
        id: n,
        radioName: item.iptVal,
      });
      item.iptVal = "";
      item.iptShow = false;
    },
    overshow(item) {
      item.tipShow = true;
    },
    overhidden(item) {
      item.tipShow = false;
    },
    projectCancel() {
      this.writeProjectDialogVisible = false;
    },
    projectLast() {},
  },
};
</script>
<style lang="less" scoped>
.basic-operation-container {
  .title-card {
    height: 134px;
    box-shadow: none;
    margin-top: 5px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    :nth-child(1) {
      font-size: 20px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .description {
      display: flex;
      margin-top: 20px;
      .skill,
      .unskill,
      .nooperation {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
        margin-right: 20px;
        img {
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
      }
    }
  }
  .department-add {
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
    .department-add-content {
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
  .content-card {
    height: 600px;
    box-shadow: none;
    margin: 20px;
    padding: 20px;
    box-sizing: border-box;
    .head {
      display: flex;
      // width: 100%;
      height: 62px;
      background: rgba(246, 248, 251, 0.55);
      display: flex;
      .head-department {
        // width: 179px;
        height: 62px;
        background: rgba(149, 156, 193, 0.06);
        display: flex;
        align-items: center;
        padding-left: 30px;
        box-sizing: border-box;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #122073;
      }
      .head-chooseD {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 500;
        color: #122073;
        box-sizing: border-box;
        padding-left: 56px;
      }
    }
    .body {
      height: 62px;
      .item-body {
        .el-col {
          height: 62px;
        }
        .body-title {
          padding-left: 30px;
          display: flex;
          align-items: center;
          .body-img {
            width: 27px;
            height: 27px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
          }
          span {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
          }
        }
        .body-content {
          display: flex;
          align-items: center;
          .d-title {
            width: 22%;
            font-size: 16px;
            padding-left: 56px;
            font-family: "PingFang SC";
            font-weight: 800;
            color: #122073;
            opacity: 1;
          }
          .d-skill {
            display: flex;
            align-items: center;
            width: 15%;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-right: 10px;
            img {
              margin-right: 6px;
            }
          }
          .d-unskill {
            display: flex;
            align-items: center;
            width: 15%;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-right: 10px;
            img {
              margin-right: 6px;
            }
          }
          .d-nooperation {
            display: flex;
            align-items: center;
            width: 15%;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-right: 10px;
            img {
              margin-right: 6px;
            }
          }
          .go-detail {
            width: 21px;
            height: 21px;
            cursor: pointer;
          }
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
  /deep/.el-dialog__body {
    padding: 0;
  }
  .record-detail-dialog {
    height: 600px;
    padding: 25px;
    overflow: auto;
    box-sizing: border-box;
    .dialog-title {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 800;
      color: #122073;
      opacity: 1;
    }
    .dialog-skill {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
      img {
        margin-right: 5px;
      }
    }
    .dialog-unskill {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
      img {
        margin-right: 5px;
      }
    }
    .dialog-nooperation {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #122073;
      opacity: 1;
      img {
        margin-right: 5px;
      }
    }
    .dialog-content {
      .d-header {
        height: 48px;
        background: #5864ff;
        opacity: 1;
        border-radius: 8px 8px 0px 0px;
        margin-top: 24px;
        padding-left: 31px;
        .el-col {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .d-body {
        height: 47px;
        padding-left: 31px;
        border: 1px solid rgba(18, 32, 115, 0.07);
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
  .record-detail-dialog::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    height: 100px;
  }
  .record-detail-dialog::-webkit-scrollbar-thumb {
    /*滚动条里面的滑块*/
    border-radius: 9px;
    background: #e3e4ee;
  }
  .record-detail-dialog::-webkit-scrollbar-track {
    /*滚动条里面轨道背景*/
    border-radius: 10px;
  }
  .choose-department-dialog {
    // height: 600px;
    padding: 25px;
    box-sizing: border-box;
    .department-item {
      display: flex;
      border-bottom: 1px solid rgba(18, 32, 115, 0.04);
      padding: 25px 0 10px 0;
      .department-title {
        width: 80px;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: bold;
        line-height: 22px;
        color: #122073;
        opacity: 1;
        // margin-top: 22px;
        margin-bottom: 15px;
      }
      .department-content {
        .el-radio-group {
          width: 780px;
          .el-radio {
            // width: 100px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #122073;
            opacity: 1;
            margin-right: 32px;
            // margin-top: 25px;
            margin-bottom: 25px;
          }
        }

        .dialog-input {
          display: flex;
          transform: translateY(-13px);
          input {
            outline: none;
            width: 188px;
            height: 42px;
            background: #ffffff;
            border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
            opacity: 1;
            border-radius: 6px;
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: rgba(18, 32, 115, 0.3);
          }
          input::-webkit-input-placeholder {
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: rgba(18, 32, 115, 0.3);
          }
          .input-btn {
            width: 46px;
            height: 42px;
            background: #5864ff;
            opacity: 1;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
            font-size: 16px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #ffffff;
            cursor: pointer;
          }
        }
        .add-btn {
          position: relative;
          width: 46px;
          height: 42px;
          background: rgba(88, 100, 255, 0.05);
          border: 1px dashed rgba(88, 100, 255, 0.32156862745098036);
          opacity: 1;
          border-radius: 6px;
          transform: translateY(-13px);
          margin-left: 10px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          .tip {
            position: absolute;
            top: -55px;
            background-color: #374686;
            width: 120px;
            height: 40px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #ffffff;
            border: none;
            .triangle {
              display: block;
              height: 0px;
              width: 0px;
              border: 10px solid transparent;
              border-top-color: #374686;
              background: none;
              position: absolute;
              bottom: -20px;
              left: calc(50% - 10px);
            }
          }
        }
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