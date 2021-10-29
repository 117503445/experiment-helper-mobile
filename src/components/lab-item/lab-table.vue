<template name="lab-table">
  <!--  <swiper> -->

  <view class="lab-table-container">
    <scroll-view scroll-x="true" class="scroll-size">
      <LabGridItem :properties="properties"> </LabGridItem>
      <view class="scroll-box"></view>
    </scroll-view>
  </view>
</template>

<script>
/* import { uniGrid } from "@dcloudio/uni-ui";
import { uniGridItem } from "@dcloudio/uni-ui"; */
import LabGridItem from "./lab-grid-item.vue";

export default {
  name: "lab-table",
  props: ["properties"],
  methods: {},
  components: { LabGridItem }
};
</script>

<style scoped>
.lab-table-container {
  width: 95%;
  margin: 0 20rpx 0 20rpx;
}
.scroll-size {
  width: 100%;
}

.scroll-box {
  height: 13rpx;
}
</style>
