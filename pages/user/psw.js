//修改密码
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		usernumber: "",		//用户账号
		oldpassword: "",	//旧密码
		newpassword: "",	//新密码
		reppassword: ""		//重复密码
	},

	/**
	 * 事件处理函数
	 */
	//修改密码
	modifyPswSubmit: function (event) {
		var that = this;

		var result = true;
		var data = {};
		data["oldpassword"] = that.data.oldpassword;
		data["newpassword"] = that.data.newpassword;
		if (result && data["usernumber"] == "") {
			wx.showToast({
				icon: "none",
				title: "原密码不能为空",
				duration: 1500
			})
			result = false;
		}
		if (result && data["newpassword"] == "") {
			wx.showToast({
				icon: "none",
				title: "新密码不能为空",
				duration: 1500
			})
			result = false;
		}
		if (result && that.data.reppassword == "") {
			wx.showToast({
				icon: "none",
				title: "确认密码不能为空",
				duration: 1500
			})
			result = false;
		}
		if (result && that.data.reppassword != data["newpassword"]) {
			wx.showToast({
				icon: "none",
				title: "新密码两次输入不一致",
				duration: 1500
			})
			result = false;
		}
		//console.log(data);
		if (result) {
			common.ajaxRequestNoLogin("modifyPsw", data, function (rec) {
				wx.showToast({
					title: '修改成功，请重新登录',
					icon: 'none',
					duration: 1500
				})
				//删除登录信息
				common.delCookie("token");
				common.delCookie("Token");
				//返回首页
				setTimeout(function () {
					wx.reLaunch({
						url: '../login/index'
					})
				}, 1500);
			}, "post");
		}
	},
	//旧密码-输入
	oldpasswordInputEvent: function (e) {
		var that = this;
		that.setData({
			oldpassword: e.detail.value
		})
	},
	//新密码-输入
	newpasswordInputEvent: function (e) {
		var that = this;
		that.setData({
			newpassword: e.detail.value
		})
	},
	//重复密码-输入
	reppasswordInputEvent: function (e) {
		var that = this;
		that.setData({
			reppassword: e.detail.value
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		var that = this;

		var userInfo = common.getUserInfo();
		that.setData({
			usernumber: userInfo[0]
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})