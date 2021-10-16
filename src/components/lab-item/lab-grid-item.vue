<template>
  <view>
    <scroll-view scroll-x="true">
      <view class="lab-grid">
        <view v-for="column in showArr" :key="column.id">
          <view class="column-box" v-for="item in column" :key="item.id">
            <view>
              <input
                type="text"
                disabled="true"
                v-if="item.type === 'constant' || item.type === 'output'"
                v-model="item.value"
                :value="item.value"
                :placeholder="item.default"
                :style="{ width: gridWidth[column.id] }"
              />
              <input
                type="digit"
                v-else-if="item.type === 'input'"
                v-model="item.value"
                :value="item.value"
                :placeholder="item.default"
                :style="{ width: gridWidth[column.id] }"
              />
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: ["properties"],
  data() {
    let width = this.properties.width;
    let height = this.properties.height;

    let arr = new Array(height);
    let showArr = new Array(width);
    let count = 0;

    console.log(this.properties.grids);
    /* conten transform into two demension array */
    for (let i = 0; i < height; i++) {
      arr[i] = new Array(width);
      arr[i] = { id: i };
      for (let j = 0; j < width; j++) {
        arr[i][j] = new Proxy(this.properties.grids[count], {});
        count++;
      }
    }
    /* reserve arr */
    for (let j = 0; j < width; j++) {
      showArr[j] = new Array(height);
      showArr[j] = { id: j };
      for (let i = 0; i < height; i++) {
        showArr[j][i] = new Proxy(arr[i][j], {});
      }
    }

    let gridWidth = new Array(width);
    let totalWidth = 0;
    for (let j = 0; j < width; j++) {
      let maxString = 0;
      for (let i = 0; i < height; i++) {
        maxString = Math.max(maxString, arr[i][j].value.toString().length);
      }
      gridWidth[j] = maxString * 10 + 40 + "px";
      totalWidth += maxString;
    }
    return {
      width,
      height,
      showArr,
      gridWidth
    };
  },
  methods: {}
};
</script>

<style>
.lab-grid {
  display: flex;
  flex: 1;
  width: 1500rpx;
}
.lab-grid input {
  /* box-sizing: border-box; */

  width: 100%;
}
.column-box {
  /* height: 20px; */
  margin: 5px 10px;
  text-align: center;
}
</style>