<template>
  <view class="tabbar-content-container">
    <view v-for="item in items" :key="item.id">
      <view v-if="item.id == index">
        <view
          class="experiment"
          v-for="experiment in item.experiments"
          :key="experiment.fullName"
          @click="show_experiment(experiment.fullName)"
        >
          {{ experiment.fullName }}
        </view>
      </view>
    </view>

    <view class="author">——为之工作室——</view>
  </view>
</template>

<script>
import js from "../../pages/tabs.json";

export default {
  props: {
    index: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      items: js
    };
  },
  methods: {
    show_experiment(experimentName) {
      console.log("跳转");
      let url = "../../pages/lab-index/lab-index?experimentName=" + experimentName;
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>

<style>
.tabbar-content-container .experiment {
  box-sizing: border-box;
  /* width: 90%; */
  height: 200rpx;
  line-height: 200rpx;
  text-align: center;
  color: #ffffff;
  margin: 20rpx 20rpx 0 20rpx;
  border-radius: 20rpx;
}
.tabbar-content-container .experiment:nth-child(odd) {
  background: #99bad7;
}
.tabbar-content-container .experiment:nth-child(even) {
  background: #587c9b;
}
.author {
  font-size: 25rpx;
  color: #b5b4b3;
  text-align: center;
  margin-top: 10rpx;
}
</style>