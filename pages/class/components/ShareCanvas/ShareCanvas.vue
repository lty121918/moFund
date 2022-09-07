<template>
	<view class="input-result">
		<canvas class="share-canvas" canvas-id="shareBox"></canvas>
	</view>
</template>

<script>
	import {
		roundRect,
		drawImage,
		drawNormalText,
		fillParagraph,
		textPrewrap
	} from './canvas.js'
	export default {
		name: 'share-canvas',
		props: {
			data: {
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				canvasUrl: '',
				posterUrl: '',
				width: 0,
				height: 0,
				staticUrl: '../../../../static/', //静态目录
			}
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.getData()
				}, 2000)
			});
		},
		methods: {
			getData() {
				this.$nextTick(async () => {
					let wh = await this.getWH('share-canvas')
					// canvas 的宽度不等于 容器的宽度
					this.width = wh.width;
					this.height = wh.height;
					const systemInfo = uni.getSystemInfoSync();
					this.pixelRatio = systemInfo.devicePixelRatio;
					this.drawShareImage();
					uni.hideLoading();
				})
			},

			async drawShareImage() {
				let staticUrl = this.staticUrl
				let pixelRatio = this.pixelRatio
				let data = this.data
				//绘制canvas图片
				//创建一个canvas对象
				const ctx = wx.createCanvasContext('shareBox', this);
				let w = this.width
				let h = this.height
				// 底部背景图片
				drawImage(ctx, staticUrl + 'canvas/bg.png', 0, 0, 375, 300);
				ctx.setFillStyle('#FFFFFF');
				textPrewrap(
					ctx,
					data.className,
					18,
					30,
					24,
					320,
					2,
					18
				)
				// // 第二次背景
				roundRect(ctx, 17, 68, 340, 202, 11, {
					fillColor: '#FFFFFF',
					type: 'fill',
					round: {
						leftTop: true, // 是否圆角
						leftBottom: true, // 是否圆角
						rightTop: true, // 是否圆角
						rightBottom: true, // 是否圆角
					}
				})
				
				const time = ` ${data.startTime}~${data.endTime}`
				const week = data.courseType==2?'每天':(data.weekCodeName||'')
				let weekName = week
				if(week.length>10){
					weekName = `${week.substring(0,10)}...`
				}
				drawImage(ctx, staticUrl + 'canvas/time.png', 31, 82, 18, 18);
				drawNormalText(ctx, weekName+time, 58, 92, 18, '#0F0F0F',
					'left', 'middle') 

				let coverImage = data['coverImage'] || ''
				if (data['coverImage'].indexOf('http') == -1) {
					coverImage = staticUrl + 'default.png'
				}
				await drawImage(ctx, coverImage, 31, 110, 312, 147);
				// 隐藏掉图片的角
				ctx.lineWidth = 9;
				roundRect(ctx, 31, 110, 312, 147,11, {
					strokeColor:'#FFFFFF',
					type: 'stroke',
					round: {
						leftTop: true, // 是否圆角
						leftBottom: true, // 是否圆角
						rightTop: true, // 是否圆角
						rightBottom: true, // 是否圆角
					}
				})
				//绘制画布，并在回调中获取画布文件的临时路径
				console.log('绘画');
				var self = this
				ctx.draw(false, (draw) => {
					setTimeout(() => {
						uni.canvasToTempFilePath({
								canvasId: "shareBox",
								success: (res) => {
									// 在H5平台下，tempFilePath 为 base64
									console.log("图片已保存至本地：", res.tempFilePath);
									// this.posterUrl = res.tempFilePath;
									this.$emit("on-success", res.tempFilePath);
									// uni.saveImageToPhotosAlbum({ //保存图片到系统相册
									// 	filePath: res.tempFilePath,
									// 	success: (res) => {
									// 		//console.log('图片保存成功');
									// 	},
									// 	fail: (err) => {
									// 		//console.log('图片保存失败');
									// 	}
									// })
								},
								fail: (error) => {
									//console.log(error);
									this.$emit("on-error", error);
								},
							},
							this
						);
					}, 1500)
				});
			},
			save() {
				// this.getData()
				uni.saveImageToPhotosAlbum({ //保存图片到系统相册
					filePath: this.posterUrl,
					success: (res) => {
						//console.log('图片保存成功');
					},
					fail: (err) => {
						//console.log('图片保存失败');
					}
				})
			},
			getWH(className = "input-result") {
				return new Promise(resolve => {
					let info = uni.createSelectorQuery().in(this).select("." + className);
					info.boundingClientRect(function(data) {
						console.log(className, data);
						//	data - 包含元素的高度等信息
						resolve({
							height: data.height,
							width: data.width,
							x: data.left - 16,
							y: data.top - 16,
							bottom: data.bottom
						})

					}).exec()
				})
			},

		}
	}
</script>
<style lang="scss" scoped>
	.input-result{
		position: fixed;
		left: -100%;
		top: -100%;
	}
	.share-canvas {
		width: 375px;
		height: 300px;
	}
</style>
