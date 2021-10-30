<template name="LabItem">
  <view class="lab-item-container">
    <Lab-tablehead v-if="type === 'tablehead'" :properties="properties"></Lab-tablehead>
    <Lab-input v-if="type === 'input'" :properties="properties" />
    <Lab-output v-if="type === 'output'" :properties="properties" />
    <Lab-table v-if="type === 'table'" :properties="properties" />
    <Lab-textbox v-if="type === 'textbox'" :properties="properties" />
    <Lab-image v-if="type === 'image'" :properties="properties"></Lab-image>
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
  name: "LabItem",
  components: { LabTable, LabInput, LabOutput, LabTextbox, LabImage, LabTablehead },
  props: ["properties", "type"],
  methods: {}
};
</script>
<style scoped>
.lab-item-container {
  width: 100%;
}
</style>
