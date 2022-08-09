<template>
	<view class="order-detail">
		<view class="order-detail-top" v-if="data.type == 'consume'">
			<van-image use-error-slot class="order-detail-img" radius="10" width="128" height="144"
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
			</view>
		</view>
		<view class="order-detail-center">
			<view class="order-detail-center-item flex-bc">
				<view class="">
					<text>订单编号:</text>
					<text class="ml12">{{listData.orderNo || listData.tradeNo}}</text>
				</view>
				<view class="order-detail-center-copy" @click="handleCopy(listData.orderNo || listData.tradeNo)">复制</view>
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
	export default {
		components: {
			vanImage
		},
		data() {
			return {
				data: {},
				listData: {}
			}
		},
		onLoad(e) {
			console.log(e);
			this.data = e
			this.getData()
		},
		methods: {
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
			&-copy{
				margin-right: 32rpx;
				font-size: 28rpx;
				font-family: SourceHanSansSC-Regular, SourceHanSansSC;
				font-weight: 400;
				color: #2080FF;
			}
		}
	}
</style>
