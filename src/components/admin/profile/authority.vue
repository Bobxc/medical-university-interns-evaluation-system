<template>
  <div class="container">
    <el-card class="release-title-card"> 权限设置 </el-card>
    <el-card class="release-content-card">
      <el-row type="flex" align="middle" justify="space-between">
        <div class="row-left">
          <div class="addBtn" @click="dialogVisible = true">
            <img src="@/assets/image/用户.png" alt="" />
            <span>角色设置</span>
          </div>

          <div class="deleteBtn">
            <img src="@/assets/image/组 1365.png" alt="" />
            <span>删除</span>
          </div>
        </div>
      </el-row>
      <!-- 表单 -->
      <el-table :data="tableData" stripe style="width: 100%" height="550">
        <el-table-column type="selection" width="100"> </el-table-column>
        <el-table-column prop="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="title" label="账号" width="688">
        </el-table-column>
        <el-table-column prop="authority" label="角色" width="250">
        </el-table-column>
        <el-table-column prop="" label="" width="250"> </el-table-column>
        <el-table-column label="" width="100"> </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        style="display: flex; justify-content: center; margin-top: 2px"
      >
      </el-pagination>
    </el-card>
    <!-- 角色设置弹框 -->
    <el-dialog
      title="角色设置"
      :visible.sync="dialogVisible"
      @closed="dialogClose"
      width="600px"
      center
      ><div class="set-dialog">
        <div
          class="person"
          v-for="(item, index) in setPerson"
          :key="index"
          @click="choosePerson(index)"
          :class="{ active: index == currentIndex }"
          :style="{ color: index == currentIndex ? '#ffffff' : '#5864ff' }"
        >
          <img
            src="@/assets/image/路径 1099.png"
            v-show="index == currentIndex"
            alt=""
          />
          <img
            src="@/assets/image/路径 1100.png"
            v-show="index !== currentIndex"
            alt=""
          />
          <span>{{ item.name }}</span>
          <img
            src="@/assets/image/选中.png"
            v-show="index == currentIndex"
            class="check-person"
            alt=""
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Authority",
  data() {
    return {
      value: "",
      dialogVisible: false,
      currentIndex: 0,
      tableData: [
        {
          index: "01",
          title: "地址测试文字2020年寒假放假通知地址显示位置文字测试...",
          authority: "所有人可见",
          date: "20201209  16:21",
        },
        {
          index: "01",
          title: "教育部回应“学校要求家长完成或批改作业”：发现一起 严处一起...",
          authority: "所有人可见",
          date: "20201209  16:21",
        },
        {
          index: "01",
          title: "地址测试文字2020年寒假放假通知地址显示位置文字测试...",
          authority: "所有人可见",
          date: "20201209  16:21",
        },
        {
          index: "01",
          title: "教育部回应“学校要求家长完成或批改作业”：发现一起 严处一起...",
          authority: "所有人可见",
          date: "20201209  16:21",
        },
        {
          index: "01",
          title: "地址测试文字2020年寒假放假通知地址显示位置文字测试...",
          authority: "所有人可见",
          date: "20201209  16:21",
        },
        {
          index: "01",
          title: "教育部回应“学校要求家长完成或批改作业”：发现一起 严处一起...",
          authority: "所有人可见",
          date: "20201209  16:21",
        },
      ],
      setPerson: [
        {
          name: "管理员",
        },
        {
          name: "带教",
        },
      ],
    };
  },
  methods: {
    dialogClose() {
      this.dialogVisible = false;
      this.currentIndex = 0;
    },
    choosePerson(index) {
      this.currentIndex = index;
      console.log(index);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-input--suffix .el-input__inner {
  border: none;
}
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
.container {
  .release-title-card {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: 800;
    color: #122073;
    opacity: 1;
    padding-left: 30px;
    box-sizing: border-box;
    margin-top: 5px;
  }
  .release-content-card {
    height: 708px;
    margin: 20px;
    padding: 18px 28px;
    box-sizing: border-box;
    .el-row {
      height: 82px;
      .row-left {
        height: 100%;
        display: flex;
        align-items: center;
        .addBtn,
        .deleteBtn {
          // width: 88px;
          height: 46px;
          opacity: 1;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #ffffff;
          opacity: 1;
          cursor: pointer;
          box-sizing: border-box;
          img {
            margin-right: 10px;
          }
        }
        .addBtn {
          width: 120px;
          background: #5864ff;
          margin-right: 12px;
        }

        .deleteBtn {
          width: 88px;
          background: #fdbe00;
        }
      }
    }
  }
  .set-dialog {
    display: flex;
    height: 150px;
    .person {
      position: relative;
      width: 143px;
      height: 65px;
      // background: #5864ff;

      border: 1px solid #5864ff;
      opacity: 1;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 18px;
      cursor: pointer;
      span {
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        // color: #5864ff;
        opacity: 1;
        margin-left: 5px;
      }
      .check-person {
        position: absolute;
        right: 6px;
        bottom: 6px;
      }
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
}
.active {
  background: #5864ff;
}

</style>