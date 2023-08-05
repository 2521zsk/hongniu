//数据上报查看-执行门店列表
var common = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cData: [],
        eusernumber: "",
        //搜索字段
        searchKey: "",
        StartDate: "开始时间",
        EndDate: "结束时间",
        S_Start: "",
        S_End: "",
        E_Start: "",
        E_End: ""
    },

	/**
	 * 事件处理函数
	 */
    //搜索
    searchSubmit: function (event) {
        var that = this;

        that.setData({
            searchKey: event.detail.value
        })
        //获取执行列表
        that.cList();
    },
    //搜索-开始时间
    StartDateChange: function (event) {
        var that = this;

        if (event.detail.value != that.data.StartDate) {
            that.setData({
                StartDate: event.detail.value
            })
            if (that.data.EndDate == "结束时间") {
                that.setData({
                    EndDate: common.newTime("date")
                })
            }
            that.setData({
                S_Start: "",
                S_End: common.newTime("date"),
                E_Start: event.detail.value,
                E_End: common.newTime("date")
            })
            //获取执行列表
            that.cList();
        }
    },
    //搜索-结束时间
    EndDateChange: function (event) {
        var that = this;

        if (event.detail.value != that.data.EndDate) {
            that.setData({
                EndDate: event.detail.value
            })
            if (that.data.StartDate == "开始时间") {
                that.setData({
                    StartDate: common.backTime(30)
                })
            }
            that.setData({
                S_Start: "",
                S_End: event.detail.value,
                E_Start: that.data.StartDate,
                E_End: common.newTime("date")
            })
            //获取执行列表
            that.cList();
        }
    },
    //清空时间
    clearDate: function (event) {
        var that = this;

        that.setData({
            StartDate: "开始时间",
            EndDate: "结束时间",
            S_Start: "",
            S_End: common.newTime("date"),
            E_Start: "",
            E_End: common.newTime("date")
        })
        //获取执行列表
        that.cList();
    },
    //获取上报列表
    cList: function () {
        var that = this;

        var userInfo = common.getUserInfo();
        var StartDate = that.data.StartDate == "开始时间" ? "" : that.data.StartDate;
        var EndDate = that.data.EndDate == "结束时间" ? "" : that.data.EndDate;

        var param = {
            sfa_t_datauploadbasic: {
                memberid: that.data.eusernumber,
                storename: "",
                startdate: StartDate,
                enddate: EndDate
            }
        }
        // console.log("进入请求呀=======================");
        wx.request({
			url: encodeURI(common.xbApi.apiUrl + common.xbApi.commonurl + common.xbApi.api["did2_25"]),
			data: param,
			method: 'post',
			dataType: 'json',
			header: {
				'token': common.getCookie("token"),
				'Content-Type': 'application/json'
			},
			complete: function (res) {
                console.log(res.data.resp_data.sfa_t_datauploadbasic[0] + "aaaaaaaaaaaaaaaaaaaaaa");
				if (JSON.stringify(res.data.resp_data) != "{}") {
					var datalist = res.data.resp_data.sfa_t_datauploadbasic;
					that.setData({
						cData: datalist
					})
                    // console.log("赋值了！！！！");
				} else {
                    // console.log("空的！！！！");
					that.setData({
						cData: []
					})
				}
			}
		})
    },
    //数据上报详情
    datareportDetaisl: function (event) {
        var that = this;

        var id = event.currentTarget.dataset.id;
        var type = event.currentTarget.dataset.type;
        wx.navigateTo({
            url: '../datareport/details?id=' + id + '&type=' + type
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //初始时间
		let { StartDate } = options;
		let { EndDate } = options;
		if (StartDate != "" && EndDate != "") {
			that.setData({
				StartDate: StartDate,
				EndDate: EndDate,
				S_Start: "",
				S_End: EndDate,
				E_Start: StartDate,
				E_End: common.newTime("date")
			})
		} else {
			that.setData({
				StartDate: "开始时间",
				EndDate: "结束时间",
				S_Start: "",
				S_End: common.newTime("date"),
				E_Start: "",
				E_End: common.newTime("date")
			})
		}
        let { uid } = options;
        that.setData({
            eusernumber: uid
        })

        var userInfo = common.getUserInfo();
        if (common.isLogin()) {
            //获取执行列表
            that.cList();
        }
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