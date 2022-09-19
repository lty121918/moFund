<template>
	<view class="class-content" @click="handleNextTo(item)">
		<view class="class-content-top">
			<text class="fwb">订单编号：{{item.tradeNo || item.orderNo}}</text>
			<view class="flex-ec" >
				<text class="color fw4">{{item.type=='consume'?'消费订单':'充值订单'}}</text>
				<image class="class-content-icon" src="/static/left.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- <image class="class-content-eval"  @click="handleChange(item)" v-if="item.type=='consume'" src="/static/mine/evaluate.png" mode="aspectFill"></image> -->
		<view class="class-content-bottom" v-if="item.type=='consume'">
			<view class="class-content-left">
				<image class="class-content-img" :src="item.coverImage" mode="aspectFill"></image>
			</view>
			<view class="">
				<view class="class-content-cycle mt0">下单时间：{{item.operateTime || item.orderTime}}</view>
				<view class="class-content-cycle">订单课程：{{item.courseName}}</view>
				<view class="class-content-cycle">订单班级：{{item.className}}</view>
				<view class="class-content-cycle">订单学员：{{item.studentName}}</view>
				<view class="class-content-cycle">订单金额：￥{{item.orderAmount}}</view>
			</view>
		</view>
		<view class="flex-bc class-content-flex" v-if="item.type=='consume'">
			<view class="class-content-stutas">{{orderStatus[item.orderStatus] || ''}}</view>
			<view class="class-content-eval" v-if="item.orderStatus=='2' && !item.isEvaluation" @click.stop="handleChange(item)">评价</view>
		</view>
		<view class="class-content-bottom" v-if="item.type!='consume'">
			<view class="class-content-left2">
				<image class="class-content-img2" src="/static/mine/recharge.png" mode="aspectFill"></image>
			</view>
			<view class="">
				<view class="class-content-cycle mt0">下单时间：{{item.operateTime}}</view>
				<view class="class-content-cycle">订单金额：￥{{item.amount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				default: () => {
					return {}
				}
			}
		},
		data(){
			return {
				orderStatus:{
					1:'待付款', 2:'已付款', 3:'退款中',4:"已退款",5:'已取消'
				}
			}
		},
		methods: {
			handleChange(item) {
				this.$emit('change', item)
			},
			handleNextTo(item){
				this.$utils.router.navTo(this.$page.OrderDetail,item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class {
		&-content {
			position: relative;
			margin: 0 32rpx 32rpx 32rpx;
			padding: 0 32rpx 8rpx 32rpx;
			// min-height: 344rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			&-stutas{
				font-size: 28rpx;
				font-family: SourceHanSansSC-Medium, SourceHanSansSC;
				font-weight: 500;
				color: #DE501F;
			}
			&-flex{
				padding: 24rpx 0;
			}
			&-icon {
				margin-left: 12rpx;
				width: 22rpx;
				height: 28rpx;
			}

			&-eval {
				// position: absolute;
				// right: 32rpx;
				// bottom: 32rpx;
				// width: 52rpx;
				// height: 52rpx;
				width: 124rpx;
				height: 56rpx;
				background: #DE501F;
				border-radius: 16rpx;
				font-size: 30rpx;
				font-family: SourceHanSansSC-Medium, SourceHanSansSC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 56rpx;
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
				border-radius: 16rpx;
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
