<template>
	<!-- 
        优惠券组件
        type:{
            0:未使用
            1:已使用
            2:已过期
            3:助力优惠券
        }

     -->
	<view class="coupon">
		<view class="coupon-info">
			<view class="coupon-left">
				<view
					class="coupon-left-money"
					:class="type == 0 || type == 3 ? 'color' : 'color2'"
					>¥ 50<text class="fz32">元</text></view
				>
				<view class="coupon-left-title">课程使用</view>
			</view>
			<view class="coupon-mid">
				<view class="coupon-mid-title">暑假大放送</view
				><view class="coupon-mid-use">满199可用</view
				><view class="coupon-mid-date">2022.01.01-2022.05.20</view>
			</view>
			<view class="coupon-right">
				<img
					v-if="type == 1"
					src="/static/mine/used-logo.png"
					alt=""
					class="coupon-right-overdue" />
				<img
					v-if="type == 2"
					src="/static/mine/overdue-logo.png"
					alt=""
					class="coupon-right-overdue" />
				<img
					src="/static/mine/coupon-blue.png"
					alt=""
					class="coupon-right-background" />
			</view>
		</view>
		<view class="coupon-line">
			<view class="coupon-circle coupon-circle-left"></view>
			<view class="coupon-circle coupon-circle-right"></view>
		</view>

		<view class="coupon-detail">
			<view class="coupon-detail-rules">详细规则 </view>
			<view class="coupon-detail-button" v-if="type == 0">拼班自动使用 </view>
		</view>
	</view>
</template>

<script>
export default {
	created() {},
	props: {
		type: {
			type: String | Number,
			default: 0,
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.coupon {
	width: 690rpx;
	height: 258rpx;
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	margin: 16px 0;
	padding: 0;
	border-radius: 15rpx;
	background: #ffffff;
	box-shadow: 0px 2px 8px 0px rgba(119, 57, 0, 0.1);
}
// 虚线上半部分样式
.coupon-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 690rpx;
	margin-bottom: 10rpx;
	justify-content: space-around;
	.coupon-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 26rpx;
		&-money {
			margin-top: 28rpx;
			font-size: 60rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			line-height: 84rpx;
		}
		&-title {
			width: 96rpx;
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #838899;
			line-height: 34rpx;
		}
	}
	.coupon-mid {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-family: SourceHanSansSC-Normal, SourceHanSansSC;
		margin-left: 50rpx;
		&-title {
			font-size: 36rpx;
			font-weight: 500;
			color: #141d3d;
			margin-top: 28rpx;
		}
		&-use {
			width: 180rpx;
			height: 44rpx;
			margin: 2px 0;
			background: #eef1fa;
			border-radius: 8rpx;
			opacity: 0.5;
			font-size: 24rpx;
			line-height: 44rpx;
			text-align: center;
		}
		&-date {
			font-size: 24rpx;
			color: #838899;
		}
	}
	.coupon-right {
		position: relative;
		width: 180rpx;
		height: 160rpx;
		margin-left: auto;
		&-overdue {
			position: absolute;
			top: 13rpx;
			left: -35rpx;
			width: 200rpx;
			height: 150rpx;
		}
		&-background {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}
}
// 虚线
.coupon-line {
	position: relative;
	width: 652rpx;
	border-bottom: 4rpx #eaeaea dashed;
}
.coupon-circle {
	width: 30rpx;
	height: 30rpx;
	position: absolute;
	border-radius: 50%;
	background: #eef1fa;
	&-left {
		top: -6px;
		left: -18px;
	}
	&-right {
		top: -6px;
		right: -18px;
	}
}
//虚线下半部分样式
.coupon-detail {
	height: 84rpx;
	width: 690rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	&-rules {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #8b8b8b;
		line-height: 84rpx;
		margin-left: 24rpx;
	}
	&-button {
		width: 184rpx;
		height: 44rpx;
		color: #333333;
		border-radius: 22rpx;
		padding: 4rpx 20rpx;
		margin-right: 36rpx;
		border: 2rpx solid #333333;
	}
}
</style>
