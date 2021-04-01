<template>
  <div class="default-container">
    <el-card class="default-title-card" shadow="never">
      轮转期间学习病种及其例数记录
    </el-card>
    <el-card class="default-content-card" shadow="never">
      <div class="pic">
        <img src="@/assets/image/组 18101.png" alt="" />
        <span>保存失败</span>
      </div>
      <div class="prompt">请核对并修改以下信息后，再重新提交。</div>
      <div class="directions">
        <span>1.您的账户已被冻结 </span>
        <span>2.您的账户还不具备申请资格</span>
      </div>
      <div class="back-btn" @click="$router.go(-1)">返回修改</div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Default",
};
</script>
<style lang="less" scoped>
/deep/.el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.default-container {
  .default-title-card {
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
  .default-content-card {
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 20px;
    box-sizing: border-box;
    .pic {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 37px;
      margin-bottom: 24px;
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
    .prompt {
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: rgba(18, 32, 115, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
    }
    .directions {
      width: 876px;
      background: rgba(149, 156, 193, 0.09);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      padding: 18px 35px;
      box-sizing: border-box;
      margin-bottom: 21px;
      span {
        font-size: 14px;
        font-family: "PingFang SC";
        font-weight: 400;
        line-height: 28px;
        color: rgba(18, 32, 115, 0.3);
      }
    }
    .back-btn {
      width: 105px;
      height: 42px;
      background: #5864ff;
      opacity: 1;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-family: 'PingFang SC';
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>