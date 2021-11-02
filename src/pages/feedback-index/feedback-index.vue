<template>
  <view class="feedback-index-container">
    <view class="feedback-text">
      <view class="feedback-title">建议反馈</view>
      <view class="feedback-content">
        <text class="feedback-description" decode="true">
          {{ text }}
        </text>
      </view>
    </view>
    <image class="feedback-image" :src="msg.image" mode="aspectFit" @click="previewImage(msg.image)"></image>
    <p class="qq-group">QQ群:{{ msg.qq }}</p>
    <view class="feedback-tips">
      <view>
        <p class="tap">也可以</p>
        <a class="tap" href="https://qm.qq.com/cgi-bin/qm/qr?k=WKBEf4In2yBIwYLB9eIMnQYm_lTdnyfC&jump_from=webapi"
          >点击跳转至QQ</a
        >
        <p class="tap">直接进入群聊</p>
      </view>
      <view>
        <p class="tap">(好耶，一步到位新方法，抱紧研发大腿)</p>
      </view>
    </view>
  </view>
</template>

<script>
import { UserClient } from "@t117503445/s3-database/user/UserClient";

export default {
  data() {
    return {
      msg: "",
      text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"XDU物理实验小助手"是由西电为之工作室开发的项目，旨在为西电学子提供更便捷的服务，为之也会持续更新完善，如果你在使用时 遇到任何问题，欢迎联系我们。可以扫描二维码添加我们的QQ群和大家一起让小助手变得更好'
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

<style scoped>
.feedback-index-container {
  text-align: center;
  margin-top: 100rpx;
}
.feedback-title {
  font-size: 40rpx;
  margin: 40rpx 0 20rpx 0;
}
.feedback-content text {
  display: inline-block;
  font-size: 32rpx;
  font-weight: 530;
  margin: 20rpx 60rpx 20rpx 60rpx;
  text-align: left;
}
.feedback-image {
  height: 290rpx;
  width: 290rpx;
}
.qq-group {
  display: block;
  font-size: 33rpx;
  color: #cccccc;
  margin-bottom: 10rpx;
}
.feedback-tips {
  margin-top: 30rpx;
}
.feedback-tips .tap {
  display: inline-block;
  font-size: 28rpx;
  color: black;
  margin-bottom: 10rpx;
}
.feedback-tips a {
  font-size: 35rpx !important;
  color: dodgerblue !important;
  margin: 0 10rpx 0 10rpx;
}
</style>
