<template name="lab-textbox-output">
  <view class="uni-flex uni-row">
    <text class="flex-item">{{ properties.frontText }}</text>
    <text class="flex-item output">{{ properties.value }}</text>
    <text class="flex-item">{{ properties.backText }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-textbox-output",
  props: ["properties"],
  methods: {}
};
</script>

<style>
.uni-flex {
  margin: 3px 0px 3px 10px;
}
.output {
  margin: 0 3px;
}
</style>
