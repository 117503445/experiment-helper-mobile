<template>
  <view class="banner-container">
    <view class="banner-logo">
      <image
        class="banner-logo"
        src="https://experiment-helper-static.oss-cn-hangzhou.aliyuncs.com/images/logo.jpeg"
        mode="aspectFit"
      ></image>
    </view>
    <view class="banner-scrolly">
      <span class="banner-span">|</span>
      <ul class="banner-ul" :class="{ banner_top: animate }">
        <li v-for="item in lists" :key="item.id" @click="showBannerDetail({ item })">
          {{ item.title }}
        </li>
      </ul>
      <view class="arrow"></view>
    </view>
  </view>
</template>

<script>
import UserRestClient from "@t117503445/s3-database/user/UserRestClient";

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
        setTimeout(this.scrolly, 1000);
      }, 2000);
    },
    showBannerDetail(value) {
      console.log(value, "qwq");
      let url = "../../pages/banner-index/banner-index?value=" + JSON.stringify(value);
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
    console.log("banner lists", this.lists);
    setTimeout(this.scrolly, 0);
  }
};
</script>

<style>
.banner-container {
  position: relative;
  height: 60rpx;
  line-height: 60rpx;
  border: 1px solid black;
  border-radius: 30rpx;
  margin: 20rpx 5rpx 5rpx 5rpx;
  padding-bottom: 1rpx;
}
.banner-logo {
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  vertical-align: top;
  text-align: center;
  border-radius: 50%;
  /*   background: pink; */
}
.banner-scrolly {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 90%;
  height: 60rpx;
  vertical-align: top;
  border-radius: 4rpx;
  overflow: hidden;
}
.banner-span {
  display: inline-block;
  height: 60rpx;
  width: 2%;
  color: #cccccc;
}
.banner-ul {
  height: 60rpx;
  width: 98%;
  line-height: 60rpx;
  box-sizing: border-box;
  display: inline-block;
  /* text-align: center; */
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
  color: #000000;
  list-style: none;
}
.arrow {
  z-index: -1;
  position: absolute;
  right: 0;
  top: 0;
  display: inline-block;
  width: 5%;
  height: 60rpx;
  line-height: 60rpx;
}
.arrow::before {
  content: "";
  font-family: "Linearicons-Free";
}
</style>
