<template>
	<view class="class-content" @click="handleNavTo">
		<view class="class-content-top" v-if="type!=3">
			<text >
				<text v-if="data.classStatus==1 ||data.classStatus==3">下节课：{{data.nextCLassTime || '已结课'}}</text>
			</text>
			<text class="color fw4">{{classStatus[data.classStatus]}}</text>
		</view>
		<view class="class-content-bottom">
			<view class="class-content-left">
				<van-image use-error-slot class="class-content-img" fit="cover"  radius="10" width="140" height="132" :src="data.coverImage" >
				</van-image>
			</view>
			<view class="">
				<!-- 班级名称 -->
				<view class="class-content-info">
					<view class="class-content-info-title">
						<text class="class-content-info-num">{{data.typeName || data.spellType}}</text>
						<text>{{data.className}}</text>
					</view>
					<view class="color">
						<text class="fz24">￥</text>
						<text class="fz32">{{data.price || 0}}</text>
						<text class="color3 fz24">/节</text>
					</view>
				</view>
				<!-- 上课周期 -->
				<view class="class-content-cycle" v-if="data.startDate">
					<image class="class-content-cycle-img" src="/static/class/cycle.png" mode="widthFix"></image>
					<text>上课周期：{{data.startDate}}~{{data.endDate}}</text>
				</view>
				<!-- 上课时段 -->
				<view class="class-content-cycle" v-if="data.startPeriod || data.startTime">
					<image class="class-content-cycle-img" src="/static/class/time.png" mode="widthFix"></image>
					<text>上课时段：{{data.courseType==2?'每天':(data.weekCodeName||'')}} {{data.startPeriod || data.startTime || ''}}~{{data.endPeriod || data.endTime ||''}}</text>
				</view>
				<!-- 教练 -->
				<view class="class-content-cycle" v-if="type==1">
					<image class="class-content-cycle-img" src="/static/class/coach.png" mode="widthFix"></image>
					<text>教练：{{data.staffName}}</text>
				</view>
			</view>
		</view>
		<view class="class-content-tip" v-if="type==2 && isTeach==2 && !data.isSufficient && data.isSufficient!=null">
			您的余额不足，为保证上课不受影响，请尽快充值!
		</view>
	</view>
</template>

<script>
	import vanImage from '@/wxcomponents/vant/image/index'
	export default{
		components:{vanImage},
		props:{
			type:{
				default: 1
			},
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
				if(this.type==1){
					if(this.data.classStatus==0){
						this.$utils.router.navTo(this.$page.OrderInfo,{classId: this.data.classId})
					} else {
						this.$utils.router.navTo(this.$page.ClassDetail,{classId: this.data.classId})
					}
				} else if(this.type==3){
					this.$utils.router.navTo(this.$page.CourseDetail,{productId: this.data.productId,campusId: this.data.campusId})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class {
		&-content {
			margin:0 32rpx 32rpx  32rpx;
			padding: 0 32rpx 32rpx 32rpx;
			// min-height: 344rpx;
			// background: #FFFFFF;
			border-radius: 16rpx;
			background-image: url('~@/static/class/class-item.png');
			background-size: 100%;
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
					width: 310rpx;
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
			&-tip {
				margin: 32rpx auto 0rpx auto;
				width: 542rpx;
				height: 48rpx;
				background: rgba(222, 80, 31, 0.1);
				border-radius: 12rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #DE501F;
				line-height: 48rpx;
				text-align: center;
			}
		}
	}
</style>
