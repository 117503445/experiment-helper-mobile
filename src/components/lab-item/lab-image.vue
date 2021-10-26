<template>
  <view class="lab-image-container">
    <image :src="properties.src" mode="aspectFit" alt=""></image>
  </view>
</template>

<script>
export default {
  props: {
    properties: {
      type: Object,
      default: ""
    }
  }
};
</script>

<style>
.lab-image-container {
  width: 100%;
  margin-top: 20rpx;
}
/* .lab-image-container img {
} */
</style>