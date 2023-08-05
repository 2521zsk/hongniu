//考勤查看-角色选择
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cData: [],
		//角色类型
		RoleTypeArr: [],
		RoleTypeInx: 0,
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
		//获取考勤人员列表
		that.cList();
	},
	//角色类型选择
	RoleTypeChange(e) {
		var that = this;
		that.setData({
			RoleTypeInx: e.detail.value
		})
		// console.log("+++++++++++" + that.data.RoleTypeInx);
	},
	//搜索-开始时间
	StartDateChange: function (event) {
		var that = this;

		if (event.detail.value != that.data.StartDate) {
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
			//获取考勤人员列表
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
			//获取考勤人员列表
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
		//获取考勤人员列表
		that.cList();
	},
	//获取考勤人员列表
	cList: function () {
		var that = this;
		// console.log("发送请求===============");
		console.log("---------" + that.data.searchKey +"=================")
		var roleIds = common.xbApi.roleIds;
		var roleid = roleIds[that.data.RoleTypeInx];
		var param = {
			member: {
				orgstructid: "",
				userinfoname: that.data.searchKey,
				roleid: roleid
			}
		}
		wx.request({
			url: encodeURI(common.xbApi.apiUrl + common.xbApi.api["did3_45"]),
			data: param,
			method: 'post',
			dataType: 'json',
			header: {
				'token': common.getCookie("token"),
				'Content-Type': 'application/json'
			},
			complete: function (res) {
				if (JSON.stringify(res.data.resp_data) != "{}") {
					var datalist = res.data.resp_data.member;
					that.setData({
						cData: datalist
					})
				} else {
					that.setData({
						cData: []
					})
				}
			}
		})
	},
	//考勤列表
	checkView: function (event) {
		var that = this;

		var uid = event.currentTarget.dataset.uid;
		var rid = event.currentTarget.dataset.rid;
		// var roleArr = common.xbApi.roleArr;
		if (rid == '1207982388232196096'){
			//推广员
			wx.navigateTo({
				url: "../check/data?uid=" + uid + "&StartDate=" + that.data.StartDate + "&EndDate=" + that.data.EndDate
			})
		}else if(rid == '1207982388236390400' || rid == '1207982388236390401'){	//促销员：
			//督导
			wx.navigateTo({
				url: "../check/list?uid=" + uid + "&StartDate=" + that.data.StartDate + "&EndDate=" + that.data.EndDate
			})
		}
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
		//角色类型
		that.setData({
			RoleTypeArr: common.xbApi.roleJson
		})

		var userInfo = common.getUserInfo();
		if (common.isLogin()) {
			//获取考勤人员列表
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