<template>
  <view class="tabbar-container">
    <view
      class="tabbar"
      :style="{ width: 100 / items.length + '%' }"
      v-for="item in items"
      :key="item.id"
      :class="{ active: currentIndex == item.id }"
      @tap="changeIndex(item.id)"
    >
      {{ item.tab }}
    </view>
    <Tannar-content :index="currentIndex"></Tannar-content>
  </view>
</template>

<script>
import js from "../../pages/tabs";
import TannarContent from "../lab-index/tabbar-content.vue";

export default {
  data() {
    let experiment = js;

    return {
      items: experiment,
      currentIndex: 0
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    }
  },
  components: {
    TannarContent
  }
};
</script>

<style>
.tabbar-container .tabbar {
  display: inline-block;
  text-align: center;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 40rpx;
}
.active {
  color: #65d886;
  border-bottom: 8rpx solid #65d886;
}
</style>