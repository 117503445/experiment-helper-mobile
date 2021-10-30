<template>
  <view class="content">
    <view class="lab-title">{{ experimentName }}</view>
    <Lab-item v-for="item in items" :properties="item.properties" :type="item.type" :key="item.id"></Lab-item>
    <view class="lab-warning">数据结果仅供参考，如有差别以实际结果为准</view>

    <view class="content-button">
      <button class="btn-reset btn-style" @click="reset">一键清空</button>
      <button class="btn-compute btn-style" @click="calculate">计算结果</button>
    </view>
    <view class="author">——为之工作室——</view>
    <Lab-feedback></Lab-feedback>
    <view class="space"></view>
  </view>
</template>

<script>
import { Binder, util, experiments } from "@t117503445/experiment-helper-core";
import LabFeedback from "../../components/lab-item/lab-feedback.vue";
import LabItem from "../../components/lab-item/lab-item.vue";

export default {
  components: {
    LabFeedback,
    LabItem
  },
  data() {
    /* util.p(experiments); */
    return {
      items: "",
      experiment: "",
      binder: "",
      experiments: experiments,
      experimentName: ""
    };
  },
  methods: {
    calculate() {
      /* util.p(this.items); */
      this.items = this.binder.calculateLabItems(this.items);
    },
    reset() {
      this.items = this.binder.getLabItems(false);
      /* console.log(this.items); */
    }
  },
  onLoad(option) {
    this.experimentName = option.experimentName;
    this.experiment = this.experiments.experiments[option.experimentName];
    this.binder = new Binder.Binder(this.experiment);
    console.log(this.experiments.experiments[option.experimentName]);
    try {
      const value = uni.getStorageSync(this.experimentName);
      console.log("onLoad");
      console.log(value);
      if (value) {
        console.log("success");
        this.items = value;
        console.log(this.items);
      } else {
        console.log("failure");
        this.items = this.binder.getLabItems(true);
      }
    } catch (e) {
      //error
    }
  },
  onShow() {},
  onUnload() {
    try {
      uni.setStorageSync(this.experimentName, this.items);
    } catch (e) {
      //error
    }
  }
};
</script>

<style>
.content {
  position: relative;
  font-size: 13px;
  width: 100%;
}
.content .lab-title {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-weight: 500;
  font-size: 40rpx;
  margin-top: 10rpx;
}
.content-button {
  display: flex;

  justify-content: space-between;

  margin-top: 20px;
}
.content-button .btn-style {
  flex-basis: 40%;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  font-size: 30rpx;
  color: #ffffff;
}

.content-button .btn-reset {
  background: orange;
}
.content-button .btn-compute {
  background: rgb(142, 201, 55);
}
.text-area {
  display: flex;
  justify-content: center;
}
.lab-warning {
  width: 100%;
  text-align-last: center;
  color: #f74a4a;
  font-size: 25rpx;
  margin-top: 20rpx;
}
.author {
  font-size: 25rpx;
  color: #b5b4b3;
  text-align: center;
  margin-top: 10rpx;
}
.content .space {
  height: 300rpx;
}
</style>
