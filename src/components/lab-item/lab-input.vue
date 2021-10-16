<template name="lab-input">
  <view class="uni-flex uni-row lab-input">
    <text class="flex-item">{{ properties.frontText }}</text>
    <input class="input-compute" type="digit" v-model="properties.value" :placeholder="properties.default" />
    <text class="flex-item">{{ properties.backText }}</text>
  </view>
</template>

<script>
export default {
  name: "lab-input",
  props: ["properties"],
  methods: {}
};
</script>

<style>
.lab-input {
  margin: 7px 0px 7px 20px;
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
