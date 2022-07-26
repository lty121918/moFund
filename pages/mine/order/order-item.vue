<template>
	<view class="class-content">
		<view class="class-content-top">
			<text class="fwb">订单编号：{{item.orderNo}}</text>
			<text class="color fw4">消费订单</text>
		</view>
		<image class="class-content-eval"  @click="handleChange(item)" v-if="item.type=='consume'" src="/static/mine/evaluate.png" mode="aspectFit"></image>
		<view class="class-content-bottom" v-if="item.type=='consume'">
			<view class="class-content-left">
				<image class="class-content-img" :src="item.coverImage" mode="aspectFit"></image>
			</view>
			<view class="">
				<view class="class-content-cycle mt0">下单时间：{{item.operateTime}}</view>
				<view class="class-content-cycle">订单课程：{{item.courseName}}</view>
				<view class="class-content-cycle">订单班级：{{item.className}}</view>
				<view class="class-content-cycle">订单学员：{{item.studentName}}</view>
				<view class="class-content-cycle">订单金额：￥{{item.orderAmount}}</view>
			</view>
		</view>
		<view class="class-content-bottom" v-else>
			<view class="class-content-left2">
				<image class="class-content-img2" src="/static/mine/recharge.png" mode="aspectFit"></image>
			</view>
			<view class="">
				<view class="class-content-cycle mt0">下单时间：{{item.operateTime}}</view>
				<view class="class-content-cycle">订单金额：￥{{item.orderAmount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				default:()=>{
					return {}
				}
			}
		},
		methods: {
			handleChange() {
				this.$emit('change',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class {
		&-content {
			position: relative;
			margin: 0 32rpx 32rpx 32rpx;
			padding: 0 32rpx 32rpx 32rpx;
			// min-height: 344rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			&-eval{
				position: absolute;
				right: 32rpx;
				bottom: 32rpx;
				width: 52rpx;
				height: 52rpx;
			}
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
			}

			&-left {
				flex-shrink: 0;
				margin-right: 30rpx;
				width: 180rpx;
				height: 204rpx;
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

			// 其他模板
			&-left2 {
				flex-shrink: 0;
				margin-right: 30rpx;
				width: 88rpx;
				height: 88rpx;
				border-radius: 16rpx;
			}

			&-img2 {
				width: 88rpx;
				height: 88rpx;
			}
		}
	}
</style>
