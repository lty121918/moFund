<template>
	
	<view class="class-detail" >
		<view class="default-empty" v-if="!data.phone">
		  <image
		    class="default-empty-image"
		    :src="require('@/static/notData.png')"
		    mode="widthFix"
		  ></image>
		  <view class="">暂无数据</view>
		</view>
		<view class="class-detail-user" v-if="data.phone">
			<view class="home-title" v-if="data.phone">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFill"></image>
					<text>团长</text>
				</view>
			</view>
			<view class="class-detail-head" v-if="data.phone">
				<view class="class-detail-head-flex">
					<image class="class-detail-head-img" :src="data.avatar" mode="aspectFill"></image>
					<text class="fwb fz32">{{data.nickName || '微信昵称'}}</text>
					<image class="class-detail-head-icon" src="/static/class/head.png" mode="aspectFill"></image>
				</view>
				<view class="class-detail-head-contact" @click="handlePhone(data.phone)">
					<text>{{data.phone}}</text>
				</view>
			</view>
			<view class="home-title" v-if="data.classAddressBookCoachVO">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFill"></image>
					<text>教练</text>
				</view>
			</view>
			<view class="class-detail-head" v-if="data.classAddressBookCoachVO">
				<view class="class-detail-head-flex">
					<image class="class-detail-head-img" :src="data.classAddressBookCoachVO.avatar" mode="aspectFill"></image>
					<text class="fwb fz32">{{data.classAddressBookCoachVO.nickName || '微信昵称'}}</text>
					<image class="class-detail-head-icon" src="/static/class/head.png" mode="aspectFill"></image>
				</view>
				<view class="class-detail-head-contact" @click="handlePhone(data.classAddressBookCoachVO.phone)">
					<text>{{data.classAddressBookCoachVO.phone}}</text>
				</view>
			</view>
			<view class="home-title" v-if="data.classAddressBookStudentList">
				<view class="home-title-item">
					<image class="home-title-img" src="/static/home/icon.png" mode="aspectFill"></image>
					<text>团员</text>
				</view>
			</view>
			<view class="class-detail-stu">
				<view class="class-detail-stu-flex fz28" v-for="(row,index) in classAddressBookStudentList" :key="row.id">
					<image class="class-detail-stu-img" :src="row.avatar" mode="aspectFill"></image>
					<view class="fwb class-detail-stu-name">{{row.studentName}}</view>
					<view class="class-detail-stu-sex">{{row.gender==1?'男':'女'}}</view>
					<view class="class-detail-stu-age">{{row.age}}岁</view>
					<view class="class-detail-stu-contact" :data-phone="row.phone" @click="handlePhone">
						<text >{{row.phone}}</text>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/mixin.js'
	import vanImage from '@/wxcomponents/vant/image/index'
	export default {
		mixins: [mixin],
		components: {
			vanImage
		},
		// computed: {
		//   url() {
		//     return this.$url
		//   }
		// },
		props: {
			classId: {}
		},
		data() {
			return {
				data: {},
				classAddressBookStudentList:[]
			}
		},
		mounted() {
			this.handlePhoneList()
		},
		methods: {
			handlePhoneList() {
				this.$http['classes'].getClassInfo({
					classInfoId: this.classId,
				}).then(res => {
					if (res.code == 200) {
						let _this=this
						res.data.avatar=remoteAvatar(res.data.avatar)
						res.data.classAddressBookCoachVO.avatar=remoteAvatar(res.data.classAddressBookCoachVO.avatar)
						for (let i = 0; i < res.data.classAddressBookStudentList.length; i++) {
							res.data.classAddressBookStudentList[i].avatar=remoteAvatar(res.data.classAddressBookStudentList[i].avatar)
						}
						this.data = res.data
						this.classAddressBookStudentList= JSON.parse(JSON.stringify(res.data.classAddressBookStudentList))
						
						//处理头像
						function remoteAvatar(val) {
							if (val && val.indexOf('http') == -1) {
								val = _this.$url + val
							}
							if (!val) {
								val = _this.avatar
							}
							return val
						}
					}
				})

			},
			// 联系团长
			handlePhone(e) {
				const val = e.currentTarget.dataset.phone
				wx.makePhoneCall({
					phoneNumber: val+'' //仅为示例，并非真实的电话号码
				}).catch((e) => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-title {
		padding-top: 32rpx !important;
	}

	.class-detail {
		min-height: 100vh;
		background: #EEF1FA;
		box-sizing: border-box;
		padding: 32rpx 0 0 0;

		&-user {
			margin-top: 30rpx;
			margin-left: 32rpx;
			padding-bottom: 32rpx;
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
		}

		&-attendance {
			&-item {
				margin: 0 32rpx;
				padding: 32rpx 0;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
			}

			&-check {
				margin-right: 24rpx;
				flex-shrink: 0;
				width: 36rpx;
				height: 36rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #E7E8EB;
			}

			&-title {
				margin-top: 30rpx;
				margin-left: 32rpx;
				padding: 0 32rpx;
				width: 622rpx;
				height: 64rpx;
				box-sizing: border-box;
				background: rgba(20, 29, 61, 0.05);
				;
				border-radius: 12rpx;
				font-size: 24rpx;
			}

			&-img {
				margin-right: 10rpx;
				width: 24rpx;
				height: 24rpx;
			}
		}

		&-adduser {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 32rpx 0 0 32rpx;
			width: 156rpx;
			height: 52rpx;
			background: #DE501F;
			border-radius: 12rpx;
			font-size: 24rpx;
			font-family: SourceHanSansSC-Regular, SourceHanSansSC;
			font-weight: 400;
			color: #FFFFFF;

			&-add {
				margin-right: 8rpx;
				width: 24rpx;
				height: 26rpx;
			}
		}

		&-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;

			&-flex {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;
			}

			&-img {
				flex-shrink: 0;
				margin-right: 26rpx;
				width: 88rpx;
				height: 88rpx;
				background: #cecece;
				border-radius: 50%;
			}

			&-icon {
				position: absolute;
				left: 71rpx;
				bottom: -17rpx;
				width: 34rpx;
				height: 34rpx;
			}

			&-share {
				flex-shrink: 0;
				width: 60rpx;
				height: 60rpx;
			}

			&-contact {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #DE501F;
				font-size: 32rpx;
				font-family: SourceHanSansSC-Regular, SourceHanSansSC;
				font-weight: 500;
			}

			&-liao {
				margin-right: 8rpx;
				width: 24rpx;
				height: 24rpx;
			}
		}

		&-stu {
			padding: 0 32rpx;

			&-flex {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 32rpx 0;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);
			}

			&-name {
				width: 200rpx;
			}

			&-sex {
				text-align: center;
				width: 80rpx;
			}

			&-age {
				text-align: center;
				width: 100rpx;
			}

			&-contact {
				display: flex;
				width: 240rpx;
				margin-left: 85rpx;
				color: #DE501F;
				font-size: 32rpx;
				font-family: SourceHanSansSC-Regular, SourceHanSansSC;
				font-weight: 500;
			}

			&-status {
				width: 120rpx;
				font-size: 28rpx;
			}

			&-tip {
				width: 116rpx;
			}

			&-tip2 {
				display: inline-block;
				width: 116rpx;
				height: 40rpx;
				background: rgba(222, 80, 31, 0.1000);
				border-radius: 6rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #DE501F;
				text-align: center;
				line-height: 40rpx;
			}

			&-img {
				flex-shrink: 0;
				margin-right: 24rpx;
				width: 48rpx;
				height: 46rpx;
				border-radius: 50%;
			}

			&-icon {
				margin-left: 30rpx;
				flex-shrink: 0;
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
</style>
