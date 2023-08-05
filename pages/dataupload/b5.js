//促销-数据上传-备注B5
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		thisLocation: "", 		//当前定位
		Guid: "",				//门店Guid
		ActivityID: "",			//活动ID
		ActivityType: "",		//活动类型
		usernumber: ""
	},

	/**
	 * 事件处理函数
	 */
	//表单数据提交
	formSubmit: function (e) {
		var that = this;

		var param = e.detail.value;
        param['VisitDate'] = common.newTime();
		var result = false;
		if (param["Remark"] != "") {
			result = true;
		}
        if (result) {
            common.ajaxRequestWork("did12", param, function (rec) {
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 1500
                })
                //返回上一页
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1500)
            })
		} else {
			//直接前往下一步
			wx.navigateBack({
				delta: 1
			})
		}
		//console.log('form发生了submit事件，携带数据为：', param);
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		//用户信息
		var userInfo = common.getUserInfo();
		that.setData({
			usernumber: userInfo[0]
		})

		//促销点信息
		let { Guid } = options
		let { ActivityID } = options
		let { ActivityType } = options
		that.setData({
			Guid: Guid,
			ActivityID: ActivityID,
			ActivityType: ActivityType
		})
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
		//获取当前定位
		common.ajaxRequestMap(function (rec) {
			if (rec.status == 0) {
				that.setData({
					thisLocation: rec.result.address
				})
			}
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