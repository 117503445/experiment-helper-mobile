<template name="lab-table">
  <!--  <swiper> -->

  <view class="lab-table-container">
    <scroll-view scroll-x="true">
      <!-- style-width may be error -->
      <uni-grid style="width: 600px" :column="properties.width" :square="false">
        <uni-grid-item
          v-for="item in properties.values"
          style="min-height: 30px; height: 30px; text-align: center"
          :key="item.id"
        >
          <input type="text" v-model="item.value" style="height: 100%; line-height: 10px" />
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
.scroll-box {
  height: 10px;
}
</style>
