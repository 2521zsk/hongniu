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
		ActivityType: "a",		//活动类型
		//奖品数组
		awardArr: [
			{
				name: "",
				number: ""
			}
		],
		usernumber: "",
		formShow: ['', 'hidden', 'hidden', 'hidden', 'hidden']
	},

	/**
	 * 事件处理函数
	 */
	//表单数据提交-基本信息
	formSubmitIndex: function (e) {
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
		if (result) {
			for (var i = 0; i < awardArr.length; i++) {
				if (awardArr[i].name == "") {
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
		param['awardArr'] = awardArr;
		if (result) {
			that.setData({
				param_index: param
			});
			that.Next(param["FShow"]);	//下一步
		}
		console.log('form发生了submit事件，携带数据为：', that.data.param_index);
	},
	//表单数据提交-进货A2
	formSubmitA2: function (e) {
		var that = this;

		var param = e.detail.value;
		param['VisitDate'] = common.newTime();
		var result = false, len = 13;
		for (var i = 1; i <= len; i++) {
			if (!result && param["A" + i] != "") {
				result = true;
			}
		}
		if (result) {
			that.setData({
				param_a2: param
			});
		}
		that.Next(param["FShow"]);	//下一步
		console.log('form发生了submit事件，携带数据为：', that.data.param_a2);
	},
	//表单数据提交-销售A3
	formSubmitA3: function (e) {
		var that = this;

		var param = e.detail.value;
		param['VisitDate'] = common.newTime();
		var result = false, len = 18;
		for (var i = 1; i <= len; i++) {
			if (!result && param["A" + i] != "") {
				result = true;
			}
		}
		if (result) {
			that.setData({
				param_a3: param
			});
		}
		that.Next(param["FShow"]);	//下一步
		console.log('form发生了submit事件，携带数据为：', that.data.param_a3);
	},
	//表单数据提交-赠饮B2
	formSubmitB2: function (e) {
		var that = this;

		var param = e.detail.value;
		param['VisitDate'] = common.newTime();
		var result = false, len = 13;
		for (var i = 1; i <= len; i++) {
			if (!result && param["A" + i] != "") {
				result = true;
			}
		}
		if (result) {
			that.setData({
				param_b2: param
			});
		}
		that.Next(param["FShow"]);	//下一步
		console.log('form发生了submit事件，携带数据为：', that.data.param_b2);
	},
	//表单数据提交-销售B3
	formSubmitB3: function (e) {
		var that = this;

		var param = e.detail.value;
		param['VisitDate'] = common.newTime();
		var result = false, len = 13;
		for (var i = 1; i <= len; i++) {
			if (!result && param["A" + i] != "") {
				result = true;
			}
		}
		if (result) {
			that.setData({
				param_b3: param
			});
		}
		that.Next(param["FShow"]);	//下一步
		console.log('form发生了submit事件，携带数据为：', that.data.param_b3);
	},
	//表单数据提交-团购B4
	formSubmitB4: function (e) {
		var that = this;

		var param = e.detail.value;
		param['VisitDate'] = common.newTime();
		var result = false, len = 13;
		for (var i = 1; i <= len; i++) {
			if (!result && param["A" + i] != "") {
				result = true;
			}
		}
		if (result) {
			that.setData({
				param_b4: param
			});
		}
		that.Next(param["FShow"]);	//下一步
		console.log('form发生了submit事件，携带数据为：', that.data.param_b4);
	},
	//表单数据提交-备注
	formSubmitNote: function (e) {
		var that = this;

		var param = e.detail.value;
		param['VisitDate'] = common.newTime();
		var result = false;
		if (param["Remark"] != "") {
			result = true;
		}
		if (result) {
			that.setData({
				param_note: param
			});
		}
		wx.showLoading({ title: "加载中..." }); //加载开启
		var est = {}, k = 0;
		//保存数据-基本信息
		var awardArr = that.data.param_index["awardArr"];
		var param_index = that.data.param_index;
		delete param_index["FShow"];
		delete param_index["awardArr"];
		param_index['SerialNumber']		= 1;
		param_index['ProductName'] 		= awardArr[0].name;
		param_index['ProductNumber']	= awardArr[0].number;
		est["inx0"] = false;
		common.ajaxRequestWorkNoload("did9", param_index, function (rec) {
			est["inx0"] = true;
			if (that.data.ActivityType == "a") {
				//保存数据-进货A2
				if (that.data.param_a2 != undefined){
					est["a2"] = false;
					common.ajaxRequestWorkNoload("did10", that.data.param_a2, function (rec) {
						est["a2"] = true;
					});
				}
				//保存数据-销售A3
				if (that.data.param_a3 != undefined){
					est["a3"] = false;
					common.ajaxRequestWorkNoload("did11", that.data.param_a3, function (rec) {
						est["a3"] = true;
					});
				}
			}else{
				//保存数据-赠饮B2
				if (that.data.param_b2 != undefined) {
					est["b2"] = false;
					common.ajaxRequestWorkNoload("did13", that.data.param_b2, function (rec) {
						est["b2"] = true;
					});
				}
				//保存数据-销售B3
				if (that.data.param_b3 != undefined) {
					est["b3"] = false;
					common.ajaxRequestWorkNoload("did14", that.data.param_b3, function (rec) {
						est["b3"] = true;
					});
				}
				//保存数据-团购B4
				if (that.data.param_b4 != undefined) {
					est["b4"] = false;
					common.ajaxRequestWorkNoload("did15", that.data.param_b4, function (rec) {
						est["b4"] = true;
					});
				}
			}
			//保存数据-多个礼品
			if (awardArr.length > 1){
				est["inx1"] = false;
				for (var i = 1; i < awardArr.length; i++) {
					est["inx" + i] = false;
					param_index['SerialNumber'] 	= i + 1;
					param_index['ProductName'] 		= awardArr[i].name;
					param_index['ProductNumber']	= awardArr[i].number;
					common.ajaxRequestWorkNoload("did9", param_index, function (rec) {
						est["inx1"] = true;
					});
				}
			}
			//保存数据-备注
			if (that.data.param_note != undefined) {
				est["note"] = false;
				common.ajaxRequestWorkNoload("did12", that.data.param_note, function (rec) {
					est["note"] = true;
				});
			}
			var timer = setInterval(function(){
				console.log(JSON.stringify(est));
				var ret = true;
				for (var key in est) {
					if(!est[key]){
						ret = false;
					}
				}
				if(ret){
					clearInterval(timer);
					wx.hideLoading(); //加载关闭
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
					}, 1500);
				}
			}, 1000)
		});
		console.log('form发生了submit事件，携带数据为：', that.data.param_note);
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
	//下一步
	Next: function (inx) {
		var that = this;

		var formShow = that.data.formShow;
		for (var i = 0; i < formShow.length; i++){
			if(i == inx){
				formShow[i] = "";
			}else{
				formShow[i] = "hidden";
			}
		}
		if (inx == 1 || inx == 2 || inx == 3){
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 100
			})
		}
		that.setData({
			formShow: formShow
		})
	},
	//上一步
	Prev: function (event) {
		var that = this;

		var formShow = that.data.formShow;
		var inx = event.currentTarget.dataset.inx;
		for (var i = 0; i < formShow.length; i++) {
			if (i == inx) {
				formShow[i] = "";
			} else {
				formShow[i] = "hidden";
			}
		}
		if (inx == 1 || inx == 2 || inx == 3) {
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 100
			})
		}
		that.setData({
			formShow: formShow
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
		console.log(options);

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