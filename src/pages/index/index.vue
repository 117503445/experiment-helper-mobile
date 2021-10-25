<template>
  <view>
    <Banner></Banner>
    <Tabbar></Tabbar>
  </view>
</template>

<script>
import Banner from "../../components/lab-banner/banner.vue";
import Tabbar from "../../components/lab-index/tabbar.vue";

export default {
  data() {
    return {
      bannerContent: []
    };
  },
  components: {
    Banner,
    Tabbar
  },
  methods: {},
  async onLoad() {}
};
</script>

<style>
</style>