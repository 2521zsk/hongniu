//数据上报详情
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		RowID: "",
		Type: 1,
        aData: "",	//基本信息&备注
        cData: "",	//进货
        eData: "",	//赠饮
        fData: "",	//团购
        gData: "",	//渠道销售
        kData: "",	//品牌销售
		Cur: 0,
		CurArr: ["", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden"],
		CurLoad: [0, 0, 0, 0, 0, 0, 0],
		bData: ""
	},

	/**
	 * 事件处理函数
	 */
	//详情切换
	detailsSwitch: function (event) {
		var that = this;

		var Cur = event.currentTarget.dataset.cur;
		if (Cur != that.data.Cur){
			var CurArr = that.data.CurArr;
			for (var i = 0; i < CurArr.length; i++) {
				if (i == Cur) {
					CurArr[i] = "";
				} else {
					CurArr[i] = "hidden";
				}
			}
			that.setData({
				Cur: Cur,
				CurArr: CurArr
			})
			if(Cur == 0 || Cur == 3){
				that.aList();	//加载基本信息&备注
            } else if (Cur == 1) {
                that.cList();	//加载进货
            } else if (Cur == 2) {
                that.gList();	//加载渠道销售
            } else if (Cur == 4) {
				that.eList();	//加载赠饮
            } else if (Cur == 5) {
                that.kList();	//加载品牌销售
            } else if (Cur == 6) {
                that.fList();	//加载团购
            }
		}
	},
	//加载基本信息&备注
	aList: function () {
		var that = this;

		var CurLoad = that.data.CurLoad;
		var param1 = {
			sfa_t_datauploadbasic: {
				id: that.data.RowID
			}
		}
		var param2 = {
			sfa_t_datauploadgifit: {
				basicid: that.data.RowID
			}
		}
		if (CurLoad[0] == 0 || CurLoad[3] == 0){
			//基本信息&备注
			wx.request({
				url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_26"]),
				data: param1,
				method: 'post',
				dataType: 'json',
				header: {
					'token': common.getCookie("token"),
					'Content-Type': 'application/json'
				},
				complete: function (res) {
					if (JSON.stringify(res.data.resp_data) != "{}") {
						var datalist = res.data.resp_data.sfa_t_datauploadbasic[0];
						that.setData({
							aData: datalist
						})
						// console.log("赋值了！！！！");
					} else {
						// console.log("空的！！！！");
						that.setData({
							aData: []
						})
					}
				}
			})
			CurLoad[0] = 1;
			CurLoad[3] = 1;
			//礼品使用登记
			wx.request({
				url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_27"]),
				data: param2,
				method: 'post',
				dataType: 'json',
				header: {
					'token': common.getCookie("token"),
					'Content-Type': 'application/json'
				},
				complete: function (res) {
					if (JSON.stringify(res.data.resp_data) != "{}") {
						var datalist = res.data.resp_data.sfa_t_datauploadgifit;
						that.setData({
							bData: datalist
						})
						// console.log("赋值了！！！！");
					} else {
						// console.log("空的！！！！");
						that.setData({
							bData: []
						})
					}
				}
			})

			//基本信息&备注
			// common.ajaxRequestWork("did2_26", {
			// 	RowID: that.data.RowID
			// }, function (rec) {
			// 	if (JSON.stringify(rec) != "{}") {
			// 		that.setData({
			// 			aData: rec.datalist[0]
			// 		})
			// 	} else {
			// 		that.setData({
			// 			aData: ""
			// 		})
			// 	}
			// 	//标记已加载
			// 	CurLoad[0] = 1;
			// 	CurLoad[3] = 1;
			// })
			// //礼品使用登记
			// common.ajaxRequestWork("did2_27", {
			// 	RowID: that.data.RowID
			// }, function (rec) {
			// 	if (JSON.stringify(rec) != "{}") {
			// 		that.setData({
			// 			bData: rec.datalist
			// 		})
			// 	} else {
			// 		that.setData({
			// 			bData: []
			// 		})
			// 	}
			// })
		}
	},
	//加载进货
	cList: function () {
		var that = this;

		var CurLoad = that.data.CurLoad;
		if (CurLoad[1] == 0) {
			//进货
			common.ajaxRequestWork("did2_28", {
				RowID: that.data.RowID
			}, function (rec) {
				if (JSON.stringify(rec) != "{}") {
					that.setData({
						cData: rec.datalist[0]
					})
				} else {
					that.setData({
						cData: ""
					})
				}
				//标记已加载
				CurLoad[1] = 1;
			})
		}
	},
	//加载赠饮
	eList: function () {
		var that = this;

		var CurLoad = that.data.CurLoad;
		var param = {
			sfa_t_datauploadofferdrink: {
				basicid: that.data.RowID
			}
		}
		if (CurLoad[4] == 0) {
			//赠饮
			wx.request({
				url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_30"]),
				data: param,
				method: 'post',
				dataType: 'json',
				header: {
					'token': common.getCookie("token"),
					'Content-Type': 'application/json'
				},
				complete: function (res) {
					if (JSON.stringify(res.data.resp_data) != "{}") {
						var datalist = res.data.resp_data.sfa_t_datauploadofferdrink[0];
						that.setData({
							eData: datalist
						})
						// console.log("赋值了！！！！");
					} else {
						// console.log("空的！！！！");
						that.setData({
							eData: []
						})
					}
				}
			})

			//赠饮
			// common.ajaxRequestWork("did2_30", {
			// 	RowID: that.data.RowID
			// }, function (rec) {
			// 	if (JSON.stringify(rec) != "{}") {
			// 		that.setData({
			// 			eData: rec.datalist[0]
			// 		})
			// 	} else {
			// 		that.setData({
			// 			eData: ""
			// 		})
			// 	}
			// 	//标记已加载
			// 	CurLoad[4] = 1;
			// })
		}
	},
    //加载团购
    fList: function () {
        var that = this;

        var CurLoad = that.data.CurLoad;
		var param = {
			sfa_t_datauploadgroupbuying: {
				basicid: that.data.RowID
			}
		}
        if (CurLoad[6] == 0) {
			//团购
			wx.request({
				url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_31"]),
				data: param,
				method: 'post',
				dataType: 'json',
				header: {
					'token': common.getCookie("token"),
					'Content-Type': 'application/json'
				},
				complete: function (res) {
					if (JSON.stringify(res.data.resp_data) != "{}") {
						var datalist = res.data.resp_data.sfa_t_datauploadgroupbuying[0];
						that.setData({
							fData: datalist
						})
						// console.log("赋值了！！！！");
					} else {
						// console.log("空的！！！！");
						that.setData({
							fData: []
						})
					}
				}
			})

            // //团购
            // common.ajaxRequestWork("did2_31", {
            //     RowID: that.data.RowID
            // }, function (rec) {
            //     if (JSON.stringify(rec) != "{}") {
            //         that.setData({
            //             fData: rec.datalist[0]
            //         })
            //     } else {
            //         that.setData({
            //             fData: ""
            //         })
            //     }
            //     //标记已加载
            //     CurLoad[6] = 1;
            // })
        }
    },
    //加载渠道销售
    gList: function () {
        var that = this;

        var CurLoad = that.data.CurLoad;
		var param = {
			sfa_t_datauploadsales: {
				id: that.data.RowID
			}
		}
        if (CurLoad[2] == 0) {
			//渠道销售
			wx.request({
				url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_41"]),
				data: param,
				method: 'post',
				dataType: 'json',
				header: {
					'token': common.getCookie("token"),
					'Content-Type': 'application/json'
				},
				complete: function (res) {
					if (JSON.stringify(res.data.resp_data) != "{}") {
						var datalist = res.data.resp_data.sfa_t_datauploadgroupbuying[0];
						that.setData({
							gData: datalist
						})
						// console.log("赋值了！！！！");
					} else {
						// console.log("空的！！！！");
						that.setData({
							gData: []
						})
					}
				}
			})

            // //渠道销售
            // common.ajaxRequestWork("did2_41", {
            //     RowID: that.data.RowID
            // }, function (rec) {
            //     if (JSON.stringify(rec) != "{}") {
            //         that.setData({
            //             gData: rec.datalist[0]
            //         })
            //     } else {
            //         that.setData({
            //             gData: ""
            //         })
            //     }
            //     //标记已加载
            //     CurLoad[2] = 1;
            // })
        }
    },
    //加载品牌销售
    kList: function () {
        var that = this;

        var CurLoad = that.data.CurLoad;
		var param = {
			sfa_t_datauploadsalesb: {
				basicid: that.dat.RowID
			}
		}
        if (CurLoad[5] == 0) {
			//品牌销售
			wx.request({
				url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_29"]),
				data: param,
				method: 'post',
				dataType: 'json',
				header: {
					'token': common.getCookie("token"),
					'Content-Type': 'application/json'
				},
				complete: function (res) {
					if (JSON.stringify(res.data.resp_data) != "{}") {
						var datalist = res.data.resp_data.sfa_t_datauploadsalesb[0];
						that.setData({
							kData: datalist
						})
						// console.log("赋值了！！！！");
					} else {
						// console.log("空的！！！！");
						that.setData({
							kData: []
						})
					}
				}
			})

            // //品牌销售
            // common.ajaxRequestWork("did2_29", {
            //     RowID: that.data.RowID
            // }, function (rec) {
            //     if (JSON.stringify(rec) != "{}") {
            //         that.setData({
            //             kData: rec.datalist[0]
            //         })
            //     } else {
            //         that.setData({
            //             kData: ""
            //         })
            //     }
            //     //标记已加载
            //     CurLoad[5] = 1;
            // })
        }
    },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		let { id } = options;
		let { type } = options;
		console.log(type)

		that.setData({
			RowID: id,
			Type: type
		})
		//默认加载
		that.aList();
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