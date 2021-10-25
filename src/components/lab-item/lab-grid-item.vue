<template>
  <view class="lab-grid-container" :style="gridHeight">
    <view class="lab-grid">
      <view v-for="column in properties.columns" :key="column.id">
        <view class="column-box" hover-class="input_now" v-for="item in column.grids" :key="item.id">
          <view>
            <input
              type="text"
              disabled="true"
              v-model="item.value"
              v-if="item.type === 'constant' || item.type === 'output'"
              :style="{ width: gridWidth[column.id] }"
            />
            <input
              type="digit"
              v-model="item.value"
              v-else-if="item.type === 'input' || item.type === 'variable'"
              :placeholder="item.default"
              :class="{
                input_value: item.value != '',
                input_default: item.value == ''
              }"
              :style="{ width: gridWidth[column.id] }"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["properties"],
  data() {
    return {
      gridWidth: [],
      gridHeight: this.properties.height * 70 + "rpx"
    };
  },
  beforeMount() {
    for (let i = 0; i < this.properties.columns.length; i++) {
      let maxWidth = 0;

      let arr = this.properties.columns[i].grids;

      for (let j = 0; j < arr.length; j++) {
        if (arr[j].value) {
          maxWidth = Math.max(maxWidth, arr[j].value.toString().length);
        }
        if (arr[j].default) {
          maxWidth = Math.max(maxWidth, arr[j].default.toString().length);
        }
      }
      this.gridWidth[i] = maxWidth * 20 + 40 + "rpx";
    }
  }
};
</script>

<style>
.lab-grid {
  display: flex;
  flex: 1;
}
.column-box {
  text-align: center;
  border: 1rpx solid black;
}
.column-box input {
  height: 50rpx;
  min-width: 130rpx;
  padding: 12rpx 12rpx;
  font-size: 13px;
}
</style>