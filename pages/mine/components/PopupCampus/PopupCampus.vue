<template>
	<view class="withdrawal recharge">
		<uni-popup ref="popup" @change="change">
			<view class="popup-content">
				<view class="popup-content-info">
					<view class="popup-content-info-sex" v-for="item in markers" :key="item.campusId"
						:class="[value.indexOf(item.campusId)>-1?'popup-content-info-active':'']"
						@click="handleChange(item)">{{item.campusName}}</view>

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
				value: '',
				markers: []
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			/**
			 * @function 获取当前的所有校区
			 */
			getData() {
				const self = this
				this.$http['map'].getCampus().then(res => {
					if (res.code == 200) {
						self.markers = res.data
					}
				})
			},
			handleChange(val) {
				const index = this.value.indexOf(val.campusId)
				if (index == -1) {
					this.value.push(val.campusId)
				} else {
					this.value.splice(index, 1)
				}
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(val=[]) {
				this.$refs.popup.open('bottom')
				this.value =val||[]
				console.log(this.value);
			},
			close() {
				this.$refs.popup.close('bottom')
			},
			submit() {
				this.close()
				const data = this.markers.filter(item=>this.value.indexOf(item.campusId)>-1).map(item=>item.campusName)
				this.$emit('confirm', {value:this.value,data})
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

				&-sex {
					width: 100%;
					height: 88rpx;
					margin-bottom: 20rpx;
					border-radius: 36rpx;
					line-height: 88rpx;
					text-align: center;
					border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
				}

				&-active {
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
