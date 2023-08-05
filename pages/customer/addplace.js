//客户管理-新增场所
const app = getApp()
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
        thisLocation: "",
		location: "",
        //场所类型
        StoreTypeArr: [],
        StoreTypeInx: 0,
		//渠道细分
		StoreTypeDetailArr: [],
		StoreTypeDetailInx: 0,
        //热点区域
        HotspotArr: [],
        HotspotInx: 0,
        //区县
        DistrictArr: [],
        DistrictInx: 0,
       //用户信息
        usernumber: ""
	},

	/**
	 * 事件处理函数
	 */
    //表单数据提交
    formSubmit: function (e) {
        var that = this;

        var param = e.detail.value;
        param["VisitDate"] = common.newTime();
        //场所类型
        param["StoreType"] = that.data.StoreTypeArr[param.StoreTypeID].RowID;
        delete param["StoreTypeID"]
		//渠道细分
		param["StoreTypeDetail"] = that.data.StoreTypeDetailArr[param.StoreTypeDetailID].RowID;
		delete param["StoreTypeDetailID"]
        //热点区域
        param["HotZone"] = that.data.HotspotArr[param.HotspotID].RowID;
        delete param["HotspotID"]
        //区县
        param["RegionID"] = that.data.DistrictArr[param.DistrictID].SaleAreaID;
        delete param["DistrictID"]

        var result = true;
        if (result && param["StoreName"] == "") {
            wx.showToast({
				icon: "none",
                title: "场所名称不能为空",
                duration: 2000
            })
            result = false;
        }
        if (result) {
            common.ajaxRequestWork("did6", param, function (rec) {
				if (rec.datalist[0].IsRepeat == 1){
					wx.showToast({
						icon: 'none',
						title: '场所名称已存在',
						duration: 2000
					})
				}else{
					wx.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 1500
					})
					app.globalData.customerLoad = 0;
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
    //场所类型选择
    StoreTypeChange(e) {
        var that = this;

        that.setData({
            StoreTypeInx: e.detail.value,
        })
		//渠道细分
		common.ajaxRequestWork("did27", {
			StoreType: that.data.StoreTypeArr[e.detail.value]["RowID"]
		}, function (rec) {
			that.setData({
				StoreTypeDetailArr: rec.datalist,
				StoreTypeDetailInx: 0
			})
		})
    },
	//渠道细分选择
	StoreTypeDetailChange(e) {
		var that = this;

		that.setData({
			StoreTypeDetailInx: e.detail.value,
		})
	},
    //热点区域选择
    HotspotChange(e) {
        var that = this;

        that.setData({
            HotspotInx: e.detail.value,
        })
    },
    //区县选择
    DistrictChange(e) {
        var that = this;

        that.setData({
            DistrictInx: e.detail.value,
        })
    },
	//地址框输入转换
	AddressChange(e) {
		var that = this;
		common.ajaxRequestAddress(e.detail.value, function(rec){
			if (rec.status == 0){
				that.setData({
					location: common.locationStr(rec.result.location)
				})
			}
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


		//场所分类
		common.ajaxRequestWork("did26", {}, function (rec) {
			that.setData({
				StoreTypeArr: rec.datalist,
				StoreTypeInx: 0
			})
			//渠道细分
			common.ajaxRequestWork("did27", {
				StoreType: that.data.StoreTypeArr[0]["RowID"]
			}, function (rec) {
				that.setData({
					StoreTypeDetailArr: rec.datalist,
					StoreTypeDetailInx: 0
				})
			})
		})
        //热点区域
        common.ajaxRequestWork("did20", {}, function (rec) {
            that.setData({
                HotspotArr: rec.datalist,
                HotspotInx: 0
            })
        })
        //区县
        common.ajaxRequestWork("did22", {
            UserNumber: userInfo[0]
        }, function (rec) {
            console.log(rec)
            that.setData({
                DistrictArr: rec.datalist,
                DistrictInx: 0
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
					location: common.locationStr(rec.result.location),
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