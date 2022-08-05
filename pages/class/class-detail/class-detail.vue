<template>
	<view class="class-detail">
		<class-item type="2" :data="data" :classStatus="classStatus" :isTeach="isTeach"></class-item>
		<view class="class-detail-user" v-if="!isAttendance">
			<view class="home-title">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
					<text>团长</text>
				</view>
			</view>
			<view class="class-detail-head">
				<view class="class-detail-head-flex">
					<image class="class-detail-head-img" :src="data.avatar" mode="aspectFit"></image>
					<text class="fwb fz32">{{data.wxName || ''}}</text>
					<image class="class-detail-head-icon" src="/static/class/head.png" mode="aspectFit"></image>
				</view>
				<view class="class-detail-head-contact" @click="handlePhone(data.wxPhone)">
					<image class="class-detail-head-liao" src="/static/class/liao.png" mode="aspectFit"></image>
					<text>联系团长</text>
				</view>
			</view>
			<view class="home-title">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
					<text>团员</text>
				</view>
			</view>
			<view class="class-detail-stu">
				<view class="class-detail-stu-flex fz28" v-for="row in data.studentVOList" :key="row.id">
					<image class="class-detail-stu-img" :src="row.headUrl" mode="aspectFit"></image>
					<view class="fwb class-detail-stu-name">{{row.studentName}}</view>
					<view class="class-detail-stu-sex">{{item.gender==1?'男':'女'}}</view>
					<view class="class-detail-stu-age">{{row.age}}岁</view>
					<view class="class-detail-stu-tip">
						<text class="class-detail-stu-tip2" v-if="isTeach==1 && !row.isSufficient">余额不足</text>
					</view>
					<image class="class-detail-stu-icon" @click="handleShow(row)" src="/static/edit.png"
						mode="widthFix">
					</image>
				</view>
			</view>
		</view>

		<!-- 考勤 -->
		<view class="class-detail-user class-detail-attendance" v-if="isAttendance">
			<view class="class-detail-attendance-item fz28 flex-bc">
				<text class="color4">考勤</text>
				<text class="color2">{{studentVOList.isSign?'教练已签到':'教练未签到'}}</text>
			</view>
			<view class="class-detail-attendance-title flex-bc">
				<view class="flex-sc">
					<image class="class-detail-attendance-img" src="/static/attendance.png" mode="widthFix">
						<text class="color4">考勤名单</text>
				</view>
				<text class="color2">
					<text>{{studentVOList.courseDate}}</text>
					<text class="ml12">{{studentVOList.startTime}}~{{studentVOList.endTime}}</text>
				</text>
			</view>
			<view class="class-detail-stu">
				<view class="class-detail-stu-flex fz28" v-for="(item,index) in studentVOList.data" :key="index"
					@click="changeBox(item)">
					<view v-if="boxActive.indexOf(item.id)==-1" class="class-detail-attendance-check">
					</view>
					<image v-else class="class-detail-attendance-check" src="/static/checkbox.png" mode="widthFix">
					</image>
					<image class="class-detail-stu-img" :src="avatar" mode="aspectFit"></image>
					<view class="fwb class-detail-stu-name">{{item.studentName}}</view>
					<view class="class-detail-stu-sex">{{item.gender==1?'男':'女'}}</view>
					<view class="class-detail-stu-age">{{item.age}}岁</view>
					<view class="color256 text-r class-detail-stu-status" v-if="item.attendanceStatus==1">已出勤</view>
					<view class="color2 text-r class-detail-stu-status" v-if="item.attendanceStatus==2">学员请假</view>
					<view class="color text-r class-detail-stu-status" v-if="item.attendanceStatus==3">学员未到</view>
				</view>
			</view>
		</view>


		<view class="class-detail-footer2" :style="{ marginBottom: `${safeAreaHeight}px` }"></view>
		<!-- 家长展示 -->
		<view class="class-detail-footer" :style="{ paddingBottom: `${safeAreaHeight}px` }"
			v-if="isTeach==2 && !isAttendance">
			<view v-if="'456'.indexOf(data.classStatus)==-1"
				class="class-detail-footer-button class-detail-footer-button2" @click="handleDismiss">
				{{isHead?'解散班级':'退出班级'}}
			</view>
			<view class="class-detail-footer-button"
				:class="['456'.indexOf(data.classStatus)==-1?'':'class-detail-footer-button3']" @click="checkTimetable">
				查看课表
			</view>
			<view class="class-detail-footer-button"
				:class="['456'.indexOf(data.classStatus)==-1?'':'class-detail-footer-button3']"
				@click="$utils.router.navTo($page.Demeanour,{classId})">
				班级风采
			</view>
			<view class="class-detail-footer-button"
				:class="['456'.indexOf(data.classStatus)==-1?'':'class-detail-footer-button3']" @click="handleRecharge">
				去充值
			</view>
		</view>
		<!-- 教练展示 -->
		<view class="class-detail-footer" :style="{ paddingBottom: `${safeAreaHeight}px` }"
			v-if="isTeach==1 && !isAttendance">
			<view class="class-detail-footer-button class-detail-footer-button3" @click="checkTimetable">
				查看课表
			</view>
			<view class="class-detail-footer-button class-detail-footer-button3"
				@click="$utils.router.navTo($page.Demeanour,{classId,scheduleDetailId:data.courseScheduleDetailId})">
				班级风采
			</view>
			<view class="class-detail-footer-button class-detail-footer-button3" @click="handleAttendance">
				班级考勤
			</view>
		</view>
		<!-- 考勤展示 -->
		<view class="class-detail-footer" :style="{ paddingBottom: `${safeAreaHeight}px` }" v-if="isAttendance">
			<view class="class-detail-footer-button class-detail-footer-button3" @click="handleStutas(1,'签到')">
				教练签到
			</view>
			<view class="class-detail-footer-button class-detail-footer-button3" @click="handleStutas(2,'请假')">
				学员请假
			</view>
			<view class="class-detail-footer-button class-detail-footer-button3" @click="handleStutas(3,'未到')">
				学员未到
			</view>
		</view>
		<!-- 充值 -->
		<recharge ref="recharge" />
		<!-- 课表弹窗 -->
		<popup-date ref="popupDate" @attendance="getAttendance"></popup-date>
		<!-- 教练评论弹窗 -->
		<popup-eval ref="popupEval" />
		<!-- 会员查看评论弹窗 -->
		<popup-eval2 ref="popupEval2" />
	</view>
