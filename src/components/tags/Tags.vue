<template>
  <div class="tags" v-if="showTags">
    <div
      v-for="(item, index) in tagsList"
      :class="{ active: isActive(item.path) }"
      :key="index"
      class="tags-item"
    >
      <router-link :to="item.path" class="tags-li-title">
        {{ item.name }}
      </router-link>
      <span
        class="tags-li-icon"
        style="cursor: pointer"
        @click="closeTags(index)"
        ><i class="el-icon-close"></i
      ></span>
    </div>
  </div>
</template>
<script>
import bus from "./bus";
export default {
  name: "Tags",
  data() {
    return {
      tagsList: [],
    };
  },
  methods: {
    isActive(path) {
      return path == this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path == this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/playinformation");
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/playinformation");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter((item) => {
        return item.path == this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some((item) => {
        return item.path == route.fullPath;
      });
      !isExist &&
        this.tagsList.push({
          name: route.meta.name,
          path: route.fullPath,
          keepAlive: route.meta.keepAlive,
        });
      bus.$emit("tags", this.tagsList);
    },
    handleTags(command) {
      command == "other" ? this.closeOther() : this.closeAll();
      command == "all" ? this.closeAll() : this.closeOther();
    },
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
      console.log(newValue);
    },
  },
  mounted() {
    this.setTags(this.$route);
  },
};
</script>
<style lang="less" scoped>
.tags {
  width: 100%;
  height: 50px;
  // background: cadetblue;
  display: flex;
  white-space: nowrap;
  overflow: auto;
  .tags-item {
    flex-shrink: 0;
    margin-left: 50px;
    background: rgba(18, 32, 115, 0.03);
    border: 1px solid rgba(18, 32, 115, 0.0392156862745098);
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 6px;
    .tags-li-title {
      margin-right: 10px;
    }
  }
}
.tags-item.active {
  background: #fff;
  color: #5864ff;

  border: 1px solid rgba(18, 32, 115, 0.07058823529411765);
}
.tags-item.active .tags-li-title {
  color: #5864ff;
}
.tags::-webkit-scrollbar {
  /*滚动条整体样式*/
  height: 7px;
  width: 10px;
}
.tags::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  border-radius: 9px;
  background: #e3e4ee;
}
.tags::-webkit-scrollbar-track {
  /*滚动条里面轨道背景*/
  border-radius: 10px;
}
</style>>
