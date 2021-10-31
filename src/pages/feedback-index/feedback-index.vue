<template>
  <view class="feedback-index-container">
    <view class="feedback-text">
      <view class="feedback-title">建议反馈</view>
      <view class="feedback-content">
        <p>"XDU物理实验小助手"是由西电为之工作室开发</p>
        <p>的项目，旨在为西电学子提供更便捷的服务</p>
        <p>为之也会持续更新完善，如果你在使用时</p>
        <p>遇到任何问题，欢迎联系我们</p>
        <p>联系邮箱:</p>
        <p>{{ msg.email }}</p>
        <p>联系微信:</p>
        <p>{{ msg.wechat }}</p>
        <p>或者添加我们的QQ群和大家一起让小助手变得更好</p>
      </view>
    </view>
    <image class="feedback-image" :src="msg.image" mode="aspectFit" @click="previewImage(msg.image)"></image>
    <view class="feedback-tips">
      <p>QQ群:{{ msg.qq }}</p>
      <p>长按图片识别二维码</p>
      <p>进入群聊</p>
    </view>
  </view>
</template>

<script>
import UserClient from "@t117503445/s3-database/user/UserClient";

export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    previewImage(url) {
      uni.previewImage({
        urls: [url]
      });
    }
  },
  onLoad() {
    const userClient = new UserClient("https://experiment-helper-static.oss-cn-hangzhou.aliyuncs.com", "contact.json");
    userClient.get().then((data) => {
      this.msg = data;
    });
  }
};
</script>

<style>
.feedback-index-container {
  text-align: center;
  margin-top: 100rpx;
}
.feedback-title {
  font-size: 35rpx;
  margin: 40rpx 0 20rpx 0;
}
.feedback-content p {
  font-size: 28rpx;
  margin-bottom: 10rpx;
}
.feedback-image {
  height: 250rpx;
  width: 250rpx;
}
.feedback-tips p {
  font-size: 23rpx;
  color: #cccccc;
  margin-bottom: 10rpx;
}
</style>
