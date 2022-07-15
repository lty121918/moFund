<template>
	<view class="wallet-content">
		<view class="wallet-content-top">
			<text class="fwb">流水号：JG202206290002</text>
			<text class="color fw4">收入</text>
			<!-- <text class="color2 fw4">支出</text> -->
		</view>
		<view class="mt32 fz28" >
			<view>变动时间：2022-06-29 20:12:58</view>
			<view class="mt16">交易类型：用户提现</view>
			<view class="mt16" v-if="true">订单编号：SF202206270001</view>
			<view class="fz24 wallet-content-price wallet-content-priceActive">
				<text>+</text>
				<text>￥</text>
				<text class="fz32 fwb">500</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleChange() {
				console.log('111111111111');
				this.$emit('change')
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
