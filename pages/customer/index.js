//客户管理
const app = getApp()
var common = require('../../utils/util.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
        cData: [],
        cArr: {},
        //搜索字段
        searchKey: ""
	},

	/**
	 * 事件处理函数
	 */
    //搜索
    searchSubmit: function (event) {
        var that = this;

        that.setData({
            searchKey: event.detail.value	//获取input中的值
        })
        //获取客户列表
        that.cList();
    },
    //获取客户列表
    cList: function () {
        var that = this;
		var userInfo = common.getUserInfo();
        var qqmapsdk = new QQMapWX({
            key: common.xbApi.mapKey
        });
		var param = {
			kx_kq_store: {
				storename: that.data.searchKey
			}
		}

		wx.request({
            url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did16"]),
            method: 'post',
			data: param,
            dataType: 'json',
            header: {
                'token': common.getCookie("token"),
                'Content-Type': 'application/json'
            },
            complete: function (res) {
                if (JSON.stringify(res.data.resp_data) != "{}") {
                    var datalist = res.data.resp_data.kx_kq_store;
                    that.setData({
                        cData: datalist,
                    	cArr: []
                    })
                } else {
                    that.setData({
                        cData: [],
						cArr: []
                    })
                }
            }
        })

        
        // common.ajaxRequestWork("did16", {
        //     UserNumber: userInfo[0],
        //     StoreName: that.data.searchKey
        // }, function (rec) {
        //     if (JSON.stringify(rec) != "{}") {
        //         that.setData({
        //             cData: rec.datalist,
        //             cArr: []
        //         })
        //         wx.getLocation({
        //             type: 'wgs84',
        //             success(res) {
        //                 var fromLocation = res.latitude + ',' + res.longitude;
        //                 var datalist = common.split_array(rec.datalist, 10);
        //                 var cArr = {}, i = 0;
		// 				//第一次运行
		// 				if (i < datalist.length) {
		// 					var toArr = [];
		// 					for (var j = 0; j < datalist[i].length; j++) {
		// 						var Location = datalist[i][j].Location;
		// 						if (Location == "" || Location == "|" || Location.indexOf("|") == -1) {
		// 							toArr[j] = fromLocation;
		// 						} else {
		// 							toArr[j] = Location.replace('|', ',')
		// 						}
		// 					}
		// 					var toLocation = toArr.join(";"), dArr = [];
		// 					common.ajaxRequestDist(fromLocation, toLocation, function (res) {
		// 						if (res.status == 0) {
		// 							for (var k = 0; k < res.result.elements.length; k++) {
		// 								var num = i * 10 + k - 10;
		// 								var str = "D" + num;
		// 								if (res.result.elements[k].distance != -1 && res.result.elements[k].distance != 0) {
		// 									cArr[str] = res.result.elements[k].distance / 1000 + "km";
		// 								} else {
		// 									cArr[str] = "-"
		// 								}
		// 								that.setData({
		// 									cArr: cArr
		// 								})
		// 							}
		// 						}
		// 					});
		// 					i++;
		// 				}
		// 				//定时运行
        //                 var timer = setInterval(function(){
        //                     if (i < datalist.length){
        //                         var toArr = [];
        //                         for (var j = 0; j < datalist[i].length; j++) {
		// 							var Location = datalist[i][j].Location;
		// 							if (Location == "" || Location == "|" || Location.indexOf("|") == -1) {
        //                                 toArr[j] = fromLocation;
        //                             } else {
        //                                 toArr[j] = Location.replace('|', ',')
        //                             }
        //                         }
		// 						var toLocation = toArr.join(";"), dArr = [];
        //                         common.ajaxRequestDist(fromLocation, toLocation, function (res) {
        //                             if (res.status == 0) {
        //                                 for (var k = 0; k < res.result.elements.length; k++) {
        //                                     var num = i * 10 + k - 10;
        //                                     var str = "D" + num;
        //                                     if (res.result.elements[k].distance != -1 && res.result.elements[k].distance != 0) {
        //                                         cArr[str] = res.result.elements[k].distance / 1000 + "km";
        //                                     } else {
        //                                         cArr[str] = "-"
        //                                     }
        //                                     that.setData({
        //                                         cArr: cArr
        //                                     })
        //                                 }
        //                             }
        //                         });
        //                         i++;
        //                     }else{
        //                         clearInterval(timer);
        //                     }
        //                 }, 2000);
        //             }
        //         });
		// 	} else {
		// 		that.setData({
		// 			cData: [],
		// 			cArr: []
		// 		})
		// 	}
        // })
    },
	//新增门店
	addStore: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../customer/addstore'
		})
	},
	//新增场所
	addPlace: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../customer/addplace'
		})
	},
	//门店详情
	customerDetaisl: function (event) {
		var that = this;

		var Guid = event.currentTarget.dataset.guid;
		var Type = event.currentTarget.dataset.type;
		wx.navigateTo({
			url: '../customer/details?Guid=' + Guid + "&Type=" + Type
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

        var userInfo = common.getUserInfo();

        if (common.isLogin()) {
            //获取客户列表
			that.cList();
        }
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