<template>
	<view class="course">
		<view class="course-title">
			<view class="course-swiper">
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="5000"
					:duration="500">
					<swiper-item v-for="(item,index) in banner" :key="index">
						<view class="course-swiper-view">
							<image class="course-swiper-img" :src="url+item" mode="heightFix" alt="加载失败"></image>
						</view>
					</swiper-item>
					<swiper-item v-if="banner.length==0">
						<view class="course-swiper-view">
							<image class="course-swiper-img" src="/static/default.png" mode="heightFix" alt="加载失败">
							</image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- <image class="course-title-img" src="/static/default.png"></image> -->
			<view class="course-title-content">
				<view>
					<view class="fz36 fwb">{{productInfo.productName}}</view>
					<view class="pt16">
						<text class="color fz24">￥</text>
						<text class="color fz32">{{productInfo.price}}</text>
						<text class="fz24">起/节/人</text>
					</view>
				</view>
				<view class="course-title-content-right">
					<!-- <view class="text-c course-title-content-r2">
						<view class="color fz28">10</view>
						<view class="color999 fz24">课时</view>
					</view> -->
					<view class="text-c course-title-content-r2">
						<view class="color999 fz24">最多</view>
						<view class="color fz28"> {{productInfo.maxNum}} </view>
						<view class="color999 fz24">人</view>

					</view>
				</view>
			</view>
		</view>
		<!-- 推荐拼班 -->
		<view class="course-nearby">
			<view class="course-head-address" @click="$utils.router.navTo($page.Search,{type:'no',productId})">
				<image class="course-head-address-img" src="/static/home/location2.png" mode="aspectFit"></image>
				<text> {{campusOther.campusName}}</text>
				<image class="course-head-address-icon" src="/static/down2.png" mode="aspectFit"></image>
			</view>
			<view class="course-nearby-content" v-for="item in productSpellClassList" :key="item">
				<image class="course-nearby-content-img" :src="item.headUrl" mode="aspectFit"></image>
				<view>
					<view class="course-nearby-content-center">
						<text class="course-nearby-content-num">{{item.maxNum}}人班</text>
						<text>{{item.nickName}}</text>
					</view>
					<!-- 上课周期 -->
					<view class="course-nearby-content-cycle">
						<image class="course-nearby-content-cycle-img" src="/static/class/cycle.png" mode="widthFix">
						</image>
						<text>{{item.startDate}} ~ {{item.endDate}}</text>
					</view>
					<!-- 上课时段 -->
					<view class="course-nearby-content-cycle">
						<image class="course-nearby-content-cycle-img" src="/static/class/time.png" mode="widthFix">
						</image>
						<text>{{item.startTime}}~{{item.endTime }}</text>
					</view>
				</view>
				<view v-if="item.useStudentNum < item.maxNum">
					<view class="course-nearby-content-button"
						@click="$utils.router.navTo($page.OrderInfo,{classId:item.classInfoId})">加入拼班</view>
					<view class="course-nearby-content-success" v-if="item.minNumMax">差{{item.minNumMax}}人拼成</view>
					<view class="course-nearby-content-success" v-else>差{{item.unUseNum}}人拼满</view>
				</view>
				<view v-else>
					<view class="course-nearby-content-button bg-color2">已拼满</view>
				</view>
			</view>
		</view>

		<!-- 详情 + 评价 -->
		<view class="course-detail">
			<!-- tab -->
			<view class="course-detail-tab">
				<view class="course-detail-tab-item" @click="handleTab(1)"
					:class="[active==1?'course-detail-tab-active':'']">课程详情</view>
				<view class="course-detail-tab-item" @click="handleTab(2)"
					:class="[active==2?'course-detail-tab-active':'']">用户评价</view>
			</view>
			<view class="course-detail-content" v-if="active==1">
				<rich-text :nodes="productDetail"></rich-text>
			</view>
			<view class="" v-if="active==2">
				<view class="course-detail-evaluate" v-for="item in productEvaluate" :key="item.id">
					<image class="course-detail-evaluate-img" :src="item.avatar" mode="scaleToFill">
					</image>
					<view>
						<view class="course-detail-evaluate-info">
							<view class="course-detail-evaluate-info2">
								<text class="color4 fz28">{{item.nickname}}</text>
								<view class="course-detail-evaluate-info3">
									<uni-rate v-model="item.evaluationLevel" disabled disabledColor="#DE501F" size="20"
										color="#838899" active-color="#DE501F" />
									<!-- <image v-for="item in 5" :key="item" class="course-detail-evaluate-info-img"
										src="/static/class/eva.png" mode="scaleToFill"></image> -->
								</view>
							</view>
							<view class="fz24 color2">{{item.createdDate || ''}}</view>
						</view>
						<view class="course-detail-evaluate-text">
							{{item.content||''}}
						</view>
					</view>
				</view>
				<view v-if="isEvaluate" class="course-detail-evaluate-more"
					@click="$utils.router.navTo($page.Evaluate,{productId})">
					<text>查看更多</text>
					<image class="course-detail-evaluate-more-img" src="/static/class/more.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 我要拼班 -->
		<view class="course-footer2" :style="{ marginBottom: `${safeAreaHeight}px` }"></view>
		<view class="course-footer">
			<view class="course-footer-button" :style="{ marginBottom: `${safeAreaHeight}px` }" @click="submit">
				我要拼班
			</view>
		</view>
		<popup-pin ref="popupPin" @check="check"></popup-pin>
		<PopupDate ref="popupDate" :value="value"></PopupDate>
	</view>