</template>
<script>
	import mixin from '@/mixin.js'
	import ClassItem from '@/components/ClassItem/ClassItem.vue'
	import Recharge from '@/components/Recharge/Recharge.vue'
	import PopupDate from '../components/PopupDate/PopupDate'
	import PopupEval from '../components/PopupEval/PopupEval.vue'
	import PopupEval2 from '../components/PopupEval/PopupEval2.vue'
	export default {
		components: {
			ClassItem,
			Recharge,
			PopupDate,
			PopupEval,
			PopupEval2
		},
		mixins: [mixin],
		data() {
			return {
				isHead: true, //是否 是团长进入该页面
				isAttendance: false, //是否考勤
				boxActive: [],
				studentVOList: [], // 教练考勤人员
				data: {},
				classId: ''

			}
		},
		async onLoad(e) {
			this.classId = e.classId //|| '39fffa311d849b8719aa8293bd302397'
			this.$nextTick(() => {
				this.getClassDetail()
			})
		},
		methods: {
			getClassDetail() {
				const {
					getClassStudenDetail,
					getClassDetail
				} = this.$http['classes']
				let getData = ''
				console.log(this.isTeach);
				if (this.isTeach == 1) {
					// 教练
					getData = getClassStudenDetail
				} else {
					// 家长
					getData = getClassDetail
				}
				getData({
					classId: this.classId
				}).then(res => {
					if (res.code == 200) {
						this.isHead = res.data.isBoss
						res.data.startPeriod = this.$utils.dateTime.getLocalTime(
							`2022-01-01 ${res.data.startPeriod}`, 'hh:mm')
						res.data.endPeriod = this.$utils.dateTime.getLocalTime(`2022-01-01 ${res.data.endPeriod}`,
							'hh:mm')
						if (res.data.classStatus == 2 || res.data.classStatus == 4 || res.data.classStatus ==
							5 || res.data.classStatus == 6) {
							res.data.nextCLassTime = null
						}
						if (res.data.coverImage.indexOf('http') == -1) {
							res.data.coverImage = this.$url + res.data.coverImage
						}
						if(res.data.avatar.indexOf('http')==-1){
							res.data.avatar = this.$url + res.data.avatar
						}
						if (res.data.nextCLassTime) {
							res.data.nextCLassTime = this.$utils.dateTime.getLocalTime(
								res.data.nextCLassTime,
								'yyyy-MM-dd hh:mm')
						}
						res.data['weekCodeName'] = this.$utils.dateTime.filteDay(res.data.weekCode)
						res.data.studentVOList = res.data.studentVOList || []
						res.data.studentVOList.forEach(item => {
							if (item.headUrl) {
								if(item.headUrl.indexOf('http')==-1){
									item.headUrl = this.$url + item.headUrl
								}
							} else {
								item.headUrl = this.avatar
							}

						})
						this.data = res.data
					}
				})
			},
			// 联系团长
			handlePhone(val) {
				wx.makePhoneCall({
					phoneNumber: val //仅为示例，并非真实的电话号码
				})
			},
			/**
			 * @function 打开评价评分方法
			 * @param {Object} item
			 */
			handleShow(item) {
				if (this.isTeach == 1) {
					// 教练评价
					this.$refs.popupEval.handleShow({
						...item,
						...this.data
					})
				} else {
					// 家长查看评价
					this.$refs.popupEval2.handleShow({
						...item,
						...this.data
					})
				}

			},
			// 打开充值弹窗
			handleRecharge() {
				this.$refs.recharge.handleShow()
			},
			// 解散
			handleDismiss() {
				// uni.showToast({
				// 	title: this.isHead ? "解散" : "退出"
				// })
				if (this.isHead) {
					this.$http['classes'].disbandClass({
						classId: this.classId,
						studentIds: this.data.data.studentVOList.map(item => item.id)
					}).then(res => {
						if (res.code == 200) {
							this.$utils.router.navBackData()
						}
					})
				} else {
					this.$http['classes'].exitClass({
						classId: this.classId
					}).then(res => {
						if (res.code == 200) {
							this.$utils.router.navBackData()
						}
					})
				}
			},
			// 考勤按钮
			async getAttendance(dataObj) {
				const res = await this.$http['classes'].coachScheduleStuInfo({
					id: dataObj.id,
					classId:this.classId
				}).then(res => {
					if (res.code == 200) {
						this.isAttendance = true
						let isSign = false
						isSign = res.data.some(row=>row.attendanceStatus>0)
						this.studentVOList = {
							...dataObj,
							isSign,
							data: res.data
						}
					}
				})
			},
			// 打开考勤课表
			handleAttendance() {
				this.$refs.popupDate.handleShow(false, {
					isTeach: this.isTeach,
					scheduleId: this.data.scheduleId,
					classId:this.classId
				}, true)
			},
			// 修改学员考勤状态
			handleStutas(val, type) {
				// uni.showToast({
				// 	title: type
				// })
				const self = this
				let data = JSON.parse(JSON.stringify(self.studentVOList.data))
				if (val == 1) {
					data.forEach(item => {
						item.attendanceStatus = val
					})
				} else {
					if (self.boxActive.length == 0) {
						uni.showToast({
							title: '请选择考勤学员'
						})
						return false
					}
					data = data.filter(item => {
						item.attendanceStatus = val
						let index = self.boxActive.indexOf(item.id)
						return index > -1
					})
				}
				// this.studentVOList
				console.log('考勤数据：', {
					attendanceStatus: val,
					attendances: data,
					classId: self.classId,
					id: self.studentVOList.id
				})
				self.$http['classes'].scheduleAttendance({
						attendanceStatus: val,
						attendances: data,
						classId: self.classId,
						id: self.studentVOList.id
					})
					.then(res => {
						if (res.code == 200) {
							self.getAttendance(self.studentVOList)
							self.boxActive = []
						}
					})
			},
			// 查看课表
			checkTimetable() {
				// uni.showToast({
				// 	title: "查看课表"
				// })
				this.$refs.popupDate.handleShow(false, {
					isTeach: this.isTeach,
					scheduleId: this.data.scheduleId,
					classId: this.classId,
				})
			},

			changeBox(val) {
				let index = this.boxActive.indexOf(val.id)
				console.log(val, index);
				if (index > -1) {
					this.boxActive.splice(index, 1)
				} else {
					this.boxActive.push(val.id)
				}
				console.log(this.boxActive);
			},

		}
	}
