<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside width="334px">
      <div class="title-logo">
        <div class="logo-container">
          <img src="@/assets/image/组 818c.png" alt="" />
        </div>
        <div class="title-container">
          <span>温州医科大学仁济学院</span>
          <span>毕业生实习管理系统</span>
        </div>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#111840"
        text-color="#fff"
        active-text-color="#ffffff"
        router
      >
        <div v-for="(item, index) in menuList" :key="index">
          <template
            v-if="item.meta && !item.meta.hidden && item.meta.flag !== 0"
          >
            <el-submenu
              v-if="item.children && item.children.length"
              :index="item.path"
              :key="item.path"
            >
              <template slot="title">
                <img
                  v-if="item.meta && item.meta.img"
                  :src="item.meta.img"
                  alt=""
                />
                <span
                  v-if="item.meta && item.meta.title"
                  style="margin-left: 14px"
                  >{{ item.meta.title }}</span
                >
              </template>
              <el-menu-item
                v-for="subItem in item.children"
                :index="subItem.path"
                :key="subItem.path"
              >
                <template slot="title">
                  <img
                    v-if="subItem.meta && subItem.meta.img"
                    :src="subItem.meta.img"
                    alt=""
                  />
                  <span
                    v-if="subItem.meta && subItem.meta.title"
                    style="margin-left: 14px"
                    >{{ subItem.meta.title }}</span
                  >
                </template>
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else :index="item.path" :key="item.path">
              <!-- <img v-if="item.meta && item.meta.img" :src="item.img" alt="" /> -->
              <img :src="item.meta.img" alt="" />
              <span
                v-if="item.meta && item.meta.title"
                style="margin-left: 14px"
                >{{ item.meta.title }}</span
              >
            </el-menu-item>
          </template>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="home" @click="toHome">
          <img src="@/assets/image/home.png" alt="" />
        </div>
        <div style="width: 80%">
          <Tags />
        </div>

        <!-- <div class="choose-tabbar" @click="drawer = true">
          <span>33</span>
        </div> -->
        <el-dropdown trigger="click">
          <div class="user-info">
            <img src="@/assets/image/Group.png" alt="" />
            <span>{{ userName }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="role == 1 || role == 2"
              style="display: flex; align-items: center"
              @click.native="userInfo"
            >
              <img
                src="@/assets/image/Group 122.png"
                style="width: 16px; height: 16px; margin-right: 5px"
                alt=""
              />
              <span style="color: #122073">个人资料</span>
            </el-dropdown-item>
            <el-dropdown-item
              style="display: flex; align-items: center"
              @click.native="accountSet"
            >
              <img
                src="@/assets/image/Group 121.png"
                style="width: 16px; height: 16px; margin-right: 5px"
                alt=""
              />
              <span style="color: #122073">账号设置</span>
            </el-dropdown-item>
            <el-dropdown-item
              style="display: flex; align-items: center"
              @click.native="logout"
            >
              <img
                src="@/assets/image/Group 124.png"
                style="width: 16px; height: 16px; margin-right: 5px"
                alt=""
              />
              <span style="color: #122073">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体区域 -->
      <el-main>
        <router-view />
        <!-- <keep-alive :include="tagsList">
          <router-view></router-view>
        </keep-alive> -->

        <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :with-header="false"
          size="234px"
        >
          <!-- <div
            class="drawer-tag"
            v-for="(item, index) in drawerTags"
            :key="index"
            :style="{ background: currentIndex == index ? '#F7F8FB' : '' }"
            @click="chooseTag(index)"
          >
            <span>{{ item.name }}</span
            ><img
              v-show="currentIndex == index"
              src="@/assets/image/叉6.png"
              alt=""
            />
          </div> -->
        </el-drawer>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Tags from "@/components/tags/Tags";
import TagsDrawer from "@/components/tags/TagsDrawer";
import bus from "@/components/tags/bus";
import { resetRouter } from "@/router/index";
export default {
  name: "Home",
  components: { Tags, TagsDrawer },
  data() {
    return {
      userName: "",
      role: "",
      tagsList: [],
      currentIndex: 0,
      drawer: false,
      editableTabsValue: "2",
      drawerTags: [
        { name: "首页" },
        { name: "可选页签一" },
        { name: "可选页签二" },
        { name: "可选页签三" },
        { name: "可选页签四" },
        { name: "可选页签五" },
      ],
      tabIndex: 2,
      menuListStudent: [
        {
          id: 124,
          name: "欢迎首页",
          path: "welcome",
          img: require("../../assets/image/Group 171.png"),
          children: [],
        },
        {
          id: 125,
          name: "培训实习记录",
          path: "2",
          img: require("../../assets/image/Group 89.png"),
          children: [
            {
              id: 110,
              name: "培训活动",
              path: "train",
              children: [],
            },
            {
              id: 111,
              name: "基础操作实习记录",
              path: "basicope",
              children: [],
            },
            {
              id: 112,
              name: "各科室专科操作实习记录",
              path: "specope",
              children: [],
            },
            {
              id: 113,
              name: "轮转期间学习病种及其例数记录",
              path: "disease",
              children: [],
            },
            {
              id: 114,
              name: "各科室诊疗操作实习记录",
              path: "diagtreat",
              children: [],
            },
            {
              id: 115,
              name: "临床实习学生评教",
              path: "evateach",
              children: [],
            },
            {
              id: 116,
              name: "带教点评",
              path: "reviews",
              children: [],
            },
          ],
        },
        {
          id: 126,
          name: "个人中心",
          path: "3",
          img: require("../../assets/image/Shape (1).png"),
          children: [
            {
              id: 117,
              name: "个人信息",
              path: "profile/detail",
              children: [],
            },
            {
              id: 118,
              name: "账号设置",
              path: "account",
              children: [],
            },
          ],
        },
      ],
      menuListTeacher: [
        {
          id: 124,
          name: "欢迎首页",
          path: "teacher/welcome",
          img: require("../../assets/image/Group 171.png"),
          children: [],
        },
        {
          id: 125,
          name: "学生实习培训",
          path: "teacher/stutrain",
          img: require("../../assets/image/Group 89.png"),
        },
        {
          id: 126,
          name: "个人中心",
          path: "3",
          img: require("../../assets/image/Shape (1).png"),
          children: [
            {
              id: 113,
              name: "个人信息",
              path: "teacher/information",
              children: [],
            },
            {
              id: 114,
              name: "消息通知",
              path: "teacher/notice",
              children: [],
            },
          ],
        },
      ],
      menuListAdmin: [
        {
          id: 1111,
          name: "欢迎首页",
          path: "admin/welcome",
          img: require("../../assets/image/Group 171.png"),
          children: [],
        },
        {
          id: 1112,
          name: "培训实习概况",
          path: "1",
          img: require("../../assets/image/Shape (1).png"),
          children: [
            {
              id: 1113,
              name: "学生实习培训概况",
              path: "admin/stutrain",
              children: [],
            },
            {
              id: 1114,
              name: "带教概况",
              path: "admin/teacherinfo",
              children: [],
            },
            {
              id: 1115,
              name: "考核内容设置",
              path: "admin/checkinfo",
              children: [],
            },
          ],
        },
        {
          id: 1116,
          name: "信息发布",
          path: "admin/infolist",
          img: require("../../assets/image/Group 89.png"),
          children: [],
        },
        {
          id: 1117,
          name: "个人中心",
          path: "2",
          img: require("../../assets/image/Shape (1).png"),
          children: [
            {
              id: 1118,
              name: "基本信息",
              path: "admin/baseinfo",
              children: [],
            },
            {
              id: 1119,
              name: "权限设置",
              path: "admin/authority",
              children: [],
            },
          ],
        },
      ],
      // menuList: [],
    };
  },
  created() {
    this.userName = window.sessionStorage.getItem("username");
    this.role = window.sessionStorage.getItem("role");

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", (msg) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].keepAlive && arr.push(msg[i].keepAlive);
      }
      this.tagsList = arr;
      // console.log(this.tagsList);
    });
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    },
    menuList() {
      return this.$store.state.menuList;
    },
  },
  methods: {
    chooseTag(index) {
      this.currentIndex = index;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    logout() {
      window.sessionStorage.clear();
      resetRouter();
      this.$store.commit("CLEAR_MENU_LIST");
      this.$router.push("/login");
    },
    toHome() {
      if (window.sessionStorage.getItem("role") == 1) {
        this.$router.push({
          path: "/student/welcome",
        });
      } else if (window.sessionStorage.getItem("role") == 2) {
        this.$router.push({
          path: "/teacher/welcome",
        });
      } else {
        this.$router.push({
          path: "/admin/welcome",
        });
      }
    },
    userInfo() {
      if (window.sessionStorage.getItem("role") == 1) {
        this.$router.push({
          path: "/student/profile/index",
        });
      } else if (window.sessionStorage.getItem("role") == 2) {
        this.$router.push({
          path: "/teacher/information/index",
        });
      } else {
      }
    },
    accountSet() {
      if (window.sessionStorage.getItem("role") == 1) {
        this.$router.push({
          path: "/student/account/index",
        });
      } else if (window.sessionStorage.getItem("role") == 2) {
        this.$router.push({
          path: "/teacher/account/index",
        });
      } else {
        this.$router.push({
          path: "/admin/baseinfo",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-aside {
    background-color: #111840;
    box-shadow: 2px 0px 6px rgba(0, 21, 41, 0.2);
    .title-logo {
      width: 100%;
      height: 84px;
      display: flex;
      justify-content: center;
      align-items: center;
      .logo-container {
        width: 52px;
        height: 52px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title-container {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        :nth-child(1) {
          // width: 219px;
          height: 22px;
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 200;
          line-height: 22px;
          color: #ffffff;
          letter-spacing: 6.6px;
          opacity: 1;
        }
        :nth-child(2) {
          // width: 220px;
          height: 30px;
          font-size: 22px;
          font-family: "PingFang SC";
          font-weight: bold;
          // line-height: 30px;
          color: #ffffff;
          opacity: 1;
        }
      }
    }
    .el-menu {
      border-right: none;
      .el-menu-item.is-active {
        background: #5864ff !important;
      }
    }
  }
  .el-container {
    .el-header {
      position: relative;
      height: 84px !important;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      .home {
        width: 46px;
        height: 44px;
        background: #ffffff;
        border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
      }
      .tag {
        width: 151px;
        height: 44px;
        background: rgba(18, 32, 115, 0.03);
        border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        opacity: 1;
        border-radius: 6px;
        padding: 0 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #5864ff;
        margin-right: 10px;
        cursor: pointer;
      }
      .choose-tabbar {
        position: absolute;
        right: 150px;
        width: 34px;
        height: 34px;
        background: #ffffff;
        border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
        // opacity: 1;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 0.85;
        }
      }
      .el-dropdown {
        position: absolute;
        right: 28px;
        .user-info {
          // position: absolute;
          // right: 28px;
          display: flex;
          align-items: center;
          cursor: pointer;
          :nth-child(1) {
            margin-right: 10px;
          }
          :nth-child(2) {
            // width: 54px;
            height: 24px;
            font-size: 18px;
            font-family: "PingFangSC-Regular";
            line-height: 28px;
            color: #122073;
            opacity: 1;
          }
        }
      }
    }
    .el-main {
      background-color: #f6f8fb;
      /deep/.el-drawer {
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
        .drawer-tag {
          height: 40px;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          font-size: 16px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #122073;
          opacity: 1;
          cursor: pointer;
        }
      }
      /deep/.el-drawer:focus {
        outline: none;
      }
    }
  }
}
</style>