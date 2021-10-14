<template name="lab-textbox">
  <view class="uni-flex uni-row">
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
.uni-flex {
  margin: 3px 0px 3px 10px;
}
</style>
