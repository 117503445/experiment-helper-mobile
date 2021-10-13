<template name="lab-table">
  <!--  <swiper> -->

  <view class="lab-table-container">
    <scroll-view scroll-x="true">
      <uni-grid style="width: 600px" :column="properties.width" :square="false">
        <uni-grid-item
          v-for="item in properties.values"
          style="min-height: 20px; height: 20px; text-align: center"
          :key="item.id"
        >
          <input type="text" v-model="item.value" />
        </uni-grid-item>
      </uni-grid>
      <!-- 撑开scroll -->
      <view class="scroll-box"></view>
    </scroll-view>
  </view>
</template>

<script>
import { uniGrid } from "@dcloudio/uni-ui";
import { uniGridItem } from "@dcloudio/uni-ui";

export default {
  name: "lab-table",
  props: ["properties"],
  methods: {},
  components: { uniGrid, uniGridItem }
};
</script>

<style scoped>
input {
  display: inline-block;
}
.scroll-box {
  height: 10px;
}
</style>
