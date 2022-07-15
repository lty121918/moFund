<template>
	<view class="withdrawal recharge">
		<uni-popup ref="popup" @change="change">
			<view class="popup-content">
				<view class="popup-content-info">
					<view class="popup-content-info-sex" :class="[value=='男'?'popup-content-info-active':'']" @click="handleChange('男')">男</view>
					<view class="popup-content-info-sex" :class="[value=='女'?'popup-content-info-active':'']" @click="handleChange('女')">女</view>

				</view>
				<view class="popup-footer flex-cc">
					<view class="popup-footer-button" @click="close">取消</view>
					<view class="popup-footer-button colorw ml32 bg-color" @click="submit">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "sex",
		data() {
			return {
				value: ''
			};
		},
		methods: {
			handleChange(val){
				this.value = val
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(val) {
				this.$refs.popup.open('bottom')
				this.value = val || '男'
			},
			close() {
				this.$refs.popup.close('bottom')
			},
			submit(){
				this.close()
				this.$emit('confirm',this.value)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.popup {
		&-content {
			width: 750rpx;
			padding: 32rpx;
			max-height: 1052rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #FFFFFF;
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-info {
				box-sizing: border-box;
				&-sex{
					width: 100%;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
				}
				&-active{
					background-color: #DE501F;
					color: #FFFFFF
				}
			}


		}


		&-footer {
			padding-top: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			&-button {
				width: 328rpx;
				height: 92rpx;
				border: 2rpx solid #CED0D7;
				background: #FFFFFF;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #141D3D;
				text-align: center;
				line-height: 92rpx;
			}
		}
	}
</style>
