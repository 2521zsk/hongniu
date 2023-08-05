//个人中心
var common = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//角色[默认无]
		roleData: [0, ""],
		usernumber: "",
		//登录按钮
		hasLoginBtn: 0
	},

	/**
	 * 事件处理函数
	 */
	//返回首页
	viewIndex: function (event) {
		wx.navigateBack({
			delta: 1
		})
	},
	//修改密码
	changePassword: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../user/psw'
		})
	},
	//考勤
	checkWork: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../checkwork/index'
		})
	},
	//物料管理
	materielManage: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../materiel/index'
		})
	},
	//客户管理
	customerManage: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../customer/index'
		})
	},
	//促销执行查看
	carryoutView: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../carryout/index'
		})
	},
	//数据上报查看
	datareportView: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../datareport/index'
		})
	},
	//考勤查看
	checkView: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../check/index'
		})
	},
    //促销执行查看-督导/推广员
    carryoutViewX: function (event) {
        var that = this;

        wx.navigateTo({
            url: '../roleselect/index'
        })
    },
    //数据上报查看-督导/推广员
    datareportViewX: function (event) {
        var that = this;

        wx.navigateTo({
            url: '../roleselect/data'
        })
    },
	//考勤查看-督导/推广员
	checkViewX: function (event) {
		var that = this;

		wx.navigateTo({
			url: '../roleselect/check'
		})
	},
	//退出登录
	logout: function (event) {
		var that = this;
		
		wx.showModal({
			content: '确认退出当前账号吗?',
			confirmText: "取消",
			confirmColor: "#f03d56",
			cancelText: "确认",
			cancelColor: "#000000",
			success(res) {
				if (res.confirm) {
					console.log('用户点击取消')
				} else if (res.cancel) {
					//删除登录信息
					common.delCookie("token");
					common.delCookie("Token");
					common.delCookie("Role");
					// console.log(getCookie("Token"));
					//返回首页
					wx.reLaunch({
						url: '../index/index'
					})
				}
			}
		})
	},
	//前往登录
	goLogin: function (event) {
		wx.navigateTo({
			url: '../login/index'
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

		if (common.isLogin()){
			var userInfo = common.getUserInfo();
			
			that.setData({
				hasLoginBtn: 0,
				usernumber: userInfo[1],
				roleData: common.xbApi.roleArr[wx.getStorageSync("roleid")]
			})
		} else {
			that.setData({
				hasLoginBtn: 1
			})
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