<template>
	<view class="home">
		<view class="home-head2"></view>
		<view class="home-head">
			<view class="home-head-address" @click="$utils.router.navTo($page.Search)">
				<image class="home-head-address-img" src="/static/home/location.png" mode="aspectFit"></image>
				<text> {{campus.campusName}}</text>
				<image class="home-head-address-icon" src="/static/down.png" mode="aspectFit"></image>
			</view>
			<view class="home-head-swiper">
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="5000"
					:duration="500">
					<swiper-item v-for="item in banner" :key="item.id" @click="hanldeNext(item)">
						<view class="home-head-view">
							<image class="home-head-img" :src="url+item.imageUrl" mode="heightFix" alt="加载失败"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 热门活动 -->
		<view class="home-activity">
			<view class="home-title" v-if="courseList.length>0">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
					<text>社区课程</text>
				</view>
				<view class="home-title-item" @click="$utils.router.navTo($page.Course)">
					<text class="home-title-name">全部</text>
					<image class="home-title-icon" src="/static/left.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="home-activity-content">
				<view class="home-activity-content-item" v-for="item in courseList" :key="item.productId"
					@click="$utils.router.navTo($page.CourseDetail,item)">
					<van-image use-error-slot class="home-activity-content-img" radius="10" width="84" height="84"
						:src="item.coverImage">
					</van-image>
					<!-- <image class="home-activity-content-img" :src="item.coverImage" mode="aspectFit"></image> -->
					<view class="home-activity-content-title t-over">{{item.productName}}</view>
					<!-- <view class="home-activity-content-msg">&nbsp;</view> -->
					<view class="home-activity-content-price">
						<text>￥{{item.price}}</text>
						<image class="home-activity-content-icon" src="/static/home/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 附近拼班 -->
		<view class="home-nearby">
			<view class="home-title" v-if="spellClassList.length>0">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
					<text>附近拼班</text>
				</view>
				<view class="home-title-item" @click="$utils.router.navTo($page.PieceList)">
					<text class="home-title-name">全部</text>
					<image class="home-title-icon" src="/static/left.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="home-nearby-content" v-for="(item,index) in spellClassList" :key="index"
				@click="$utils.router.navTo($page.OrderInfo,{classId:item.classInfoId})">
				<image class="home-nearby-content-img" :src="item.headUrl" mode="aspectFit"></image>
				<view class="home-nearby-content-center">
					<view>{{item.nickName}}</view>
					<view class="home-nearby-content-class">
						<view class="home-nearby-content-name">{{item.spellType}}</view>
						<view class="home-nearby-content-url">
							<image v-for="row in item.weChatUserList" :key="row.studentId"
								class="home-nearby-content-icon" :src="row.avatar" mode="aspectFit">
							</image>
							<image class="home-nearby-content-icon" src="/static/home/default-url.png" mode="aspectFit">
							</image>
						</view>
					</view>
				</view>
				<view class="home-nearby-content-button">加入拼班</view>
			</view>
		</view>
		<!-- Tabbar -->
		<page-tabpars></page-tabpars>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		debounce
	} from "@/utils/lodash.js";
	import bus from '@/utils/bus.js'
	export default {
		data() {
			return {
				banner: [], // 轮播图
				courseList: [], // 社区课程
				spellClassList: [], // 附件拼班
				campusName:''
			}
		},
		computed: {
			...mapGetters(['active', 'location', 'campus']),
			url() {
				return this.$url
			}
		},
		created() {
			// this.getMounted()
			bus.$on('getMounted',()=>{
				console.log('执行');
				this.getMounted()
			})
		},
		mounted() {
			
		},
		methods: {
			// home 页面调用
			getMounted: debounce(function(e) {
				const active = 'home'
				if (this.active !== active) {
					this.SET_ACTIVE(active)
				}
				uni.setNavigationBarTitle({
					title: '首页'
				})
				this.getData()
			}),
			...mapMutations(['SET_ACTIVE', 'SET_STORAGE']),
			// 请求数据
			async getData() {
				console.log('数据请求home');
				// 读取社区信息 已经缓存在本地
				this.SET_STORAGE({
					str: 'campus'
				})
				console.log('校区',this.campus);
				// 读取登录时获取的坐标轴
				this.SET_STORAGE({
					str: 'location'
				})
				const {
					getSearchList,
					getBanner
				} = this.$http['map']
				const {
					getCourseList,
					getSpellClassList
				} = this.$http['classes']
				// 轮播图
				let res1 = await getBanner()
				if (res1.code == 200) {
					this.banner = res1.data
				}
				// 获取社区
				let res2 = await getSearchList({
					lat: this.location.latitude,
					lng: this.location.longitude
				})
				if (res2.code == 200) {
					let list = res2.data
					if (!this.campus) {
						// 没有社区 保存一下
						this.SET_STORAGE({
							str: 'campus',
							data: list[0]
						})
					} else {
						// 如果之前缓存的社区已经被删除 则重新选取
						const isTrue = list.some(item => item.campusId == this.campus.campusId)
						if (!isTrue) {
							this.SET_STORAGE({
								str: 'campus',
								data: list[0]
							})
						}
					}
				}
				// 获取课程
				let res3 = await getCourseList({
					campusId: this.campus.campusId
				})
				if (res3.code == 200) {
					const data = [
						...res3.data,
					]
					data.forEach(item => {
						item.coverImage = this.$url + item.coverImage
					})
					if (data.length > 4) {
						this.courseList = data.slice(0, 4)
					} else {
						this.courseList = data
					}

				}
				// 获取当前社区拼班
				let res4 = await getSpellClassList({
					campusId: this.campus.campusId
				})
				if (res4.code == 200) {
					res4.data.forEach(item => {
						if(item.headUrl.indexOf('http')==-1){
							item.headUrl = this.$url + item.headUrl
						}
						item.weChatUserList = item.weChatUserList || []
						item.weChatUserList.forEach(row => {
							item.avatar = this.$url + item.avatar
						})
					})
					this.spellClassList = [
						...res4.data
					]
				}
				this.$forceUpdate()
			},
			// 跳转到其他小程序
			hanldeNext(item) {
				this.$utils.router.other(item.linkUrl, item.appid)
			}
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
				margin-top: 20rpx;
				width: 686rpx;
				height: 376rpx;
				background: #D8D8D8;
				border-radius: 16rpx;
			}

			&-view {
				text-align: center;
			}

			&-img {
				height: 376rpx;
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
					height: 85rpx;
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
		overflow: hidden;
		border-radius: 16rpx;
	}
</style>
