<template>
	<view class="student">
		<y-list ref="yList" :scrollClass="'student-scroll-class'" :setData="search">
			<template slot-scope="{data}">
				<view class="flex-start mr32 ml32 mt32">
					<image class="student-head-img" :src="userInfo.avatar" mode="aspectFit"></image>
					<view>
						<view>
							<text class="student-head-name">{{userInfo.name}}</text>
							<text class="student-head-role">家长</text>
						</view>
						<view class="fz28 colorw mt16">{{userInfo.phone}}</view>
					</view>
				</view>
				<view class="flex-bc student-content" v-for="(item,index) in data" :key="index">
					<view class="">
						<view class="flex-sc">
							<text>姓名：{{item.studentName}} - {{item.age}}岁</text>
							<image class="student-sex" :src="item.gender==1?'/static/sex-m.png':'/static/sex-w.png'" mode="widthFix"></image>
						</view>
						<view class="pt16">证件号码：{{item.idCard}}</view>
						<view class="pt16">出生日期：{{item.birthday}}</view>
					</view>
					<view class="student-status" @click="handleDel(item)">
						<image class="student-head-del" src="/static/del.png" mode="aspectFit"></image>
					</view>
				</view>
			</template>
		</y-list>
		<view class="student-footer">
			<view class="student-footer-button" :style="{ marginBottom: `${safeAreaHeight}px` }" @click="submit">
				添加学员
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		data() {
			return {
			}
		},
		computed: {},
		onShow() {
			this.$refs.yList.init()	
		},
		methods: {
			submit() {
				this.$utils.router.navTo(this.$page.AddStudent)
			},
			handleDel(item){
				const self =this 
				this.$utils.model.showMsgModal({
					content:'确认要删除该学员嘛？',
					showCancel:true,
					confirmCallback:()=>{
						console.log('确认');
						self.$http['mine'].delStudent(item.id).then(res=>{
							console.log(res);
							if(res.code==200){
								self.$refs.yList.init()
							}
						})
					},
					cancelCallback:()=>{
						console.log('取消');
					}
				})
			},
			// 模拟请求数据
			search() {
				const self = this
				return new Promise(async (resolve, reject) => {
					let data = []
					const res =await self.$http['mine'].getStudent()
					if(res.code==200){
						data = res.data
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
	.student-scroll-class {
		height: calc(100vh - 160rpx);
	}
</style>
<style lang="scss" scoped>
	.student {
		min-height: 100vh;
		background: #EEF1FA;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: -150rpx;
			width: 1050rpx;
			height: 280rpx;
			background: linear-gradient(180deg, #DE501F 0%, #DE501F 100%);
			border-bottom-left-radius: 50%;
			border-bottom-right-radius: 50%;
		}

		&-sex {
			margin-left: 20rpx;
			width: 28rpx;
			height: 28rpx;
		}

		&-content {
			position: relative;
			margin: 32rpx 32rpx 0 32rpx;
			padding: 32rpx;
			width: 686rpx;
			min-height: 160rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			border-radius: 16rpx;
			font-size: 28rpx;
			font-family: SourceHanSansSC-Regular, SourceHanSansSC;
			font-weight: 400;
			color: #141D3D;
		}

		&-head {
			&-img {
				margin-right: 28rpx;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}

			&-name {
				height: 48rpx;
				font-size: 32rpx;
				font-family: SourceHanSansSC-Bold, SourceHanSansSC;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 48rpx;
			}

			&-role {
				display: inline-block;
				margin-left: 16rpx;
				min-width: 72rpx;
				height: 32rpx;
				text-align: center;
				background: linear-gradient(180deg, #FFCA3F 0%, #ED8A00 100%);
				border-radius: 12rpx 12rpx 12rpx 0rpx;
				border: 2rpx solid #FFFFFF;
				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 34rpx;
			}
			&-del{
				width: 64rpx;
				height: 64rpx;
			}
			
		}

		&-footer2 {
			height: 92rpx;
			padding: 32rpx 30rpx;
		}

		&-footer {
			position: fixed;
			bottom: 0;
			width: 750rpx;
			padding: 32rpx 30rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 36rpx 36rpx 0rpx 0rpx;

			&-button {
				width: 690rpx;
				height: 92rpx;
				background: #DE501F;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 92rpx;
			}
		}
	}
</style>
