<template name="lab-textbox-input">
  <view class="uni-flex uni-row">
    <text class="flex-item">{{ properties.frontText }}</text>
    <input type="text" v-model="properties.value" />
    <text class="flex-item">{{ properties.backText }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-textbox-input",
  props: ["properties"],
  methods: {},
};
</script>

<style>
input {
  display: inline-flex;
}
</style>
