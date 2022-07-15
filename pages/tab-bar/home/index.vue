<template>
	<view class="home">
		<view class="home-head2"></view>
		<view class="home-head">
			<view class="home-head-address" @click="$utils.router.navTo($page.Search)">
				<image class="home-head-address-img" src="/static/home/location.png" mode="aspectFit"></image>
				<text> 福田区</text>
				<image class="home-head-address-icon" src="/static/down.png" mode="aspectFit"></image>
			</view>
			<view class="home-head-swiper">
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="5000"
					:duration="500">
					<swiper-item>
						<view class="swiper-item uni-bg-red">A</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-green">B</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-blue">C</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 热门活动 -->
		<view class="home-activity">
			<view class="home-title">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
					<text>热门活动</text>
				</view>
				<view class="home-title-item" @click="$utils.router.navTo($page.Course)">
					<text class="home-title-name">全部</text>
					<image class="home-title-icon" src="/static/left.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="home-activity-content">
				<view class="home-activity-content-item" v-for="item in 3" :key="item" @click="$utils.router.navTo($page.CourseDetail)">
					<image class="home-activity-content-img" src="/static/mine/head-url.png" mode="aspectFit"></image>
					<view class="home-activity-content-title">篮球启蒙1</view>
					<view class="home-activity-content-msg">666团</view>
					<view class="home-activity-content-price">
						<text>￥60</text>
						<image class="home-activity-content-icon" src="/static/home/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 附近拼班 -->
		<view class="home-nearby">
			<view class="home-title">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
					<text>附近拼班</text>
				</view>
				<view class="home-title-item" @click="$utils.router.navTo($page.PieceList)">
					<text class="home-title-name">全部</text>
					<image class="home-title-icon" src="/static/left.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="home-nearby-content" v-for="item in 30" :key="item" @click="$utils.router.navTo($page.OrderInfo)">
				<image class="home-nearby-content-img" src="/static/notData.png" mode="aspectFit"></image>
				<view class="home-nearby-content-center">
					<view>Do.Ting.le</view>
					<view class="home-nearby-content-class">
						<view class="home-nearby-content-name">启蒙班</view>
						<view class="home-nearby-content-url">
							<image v-for="item in 5" :key="item" class="home-nearby-content-icon"
								src="/static/home/default-url.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="home-nearby-content-button">加入拼班</view>
			</view>
		</view>



		<page-tabpars></page-tabpars>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapGetters(['active']),
		},
		created() {
			const active = 'home'
			if (this.active !== active) {
				this.SET_ACTIVE(active)
			}
			uni.setNavigationBarTitle({
				title: '首页'
			})
			this.getData()
		},
		methods: {
			...mapMutations(['SET_ACTIVE']),
			// 模拟请求数据
			getData() {
				console.log('数据请求home');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		min-height: 100vh;
		background: #EEF1FA;
		font-family: PingFangSC-Medium, PingFang SC;

		&-head2 {
			position: fixed;
			z-index: 1;
			height: 314rpx;
			width: 100%;
			background-image: url('~@/static/home/bg.png');
			background-repeat: no-repeat;
			background-size: 100% 510rpx;
			background-position: 0 -170rpx;
		}

		&-head {
			position: relative;
			top: 0;
			left: 0;
			padding: 20rpx 32rpx 0 32rpx;
			margin-bottom: 142rpx;
			height: 314rpx;
			z-index: 9;

			&-address {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 4rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;

				&-img {
					margin-right: 16rpx;
					width: 18rpx;
					height: 24rpx;
				}

				&-icon {
					margin-top: 4rpx;
					margin-left: 12rpx;
					width: 12rpx;
					height: 8rpx;
				}
			}

			&-swiper {
				position: absolute;
				left: 32rpx;
				bottom: -132rpx;
				width: 686rpx;
				height: 376rpx;
				background: #D8D8D8;
				border-radius: 16rpx;
			}
		}

		// 热门活动
		&-activity {
			position: relative;
			z-index: 9;

			&-content {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding-left: 8rpx;
				padding-right: 24rpx;
				padding-bottom: 8rpx;
				overflow-x: scroll;

				&-item {
					flex-shrink: 0;
					margin-left: 24rpx;
					padding: 20rpx;
					width: 200rpx;
					height: 280rpx;
					box-sizing: border-box;
					background-image: url('~@/static/home/bg-item.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					border-radius: 12rpx;
				}

				&-title {
					margin-top: 26rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #141D3D;
				}

				&-price {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #DE501F;
				}

				&-msg {
					margin-top: 8rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(20, 29, 61, 0.7);
				}

				&-img {
					width: 84rpx;
					height: 84rpx;
				}

				&-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		// 附近拼班
		&-nearby {
			position: relative;
			z-index: 9;

			&-content {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: 0 32rpx 32rpx 32rpx;
				padding: 24rpx;
				width: 686rpx;
				min-height: 180rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 16rpx;

				&-img {
					flex-shrink: 0;
					margin-right: 26rpx;
					width: 140rpx;
					height: 132rpx;
					border-radius: 12rpx;
				}

				&-center {
					flex-shrink: 0;
					width: 320rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #141D3D;
				}

				&-class {
					display: flex;
					justify-content: flex-start;
					margin-top: 18rpx;
					height: 60rpx;
					width: 320rpx;
					background: rgba(20, 29, 61, 0.05);
					border-radius: 12rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(20, 29, 61, 0.5);
				}

				&-name {
					width: 140rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background: rgba(20, 29, 61, 0.1);
					border-radius: 12rpx;
				}

				&-url {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-left: 32rpx;
				}

				&-icon {
					margin-left: -20rpx;
					width: 44rpx;
					height: 44rpx;
				}

				&-button {
					flex-shrink: 0;
					margin-left: 28rpx;
					width: 124rpx;
					height: 52rpx;
					background: #DE501F;
					border-radius: 12rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 52rpx;
					text-align: center;
				}
			}
		}
	}

	.swiper {
		width: 686rpx;
		height: 376rpx;
		border-radius: 16rpx;
	}
</style>
