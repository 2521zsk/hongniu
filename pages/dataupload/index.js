//促销-数据上传
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
        //奖品数组
        awardArr: [
            {
                name: "",
                number: ""
            }
        ],
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
        var awardArr = that.data.awardArr;
        var result = true;
        if (result && param["CoverStoreNumber"] == "") {
            wx.showToast({
				icon: "none",
				title: "覆盖网点数不能为空",
                duration: 2000
            })
            result = false;
        }
        if (result && param["ScenePeopleNumber"] == "") {
            wx.showToast({
				icon: "none",
				title: "现场人数不能为空",
                duration: 2000
            })
            result = false;
        }
        if (result && param["MarketingNumber"] == "") {
            wx.showToast({
				icon: "none",
				title: "营销人数不能为空",
                duration: 2000
            })
            result = false;
        }
        if (result && param["HappyNumber"] == "") {
            wx.showToast({
				icon: "none",
				title: "壹元乐享个数不能为空",
                duration: 2000
            })
            result = false;
        }
        if (result && awardArr.length <= 0) {
            wx.showToast({
				icon: "none",
				title: "礼品使用登记不能为空",
                duration: 2000
            })
            result = false;
        }
		if (result){
			for (var i = 0; i < awardArr.length; i++) {
				if (awardArr[i].name == ""){
					wx.showToast({
						icon: "none",
						title: "奖品名称不能为空",
						duration: 2000
					})
					result = false;
					return false;
				}
				if (awardArr[i].number == "") {
					wx.showToast({
						icon: "none",
						title: "奖品数量不能为空",
						duration: 2000
					})
					result = false;
					return false;
				}
			}
		}
        if (result){
            for (var i = 0; i < awardArr.length; i++) {
                param['SerialNumber'] = i + 1;
                param['ProductName'] = awardArr[i].name;
                param['ProductNumber'] = awardArr[i].number;
                common.ajaxRequestWork("did9", param, function (rec) {
                    if (i >= awardArr.length - 1) {
                        wx.showToast({
                            title: '提交成功',
                            icon: 'success',
                            duration: 1500
                        })
                        //前往下一步
                        setTimeout(function () {
							wx.redirectTo({
                                url: '../dataupload/' + that.data.ActivityType + '2?Guid=' + that.data.Guid + "&ActivityID=" + that.data.ActivityID + "&ActivityType=" + that.data.ActivityType
                            })
                        }, 1500)
                    }
                })
            }
        }
		//console.log('form发生了submit事件，携带数据为：', param);
	},
    //添加奖品项
    addPrize: function (e) {
        var that = this;
        var awardArr = that.data.awardArr;
        awardArr.push({
            name: "",
            number: ""
        })
        that.setData({
            awardArr: awardArr
        })
    },
    //删除奖品项
    delPrize: function (e) {
        var that = this;
        var awardArr = that.data.awardArr;
        var inx = e.currentTarget.dataset.inx;
        var arr = [];
        for (var i = 0; i < awardArr.length; i++) {
            if (i + "" != inx) {
                arr.push(awardArr[i])
            }
        }
        console.log(arr)
        that.setData({
            awardArr: arr
        })
    },
    //奖品名称输入
    productNameEvent: function (event) {
        var that = this;

        var val = event.detail.value;
        var inx = event.currentTarget.dataset.num;
        var awardArr = that.data.awardArr;
        awardArr[inx]["name"] = val;
        that.setData({
            awardArr: awardArr
        })
    },
    //奖品名称输入
    productNumberEvent: function (event) {
        var that = this;

        var val = event.detail.value;
        var inx = event.currentTarget.dataset.num;
        var awardArr = that.data.awardArr;
        awardArr[inx]["number"] = val;
        that.setData({
            awardArr: awardArr
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

		//判断是否已存在
		common.ajaxRequestWork("did25", {
			Guid: Guid,
			ActivityID: ActivityID,
			UserNumber: that.data.usernumber
		}, function (rec) {
			if (rec.datalist[0].IsRepeat == 1) {
				wx.showModal({
					title: '提示',
					content: '请勿重复提交数据上传信息',
					showCancel: false,
					success: function(){
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