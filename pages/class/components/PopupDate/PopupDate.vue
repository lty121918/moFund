<template>
	<view class="" @click.stop>
		<uni-popup ref="popup" :isMaskClick="isMaskClick" @change="change">
			<view class="popup-content">
				<DateCalendar ref="dateCalendar" @change="change2" :value="value" :dotLists="dotLists">
				</DateCalendar>
				<view class="popup-footer" v-if="isShow">
					<view class="popup-footer-button" @click="close">返回拼班</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup2" @change="change">
			<view class="popup-stu">
				<view class="popup-stu-flex fz28" v-for="row in studentVOList" :key="row.id">
					<view class="fwb popup-stu-name">{{row.studentName}}</view>
					<view class="fwb popup-stu-name">{{row.contactPhone}}</view>
					<view class="popup-stu-sex">{{item.gender==1?'男':'女'}}</view>
					<view class="popup-stu-age">{{row.age}}岁</view>
					<view class="text-rpopup-stu-status" v-if="row.attendanceStatus==0">待签到</view>
					<view class="color256 text-rpopup-stu-status" v-if="row.attendanceStatus==1">已签到</view>
					<view class="color2 text-r popup-stu-status" v-if="row.attendanceStatus==2">请假</view>
					<view class="color text-r popup-stu-status" v-if="row.attendanceStatus==3">未到</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import DateCalendar from '../DateCalendar/DateCalendar'
	export default {
		props:{
			value: {
				type: [String, Number],
				default: ''
			},
		},
		components: {
			DateCalendar
		},
		data() {
			return {
				dotLists: [],
				data: [],
				isShow: false,
				isMaskClick: true,
				isTeach: 2,
				studentVOList: [],
				isAttendance:false
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			async change2(e = {}) {
				const date = this.$utils.dateTime.ltgtDate2( e.fulldate)
				console.log(date);
				if (this.dotLists.indexOf(e.fulldate) > -1 && this.isAttendance) {
					// 历史记录的是显示
					const dataObj = this.data.find(item => item.courseDate == e.fulldate)
					if( date==1){
						const {
							coachScheduleStuInfo,
							vipScheduleStuInfo
						} = this.$http['classes']
						let res = null
						if (this.isTeach == 1) {
							res = await coachScheduleStuInfo({
								id: dataObj.id
							})
						} else {
							res = await vipScheduleStuInfo({
								id: dataObj.id
							})
						}
						if (res.code == 200) {
							// this.$refs.popup.close('bottom')
							this.$refs.popup2.open('center')
						}
					} else {
						// 切换考勤
						this.$emit('attendance',dataObj)
						this.$refs.popup.close('bottom')
					}
				}
				console.log(e.fulldate);
			},
			close() {
				this.$refs.popup.close('bottom')
				this.$emit('close', false)
			},
			async handleShow(isShow = false, ls, isAttendance = false) {
				if (isAttendance || !isShow) {
					const res = await this.$http['classes'].courseScheduleView({
						scheduleId: ls.scheduleId
					})
					if (res.code == 200) {
						this.data = res.data
						this.dotLists = res.data.map(item => item.courseDate)
					}
					this.isTeach = ls.isTeach
				} else {
					this.isTeach = 2
					this.dotLists = ls
				}
				this.isAttendance = isAttendance
				this.$refs.popup.open('bottom')
				this.isShow = isShow
				this.isMaskClick = !isShow
			},

		}
	}
</script>

<style scoped lang="scss">
	.popup {
		&-content {
			width: 750rpx;
			padding: 0rpx 32rpx 0 32rpx;
			max-height: 1052rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #FFFFFF;
			// box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #141D3D;

			}

			&-bottom {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding-top: 18rpx;
				padding-bottom: 32rpx;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
			}

			&-left {
				flex-shrink: 0;
				margin-right: 30rpx;
				width: 180rpx;
				height: 204rpx;
			}

			&-textarea {
				width: 598rpx;
			}

			&-img {
				width: 180rpx;
				height: 204rpx;
			}

			&-cycle {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #838899;
			}
		}


		&-footer {
			// position: fixed;
			// bottom: 0;
			// width: 750rpx;
			padding-top: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			&-button {
				margin-bottom: 32rpx;
				width: 690rpx;
				height: 92rpx;
				background: #DE501F;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 92rpx;
			}
		}

		&-stu {
			width: 750rpx;
			padding: 0rpx 32rpx 0 32rpx;
			max-height: 750rpx;
			min-height: 375rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #FFFFFF;
			// box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx;

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


			&-img {
				flex-shrink: 0;
				margin-right: 24rpx;
				width: 48rpx;
				height: 46rpx;
				border-radius: 50%;
			}
		}
	}
</style>
