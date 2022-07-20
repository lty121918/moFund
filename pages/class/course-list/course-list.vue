<template>
	<view class="course">
		<view class="course-head-address" @click="$utils.router.navTo($page.Search)">
			<image class="course-head-address-img" src="/static/home/location2.png" mode="aspectFit"></image>
			<text> {{campus.campusName}}</text>
			<image class="course-head-address-icon" src="/static/down2.png" mode="aspectFit"></image>
		</view>
		<y-list ref="yList" :scrollClass="'scroll-class2'" :setData="search">
			<template slot-scope="{data}">
				<view class="course-list-item" v-for="item in data" :key="item"  @click="$utils.router.navTo($page.CourseDetail)">
					<image class="course-list-item-img" :src="item.coverImage||'/static/notData.png'" mode="aspectFit"></image>
				<!-- 	<view class="course-list-item-surplus">
						<text>剩余</text>
						<text class="color fz32">10</text>
						<text>件</text>
					</view> -->
					<view class="">
						<view class="course-list-item-title">{{item.productName}}</view>
						<view>
							<text class="color">
								<text class="fz24">￥</text>
								<text class="fz32">{{item.price}}</text>
							</text>
							<text class="fz24">/节</text>
							<text class="course-list-item-payment">{{item.paymentNumber}}人付款</text>
						</view>
						<view class="course-list-item-info">
							<view class="course-list-item-apply">
								{{item.minAge}}-{{item.maxAge}}岁适用
							</view>
							<view class="course-list-item-pin">
								{{item.spellingClassNumber}}拼班
							</view>
						</view>
					</view>
				</view>
			</template>
		</y-list>
	</view>
</template>

<script>
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		data() {
			return {
			}
		},
		mounted() {
			this.getInit()
		},
		methods: {
			getInit(){
				this.$refs.yList.init()
			},
			search() {
				const self = this
				return new Promise(async (resolve, reject) => {
					// 获取课程
					let res = await self.$http['classes'].getCourseList({
						campusId: self.campus.campusId
					})
					let data = []
					if (res.code == 200) {
						data = [
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
						data = res.data
					
					}
					resolve({
						data,
						totalRows: 10
					})
				})
			}
		}
	}
</script>
<style lang="scss">
	.scroll-class2 {
		height: calc(100vh - 105rpx);
	}
</style>
<style scoped lang="scss">
	

	.course {
		min-height: 100vh;
		padding: 0 32rpx;
		background: #EEF1FA;

		&-head {
			&-address {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #141D3D;

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
		}

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
				&-title{
					width: 300rpx;
					min-height: 86rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #141D3D;
					line-height: 48rpx;
				}
				&-payment{
					margin-left: 16rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(20, 29, 61, 0.5);
				}
				&-info{
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
				&-apply{
					width: 148rpx;
					height: 44rpx;
					background: rgba(20, 29, 61, 0.1);
					border-radius: 12rpx;
				}
				&-pin{
					width: 148rpx;
				}
				
				
				&-surplus {
					position: absolute;
					right: 24rpx;
					top: 24rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #141D3D;
				}
			}
		}
	}
</style>
