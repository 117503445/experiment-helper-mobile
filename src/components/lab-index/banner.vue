<template>
  <view class="banner-container">
    <view class="banner-logo">
      <slot name="banner-logo"></slot>
    </view>
    <view class="banner-scrolly">
      <ul class="banner-ul" :class="{ banner_top: animate }">
        <li v-for="item in lists" :key="item.id">
          {{ item.value }}
        </li>
      </ul>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      animate: false,
      lists: [
        {
          id: 1,
          value: 111111
        },
        {
          id: 2,
          value: 222222
        },
        {
          id: 3,
          value: 333333
        }
      ]
    };
  },
  methods: {
    scrolly() {
      this.animate = true;

      setTimeout(() => {
        let cur = this.lists[0];
        this.lists.shift();
        this.lists.push(cur);

        this.animate = false;
        setTimeout(this.scrolly, 3000);
      }, 3000);
    }
  },
  beforeMount() {
    setTimeout(this.scrolly, 0);
  }
};
</script>

<style>
.banner-container {
  height: 60rpx;
  line-height: 50rpx;
  border: 1px solid black;
  border-radius: 30rpx;
  margin: 20rpx 5rpx 5rpx 5rpx;
  padding-bottom: 1rpx;
}
.banner-logo {
  display: inline-block;
  width: 10%;
  height: 60rpx;
  vertical-align: top;
  text-align: center;
  border-radius: 50%;
  background: pink;
}
.banner-logo::after {
  content: "|";
  color: #cecac8;
  margin-left: 10rpx;
}
.banner-scrolly {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: 90%;
  height: 60rpx;
  vertical-align: top;
  border-radius: 4rpx;
  overflow: hidden;
}
.banner-ul {
  height: 60rpx;
  line-height: 60rpx;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  vertical-align: top;
}
.banner_top {
  color: #cecac8;
  transition: all 1s linear;
  margin-top: -60rpx;
}
.banner-ul li {
  height: 100%;
  font-size: 30rpx;
  font-weight: 400;
  color: #ff7a39;
  list-style: none;
}
</style>