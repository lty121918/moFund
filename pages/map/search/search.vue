<template>
	<view class="search">
		<view class="search-content">
			<uni-easyinput @blur="search" v-model="campusName" placeholder="搜索校区" suffixIcon="search" />
			<view class="pt16">
				<view class="search-content-item" v-for="(item,index) in campusList" :key="index" @click="back(item)">
					<view class="search-content-name">
						<text>{{item.campusName}}</text>
						<image class="search-content-img" src="/static/home/location2.png" mode="widthFix"></image>
					</view>
					<view class="search-content-city">
						{{item.areaName || '-'}}
					</view>
					<view class="search-content-distance dis-color">
						距离{{item.distance2}}
					</view>
				</view>
				<view class="search-more" @click="handleMore" v-if="!isShowMore">
					<text>查看更多</text>
					<image class="search-more-img" src="/static/class/more.png" mode=""></image>
				</view>
				<view class="not-search" @click="$utils.router.navTo($page.AddDeclare)">
					找不到小区？试试校区申请？
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				campusName:'',
				campusList:[],
				isShowMore:false
			}
		},
		onLoad(e) {
			this.type = e.type || 'y'
			this.isShowMore = false
			this.search()
		},
		created() {},
		methods: {
		   async search() {
				// 获取社区
				this.SET_STORAGE({
					str: 'location'
				})
				let res2 = await this.$http['map'].getSearchList({
					lat: this.location.latitude,
					lng: this.location.longitude,
					campusName:this.campusName
				})
				if (res2.code == 200) {
					let list = res2.data
					list.forEach(item=>{
						if(item.distance>1200){
							item.distance2 = '>1.2Km'
						} else if(item.distance<500){
							item.distance2 = '500m<'
						} else {
							item.distance2 = `${item.distance}m`
						}
					})
					if(this.isShowMore || list.length<=5){
						this.isShowMore = true
						this.campusList = list
					} else{
						this.campusList = list.slice(0, 5)
					}
					
					
				}
			},
			back(data) {
				if(this.type=='no'){
					this.$utils.router.navBackData({
						campusOther: data
					})
				} else {
					this.SET_STORAGE({
						str: 'campus',
						data
					})
					this.$utils.router.navBackData()
				}
				
			},
			handleMore() {
				this.isShowMore = true
				uni.showToast({
					title: '查看更多'
				})
				this.search()
			}
		}
	}
</script>

<style scoped lang="scss">
	.not-search {
		margin-top: 22rpx;
		text-align: right;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #DE501F;
	}

	.search {
		padding: 32rpx;
		min-height: 100vh;
		box-sizing: border-box;
		background: #EEF1FA;

		&-content {
			padding: 32rpx 30rpx;
			width: 686rpx;

			height: calc(100vh - 64rpx);
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;

			&-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				min-height: 106rpx;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #141D3D;
			}

			&-name {
				display: flex;
				width: 332rpx;
			}

			&-img {
				margin-left: 12rpx;
				width: 28rpx;
				height: 28rpx;
			}

			&-city {
				text-align: center;
				width: 130rpx;
			}

			&-distance {
				text-align: right;
				width: 160rpx;
			}
		}

		&-more {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
			height: 56rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #838899;

			&-img {
				margin-left: 8rpx;
				height: 20rpx;
				width: 22rpx;
			}
		}
	}

	/deep/.uni-icons {
		color: #DE501F !important;
	}

	/deep/.is-input-border {
		border-radius: 8rpx !important;
		border: 2rpx solid #F3F3F5 !important;
	}
</style>
