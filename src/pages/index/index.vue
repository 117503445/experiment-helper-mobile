<template>
  <view class="content">
    <lab-item v-for="item in items" :properties="item.properties" :type="item.type" :key="item.id"></lab-item>
    <view class="content-button">
      <button class="btn-reset" @click="reset">一键清空</button>
      <button class="btn-compute" @click="calculate">计算结果</button>
    </view>
  </view>
</template>

<script>
import { Binder, util, experiments } from "experiment-helper-core";

import js from "./debug.json";

export default {
  data() {
    // util.p(experiments);
    let experiment = js;

    let binder = new Binder.Binder(experiment);
    let items = binder.getLabItems(true);
    return {
      title: "Hello World",
      items: items,
      experiment: experiment,
      binder: binder
    };
  },
  methods: {
    calculate() {
      // util.p(this.binder.getStdInput(this.items));
      this.binder.calculateLabItems(this.items);
      util.p(this.items);
    },
    reset() {
      this.items = this.binder.getLabItems(false);
    }
  }
};
</script>

<style>
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