</script>

<style lang="scss" scoped>
	.home-title {
		padding-top: 32rpx !important;
	}

	.class-detail {
		min-height: 100vh;
		background: #EEF1FA;
		box-sizing: border-box;
		padding: 32rpx 0 0 0;

		&-user {
			margin-top: 30rpx;
			margin-left: 32rpx;
			padding-bottom: 32rpx;
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
		}

		&-attendance {
			&-item {
				margin: 0 32rpx;
				padding: 32rpx 0;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
			}

			&-check {
				margin-right: 24rpx;
				flex-shrink: 0;
				width: 36rpx;
				height: 36rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #E7E8EB;
			}

			&-title {
				margin-top: 30rpx;
				margin-left: 32rpx;
				padding: 0 32rpx;
				width: 622rpx;
				height: 64rpx;
				box-sizing: border-box;
				background: rgba(20, 29, 61, 0.05);
				;
				border-radius: 12rpx;
				font-size: 24rpx;
			}

			&-img {
				margin-right: 10rpx;
				width: 24rpx;
				height: 24rpx;
			}
		}

		&-adduser {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 32rpx 0 0 32rpx;
			width: 156rpx;
			height: 52rpx;
			background: #DE501F;
			border-radius: 12rpx;
			font-size: 24rpx;
			font-family: SourceHanSansSC-Regular, SourceHanSansSC;
			font-weight: 400;
			color: #FFFFFF;

			&-add {
				margin-right: 8rpx;
				width: 24rpx;
				height: 26rpx;
			}
		}

		&-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;

			&-flex {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;
			}

			&-img {
				flex-shrink: 0;
				margin-right: 26rpx;
				width: 88rpx;
				height: 88rpx;
				background: #cecece;
				border-radius: 50%;
			}

			&-icon {
				position: absolute;
				left: 71rpx;
				bottom: -17rpx;
				width: 34rpx;
				height: 34rpx;
			}

			&-share {
				flex-shrink: 0;
				width: 60rpx;
				height: 60rpx;
			}

			&-contact {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 156rpx;
				height: 52rpx;
				background: #DE501F;
				border-radius: 12rpx;
				font-size: 24rpx;
				font-family: SourceHanSansSC-Regular, SourceHanSansSC;
				font-weight: 400;
				color: #FFFFFF;
			}

			&-liao {
				margin-right: 8rpx;
				width: 24rpx;
				height: 24rpx;
			}
		}

		&-stu {
			padding: 0 32rpx;

			&-flex {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
			}

			&-name {
				width: 200rpx;
			}

			&-sex {
				text-align: center;
				width: 80rpx;
			}

			&-age {
				text-align: center;
				width: 100rpx;
			}

			&-status {
				width: 120rpx;
				font-size: 28rpx;
			}

			&-tip {
				width: 116rpx;
			}

			&-tip2 {
				display: inline-block;
				width: 116rpx;
				height: 40rpx;
				background: rgba(222, 80, 31, 0.1000);
				border-radius: 6rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #DE501F;
				text-align: center;
				line-height: 40rpx;
			}

			&-img {
				flex-shrink: 0;
				margin-right: 24rpx;
				width: 48rpx;
				height: 46rpx;
				border-radius: 50%;
			}

			&-icon {
				margin-left: 30rpx;
				flex-shrink: 0;
				width: 52rpx;
				height: 52rpx;
			}
		}

		&-footer2 {
			height: 250rpx;
		}

		&-footer {
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 750rpx;
			padding: 32rpx 30rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-button {
				margin-bottom: 32rpx;
				width: 160rpx;
				height: 88rpx;
				background: #DE501F;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 88rpx;
				text-align: center;
				border: 2rpx solid #DE501F;
			}

			&-button2 {
				background: #FFFFFF;
				color: #DE501F;
			}

			&-button3 {
				width: 218rpx;
			}

		}
	}
</style>
