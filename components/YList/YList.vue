<template>
	<view style="width:100%">
		<scroll-view :class="scrollClass" scroll-y="true" @scrolltolower="lower1" scroll-with-animation
			:scroll-top="scrollTop" @scroll="scroll">
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
	export default {
		name: "y-list",
		props: {
			setData: {
				type: Function
			},
			scrollClass: {
				default: 'scroll-class'
			},
			params: {
				default: () => {
					return {}
				}
			},
			isMore: false,
			data: {
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			};
		},
		components: {},
		methods: {
			// 返回顶部
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			handleGoTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			/**
			 * @function 搜索列表数据
			 */
			// 加载更多 util.throttle为防抖函数
			lower1: throttle(function(e) {
				this.$emit('lower')
			}, 1000),
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-class {
		height: calc(100vh - 64rpx);
	}
	.scroll-class1 {
		height: calc(100vh - 155rpx);
	}
	// 订单样式
	.scroll-class2 {
		height: calc(100vh - 115rpx)
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
