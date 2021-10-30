<template>
  <view class="lab-feedback-container" @click="showFeedbackIndex">
    <span class="feedback-content">问题 <br />反馈</span>
  </view>
</template>

<script>
export default {
  methods: {
    showFeedbackIndex() {
      uni.navigateTo({
        url: "../../pages/feedback-index/feedback-index"
      });
    }
  }
};
</script>

<style>
.lab-feedback-container {
  position: fixed;
  bottom: 5%;
  right: 5%;
  height: 110rpx;
  width: 110rpx;
  border-radius: 50%;
  border: 1rpx solid #959595;
  background-color: rgba(238, 238, 238, 0.4);
}
.feedback-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 110rpx;
  width: 110rpx;
  text-align: center;
  font-size: 30rpx;
}
</style>