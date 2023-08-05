//促销执行查看
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cData: [],
		//搜索字段
		searchKey: "",
		StartDate: "开始时间",
		EndDate: "结束时间",
		S_Start: "",
		S_End: "",
		E_Start: "",
		E_End: ""
	},

	/**
	 * 事件处理函数
	 */
	//搜索
	searchSubmit: function (event) {
		var that = this;

		that.setData({
			searchKey: event.detail.value
		})
		//获取执行列表
		that.cList();
	},
	//搜索-开始时间
	StartDateChange: function (event) {
		var that = this;

		if (event.detail.value != that.data.StartDate){
			that.setData({
				StartDate: event.detail.value
			})
			if (that.data.EndDate == "结束时间") {
				that.setData({
					EndDate: common.newTime("date")
				})
			}
			that.setData({
				S_Start: "",
				S_End: common.newTime("date"),
				E_Start: event.detail.value,
				E_End: common.newTime("date")
			})
			//获取执行列表
			that.cList();
		}
	},
	//搜索-结束时间
	EndDateChange: function (event) {
		var that = this;

		if (event.detail.value != that.data.EndDate) {
			that.setData({
				EndDate: event.detail.value
			})
			if (that.data.StartDate == "开始时间") {
				that.setData({
					StartDate: common.backTime(30)
				})
			}
			that.setData({
				S_Start: "",
				S_End: event.detail.value,
				E_Start: that.data.StartDate,
				E_End: common.newTime("date")
			})
			//获取执行列表
			that.cList();
		}
	},
	//清空时间
	clearDate: function (event) {
		var that = this;

		that.setData({
			StartDate: "开始时间",
			EndDate: "结束时间",
			S_Start: "",
			S_End: common.newTime("date"),
			E_Start: "",
			E_End: common.newTime("date")
		})
		//获取执行列表
		that.cList();
	},
	//获取执行列表
	cList: function () {
		var that = this;

		var userInfo = common.getUserInfo();
		var StartDate = that.data.StartDate == "开始时间" ? "" : that.data.StartDate;
		var EndDate = that.data.EndDate == "结束时间" ? "" : that.data.EndDate;
		common.ajaxRequestWork("did2_23", {
			UserNumber: userInfo[4],
			StoreName: that.data.searchKey,
			StartDate: StartDate,
			EndDate: EndDate
		}, function (rec) {
			if (JSON.stringify(rec) != "{}") {
				var datalist = rec.datalist;
				that.setData({
					cData: datalist
				})
			} else {
				that.setData({
					cData: []
				})
			}
		})
	},
	//促销执行详情
	carryoutDetaisl: function (event) {
		var that = this;

		var id = event.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../carryout/details?id=' + id
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		//初始时间
		that.setData({
			StartDate: "开始时间",
			EndDate: "结束时间",
			S_Start: "",
			S_End: common.newTime("date"),
			E_Start: "",
			E_End: common.newTime("date")
		})

		var userInfo = common.getUserInfo();
		if (common.isLogin()) {
			//获取执行列表
			that.cList();
		}
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