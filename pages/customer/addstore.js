//客户管理-新增门店
const app = getApp()
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
        thisLocation: "",
		location: "",
        //客户类型
        StoreTypeArr: [],
        StoreTypeInx: 0,
        //渠道细分
        ChannelArr: [],
        ChannelInx: 0,
        //客户等级
        GradeArr: [],
        GradeInx: 0,
        //热点区域
        HotspotArr: [],
        HotspotInx: 0,
        //协议分类
        AgreeArr: [],
        AgreeInx: 0,
        //区县
        DistrictArr: [],
        DistrictInx: 0,
        //供应商
        SupplierArr0: [],
        SupplierInx0: 0,
        SupplierArr1: [],
        SupplierInx1: 0,
        SupplierArr2: [],
        SupplierInx2: 0,
        SupplierArr3: [],
        SupplierInx3: 0,
        SupplierArr4: [],
        SupplierInx4: 0,
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
		param["Guid"] = common.uuid();
        //客户等级
        param["StoreRankID"] = that.data.GradeArr[param.GradeID].RowID;
        delete param["GradeID"]
        //客户类型
        param["StoreTypeID"] = that.data.StoreTypeArr[param.StoreType].RowID;
        delete param["StoreType"]
        //渠道细分
        param["ext_32"] = that.data.ChannelArr[param.ChannelID].RowID;
        delete param["ChannelID"]
        //热点区域
        param["ext_20"] = that.data.HotspotArr[param.HotspotID].RowID;
        delete param["HotspotID"]
        //协议分类
        param["ext_22"] = that.data.AgreeArr[param.AgreeID].RowID; 
        delete param["AgreeID"]
        //区县
        param["Col14"] = that.data.DistrictArr[param.DistrictID].SaleAreaID;  
        delete param["DistrictID"]
        //供应商-红牛
        if (that.data.SupplierArr0.length > 0){
            param["ext_25"] = that.data.SupplierArr0[param.SupplierID0].distributorguid;
        }else{
            param["ext_25"] = "";
        }
        delete param["SupplierID0"]
        //供应商-果倍爽
        if (that.data.SupplierArr1.length > 0) {
            param["ext_27"] = that.data.SupplierArr1[param.SupplierID1].distributorguid;   
        } else {
            param["ext_27"] = "";
        }
        delete param["SupplierID1"]
        //供应商-VC
        if (that.data.SupplierArr2.length > 0) {
            param["ext_26"] = that.data.SupplierArr2[param.SupplierID2].distributorguid;   
        } else {
            param["ext_26"] = "";
        }
        delete param["SupplierID2"]
        //供应商-芙丝
        if (that.data.SupplierArr3.length > 0) {
            param["ext_zd_voss"] = that.data.SupplierArr3[param.SupplierID3].distributorguid;   
        } else {
            param["ext_zd_voss"] = "";
        }
        delete param["SupplierID3"]
        //供应商-战马
        if (that.data.SupplierArr4.length > 0) {
            param["ext_zd_zm"] = that.data.SupplierArr4[param.SupplierID4].distributorguid;
        } else {
            param["ext_zd_zm"] = "";
        }
        delete param["SupplierID4"]
        var result = true;
        if (result && param["StoreName"] == "") {
            wx.showToast({
				icon: "none",
				title: "门店名称不能为空",
                duration: 2000
            })
            result = false;
        }
        if (result) {
			console.log(JSON.stringify(param));
            common.ajaxRequestWork("did24", param, function (rec) {
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
            })
        }
        //console.log('form发生了submit事件，携带数据为：', param);
    },
	//客户类型选择
    StoreTypeChange(e) {
        var that = this;

        that.setData({
            StoreTypeInx: e.detail.value,
		})
        //渠道细分
        common.ajaxRequestWork("did18", {
            StoreTypeID: that.data.StoreTypeArr[e.detail.value]["RowID"]
        }, function (rec) {
            that.setData({
                ChannelArr: rec.datalist,
                ChannelInx: 0
            })
        })
	},
    //渠道细分选择
    ChannelChange(e) {
        var that = this;

        that.setData({
            ChannelInx: e.detail.value,
        })
    },
    //客户等级选择
    GradeChange(e) {
        var that = this;

        that.setData({
            GradeInx: e.detail.value,
        })
    },
    //热点区域选择
    HotspotChange(e) {
        var that = this;

        that.setData({
            HotspotInx: e.detail.value,
        })
    },
    //协议分类选择
    AgreeChange(e) {
        var that = this;

        that.setData({
            AgreeInx: e.detail.value,
        })
    },
    //区县选择
    DistrictChange(e) {
        var that = this;

        that.setData({
            DistrictInx: e.detail.value,
        })
        //供应商
        that.SupplierLoad(that.data.DistrictArr[e.detail.value].SaleAreaID);
    },
    //供应商加载
    SupplierLoad(Col) {
        var that = this;

        // var userInfo = common.getUserInfo();
        // var BrandID = ["1204601221239934976"]; 
        var param = {
            ka_kq_channelcustomers: {
                saleareaid: Col,
                brandid: "1204601221239934976"//红牛品牌brandid
            }
        }
        wx.request({
            url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did23"]),
            method: 'post',
            data: param,
            dataType: 'json',
            header: {
                'token': common.getCookie("token"),
                'Content-Type': 'application/json'
            },
            complete: function (res) {
                if (JSON.stringify(res.data.resp_data) != "{}") {
                    var datalist = res.data.resp_data.ka_kq_channelcustomers;
                    that.setData({
                        SupplierArr0: datalist,
                        SupplierInx0: 0
                    })
                } else {
                    that.setData({
                        SupplierArr0: [{
                            distributorguid: "",
                            distributorname: "暂无供应商可选"
                        }],
                        SupplierInx0: 0
                    })
                }
            }
        })
        // common.ajaxRequestWork("did23", {
        //     UserNumber: userInfo[0],
        //     Col14: Col,
        //     BrandID: BrandID[0]
        // }, function (rec) {
        //     if (JSON.stringify(rec) != "{}") {
        //         that.setData({
        //             SupplierArr0: rec.datalist,
        //             SupplierInx0: 0
        //         })
        //     }else{
		// 		that.setData({
		// 			SupplierArr0: [{
		// 				distributorguid: "",
		// 				distributorname: "暂无供应商可选"
		// 			}],
		// 			SupplierInx0: 0
		// 		})
		// 	}
        // })
        // common.ajaxRequestWork("did23", {
        //     UserNumber: userInfo[0],
        //     Col14: Col,
        //     BrandID: BrandID[1]
        // }, function (rec) {
        //     if (JSON.stringify(rec) != "{}") {
        //         that.setData({
        //             SupplierArr1: rec.datalist,
        //             SupplierInx1: 0
        //         })
		// 	} else {
		// 		that.setData({
		// 			SupplierArr1: [{
		// 				distributorguid: "",
		// 				distributorname: "暂无供应商可选"
		// 			}],
		// 			SupplierInx1: 0
		// 		})
		// 	}
        // })
        // common.ajaxRequestWork("did23", {
        //     UserNumber: userInfo[0],
        //     Col14: Col,
        //     BrandID: BrandID[2]
        // }, function (rec) {
        //     if (JSON.stringify(rec) != "{}") {
        //         that.setData({
        //             SupplierArr2: rec.datalist,
        //             SupplierInx2: 0
        //         })
		// 	} else {
		// 		that.setData({
		// 			SupplierArr2: [{
		// 				distributorguid: "",
		// 				distributorname: "暂无供应商可选"
		// 			}],
		// 			SupplierInx2: 0
		// 		})
		// 	}
        // })
        // common.ajaxRequestWork("did23", {
        //     UserNumber: userInfo[0],
        //     Col14: Col,
        //     BrandID: BrandID[3]
        // }, function (rec) {
        //     if (JSON.stringify(rec) != "{}") {
        //         that.setData({
        //             SupplierArr3: rec.datalist,
        //             SupplierInx3: 0
        //         })
		// 	} else {
		// 		that.setData({
		// 			SupplierArr3: [{
		// 				distributorguid: "",
		// 				distributorname: "暂无供应商可选"
		// 			}],
		// 			SupplierInx3: 0
		// 		})
		// 	}
        // })
        // common.ajaxRequestWork("did23", {
        //     UserNumber: userInfo[0],
        //     Col14: Col,
        //     BrandID: BrandID[4]
        // }, function (rec) {
        //     if (JSON.stringify(rec) != "{}") {
        //         that.setData({
        //             SupplierArr4: rec.datalist,
        //             SupplierInx4: 0
        //         })
		// 	} else {
		// 		that.setData({
		// 			SupplierArr4: [{
		// 				distributorguid: "",
		// 				distributorname: "暂无供应商可选"
		// 			}],
		// 			SupplierInx4: 0
		// 		})
		// 	}
        // })
    },
    //供应商选择
    SupplierChange0(e) {
        var that = this;

        that.setData({
            SupplierInx0: e.detail.value,
        })
    },
    SupplierChange1(e) {
        var that = this;

        that.setData({
            SupplierInx1: e.detail.value,
        })
    },
    SupplierChange2(e) {
        var that = this;

        that.setData({
            SupplierInx2: e.detail.value,
        })
    },
    SupplierChange3(e) {
        var that = this;

        that.setData({
            SupplierInx3: e.detail.value,
        })
    },
    SupplierChange4(e) {
        var that = this;

        that.setData({
            SupplierInx4: e.detail.value,
        })
    },
	//地址框输入转换
	AddressChange(e) {
		var that = this;
		common.ajaxRequestAddress(e.detail.value, function (rec) {
			that.setData({
				location: common.locationStr(rec.result.location)
			})
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

        //客户类型
        wx.request({
			url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did17"]),
			method: 'post',
			dataType: 'json',
			header: {
				'token': common.getCookie("token"),
				'Content-Type': 'application/json'
			},
			complete: function (res) {
				if (JSON.stringify(res.data.resp_data) != "{}") {
					var datalist = res.data.resp_data.pl_dictionary;
					that.setData({
						StoreTypeArr: datalist,
                        StoreTypeInx: 0
					})
				} else {
					that.setData({
						StoreTypeArr: []
					})
				}
                //渠道细分
                var param = {
                    kx_parameters: {
                        storetypeid: that.data.StoreTypeArr[0]["dickey"]
                    }
                }
                wx.request({
                    url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did18"]),
                    method: 'post',
                    data: param,
                    dataType: 'json',
                    header: {
                        'token': common.getCookie("token"),
                        'Content-Type': 'application/json'
                    },
                    complete: function (res) {
                        if (JSON.stringify(res.data.resp_data) != "{}") {
                            var datalist = res.data.resp_data.pl_dictionary;
                            that.setData({
                                ChannelArr: datalist,
                                ChannelInx: 0
                            })
                        } else {
                            that.setData({
                                StoreTypeArr: []
                            })
                        }
                    }
                })
			}
		})
    //     //客户类型
    //     common.ajaxRequestWork("did17", {}, function (rec) {
    //         that.setData({
    //             StoreTypeArr: rec.datalist,
    //             StoreTypeInx: 0
    //         })
    //         //渠道细分
    //         common.ajaxRequestWork("did18", {
    //             StoreTypeID: that.data.StoreTypeArr[0]["RowID"]
    //         }, function (rec) {
    //             that.setData({
    //                 ChannelArr: rec.datalist,
    //                 ChannelInx: 0
    //             })
    //         })
    //    })

        //客户等级
        wx.request({
            url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did19"]),
            method: 'post',
            dataType: 'json',
            header: {
                'token': common.getCookie("token"),
                'Content-Type': 'application/json'
            },
            complete: function (res) {
                if (JSON.stringify(res.data.resp_data) != "{}") {
                    var datalist = res.data.resp_data.kx_storelevel;
                    that.setData({
                        GradeArr: datalist,
                        GradeInx: 0
                    })
                } else {
                    that.setData({
                        StoreTypeArr: []
                    })
                }
            }
        })
        // //客户等级
        // common.ajaxRequestWork("did19", {}, function (rec) {
        //     that.setData({
        //         GradeArr: rec.datalist,
        //         GradeInx: 0
        //     })
        // })

        //热点区域
        var param = {
            kx_param: {

            }
        }
        wx.request({
            url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did20"]),
            method: 'post',
            data: param,
            dataType: 'json',
            header: {
                'token': common.getCookie("token"),
                'Content-Type': 'application/json'
            },
            complete: function (res) {
                if (JSON.stringify(res.data.resp_data) != "{}") {
                    var datalist = res.data.resp_data.pl_dictionary;
                    that.setData({
                        HotspotArr: datalist,
                        HotspotInx: 0
                    })
                } else {
                    that.setData({
                        HotspotArr: []
                    })
                }
            }
        })
        // //热点区域
        // common.ajaxRequestWork("did20", {}, function (rec) {
        //     that.setData({
        //         HotspotArr: rec.datalist,
        //         HotspotInx: 0
        //     })
        // })

        //协议分类
        var param = {
            "kx_parameters": {
                "storetypeid": ""
            }
        }
        wx.request({
            url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did21"]),
            method: 'post',
            data: param,
            dataType: 'json',
            header: {
                'token': common.getCookie("token"),
                'Content-Type': 'application/json'
            },
            complete: function (res) {
                if (JSON.stringify(res.data.resp_data) != "{}") {
                    var datalist = res.data.resp_data.pl_dictionary;
                    that.setData({
                        AgreeArr: datalist,
                        AgreeInx: 0
                    })
                } else {
                    that.setData({
                        AgreeArr: []
                    })
                }
            }
        })
        // //协议分类
        // common.ajaxRequestWork("did21", {}, function (rec) {
        //     that.setData({
        //         AgreeArr: rec.datalist,
        //         AgreeInx: 0
        //     })
        // })

        //区县
        wx.request({
            url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did22"]),
            method: 'post',
            dataType: 'json',
            header: {
                'token': common.getCookie("token"),
                'Content-Type': 'application/json'
            },
            complete: function (res) {
                if (JSON.stringify(res.data.resp_data) != "{}") {
                    var datalist = res.data.resp_data.kx_salearea;
                    that.setData({
                        DistrictArr: datalist,
                        DistrictInx: 0
                    })
                    //供应商
                    that.SupplierLoad(datalist[0].saleareaid);
                } else {
                    that.setData({
                        DistrictArr: []
                    })
                }
            }
        })
        // //区县
        // common.ajaxRequestWork("did22", {
        //     UserNumber: userInfo[0]
        // }, function (rec) {
        //     console.log(rec)
        //     that.setData({
        //         DistrictArr: rec.datalist,
        //         DistrictInx: 0
        //     })
        //     //供应商
        //     that.SupplierLoad(rec.datalist[0].saleareaid);
        // })
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