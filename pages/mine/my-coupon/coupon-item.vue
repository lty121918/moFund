<template>
	<!-- 
        优惠券组件
        type:{
            0:未使用
            1:已使用
            2:已过期
            3:助力优惠券
            4: 领券中心的
        }
具名插槽 coupon-button coupon-img
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
				><view class="coupon-mid-use">满199可用</view>
				<!-- <view class="coupon-mid-date">2022.01.01-2022.05.20</view> -->
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
				<!-- 具名插槽 放左上角图像 -->
				<slot name="coupon-img"></slot>
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
		<!-- 下面详细规则 -->
		<view class="coupon-detail">
			<uni-collapse-item :showArrow="false">
				<template v-slot:title>
					<view class="flex-bc pt26 pb24">
						<view class="coupon-detail-rule flex-sc">
							<text>详细规则</text>
							<image
								class="coupon-detail-rule-icon"
								src="../../../static/left.png"
								mode="" />
						</view>
					</view>
				</template>
				<view class="coupon-detail-rule-content">
					<view>1、这里是优惠券的详细使用说明</view>
					<view
						>2、有一些优惠券使用的规则和限制，约束条3、有一些优惠券使用的规则和限制，约束条3、有一些优惠券使用的规则和限制，约束条3、有一些优惠券使用的规则和限制，约束条</view
					>
					<view>3、有一些优惠券使用的规则和限制，约束条</view>
				</view>
			</uni-collapse-item>
			<!-- 具名插槽，放详细信息旁边按钮 -->
			<slot name="coupon-button"></slot>
			<view class="coupon-detail-button" v-if="type == 0">拼班自动使用 </view>
		</view>
		<!-- 助力优惠券分享领券 -->
		<view class="coupon-share" v-if="type == 3">
			<view class="coupon-share-content">
				<view class="coupon-share-images">
					<image
						v-for="row in item.weChatUserList"
						:key="row.studentId"
						class="coupon-share-images-icon"
						:src="row.avatar"
						mode="aspectFill"></image>
					<image
						class="coupon-share-images-icon"
						src="/static/mine/add-icon.png"
						mode="aspectFill"></image>
				</view>
				<text class="coupon-share-text">被分享的好友将获得该优惠券</text>
			</view>
			<view class="coupon-share-button">分享领券</view>
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
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	margin: 16px 0;
	padding: 0;
	border-radius: 15rpx;
	background: #ffffff;
}
// 虚线上半部分主体样式
.coupon-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10rpx;
	margin-right: auto;
	justify-content: flex-start;
	.coupon-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		&-money {
			margin-top: 28rpx;
			font-size: 60rpx;
			font-weight: 600;
			line-height: 84rpx;
		}
		&-title {
			height: 34rpx;
			font-size: 24rpx;
			color: #838899;
			line-height: 34rpx;
			margin-bottom: 24rpx;
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
		position: absolute;
		width: 180rpx;
		height: 160rpx;
		right: 0;
		top: 0;
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
	box-shadow: 0px 2px 8px 0px rgba(119, 57, 0, 0.1);
	position: relative;
	border-radius: 15rpx;
	width: 690rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	&-rule {
		font-size: 24rpx;
		margin: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #838899;
		&-content {
			padding: 0rpx 24rpx 20rpx 24rpx;
			color: #8b8b8b;
			line-height: 34rpx;
		}
		&-icon {
			margin-left: 12rpx;
			width: 24rpx;
			height: 24rpx;
			transform: rotate(90deg);
		}
	}
	&-button {
		position: absolute;
		margin-top: 15rpx;
		top: 0;
		right: 0;
		line-height: 44rpx;
		height: 44rpx;
		color: #333333;
		border-radius: 22rpx;
		padding: 4rpx 20rpx;
		margin-right: 36rpx;
		border: 2rpx solid #333333;
	}
}
//分享领券部分样式
.coupon-share {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	&-content {
		display: flex;
		flex-direction: column;
		margin-left: 24rpx;
	}
	&-images {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-left: 12rpx;
		margin-top: 22rpx;
		&-icon {
			width: 50rpx;
			height: 50rpx;
			margin-left: -20rpx;
			border-radius: 50%;
			border: 2px solid #ffffff;
		}
	}

	&-text {
		color: #8b8b8b;
		font-size: 22rpx;
	}
	&-button {
		height: 44rpx;
		margin: 42rpx 30rpx 44rpx auto;
		padding: 4rpx 18rpx 6rpx;
		background: #de501f;
		border-radius: 22px;
		color: #ffffff;
	}
}
</style>
