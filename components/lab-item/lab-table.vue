<template name="lab-table">
  <uni-grid
    style="width: 300px; height: 300px"
    :column="properties.width"
    :square="false"
  >
    <uni-grid-item
      v-for="item in properties.values"
      style="min-height: 20px; height: 20px"
      :key="item.id"
    >
      <input
        type="text"
        v-model="item.value"
      />
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
input {
  display: inline-block;
}
</style>
