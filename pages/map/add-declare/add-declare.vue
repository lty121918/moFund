<template>
	<view class="add-declare">
		<view class="add-declare-content">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" labelWidth="100">
				<uni-forms-item label="社区名称" required name="name">
					<uni-easyinput maxlength="50" v-model="customFormData.name" placeholder="请输入社区名称" />
				</uni-forms-item>
				<uni-forms-item label="社区物业" required name="property">
					<uni-easyinput  maxlength="200" v-model="customFormData.property" placeholder="请输入社区物业" />
				</uni-forms-item>
				<uni-forms-item label="社区场地" required name="field">
					<uni-easyinput maxlength="500" v-model="customFormData.field" placeholder="请输入社区场地" />
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
					name: '',
					property: '',
					field: ''
				},
				// 自定义表单校验规则
				customRules: {
					name: {
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
					field: {
						rules: [{
							required: true,
							errorMessage: '请输入社区场地'
						}]
					}

				},
			}
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
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
		&-content{
			position: relative;
			top: 32rpx;
			left: 32rpx;
			padding: 0 28rpx;
			width: 686rpx;
			// height: 314rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 16px;
		}
		&-footer2{
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
	/deep/.uni-forms-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 106rpx;
		margin-bottom: 0;
		border-bottom: 2rpx solid #F3F3F5;
	}
	/deep/.is-input-border{
		border: none;
	}
	/deep/.uni-easyinput__content-input{
		text-align: right;
	}
	/deep/.uni-forms-item__error{
		top: 70%;
		left: unset;
		right: 0;
	}
</style>
