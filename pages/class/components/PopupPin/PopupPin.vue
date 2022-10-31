<template>
	<view class="">
		<uni-popup ref="popup" :isMaskClick="isMaskClick" @change="change">
			<view class="popup-content">
				<!-- 当前商品信息 -->
				<view class=" flex-bc">
					<view class="popup-nearby-content popup-content2">
						<image class="popup-nearby-content-img" :src="coverImage" mode="aspectFill"></image>
						<view class="">
							<view class="">
								<text class="color fz24">￥</text>
								<text class="color fz32">{{data.price}}</text>
								<text class="fz24">/节</text>
								<text class="popup-content-jie">{{data.totalNum || 0}}节课</text>
							</view>
							<!-- 上课周期 -->
							<view class="popup-nearby-content-cycle">
								<image class="popup-nearby-content-cycle-img" src="/static/class/cycle.png"
									mode="widthFix">
								</image>
								<text>周期: {{data.startDate}}~ {{data.endDate}}</text>
							</view>
							<view class="popup-nearby-content-cycle " v-if="data.courseType==1">
								<image class="popup-nearby-content-cycle-img" src="/static/class/cycle.png"
									mode="widthFix">
								</image> 
								<text>按星期: {{data.weekCodeName}}</text>
							</view>
							<view class="popup-nearby-content-cycle" v-if="data.courseType==2">
								<image class="popup-nearby-content-cycle-img" src="/static/class/cycle.png"
									mode="widthFix">
								</image>
								<text class="o-over" style="width:330rpx;display: inline-block;">按日期: {{data.CourseDateName}}</text>
							</view>
							<!-- 上课时段 -->
							<view class="popup-nearby-content-cycle" v-if="data.startPeriod&&data.endPeriod">
								<image class="popup-nearby-content-cycle-img" src="/static/class/time.png"
									mode="widthFix">
								</image>
								<text>时段:{{data.startPeriod}}~{{data.endPeriod}}</text>
							</view>
						</view>
					</view>
					<view class="popup-nearby-content-check" @click="check">
						查看周期
					</view>
				</view>

				<view class="popup-content-specs">
					<!-- 周期 -->
					<view class="fwb fz28 mt32">课程周期</view>
					<view class="popup-content-cycle fz24">
						<view class="mt32 mr26 popup-content-cycle-item" @click="handleSchedule(item)"
							:class="[data.scheduleId==item.scheduleId?'popup-content-cycle-active':'',
							!item.status?'popup-content-cycle-dis':'']"
							v-for="(item,index) in myCourseScheduleList" :key="index">
							{{item.scheduleName}}
							<!-- {{item.startDate}}~ {{item.endDate}} -->
						</view>
					</view>
					<!-- 上课时段 -->
					<view class="fwb fz28 mt32">上课时段</view>
					<view class="popup-content-cycle fz24">
						<view class="mt32 mr26 popup-content-cycle-item" @click="handlePeriod(item)"
							:class="[data.periodId==item.id?'popup-content-cycle-active':'',
							item.status==5?'popup-content-cycle-dis':'']"
							v-for="(item,index) in periodList" :key="index">
							{{item.startTime}}~{{item.endTime}}
						</view>
					</view>
					<!-- 拼班方式 -->
					<view class="fwb fz28 mt32">拼班方式</view>
					<view class="popup-content-cycle fz24">
						<view class="mt32 mr26 popup-content-cycle-item" v-for="(item,index) in spellTypeList"
							:key="index" @click="handleSpellType(item)"
							:class="[data.productSellPriceRelId==item.productSellPriceRelId?'popup-content-cycle-active':'']">
							{{item.spellType}}
						</view>
					</view>
				</view>

				<view class="popup-footer">
					<view class="popup-footer-button" @click="submit">
						发起拼班
					</view>
					<view class="popup-footer-button popup-footer-button2" @click="handleOther">
						没有库存试试加入拼班？
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMaskClick: true,
				data: {
					organizationId: "", //	机构ID
					campusId: "", //	校区Id
					courseId: "", //课程Id
					productId: "", // 商品Id
					courseType: 2,

					startDate: "", //	上课开始日期(周期)
					endDate: "", //上课结束日期(周期)
					startPeriod: "", //	上课开始时段
					endPeriod: "", // 上课结束时段
					totalNum: 0, //课表节次总数


					scheduleId: "", // 	排课表主键Id
					scheduleName: "", //课表名称

					spellType: "", //	拼班方式
					productSellPriceRelId: "", // 	商品拼班类型表Id
					price: 0, // 单价
				},
				coverImage: '',
				spellTypeList: [],
				myCourseScheduleList: [],
				periodList: [],
				courseDateList:[]
			}
		},
		methods: {
			// 发起拼班
			submit() {
				if (!this.data.periodId) {
					uni.showToast({
						icon:'none',
						title: "请选择一个时段发起拼班"
					})
					return false
				}
				const authorization = this.$utils.util.getCache('Authorization');
				if(!authorization){
					this.$utils.userInfo.login('this')
					return false
				}
				console.log('aa',JSON.stringify(this.data));
				this.$http['classes'].getInitiateSpellClass(this.data).then(res => {
					if (res.code == 200) {
						this.$utils.router.navTo(this.$page.OrderInfo, {
							classId: res.data.classInfoId,
							isPin:1
						})
					}
				})
			},
			handleOther() {
				this.$refs.popup.close('bottom')
			},
			async getDate(data){
				const res = await this.$http['classes'].indexCourseDate(data)
				if(res.code==200){
					this.data.totalNum = res.data.number
					res.data.courseDateList = res.data.courseDateList || []
					this.courseDateList = res.data.courseDateList.map(item=>item.courseDate)
					this.data.CourseDateName = this.$utils.dateTime.filteDate(
						this.courseDateList,
						this.data.startDate,
						this.data.endDate
					)
				}
			},
			// 查看周期
			check() {
				// uni.showToast({
				// 	title: "查看周期"
				// })
					this.$emit('check', this.courseDateList|| [])
				// const res = await this.$http['classes'].indexCourseDate({scheduleId:this.data.scheduleId})
				// if(res.code==200){
				// 	const ls = res.data.map(item=>item.courseDate)
				// 	this.$emit('check', ls)
				// }
				// if (this.data.courseType == 2) {
				// 	ls = this.$utils.dateTime.getRangeDay([
				// 		this.data.startDate, //	上课开始日期(周期)
				// 		this.data.endDate, //上课结束日期(周期)
				// 	], 1000)
				// } else {
				// 	ls = this.$utils.dateTime.getRangeDay([
				// 		this.data.startDate, //	上课开始日期(周期)
				// 		this.data.endDate, //上课结束日期(周期)
				// 	],1000, this.data.weekCode,'week')
				// 	console.log(ls);
				// }

				
			},
			// 选择拼班方式
			handleSpellType(item) {
				if (item.productSellPriceRelId == this.data.productSellPriceRelId) {
					return false
				}
				Object.assign(this.data, item)
				this.$forceUpdate()
			},
			// 选择时段
			handlePeriod(item) {
				console.log(item, this.data.periodId, item.id);
				
				if (item.id == this.data.periodId || item.status == 5) {
					return false
				}
				Object.assign(this.data, {
					startPeriod: item.startTime, //	上课开始时段
					endPeriod: item.endTime, // 上课结束时段
					periodId: item.id,
				})
				// 
				console.log('调取');
			
				this.$forceUpdate()
			},
			//  选择周期
			handleSchedule(item) {
				if (item.scheduleId == this.data.scheduleId || !item.status) {
					return false
				}
				
				console.log(item);
				Object.assign(this.data, {
					scheduleId: item.scheduleId, // 	排课表主键Id
					scheduleName: item.scheduleName, //课表名称
					courseType: item.courseType, // 课程类型
					weekCodeName: item.weekCodeName,
					weekCode: item.weekCode,
					totalNum: item.totalNum, //课表节次总数
					startDate: item.startDate, //	上课开始日期(周期)
					endDate: item.endDate, //上课结束日期(周期)
				})
				// 上课时段
				item.periodList.forEach(row=>{
					row.id = `${row.startTime}-${row.endTime}`
				})
				this.periodList = item.periodList || []
				let periodList ={}
				console.log('this.periodList',this.periodList);
				for(let i =0 ;i<this.periodList.length;i++){
					if(this.periodList[i].status!=5){
						periodList = this.periodList[i]
						break;
					}
				}
				
				this.handlePeriod(periodList)
				this.getDate( {
					startTime: periodList.startTime, //	上课开始时段
					endTime: periodList.endTime, // 上课结束时段
					scheduleId: this.data.scheduleId,
				})
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(val) {
				const self = this
				// val.campusId = 'de3854becdf21cabc921cdeffaf84d78'
				this.$http['classes'].getSpellClass(val).then(res => {
					if (res.code == 200) {
						const isSchedule = !res.data.myCourseScheduleList || res.data.myCourseScheduleList.length==0
						const isType = !res.data.spellTypeList || res.data.spellTypeList.length==0
						if(isSchedule || isType){
							this.$utils.model.showToast('该课程当前无可拼班课表，请浏览其他课程！', 2500)
							return false
						}
						this.$refs.popup.open('bottom')
						this.coverImage = this.$url + res.data.coverImage

						// 课程周期
						let list = res.data.myCourseScheduleList || []
						list.forEach(item => {
							item['weekCodeName'] = self.$utils.dateTime.filteDay(item.weekCode)
							item['status'] = item.periodList.some(row=>item.status!=5)
						})
						this.myCourseScheduleList = list
						let scheduleList ={}
						for(let i =0 ;i<this.myCourseScheduleList.length;i++){
							if(this.myCourseScheduleList[i].status){
								scheduleList = this.myCourseScheduleList[i]
								break;
							}
						}
						// 拼班方式
						this.spellTypeList = res.data.spellTypeList || []
						const typeList = this.spellTypeList[0] || {}
						this.data = {
							organizationId: res.data.organizationId, //	机构ID
							campusId: res.data.campusId, //	校区Id
							courseId: res.data.courseId, //课程Id
							productId: res.data.productId, // 商品Id
						}
						this.handleSchedule(scheduleList)
						this.handleSpellType(typeList)
					}
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	.popup {

		// 附近拼班
		&-nearby {
			margin-top: 82rpx;
			z-index: 9;
			margin-left: 32rpx;
			padding: 0 32rpx;
			width: 686rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;

			&-content {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0;
				// width: 686rpx;
				min-height: 180rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 16rpx;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-img {
					flex-shrink: 0;
					margin-right: 22rpx;
					width: 140rpx;
					height: 132rpx;
					border-radius: 12rpx;
				}



				&-cycle {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #838899;

					&-img {
						margin-right: 10rpx;
						width: 24rpx;
						height: 24rpx;
					}
				}

				&-check {
					margin-left: 26rpx;
					width: 120rpx;
					height: 48rpx;
					background: #DE501F;
					border-radius: 8rpx;
					font-size: 24rpx;
					font-family: SourceHanSansSC-Regular, SourceHanSansSC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 48rpx;
					text-align: center;
				}




			}
		}

		&-content {
			width: 750rpx;
			padding: 36rpx 32rpx 0 32rpx;
			max-height: 1052rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #FFFFFF;
			// box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-specs {
				height: 570rpx;
				overflow-y: scroll;
			}

			&-jie {
				margin-left: 20rpx;
				padding: 2rpx 8rpx;
				background: rgba(20, 29, 61, 0.1);
				border-radius: 8rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #838899;
			}

			&-cycle {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: wrap;

				&-item {
					padding: 8rpx 12rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					color: #838899;
					border: 2rpx solid #E7E8EB;
				}

				&-active {
					background: #DE501F;
					color: #FFFFFF;
				}
				&-dis{
					background: #E7E8EB;
					color: #333333;
				}
			}

		}

		&-content2 {
			border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
		}

		&-footer2 {
			height: 250rpx;
		}

		&-footer {
			// position: fixed;
			// bottom: 0;
			// width: 750rpx;
			padding-top: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			&-button {
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

			&-button2 {
				color: #DE501F;
				background: #FFFFFF;
			}
		}
	}
</style>
