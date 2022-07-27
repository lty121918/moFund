<template>
	<view class="class-content">
		<view class="class-content-bottom">
			<view class="class-content-left">
				<image class="class-content-img" src="/static/notData.png" mode="widthFix"></image>
			</view>
			<view class="">
				<!-- 班级名称 -->
				<view class="class-content-info">
					<view class="class-content-info-title">
						<text class="class-content-info-num">{{data.spellType}}</text>
						<text>{{data.productName}}</text>
					</view>
					<view class="color">
						<text class="fz24">￥</text>
						<text class="fz32">{{data.price}}</text>
						<text class="color3 fz24">/节</text>
					</view>
				</view>
				<!-- 上课周期 -->
				<view class="class-content-cycle">
					<image class="class-content-cycle-img" src="/static/class/cycle.png" mode="widthFix"></image>
					<text>上课周期：{{data.startDate}}~{{data.endDate}}</text>
				</view>
				<!-- 上课时段 -->
				<view class="class-content-cycle">
					<image class="class-content-cycle-img" src="/static/class/time.png" mode="widthFix"></image>
					<text>上课时段：{{data.courseType==2?'每天':data.weekCodeName}} {{data.startTime}}~{{data.endTime}}</text>
				</view>
		
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
				
			data:{
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class {
		&-head {
			&-address {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #141D3D;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
		
				&-img {
					margin-right: 16rpx;
					width: 18rpx;
					height: 24rpx;
				}
		
				&-icon {
					margin-top: 4rpx;
					margin-left: 12rpx;
					width: 12rpx;
					height: 8rpx;
				}
			}
		}
		&-content {
			margin: 0rpx 32rpx 0 32rpx;
			padding: 0 32rpx 32rpx 32rpx;
			// min-height: 344rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
		
			&-bottom{
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding-top: 34rpx;
			}
			&-left{
				position: relative;
				flex-shrink: 0;
				margin-right: 22rpx;
				width: 140rpx;
				height: 132rpx;
			}
			&-img{
				width: 140rpx;
				height: 132rpx;
			}
			
			&-info{
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				width: 470rpx;
				margin-bottom: 12rpx;
				&-title{
					width: 264rpx;
					font-size: 32rpx;
					font-family: SourceHanSansSC-Bold, SourceHanSansSC;
					font-weight: bold;
					color: #141D3D;
				}
				&-num{
					margin-right: 10rpx;
					padding: 4rpx 8rpx;
					background: rgba(222,80,31,0.1);
					border-radius: 6rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #DE501F;
				}
			}
			
			&-cycle{
				margin-top: 10rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #838899;
				&-img{
					margin-right: 10rpx;
					width: 24rpx;
					height: 24rpx;
				}
				&-tip{
					margin-right: 12rpx;
					padding: 2rpx 8rpx;
					background: rgba(20, 29, 61, 0.1);
					border-radius: 8rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #838899;
				}
			}
		}
	}
</style>
