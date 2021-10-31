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
    <Tabbar-content :index="currentIndex"></Tabbar-content>
  </view>
</template>

<script>
import js from "../../pages/tabs";
import TabbarContent from "../lab-index/tabbar-content.vue";

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
    TabbarContent
  }
};
</script>

<style>
.tabbar-container .tabbar {
  display: inline-block;
  text-align: center;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
}
.active {
  color: #65d886;
  border-bottom: 6rpx solid #65d886;
}
</style>