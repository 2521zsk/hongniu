var md5 = require('md5.js')
var QQMapWX = require('qqmap-wx-jssdk.js');

//接口API
var xbApi = {
	// apiUrl: "https://hn.xtion.net/",
	apiUrl: "http://47.111.161.7:7000/",
	picUrl: "https://hn.xtion.net/",
	commonurl: "api/teapi/dy-biz/",		//共用前缀
    api: {
        //用户相关接口
        login: "api/auth/login",                  	//1.登录
        modifyPsw: "api/teapi/account/account/changepwd",              	//2.修改密码
        resetPsw: "account/resetpassword",          	//3.重置密码
		//业务相关接口
		datasource: "datasource",						//4.业务接口
		//业务接口数据源ID
		// did1: "67580f5b-8d9a-467b-b2c4-284c5262a23d",	//1）我的促销点
		did1:"1678218568262619221/1681106152865271894",
		// did2: "fe316e71-ae47-4474-b90f-0037ad83598d",	//2）角色ID获取
		did2: "1678218568262619221/1678218568262619219",
		// did3: "597b5b93-3aea-4463-b1da-2b536bb1469e",	//3）促销签到/签退
		did3: "/",
		// did4: "bb15d261-ef85-4dd3-9bca-9e666a9cc238",	//4）促销执行
		did4: "/",
		// did5: "5df91438-dbf9-45f4-b9f8-206d24620638",	//5）物料管理-新增
		did5: "/",
		// did6: "41fd6225-793b-4ae9-bd51-38a22842e944",	//6）新增场所
		did6: "/",
		// did7: "55323b6c-27d9-4571-9888-98f574da1bdb",	//7）推广员考勤
		did7: "/",
		// did8: "bbe85ef7-b976-4ce8-be49-bdeb4ca05698",	//8）物料管理-列表
		did8: "/",
        // did9: "868573f5-8688-4298-9262-c5d5cd17d0f5",	//9）数据上报—基本信息A1/B1
		did9: "/",
        // did10: "ef26714a-26dc-4e5b-bb64-182a7c6c33c6",	//10）数据上报——进货A2
		did10: "/",
        // did11: "82d6d01a-6c40-4904-8dde-70f068c0f39f",	//11）数据上报——销售A3
		did11: "/",
        // did12: "7fbf57ff-bac4-4279-8175-bcac3ec26c6c",	//12）数据上报——备注A4/B5
		did12: "/",
        // did13: "9701b265-f1b2-4a9b-80d1-3d227391ae59",	//13）数据上报——赠饮B2
		did13: "/",
        // did14: "53d66d54-8427-4c02-8ece-c9bd70aa9329",	//14）数据上报——销售B3
		did14: "/",
        // did15: "c48ae1bc-427d-4a8d-b1c3-5444daca835e",	//15）数据上报——团购B4
		did15: "/",
        // did16: "03a6e083-cefe-4284-be3b-f915da2f0800",	//16）我的客户列表
		did16: "1678218568262619221/1687292135151374402",
        // did17: "0f9bffa6-ca22-4b8f-9106-ff9f34896ec3",	//17.1）客户类型
		did17: "1678218568262619221/1678296028215906401",
        // did18: "37f04219-0484-4478-a190-b3ac6cbbc954",	//17.2）渠道细分
		did18: "1678218568262619221/1678211406845055075",
        // did19: "8a822ff2-f44b-44a4-a83f-c45e742d6881",	//17.3）客户等级
		did19: "1678218568262619221/1678223527951601713",
        // did20: "a9729077-1cb1-4780-b980-3bb6661b243e",	//17.4）热点区域
		did20: "1678218568262619221/1678321929523695626",
        // did21: "366221fb-f23e-463b-b9d6-ad831247eef1",	//17.5）协议分类
		did21: "1678218568262619221/1678656334846890075",
        // did22: "26cca927-9a78-4d67-9bb0-9d116ed03212",	//17.6）区县
		did22: "1678218568262619221/1681471959524839520",
        // did23: "9f2fc288-f5ff-463c-a8ce-e4aab6488b3a",	//17.7）供应商查询
		did23: "1678218568262619221/1682199779628683363",
        // did24: "43d7752d-a9ce-4488-a298-5cc0dbfcf0cb",	//17）新增门店
		did24: "/",
		// did25: "7e43c235-30d5-43bf-9761-f513180462fd",	//18）数据上报-基本信息获取
		did25: "/",
		// did26: "cb06e5fc-855a-4a47-8fc1-d45ea977c48e",	//19）场所类型获取
		did26: "/",
		// did27: "7539aa2e-a9b8-4ec9-b903-2504e7dc7f72",	//20）场所类型细分
		did27: "/",
		// did28: "6454809d-9ccc-48cd-81c3-701553fc754c",	//28）促销执行和检查查重
		did28: "/",
		//业务接口数据源ID（二期）
		did2_23: "2d7d0547-272d-408a-a265-913a27760845",	//23）促销执行查看-执行列表(促销员)  （读库）
		did: "/",
		// did2_24: "7076e0dd-b759-48b0-a826-f5f7ec6d2ad5",	//24）促销执行查看-查看详情(促销员)  （读库）
		did2_24: "1678218568262619221/1679378479474413666",

		// did2_25: "c45cad34-edac-4207-b996-053200cc3f58",	//25）数据上报查看-查看列表(促销员)  （读库）
		did2_25: "1678218568262619221/1679296176958083161",
		// did2_26: "52475fe4-5fbe-43ed-89c5-a13c7c326d6f",	//26）数据上报查看-查看基本信息(促销员)  （读库）
		did2_26: "1678218568262619221/1678594539012624459",
		// did2_27: "cf15f68f-068d-4c1b-83f5-6c9195aab99f",	//27）数据上报查看-礼品信息(促销员)  （读库）
		did2_27: "1678218568262619221/1678342676979781731",
		did2_28: "26663a54-e783-4200-9316-796a4d232870",	//28）数据上报查看-进货信息(促销员)  （读库）
		did: "/",
		// did2_29: "5e1fcacd-d639-4dfd-ae67-17ff92f66998",	//29）数据上报查看-品牌销售信息(促销员) （读库）
		did2_29: "1678218568262619221/1678321929523695681",
		did2_30: "10fd73c8-6aa1-41b8-a3a5-154032d1bb97",	//30）数据上报查看-赠饮信息(促销员) （读库）
		did2_30: "1678218568262619221/1678321929523695703",
		did2_31: "1e4ad410-53a1-41d9-9a89-19c84f4dadca",	//31）数据上报查看-团购信息(促销员) （读库）
		did2_31: "1678218568262619221/1678321929523695627",
		did2_33: "15d10148-5b4b-47cd-84e2-c6754293a646",	//33）门店/场所详情查询(推广员)  (读库)
		did2_33: "1678218568262619221/1682199779628683354",
		// did2_34: "c14cc190-8ec5-43eb-ab29-261aa6a0aa22",	//34）促销执行查看-执行人员列表(督导/推广员版)
		did2_34: "1678218568262619221/1681471959524839503",
		// did2_35: "066d3b88-e609-43de-b24a-a72f1c40eb28",	//35）促销执行查看-执行门店列表(督导/推广员版)
		did2_35: "1678218568262619221/1678656334846890080",
		// did2_36: "f27c78be-1d92-4e22-bf87-3137e6eb6aac",	//36）数据上报查看-执行人员列表(督导/推广员版)
		did2_36: "1678218568262619221/1681556663582199905",
		did2_37: "2592763b-1540-472a-9711-ae2bfd0614d2",	//37）数据上报查看-执行门店列表(督导/推广员版)
		did2_38: "80dd87fa-5ac1-443f-8a0b-c7125fb5071f",	//38）小程序段查看历史角色下拉列表
		// did2_32: "ae363873-4f10-4932-913d-6f43fb4e3cfd",	//32）物料列表栏(推广员)  （写库）
		did2_32: "1678218568262619221/1679296176958083168",
		did2_39: "1a8846a8-a456-4463-8844-510be5cbe517",	//39) 物料管理（添加门店属性） （写库）
		// did2_40: "9a4a97f7-8af9-4078-8324-77422b9f689d",	//40) 促销-物料管理-门店列表
		did2_40:"1678218568262619221/1681106152865271904",
        // did2_41: "4f3e1221-6de4-4cc7-9f7d-74daf1df9a18",	//28）数据上报查看-渠道销售信息(促销员)  （读库）
		did2_41:"1678218568262619221/1678577778066329693",
        //业务接口数据源ID（三期）
		did3_43: "5b736a63-83f0-4fe4-b27a-0a088297768c",	//43) 小程序-促销员考勤查看-列表栏
		// did3_43: "api/teapi/dy-biz/1678218568262619221/1678296028215906387",
		did3_44: "7d8ba8d5-5a03-4ca6-a73d-a48a10fd07b3",	//44) 小程序-促销员考勤查看-详情 & 47) 小程序-督导考勤查看-详情 & 52) 小程序-督导考勤查看-详情(查看促销员督导角色)
		// did3_45: "6047e3ce-2017-45ca-ace1-44d0174140c4",	//45) 小程序-督导考勤查看-下属列表栏 & 48） 小程序-推广员考勤查看-下属列表栏
		did3_45:"api/teapi/dy-biz/1678218568262619221/1681471959524839512",
		// did3_46: "6feb6eb8-ea1e-44fd-9fb5-f53f56e231e6",	//46) 小程序-督导考勤查看-考勤列表栏 & 51) 小程序-推广员考勤查看-考勤列表栏(查看促销员督导角色)
		did3_46: "api/teapi/dy-biz/1678218568262619221/1678296028215906400",
		// did3_49: "fa4bc568-1244-45d8-9b20-923511da42bf",	//49) 小程序-推广员考勤查看-考勤列表栏(查看推广员角色)
		did3_49: "api/teapi/dy-biz/1678218568262619221/1678591746201751633",
		did3_50: "b14ef926-d665-4419-9a35-e5a572089de7",	//50) 小程序-推广员考勤查看-详情(查看推广员角色)
		did3_51: "7d8ba8d5-5a03-4ca6-a73d-a48a10fd07b3",	//46) 小程序-督导考勤查看-考勤列表栏
		//文件上传
        upload: "file/upload",     						//文件上传
		//获取角色所有职位
		getaccountinfo: "api/teapi/rolepermission/account/getaccountinfo"	
    },
	//角色ID
	roleArr: {
		"1207982003945869312": [1, "促销员"],
		"1207982154928230400": [2, "推广员"],
		"1045624433659744256": [3, "督导"]
	},
	roleIds: {
		"2": '1207982154928230400',	
		"3": '1045624433659744256',
		"1": '1207982003945869312'
	},
    roleJson: [
        {
            id: "",
            name: "全部"
        },
        {
            id: "1207982003945869312",
            name: "促销员"
        },
        {
            id: "1207982154928230400",
            name: "推广员"
        },
        {
            id: "1045624433659744256",
            name: "督导"
        }
    ],
	//活动场所类型
	activityArr: {
		"1": "a",
		"2": "b"
	},
    //腾讯地图
	mapKey: "WJJBZ-TD4W5-D66IT-QZWHV-V24TH-HRBW7",
	mapSK: "yHqK74IUqPCKlkf52XhBGCRK7KEiMv"
}

