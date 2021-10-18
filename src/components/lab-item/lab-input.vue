<template name="lab-input">
  <view class="uni-flex uni-row lab-input">
    <text class="flex-item">{{ properties.frontText }}</text>
    <input class="input-compute" type="digit" v-model="properties.value" :placeholder="properties.default" />
    <text class="flex-item">{{ properties.backText }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-input",
  props: ["properties"],
  methods: {}
};
</script>

<style>
.lab-input {
  margin: 12rpx 0rpx 12rpx 30rpx;
}
.input-compute {
  display: inline-flex;
  width: 150rpx;
  margin: 5rpx;
  text-align: center;
  border: 1rpx solid gray;
  border-radius: 5rpx;
}
</style>
