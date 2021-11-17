<template>
  <view class="banner-content-container">
    <image :src="details.item.image" mode="aspectFit" class="banner-image" @click="previewImage(details.item.image)">
    </image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      details: ""
    };
  },
  methods: {
    previewImage(url) {
      uni.previewImage({
        urls: [url]
      });
    }
  },
  onLoad(option) {
    console.log(option);
    this.details = JSON.parse(option.value);
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