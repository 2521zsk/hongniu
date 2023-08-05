//考勤详情
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cData: {},
		RowID: ""
	},

	/**
	 * 事件处理函数
	 */
	//获取考勤详情
	cDetails: function () {
		var that = this;

		common.ajaxRequestWork("did3_44", {
			RowID: that.data.RowID
		}, function (rec) {
			if (JSON.stringify(rec) != "{}") {
				var datalist = rec.datalist[0];
				var PhotoArr1 = datalist["SignInPhoto"] == "" ? [] : datalist["SignInPhoto"].split(";");
				var PhotoArr2 = datalist["SignOutPhoto"] == "" ? [] : datalist["SignOutPhoto"].split(";");
				var imgalist = (PhotoArr1.concat(PhotoArr2));
				that.setData({
					cData: datalist,
					PhotoArr1: PhotoArr1,
					PhotoArr2: PhotoArr2
				})
			} else {
				that.setData({
					cData: {}
				})
			}
		})
	},
	//图片预览
	previewImage: function (e) {
		var that = this;
		var current = e.target.dataset.src;
		var imgalist = e.target.dataset.arr;
		wx.previewImage({
			current: current,
			urls: imgalist
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		let { id } = options;
		that.setData({
			RowID: id
		})
		//获取考勤详情
		that.cDetails();
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