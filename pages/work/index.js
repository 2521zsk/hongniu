//促销-首页
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//角色[默认无]
		roleData: [0, ""],
		usernumber: "",
        workData: {}
	},

	/**
	 * 事件处理函数
	 */
	//促销签到
	goSignin: function (event) {
		var that = this;
		var Guid = that.data.workData["guid"];
		var ActivityID = that.data.workData["ActivityID"];
		wx.navigateTo({
			url: '../work/signin?Guid=' + Guid + "&ActivityID=" + ActivityID
		})
	},
	//促销执行
	goCarryout: function (event) {
		var that = this;
		var Guid = that.data.workData["guid"];
		var ActivityID = that.data.workData["ActivityID"];
		wx.navigateTo({
			url: '../work/carryout?Guid=' + Guid + "&ActivityID=" + ActivityID
		})
	},
	//促销检查
	goCheckup: function (event) {
		var that = this;
		var Guid = that.data.workData["guid"];
		var ActivityID = that.data.workData["ActivityID"];
		wx.navigateTo({
			url: '../work/checkup?Guid=' + Guid + "&ActivityID=" + ActivityID
		})
	},
	//数据上传
	goUpload: function (event) {
		var that = this;
		var Guid = that.data.workData["guid"];
		var ActivityID = that.data.workData["ActivityID"];
		var ActivityTypeID = that.data.workData["ActivityTypeID"];
		var ActivityType = common.xbApi.activityArr[ActivityTypeID];
		wx.navigateTo({
			url: '../reported/index?Guid=' + Guid + "&ActivityID=" + ActivityID + "&ActivityType=" + ActivityType
		})
	},
	//促销签退
	goSignout: function (event) {
		var that = this;
		var Guid = that.data.workData["guid"];
		var ActivityID = that.data.workData["ActivityID"];
		wx.navigateTo({
			url: '../work/signout?Guid=' + Guid + "&ActivityID=" + ActivityID
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		var userInfo = common.getUserInfo();

		if (common.isLogin()) {
			//获取用户角色
			common.getRole(function (rec) {
				that.setData({
					usernumber: userInfo[0],
					roleData: rec
				})
			})
		}

        //我的促销点
        let { workData } = options
		that.setData({
            workData: JSON.parse(workData)
		})
		//console.log(workData)
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