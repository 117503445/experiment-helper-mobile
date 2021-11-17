<template>
  <view>
    <view v-for="item in userinfo" :key="item.name">
      <view class="header">
        <img :src="item.img" alt="" />
        {{ item.name }}
      </view>
      <view>{{ item.msg }}</view>
      <view class="reply" v-for="reply in item.reply" :key="reply.name">
        <view class="reply-header">
          <img :src="item.img" alt="" />
          {{ item.name }}
        </view>
        <view>{{ item.msg }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userinfo: [
        {
          img: "../../static/hutao.jpg",
          name: "hutao",
          msg: "哈喽",
          reply: ""
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 110rpx;
  width: 100%;
  img {
    height: 100rpx;
    width: 100rpx;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 50rpx;
  }
}
</style>