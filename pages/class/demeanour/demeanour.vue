<template>
	<view class="demeanour">
		<custom-waterfalls-flow :value="list"></custom-waterfalls-flow>
		<view class="demeanour-footer2" v-if="isTeach==1" :style="{ marginBottom: `${safeAreaHeight}px` }"></view>
		<view class="demeanour-footer" v-if="isTeach==1">
			<view class="demeanour-footer-button" :style="{ marginBottom: `${safeAreaHeight}px` }" @click="submit">
				上传素材
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/mixin.js'
	import uploadImage from '@/utils/ossutil/uploadFile.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				list: [{
						image: 'https://via.placeholder.com/200x500.png/ff0000',
					},
					{
						image: 'https://via.placeholder.com/200x200.png/2878ff',
					},
					{
						image: 'https://via.placeholder.com/200x200.png/2878ff',
					},
					{
						image: 'https://via.placeholder.com/200x200.png/2878ff',
					},
					{
						image: 'https://via.placeholder.com/200x200.png/2878ff',
					},
					{
						image: 'https://via.placeholder.com/200x200.png/2878ff',
					}
				]
			}
		},
		methods: {
			submit() {
				uni.chooseImage({
					count: 1, // 默认最多一次选择9张图
					sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: res => {
				 	// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;

						//支持多图上传
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							//显示消息提示框
							uni.showLoading({
								mask: true
							})

							//上传图片
							//图片路径可自行修改
							uploadImage(res.tempFilePaths[i], 'images/',
								result => {
									uni.hideLoading();
								}
							)
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.demeanour {
		min-height: 100vh;
		background: #EEF1FA;
		padding: 32rpx;
		box-sizing: border-box;

		&-footer2 {
			height: 92rpx;
			padding: 32rpx 30rpx;
		}

		&-footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			padding: 32rpx 30rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

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
		}
	}
</style>
