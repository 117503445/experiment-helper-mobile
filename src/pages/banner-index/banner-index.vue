<template>
  <view>
    <Banner-content :details="details"></Banner-content>
  </view>
</template>

<script>
import BannerContent from "../../components/lab-banner/banner-content.vue";

export default {
  data() {
    return {
      details: ""
    };
  },
  components: {
    BannerContent
  },
  onLoad(option) {
    this.details = JSON.parse(option.value);
  }
};
</script>

<style>
</style>