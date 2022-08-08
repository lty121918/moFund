<template>
	<view class="">
		<uni-popup ref="popup" @change="change">
			<view class="popup-content">

				<image class="popup-content-bg" src="/static/share/bg.png" mode="widthFix"></image>
				<view class="popup-content-pos">
					<view class="popup-content-top flex-cc fz46 fwb colorw">
						{{title}}
					</view>
					<view class="popup-content-center flex-cc">
						<image class="popup-content-img" :src="coverImage" mode="widthFix"></image>
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
						<view class="flex-fc flex-cc" @click="copyQrcode">
							<image class="popup-content-icon" src="/static/share/qr.png" mode=""></image>
							<text>二维码分享</text>
						</view>
					</view>
				</view>
			</view>
			<uni-popup ref="popup2" @change="change">
				<view class="popup2-content">
					<canvas v-show="!imageUrl" canvas-id="qrcode" style="width: 500rpx;height:500rpx;margin: 0 auto;" />
					<image v-show="imageUrl" :src="imageUrl" show-menu-by-longpress mode="widthFix"
						style="width: 500rpx;height:500rpx;margin: 0 auto;"></image>
				</view>
			</uni-popup>
		</uni-popup>
	</view>
</template>

<script>
	import uQRCode from '../PopupShare/uqrcode.js'
	export default {
		data() {
			return {
				data: '', //https://wxaurl.cn/BQZRrcFCPvg
				imageUrl: '',
				title: '',
				coverImage: ''
			}
		},
		components: {},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(val) {
				this.title = val.title
				this.coverImage = val.coverImage
				this.imageUrl = ''
				this.$http['classes'].shareGenerateUrlLink(val).then(res => {
					if (res.code == 200) {
						this.data = res.data
						this.$refs.popup.open('center')
					}
				})


			},
			// 复制链接
			copyUrl() {
				const self = this
				console.log('11');
				uni.setClipboardData({
					data: self.data,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						});
						this.$refs.popup.close('center')
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
			copyQrcode() {

				const self = this
				self.$refs.popup2.open('center')
				if (this.imageUrl) {
					return false
				}
				self.$nextTick(() => {
					uQRCode.make({
						canvasId: 'qrcode',
						componentInstance: self,
						text: self.data,
						size: 250,
						margin: 0,
						backgroundColor: '#ffffff',
						foregroundColor: '#000000',
						fileType: 'jpg',
						errorCorrectLevel: uQRCode.errorCorrectLevel.H,
						success: res => {
							console.log(res);
							self.imageUrl = res
						}
					})
				})
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

			&-bg {
				width: 100%;
			}

			&-pos {
				position: absolute;
				top: 0;
				left: 16rpx;
				right: 0;
				width: 684rpx;
				height: 1102rpx;

			}

			&-top {
				height: 182rpx;
			}

			&-center {
				height: 722rpx;
			}

			&-img {
				width: 586rpx;
				max-height: 664rpx;
				border-radius: 12rpx;
			}

			&-bottom {
				padding: 32rpx 64rpx;
				box-sizing: border-box;
			}

			&-icon {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 12rpx;
			}
		}



	}

	.is-view {
		background-color: transparent !important;
		box-sizing: border-box;
		cursor: pointer;
		line-height: normal !important;
		overflow: auto;
		font-size: 24rpx !important;
		color: white;
		margin: 0 !important;
		padding: 0 !important;
		position: relative;
		text-align: center;
		text-decoration: none;
	}

	.popup2-content {
		width: 686rpx;
		height: 686rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		border-radius: 12rpx;
	}
</style>
