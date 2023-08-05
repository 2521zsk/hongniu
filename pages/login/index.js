//登录
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "",		//账号
		password: "",	//密码
		errMsg:""
	},

	/**
	 * 事件处理函数
	 */
	//登录
	loginSubmit: function (event) {
		var that = this;

		var result = true;
		var data = {};
		data["username"] = that.data.username;
		data["password"] = that.data.password;
		data["clienttypecode"] = "1";
		if (result && data["username"] == "") {
			wx.showToast({
				icon: "none",
				title: "账号不能为空",
				duration: 2000
			})
			result = false;
		}
		if (result && data["password"] == "") {
			wx.showToast({
				icon: "none",
				title: "密码不能为空",
				duration: 2000
			})
			result = false;
		}
		// console.log(data);
		if (result) {
			common.ajaxRequestNoLogin("login", data, function (rec) {
                //保存登录信息
                // var str = rec.token + "," + rec.tenants[0].accountcode + "," + rec.mobile + "," + rec.sessionid;
				common.setCookie("token", rec.token);
				wx.setStorageSync("token", rec.token)
				wx.setStorageSync("username", data["username"])
				wx.setStorageSync("password", data["password"])
				wx.setStorageSync("enterprise", rec.tenants[0].accountcode)
				
				//调用接口获取用户position
				// console.log("调用接口getaccountinfo--------------------")
				// console.log(common.xbApi.apiUrl + "--");
				// console.log(common.xbApi.api[getaccountinfo] + "-————-");
                wx.request({
					url: encodeURI(common.xbApi.apiUrl + "api/teapi/rolepermission/account/getaccountinfo"),
					data: {
						"appcode": "sales",
						"clientversion": "V8.2.0",
						"positionid": ""
					},
					method: 'post',
					dataType: 'json',
					header: {
						'token': wx.getStorageSync("token"),
						'Content-Type': 'application/json'
					},
					success: function (res) {
						if (res.data.error_code) {
						  	that.setData({
							errMsg: res.data.error_code
						  })
						} else {
							var str = res.data.resp_data.username1 + "," + 
											res.data.resp_data.phonenumber + "," + 
											res.data.resp_data.positionname + "," + 
											res.data.resp_data.userinfoid + "," + 
											res.data.resp_data.mbcode + "," +	//memberid
											res.data.resp_data.refpositionid;		//positionid
							common.setCookie("Token", str);
							//保存职位列表
							wx.setStorageSync("rolelist", res.data.resp_data.positions)
							wx.setStorageSync("roleid", res.data.resp_data["refpositionid"])
							console.log(res.data.resp_data["refpositionid"] + "lllllllllllllll")
							if (res.data.resp_data.positions.length > 1) {
								wx.hideLoading()
								wx.redirectTo({
									url: '../chooserole/chooserole',
								})
								// console.log("跳转选职业---------------");
							} else if(res.data.resp_data.positions.length == 1) {
								wx.redirectTo({
									url: '../index/index',
								})
							} else {//无职位信息
								wx.redirectTo({
									url: '../login/index',
								})
							}
						}
					  },
					  fail: function () {
						that.setData({
						  errMsg: "登录失败！"
						})
					  }
				})
			});
		}
	},
	//帐号-输入
	mobileInputEvent: function (e) {
		var that = this;
		that.setData({
			username: e.detail.value
		})
	},
	//密码-输入
	passwordInputEvent: function (e) {
		var that = this;
		that.setData({
			password: e.detail.value
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