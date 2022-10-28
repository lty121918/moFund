<template>
	<view class="add-declare">
		<view class="add-declare-content">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" labelWidth="100">
				<uni-forms-item label="社区名称" required name="campusName"  errorMessage=" ">
					<uni-easyinput maxlength="50" v-model="customFormData.campusName" placeholder="请输入社区名称" />
				</uni-forms-item>
				<uni-forms-item label="社区物业" required name="property"  errorMessage=" ">
					<textarea maxlength="200" :placeholder-style="`font-size:24rpx;color: #888;${property?'color: rgba(245,108,108,0.6);':''}`" :style="property?'border-color: rgba(245,108,108,1);':''" class="add-declare-textarea" v-model="customFormData.property"
						placeholder="请输入社区物业" />
					<!-- <uni-easyinput type="textarea" maxlength="200" v-model="customFormData.property" placeholder="请输入社区物业" /> -->
				</uni-forms-item>
				<uni-forms-item label="社区场地" required name="campusSpace"  errorMessage=" ">
					<textarea maxlength="500" :placeholder-style="`font-size:24rpx;color: #888;${campusSpace?'color: rgba(245,108,108,0.6);':''}`" :style="campusSpace?'border-color: rgba(245,108,108,1);':''" class="add-declare-textarea" v-model="customFormData.campusSpace"
						placeholder="请输入社区场地" />
					<!-- <uni-easyinput type="textarea" maxlength="500" v-model="customFormData.campusSpace"
					 placeholder="请输入社区场地" /> -->
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="add-declare-footer2" :style="{ marginBottom: `${safeAreaHeight}px` }"></view>
		<view class="add-declare-footer">
			<view class="add-declare-footer-button" :style="{ marginBottom: `${safeAreaHeight}px` }"
				@click="submit('customForm')">
				提 交
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
				// 自定义表单数据
				customFormData: {
					campusName: '',
					property: '',
					campusSpace: ''
				},
				property: false,
				campusSpace: false,
				// 自定义表单校验规则
				customRules: {
					campusName: {
						rules: [{
							required: true,
							errorMessage: '请输入社区名称'
						}]
					},
					property: {
						rules: [{
							required: true,
							errorMessage: '请输入社区物业'
						}]
					},
					campusSpace: {
						rules: [{
							required: true,
							errorMessage: '请输入社区场地'
						}]
					}

				},
			}
		},
			
		watch:{
			'customFormData.property':{
				handler(newVal){
					if(newVal){
						this.property = false
					} else {
						this.property = true
					}
				},
				deep: true
			},
			'customFormData.campusSpace':{
				handler(newVal){
					if(newVal){
						this.campusSpace = false
					} else {
						this.campusSpace = true
					}
				},
				deep: true
			}
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			submit(ref) {
				const self = this
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					self.property = false
					self.campusSpace = false 
					this.$http['map'].setCampusApply(this.customFormData).then(res => {
						if (res.code == 200) {
							self.$utils.router.redTo(this.$page.Declare)
						}
					})
				}).catch(err => {
					const ls = err.filter(item=>item.key == 'property')
					const ls2 = err.filter(item=>item.key == 'campusSpace')
					if(ls.length>0){
						self.property = true
					} else {
						self.property = false
					}
					if(ls2.length>0){
						self.campusSpace = true
					} else {
						self.campusSpace = false
					}
					console.log('err', err);
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.add-declare {
		min-height: 100vh;
		background: #EEF1FA;

		&-content {
			position: relative;
			top: 32rpx;
			left: 32rpx;
			padding: 11rpx 28rpx 32rpx 28rpx;
			width: 686rpx;
			// height: 314rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16px;
		}

		&-textarea {
			width: 100%;
			padding: 20rpx 24rpx;
			border: 2rpx solid #DCDFE6;
			border-radius: 4px;
			box-sizing: border-box;
			font-size: 24rpx;
		}

		&-footer2 {
			height: 92rpx;
			padding: 32rpx 30rpx;
		}

		&-footer {
			position: fixed;
			bottom: 0;
			z-index: 99;
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

	/deep/.uni-forms-item {
		padding: 16rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		box-sizing: border-box;
		min-height: 106rpx;
		margin-bottom: 0;
		border-bottom: 2rpx solid #F3F3F5;

		&:last-child {
			border-bottom: none;
		}
	}

	// /deep/.uni-forms-item__label{
	// 	height: auto !important;
	// }
	/deep/.is-input-border {
		// border: none;
	}

	/deep/.uni-easyinput__content-input {
		// text-align: right;
	}

	// /deep/.uni-forms-item__error{
	// 	top: 70%;
	// 	left: unset;
	// 	right: 0;
	// }
	/deep/.uni-easyinput__content-textarea {
		margin: 8px 0 !important;
		// text-align: right;
		// line-height: normal !important;
		// font-size: 28rpx;
	}
</style>
