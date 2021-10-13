<template name="lab-item">
  <view>
    <lab-textbox-input v-if="type === 'input-textbox'" :properties="properties" />
    <lab-textbox-output v-if="type === 'output-textbox'" :properties="properties" />
    <lab-table v-if="type === 'table'" :properties="properties" />
  </view>
</template>

<script>
import labTextboxInput from "./lab-textbox-input.vue";
import labTextboxOutput from "./lab-textbox-output.vue";
import LabTable from "./lab-table.vue";
export default {
  components: { LabTable, labTextboxInput, labTextboxOutput },
  name: "lab-item",
  props: ["properties", "type"],
  methods: {}
};
</script>

