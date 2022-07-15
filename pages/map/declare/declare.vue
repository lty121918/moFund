<template>
	<view class="declare">
		<y-list ref="yList" :scrollClass="'declare-scroll-class'" :setData="search">
			<template slot-scope="{data}">
				<view class="declare-content" v-for="(item,index) in data" :key="index">
					<view class="">社区名称：湖北省武汉市XX区天河小区</view>
					<view class="pt16">社区物业：融创物业</view>
					<view class="pt16">社区场地：2个正规篮球场</view>
				</view>
			</template>
		</y-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		computed: {
		},
		created() {

		},
		mounted() {
			this.$refs.yList.init()
		},
		methods: {
			// 模拟请求数据
			search() {
				return new Promise(async (resolve, reject) => {
					let data = []
					for (let i = 0; i < 3; i++) {
						data.push({})
					}
					resolve({
						data,
						totalRows: 10
					})
				})
			},

		}
	}
</script>
<style>
	.declare-scroll-class{
		padding-top: 32rpx;
		height: 100vh;
		box-sizing: border-box;
	}
</style>
<style lang="scss" scoped>
	.declare {
		min-height: 100vh;
		background: #EEF1FA;
		&-content{
			position: relative;
			margin:0 32rpx  32rpx  32rpx;
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
			&::before{
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
