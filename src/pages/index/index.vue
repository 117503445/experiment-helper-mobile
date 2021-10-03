<template>
  <view class="content">
    <lab-item v-for="item in items" :properties="item.properties" :type="item.type" :key="item.id"></lab-item>
    <button @click="calculate">计算结果</button>
  </view>
</template>

<script>
import jsonData from "./刚体转动惯量的测量.json";



// TODO UI 限制小数位数
import { getDefaultUIData } from "./binder";
import { calculateUIData } from "./binder";

export default {
  data() {
    let experiment = jsonData;
    // console.log(posToIndex(3, 2, 5));

    return {
      title: "Hello World",
      items: getDefaultUIData(experiment),
      experiment: experiment
    };
  },
  onLoad() {},
  methods: {
    calculate() {
      calculateUIData(this.experiment)
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
