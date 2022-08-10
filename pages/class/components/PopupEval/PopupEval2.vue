<template>
	<view class="">
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content">
				<view class="popup-content-info">
					<view class="popup-content-top">
						<view class="flex-sc">
							<image class="popup-content-img" src="/static/time.png" mode="widthFix"></image>
							<text class="fz28">{{data.evaluationTime}}</text>
						</view>
						<view class="flex-sc ml32">
							<image class="popup-content-img" src="/static/eval.png" mode="widthFix"></image>
							<text class="fz28">{{data.coachName}}</text>
						</view>
					</view>
					<uni-easyinput disabled type="textarea" v-model="data.evaluationContent" placeholder=""></uni-easyinput>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{}
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(data) {
				this.$http['classes'].getEvaluate({
					classId:data.classId,
					courseId:data.courseId,
					studentId:data.id,
					campusId:data.campusId,
				}).then(res=>{
					if(res.code==200){
						if(res.data){
							this.$refs.popup.open('bottom')
							res.data.evaluationTime = this.$utils.dateTime.getLocalTime(res.data.evaluationTime,'yyyy-MM-dd hh:mm')
							this.data = res.data
						} else {
							this.$utils.model.showToast('暂无评价')
						}
						
					}
				})
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.popup {
		&-content {
			width: 750rpx;
			padding: 0rpx 32rpx 32rpx 32rpx;
			max-height: 1052rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #FFFFFF;
			// box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-top {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 100rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #141D3D;

			}
			&-img{
				margin-right: 16rpx;
				width: 23rpx;
				height: 15rpx;
			}
			&-sex{
				margin-left: 12rpx;
				width: 28rpx;
				height: 28rpx;
			}
		}
	}
</style>
