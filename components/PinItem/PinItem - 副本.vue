<template>
	<view class="pin">
		<view class="pin-content" @click="$utils.router.navTo($page.OrderInfo,{classId:item.classInfoId})">
			<image class="pin-content-img" :src="item.headUrl" mode="aspectFill"></image>
			<view class="pin-content-center">
				<view>{{item.nickName || '微信昵称'}}</view>
				<view class="pin-content-class">
					<view class="pin-content-name">{{item.productName}} <text class="ml12"> {{item.spellType}}</text>
					</view>
					<view class="pin-content-url">
						<image v-for="row in item.weChatUserList" :key="row.studentId" class="pin-content-icon"
							:src="row.avatar" mode="aspectFill"></image>
						<image class="pin-content-icon" src="/static/home/default-url.png" mode="aspectFill">
						</image>
					</view>
				</view>
			</view>
			<view class="pin-content-button">加入拼班</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "pin-item",
		props: {
			item: {}
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="scss">
	.pin {
		&-content {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 32rpx;
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
				height: 140rpx;
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
				// height: 60rpx;
				width: 320rpx;
				background: rgba(20, 29, 61, 0.05);
				border-radius: 12rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(20, 29, 61, 0.5);
			}

			&-name {
				width: 140rpx;
				// height: 60rpx;
				// line-height: 60rpx;
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
				border-radius: 50%
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
