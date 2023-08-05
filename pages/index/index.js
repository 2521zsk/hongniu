//首页
const app = getApp()
var common = require('../../utils/util.js')

Page({
    data: {
		//角色[默认无]
		roleData: [0, ""],
		//幻灯片
		imgUrls: [
			'../images/banner/banner_01.jpg',
			'../images/banner/banner_02.jpg',
			'../images/banner/banner_03.jpg'
		],
		indicatorDots: true,
		indicatorColor: "rgba(204,204,204,.8)",
		indicatorActiveColor: "rgba(255,255,255,.8)",
		autoplay: true,
		interval: 5000,
		duration: 1000,
		//促销点
		workData: [],
		//搜索字段
		searchKey: "",
		//登录按钮
		hasLoginBtn: 0
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
		//获取我的促销点
		that.cxList();
		//console.log('form发生了submit事件，携带数据为：', event.detail.value)
	},
	//查看促销点
	viewWork: function (event) {
		var that = this;
        var inx = event.currentTarget.dataset.inx;
        var arr = that.data.workData;
        var str = JSON.stringify(arr[inx]);
		wx.navigateTo({
            url: '../work/index?workData=' + str
		})
	},
	//考勤
	checkWork: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../checkwork/index'
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
	//个人中心
	viewHome: function (event) {
		var that = this;
		wx.navigateTo({
			url: '../user/index'
		})
	},
	//获取我的促销点
	cxList: function (){
		var that = this;

		var userInfo = common.getUserInfo();
		var param = {
			pms_t_promotionactivity: {
				storename: that.data.searchKey,
				positionid: userInfo[5],
				memberid: userInfo[4]
			}
		}
		wx.request({
			url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did1"]),
			data: param,
			method: 'post',
			dataType: 'json',
			header: {
				'token': common.getCookie("token"),
				'Content-Type': 'application/json'
			},
			complete: function (res) {
				if (JSON.stringify(res.data.resp_data) != "{}") {
					var datalist = res.data.resp_data.pms_t_promotionactivity;
					that.setData({
						workData: datalist
					})
				} else {
					that.setData({
						workData: []
					})
				}
			}
		})
	},
	//前往登录
	goLogin: function (event) {
		wx.navigateTo({
			url: '../login/index'
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
		//1：未登录	0：已登录
        if (common.isLogin()) {
            //获取我的促销点
            that.cxList();
            //获取用户角色
			that.setData({
				roleData: common.xbApi.roleArr[wx.getStorageSync("roleid")],
				hasLoginBtn: 0
			})
        }else{
			that.setData({
				hasLoginBtn: 1
			})
		}
		console.log(that.data.hasLoginBtn + "-----------登录状态----------");
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