</template>

<script>
	import PopupPin from '../components/PopupPin/PopupPin.vue'
	import PopupDate from '../components/PopupDate/PopupDate'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			PopupPin,
			PopupDate
		},
		data() {
			return {
				active: 1,
				productId: '', // 商品id
				productSpellClassList: [], // 正在拼班列表
				productInfo: {}, //商品信息
				productDetail: '', // 商品详情
				productEvaluate: [], //商品评价
				campusOther: {},
				isEvaluate: false, //评论是否超出5条
				value: "",
				banner: []
			}
		},
		watch: {
			campusOther: {
				handler() {
					this.getCourseDetail()
				}
			}
		},
		computed: {
			url() {
				return this.$url
			}
		},
		async onLoad(e) {
			console.log('商品id', e.productId);
			this.SET_STORAGE({
				str: 'campus'
			})
			this.productId = e.productId
			if (e.lat && e.lng) {
				let res = await  this.$http['map'].getSearchList({
					lat: e.lat,
					lng: e.lng
				})
				if (res.code == 200) {
					let list = res.data
					// 如果之前缓存的社区已经被删除 则重新选取
					const ls = list.filter(item => item.campusId = e.campusId)[0] || null
					this.campusOther =  ls || this.campus

				}
			} else {
				this.campusOther = this.campus
			}



		},
		methods: {
			/**
			 * @function 获取当前商品详情所有数据
			 */
			async getCourseDetail() {
				const self = this
				console.log('campusOther', this.campusOther);
				const {
					getCourseDetails,
					getProductDetails,
					getProductEvaluate
				} = this.$http['classes']
				//获取商品详情
				const res = await getCourseDetails({
					productId: this.productId,
					campusId: this.campusOther.campusId
				})
				if (res.code == 200) {
					uni.setNavigationBarTitle({
						title: res.data.productName
					})
					const banner = res.data.imageUrl.split(',')
					if (banner.length > 0) {
						this.banner = banner
					}
					this.productInfo = res.data
					res.data.productSpellClassList.forEach(item => {
						item.unUseNum = item.maxNum - item.useStudentNum
						if (item.minNum - item.useStudentNum > 0) {
							item.minNumMax = item.minNum - item.useStudentNum
						}

					})
					this.productSpellClassList = [...res.data.productSpellClassList]
				}
				// 获取商品详情下的描述
				const res2 = await getProductDetails({
					productId: this.productId
				})
				if (res2.code == 200) {
					res2.data = res2.data.replace('<img ',
						'<img style="max-width:100%;height:auto;display:block;margin:10rpx 0;"')
					this.productDetail = res2.data
				}
				// 获取当前商品的评价
				const res3 = await getProductEvaluate({
					productId: this.productId
				})
				if (res3.code == 200) {
					res3.data = res3.data.filter(item => item)
					res3.data.forEach(item => {
						if (item.avatar.indexOf('http') == -1) {
							item.avatar = this.$url + item.avatar
						}
						item.evaluationLevel = item.evaluationLevel || 0
						item.createdDate = this.$utils.dateTime.getLocalTime(item.createdDate)
					})
					if (res3.data.length > 5) {
						this.isEvaluate = true
					}
					if (res3.data.length > 5) {
						this.productEvaluate = res3.data.slice(0, 5)
					} else {
						this.productEvaluate = res3.data
					}
				}

			},
			// 打开周期
			check(ls) {
				this.value = ls[0] || ''
				this.$refs.popupDate.handleShow(true, ls)
			},
			// 打开我要拼班
			submit() {
				this.$refs.popupPin.handleShow({
					productId: this.productId,
					campusId: this.campusOther.campusId,
				})
			},
			// 切换tab
			handleTab(val) {
				this.active = val
			},
		}
	}
