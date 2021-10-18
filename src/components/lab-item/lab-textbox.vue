<template name="lab-textbox">
  <view class="uni-flex uni-row lab-textbox">
    <text class="flex-item">{{ properties.text }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-textbox",
  props: ["properties"],
  methods: {}
};
</script>

<style>
.lab-textbox {
  margin: 12rpx 0rpx 12rpx 30rpx;
}
</style>
