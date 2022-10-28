<template>
	<view class="demeanour">
		<custom-waterfalls-flow @imageClick="imageClick" :value="list"></custom-waterfalls-flow>
		<view class="demeanour-footer2" v-if="isTeach==1" :style="{ marginBottom: `${safeAreaHeight}px` }"></view>
		<view class="demeanour-footer" v-if="isTeach==1">
			<view class="demeanour-footer-button" :style="{ marginBottom: `${safeAreaHeight}px` }" @click="submit">
				上传素材
			</view>
		</view>
		<view class="default-empty" v-if="list.length===0">
			<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
			</image>
			<view class="">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				classId: '',
				scheduleDetailId: '',
				list: [
					// {
					// 	image: 'https://via.placeholder.com/200x200.png/2878ff',
					// }
				]
			}
		},
		onLoad(e) {
			this.classId = e.classId
			this.scheduleDetailId = e.scheduleDetailId
			this.getTeach()
			this.getClassMien()
		},
		methods: {
			Ginit(){
				uni.hideShareMenu()
			},
			getClassMien() {
				const {
					getClassStuMien,
					getClassMien
				} = this.$http['classes']
				let getData = getClassMien
				if (this.isTeach == 1) {
					getData = getClassStuMien
				}
				getData({
					classId: this.classId
				}).then(res => {
					if (res.code == 200) {
						res.data.forEach(item => {
							item.image = this.$url + item.imgUrl
						})
						this.list = res.data || []
					}
				})
			},
			submit() {
				//选择视频
				const self = this
				uni.chooseImage({
					count: 1, //默认100
					success: function(res) {
						//可以判断有没有超过最大限制
						// let  fileSize = res.size;
						//获取文件选择之后的临时路径
						let tempFilePath = res.tempFilePaths[0];
						// uni.showLoading({
						// 	title: "上传中...",
						// });
						if (res.size > 10 * 1024 * 1024) {
							self.$utils.showToast('上传图片不超过10M')
							return false
						}
						// if(res.tempFilePath.indexOf('mp4')==-1){
						// 	self.$utils.showToast('仅支持上传MP4格式视频')
						// 	return false
						// }

						console.log(res);
						// 上传视频
						let baseUrl = self.$config.BASE_URL
						if (process.env.NODE_ENV === 'development') {
							baseUrl = self.$config.BASE_URL_DEV
						}
						uni.uploadFile({
							name: "file", //文件上传的name值
							url: baseUrl + '/file/upload', //接口地址
							header: {
								"Content-Type": "multipart/form-data"
							}, //头信息
							formData: {

							}, //上传额外携带的参数
							filePath: tempFilePath, //临时路径
							fileType: "video", //文件类型
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								const data = JSON.parse(uploadFileRes.data)
								let url = ''
								for (let item in data) {
									url = data[item]
								}
								self.$http['classes'].ClassStudentUploadMien({
									imgUrl: url,
									classInfoId: self.classId,
									scheduleDetailId: self.scheduleDetailId
								}).then(res => {
									if (res.code == 200) {
										self.getClassMien()
									}
								})
							},
						});
					},
				});
			},
			imageClick(item) {
				const index = item.index
				const urls = this.list.map(row=>row.image)
				console.log(item,index);
				uni.previewImage({
					urls: urls,
					current:index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
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
