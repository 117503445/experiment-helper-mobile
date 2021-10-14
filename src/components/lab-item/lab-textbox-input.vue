<template name="lab-textbox-input">
  <view class="uni-flex uni-row lab-text-input">
    <text class="flex-item">{{ properties.frontText }}</text>
    <input class="input-compute" type="text" v-model="properties.value" />
    <text class="flex-item">{{ properties.backText }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-textbox-input",
  props: ["properties"],
  methods: {}
};
</script>

<style>
.lab-text-input {
  margin: 3px 0px 3px 10px;
}
.input-compute {
  display: inline-flex;
  width: 60px;
  margin: 2px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
