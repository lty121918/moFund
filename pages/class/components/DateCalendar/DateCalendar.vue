<template>
	<view class="date-calendar-date">
		<slot name="header" :nowYear="nowYear" :nowMonth="nowMonth">
			<view class="date-calendar-head">
				<view class="date-calendar-title">{{nowYear+'年'+nowMonth+'月'}}</view>
				<view class="date-calendar">
					<image class="date-calendar-icon" :src="require('@/static/class/left.png')" mode=""
						@click="switchMonthWeek('prev',true)"></image>
					<image class="date-calendar-icon" :src="require('@/static/class/right.png')" mode=""
						@click="switchMonthWeek('next',true)"></image>
				</view>
			</view>
		</slot>
		<view class="date-calendar-date-dl">
			<view class="date-calendar-dd2" v-for="(item,index) in week" :key="index">{{item}}</view>
		</view>
		<swiper :style="{height:(retract ? 70 : 5 * 80 ) + 'rpx'}" :current="current" circular
			@change="changeDate">
			<!-- 上月日历 -->
			<swiper-item>
				<view class="date-calendar-date-dl" v-show="!retract || index == toPrevWeekIndex"
					v-for="(item,index) in weekListPrevCo" :key="index">
					<view class="date-calendar-dd" @click="itemClick(vo,index,key)" v-for="(vo,key) in item" :key="key">
						<view class="date-calendar-num" v-show="vo.type == 'month'"
							:class="[(vo.dot&&vo.type == 'month') ? 'date-calendar-today' : '',vo.type == 'month' ? 'date-calendar-month' : (retract ? '' : 'date-calendar-disabled')]">
							{{vo.day}}
						</view>
						<!-- <view v-show="vo.dot && (vo.type == 'month' || retract)" class="date-calendar-dot"></view> -->
					</view>
				</view>
			</swiper-item>
			<!-- 本月日历 -->
			<swiper-item>
				<view class="date-calendar-date-dl" v-show="!retract || index == toWeekIndex"
					v-for="(item,index) in weekList" :key="index">
					<view class="date-calendar-dd" @click="itemClick(vo,index,key)" v-for="(vo,key) in item" :key="key">
						<view class="date-calendar-num" v-show="vo.type == 'month'"
							:class="[(vo.dot&&vo.type == 'month') ? 'date-calendar-today' : '',vo.type == 'month' ? 'date-calendar-month' : (retract ? '' : 'date-calendar-disabled')]">
							{{vo.day}}
						</view>
						<!-- <view v-show="vo.dot && (vo.type == 'month' || retract)" class="date-calendar-dot"></view> -->
					</view>
				</view>
			</swiper-item>
			<!-- 下个月的日历 -->
			<swiper-item>
				<view class="date-calendar-date-dl" v-show="!retract || index == toNextWeekIndex"
					v-for="(item,index) in  weekListNextCo" :key="index">
					<view class="date-calendar-dd" @click="itemClick(vo,index,key)" v-for="(vo,key) in item" :key="key">
						<view class="date-calendar-num" v-show="vo.type == 'month'"
							:class="[(vo.dot&&vo.type == 'month') ? 'date-calendar-today' : '',vo.type == 'month' ? 'date-calendar-month' : (retract ? '' : 'date-calendar-disabled')]">
							{{vo.day}}
						</view>
						<!-- <view v-show="vo.dot && (vo.type == 'month' || retract)" class="date-calendar-dot"></view> -->
					</view>
				</view>
			</swiper-item>

		</swiper>
		<view v-if="isShowMore" @click="open" class="retract-icon">
			<image class="retract-icon-image" :class="[retract ? '' : 'retractIcon2']"
				:src="require('@/static/class/down2.png')" mode=""></image>
			<!-- <text class="iconfont icon-fanhui" :class="[retract ? '' : 'retractIcon']" /> -->
		</view> 
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			dotLists: {
				type: Array,
				default: () => {
					return [];
				}
			},
			isShowMore: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				debug: false,
				week: ['一', '二', '三', '四', '五', '六', '日'],
				weekList: [],
				weekListPrev: [],
				weekListPrevWeek: [],
				weekListNext: [],
				weekListNextWeek: [],
				nowDate: '',
				startDate: '',
				endDate: '',
				prevDate: '',
				nextDate: '',
				nowYear: '',
				nowMonth: '',
				nowDay: '',
				retract: false,
				toWeekIndex: 0,
				toPrevWeekIndex: 0,
				toNextWeekIndex: 0,
				nowTime: 0,
				dotList: [],
				current: 1,
				date: '',
			}
		},
		watch: {
			value(value) {
				this.getDate(this.dateParse(value));
			},


			dotLists: {
				immediate: true,
				handler(value) {
					this.dotList = value;
					this.setDocListsUpdate()
				}
			}

		},
		onShow() {

		},
		computed: {
			weekListPrevCo() {
				// console.log(this.retract);
				return this.retract ? this.weekListPrevWeek : this.weekListPrev
			},
			weekListNextCo() {
				return this.retract ? this.weekListNextWeek : this.weekListNext
			}
		},
		created() {
			this.init();
		},
		methods: {
			change() {
				let value = {
					fulldate: this.date.replace(/-(\d)(?!\d)/g, '-0$1')
				};

				this.$emit('change', value)
			},
			init() {
				// console.log(this.value)
				if (this.value) {
					this.getDate(this.dateParse(this.value));
				} else {
					this.getDate();
				}

				this.docListUpdate();
				this.updateMonth();
			},
			open(type = 1) {
				if (type == 0) {
					this.retract = true
				} else {
					this.retract = !this.retract;
				}

				this.getDate(this.nowTime);
				this.setToDay('weekListPrev')
				this.setToDay('weekListNext')

				this.changeWeek();

				if (this.retract) {
					this.updateSwiperItem('week')
				} else {
					this.updateSwiperItem('month')
				}
				this.setDocListsUpdate();
				this.$emit('open', this.retract)
			},
			changeWeek() {

				if (this.toWeekIndex < this.weekList.length - 1) {
					this.toNextWeekIndex = this.toWeekIndex + 1;
					this.weekListNextWeek = this.weekList;
				} else {
					this.toNextWeekIndex = 0;
					this.weekListNextWeek = this.weekListNext;
				}

				if (this.toWeekIndex == 0) {

					this.updateMonth();

					// if(){
					let nextDay = this.weekListPrev[this.weekListPrev.length - 1][6].day;

					// }
					this.toPrevWeekIndex = this.weekListPrev.length - 1 - Math.ceil(nextDay / 7);

					this.weekListPrevWeek = JSON.parse(JSON.stringify(this.weekListPrev));





				} else {
					this.toPrevWeekIndex = this.toWeekIndex - 1;
					this.weekListPrevWeek = this.weekList;
				}

				// if(this.current == 1){

				// }
				// let toWeekIndex = this.toWeekIndex;
				// if(this.current == 2){
				// 	this.toNextWeekIndex = this.toWeekIndex;
				// 	this.toWeekIndex = this.toWeekIndex - 1;
				// 	this.toPrevWeekIndex =  this.toNextWeekIndex + 1;
				// }else if(this.current == 0){
				// 	this.toNextWeekIndex = this.toWeekIndex;
				// 	this.toWeekIndex = this.toWeekIndex - 1;
				// 	this.toPrevWeekIndex =  this.toNextWeekIndex + 1;
				// }






			},
			changeDateWeek(type) {
				let weekList = this.weekList;
				let toWeekIndex = this.toWeekIndex;
				if (type == 'prev') {
					this.toWeekIndex = this.toPrevWeekIndex;
					this.toPrevWeekIndex = this.toNextWeekIndex
					this.toNextWeekIndex = toWeekIndex;

					this.weekList = this.weekListPrevWeek
					this.weekListPrevWeek = this.weekListNextWeek;
					this.weekListNextWeek = weekList;



				} else if (type == 'next') {
					this.toWeekIndex = this.toNextWeekIndex;
					this.toNextWeekIndex = this.toPrevWeekIndex
					this.toPrevWeekIndex = toWeekIndex;

					this.weekList = this.weekListNextWeek
					this.weekListNextWeek = this.weekListPrevWeek;
					this.weekListPrevWeek = weekList;


				}

				this.setToDayAll();
			},
			changeDateMonth(type) {
				let weekList = this.weekList;
				if (type == 'prev') {
					this.weekList = this.weekListPrev
					this.weekListPrev = this.weekListNext;
					this.weekListNext = weekList;
				} else if (type == 'next') {
					this.weekList = this.weekListNext
					this.weekListNext = this.weekListPrev;
					this.weekListPrev = weekList;
				}
			},
			changeDate(e) {
				// console.log(e.detail.current);
				let primaryCurrent = this.current
				let current = e.detail.current;

				this.current = current;

				if (primaryCurrent - current == -1 || primaryCurrent - current == 2) {

					if (this.retract) {
						this.switchMonthWeek('next')
						this.changeWeek()
						if (primaryCurrent - current == -1 && current != 1) {
							this.changeDateWeek('prev')
						} else if (primaryCurrent - current == 2) {
							this.changeDateWeek('next')
						}
					} else {
						this.getDate(this.getMonth('next'));
						this.updateMonth();
						if (primaryCurrent - current == -1 && current != 1) {
							this.changeDateMonth('prev')
						} else if (primaryCurrent - current == 2) {
							this.changeDateMonth('next')
						}
					}
				} else {
					if (this.retract) {
						this.switchMonthWeek('prev')
						this.changeWeek()
						if (primaryCurrent - current == 1 && current != 1) {
							this.changeDateWeek('next')
						} else if (primaryCurrent - current == -2) {
							this.changeDateWeek('prev')
						}


					} else {
						this.getDate(this.getMonth('prev'));
						this.updateMonth();
						if (primaryCurrent - current == 1 && current != 1) {
							this.changeDateMonth('next')
						} else if (primaryCurrent - current == -2) {
							this.changeDateMonth('prev')
						}
					}
				}

				this.setToDayAll();
				this.setDocListsUpdate();
				// this.change()
			},
			updateMonth() {
				this.getDate(this.getMonth('prev'), 'prev');
				this.getDate(this.getMonth('next'), 'next');
			},
			setDocListsUpdate() {
				this.docListUpdate('weekList');
				this.docListUpdate('weekListPrev');
				this.docListUpdate('weekListNext');
				this.docListUpdate('weekListPrevWeek')
				this.docListUpdate('weekListNextWeek')
			},
			docListUpdate(weekList = 'weekList') {
				let list = [];
				this[weekList].map((item, index) => {
					list.push(item.map((vo, key) => {
						if (this.dotList.indexOf(vo.date) > -1 || this.dotList.indexOf(vo.date.replace(
								/-(\d)(?!\d)/g, '-0$1')) > -1) {
							vo.dot = true;

						} else {
							vo.dot = false;
						}
						return {
							...vo
						}
					}))
				})
				this[weekList] = list;
			},
			getWeek(time) {
				let now = new Date()
				if (time) {
					now = new Date(time.replace(/-/g, '/'));
				}
				let nowTime = now.getTime();
				let day = now.getDay() || 7 //为周日的时候 day 修改为7  否则当天周天会有问题
				let oneDayTime = 24 * 60 * 60 * 1000;
				let mondayTime = nowTime - (day - 1) * oneDayTime; //显示周一
				const monday = this.getLocalTime(mondayTime)
				return monday
			},
			getLocalTime(time, type = '-') {
				let date = new Date(time);
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (month < 10) {
					month = "0" + month;
				}
				if (day < 10) {
					day = "0" + day;
				}
				let nowDate = `${year}${type}${month}${type}${day}`;
				return nowDate
			},
			setToDay(type, i) {
				let list = [];
				// TODO:----------------------------------------------
				if (!i) {
					let monday = this.getWeek(`${this.date}`);
					this.date = monday
				}
				// console.log('date',date);
				this[type].map((item, index) => {
					list.push(item.map((vo, key) => {
						if (`${this.date}` == vo.date ||
							`${this.date}` == (vo.date.replace(/-(\d)(?!\d)/g, '-0$1'))) {
							// if (vo.date == `${this.date}`) {
							vo.today = true;
						} else {
							vo.today = false;
						}
						return {
							...vo
						};
					}))
				})
				this[type] = list;
			},
			itemClick(item, itemIndex = -1) {
				if (!this.retract && item.type !== 'month') {
					return false;
				}
				this.date = item.date;
				if (item.type == 'month') {
					this.nowDay = item.day;
					if (itemIndex >= 0) this.toWeekIndex = itemIndex;

				} else if (this.retract) {
					this.nowDay = item.day;
				}

				let nowArr = item.date.split('-')
				this.nowYear = nowArr[0];
				this.nowMonth = nowArr[1];
				this.nowDay = nowArr[2];


				this.setToDayAll(itemIndex, 1);

				this.nowTime = this.dateParse(`${item.date}`);

				this.change()
				this.setDocListsUpdate();

			},
			setToDayAll(itemIndex, i) {
				this.setToDay('weekList', i)
				this.setToDay('weekListPrev', i)
				this.setToDay('weekListNext', i)
				this.setToDay('weekListPrevWeek', i)
				this.setToDay('weekListNextWeek', i)

			},
			getMonth(type) {
				let nowMonth = this.nowMonth;
				let nowYear = this.nowYear;
				let nowDay = this.nowDay;

				if (type == 'prev') {
					if (nowMonth == 1) {
						nowMonth = 12;
						nowYear = nowYear - 1;
					} else {
						nowMonth--;
					}
				} else if (type == 'next') {
					if (nowMonth == 12) {
						nowMonth = 1;
						nowYear = nowYear + 1;
					} else {
						nowMonth++;
					}
				}

				let days = this.getMonthDays(nowMonth, nowYear);
				if (nowDay > days) {
					nowDay = days;
				}

				return this.dateParse(`${nowYear}-${nowMonth}-${nowDay}`);
			},

			dateParse(str) {
				return Date.parse(str.replace(/-(\d)(?!\d)/g, '-0$1'));
			},
			switchMonthWeek(type = 'next', updateWeek = false) {
				if (this.retract) {
					if (type == 'prev') {
						this.getDate(this.nowTime - 86400 * 7 * 1000);
					} else if (type == 'next') {
						this.getDate(this.nowTime + 86401 * 7 * 1000);
					}
					if (updateWeek) {
						this.updateSwiperItem('week');
						this.setDocListsUpdate();
					}
				} else {
					this.getDate(this.getMonth(type))
					this.updateSwiperItem('month');
				}
				this.setDocListsUpdate();

				this.setToDayAll();

				if (updateWeek) {
					// this.change()
				}

			},
			updateSwiperItem(type = 'month') {
				if (type == 'month') {
					if (this.current == 0) {
						this.changeDateMonth('next')
					} else if (this.current == 2) {
						this.changeDateMonth('prev')
					}
				} else if (type == 'week') {

					if (this.current == 0) {
						this.changeDateWeek('next')
					} else if (this.current == 2) {
						this.changeDateWeek('prev')
					}
				}
			},
			next() {
				this.getDate(this.nextDate)
			},
			getDate(value = '', type = 'same') {
				let date = new Date();
				if (value) {
					date = new Date(value);
				}
				let nowMonth = date.getMonth() + 1,
					nowYear = date.getFullYear(),
					nowDay = date.getDate(),
					nowTime = date.getTime(),
					nowWeek = date.getDay();


				let days = this.getMonthDays(nowMonth, nowYear);
				let startDate = new Date(nowYear, nowMonth - 1, 1);
				let endDate = new Date(nowYear, nowMonth - 1, days);
				let prevDate = new Date(startDate.getTime() - 1);
				let prevDateDays = prevDate.getDate();
				let nextDate = new Date(endDate.getTime() + 86401 * 1000);
				let nextDateDays = nextDate.getDate();
				let startWeek = this.getWeekCode(startDate) //startDate.getDay();
				let dateArrs = [];

				let weekList = [];
				let countDays = 35;

				for (let i = prevDateDays - startWeek + 2; i <= prevDateDays; i++) {
					dateArrs.push({
						day: i,
						type: 'prev',
						date: `${prevDate.getFullYear()}-${prevDate.getMonth()+1}-${i}`
					})
				}

				for (let i = 1; i <= days; i++) {
					dateArrs.push({
						day: i,
						type: 'month',
						today: i == nowDay ? true : false,
						date: `${nowYear}-${nowMonth}-${i}`
					})

					if (i == nowDay && type == 'same') {
						this.date = `${nowYear}-${nowMonth}-${i}`;
					}

				}
				// if (this.debug) console.log(value, date, this.date,
				// 	`${nextDate.getFullYear()}-${nextDate.getMonth()+1}-${nextDate.getDate()}`)
				let dateArrsLength = dateArrs.length;

				// if(dateArrsLength > 35){
				countDays = 42;
				// }
				for (let i = 1; i <= countDays - dateArrsLength; i++) {
					dateArrs.push({
						day: i,
						type: 'next',
						date: `${nextDate.getFullYear()}-${nextDate.getMonth()+1}-${i}`
					})
				}

				for (let i = 0; i < dateArrs.length / 7; i++) {
					let arr = [];
					for (let j = 0; j < 7; j++) {

						if (dateArrs[i * 7 + j].today) {
							if (type == 'same') {
								this.toWeekIndex = i
							}
						}
						arr.push(dateArrs[i * 7 + j]);
					}
					weekList.push(arr);
				}
				// console.log(weekList);
				if (type == 'same') {
					this.weekList = weekList;
					this.nowYear = nowYear;
					this.nowMonth = nowMonth;
					this.nowDay = nowDay;
					this.nowTime = nowTime;
					this.startDate = startDate;
					this.endDate = endDate;
					this.prevDate = prevDate;
					this.nextDate = nextDate;


				} else if (type == 'prev') {
					this.weekListPrev = weekList;
				} else if (type == 'next') {
					this.weekListNext = weekList;
				}

			},
			getMonthDays(nowMonth, nowYear) {
				let monthArr = [1, 3, 5, 7, 8, 10, 12];
				let days = 0;
				if (nowMonth == 2) {
					if (nowYear % 4 == 0) {
						days = 29;
					} else {
						days = 28;
					}
				} else if (monthArr.indexOf(nowMonth) >= 0) {
					days = 31;
				} else {
					days = 30;
				}
				return days;
			},
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
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: "iconfont";
		/* Project id 3137285 */
		src: url('//at.alicdn.com/t/font_3137285_xz5phmjv78j.woff2?t=1644546086830') format('woff2'),
			url('//at.alicdn.com/t/font_3137285_xz5phmjv78j.woff?t=1644546086830') format('woff'),
			url('//at.alicdn.com/t/font_3137285_xz5phmjv78j.ttf?t=1644546086830') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-fanhui:before {
		content: "\e603";
	}

	.icon-yanjing-zhengyan:before {
		content: "\e63a";
	}

	.icon-biyan:before {
		content: "\e6ba";
	}

	$color:#007aff;
	$colorDisabled:#C4C4C4;
	$colorStandard:#333;
	$colorBorder:#f5f5f5;

	.date-calendar-date {
		position: relative;
		width: 100%;
		background-color: #FFFFFF;

		z-index: 99;

	}

	.date-calendar-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// padding: 0rpx 32rpx;
		min-height: 160rpx;
		// border-bottom: 1rpx solid $colorBorder;
		color: $colorStandard;

		.date-calendar-title {
			width: 200rpx;
			text-align: center;
			font-size: 36rpx;
			font-family: Arial-BoldMT, Arial;
			font-weight: normal;
			color: #3B2E2C;
		}

		.date-calendar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100rpx;
		}

		.date-calendar-icon {
			width: 40rpx;
			height: 40rpx;
			display: block;

			.date-calendar-next {
				transform: rotate(180deg);
				display: block;
			}
		}
	}



	.date-calendar-date-dl {
		display: flex;
		justify-content: space-between;
		width: 100%;
		text-align: center;

		.date-calendar-dd2 {
			margin-bottom: 20rpx;
			width: 92rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: SourceHanSansSC-Normal, SourceHanSansSC;
			font-weight: 400;
			color: #C4C4C4;
			line-height: 40rpx;
		}

		.date-calendar-dd {
			// flex: 1;
			text-align: center;
			// height: 80rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			width: 92rpx;
			height: 68rpx;
			font-size: 32rpx;
			font-family: Arial-BoldMT, Arial;
			font-weight: normal;
			color: #141D3D;

			.date-calendar-num {
				// border-radius: 50%; line-height: 60rpx; 
				font-size: 32rpx;

				&.date-calendar-disabled {
					color: $colorDisabled;
				}

				&.date-calendar-month {
					// color: #000000;

				}
			}

			.date-calendar-dot {
				width: 12rpx;
				height: 12rpx;
				border-radius: 50%;
				background: #DE501F;
				position: absolute;
				bottom: 12rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.date-calendar-today {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF !important;
			border-radius: 50%;
			width: 60rpx;
			height: 60rpx;
			background: #DE501F;
		}
	}

	.retract-icon {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: center;
		height: 50rpx;
		background-color: #F5F6FA;

		&::before {
			position: absolute;
			z-index: 2;
			content: '';
			height: 50rpx;
			width: 750rpx;
			background: url(~@/static/class/down.png);
			background-repeat: no-repeat;
			background-size: 100%;
		}

		&:after {
			position: absolute;
			z-index: 1;
			content: '';
			width: 60rpx;
			height: 30rpx;
			// background: #F5F6FA;
			bottom: -1rpx;
			left: 50%;
			margin-left: -30rpx;
			border-radius: 100rpx 100rpx 0 0;
			border-bottom: none;
		}

		.retract-icon-image {
			position: relative;
			top: 40rpx;
			z-index: 999;
			width: 22rpx;
			height: 14rpx;
		}

		.retractIcon2 {
			transform: rotate(180deg);
		}
	}

	.date-calendar-retract {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;

		.iconfont {
			transform: rotate(270deg);

			&.retractIcon {
				transform: rotate(90deg);
			}
		}
	}
</style>
