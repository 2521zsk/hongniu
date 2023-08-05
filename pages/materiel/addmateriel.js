//物料管理-新增物料
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		thisLocation: "", 	//当前定位
		picArr1: [], 		//图片组1
		picLen1: 0,			//图片组1-长度
		//关联门店
		StoreArr: [],
		StoreInx: 0,
		selectArray: ['选项1', '选项2', '选项3', '选项4', '选项5'],
		selectIndex: 0,
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
		param["VisitDate"] = common.newTime();
        param["CheckRemark"] = param["CheckRemark1"] + "," + param["CheckRemark2"];
        param["CheckDate"] = that.data.CheckDate;
		//关联门店
		param["Guid"] = that.data.StoreArr[param.StoreID].guid;
		param["StoreName"] = that.data.StoreArr[param.StoreID].storename;
		delete param["StoreID"]
		delete param["CheckRemark1"]
		delete param["CheckRemark2"]
        console.log('form发生了submit事件，携带数据为：', param);
        var result = true;
        if (result && param["MaterielName"] == "") {
            wx.showToast({
				icon: "none",
				title: "物料名称不能为空",
                duration: 2000
            })
            result = false;
        }
        if (result) {
			common.ajaxRequestWork("did5", param, function (rec) {
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
	//日期选择
    bindDateChange(e) {
		this.setData({
            CheckDate: e.detail.value
		})
	},
	//门店选择
	StoreChange(e) {
		var that = this;

		that.setData({
			StoreInx: e.detail.value,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
        var that = this;

        //用户信息
        var userInfo = common.getUserInfo();
        that.setData({
            usernumber: userInfo[4]
        })

		//关联门店
		common.ajaxRequestWork("did2_40", {
			UserNumber: userInfo[0]
		}, function (rec) {
			that.setData({
				StoreArr: rec.datalist,
				StoreInx: 0
			})
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
        //设置当前日期
        that.setData({
            CheckDate: common.newTime("date"),
            newDate: common.newTime("date")
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