class Validate {
	constructor() {}
	// 身份证验证
	validateIdNum(value) {
		 var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
		  if(reg.test(value) === false)  { 
		    // alert("身份证输入不合法"); 
		    return false; 
		  } 
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
