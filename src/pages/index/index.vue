<template>
  <view class="content">
    <lab-item v-for="item in items" :properties="item.properties" :type="item.type" :key="item.id"></lab-item>
    <button @click="calculate">计算结果</button>
  </view>
</template>

<script>
import jsonData from "./刚体转动惯量的测量.json";

// TODO UI 限制小数位数
import { getDefaultUIData ,calculateUIData} from "./binder";
import {  p} from "./util";

export default {
  data() {
    let experiment = jsonData;
    p(experiment)
    let uiData = getDefaultUIData(experiment)
    p(uiData)
    p(experiment)

    return {
      title: "Hello World",
      items: uiData,
      experiment: experiment
    };
  },
  onLoad() {},
  methods: {
    calculate() {
      calculateUIData(this.experiment);
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
