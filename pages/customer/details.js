//门店详情
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cData: {},
		Guid: "",
		Type: 1
	},

	/**
	 * 事件处理函数
	 */
	//获取门店详情
	cDetails: function () {
		var that = this;

		var param = {
			kx_kq_store: {
				id: that.data.Guid,
				type: that.data.Type
			}
		}
		wx.request({
            url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_33"]),
            method: 'post',
			data: param,
            dataType: 'json',
            header: {
                'token': common.getCookie("token"),
                'Content-Type': 'application/json'
            },
            complete: function (res) {
                if (JSON.stringify(res.data.resp_data) != "{}") {
					console.log("1");
                    var datalist = res.data.resp_data.kx_kq_store[0];
					console.log("=====" + datalist[0] + "++++++++++")
                    that.setData({
                        cData: datalist
                    })
                } else {
					console.log("2");
                    that.setData({
                        cData: []
                    })
                }
            }
        })
		console.log("=====" + that.data.cData[0] + "------------")
		// common.ajaxRequestWork("did2_33", {
		// 	Guid: that.data.Guid,
		// 	Type: that.data.Type
		// }, function (rec) {
		// 	if (JSON.stringify(rec) != "{}") {
		// 		var datalist = rec.datalist[0];
		// 		that.setData({
		// 			cData: datalist
		// 		})
		// 	} else {
		// 		that.setData({
		// 			cData: {}
		// 		})
		// 	}
		// })
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		let { Guid } = options;
		let { Type } = options;
		that.setData({
			Guid: Guid,
			Type: Type
		})
		//获取门店详情
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