<template>
  <view class="banner-content-container">
    <image :src="details.item.image" mode="aspectFit" class="banner-image" @click="previewImage(details.item.image)">
    </image>
  </view>
</template>

<script>
export default {
  props: {
    details: {
      default: ""
    }
  },
  methods: {
    previewImage(url) {
      uni.previewImage({
        urls: [url]
      });
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
  margin-top: 100rpx;
}
.banner-image {
  width: 100%;
  height: 100%;
}
</style>