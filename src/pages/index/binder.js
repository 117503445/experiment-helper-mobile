// TODO UI 限制小数位数
import { execute } from "./executor";

function isTextBox(type) {
  return type == "textbox" || type == "input-textbox" || type == "output-textbox";
}

function posToIndex(x, y, width) {
  if (y > width || y < 0) {
    console.error("不合法的 y", y);
  }
  return y - 1 + (x - 1) * width;
}

export function getDefaultUIData(experiment) {
  let dictNameVariable = {};
  for (const variable of experiment["logic"]["variables"]) {
    dictNameVariable[variable["name"]] = variable;
  }

  let uiItems = experiment["ui"];
  for (let uiItem of uiItems) {
    if (uiItem.type == "textbox") {
      // console.log(JSON.stringify(uiItem));
      if (dictNameVariable[uiItem.properties.variableName].source.type == "input") {
        uiItem.type = "input-textbox";
      } else {
        uiItem.type = "output-textbox";
      }
    }
  }

  for (let i = 0; i < uiItems.length; i++) {
    uiItems[i]["id"] = i;

    if (isTextBox(uiItems[i]["type"])) {
      let name = uiItems[i]["properties"]["variableName"];
      uiItems[i]["properties"]["value"] = dictNameVariable[name]["source"]["default"];
    } else if (uiItems[i]["type"] === "table") {
      let values = [];
      for (let j = 0; j < uiItems[i]["properties"]["width"] * uiItems[i]["properties"]["height"]; j++) {
        values.push({ id: j, value: "" });
      }
      for (const bind of uiItems[i]["properties"]["binds"]) {
        if (bind["type"] == "variable" && dictNameVariable[bind["name"]]["source"]["type"] != "input") {
          continue;
        }

        let defaultValue;
        if (bind["type"] == "variable") {
          defaultValue = dictNameVariable[bind["name"]]["source"]["default"];
        } else if (bind["type"] == "constant") {
          defaultValue = bind["value"];
        }

        if (bind["start"][0] == bind["end"][0] && bind["start"][1] == bind["end"][1]) {
          let x = bind["start"][0];
          let y = bind["start"][1];
          values[posToIndex(x, y, uiItems[i]["properties"]["width"])]["value"] = defaultValue;
        } else if (bind["start"][0] == bind["end"][0]) {
          let x = bind["start"][0];
          for (let j = 0; j < defaultValue.length; j++) {
            let y = bind["start"][1] + j;
            values[posToIndex(x, y, uiItems[i]["properties"]["width"])]["value"] = defaultValue[j]; // todo convert to string
          }
        } else if (bind["start"][1] == bind["end"][1]) {
          let y = bind["start"][1];
          for (let j = 0; j < defaultValue.length; j++) {
            let x = bind["start"][0] + j;
            values[posToIndex(x, y, uiItems[i]["properties"]["width"])]["value"] = defaultValue[j];
          }
        } else {
          console.log("start end 不合法", bind);
        }
      }
      uiItems[i]["properties"]["values"] = values;
      // console.log("values", JSON.stringify(values));
    }
  }
  return uiItems;
}

export function calculateUIData(experiment){
    let std_input = {};

      let dictNameVariable = {};
      for (const variable of experiment["logic"]["variables"]) {
        dictNameVariable[variable["name"]] = variable;
      }

      // console.log(JSON.stringify(items));
      // console.log(JSON.stringify(experiment));
      for (const c of experiment["ui"]) {
        if (isTextBox(c["type"])) {
          std_input[c["properties"]["variableName"]] = c["properties"]["value"];
        } else if (c["type"] == "table") {
          for (const bind of c["properties"]["binds"]) {
            if (bind["type"] != "variable" || dictNameVariable[bind["name"]]["source"]["type"] != "input") {
              continue;
            }
            // console.log("c", JSON.stringify(c));
            let value = [];
            // console.log("bind", JSON.stringify(bind));

            if (bind["start"][0] == bind["end"][0] && bind["start"][1] == bind["end"][1]) {
              let x = bind["start"][0];
              let y = bind["start"][1];
              value = c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"];
            } else if (bind["start"][0] == bind["end"][0]) {
              let x = bind["start"][0];
              for (let j = 0; j < bind["end"][1] - bind["start"][1] + 1; j++) {
                let y = bind["start"][1] + j;
                value.push(c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"]);
              }
            } else if (bind["start"][1] == bind["end"][1]) {
              let y = bind["start"][1];
              for (let j = 0; j < bind["end"][0] - bind["start"][0] + 1; j++) {
                let x = bind["start"][0] + j;
                // console.log("pos", posToIndex(x, y, c["properties"]["width"]));
                value.push(c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"]);
              }
            } else {
              console.log("start end 不合法", bind);
            }
            std_input[bind["name"]] = value;
          }
        }
      }
      console.log("std_input", std_input);
      let result = execute(experiment["logic"], std_input);
      console.log(result);
      console.log(JSON.stringify(result));
      for (const c of experiment["ui"]) {
        if (c["type"] == "table") {
          for (const bind of c["properties"]["binds"]) {
            if (bind["type"] != "variable" || dictNameVariable[bind["name"]]["source"]["type"] == "input") {
              continue;
            }
            // console.log("c", JSON.stringify(c));
            let value = result[bind["name"]];
            // console.log("bind", JSON.stringify(bind));
            if (bind["start"][0] == bind["end"][0] && bind["start"][1] == bind["end"][1]) {
              let x = bind["start"][0];
              let y = bind["start"][1];
              c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"] = value;
            } else if (bind["start"][0] == bind["end"][0]) {
              let x = bind["start"][0];
              for (let j = 0; j < bind["end"][1] - bind["start"][1] + 1; j++) {
                let y = bind["start"][1] + j;
                c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"] = value[j];
              }
            } else if (bind["start"][1] == bind["end"][1]) {
              let y = bind["start"][1];
              for (let j = 0; j < bind["end"][0] - bind["start"][0] + 1; j++) {
                let x = bind["start"][0] + j;
                // console.log("pos", posToIndex(x, y, c["properties"]["width"]));

                c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"] = value[j];
              }
            } else {
              console.log("start end 不合法", bind);
            }
          }
        } else if (c["type"] == "output-textbox") {
          console.log("c", JSON.stringify(c));
          c["properties"]["value"] = result[c["properties"]["variableName"]];
        }
      }
    //   console.log("items", JSON.stringify(items));
}