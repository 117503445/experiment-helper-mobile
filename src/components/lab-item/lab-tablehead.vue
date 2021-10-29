<template>
  <view class="lab-tablehead-container">
    <view class="table-head">{{ properties.text }}</view>
  </view>
</template>

<script>
export default {
  props: ["properties"]
};
</script>

<style>
.lab-tablehead-container .table-head {
  font-weight: 700;
  font-size: 40rpx;
  margin: 40rpx 0 10rpx 30rpx;
}
</style>