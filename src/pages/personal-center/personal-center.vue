<template>
  <view class="personal-center-container">
    <view class="header">
      <img class="header-image" src="../../static/hutao.jpg" alt="" />
      <img class="header-login" src="../../static/qqLogin.png" id="qqLogin" @click="login" />
      <view class="header-tabbar">
        <view @click="currentIndex = 0" :class="{ active: currentIndex == 0 }">你的评论</view>
        <view @click="currentIndex = 1" :class="{ active: currentIndex == 1 }">问题反馈</view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      username: "hutao",
      currentIndex: 0
    };
  },
  methods: {
    login() {
      console.log("qwq");
      QC.Login.showPopup({
        appId: 101980045,
        redirectURI:
          "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101980045&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fexperiment-helper-dev.wizzstudio.com%2F%23%2Fpages%2Fqq-callback"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.personal-center-container {
  height: 1580rpx;
  background: #f7f6f6;
  .header {
    position: relative;
    height: 450rpx;
    background: #ffffff;
    .header-image {
      position: absolute;
      top: 200-65rpx;
      left: 50%;
      transform: translateX(-65rpx);
      height: 130rpx;
      width: 130rpx;
      border-radius: 50%;
    }
    .header-login {
      position: absolute;
      top: 280rpx;
      left: 50%;
      width: 200rpx;
      transform: translateX(-100rpx);
    }
    .header-tabbar {
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 0;
      width: 100%;
      font-size: 30rpx;
      & > view {
        width: 150rpx;
        text-align: center;
        padding-bottom: 20rpx;
      }
      & > .active {
        border-bottom: 5rpx solid #2ecb5a;
      }
    }
  }
}
</style>