//促销执行详情
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
	//获取执行详情
	cDetails: function () {
		var that = this;

		var param = {
			pms_t_tmonpromotionexecute: {
				id: that.data.RowID
			}
		}
		wx.request({
			url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_24"]),
			data: param,
			method: 'post',
			dataType: 'json',
			header: {
				'token': common.getCookie("token"),
				'Content-Type': 'application/json'
			},
			complete: function (res) {
				if (JSON.stringify(res.data.resp_data) != "{}") {
					var datalist = res.data.resp_data.pms_t_tmonpromotionexecute[0];
					var PhotoArr1 = datalist["wholeactivityphoto"] == "" ? [] : datalist["wholeactivityphoto"].split(";");
					var PhotoArr2 = datalist["materielarrangephoto"] == "" ? [] : datalist["materielarrangephoto"].split(";");
					var PhotoArr3 = datalist["promotionphoto"] == "" ? [] : datalist["promotionphoto"].split(";");
					that.setData({
						cData: datalist,
						PhotoArr1: PhotoArr1,
						PhotoArr2: PhotoArr2,
						PhotoArr3: PhotoArr3
					})
                    // console.log("赋值了！！！！");
				} else {
                    // console.log("空的！！！！");
					that.setData({
						cData: []
					})
				}
			}
		})

		// common.ajaxRequestWork("did2_24", {
		// 	RowID: that.data.RowID
		// }, function (rec) {
		// 	if (JSON.stringify(rec) != "{}") {
		// 		var datalist = rec.datalist[0];
		// 		var PhotoArr1 = datalist["WholeActivityPhoto"] == "" ? [] : datalist["WholeActivityPhoto"].split(";");
		// 		var PhotoArr2 = datalist["MaterielArrangePhoto"] == "" ? [] : datalist["MaterielArrangePhoto"].split(";");
		// 		var PhotoArr3 = datalist["PromotionPhoto"] == "" ? [] : datalist["PromotionPhoto"].split(";");
		// 		var imgalist = (PhotoArr1.concat(PhotoArr2)).concat(PhotoArr3);
		// 		that.setData({
		// 			cData: datalist,
		// 			PhotoArr1: PhotoArr1,
		// 			PhotoArr2: PhotoArr2,
		// 			PhotoArr3: PhotoArr3
		// 		})
		// 	} else {
		// 		that.setData({
		// 			cData: {}
		// 		})
		// 	}
		// })
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
		var that= this;
		let { id } = options;
		that.setData({
			RowID: id
		})
		//获取执行详情
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