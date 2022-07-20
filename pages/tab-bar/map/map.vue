<template>
	<view>
		<view class="map">
			<map :markers="markers" id="map1" scale="12" :latitude="latitude" :longitude="longitude"
				style="width: 100%;" :style="{ height: `calc(100vh - ${safeAreaHeight+50}px)` }" @markertap="markertap"
				@callouttap="markertap">
				<cover-view class="map-tip" @click="$utils.router.navTo($page.AddDeclare)">找不到校区？试试校区申请</cover-view>
				<cover-view slot="callout">
					<block v-for="(item,index) in markers" :key="index">
						<cover-view class="customCallout" :marker-id="item.id">
							<cover-view class="content">
								{{item.title}}
							</cover-view>
						</cover-view>
					</block>
				</cover-view>
				<cover-view class="popup-map" @click="isShow=false" v-show="isShow"
					:style="{ height: `calc(100vh - ${safeAreaHeight+50}px)` }">
					<cover-view class="popup-content" @click.stop>
						<cover-view class="home-title">
							<cover-view class="home-title-item">
								<cover-image class="home-title-img" src="/static/home/icon.png" mode="aspectFit">
								</cover-image>
								<cover-view>{{campusName}}</cover-view>
							</cover-view>
						</cover-view>

						<cover-view class="course">
							<cover-view class="course-list-item" v-for="item in data" :key="item"
								@click="$utils.router.navTo($page.CourseDetail)">
								<cover-image class="course-list-item-img" :src="item.coverImage|| '/static/notData.png'"
									mode="aspectFit">
								</cover-image>
								<cover-view class="">
									<cover-view class="course-list-item-title t-over">{{item.productName}}</cover-view>
									<cover-view class="course-list-item-price">
										<cover-view class="color fz24">￥</cover-view>
										<cover-view class="color fz32">{{item.price}}
											<cover-view class="kong"></cover-view>
										</cover-view>
										<cover-view class="fz24">/节</cover-view>
										<cover-view class="course-list-item-payment">{{item.paymentNumber}}人付款
										</cover-view>
									</cover-view>
									<cover-view class="course-list-item-info">
										<cover-view class="course-list-item-apply">
											{{item.minAge}}-{{item.maxAge}}岁适用
										</cover-view>
										<cover-view class="course-list-item-pin">
											{{item.spellingClassNumber}}拼班
										</cover-view>
									</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
			</map>
		</view>
		<page-tabpars></page-tabpars>
	</view>
</template>

<script>
	import mixin from '@/mixin.js'

	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [mixin],
		data() {
			return {
				isShow: false,
				latitude: 24.485193, // 地图默认显示的维度
				longitude: 118.179483, // 地图默认显示的纬度
				markers: [],
				campusName: '',
				data: [] //社区的课程列表

			}
		},
		computed: {
			...mapGetters(['active']),
		},
		onShow() {
			const self = this
			// self.getData()
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					self.latitude = res.latitude
					self.longitude = res.longitude
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					self.getData()
				},
				fail: function(e) {
					console.log(e);
				}
			});

		},
		created() {
			const active = 'map'
			if (this.active !== active) {
				this.SET_ACTIVE(active)
			}
		},
		methods: {
			...mapMutations(['SET_ACTIVE']),
			/**
			 * @function 点击坐标获取当前校区的商品
			 * @param {Object} e
			 */
			markertap(e) {
				console.log(e.detail);
				const campus = this.markers.find(item => item.id == e.detail.markerId)
				this.campusName = campus.campusName
				this.$http['classes'].getCourseList(campus.campusId).then(res => {
					if (res.code == 200) {
						this.isShow = true
						this.data = [
							...res.data,
							{
								"campusId": "",
								"coverImage": "",
								"maxAge": 0,
								"minAge": 0,
								"paymentNumber": 0,
								"price": 0,
								"productId": "",
								"productName": "篮球启蒙篮球启蒙篮球启蒙篮球启蒙",
								"spellingClassNumber": 0
							}
						]
					}
				})

			},
			/**
			 * @function 获取当前的所有校区
			 */
			getData() {
				const self = this
				this.$http['map'].getCampus().then(res => {
					if (res.code == 200) {
						let data = []
						res.data.forEach((item, index) => {
							data.push({
								...item,
								id: index,
								latitude: item.lat,
								longitude: item.lng,
								title: item.campusName,
								joinCluster: true,
								customCallout: {
									anchorX: 0,
									anchorY: 0,
									display: "ALWAYS",
								},
								with: '20',
								heigth: '20',
								iconPath: '/static/map/icon.png'
							})
						})
						self.markers = data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.map {
		position: relative;

		&-tip {
			position: absolute;
			bottom: calc(60rpx);
			right: 24rpx;
			width: 320rpx;
			height: 62rpx;
			background: rgba(255, 255, 255, 0.6900);
			box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.16);
			border-radius: 8rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #DE501F;
			text-align: center;
			line-height: 62rpx;
		}
	}

	/* *************************************** */
	.customCallout {
		box-sizing: border-box;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 30px;
		width: 150px;
		height: 40px;
		display: inline-flex;
		padding: 5px 20px;
		justify-content: center;
		align-items: center;
	}

	.content {
		flex: 0 1 auto;
		margin: 0 10px;
		font-size: 14px;
	}




	@keyframes fadenum {
		/*设置内容由显示变为隐藏*/

		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}

	}

	.popup {
		&-map {
			animation: fadenum 0.3s;
			position: fixed;
			top: 0;
			width: 750rpx;
			height: 100vh;
			background: rgba(0, 0, 0, 0.4);
		}

		&-content {
			position: absolute;
			bottom: -30rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
			width: 750rpx;
			height: 728rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0prx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-top-left-radius: 36rpx;
			border-top-right-radius: 36rpx;
			// border-radius: 36rpx 36rpx 0rpx 0rpx !important;
		}
	}

	.home-title {
		border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
	}

	.course {
		height: 580rpx;
		overflow-y: scroll;

		// 下拉数据
		&-list {
			&-item {
				position: relative;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				margin-bottom: 32rpx;
				padding: 24rpx;
				width: 686rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 16rpx;

				&-img {
					flex-shrink: 0;
					margin-right: 30rpx;
					width: 180rpx;
					height: 204rpx;
					// background-color: rgba(0, 0, 0, 0.1);
				}

				&-title {
					display: inline-block;
					width: 420rpx;
					height: 86rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #141D3D;
					line-height: 48rpx;
				}

				&-price {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				&-payment {
					margin-left: 16rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(20, 29, 61, 0.5);
				}

				&-info {
					display: flex;
					justify-content: space-around;
					margin-top: 22rpx;
					// width: 296rpx;
					width: 300rpx;
					height: 44rpx;
					background: rgba(20, 29, 61, 0.05);
					color: rgba(20, 29, 61, 0.5);
					border-radius: 12rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 44rpx;
					text-align: center;
				}

				&-apply {
					// width: 148rpx;
					padding: 0 12rpx;
					height: 44rpx;
					line-height: 44rpx;
					background: rgba(20, 29, 61, 0.1);
					border-radius: 12rpx;
				}

				&-pin {
					width: 148rpx;
					line-height: 44rpx;
				}
			}
		}
	}

	.kong {
		display: inline-block;
		line-height: 20rpx;
		width: 10rpx;
	}
</style>
