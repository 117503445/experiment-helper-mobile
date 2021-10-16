<template name="lab-textbox">
  <view class="uni-flex uni-row lab-textbox">
    <text class="flex-item">{{ properties.text }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-textbox",
  props: ["properties"],
  methods: {}
};
</script>

<style>
.lab-textbox {
  margin: 7px 0px 7px 20px;
}
</style>
