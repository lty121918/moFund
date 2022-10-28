<template>
	<view class="wallet-content">
		<view class="wallet-content-top">
			<text class="fwb">流水号：{{item.tradeNo}}</text>
			<text class="color fw4" v-if="item.income">收入</text>
			<text class="color2 fw4" v-if="!item.income">支出</text>
		</view>
		<view class="mt32 fz28" >
			<view>变动时间：{{item.operateTime}}</view>
			<view class="mt16">交易类型：{{tradeTypeData[item.tradeType]}}</view>
			<view class="mt16" v-if="item.orderNo">订单编号：{{item.orderNo ||''}}</view>
			<view class="fz24 wallet-content-price " :class="[item.income?'wallet-content-priceActive':'']">
				<text>{{item.income?'+':'-'}}</text>
				<text>￥</text>
				<text class="fz32 fwb">{{item.amount}}</text>
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
		data(){
			return {
				tradeTypeData:{
					1:'充值',2:'提现',3:'课款缴费',4:'团长分佣',5:'教练分佣'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wallet {
		
		&-content {
			position: relative;
			margin: 0 32rpx 32rpx 32rpx;
			padding: 0 32rpx 32rpx 32rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			border: 2rpx solid #EEF1FA;
			&-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 84rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #EEF1FA;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #141D3D;

			}
			&-price{
				position: absolute;
				right:32rpx;
				bottom: 32rpx;
				display: inline-block;
				padding: 6rpx 12rpx;
				background: rgba(20, 29, 61, 0.05);
				border-radius: 8rpx;
				
			}
			&-priceActive{
				background: rgba(254, 140, 25, 0.05);
				color: #FE8C19;
			}
		}
	}
</style>
