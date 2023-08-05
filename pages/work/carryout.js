//促销-执行
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
		picArr2: [], 		//图片组2
		picLen2: 0,			//图片组2-长度
		picArr3: [], 		//图片组3
		picLen3: 0,			//图片组3-长度
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
	//图片组2-上传
	picUpload2: function () {
		var that = this;

		if (that.data.picArr2.length >= 5) {
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
					var arr = that.data.picArr2;
					var len = that.data.picLen2;
					arr.push({
						num: len + 1,
						src: rec.url
					})
					that.setData({
						picArr2: arr,
						picLen2: arr.length
					})
				})
			}
		})
	},
	//图片组2-删除
	picDelete2: function (e) {
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
					var arr = that.data.picArr2;
					for (var i = 0; i < arr.length; i++) {
						if (num == arr[i].num) {
							arr.splice(i, 1);
						}
					}
					for (var j = 0; j < arr.length; j++) {
						arr[j].num = j + 1;
					}
					that.setData({
						picArr2: arr
					})
				}
			}
		})
	},
	//图片组3-上传
	picUpload3: function () {
		var that = this;

		if (that.data.picArr3.length >= 5) {
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
					var arr = that.data.picArr3;
					var len = that.data.picLen3;
					arr.push({
						num: len + 1,
						src: rec.url
					})
					that.setData({
						picArr3: arr,
						picLen3: arr.length
					})
				})
			}
		})
	},
	//图片组3-删除
	picDelete3: function (e) {
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
					var arr = that.data.picArr3;
					for (var i = 0; i < arr.length; i++) {
						if (num == arr[i].num) {
							arr.splice(i, 1);
						}
					}
					for (var j = 0; j < arr.length; j++) {
						arr[j].num = j + 1;
					}
					that.setData({
						picArr3: arr
					})
				}
			}
		})
	},
	//表单数据提交
	formSubmit: function (e) {
		var that = this;

		var param = e.detail.value;
		param["VisitDate"] = common.newTime();
		param["WholeActivityPhoto"] = common.picToStr(that.data.picArr1);
		param["MaterielArrangePhoto"] = common.picToStr(that.data.picArr2);
		param["PromotionPhoto"] = common.picToStr(that.data.picArr3);
        var result = false;
		if (param["WholeActivityRemark"] != "" || param["MaterielArrangeRemark"] != "" || param["PromotionRemark"] != "") {
            result = true;
        }else{
			wx.showToast({
				icon: "none",
				title: "请至少填写一项",
				duration: 2000
			})
		}
		if (result && param["WholeActivityRemark"] != "" && param["WholeActivityPhoto"] == "") {
			wx.showToast({
				icon: "none",
				title: "请至少上传一张整体活动照片",
				duration: 2000
			})
			result = false;
		}
		if (result && param["MaterielArrangeRemark"] != "" && param["MaterielArrangePhoto"] == "") {
			wx.showToast({
				icon: "none",
				title: "请至少上传一张物料布置照片",
				duration: 2000
			})
			result = false;
		}
		if (result && param["PromotionRemark"] != "" && param["PromotionPhoto"] == "") {
			wx.showToast({
				icon: "none",
				title: "请至少上传一张派放/促销场景照片",
				duration: 2000
			})
			result = false;
		}
        if (result) {
            common.ajaxRequestWork("did4", param, function (rec) {
				if (rec.datalist[0].IsRepeat == 1) {
					wx.showToast({
						icon: 'none',
						title: '请勿重复提交促销执行',
						duration: 2000
					})
				} else {
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
				}
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

		//判断是否已存在
		common.ajaxRequestWork("did28", {
			Guid: Guid,
			ActivityID: ActivityID,
			UserNumber: that.data.usernumber
		}, function (rec) {
			if (rec.datalist[0].IsRepeat == 1) {
				wx.showModal({
					title: '提示',
					content: '请勿重复提交促销执行信息',
					showCancel: false,
					success: function () {
						wx.navigateBack({
							delta: 1
						})
					}
				})
			}
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