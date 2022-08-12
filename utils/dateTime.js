class DateTime {
	constructor() {}
	getBirthday(idCard) {
		var birthday = "";
		if (idCard != null && idCard != "") {
			if (idCard.length == 15) {
				birthday = "19" + idCard.substr(6, 6);
			} else if (idCard.length == 18) {
				birthday = idCard.substr(6, 8);
			}
			console.log('vvv',idCard);
			birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
		}

		return birthday;
	}
	getSex(idCard){
		const num = idCard.charAt(16);
		if(num%2==0){
		  console.log('女');
		  return '女'
		}else{
		  console.log('男');
		   return '男'
		}
		 
	}
	/**
	 * @description 格式化年月日的时间
	 * @param {*} date 2018年4月15日 10:10
	 * @returns 2018-04-15 10:10
	 * @memberof Util
	 */
	formatChineseTime(date) {
		let year = date.split('年')[0];
		let showDate = date.split('年')[1];
		let month = date.split('年')[1].split('月')[0];
		let day = date.split('月')[1].split('日')[0];
		let time = date.split(' ')[1];
		let dateTime = `${year}/${month}/${day} ${time}`;
		return {
			dateTime,
			showDate
		};
	}
	/**
	 * @description 格式化年月日的日期
	 * @param {*} date 2018年4月15日
	 * @returns 2018-04-15
	 * @memberof Util
	 */
	formatNormalDate(date) {
		let showDate = date;
		let year = date.split('-')[0];
		let month = date.split('-')[1];
		let day = date.split('-')[2];
		let dateTime = `${year}/${month}/${day}`;
		return {
			dateTime,
			showDate
		};
	}
	/**
	 * @description 获取时间
	 * @param {*} date 日期
	 * @param {*} format 日期格式
	 * @returns 2019-06-19 00:00
	 * @memberof Util
	 */
	getLocalTime(date, format) {
		if (date == undefined || date == '') {
			date = new Date()
		} else {
			let index = (date+'').indexOf('.')
			if( (date + '').indexOf('T') > -1){
				date = new Date(date)
			} else if ((date + '').indexOf('-') > -1) {
				if(index>-1){
					date = date.substr(0,index)
				}
				// console.log(date);
				date = new Date(date.replace(/-/g, '/'))
			} else {
				date = new Date(date)
			}
		}
		if (format == undefined || format == '') {
			format = 'yyyy-MM-dd'
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			S: date.getMilliseconds()
		}
		if (/(y+)/.test(format)) {
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + '').substr(4 - RegExp.$1.length)
			)
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
				)
			}
		}
		return format
	}
	getWeekCode(date) {
		if (date == undefined || date == '') {
			date = new Date()
		} else {
			if ((date + '').indexOf('-') > -1) {
				date = new Date(date.replace(/-/g, '/'))
			} else {
				date = new Date(date)
			}
		}
		const week = date.getDay()
		const weeks = [7, 1, 2, 3, 4, 5, 6]
		return weeks[week]
		// date.getday();
	}
	doHandleZero(zero) {
		var date = zero
		if (zero.toString().length == 1) {
			date = '0' + zero
		}
		return date
	}
	/**
	 * @description 获取月初
	 * @param {*} date 日期格式
	 * @returns 2019-06-19 00:00
	 * @memberof Util
	 */
	getMonthFirstDay(time) {
		let now = new Date()
		if (time) {
			now = new Date(time.replace(/-/g, '/'))
		}
		var myDate = new Date(now)
		var tYear = myDate.getFullYear()
		var tMonth = myDate.getMonth()
		tMonth = this.doHandleZero(tMonth + 1)
		let endOfMonth = new Date(tYear, tMonth, 0).getDate(); // 获取本月最后一天
		return [`${tYear}-${tMonth}-01`, `${tYear}-${tMonth}-${endOfMonth}`]
	}
	/**
	 * @description 获取月初
	 * @param {*} date 日期格式
	 * @returns 2019-06-19 00:00
	 * @memberof Util
	 */
	getMonthFirstDay2(time, num = 0) {
		let now = new Date()
		if (time) {
			now = new Date(time.replace(/-/g, '/'))
		}
		var myDate = new Date(now)
		var tYear = myDate.getFullYear()
		var tMonth = myDate.getMonth()
		tMonth = this.doHandleZero(tMonth + 1)
		let endOfMonth = new Date(tYear, tMonth, 0).getDate(); // 获取本月最后一天
		return [`${tYear}-${tMonth}-01`, `${tYear}-${tMonth}-${endOfMonth}`]
	}
	// 获取日期前前几天 后几天
	getNextDay(num, time, type = 'day') {
		let date1 = new Date()
		if (time) {
			date1 = new Date(time.replace(/-/g, '/'))
		}

		let date2 = new Date(date1)
		if (type == 'day') {
			date2.setDate(date1.getDate() + num)
		} else if (type == 'Minut') {
			date2.setMinutes(date1.getMinutes() + num)
		}

		//num是正数表示之后的时间，num负数表示之前的时间，0表示今天
		let time2 = this.getLocalTime(date2)
		return time2
	}
	// 获取日期前前几月 后几月
	getNextMonth(v, n) {
		if (v == undefined || v == '') {
			v = new Date()
		} else {
			if ((v + '').indexOf('-') > -1) {
				v = new Date(v.replace(/-/g, '/'))
			} else {
				v = new Date(v)
			}
		}
		if (v) {
			var t = new Date(
				v.getFullYear(),
				v.getMonth(),
				v.getDate(),
				v.getHours(),
				v.getMinutes(),
				v.getSeconds(),
				v.getMilliseconds()
			)
			t.setMonth(v.getMonth() + n)
			if (t.getDate() != v.getDate()) {
				t.setDate(0)
			}
			return this.getLocalTime(t)
		}
	}
	// 获取当前日期周一和周日
	getWeek(time = '') {
		let now = new Date()
		if (time) {
			now = new Date(time.replace(/-/g, '/'));
		}
		let nowTime = now.getTime();
		let day = now.getDay() || 7 //为周日的时候 day 修改为7  否则当天周天会有问题
		let oneDayTime = 24 * 60 * 60 * 1000;
		let mondayTime = nowTime - (day - 1) * oneDayTime; //显示周一
		let sundayTime = nowTime + (7 - day) * oneDayTime; //显示周日
		const monday = this.getLocalTime(mondayTime)
		const sunday = this.getLocalTime(sundayTime)
		return {
			monday,
			sunday
		}
	}
	// 获取当前星期几
	getNowWeek(time) {
		let now = new Date()
		if (time) {
			now = new Date(time.replace(/-/g, '/'));
		}

		let day = now.getDay() || 7 //为周日的时候 day 修改为7  否则当天周天会有问题
		return day
	}
	// 判断是大于当前时间还是小于当前时间 或者再范围内  0;未开始;1进行中;2已完成）
	ltgtDate(startTime, endTime, value) {
		value = value || {}
		const start = value.start || 0
		const end = value.end || 0
		let date1 = new Date()
		let date2 = new Date()
		let date3 = new Date()
		if (startTime) {
			date2 = new Date(startTime.replace(/-/g, '/'));
		}
		if (endTime) {
			date3 = new Date(endTime.replace(/-/g, '/'));
		}
		let time1 = date1.getTime()
		let time2 = date2.getTime() - (start - 0)
		let time3 = date3.getTime() - (end - 0)
		if (time1 > time3) {
			return 2
		} else if (time1 < time2) {
			return 0
		} else if (time1 < time3 && time1 > time2) {
			return 1
		}

	}
	// 判断是大于当前时间还是小于当前时间 或者再范围内  0;未开始;1进行中;2已完成）
	ltgtDate2(startTime) {
		let time = this.getLocalTime()
		let time2 = this.getLocalTime()
		if (startTime) {
			time2 = startTime.replace(/-(\d)(?!\d)/g, '-0$1')
		}
		if (time > time2) {
			return 1
		} else if (time <= time2) {
			return 0
		} else {
			return 2
		}

	}
	// 获取当前日期周一到周日
	getMonSun(time = '') {
		let now = new Date()
		if (time) {
			now = new Date(time.replace(/-/g, '/'))
		}
		let nowTime = now.getTime()
		let day = now.getDay() || 7 //为周日的时候 day 修改为7  否则当天周天会有问题
		let oneDayTime = 24 * 60 * 60 * 1000
		let mondayTime = nowTime - (day - 1) * oneDayTime //显示周一
		let tuesdayTime = nowTime - (day - 2) * oneDayTime //显示周二
		let wednesdayTime = nowTime - (day - 3) * oneDayTime //显示周三
		let thursdayTime = nowTime - (day - 4) * oneDayTime //显示周四
		let fridayTime = nowTime - (day - 5) * oneDayTime //显示周五
		let saturdayTime = nowTime - (day - 6) * oneDayTime //显示周六
		let sundayTime = nowTime + (7 - day) * oneDayTime //显示周日
		const DateTime = [{
				week: '一',
				time: mondayTime
			},
			{
				week: '二',
				time: tuesdayTime
			},
			{
				week: '三',
				time: wednesdayTime
			},
			{
				week: '四',
				time: thursdayTime
			},
			{
				week: '五',
				time: fridayTime
			},
			{
				week: '六',
				time: saturdayTime
			},
			{
				week: '日',
				time: sundayTime
			}
		]
		let weekList = []
		for (let i = 0; i < DateTime.length; i++) {
			const data = this.getLocalTime(DateTime[i].time, 'yyyy-MM-dd')
			weekList.push({
				...DateTime[i],
				time: data
			})
		}
		return weekList
	}
	//创建方法 是否包含今天
	DateDiffer(Date_end, isTrue) {
		//date1结束时间
		let date1 = new Date();
		if (Date_end) {
			date1 = new Date(Date_end.replace(/-/g, '/'))
		}
		//date2当前时间
		let date2 = new Date();
		date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
		date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
		const diff = date1.getTime() - date2.getTime(); //目标时间减去当前时间
		const diffDate = diff / (24 * 60 * 60 * 1000); //计算当前时间与结束时间之间相差天数
		if (diffDate < 0) {
			return diffDate - 1
		}
		return diffDate + 1

	}
	// 计算两个时间相差多少分钟
	timeDifference(start, end) {
		//   在苹果上，时间格式最好是 是 2020/02/02 它是斜杠开头的
		let now = new Date()
		let startTime = now
		let endTime = now
		if (start) {
			startTime = new Date(start.replace(/-/g, '/'))
		}
		if (end) {
			endTime = new Date(end.replace(/-/g, '/'))
		}
		let sTime = startTime.getTime()
		let eTime = endTime.getTime()


		let disparity = eTime - sTime;
		// 转为分钟数的时候，可能会出现精度丢失;你需要注意下
		let min = Math.round(disparity / 1000 / 60);
		// console.log(disparity)
		return min
	}
	// 处理星期是否连贯
	filteDay(value) {
		if (!value) {
			return ''
		}
		value = value.sort((a,b)=>a-b)
		let weekTime = ['一', '二', '三', '四', '五', '六', '日']
		let ncontinuity = 0 //用于连续个数的统计
		for (let i = 1; i < value.length; i++) {
			if (value[i] - value[i - 1] == 1 || value[i] - value[i - 1] == -1) {
				//等于1代表升序连贯   等于-1代表降序连贯
				ncontinuity += 1 //存在连贯：计数+1
			}
		}
		let str = ``
		if (ncontinuity > value.length - 2) {
			// console.log('全部连贯')
			str = `周${weekTime[value[0] - 1]}~周${
	          weekTime[value[value.length - 1] - 1]
	        }`
		} else {
			console.log('不全部连贯')
			value.forEach((item, index) => {
				str += `${index === 0 ? '' : ','}周${weekTime[item - 1]}`
			})
		}
		return str
	}

	// 给时间或者星期返回时间
	getRangeDay(data, num,week=[], type = 'date') {
		let list = []
		let start = data[0]
		let end = data[1]
		let weeks = week.join(',')
		for (let i = 0; i <= num; i++) {
			const code = this.getNowWeek(start)
			if(type == 'week' && weeks.indexOf(code) > -1){
				list.push(start)
			}
			if(type=='date'){
				list.push(start)
			}
			start = this.getNextDay(1, start)
			if(start>end){
				break;
			}
		}
		return list
	}
}
export default DateTime
