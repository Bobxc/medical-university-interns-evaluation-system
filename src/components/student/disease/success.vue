<template>
  <div class="success-container">
    <el-card class="success-title-card" shadow="never">
      轮转期间学习病种及其例数记录
    </el-card>
    <el-card class="success-content-card" shadow="never">
      <div class="pic">
        <img src="@/assets/image/组 1810.png" alt="" />
        <span>保存成功</span>
      </div>
      <div class="bottom-btn">
        <div class="go-home-btn" @click="$router.push('/welcome')">返回首页</div>
        <div class="record-btn" @click="$router.push('/disease')">查看记录</div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Success",
};
</script>
<style lang="less" scoped>
.success-container {
  .success-title-card {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "PingFang SC";
    font-weight: 800;
    color: #122073;
    opacity: 1;
    padding: 20px;
    margin-top: 5px;
    box-sizing: border-box;
  }
  .success-content-card {
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    margin: 20px;
    .pic {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 37px;
      margin-bottom: 56px;
      img {
        width: 78px;
        height: 78px;
        margin-bottom: 24px;
      }
      span {
        font-size: 24px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #122073;
        opacity: 1;
      }
    }
    .bottom-btn {
      display: flex;
      .go-home-btn,
      .record-btn {
        width: 105px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        border-radius: 4px;
        font-size: 18px;
        font-family: "PingFang SC";
        font-weight: 400;
        color: #ffffff;
        opacity: 1;
        cursor: pointer;
      }
      .go-home-btn {
        background: #5864ff;
        margin-right: 14px;
      }
      .record-btn {
        background: #d0d2e3;
      }
    }
  }
}
</style>