<template>
	<view class="class-content" @click="handleNavTo">
		<view class="class-content-top">
			<text>下节课：{{data.nextCLassTime || '已结课'}}</text>
			<text class="color fw4">{{classStatus[data.classStatus]}}</text>
		</view>
		<view class="class-content-bottom">
			<view class="class-content-left">
				<van-image use-error-slot class="class-content-img"  radius="10" width="140" height="132" :src="item.coverImage" >
s				</van-image>
			</view>
			<view class="">
				<!-- 班级名称 -->
				<view class="class-content-info">
					<view class="class-content-info-title">
						<text class="class-content-info-num">{{data.typeName}}</text>
						<text>{{data.className}}</text>
					</view>
					<view class="color">
						<text class="fz24">￥</text>
						<text class="fz32">{{data.price || 0}}</text>
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
					<text>上课时段：每天{{data.startPeriod}}~{{data.endPeriod}}</text>
				</view>
				<!-- 教练 -->
				<view class="class-content-cycle">
					<image class="class-content-cycle-img" src="/static/class/coach.png" mode="widthFix"></image>
					<text>教练：{{data.staffName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			isTeach:{
				default: 1
			},
			data:{
				default:()=>{
					return {}
				}
			},
			classStatus:{
				default:()=>{
					return {}
				}
			}
		},
		methods:{
			handleNavTo(){
				if(this.data.classStatus==0){
					this.$utils.router.navTo(this.$page.OrderInfo,{classInfoId: this.data.classId})
				} else {
					this.$utils.router.navTo(this.$page.ClassDetail,{classId: this.data.classId})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class {
		&-content {
			margin: 32rpx 32rpx 0 32rpx;
			padding: 0 32rpx 32rpx 32rpx;
			// min-height: 344rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			&-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #141D3D;
				
			}
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
			&-section{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 32rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 32rpx;
			}
			&-info{
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				width: 470rpx;
				margin-bottom: 12rpx;
				&-title{
					width: 300rpx;
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
			}
		}
	}
</style>
