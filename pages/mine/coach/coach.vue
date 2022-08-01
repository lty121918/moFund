<template>
	<view class="coach">
		<view class="flex-bc coach-content" v-for="(item,index) in data" :key="index">
			<view class="">
				<view class="">申请时间：{{item.time}}</view>
				<view class="pt16">申请校区：{{item.campusName}}</view>
			</view>
			<!-- <view class="coach-status">待审核</view> -->
		</view>
		<view :style="{ height: `calc(${safeAreaHeight}px + 168rpx)` }"></view>
		<view class="coach-footer">
			<view class="coach-footer-button" :style="{ marginBottom: `${safeAreaHeight}px` }" @click="submit">
				申请成为教练
			</view>
		</view>
		<view class="default-empty" v-if="data.length===0">
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
				data: []
			}
		},
		computed: {},
		created() {

		},
		onShow() {
			this.search()
		},
		methods: {
			submit() {
				this.$utils.router.navTo(this.$page.AddCoach)
			},
			// 模拟请求数据
			async search() {
				const self = this
				let data = []
				const res = await self.$http['mine'].getCoach()
				if (res.code == 200) {
					data = res.data
					data.forEach(item => {
						item.time = self.$utils.dateTime.getLocalTime(item.applyTime, 'yyyy-MM-dd hh:mm:ss')
						item.campusName = item.campusNames.join(',')
					})
				}
				this.data = data

			},

		}
	}
</script>

<style lang="scss" scoped>
	.coach {
		min-height: 100vh;
		background: #EEF1FA;

		&-status {
			width: 88rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			background: rgba(222, 80, 31, 0.1000);
			border-radius: 6rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #DE501F;
		}

		&-content {
			position: relative;
			margin: 0 32rpx 32rpx 32rpx;
			padding: 32rpx;
			width: 686rpx;
			min-height: 160rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			border-radius: 16rpx;
			font-size: 28rpx;
			font-family: SourceHanSansSC-Regular, SourceHanSansSC;
			font-weight: 400;
			color: #141D3D;

			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				margin-top: -37rpx;
				width: 6rpx;
				height: 74rpx;
				background: #DE501F;
				border-radius: 0rpx 8rpx 8rpx 0rpx;
			}
		}

		&-footer2 {
			height: 92rpx;
			padding: 32rpx 30rpx;
		}

		&-footer {
			position: fixed;
			bottom: 0;
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
