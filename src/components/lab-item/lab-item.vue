<template name="lab-item">
  <view>
    <lab-input v-if="type === 'input'" :properties="properties" />
    <lab-output v-if="type === 'output'" :properties="properties" />
    <lab-table v-if="type === 'table'" :properties="properties" />
    <lab-textbox v-if="type === 'textbox'" :properties="properties" />
  </view>
</template>

<script>
import LabInput from "./lab-input.vue";
import LabOutput from "./lab-output.vue";
import LabTable from "./lab-table.vue";
import LabTextbox from "./lab-textbox.vue";
export default {
  components: { LabTable, LabInput, LabOutput, LabTextbox },
  name: "lab-item",
  props: ["properties", "type"],
  methods: {}
};
</script>
