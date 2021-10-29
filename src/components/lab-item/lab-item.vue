<template name="lab-item">
  <view class="lab-item-container">
    <lab-tablehead v-if="type === 'tablehead'" :properties="properties"></lab-tablehead>
    <lab-input v-if="type === 'input'" :properties="properties" />
    <lab-output v-if="type === 'output'" :properties="properties" />
    <lab-table v-if="type === 'table'" :properties="properties" />
    <lab-textbox v-if="type === 'textbox'" :properties="properties" />
    <lab-image v-if="type === 'image'" :properties="properties"></lab-image>
  </view>
</template>
<script>
import LabInput from "./lab-input.vue";
import LabOutput from "./lab-output.vue";
import LabTable from "./lab-table.vue";
import LabTextbox from "./lab-textbox.vue";
import LabImage from "./lab-image.vue";
import LabTablehead from "./lab-tablehead.vue";

export default {
  components: { LabTable, LabInput, LabOutput, LabTextbox, LabImage, LabTablehead },
  name: "lab-item",
  props: ["properties", "type"],
  methods: {}
};
</script>
<style scoped>
.lab-item-container {
  width: 100%;
}
</style>
