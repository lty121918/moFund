<template>
	<view class="my-coupon">
		<view class="my-coupon-tab-background"></view>
		<view class="my-coupon-tab">
			<view
				v-for="(item, index) in tabList"
				:key="item.id"
				class="my-coupon-tab-item"
				@click="handleTab(index)"
				:class="[active == index ? 'my-coupon-tab-active' : '']">
				{{ item.name }}({{ item.num }})
			</view>
		</view>
		<view class="coupon-list">
			<coupon-item :type="0"></coupon-item>
			<coupon-item :type="1"></coupon-item>
			<coupon-item :type="2"></coupon-item>
			<coupon-item :type="3"></coupon-item>
			<coupon-item type="0"></coupon-item>
			<coupon-item type="2"></coupon-item>
			<coupon-item type="3"></coupon-item>
			<coupon-item type="1"></coupon-item>
		</view>

		<!-- <coupon-item></coupon-item>
        <coupon-item></coupon-item> -->
	</view>
</template>

<script>
import CouponItem from "./coupon-item.vue";
import mixin from "@/mixin.js";
export default {
	components: {
		CouponItem,
	},
	mixins: [mixin],
	data() {
		return {
			active: 1,
			tabList: [
				{
					name: "未使用",
					num: 4,
				},
				{
					name: "已使用",
					num: 4,
				},
				{
					name: "已过期",
					num: 112,
				},
				{
					name: "助力优惠券",
					num: 4,
				},
			],
		};
	},
	methods: {
		/**
		 * @function Tab切换方法
		 * @param {Object} val
		 */
		handleTab(val) {
			console.log(val);
			this.active = val;
			// this.data = this.activeList[val] || [];
			// this.queryParams.page = 1;
			// this.search();
		},
	},
	computed: {},
};
</script>

<style lang="scss" scoped>
.my-coupon {
	min-height: 100vh;
	background: #eef1fa;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	&-tab-background {
		width: 100%;
		height: 47rpx;
		position: absolute;
		top: 0;
		background: #de501f;
	}
	&-tab {
		display: flex;
		justify-content: space-between;
		padding: 0 36rpx;
		align-items: center;
		width: 628rpx;
		background: #ffffff;
		box-shadow: 0px 8px 16px 0px rgba(119, 57, 0, 0.06);
		border-radius: 32rpx;
		z-index: 999;
		&-item {
			height: 94rpx;
			line-height: 94rpx;
			text-align: center;
			font-size: 24rpx;
			font-family: SourceHanSansSC-Regular, SourceHanSansSC;
			color: #838899;
		}
		&-active {
			position: relative;
			color: #de501f;
			&:before {
				content: "";
				position: absolute;
				bottom: 0rpx;
				background: #de501f;
				border-radius: 3rpx;
				width: 100%;
				height: 6rpx;
				border-radius: 200px 200px 0px 0px;
			}
		}
	}
}
.coupon-list {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
