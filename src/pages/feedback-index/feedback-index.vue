<template>
  <view class="feedback-index-container"></view>
</template>

<script>
import UserClient from "@t117503445/s3-database/user/UserClient";

export default {
  onLoad() {
    const userClient = new UserClient("https://experiment-helper-static.oss-cn-hangzhou.aliyuncs.com", "contact.json");
    userClient.get().then(data => {
      console.log(data);
    });
  }
};
</script>

<style></style>
