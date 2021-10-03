// TODO UI 限制小数位数
import { execute } from "./executor";
import { p } from "./util";
function isTextBox(type) {
  return type == "input-textbox" || type == "output-textbox";
}

function posToIndex(x, y, width) {
  if (y > width || y < 0) {
    console.error("不合法的 y", y);
  }
  return y - 1 + (x - 1) * width;
}

function getDictNameVariable(variables) {
  let dictNameVariable = {};
  for (const variable of variables) {
    dictNameVariable[variable["name"]] = variable;
  }
  return dictNameVariable;
}

export function getDefaultUIData(experiment) {
  const dictNameVariable = getDictNameVariable(experiment["logic"]["variables"]);

  let uiItems = experiment["ui"];

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
          console.error("start end 不合法", bind);
        }
      }
      uiItems[i]["properties"]["values"] = values;
    }
  }
  return uiItems;
}

export function calculateUIData(experiment) {
  let std_input = {};

  const dictNameVariable = getDictNameVariable(experiment["logic"]["variables"]);

  for (const c of experiment["ui"]) {
    if (isTextBox(c["type"])) {
      std_input[c["properties"]["variableName"]] = c["properties"]["value"];
    } else if (c["type"] == "table") {
      for (const bind of c["properties"]["binds"]) {
        if (bind["type"] != "variable" || dictNameVariable[bind["name"]]["source"]["type"] != "input") {
          continue;
        }
        let value = [];

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
            value.push(c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"]);
          }
        } else {
          console.error("start end 不合法", bind);
        }
        std_input[bind["name"]] = value;
      }
    }
  }
  let result = execute(experiment["logic"], std_input);
  for (const c of experiment["ui"]) {
    if (c["type"] == "table") {
      for (const bind of c["properties"]["binds"]) {
        if (bind["type"] != "variable" || dictNameVariable[bind["name"]]["source"]["type"] == "input") {
          continue;
        }
        let value = result[bind["name"]];
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

            c["properties"]["values"][posToIndex(x, y, c["properties"]["width"])]["value"] = value[j];
          }
        } else {
          console.error("start end 不合法", bind);
        }
      }
    } else if (c["type"] == "output-textbox") {
      c["properties"]["value"] = result[c["properties"]["variableName"]];
    }
  }
}
