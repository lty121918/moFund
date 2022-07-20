/**
 * 常用工具类
 */

import CONFIG from "../config/config";
/**
 * @description 工具类
 * @class Util
 */
class Util {
	constructor() {}
	defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	/**
	 * @description 设置缓存
	 * @param {*} key 缓存名称
	 * @param {*} val 缓存值
	 * @memberof Util
	 */
	setCache(key, val) {
		uni.setStorageSync(CONFIG.CACHE_PREFIX + key, val);
	}
	/**
	 * @description 获取缓存
	 * @param {*} key 缓存名称
	 * @param {*} val
	 * @returns
	 * @memberof Util
	 */
	getCache(key) {
		let res = uni.getStorageSync(CONFIG.CACHE_PREFIX + key);
		return res;
	}
	/**
	 * @description 删除缓存
	 * @date 2019-06-19
	 * @param {*} key 缓存名称
	 * @memberof Util
	 */
	delCache(key) {
		uni.removeStorageSync(CONFIG.CACHE_PREFIX + key);
	}
	
	/**
	 * @description 获取url参数
	 * @memberof Util
	 * @param _self this
	 * @param e 
	 * @param para 文本框名字
	 */
	getQueryString(url, name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let r = url.split("?")[1].match(reg);
		if (r != null) {
			return unescape(r[2]);
		};
		return null;
	}
	

	/*
	 *身份证获取年龄
	 */
	GetAge(identityCard, birthday = false) {
		var len = (identityCard + '').length
		var strBirthday = ''
		if (len == 18) {
			//处理18位的身份证号码从号码中得到生日和性别代码
			strBirthday =
				identityCard.substr(6, 4) +
				'/' +
				identityCard.substr(10, 2) +
				'/' +
				identityCard.substr(12, 2)
		}
		if (len == 15) {
			var birthdayValue = ''
			birthdayValue = identityCard.charAt(6) + identityCard.charAt(7)
			if (parseInt(birthdayValue) < 10) {
				strBirthday =
					'20' +
					identityCard.substr(6, 2) +
					'/' +
					identityCard.substr(8, 2) +
					'/' +
					identityCard.substr(10, 2)
			} else {
				strBirthday =
					'19' +
					identityCard.substr(6, 2) +
					'/' +
					identityCard.substr(8, 2) +
					'/' +
					identityCard.substr(10, 2)
			}
		}
		//时间字符串里，必须是“/”
		var birthDate = new Date(strBirthday)
		if (birthday) {
			return birthDate
		}
		console.log(strBirthday)
		var nowDateTime = new Date()
		var age = nowDateTime.getFullYear() - birthDate.getFullYear()
		//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
		if (
			nowDateTime.getMonth() < birthDate.getMonth() ||
			(nowDateTime.getMonth() == birthDate.getMonth() &&
				nowDateTime.getDate() < birthDate.getDate())
		) {
			age--
		}
		return age
	}
	/**
	 * 通过身份证号码得到性别
	 *  身份证号码 return 1/2 男/女
	 */
	getSexForCard(str) {
		var inputStr = str.toString()
		var sex
		if (inputStr.length == 18) {
			sex = inputStr.charAt(16)
			if (sex % 2 == 0) {
				return 2
			} else {
				return 1
			}
		} else {
			sex = inputStr.charAt(14)
			if (sex % 2 == 0) {
				return 2
			} else {
				return 1
			}
		}
	}

	/**
	 * @param strBirthday：指的是出生日期，格式为"1990-01-01"
	 */
	getAge(strBirthday) {
		if (strBirthday) {
			// strBirthday = new Date(strBirthday.replace(/-/g, '/'))
		} else {
			strBirthday = this.getLocalTime()
		}
		console.log(strBirthday);
		let returnAge
		let strBirthdayArr = strBirthday.split("-")
		let birthYear = strBirthdayArr[0]
		let birthMonth = strBirthdayArr[1]
		let birthDay = strBirthdayArr[2]
		let d = new Date()
		let nowYear = d.getFullYear()
		let nowMonth = d.getMonth() + 1
		let nowDay = d.getDate()
		if (nowYear == birthYear) {
			returnAge = 0; //同年 则为0周岁
		} else {
			let ageDiff = nowYear - birthYear; //年之差
			if (ageDiff > 0) {
				if (nowMonth == birthMonth) {
					let dayDiff = nowDay - birthDay; //日之差
					if (dayDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				} else {
					let monthDiff = nowMonth - birthMonth; //月之差
					if (monthDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				}
			} else {
				returnAge = 0; //返回-1 表示出生日期输入错误 晚于今天
			}
		}
		return returnAge; //返回周岁年龄
	}

	/**
	 * @function 输入正整数和最大值限制带小数点
	 */
	getNumber(e, max) {
		let value = e
		value = value.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
		value = value.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
		value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
		value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
		console.log('value', value)
		if (value == '.') {
			return ''
		}
		let val = value > max ? max : value
		if (val.indexOf('.') > -1 || val == '') {
			return val
		}
		return Number(val)
	}
	/**
	 * @function 输入正整数和最大值限制
	 */
	getNumberZ(e, max) {
		e = Number(e.replace(/\D+/, ''))
		if (e > max) {
			return max
		}
		console.log('value', e)
		return e
	}
	
}

export default Util