</script>

<style lang="scss" scoped>
	.course {
		min-height: 100vh;
		background: #EEF1FA;

		&-swiper {
			position: relative;
			top: 0;
			left: 0;
			// padding: 20rpx 32rpx 0 32rpx;
			// margin-bottom: 142rpx;
			width: 100%;
			height: 364rpx;
			z-index: 11;

			&-swiper {
				margin-top: 20rpx;
				width: 750rpx;
				height: 424rpx;
				background: #D8D8D8;
				border-radius: 16rpx;
			}

			&-view {
				text-align: center;
			}

			&-img {
				height: 376rpx;
			}
		}

		&-title {
			position: relative;
			margin-bottom: 42rpx;

			&-img {
				width: 750rpx;
				height: 424rpx;
			}

			&-content {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				position: absolute;
				left: 32rpx;
				bottom: -42rpx;
				padding: 24rpx 32rpx;
				width: 686rpx;
				box-sizing: border-box;
				height: 152rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				z-index: 99;

				&-right {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-shrink: 0;
					// width:111rpx;
					padding: 0 20rpx;
					height: 48rpx;
					background: rgba(236, 238, 245, 0.5);
					border-radius: 14rpx;
					text-align: center;
				}

				&-r2 {
					display: flex;
					justify-content: center;
					align-items: center;
					// width: 50%;


				}
			}
		}

		&-head {
			&-address {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #141D3D;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-img {
					margin-right: 16rpx;
					width: 18rpx;
					height: 24rpx;
				}

				&-icon {
					margin-top: 4rpx;
					margin-left: 12rpx;
					width: 12rpx;
					height: 8rpx;
				}
			}
		}

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

				&:last-child {
					border-bottom: none;
				}

				&-img {
					flex-shrink: 0;
					margin-right: 22rpx;
					width: 140rpx;
					height: 132rpx;
					border-radius: 12rpx;
				}

				&-center {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					flex-shrink: 0;
					width: 305rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #141D3D;
				}

				&-num {
					margin-right: 10rpx;
					padding: 4rpx 8rpx;
					background: rgba(222, 80, 31, 0.1);
					border-radius: 6rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #DE501F;
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

				&-button {
					flex-shrink: 0;
					margin-left: 28rpx;
					width: 124rpx;
					height: 52rpx;
					background: #DE501F;
					border-radius: 12rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 52rpx;
					text-align: center;
				}

				&-success {
					margin-top: 10rpx;
					text-align: right;
					font-size: 24rpx;
					font-family: SourceHanSansSC-Regular, SourceHanSansSC;
					font-weight: 400;
					color: #838899;
				}
			}
		}


		// 课程详情
		&-detail {
			padding: 0 32rpx 20rpx 32rpx;
			margin-left: 32rpx;
			margin-top: 32rpx;
			width: 686rpx;
			// min-height: 702rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;

			&-tab {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-item {
					padding: 30rpx;
					font-weight: 600;
					font-size: 28rpx;

					&:first-child {
						padding-left: 0;
					}
				}

				&-active {
					position: relative;
					color: #DE501F;

					&:before {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 20rpx;
						margin-left: -24rpx;
						width: 24rpx;
						height: 4rpx;
						background: #DE501F;
						border-radius: 3rpx;
					}
				}
			}

			&-content {
				padding: 30rpx 0;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			&-evaluate {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding: 32rpx 0;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-img {
					flex-shrink: 0;
					margin-right: 28rpx;
					width: 88rpx;
					height: 88rpx;
				}

				&-text {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #838899;
				}

				&-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 510rpx;

					&-img {
						margin-right: 8rpx;
						width: 24rpx;
						height: 24rpx;
					}
				}

				&-info2 {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				&-info3 {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-left: 22rpx;
				}

				&-more {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 20rpx;
					height: 56rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #838899;

					&-img {
						margin-left: 8rpx;
						height: 20rpx;
						width: 22rpx;
					}
				}
			}
		}

		&-footer2 {
			height: 250rpx;
		}

		&-footer {
			position: fixed;
			bottom: 0;
			width: 750rpx;
			padding: 32rpx 30rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

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

		}
	}

	.swiper {
		width: 750rpx;
		height: 424rpx;
		border-radius: 16rpx;
	}
</style>
