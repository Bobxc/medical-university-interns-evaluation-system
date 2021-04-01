<template>
  <div>
    <router-view />
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
  </div>
</template>
<script>
import bus from "@/components/tags/bus";
export default {
  name: "AdminProfile",
  data() {
    return {
      tagsList: [],
    };
  },
  watch: {
    $route(newValue, oldValue) {
      console.log(newValue);
    },
  },
};
</script>