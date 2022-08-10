<template>
	<view class="">
		<uni-popup ref="popup" @change="change">
			<view class="popup-content">
				<view class="popup-content-info">
					<view class="popup-content-top">
						<text class="fwb">订单编号：{{data.orderNo}}</text>
						<text class="color fw4">消费订单</text>
					</view>
					<view class="popup-content-bottom">
						<view class="popup-content-left">
							<image class="popup-content-img" src="/static/notData.png" mode="aspectFit"></image>
						</view>
						<view class="">
							<view class="popup-content-cycle mt0">下单时间：{{data.operateTime ||data.orderTime}}</view>
							<view class="popup-content-cycle">订单课程：{{data.courseName}}</view>
							<view class="popup-content-cycle">订单班级：{{data.className}}</view>
							<view class="popup-content-cycle">订单学员：{{data.studentName}}</view>
							<view class="popup-content-cycle">订单金额：￥{{data.orderAmount}}</view>
						</view>
					</view>
					<view class="fz32 mt32">服务评价</view>
					<view class="mt32 flex-start">
						<view class="fz32 mr32">等级</view>
						<uni-rate :disabled="isCheck" disabledColor="#DE501F" v-model="evaluationLevel" color="#838899" active-color="#DE501F" />
					</view>
					<view class="mt32 flex-start">
						<view class="fz32 mr32 flex0">评价</view>
						<view class="popup-content-textarea">
							<uni-easyinput :disabled="isCheck" type="textarea" v-model="content" placeholder="请输入内容"></uni-easyinput>
						</view>
					</view>
				</view>
				<view class="popup-footer">
					<view class="popup-footer-button" @click="handleConfirm">{{isCheck?'关闭':'提交'}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				evaluationLevel: '',
				content: '',
				data:{},
				isCheck:false
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(data) {
				this.data = data
				this.evaluationLevel= data.evaluationLevel || ''
				this.content= data.content || ''
				this.isCheck = data.isCheck
				this.$refs.popup.open('bottom')
			},
			handleConfirm(){
				if(!this.isCheck){
					this.$http['mine'].insertServiceEvaluation({
						evaluationLevel: this.evaluationLevel,
						content: this.content,
						ordersId: this.data.orderId
					}).then(res=>{
						if(res.code==200){
							this.$refs.popup.close('bottom')
							this.$emit('change')
						}
					})
				} else {
					this.$refs.popup.close('bottom')
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.popup {
		&-content {
			width: 750rpx;
			padding: 0rpx 32rpx 0 32rpx;
			max-height: 1052rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #FFFFFF;
			// box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #141D3D;

			}

			&-bottom {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding-top: 18rpx;
				padding-bottom: 32rpx;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
			}

			&-left {
				flex-shrink: 0;
				margin-right: 30rpx;
				width: 180rpx;
				height: 204rpx;
			}

			&-textarea {
				width: 598rpx;
			}

			&-img {
				width: 180rpx;
				height: 204rpx;
			}

			&-cycle {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #838899;
			}
		}


		&-footer {
			// position: fixed;
			// bottom: 0;
			// width: 750rpx;
			padding-top: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			&-button {
				margin-bottom: 32rpx;
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
		}
	}
</style>
