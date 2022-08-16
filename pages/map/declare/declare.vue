<template>
	<view class="declare">
		<view class="declare-content" v-for="(item,index) in data" :key="index">
			<view class="ww">社区名称：{{item.campusName}}</view>
			<view class="pt16 ww">社区物业：{{item.property}}</view>
			<view class="pt16 ww">社区场地：{{item.campusSpace}}</view>
		</view>
		<view class="default-empty" v-if="data.length===0">
			<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
			</image>
			<view class="">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: []
			}
		},
		computed: {},
		created() {

		},
		mounted() {
			this.onLaunch().then(res => {
				this.getData()
			})
		},
		methods: {
			// 模拟请求数据
			async search() {
				const self = this
				const res = await self.$http['map'].getCampusApply()
				let data = []
				if (res.code == 200) {
					data = res.data
				}
				this.data = data
			},

		}
	}
</script>
<style lang="scss" scoped>
	.declare {
		padding-top: 32rpx;
		min-height: 100vh;
		box-sizing: border-box;
		background: #EEF1FA;

		&-content {
			position: relative;
			margin: 0 32rpx 32rpx 32rpx;
			padding: 32rpx;
			width: 686rpx;
			min-height: 216rpx;
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
				margin-top: -62rpx;
				width: 6rpx;
				height: 124rpx;
				background: #DE501F;
				border-radius: 0rpx 8rpx 8rpx 0rpx;
			}
		}
	}
</style>