//设置cookie
function setCookie(key, value) {
    wx.setStorageSync(key, value)
}
//获取cookie
function getCookie(key) {
    try {
        var value = wx.getStorageSync(key)
        if (value) {
            return value;
        }
    } catch (e) {
        return null;
    }
}
//删除cookie
function delCookie(key) {
    wx.removeStorageSync(key)
}
//获取数据-业务
function ajaxRequestWork(did, data, callBack, method) {
	wx.showLoading({ title: "加载中..." }); //加载开启
	var that = this;
	//用户信息
	var userInfo = getUserInfo();
	if (!method || method == "") {
		method = "POST"
	}
	console.log("11-------"+ JSON.stringify(data))
	var param = {};
	param["kx_param"] = data;
	//数据点
	// param["datasourceid"] = xbApi.api[did];
	// param["enterprisenumber"] = userInfo[1];
	// param["sessionid"] = userInfo[3];
	// param["params"] = [];	
	// console.log(JSON.stringify(param));
	// console.log("进入请求==========================");
	wx.request({
		url: encodeURI(xbApi.apiUrl + xbApi.api[did]),
		data: param,
		method: method,
		dataType: 'json',
		header: {
			'token': getCookie("token"),
			'Content-Type': 'application/json'
		},
		complete: function (res) {
            wx.hideLoading(); //加载关闭
			if (res.statusCode == 200) {
				callBack(res.data.response_params);
			} else {
				wx.showToast({
					icon: "none",
					title: res.data.errormsg,
                    duration: 2000
				})
			}
		}
	});
}
//获取数据-业务-无加载
function ajaxRequestWorkNoload(did, data, callBack, method) {
    var that = this;
    //用户信息
    var token = getCookie("token");
    var userInfo = token.split(",");
    if (!method || method == "") {
        method = "POST"
    }
    var param = {};
    //数据点
    param["datasourceid"] = xbApi.api[did];
    param["enterprisenumber"] = userInfo[1];
    param["sessionid"] = userInfo[3];
    param["params"] = [];
    param["params"].push(data);
    wx.request({
        url: encodeURI(xbApi.apiUrl + xbApi.api["datasource"]),
        data: param,
        method: method,
        dataType: 'json',
        header: {
            'Content-Type': 'application/json'
        },
        complete: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
                callBack(res.data.response_params);
            } else if (res.statusCode == 404) {
                wx.showToast({
                    icon: "none",
                    title: "数据请求失败",
                    duration: 2000
                })
            } else {
                wx.showToast({
                    icon: "none",
                    title: res.data.errormsg,
                    duration: 2000
                })
            }
        }
    });
}
//获取数据-未登录
function ajaxRequestNoLogin(url, data, callBack, method) {
	// console.log("=====================" + data);
	wx.showLoading({ title: "加载中ing..." }); //加载开启
	var that = this;
	if (!method || method == ""){
		method = "POST"
	}
	wx.request({
		url: encodeURI(xbApi.apiUrl + xbApi.api[url]),
		data: data,
		method: method,
		dataType: 'json',
		header: {
			'Content-Type': 'application/json',
			'token': wx.getStorageSync("token")
		},
		complete: function (res) {
			// console.log(res)
			// console.log("------------------" + res.statusCode);
			//成功
			if (res.statusCode == 200){
				callBack(res.data.resp_data);
			} else {
				console.log("关闭加载------------------");
                wx.hideLoading(); //加载关闭
				wx.showToast({
					icon: "none",
					title: res.data.errormsg,
					duration: 2000
				})
			}
		}
	});
}
//获取数据-获取地图
function ajaxRequestMap(callBack) {
	var that = this;
	wx.getLocation({
		type: 'gcj02',
		success(res) {
			console.log(res + "位置-------")
			var location = res.latitude + ',' + res.longitude;
			var key = that.xbApi.mapKey;
			var sk  = that.xbApi.mapSK;
			var str = "/ws/geocoder/v1?key=" + key + "&location=" + location + sk;
			var sig = md5.hexMD5(str);
			//console.log(str, sig);
			wx.request({
                url: 'https://apis.map.qq.com/ws/geocoder/v1',
				data: {
					key: key,
					location: location,
					sig: sig
				},
				header: {
					'content-type': 'application/json' // 默认值
				},
				success(rec) {
					//console.log(rec.data);
					callBack(rec.data)
				}
			})
		},
		fail: function () {
			wx.getSetting({
				success: function (res) {
					var statu = res.authSetting;
					if (!statu['scope.userLocation']) {
						wx.showModal({
							showCancel: false,
							title: '是否授权当前位置',
							content: '需要获取您的地理位置，请确认授权，否则定位功能将无法使用',
							success: function (tip) {
								if (tip.confirm) {
									wx.openSetting({
										success: function (data) {
											if (data.authSetting["scope.userLocation"] === true) {
												wx.showToast({
													title: '授权成功',
													icon: 'success',
													duration: 1000
												})
											} else {
												wx.showToast({
													title: '授权失败',
													icon: 'success',
													duration: 1000
												})
											}
										}
									})
								}
							}
						})
					}
				}
			})
		}
	})
}
//获取数据-计算距离
function ajaxRequestDist(fromLocation, toLocation, callBack) {
    var that = this;

    var key = that.xbApi.mapKey;
    var sk = that.xbApi.mapSK;
    var str = "/ws/distance/v1?from=" + fromLocation + "&key=" + key + "&mode=driving&to=" + toLocation + sk;
    var sig = md5.hexMD5(str);
    wx.request({
        url: 'https://apis.map.qq.com/ws/distance/v1',
        data: {
            mode: "driving",
            from: fromLocation,
            to: toLocation,
            key: key,
            sig: sig
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success(rec) {
            //console.log(rec.data);
            callBack(rec.data)
        }
    })
}
//获取数据-地址解析
function ajaxRequestAddress(address, callBack) {
	var that = this;

	var key = that.xbApi.mapKey;
	var sk = that.xbApi.mapSK;
	var str = "/ws/geocoder/v1/?address=" + address + "&key=" + key + sk;
	console.log(str)
	var sig = md5.hexMD5(str);
	wx.request({
		url: 'https://apis.map.qq.com/ws/geocoder/v1/',
		data: {
			address: address,
			key: key,
			sig: sig
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success(rec) {
			//console.log(rec.data);
			callBack(rec.data)
		}
	})
}
//获取用户信息
function getUserInfo() {
	var that = this;

	var arr = [];
	var token = getCookie("Token");
    // var role = getCookie("Role");
    if (!token || token == null) {
		wx.showToast({
			icon: "none",
			title: "请先登录",
			duration: 1500
		})
		setTimeout(function () {
			wx.navigateTo({
				url: '../login/index'
			})
		}, 1400);
	} else {
		arr = token.split(",");
		return arr;
	}
	return arr;
}
//判断用户是否登录
function isLogin() {
	var that = this;

	var token = getCookie("Token");
    // var role = getCookie("Role");
    if (!token || token == null) {
		return false;
	} else {
		return true;
	}
	// if (!token || !role || token == null || role == null) {
	// 	return false;
	// } else {
	// 	return true;
	// }
}
//文件上传
function ajaxUploadFile(filePath, data, callBack) {
	wx.showLoading({ title: "正在上传..." }); //加载开启
	var that = this;

	//文件类型
	var fileArr = filePath.split(".");
	var fileType = fileArr[fileArr.length - 1];
	var userInfo = getUserInfo();
	var param = {};
	wx.getFileInfo({
		filePath: filePath,
		success(res) {
			param["md5"] = res.digest;
			param["fileid"] = uuid();
			param["contenttype"] = "text/plain";
			param["enterprisenumber"] = userInfo[1];
			param["sessionid"] = userInfo[3];
			param["filename"] = param["fileid"]+ "." + fileType;
			console.log(JSON.stringify(param));

			wx.uploadFile({
				url: encodeURI(xbApi.apiUrl + xbApi.api["upload"]),
				filePath: filePath,
				name: 'file',
				formData: param,
				success(res) {
                    wx.hideLoading(); //加载关闭
					if (res.statusCode == 200) {
						var result = JSON.parse(res.data);
						callBack(result.response_params);
					} else {
						wx.showToast({
							icon: "none",
							title: "上传失败",
                            duration: 2000
						})
					}
				}
			})
		}
	})
}
//随机字符串
function generateMixed(n) {
	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'];
	var res = "";
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
}
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
    var len = 36;
    for (var i = 0; i < len; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}
//获取当前时间
function newTime(type){
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
	var day = myDate.getDate();
    day = day < 10 ? "0" + day : day;
	var hours = myDate.getHours();
    hours = hours < 10 ? "0" + hours : hours;
	var minutes = myDate.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
	var seconds = myDate.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if(type == "date"){
        return year + "-" + month + "-" + day;
    }else{
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
}
//获取前N天日期
function backTime(num){
	var myDate = new Date();
	var lw = new Date(myDate - 1000 * 60 * 60 * 24 * num);
	var lastY = lw.getFullYear();
	var lastM = lw.getMonth() + 1;
	var lastD = lw.getDate();
	var startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);
	return startdate;
}
//图片数组转字符串
function picToStr(picArr){
	var arr = [];
	for (var i = 0; i < picArr.length; i++){
		arr.push(picArr[i].src);
	}
	return arr.join(";");
}
//数组分割
function split_array(arr, len){
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
        newArr.push(arr.slice(i, i + len));
    }
    return newArr;
}
//经纬度组合
function locationStr(location){
	return location.lat + "|" + location.lng
}
//获取用户角色
function getRole(callBack){
	var roleData = wx.getStorageSync("roleid")
	console.log("rrrrrroledata--" + roleData);
	var result = "";
	if(roleData != null){
		result = roleData;
	}
	callBack(result);
}

module.exports = {
	xbApi: xbApi,
	setCookie: setCookie,
	getCookie: getCookie,
	delCookie: delCookie,
	newTime: newTime,
	backTime: backTime,
	picToStr: picToStr,
    split_array: split_array,
	uuid: uuid,
	locationStr: locationStr,
	getRole: getRole,
	ajaxRequestWork: ajaxRequestWork,
    ajaxRequestWorkNoload: ajaxRequestWorkNoload,
	ajaxRequestNoLogin: ajaxRequestNoLogin,
	ajaxRequestMap: ajaxRequestMap,
    ajaxRequestDist: ajaxRequestDist,
	ajaxRequestAddress: ajaxRequestAddress,
	ajaxUploadFile: ajaxUploadFile,
	getUserInfo: getUserInfo,
	isLogin: isLogin
}
