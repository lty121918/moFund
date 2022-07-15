import DEV_CONFIG from '@/config/config.js'
import {utils} from '@/utils/index.js';
let baseUrl = DEV_CONFIG.BASE_URL
if (process.env.NODE_ENV === 'development') {
  console.log('开发环境')
  baseUrl = DEV_CONFIG.BASE_URL_DEV
} else {
  console.log('生产环境')
}

let requestingList = []
const requestBefore = (config) => {
	
	if (!config) {
		console.error(`发送了一个没有地址的请求`)
		return false
	}
	
	config.header = config.header || {}
	console.log('请求链接',config.url,'请求参数',config.data);
	if (config.data) {
		config.header.timestamp = Date.parse(new Date()) / 1000
	}
	try {
		if (config.header['Content-Type'].indexOf('multipart/form-data') > -1) {
			const obj = new Object()
			/* form-data 格式 获取参数 */
			config.data.forEach((value, key) => {
				if (typeof value !== 'object') {
					obj[key] = typeof value === 'number' ? String(value) : value
				}
			})
			let arr = Object.keys(obj)
			if (arr.length > 0) {
				arr = arr.sort(function(string1, string2) {
					let arrList = []
					let num =
						string1.length > string2.length ?
						string1.length :
						string2.length
					for (var i = 0; i < num; i++) {
						var val1 = string1[i] || ''
						var val2 = string2[i] || ''
						if (val1 < val2) {
							arrList.push(false)
						} else if (val1 > val2) {
							arrList.push(true)
						}
					}
					return arrList[0] ? 1 : -1
				})
				const sortData = {}
				arr.forEach(item => {
					sortData[item] = obj[item]
				})
			}
		}
	} catch (e) {
		//
	}
	// 请求接口使用formData传输
	if ((config.data && config.data.IsFormData) || (config.params && config.params.IsFormData)) {
		config.header['Content-Type'] = "application/x-www-form-urlencoded"
	}
	// 添加token
	config.header['Origin-Client-Code'] = 'WX_ORGANIZATION'//'WX_ORGANIZATION'
	const Authorization = utils.util.getCache('Authorization');
	if (Authorization) {
		config.header['Authorization'] = 'Bearer ' + Authorization
	}
	let routes = getCurrentPages() //获取当前页面栈
	let curRoute = routes[routes.length - 1].route //获取当前页面的路由
	let isLogin = curRoute !== 'pages/login/login'
	if (!config.header['Authorization'] && isLogin) {
		utils.userInfo.login()
	}
	config.url = baseUrl + config.url
	return config
};
const response = async (result) => {
	if (result.config) {
		requestingList = requestingList.filter(item => {
			return item !== result.config.url
		})
	}
	let routes = getCurrentPages() //获取当前页面栈
	let curRoute = routes[routes.length - 1].route //获取当前页面的路由
	const code = result.data.code
	if (code === 200 && result.data.msg && result.data.msg.trim() !== '') {
		uni.showToast({
			title: result.data.msg,
			icon: "none",
			duration: 2000
		});
	} else if (code === 302 || code === 401) {
		try {
			uni.clearStorageSync();
		} catch (e) {
			// error
		}
		if (result.data.msg) {
			uni.showToast({
				title: result.data.msg,
				icon: "none",
				duration: 2000
			});
		}
		if (curRoute !== 'pages/login/login' && curRoute !== 'pages/login/FirstLogin') {
			utils.userInfo.login()
		}
	} else if (code === 312 && curRoute !== 'pages/login/login') {
		uni.showToast({
			title: result.data.msg,
			icon: "none",
			duration: 2000
		});
	} else if (result.data.msg && result.data.msg.trim() !== '') {
		uni.showToast({
			title: result.data.msg,
			icon: "none",
			duration: 2000
		});
	}
	return result
}
const responseErr = (err) => {
	return Promise.reject(err)
}
uni.addInterceptor('request', {
	invoke(args) {
		// request 触发前拼接 url 
		args = requestBefore(args)
		// console.log('list',args);
	},
	success(args) {
		// 请求成功后，修改code值为1
		response(args)
	},
	fail(err) {
		responseErr(err)
	},
	complete(res) {
	}
})
export default {
	baseUrl,
	requestBefore,
	response,
	responseErr


}
