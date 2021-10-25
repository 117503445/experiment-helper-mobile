<template>
  <view class="banner-container">
    <view class="banner-logo">
      <slot name="banner-logo"></slot>
    </view>
    <view class="banner-scrolly">
      <ul class="banner-ul" :class="{ banner_top: animate }">
        <li v-for="item in lists" :key="item.id" @tap="showBannerDetail(item)">
          {{ item.title }}
        </li>
      </ul>
    </view>
    <view class="arrow"></view>
  </view>
</template>

<script>
import UserRestClient from "@t117503445/s3-database/user-sdk/userRestClient";

export default {
  data() {
    return {
      animate: false,
      lists: []
    };
  },
  components: {},
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
    },
    showBannerDetail(value) {
      console.log(value);
      let url = "../../pages/banner-index/banner-index?value={{value}}";
      uni.navigateTo({
        url
      });
    }
  },

  async beforeMount() {
    let userRestClient = new UserRestClient(
      "https://experiment-helper-static.oss-cn-hangzhou.aliyuncs.com",
      "announce.json"
    );
    this.lists = await userRestClient.getAll();
    console.log(this.lists);
    setTimeout(this.scrolly, 0);
  }
};
</script>

<style>
.banner-container {
  position: relative;
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
  width: 85%;
  height: 60rpx;
  vertical-align: top;
  border-radius: 4rpx;
  overflow: hidden;
  padding-right: 10rpx;
}
.arrow {
  /* position: absolute;
  right: 0%;
  top: 0%; */
  display: inline-block;
  width: 5%;
  height: 60rpx;
  line-height: 60rpx;
}
.arrow::before {
  content: "";
  font-family: "Linearicons-Free";
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