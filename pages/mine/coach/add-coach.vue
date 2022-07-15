<template>
	<view class="add-coach">
		<view class="add-coach-content">
			<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" labelWidth="100">
				<uni-forms-item label="姓名" required name="name">
					<uni-easyinput maxlength="20" v-model="customFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="证件号码" required name="idCard">
					<uni-easyinput maxlength="20" v-model="customFormData.idCard" placeholder="请输入证件号码" />
				</uni-forms-item>
				<uni-forms-item label="手机号码" required name="phone">
					<uni-easyinput maxlength="11" v-model="customFormData.phone" type="number" placeholder="请输入手机号码" />
				</uni-forms-item>
				<uni-forms-item label="服务社区" required name="community">
					<view class="">
						<uni-easyinput disabled :styles="{disableColor:'#fff',color: '#333',borderColor: '#e5e5e5'}"
							v-model="customFormData.community" placeholder="请选择服务社区" />
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="add-coach-footer2" :style="{ marginBottom: `${safeAreaHeight}px` }"></view>
		<view class="add-coach-footer">
			<view class="add-coach-footer-button" :style="{ marginBottom: `${safeAreaHeight}px` }"
				@click="submit('customForm')">
				提 交
			</view>
		</view>
	</view>
</template>

<script>
	import Validate from '@/utils/validate.js'
	import mixin from '@/mixin.js'
	const validates = new Validate()
	export default {
		mixins: [mixin],
		data() {
			return {
				// 自定义表单数据
				customFormData: {
					name: '',
					idCard: '',
					phone: '',
					community: ''
				},
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '请输入姓名'
						}]
					},
					idCard: {
						rules: [{
								required: true,
								errorMessage: '请输入证件号码'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									const val = validates.validateIdNum(value);
									if (val) {
										return val;
									} else {
										callback("请输入证件号码");
									}
								},
							},
						]
					},
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号码'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									const val = validates.validateTelNum(value);
									if (val) {
										return val;
									} else {
										callback("请输入正确手机号码");
									}
								},
							},
						]
					},
					community: {
						rules: [{
							required: true,
							errorMessage: '请选择服务社区'
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
	.add-coach {
		min-height: 100vh;
		background: #EEF1FA;

		&-content {
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

	/deep/.uni-forms-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 106rpx;
		margin-bottom: 0;
		border-bottom: 2rpx solid #F3F3F5;
	}

	/deep/.is-input-border {
		border: none;
	}

	/deep/.uni-easyinput__content-input {
		text-align: right;
	}

	/deep/.uni-forms-item__error {
		top: 70%;
		left: unset;
		right: 0;
	}
	/deep/.uni-easyinput__placeholder-class {
		color: #666;
	}
	/deep/.is-disabled {
		color: #666 !important;
		/deep/.uni-easyinput__placeholder-class {
		}
	}
</style>
