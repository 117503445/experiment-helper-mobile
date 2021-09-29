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
      <input type="text" v-model="item.value" />
    </uni-grid-item>
  </uni-grid>
</template>

<script>
import { uniGrid } from "@dcloudio/uni-ui";
import { uniGridItem } from "@dcloudio/uni-ui";

export default {
  name: "lab-table",
  props: ["properties"],
  methods: {},
  components: { uniGrid, uniGridItem },
};
</script>

<style>
input {
  display: inline-block;
}
</style>
