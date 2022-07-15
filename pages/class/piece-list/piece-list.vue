<template>
	<view class="piece">
		<view class="piece-head-address" @click="$utils.router.navTo($page.Search)">
			<image class="piece-head-address-img" src="/static/home/location2.png" mode="aspectFit"></image>
			<text> 福田区</text>
			<image class="piece-head-address-icon" src="/static/down2.png" mode="aspectFit"></image>
		</view>
		<y-list ref="yList" :scrollClass="'scroll-class2'" :setData="search">
			<template slot-scope="{data}">
				<view class="piece-content" v-for="item in 30" :key="item"
					@click="$utils.router.navTo($page.OrderInfo)">
					<image class="piece-content-img" src="/static/notData.png" mode="aspectFit"></image>
					<view class="piece-content-center">
						<view>Do.Ting.le</view>
						<view class="piece-content-class">
							<view class="piece-content-name">启蒙班</view>
							<view class="piece-content-url">
								<image v-for="item in 5" :key="item" class="piece-content-icon"
									src="/static/home/default-url.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<view class="piece-content-button">加入拼班</view>
				</view>
			</template>
		</y-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			this.$refs.yList.init()
		},
		methods: {
			search() {
				return new Promise(async (resolve, reject) => {
					let data = []
					for (let i = 0; i < 100; i++) {
						data.push({})
					}
					resolve({
						data,
						totalRows: 10
					})
				})
			}
		}
	}
</script>
<style lang="scss">
	.scroll-class2 {
		height: calc(100vh - 105rpx);
	}
</style>
<style scoped lang="scss">
	.piece {
		min-height: 100vh;
		padding: 0 32rpx;
		background: #EEF1FA;
		position: relative;
		z-index: 9;

		&-head {
			&-address {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #141D3D;

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



		&-content {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom:32rpx;
			padding: 24rpx;
			width: 686rpx;
			min-height: 180rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;

			&-img {
				flex-shrink: 0;
				margin-right: 26rpx;
				width: 140rpx;
				height: 132rpx;
				border-radius: 12rpx;
			}

			&-center {
				flex-shrink: 0;
				width: 320rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: #141D3D;
			}

			&-class {
				display: flex;
				justify-content: flex-start;
				margin-top: 18rpx;
				height: 60rpx;
				width: 320rpx;
				background: rgba(20, 29, 61, 0.05);
				border-radius: 12rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(20, 29, 61, 0.5);
			}

			&-name {
				width: 140rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: rgba(20, 29, 61, 0.1);
				border-radius: 12rpx;
			}

			&-url {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-left: 32rpx;
			}

			&-icon {
				margin-left: -20rpx;
				width: 44rpx;
				height: 44rpx;
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
		}
	}
</style>
