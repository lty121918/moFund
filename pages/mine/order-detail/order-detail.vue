<template>
	<view class="order-detail">
		<view class="order-detail-top" @click="handleNavTo" v-if="data.type == 'consume'">
			<van-image fit="cover" use-error-slot class="order-detail-img" radius="10" width="128" height="144"
				:src="listData.coverImage">
			</van-image>
			<!-- 课程名称 -->
			<view class="order-detail-right">
				<view class="order-detail-right-title">
					{{listData.productName}}
				</view>
				<view class="color">
					<text class="fz24">￥</text>
					<text class="fz32">{{listData.actuallyAmount || 0}}</text>
					<text class="color3 fz24">/节</text>
				</view>
				<view class="order-detail-status">{{orderStatus[listData.orderStatus]}}</view>
			</view>
		</view>
		<view class="order-detail-center">
			<view class="order-detail-center-item flex-bc">
				<view class="">
					<text>订单编号:</text>
					<text class="ml12">{{listData.orderNo || listData.tradeNo}}</text>
				</view>
				<view class="order-detail-center-copy" @click="handleCopy(listData.orderNo || listData.tradeNo)">复制
				</view>
			</view>
			<view class="order-detail-center-item">
				<text>下单时间:</text>
				<text class="ml12">{{listData.orderTime ||listData.createdDate}}</text>
			</view>
			<view class="order-detail-center-item">
				<text>支付时间:</text>
				<text class="ml12">{{listData.payTime || listData.operateTime}}</text>
			</view>
			<view class="order-detail-center-item">
				<text>优惠金额:</text>
				<text class="ml12">{{listData.discountAmount || 0}}元</text>
			</view>
			<view class="order-detail-center-item">
				<text>实付金额:</text>
				<text class="ml12">{{listData.actuallyAmount ||listData.amount}}元</text>
			</view>
		</view>

		<view class="order-detail-center" v-if="data.type == 'consume'">
			<view class="order-detail-center-item">
				<text>校区:</text>
				<text class="ml12">{{listData.campusName}}</text>
			</view>
			<view class="order-detail-center-item">
				<text>上课周期:</text>
				<text class="ml12">{{listData.courseTime}}</text>
			</view>
			<view class="order-detail-center-item">
				<text>上课日期:</text>
				<text class="ml12">{{listData.courseDate}}</text>
			</view>
			<view class="order-detail-center-item">
				<text>上课时段:</text>
				<text class="ml12">{{listData.classTime}}</text>
			</view>
		</view>

		<view class="order-detail-center">
			<view class="order-detail-center-item">
				<text>会员:</text>
				<text class="ml12">{{listData.name}}</text>
			</view>
			<view class="order-detail-center-item">
				<text>手机号:</text>
				<text class="ml12">{{listData.contactPhone}}</text>
			</view>
			<view class="order-detail-center-item" v-if="data.type == 'consume'">
				<text>学员:</text>
				<text class="ml12">{{listData.studentName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import vanImage from '@/wxcomponents/vant/image/index'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			vanImage
		},
		data() {
			return {
				data: {},
				listData: {},
				orderStatus: {
					1: '待付款',
					2: '已付款',
					3: '退款中',
					4: "已退款",
					5: '已取消'
				}
			}
		},
		onLoad(e) {
			console.log(e);
			this.data = e
			this.getData()
		},
		methods: {
			async handleNavTo() {
				if (this.listData.productId) {
					this.SET_STORAGE({
						str: 'location'
					})
					let res = await this.$http['map'].getSearchList({
						lat: this.location.latitude,
						lng: this.location.longitude,
						// productId:e.productId
					})
					if (res.code == 200) {
						let list = res.data
						// 如果之前缓存的社区已经被删除 则重新选取
						const ls = list.filter(item => item.campusId == this.listData.campusId)[0] || null
						if (ls) {
							this.$utils.router.navTo(this.$page.CourseDetail, {
								productId: this.listData.productId,
								lat: this.location.latitude,
								lng: this.location.longitude,
								campusId: ls.campusId
							})
						} else {
							this.$utils.model.showToast('校区暂无该商品信息！')
						}

					}

				}
			},
			getData() {
				const {
					ftbOrder,
					orderInvest
				} = this.$http['mine']
				let getApi = ftbOrder
				if (this.data.type == 'consume') {
					getApi = orderInvest
				} else {
					// 充值
				}
				console.log(this.data.type);
				getApi({
					tradeId: this.data.tradeId || null,
					orderId: this.data.orderId || null,
				}).then(res => {
					if (res.code == 200) {
						res.data['coverImage'] = this.data.coverImage
						res.data.courseDate = this.$utils.dateTime.getLocalTime(res.data.courseDate)
						this.listData = res.data
					}
				})
			},
			handleCopy(val) {
				uni.setClipboardData({
					data: val,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						});
					},
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-detail {
		padding: 32rpx;
		min-height: 100vh;
		box-sizing: border-box;
		background: #EEF1FA;

		&-status {
			position: absolute;
			right: 0;
			bottom: 0rpx;
			padding: 6rpx 22rpx;
			background: rgba(32, 128, 255, 0.1);
			border-radius: 8rpx;
			font-size: 24rpx;
			font-family: SourceHanSansSC-Medium, SourceHanSansSC;
			font-weight: 500;
			color: #2080FF;
		}

		&-top {
			width: 686rpx;
			padding: 32rpx;
			box-sizing: border-box;
			// height: 194rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
		}

		&-img {
			flex-shrink: 0;
			margin-right: 48rpx;
			width: 128rpx;
			height: 146rpx;
			border-radius: 16rpx;
		}

		&-right {
			position: relative;
			width: 450rpx;

			&-title {
				min-height: 88rpx;
				font-size: 32rpx;
				font-family: SourceHanSansSC-Bold, SourceHanSansSC;
				font-weight: bold;
				color: #141D3D;
			}
		}

		&-center {
			margin-top: 32rpx;
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			&-item {
				padding: 24rpx;
				font-size: 28rpx;
				font-family: SourceHanSansSC-Regular, SourceHanSansSC;
				font-weight: 400;
				color: #141D3D;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&:last-child {
					border-bottom: none
				}
			}

			&-copy {
				margin-right: 32rpx;
				font-size: 28rpx;
				font-family: SourceHanSansSC-Regular, SourceHanSansSC;
				font-weight: 400;
				color: #2080FF;
			}
		}
	}
</style>
