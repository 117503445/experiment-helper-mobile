<template>
  <view class="content">
    <lab-item
      v-for="item in items"
      :properties="item.properties"
      :type="item.type"
      :key="item.id"
    ></lab-item>
    <button @click="calculate">计算结果</button>
  </view>
</template>

<script>
export default {
  data() {
    let experiment = {
      meta: {
        name: "平凸透镜曲率半径的测量",
        author: "117503445",
        contributors: [],
        version: "0.0.1",
      },
      logic: {
        functions: {
          this_D_m2_diff:
            "(function(arr){let arr_r = [];for (let i = 0; i < 5; i++) {arr_r.push(arr[i] - arr[i + 5]);}return arr_r;})",
        },
        variables: [
          {
            name: "d_yiqi",
            comment: "仪器不确定度",
            source: {
              type: "input",
              default: 0.004,
            },
          },
          {
            name: "λ",
            comment: "波长",
            source: {
              type: "input",
              default: 589.3,
            },
          },
          {
            name: "D_l",
            comment: "D 左",
            source: {
              type: "input",
              default: [
                19.987, 20.069, 20.153, 20.251, 20.348, 20.421, 20.523, 20.625,
                20.728, 20.831,
              ],
            },
          },
          {
            name: "D_r",
            comment: "D 右",
            source: {
              type: "input",
              default: [
                27.138, 27.061, 26.971, 26.866, 26.783, 26.685, 26.595, 26.487,
                26.379, 26.268,
              ],
            },
          },
          {
            name: "D_m",
            comment: "m 级 暗环直径",
            source: {
              type: "mathjs",
              expression: "D_r-D_l",
            },
          },
          {
            name: "D_m2",
            comment: "m 级 暗环直径的平方",
            source: {
              type: "mathjs",
              expression: "D_m.^2",
            },
          },
          {
            name: "D_m2_diff",
            comment: "m 级 暗环直径的平方的差分",
            source: {
              type: "mathjs",
              expression: "this_D_m2_diff(D_m2)",
            },
          },
          {
            name: "D_m2_diff_a",
            comment: "m 级 暗环直径的平方的差分的平均值 mm^2",
            source: {
              type: "mathjs-suffix",
            },
          },
          {
            name: "D_m2_diff_u",
            comment: "m 级 暗环直径的平方的差分的不确定度 mm^2",
            source: {
              type: "mathjs",
              expression:
                "sqrt(sum((D_m2_diff-mean(D_m2_diff)).^2)/5 + (d_yiqi*sqrt(3))^2)",
            },
          },
          {
            name: "R",
            comment: "曲率半径 m",
            source: {
              type: "mathjs",
              expression: "D_m2_diff_a / (4 * 5 * λ * 0.001)",
            },
          },
          {
            name: "R_u",
            comment: "曲率半径的不确定度 mm",
            source: {
              type: "mathjs",
              expression: "D_m2_diff_u / (4 * 5 * λ) * 1000000",
            },
          },
        ],
      },
      ui: [
        {
          type: "textbox",
          properties: {
            variableName: "d_yiqi",
            frontText: "𝚫仪=",
            backText: "mm",
          },
        },
        {
          type: "textbox",
          properties: {
            variableName: "λ",
            frontText: "λ=",
            backText: " nm",
          },
        },
        {
          type: "table",
          properties: {
            width: 6,
            height: 11,
            binds: [
              {
                type: "constant",
                value: ["暗环/𝑘", "𝐷左", "𝐷右", "𝐷ₘ/𝑚𝑚", "𝐷²ₘ", "𝐷²ₘ-𝐷²ₘ₋₅"],
                start: [1, 1],
                end: [1, 6],
              },
              {
                type: "constant",
                value: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                start: [2, 1],
                end: [11, 1],
              },
              {
                type: "variable",
                name: "D_l",
                start: [2, 2],
                end: [11, 2],
              },
              {
                type: "variable",
                name: "D_r",
                start: [2, 3],
                end: [11, 3],
              },
              {
                type: "variable",
                name: "D_m",
                start: [2, 4],
                end: [11, 4],
              },
              {
                type: "variable",
                name: "D_m2",
                start: [2, 5],
                end: [11, 5],
              },
              {
                type: "variable",
                name: "D_m2_diff",
                start: [2, 6],
                end: [11, 6],
              },
            ],
          },
        },
      ],
    };

    function posToIndex(x, y, width) {
      return y - 1 + (x - 1) * width;
    }
    // console.log(posToIndex(3, 2, 5));

    let uiItems = experiment["ui"];

    let dictNameVariable = {};
    for (const variable of experiment["logic"]["variables"]) {
      dictNameVariable[variable["name"]] = variable;
    }

    for (let i = 0; i < uiItems.length; i++) {
      uiItems[i]["id"] = i;

      if (uiItems[i]["type"] === "textbox") {
        let name = uiItems[i]["properties"]["variableName"];
        uiItems[i]["properties"]["value"] =
          dictNameVariable[name]["source"]["default"];
      } else if (uiItems[i]["type"] === "table") {
        let values = [];
        for (
          let j = 0;
          j <
          uiItems[i]["properties"]["width"] *
            uiItems[i]["properties"]["height"];
          j++
        ) {
          values.push({ id: j, value: "" });
        }
        for (const bind of uiItems[i]["properties"]["binds"]) {
          if (
            bind["type"] == "variable" &&
            dictNameVariable[bind["name"]]["source"]["type"] != "input"
          ) {
            continue;
          }

          let defaultValue;
          if (bind["type"] == "variable") {
            defaultValue = dictNameVariable[bind["name"]]["source"]["default"];
          } else if (bind["type"] == "constant") {
            defaultValue = bind["value"];
          }

          if (bind["start"] == bind["end"]) {
            // todo
          } else if (bind["start"][0] == bind["end"][0]) {
            let x = bind["start"][0];
            for (let j = 0; j < defaultValue.length; j++) {
              let y = bind["start"][1] + j;
              values[posToIndex(x, y, uiItems[i]["properties"]["width"])][
                "value"
              ] = defaultValue[j];
            }
          } else if (bind["start"][1] == bind["end"][1]) {
            let y = bind["start"][1];
            for (let j = 0; j < defaultValue.length; j++) {
              let x = bind["start"][0] + j;
              values[posToIndex(x, y, uiItems[i]["properties"]["width"])][
                "value"
              ] = defaultValue[j];
            }
          } else {
            console.log("start end 不合法", bind);
          }
        }
        uiItems[i]["properties"]["values"] = values;
        console.log("values", JSON.stringify(values));
      }
    }
    return {
      title: "Hello World",
      items: uiItems,
    };
  },
  onLoad() {},
  methods: {
    calculate() {
      console.log(JSON.stringify(this.items));
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-area {
  display: flex;
  justify-content: center;
}
</style>
