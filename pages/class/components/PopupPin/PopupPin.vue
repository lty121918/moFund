<template>
	<view class="">
		<uni-popup ref="popup" :isMaskClick="isMaskClick" @change="change">
			<view class="popup-content">
				<!-- 当前商品信息 -->
				<view class="popup-nearby-content popup-content2">
					<image class="popup-nearby-content-img" :sssrc="data.coverImage" mode="aspectFit"></image>
					<view>
						<view class="">
							<text class="color fz24">￥</text>
							<text class="color fz32">50.0</text>
							<text class="fz24">/节</text>
							<text class="popup-content-jie">10节课</text>
						</view>
						<!-- 上课周期 -->
						<view class="popup-nearby-content-cycle">
							<image class="popup-nearby-content-cycle-img" src="/static/class/cycle.png" mode="widthFix">
							</image>
							<text>周期: 2022-07-01~ 2022-07-01</text>
						</view>
						<!-- 上课时段 -->
						<view class="popup-nearby-content-cycle">
							<image class="popup-nearby-content-cycle-img" src="/static/class/time.png" mode="widthFix">
							</image>
							<text>时段:9:00~10:30</text>
						</view>
					</view>
					<view class="popup-nearby-content-check" @click="check">
						查看周期
					</view>
				</view>

				<view class="popup-content-specs">
					<!-- 周期 -->
					<view class="fwb fz28 mt32">课程周期</view>
					<view class="popup-content-cycle fz24">
						<view class="mt32 mr26 popup-content-cycle-item" v-for="(item,index) in 10" :key="index">
							暑假第{{item}}期
						</view>
					</view>
					<!-- 上课时段 -->
					<view class="fwb fz28 mt32">上课时段</view>
					<view class="popup-content-cycle fz24">
						<view class="mt32 mr26 popup-content-cycle-item" v-for="(item,index) in 10" :key="index">
							1{{item}}:00
						</view>
					</view>
					<!-- 拼班方式 -->
					<view class="fwb fz28 mt32">拼班方式</view>
					<view class="popup-content-cycle fz24">
						<view class="mt32 mr26 popup-content-cycle-item" v-for="(item,index) in 2" :key="index">
							{{item}}人班
						</view>
					</view>
				</view>

				<view class="popup-footer">
					<view class="popup-footer-button" @click="submit">
						我要拼班
					</view>
					<view class="popup-footer-button popup-footer-button2">
						没有库存试试加入拼班？
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
				isMaskClick: true,
				data: {}
			}
		},
		methods: {
			// 查看周期
			check() {
				uni.showToast({
					title: "查看周期"
				})
				this.$emit('check')
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(val) {
				this.$refs.popup.open('bottom')
				this.$http['classes'].getSpellClass(val).then(res => {
					if (res.code == 200) {
						res.data.coverImage = this.$url + res.data.coverImage
						this.data = res.data
					}
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	.popup {

		// 附近拼班
		&-nearby {
			margin-top: 82rpx;
			z-index: 9;
			margin-left: 32rpx;
			padding: 0 32rpx;
			width: 686rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;

			&-content {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0;
				// width: 686rpx;
				min-height: 180rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 16rpx;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-img {
					flex-shrink: 0;
					margin-right: 22rpx;
					width: 140rpx;
					height: 132rpx;
					border-radius: 12rpx;
				}



				&-cycle {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #838899;

					&-img {
						margin-right: 10rpx;
						width: 24rpx;
						height: 24rpx;
					}
				}

				&-check {
					margin-left: 26rpx;
					width: 120rpx;
					height: 48rpx;
					background: #DE501F;
					border-radius: 8rpx;
					font-size: 24rpx;
					font-family: SourceHanSansSC-Regular, SourceHanSansSC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 48rpx;
					text-align: center;
				}




			}
		}

		&-content {
			width: 750rpx;
			padding: 36rpx 32rpx 0 32rpx;
			max-height: 1052rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #FFFFFF;
			// box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-specs {
				height: 570rpx;
				overflow-y: scroll;
			}

			&-jie {
				margin-left: 20rpx;
				padding: 2rpx 8rpx;
				background: rgba(20, 29, 61, 0.1);
				border-radius: 8rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #838899;
			}

			&-cycle {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: wrap;

				&-item {
					padding: 8rpx 12rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					color: #838899;
					border: 2rpx solid #E7E8EB;
				}

				&-active {
					background: #DE501F;
					color: #FFFFFF;
				}
			}

		}

		&-content2 {
			border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
		}

		&-footer2 {
			height: 250rpx;
		}

		&-footer {
			// position: fixed;
			// bottom: 0;
			// width: 750rpx;
			padding-top: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			&-button {
				width: 690rpx;
				height: 92rpx;
				background: #DE501F;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 92rpx;
			}

			&-button2 {
				color: #DE501F;
				background: #FFFFFF;
			}
		}
	}
</style>
