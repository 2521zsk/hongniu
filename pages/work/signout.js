//促销-签退
var common = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
	data: {
		thisLocation: "", 	//当前定位
		Guid: "",			//门店Guid
		ActivityID: "",		//活动ID
		picArr1: [], 		//图片组1
		picLen1: 0,			//图片组1-长度
		usernumber: ""
	},

    /**
     * 事件处理函数
     */
	//图片组1-上传
	picUpload1: function () {
		var that = this;

		if (that.data.picArr1.length >= 5) {
			wx.showToast({
				icon: "none",
				title: "最多上传5张照片~长按图片可删除已选照片 ",
				duration: 2000
			})
			return false;
		}
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['camera'],
			success(res) {
				var tempFilePaths = res.tempFilePaths;
				//文件上传
				common.ajaxUploadFile(tempFilePaths[0], {}, function (rec) {
					console.log(rec);
					//渲染图片
					var arr = that.data.picArr1;
					var len = that.data.picLen1;
					arr.push({
						num: len + 1,
						src: rec.url
					})
					that.setData({
						picArr1: arr,
						picLen1: arr.length
					})
				})
			}
		})
	},
	//图片组1-删除
	picDelete1: function (e) {
		var that = this;

		var num = e.currentTarget.dataset.num;
		wx.showModal({
			content: '确认删除当前图片吗?',
			confirmText: "取消",
			confirmColor: "#f03d56",
			cancelText: "确认",
			cancelColor: "#000000",
			success(res) {
				if (res.confirm) {
					console.log('用户点击取消')
				} else if (res.cancel) {
					console.log('用户点击确定', num)
					var arr = that.data.picArr1;
					for (var i = 0; i < arr.length; i++) {
						if (num == arr[i].num) {
							arr.splice(i, 1);
						}
					}
					for (var j = 0; j < arr.length; j++) {
						arr[j].num = j + 1;
					}
					that.setData({
						picArr1: arr
					})
				}
			}
		})
	},
	//表单数据提交
	formSubmit: function (e) {
		var that = this;

		var param = e.detail.value;
		param["SignTime"] = common.newTime();
		param["SignPhoto"] = common.picToStr(that.data.picArr1);
        var result = true;
        if (result && param["SignRemark"] == "") {
            wx.showToast({
				icon: "none",
				title: "你不打算说点什么吗",
				duration: 2000
            })
            result = false;
        }
		if (result && param["SignPhoto"] == "") {
			wx.showToast({
				icon: "none",
				title: "请至少上传一张照片",
				duration: 2000
			})
			result = false;
		}
		if (result && param["SignLocation"] == "") {
			wx.showToast({
				icon: "none",
				title: "签到定位不能为空",
				duration: 2000
			})
			result = false;
		}
        if (result) {
            common.ajaxRequestWork("did3", param, function (rec) {
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
		that.setData({
			Guid: Guid,
			ActivityID: ActivityID
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