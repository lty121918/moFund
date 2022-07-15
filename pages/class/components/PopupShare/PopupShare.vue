<template>
	<view class="">
		<uni-popup ref="popup"  @change="change">
			<view class="popup-content">
				<image class="popup-content-bg" src="/static/share/bg.png" mode="widthFix"></image>
				<view class="popup-content-pos">
					<view class="popup-content-top flex-cc fz46 fwb colorw">
						XXXXXXX课程劲爆来袭了
					</view>
					<view class="popup-content-center flex-cc">
						<image class="popup-content-img" src="/static/home/bg-item.png" mode="widthFix"></image>
					</view>
					<view class="popup-content-bottom flex-bc fz24 text-c colorw">
						<button class="is-view flex-fc flex-cc" open-type="share">
							<image class="popup-content-icon" src="/static/share/wx.png" mode=""></image>
							<text>微信好友</text>
						</button>
						<view class="flex-fc flex-cc" @click="copyUrl">
							<image class="popup-content-icon" src="/static/share/url.png" mode=""></image>
							<text>复制链接</text>
						</view>
						<view class="flex-fc flex-cc">
							<image class="popup-content-icon" src="/static/share/qr.png" mode=""></image>
							<text>二维码分享</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(isShow=false) {
				this.$refs.popup.open('center')
			},
			// 复制链接
			copyUrl() {
				uni.setClipboardData({
					data: '123',
					success: function() {
						uni.hideToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.popup {
		&-content {
			position: relative;
			width: 714rpx;
			margin: auto;
			height: 1102rpx;
			&-bg{
				width: 100%;
			}
			&-pos{
				position: absolute;
				top:0;
				left: 16rpx;
				right: 0;
				width: 684rpx;
				height: 1102rpx;
				
			}
			&-top{
				height: 182rpx;
			}
			&-center{
				height: 722rpx;
			}
			&-img{
				width: 586rpx;
				max-height: 664rpx;
			}
			&-bottom{
				padding: 32rpx 64rpx;
				box-sizing: border-box;
			}
			&-icon{
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 12rpx;
			}
		}


		
	}
	.is-view{
		background-color: transparent!important;
		box-sizing: border-box;
		cursor: pointer;
		line-height: normal!important;
		overflow: auto;
		font-size: 24rpx !important;
		color: white;
		margin:0 !important;
		padding: 0 !important;
		position: relative;
		text-align: center;
		text-decoration: none;
	}
</style>
