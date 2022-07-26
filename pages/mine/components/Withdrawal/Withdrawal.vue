<template>
	<view class="withdrawal recharge">
		<uni-popup ref="popup" @change="change">
			<view class="popup-content">
				<view class="popup-content-info">
					<view class="flex-sc">
						<image class="popup-content-info-img" src="/static/recharge/icon.png" mode="widthFix"></image>
						<text class="color">*</text>
						<text class="fz32">提现金额</text>
					</view>
					<view class="flex-sc mt42">
						<text class="fz28 mr12">￥</text>
						<view class="popup-content-input">
							<uni-easyinput :inputBorder="false" v-model="amount"
								@blur="changeInput2" @input="changeInput" placeholder="请输入" />
						</view>
						<text class="fz28 ml12">元</text>
					</view>
				</view>
				<view class="popup-footer flex-cc">
					<view class="popup-footer-button" @click="close">取消</view>
					<view class="popup-footer-button colorw ml32 bg-color" @click="handleConfirm">提现</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "withdrawal",
		data() {
			return {
				amount: '',
				remainingSum: null
			};
		},
		methods: {
			changeInput(e) {
				let value = e + ''
				if (value != 0 && value != '0.' ) {
					value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
					value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
					value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数 
					setTimeout(() => {
						this.amount = value
					})
			
				}
			},
			changeInput2(e) {
				console.log();
				this.amount = Number(this.amount)
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(remainingSum) {
				this.remainingSum = remainingSum
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close('bottom')
			},
			handleConfirm(){
				if(this.remainingSum || this.remainingSum==0 ) {
					if(this.amount>this.remainingSum){
						this.$utils.model.showToast('已超出当前可提现金额')
						return false
					}
				}
				this.$http['mine'].setCashOut( this.amount).then(res=>{
					if(res.code==200){
						this.close()
						this.$emit('change')
					}
				})
				
			}
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
				padding: 32rpx;
				width: 690rpx;
				height: 228rpx;
				box-sizing: border-box;
				background-image: url(~@/static/recharge/bg.png);

				&-img {
					margin-right: 18rpx;
					height: 32rpx;
					width: 32rpx;
					transform: rotateY(180deg);
				}
			}

			&-input {
				border-bottom: 2rpx solid #CED0D7;
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
