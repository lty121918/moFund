<template>
	<view class="course">
		<!-- 详情 + 评价 -->
		<view class="course-detail">
			<!-- tab -->
			<!-- <view class="course-detail-tab">
				<view v-for="(item, index) in tabData" :key="index" class="course-detail-tab-item" @click="handleTab(index)"
					:class="[active==index?'course-detail-tab-active':'']">{{item.name}}</view>
			</view> -->
			<view class="">
				<view class="course-detail-evaluate" v-for="item in productEvaluate" :key="item">
					<image class="course-detail-evaluate-img" :src="item.avatar" mode="aspectFill">
					</image>
					<view>
						<view class="course-detail-evaluate-info">
							<view class="course-detail-evaluate-info2">
								<text class="color4 fz28">{{item.nickname || '微信昵称'}}</text>
								<view class="course-detail-evaluate-info3">
									<uni-rate v-model="item.evaluationLevel" disabled size="20" disabledColor="#DE501F" color="#838899" active-color="#DE501F" />
								</view>
							</view>
							<view class="fz24 color2">{{item.createdDate||''}}</view>
						</view>
						<view class="course-detail-evaluate-text">{{item.content || ""}}</view>
					</view>
				</view>
				<view class="default-empty" v-if="productEvaluate.length===0">
					<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
					</image>
					<view class="">暂无数据</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				productEvaluate:[],
				tabData: [{
						name: '全部'
					},
					{
						name: '差评'
					},
					{
						name: '中评'
					},
					{
						name: '好评'
					}
				]
			}
		},
		async onLoad(e) {
			const res = await this.$http['classes'].getProductEvaluate({
				productId: e.productId
			})
			if (res.code == 200) {
				res.data = res.data.filter(item => item)
				res.data.forEach(item => {
					if( item.avatar.indexOf('http')==-1){
						item.avatar = this.$url + item.avatar
					}
					if(!item.avatar){
						item.avatar = this.avatar
					}
					item.createdDate = this.$utils.dateTime.getLocalTime(item.createdDate)
					item.evaluationLevel = item.evaluationLevel || 0
				})
				this.productEvaluate = res.data
			}
		},
		methods: {
			handleTab(val) {
				this.active = val
			},
		}
	}
</script>

<style scoped lang="scss">
	.course {
		min-height: 100vh;
		background: #EEF1FA;
		padding: 32rpx;
		box-sizing: border-box;

		// 课程详情
		&-detail {
			padding: 0 32rpx 20rpx 32rpx;
			// min-height: 702rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16rpx;

			&-tab {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-item {
					padding: 30rpx;
					font-weight: 600;
					font-size: 28rpx;
				}

				&-active {
					position: relative;
					color: #DE501F;

					&:before {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 20rpx;
						margin-left: -12rpx;
						width: 24rpx;
						height: 4rpx;
						background: #DE501F;
						border-radius: 3rpx;
					}
				}
			}

			&-content {
				padding: 30rpx 0;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			&-evaluate {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding: 32rpx 0;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-img {
					flex-shrink: 0;
					margin-right: 28rpx;
					width: 88rpx;
					height: 88rpx;
					border-radius: 16rpx;
				}

				&-text {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #838899;
				}

				&-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 510rpx;
					
					&-img {
						margin-right: 8rpx;
						width: 24rpx;
						height: 24rpx;
					}
				}

				&-info2 {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				&-info3 {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-left: 22rpx;
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
		}

	}
	.default-empty{
		margin-top: 0;
		height: 80vh;
	}
</style>
