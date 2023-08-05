//考勤
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//角色[默认无]
		roleData: [0, ""],
	},

	/**
	 * 事件处理函数
	 */
	//上班签到
	goToWork: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../checkwork/signin'
		})
	},
	//下班签退
	goOffWork: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../checkwork/signout'
		})
	},
	//返回首页
	viewIndex: function (event) {
		wx.navigateBack({
			delta: 1
		})
	},
	//个人中心
	viewHome: function (event) {
		var that = this;
		wx.navigateTo({
			url: '../user/index'
		})
	},
	//物料管理
	materielManage: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../materiel/index'
		})
	},
	//客户管理
	customerManage: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../customer/index'
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
		if (common.isLogin()) {
			//获取用户角色
			that.setData({
				roleData: common.xbApi.roleArr[wx.getStorageSync("roleid")]
			})
		}
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