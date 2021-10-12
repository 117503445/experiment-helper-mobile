<template>
  <view class="content">
    <lab-item v-for="item in items" :properties="item.properties" :type="item.type" :key="item.id"></lab-item>
    <button @click="calculate">计算结果</button>
  </view>
</template>

<script>
import { Binder, util, experiments } from "experiment-helper-core";

import js from "./debug.json";

export default {
  data() {
    util.p(experiments);
    let experiment = js;

    let binder = new Binder.Binder(experiment);
    let items = binder.getLabItems();
    util.p(items);
    return {
      title: "Hello World",
      items: items,
      experiment: experiment,
      binder: binder
    };
  },
  onLoad() {},
  methods: {
    calculate() {
      util.p("items", this.items);
      util.p("experiment", this.experiment);
      let stdInput = this.binder.getStdInput(this.items);
      this.binder.calculateLabItems(stdInput, this.items);
    }
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-area {
  display: flex;
  justify-content: center;
}
</style>
