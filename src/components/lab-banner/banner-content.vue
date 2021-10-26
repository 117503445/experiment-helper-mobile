<template>
  <view class="banner-content-container">
    <image :src="details.image" mode="aspectFill" class="banner-image"> </image>
  </view>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: ""
    }
  },
  onLoad() {
    console.log(this.details);
  }
};
</script>

<style>
.banner-content-container {
  height: 1000rpx;
}
.banner-image {
  width: 100%;
  height: 100%;
}
</style>