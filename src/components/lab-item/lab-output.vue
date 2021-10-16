<template name="lab-output">
  <view class="uni-flex uni-row lab-output">
    <text class="flex-item">{{ properties.frontText }}</text>
    <text class="flex-item output">{{ properties.value }}</text>
    <text class="flex-item">{{ properties.backText }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-output",
  props: ["properties"],
  methods: {}
};
</script>

<style>
.lab-output {
  margin: 7px 0px 7px 20px;
}
.output {
  margin: 0 3px;
}
</style>
