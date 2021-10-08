<template>
  <view class="content">
    <lab-item v-for="item in items" :properties="item.properties" :type="item.type" :key="item.id"></lab-item>
    <button @click="calculate">计算结果</button>
  </view>
</template>

<script>
import jsonData from "./刚体转动惯量的测量.json";

// TODO UI 限制小数位数
import { Binder, util } from "experiment-helper-core";

export default {
  data() {
    let experiment = jsonData;

    let binder = new Binder.Binder(experiment);
    let uiData = binder.getLabItems();
    util.p(uiData);
    return {
      title: "Hello World",
      items: uiData,
      experiment: experiment,
      binder: binder
    };
  },
  onLoad() {},
  methods: {
    calculate() {
      util.p("uiData", this.items);
      util.p("experiment", this.experiment);
      this.binder.calculateLabItems(this.binder.getStdInput(this.items), this.items);
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
