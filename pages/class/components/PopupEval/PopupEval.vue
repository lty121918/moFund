<template>
	<view class="">
		<uni-popup ref="popup" @change="change">
			<view class="popup-content">
				<view class="popup-content-info">
					<view class="popup-content-top">
						<image class="popup-content-img" src="/static/stu.png" mode="widthFix"></image>
						<text class="fz28">{{data.studentName}}-{{data.age}}岁</text>
						<image class="popup-content-sex" :src="data.gender==1?'/static/sex-m.png':'/static/sex-w.png'"
							mode="widthFix"></image>
					</view>
					<view class="mt32 flex-start">
						<view class="fz32 mr32 flex0">评价</view>
						<view class="popup-content-textarea">
							<uni-easyinput :disabled="isCheck" type="textarea" v-model="value" :placeholder="isCheck?'':'请输入内容'">
							</uni-easyinput>
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
				value: '',
				data: {},
				isCheck: false
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			handleShow(item) {
				this.data = item
				this.isCheck = item.isCheck
				this.value = item.evaluationContent || ''
				this.$http['classes'].getEvaluate2({
					classId:item.classId,
					courseId:item.courseId,
					studentId:item.id,
					campusId:item.campusId,
				}).then(res=>{
					if(res.code==200){
						if(res.data){
							this.$refs.popup.open('bottom')
							this.value = res.data.evaluationContent || ''
						}  else {
							this.$refs.popup.open('bottom')
						}
						
					}
				})
			},
			handleConfirm() {
				if (!this.isCheck) {
					if (!this.value) {
						this.$utils.model.showToast('请输入内容')
						return false
					}
					this.$http['classes'].studentEvaluation({
						campusId: this.data.campusId,
						classId: this.data.classId,
						coachId: this.data.coachId,
						courseId: this.data.courseId,
						evaluationContent: this.value,
						scheduleDetailId: this.data.courseScheduleDetailId,
						scheduleId: this.data.scheduleId,
						studentId: this.data.id,
					}).then(res => {
						if (res.code == 200) {
							this.$emit('change')
							this.$refs.popup.close('bottom')
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

			&-textarea {
				width: 598rpx;
			}

			&-img {
				margin-right: 16rpx;
				width: 23rpx;
				height: 15rpx;
			}

			&-sex {
				margin-left: 12rpx;
				width: 28rpx;
				height: 28rpx;
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
