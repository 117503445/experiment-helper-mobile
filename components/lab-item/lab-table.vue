<template name="lab-table">
  <uni-grid :column="3" style="width: 200px; height: 100px" :square="false">
    <uni-grid-item>
      <text class="text">文本</text>
    </uni-grid-item>
    <uni-grid-item>
      <text class="text">文本</text>
    </uni-grid-item>
    <uni-grid-item>
      <text class="text">文本</text>
    </uni-grid-item>
    <uni-grid-item>
      <text class="text">文本</text>
    </uni-grid-item>
    <uni-grid-item>
      <text class="text">文本</text>
    </uni-grid-item>
    <uni-grid-item>
      <text class="text">文本</text>
    </uni-grid-item>
  </uni-grid>
</template>

<script>
export default {
  name: "lab-table",
  props: ["properties"],
  methods: {},
};
</script>

<style>
</style>
