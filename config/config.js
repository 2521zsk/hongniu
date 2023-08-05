const BaseUrl = "http://121.37.206.131:17000" // 测试环境
// const BaseUrl = "https://jiusan.xtion.net" // 发布环境

const gdkey = "c8d6794bcc0df3e78fe6530921b7dca2" // 高德地图key
const changePwdUrl = BaseUrl + '/api/teapi/account/account/changepwd' // 修改密码接口
const url = BaseUrl + '/api/teapi/dy-biz/' // 测试环境flycode接口
const loginUrl = BaseUrl + '/api/auth/login' // 登录接口
const getTenantUrl = BaseUrl + "/api/auth/choosetenant" // 登录接口
const getPosaitionUrl = BaseUrl + '/api/teapi/rolepermission/account/getaccountinfo' // 登录接口

module.exports = {
  BaseUrl: BaseUrl,
  loginUrl: loginUrl,
  getTenantUrl: getTenantUrl,
  getPosaitionUrl: getPosaitionUrl,
  url: url,
  changePwdUrl: changePwdUrl,
  gdkey: gdkey
}