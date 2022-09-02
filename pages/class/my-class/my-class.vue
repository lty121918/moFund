<template>
	<view class="class">
		<view v-for="(item,index) in data" :key="index">
			<class-item :data="item" :classStatus="classStatus" :isTeach="isTeach"></class-item>
		</view>
		<view class="default-empty" v-if="data.length===0">
			<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
			</image>
			<view class="">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import ClassItem from '@/components/ClassItem/ClassItem.vue'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			ClassItem
		},
		data() {
			return {
				data: []
			}
		},
		computed: {},
		onShow() {
			this.onLaunch().then(res => {
				this.getMounted()
			})
		},
		created() {

		},
		mounted() {},
		methods: {
			getMounted() {
				setTimeout(() => {
					this.getTeach()
					this.search()
				}, 300)
			},
			// 模拟请求数据
			async search(val) {
				const self = this
				console.log('class请求');
				self.$http['classes'].getClassList({
					...val
				}).then(res => {
					let data = []
					if (res.code == 200) {
						data = res.data || []

						data.forEach(item => {
							if (item.classStatus != 0 && item.classStatus != 1 && item.classStatus !=3) {
									item.nextCLassTime = -1
							}
							if (item.coverImage.indexOf('http') == -1) {
								item.coverImage = self.$url + item.coverImage
							}
							item.startPeriod = self.$utils.dateTime.getLocalTime(
								`2022-01-01 ${item.startPeriod}`, 'hh:mm')
							item.endPeriod = self.$utils.dateTime.getLocalTime(
								`2022-01-01 ${item.endPeriod}`,
								'hh:mm')
							item['weekCodeName'] = self.$utils.dateTime.filteDay(item.weekCode)
							if (item.nextCLassTime&& item.nextCLassTime != -1) {
								item.nextCLassTime = self.$utils.dateTime.getLocalTime(
									item.nextCLassTime,
									'yyyy-MM-dd hh:mm')
							}
						})

					}
					this.data = data
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.class {
		padding: 32rpx 0;
		min-height: 100vh;
		box-sizing: border-box;
		background: #EEF1FA;

		&-title {
			display: flex;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #141D3D;

			&-item {
				margin-right: 40rpx;
			}
		}
	}

	.home-title {
		padding-bottom: 0;
	}
</style>
