<template>
	<view class="" @click.stop>
		<uni-popup ref="popup" :isMaskClick="isMaskClick" @change="change">
			<view class="popup-content">
				<DateCalendar ref="dateCalendar" @change="change2" :dotLists="dotLists">
				</DateCalendar>
				<view class="popup-footer" v-if="isShow">
					<view class="popup-footer-button" @click="close">返回拼班</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import DateCalendar from '../DateCalendar/DateCalendar'
	export default {
		components:{DateCalendar},
		data() {
			return {
				dotLists:[],
				isShow:false,
				isMaskClick:true
			}
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			change2(e = {}) {
				console.log(e.fulldate);
			},
			close(){
				this.$refs.popup.close('bottom')
				this.$emit('close',false)
			},
			handleShow(isShow=false,ls) {
				this.dotLists = ls
				this.$refs.popup.open('bottom')
				this.isShow = isShow
				this.isMaskClick = !isShow
			},
			
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
