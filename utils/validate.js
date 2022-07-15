class Validate {
	constructor() {}
	// 身份证验证
	validateIdNum(rule, value, callback) {
		// let iSum = 0
		let aCity = {
			11: '北京',
			12: '天津',
			13: '河北',
			14: '山西',
			15: '内蒙古',
			21: '辽宁',
			22: '吉林',
			23: '黑龙江',
			31: '上海',
			32: '江苏',
			33: '浙江',
			34: '安徽',
			35: '福建',
			36: '江西',
			37: '山东',
			41: '河南',
			42: '湖北',
			43: '湖南',
			44: '广东',
			45: '广西',
			46: '海南',
			50: '重庆',
			51: '四川',
			52: '贵州',
			53: '云南',
			54: '西藏',
			61: '陕西',
			62: '甘肃',
			63: '青海',
			64: '宁夏',
			65: '新疆',
			71: '台湾',
			81: '香港',
			82: '澳门',
			91: '国外'
		}
		if (!value) {
			return false //callback(new Error('请输入身份证'))
		}
		let sBirthday =
			value.substr(6, 4) +
			'-' +
			Number(value.substr(10, 2)) +
			'-' +
			Number(value.substr(12, 2))
		let d = new Date(sBirthday.replace(/-/g, '/'))
		// let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
		// let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
		// for (let i = 0; i < 17; i++) iSum += value.substr(i, 1) * arrInt[i]
		// let residue = arrCh[iSum % 11]

		if (!/^\d{17}(\d|x)$/i.test(value)) {
			return false 
			// callback(new Error('身份证长度或格式错误'))
		}
		if (aCity[parseInt(value.substr(0, 2))] === null) {
			return false 
			// callback(new Error('身份证地区非法'))
		}
		if (
			sBirthday !==
			d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
		) {
			return false 
			// callback(new Error('身份证上出生日期非法'))
		}
		// if (residue !== value.substr(17, 1)) {
		//   console.log(residue, value.substr(17, 1))
		//   callback(new Error('身份证号非法'))
		// } else {
		// callback()
		// }
		return true
	}

	// 固话+手机正则校验 非必传
	validateTelNum(value) {
		if (value === '' || value === undefined || value === null) {
			// callback('手机号码不能为空')
			return false
		}
		if (!value) {
			// callback('请输入正确手机号码')
			return false
		} else {
			if (/^([0-9]{3,4}-)?[0-9]{7,8}$/g.test(value)) {
				return true
			} else if (
				/^1[3456789]\d{9}$/g.test(
					value
				)
			) {
				return true
			} else {
				// callback('请输入正确手机号码')
				return false
			}
		}
	}
	isEmail(mail) {
		let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter.test(mail)) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 验证手机格式
	 */
	checkTel(value) {
		return /^1[3456789]\d{9}$/.test(value);
	}
}
export default Validate
