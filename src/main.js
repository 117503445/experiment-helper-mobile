import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();

import axios from "axios";

axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    console.log("AXIOS Request", config);
    var settle = require("axios/lib/core/settle");
    var buildURL = require("axios/lib/helpers/buildURL");
    uni.request({
      method: config.method.toUpperCase(),
      url: buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };
        console.log("AXIOS Response", response);
        settle(resolve, reject, response);
      }
    });
  });
};
