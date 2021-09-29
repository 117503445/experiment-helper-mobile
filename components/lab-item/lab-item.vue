<template name="lab-item">
  <view>
    <lab-textbox v-if="type === 'textbox'" :properties="properties" />
    <lab-table v-if="type === 'table'" :properties="properties" />
  </view>
</template>

<script>
import LabTable from "./lab-table.vue";
import LabTextbox from "./lab-textbox.vue";
export default {
  components: { LabTable, LabTextbox },
  name: "lab-item",
  props: ["properties", "type"],
  methods: {},
};
</script>

