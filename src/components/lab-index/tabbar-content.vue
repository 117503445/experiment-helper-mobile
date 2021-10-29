<template>
  <view class="tabbar-content-container">
    <view v-for="item in items" :key="item.id">
      <view v-if="item.id == index">
        <template v-for="experiment in item.experiments">
          <view
            v-if="experiments.experiments[experiment.fullName]"
            class="experiment"
            @click="show_experiment(experiment.fullName)"
            :key="experiment.fullName"
          >
            {{ experiment.fullName }}
          </view>
        </template>
      </view>
    </view>

    <view class="author">——为之工作室——</view>
  </view>
</template>

<script>
import js from "../../pages/tabs.json";
import { experiments } from "@t117503445/experiment-helper-core";

export default {
  props: {
    index: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    console.log(experiments);
    return {
      items: js,
      experiments
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
  font-size: 40rpx;
}
.tabbar-content-container .experiment:nth-child(2n + 1) {
  background: #3db8c5;
}
.tabbar-content-container .experiment:nth-child(4n + 2) {
  background: #75a7fd;
}
.tabbar-content-container .experiment:nth-child(4n) {
  background: #2f89c6;
}
.author {
  font-size: 25rpx;
  color: #b5b4b3;
  text-align: center;
  margin-top: 10rpx;
}
</style>