const app = getApp();
const config = require('../../config/config.js')
var common = require('../../utils/util.js')
Page({
  data: {
    rolelist: "",
    defaultrole: "",
    showPopup: false,
    progress: 0,
  },
  onLoad: function (options) {
    console.log("进入reload----------------");
    let that = this;
    wx.showLoading({
      title: '获取岗位中...',
      mask: true,
    })

    let jump = wx.getStorageSync("rolelist").length == 1;
    let temp = wx.getStorageSync("rolelist")[0].positionname
    let templist = [];
    templist.push(temp);
    this.setData({
      rolelist: wx.getStorageSync("rolelist").map(v => {
        return v.positionname + '(' + v.orgname + ')'
      }),
      defaultrole: templist
    })
    wx.setStorageSync("role", wx.getStorageSync("rolelist")[0].positionname)
    if (jump) {
      //只有单个角色，直接获取信息
      let resdata = wx.getStorageSync("rolelist")[0]
      // console.log("发送请求获取职位信息----------------");
      this.formatData(resdata)
    } else {
      wx.hideLoading();
      that.setData({
        showPopup: true
      })
    }
    // console.log("打开弹窗？" + showPopup);
  },

  formatData: function (resdata) {
    let that = this;
    wx.showLoading({
      title: '获取数据中...',
      mask: true,
    })
    wx.request({
      url: encodeURI(common.xbApi.apiUrl + "api/teapi/rolepermission/account/getaccountinfo"),
      method: "post",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        clientversion: "V8.2.0",
        positionid: resdata.positionid
      },
      success: function (res) {
        if (res.data.error_code) {
          wx.hideLoading()
          wx.showToast({
            title: res.data.error_code,
            icon: "none"
          })
        } else {
          wx.setStorageSync('token', res.data.resp_data.token)
          wx.setStorageSync('userinfo', {
            userinfoname: res.data.resp_data.userinfoname,
            userinfoid: res.data.resp_data.userinfoid
          })
          
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '获取数据失败！',
          icon: "none"
        })
      }
    })
  },
  choose: function (e) {
    let that = this
    let result = wx.getStorageSync("rolelist")[e.currentTarget.dataset.index];
    wx.setStorageSync("role", wx.getStorageSync("rolelist")[e.currentTarget.dataset.index].positionname)
    console.log(result + "=======================");
    // that.formatData(result)
		wx.redirectTo({
      url: '../index/index',
    })
  },
  togglePopup: function () {
    let that = this
    that.setData({
      showPopup: false
    })
    wx.showModal({
      title: '温馨提示',
      content: '是否返回登录页面？',
      confirmText: "是",
      cancelText: "否",
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../index/index?noautoflag=true',
          })
        } else {
          that.setData({
            showPopup: true
          })
        }
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})