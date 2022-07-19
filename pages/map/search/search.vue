<template>
	<view class="search">
		<view class="search-content">
			<uni-easyinput v-model="customFormData.name" placeholder="搜索校区" suffixIcon="search" />
			<view class="pt16">
				<view class="search-content-item" v-for="(item,index) in 5" :key="index" @click="back">
					<view class="search-content-name">
						<text>保利中央公馆</text>
						<image class="search-content-img" src="/static/home/location2.png" mode="widthFix"></image>
					</view>
					<view class="search-content-city">
						武昌
					</view>
					<view class="search-content-distance dis-color">
						距离＜99Km
					</view>
				</view>
				<view class="search-more" @click="handleMore">
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
	export default {
		data() {
			return {

			}
		},
		created() {},
		methods: {
			search() {
				// this.$http['map'].getSearchList({

				// }).then()
			},
			back() {
				this.$utils.router.navBackData({
					community: {
						value: '哈哈'
					}
				})
			},
			handleMore() {
				uni.showToast({
					title: '查看更多'
				})
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
