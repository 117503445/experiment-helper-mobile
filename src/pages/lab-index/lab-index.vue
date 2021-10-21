<template>
  <view class="content">
    <view class="lab-title">{{ experimentName }}</view>
    <lab-item v-for="item in items" :properties="item.properties" :type="item.type" :key="item.id"></lab-item>
    <view class="content-button">
      <button class="btn-reset" @click="reset">一键清空</button>
      <button class="btn-compute" @click="calculate">计算结果</button>
    </view>
  </view>
</template>

<script>
import { Binder, util, experiments } from "experiment-helper-core";

export default {
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
      /* util.p("stdOutput", this.binder.getStdOutput(this.items)); */

      // util.p(this.binder.getStdInput(this.items));
      util.p(this.items);
      this.items = this.binder.calculateLabItems(this.items);
    },
    reset() {
      this.items = this.binder.getLabItems(false);
      /* console.log(this.items); */
    }
  },
  components: {},
  onLoad: function (option) {
    this.experimentName = option.experimentName;
    this.experiment = this.experiments.experiments[option.experimentName];
    this.binder = new Binder.Binder(this.experiment);
    this.items = this.binder.getLabItems(true);
  }
};
</script>

<style>
.content {
  font-size: 13px;
}
.content .lab-title {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-weight: 600;
  margin-top: 20rpx;
}
.content-button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.content-button .btn-reset {
  color: #ffffff;
  background: orange;
}
.content-button .btn-compute {
  color: #ffffff;
  background: rgb(142, 201, 55);
}
.text-area {
  display: flex;
  justify-content: center;
}
</style>
