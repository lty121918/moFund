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
				<cover-view class="popup-map" @click="isShow=false" v-show="isShow" :style="{ height: `calc(100vh - ${safeAreaHeight+50}px)` }">
					<cover-view class="popup-content" @click.stop>
						<cover-view class="home-title">
							<cover-view class="home-title-item">
								<cover-image class="home-title-img" src="/static/home/icon.png" mode="aspectFit">
								</cover-image>
								<cover-view>金山校区</cover-view>
							</cover-view>
						</cover-view>

						<cover-view class="course">
							<cover-view class="course-list-item" v-for="item in 10" :key="item"  @click="$utils.router.navTo($page.CourseDetail)">
								<cover-image class="course-list-item-img" src="/static/notData.png" mode="aspectFit">
								</cover-image>
								<cover-view class="course-list-item-surplus">
									<cover-view>剩余</cover-view>
									<cover-view class="color fz32">10</cover-view>
									<cover-view>件</cover-view>
								</cover-view>
								<cover-view class="">
									<cover-view class="course-list-item-title">篮球启蒙课A</cover-view>
									<cover-view class="course-list-item-price">
										<cover-view class="color fz24">￥</cover-view>
										<cover-view class="color fz32">50.00
											<cover-view class="kong"></cover-view>
										</cover-view>
										<cover-view class="fz24">/节</cover-view>
										<cover-view class="course-list-item-payment">245人付款</cover-view>
									</cover-view>
									<cover-view class="course-list-item-info">
										<cover-view class="course-list-item-apply">
											4-5岁适用
										</cover-view>
										<cover-view class="course-list-item-pin">
											100+拼班
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
				isShow:false,
				latitude: 39.890, // 地图默认显示的维度
				longitude: 116.39752, // 地图默认显示的纬度
				markers: [{ // 标记点
					id: 1,
					latitude: 39.890,
					longitude: 116.39752,
					joinCluster: true,
					title: "点击提示1",
					customCallout: {
						anchorX: 0,
						anchorY: 0,
						display: "ALWAYS"
					},
					with: '20',
					heigth: '20',
					iconPath: '/static/map/icon.png'
				}, {
					id: 2,
					latitude: 39.891,
					longitude: 116.39752,
					joinCluster: true,
					title: "点击提示1",
					customCallout: {
						anchorX: 0,
						anchorY: 0,
						display: "ALWAYS"
					},
					with: '20',
					heigth: '20',
					iconPath: '/static/map/icon.png'
				}, {
					id: 3,
					latitude: 39.892,
					longitude: 116.39752,
					joinCluster: true,
					title: "点击提示1",
					customCallout: {
						anchorX: 0,
						anchorY: 0,
						display: "ALWAYS"
					},
					with: '20',
					heigth: '20',
					iconPath: '/static/map/icon.png'
				}, {
					id: 4,
					latitude: 39.893,
					longitude: 116.39752,
					joinCluster: true,
					title: "点击提示1",
					customCallout: {
						anchorX: 0,
						anchorY: 0,
						display: "ALWAYS"
					},
					with: '20',
					heigth: '20',
					iconPath: '/static/map/icon.png'
				}, ]
			}
		},
		computed: {
			...mapGetters(['active']),
		},
		onShow() {
			const self = this
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					// self.latitude = res.latitude
					// self.longitude = res.longitude
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
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
			markertap(e) {
				console.log(e.detail);
				this.isShow = true
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

	.popup {
		&-map {
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
					width: 300rpx;
					min-height: 86rpx;
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
					width: 296rpx;
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
					width: 148rpx;
					height: 44rpx;
					line-height: 44rpx;
					background: rgba(20, 29, 61, 0.1);
					border-radius: 12rpx;
				}

				&-pin {
					width: 148rpx;
					line-height: 44rpx;
				}


				&-surplus {
					position: absolute;
					right: 24rpx;
					top: 24rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #141D3D;
				}
			}
		}
	}

	.kong {
		display: inline-block;
		line-height: 40rpx;
		width: 10rpx;
	}
</style>
