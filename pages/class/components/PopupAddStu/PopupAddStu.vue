<template>
	<view class="">
		<uni-popup ref="popup" @change="change">
			<view class="popup-content">
				<!-- 当前商品信息 -->

				<view class="popup-content-item">
					<view class="popup-content-child" v-for="(item,index) in 10" @click="changeBox(item)">
						<view v-if="boxActive.indexOf(index)==-1" class="popup-content-child-check"></view>
						<image v-else class="popup-content-child-check" src="/static/checkbox.png" mode="widthFix">
						</image>
						<view class="">
							<view class="flex-start">
								<text>姓名：张真真 - 5岁</text>
								<image class="popup-content-child-sex" src="/static/sex-m.png" mode="widthFix"></image>
							</view>
							<view class="mt12">证件号码：350522201704122</view>
							<view class="mt12">出生日期：2017-04-12</view>
						</view>
					</view>
				</view>

				<view class="popup-footer">
					<view class="popup-footer-button popup-footer-button1" @click="close">
						取消
					</view>
					<view class="popup-footer-button popup-footer-button1" @click="handelAdd">
						添加学员
					</view>
					<view class="popup-footer-button" @click="submit">
						确认
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
				boxActive: []
			}
		},
		methods: {
			// 选择学员
			changeBox(val) {
				let index = this.boxActive.indexOf(val)
				console.log(val, index);
				if (index > -1) {
					this.boxActive.splice(index, 1)
				} else {
					this.boxActive.push(val)
				}
				console.log(this.boxActive);
			},
			// 曲去添加新学员
			handelAdd(){
				this.$utils.router.navTo(this.$page.AddStudent)
			},
			// 确认添加学员
			submit(){
				this.$utils.model.showToast('参与拼班将冻结课款，拼班成功后自动扣课款。')
				this.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			close() {
				this.$refs.popup.close('bottom')
			},
			handleShow() {
				this.$refs.popup.open('bottom')
			},

		}
	}
</script>

<style scoped lang="scss">
	.popup {
		&-content {
			width: 750rpx;
			padding: 36rpx 32rpx 0 32rpx;
			max-height: 1052rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			// box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-item {
				height: 588rpx;
				background: #FFFFFF;
				overflow-y: scroll;
			}

			&-child {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 32rpx;
				padding: 22rpx 32rpx;
				box-sizing: border-box;
				width: 686rpx;
				height: 176rpx;
				background: rgba(20, 29, 61, 0.05);
				border-radius: 16rpx;
				font-size: 24rpx;
				font-family: SourceHanSansSC-Regular, SourceHanSansSC;
				font-weight: 400;
				color: #141D3D;

				&-check {
					margin-right: 52rpx;
					flex-shrink: 0;
					width: 36rpx;
					height: 36rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					border: 2rpx solid #E7E8EB;
				}

				&-sex {
					margin-left: 20rpx;
					width: 28rpx;
					height: 28rpx;
				}
			}
		}



		&-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx 0;
			box-sizing: border-box;
			background: #FFFFFF;

			&-button {

				width: 220rpx;
				height: 92rpx;
				background: #DE501F;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 92rpx;
				border: 2rpx solid #DE501F;
			}

			&-button1 {
				color: #DE501F;
				background: #FFFFFF;
			}
		}

	}
</style>
