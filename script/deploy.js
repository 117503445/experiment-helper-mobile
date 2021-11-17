/*
 * @Author: HaoTian Qi
 * @Date: 2021-11-17 16:27:01
 * @Description:
 * @LastEditTime: 2021-11-17 16:29:28
 * @LastEditors: HaoTian Qi
 */

const conf = require('./config.json')

const aliOSSStaicWebDeploy = require("ali-oss-static-web-deploy");
aliOSSStaicWebDeploy({
  region: conf['region'],
  accessKeyId: conf['accessKeyId'],
  accessKeySecret: conf['accessKeySecret'],
  bucket: conf['bucket'],
  staticWebAppPath: require("path").resolve(process.cwd(), "dist", "build", "h5")
});
