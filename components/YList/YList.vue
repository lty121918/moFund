<template>
	<view>
		<scroll-view :class="scrollClass" scroll-y="true" @scrolltolower="lower1" scroll-with-animation
			:scroll-top="scrollTop">
			<!-- 内容模块 -->
			<slot :data="data"></slot>
			<view class="default-more" v-if="isMore && data.length!=0">暂无更多数据</view>
			<view :class="scrollClass" class="default-empty" v-if="data.length===0">
				<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
				</image>
				<view class="">暂无数据</view>
			</view>
			<view :style="{ height: `${safeAreaHeight}px` }" @click="submit">
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import {
		throttle
	} from '@/utils/lodash.js'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		name: "y-list",
		props: {
			setData: {
				type: Function
			},
			scrollClass: {
				default: 'scroll-class'
			},
			params: {
				default: ()=>{
					return {}
				}
			},
		},
		data() {
			return {
				data: [],
				scrollTop: 0,
				isMore: false,
				queryParams: {
					page: 1,
					row: 10
				},
			};
		},
		methods: {
			// 初始化
			init() {
				console.log('初始化列表');
				this.queryParams = {
					page: 1,
					row: 10
				}
				this.search()
			},
			/**
			 * @function 搜索列表数据
			 */
			// 加载更多 util.throttle为防抖函数
			lower1: throttle(function(e) {
				if (this.queryParams.page * this.queryParams.row >= this.queryParams.total) {
					this.isMore = true
					console.log(`暂无更多加载`) //current
					return false
				}
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.isRequest().then((res) => {
					console.log(`加载成功`) //current
					this.$forceUpdate() //二维数组，开启强制渲染
				})
			}, 1000),
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest() {
				return new Promise((resolve, reject) => {
					var that = this
					setTimeout(async () => {
						uni.hideLoading()
						if (this.queryParams.page * this.queryParams.row >= this.queryParams.total) {
							this.isMore = true
						} else {
							this.queryParams.page++
							await this.search()
						}
						resolve()
					}, 1000)
				})
			},
			// 搜索数据
			search() {
				return new Promise(async (resolve, reject) => {
					this.isMore = false
					const formData = {
						...this.queryParams,
						...this.params
					}
					const res = await this.setData(formData)
					console.log('数据', res);
					let list = res
					list.data = list.data || []
					let data = this.data
					if (this.queryParams.page == 1) {
						data = list.data
					} else {
						data = data.concat(list.data)
					}
					this.data = [...data]
					this.queryParams.total = list.totalRows
					this.$forceUpdate() //二维数组，开启强制渲染
					resolve(data)
					// 这里返回数据
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-class {
		height: calc(100vh - 50px);
	}

	.default-more {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 28rpx;
		color: #6A6A6A;
	}

	.default-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
		font-size: 28rpx;
		font-family: SourceHanSansSC-Regular, SourceHanSansSC;
		font-weight: 400;
		color: #DE501F !important;

	}

	.default-empty-image {
		margin-bottom: 48rpx;
		width: 170rpx;
		height: 170rpx;
	}
</style>
