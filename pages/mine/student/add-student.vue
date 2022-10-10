<template>
  <view class="add-student">
    <view class="add-student-content">
      <uni-forms
        ref="customForm"
        :rules="customRules"
        :modelValue="customFormData"
        labelWidth="100"
      >
        <uni-forms-item
          label="姓名"
          required
          name="studentName"
          errorMessage=" "
        >
          <uni-easyinput
            maxlength="20"
            v-model="customFormData.studentName"
            placeholder="请输入姓名"
          />
        </uni-forms-item>
        <uni-forms-item label="证件号码" name="idCard">
          <uni-easyinput
            maxlength="20"
            @blur="handleChage"
            @input="handleInput"
            v-model="customFormData.idCard"
            placeholder="请输入证件号码"
          />
        </uni-forms-item>
        <uni-forms-item label="性别" required name="gender" errorMessage=" ">
          <view @click="handleShow">
            <uni-easyinput
              disabled
              :styles="{
                disableColor: '#fff',
                color: '#333',
                borderColor: '#e5e5e5'
              }"
              v-model="customFormData.gender"
              placeholder="请选择性别"
            />
          </view>
        </uni-forms-item>
        <uni-forms-item
          label="出生日期"
          required
          name="birthday"
          errorMessage=" "
        >
          <uni-datetime-picker
            :border="false"
            type="date"
            :value="customFormData.birthday"
            :end="endTime"
            @change="change"
            placeholder="请选择出生日期"
            :placeholderStyle="birthday ? 'color: rgba(245,108,108,0.6);' : ''"
          />
        </uni-forms-item>
      </uni-forms>
    </view>

    <view
      class="add-student-footer2"
      :style="{ marginBottom: `${safeAreaHeight}px` }"
    ></view>
    <view class="add-student-footer">
      <view class="add-student-tip">提示： 收集您孩子信息用于拼课。</view>
      <view
        class="add-student-footer-button"
        :style="{ marginBottom: `${safeAreaHeight}px` }"
        @click="submit('customForm')"
      >
        提 交
      </view>
    </view>
    <popup-sex ref="popupSex" @confirm="getSex" />
    <!-- 充值 -->
    <recharge ref="recharge" @success="confirm" />
  </view>
</template>

<script>
import PopupSex from '../components/PopupSex/PopupSex.vue'
import Validate from '@/utils/validate.js'
import mixin from '@/mixin.js'
import Recharge from '@/components/Recharge/Recharge.vue'
const validates = new Validate()
export default {
  mixins: [mixin],
  components: { PopupSex, Recharge },
  data() {
    const self = this
    return {
      endTime: '',
      // 自定义表单数据
      customFormData: {
        studentName: '',
        gender: '',
        idCard: '',
        birthday: ''
      },
      birthday: false,
      range: [
        {
          value: 1,
          text: '男'
        },
        {
          value: 2,
          text: '女'
        }
      ],
      // 自定义表单校验规则
      customRules: {
        studentName: {
          rules: [
            {
              required: true,
              errorMessage: '请输入姓名'
            }
          ]
        },
        gender: {
          rules: [
            {
              required: true,
              errorMessage: '请选择性别'
            }
          ]
        },
        idCard: {
          rules: [
            {
              required: false,
              errorMessage: '请输入证件号码'
            }
            // {
            // 	validateFunction: function(rule, value, data, callback) {
            // 		const val = validates.validateIdNum(value);
            // 		if (val) {
            // 			return val;
            // 		} else {
            // 			callback("请输入正确证件号码");
            // 		}
            // 	},
            // },
          ]
        },
        birthday: {
          rules: [
            {
              required: true,
              errorMessage: '请选择出生日期'
            }
          ]
        },
        classId: null,
        sort: null
      }
    }
  },
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    this.onLaunch()
    this.$refs.customForm.setRules(this.customRules)
    this.endTime = this.$utils.dateTime.getLocalTime()
  },
  onLoad(e) {
    const { classId, sort } = e
    this.classId = classId
    this.sort = sort
  },
  methods: {
    handleInput(e) {
      console.log('birthday', e)
      const birthday = this.$utils.dateTime.getBirthday(e)
      if (birthday.indexOf('-') > -1 && e.length >= 18) {
        this.customFormData.birthday = birthday
      }
      if (e.length >= 18) {
        const sex = this.$utils.dateTime.getSex(e)
        this.customFormData.gender = sex
      }
    },
    handleChage(e) {
      const birthday = this.$utils.dateTime.getBirthday(e.detail.value)
      this.customFormData.birthday = birthday
      if (e.length >= 18) {
        const sex = this.$utils.dateTime.getSex(e.detail.value)
        this.customFormData.gender = sex
      }
    },
    change(e) {
      this.customFormData.birthday = e
      console.log('-change事件:', e)
    },
    handleShow() {
      this.$refs.popupSex.toggle(this.customFormData.gender)
    },
    getSex(e) {
      console.log(e)
      this.customFormData.gender = e
    },
    submit(ref) {
      const self = this
      this.$refs[ref]
        .validate()
        .then(res => {
          console.log('success', res)
          self.birthday = false
          self.$http['mine']
            .setStudent({
              ...self.customFormData,
              gender: self.customFormData.gender === '男' ? '1' : '2'
            })
            .then(res => {
              console.log(res)
              if (res.code === 200) {
                if (self.classId) {
                  self.studentId = res.data
                  self.confirm()
                } else {
                  self.$utils.router.navBack()
                }
              }
            })
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 加入拼班
    confirm() {
      const self = this
      let list = []
      this.sort++
      list.push({
        classStudentId: '',
        sort: this.sort,
        studentId: self.studentId
      })
      this.$http['classes']
        .indexAddStu({
          classId: self.classId,
          stuInfo: list
        })
        .then(res => {
          if (res.code === 200) {
            if (!res.data) {
              self.$utils.model.showMsgModal({
                content: '保存成功。课款不足是否充值',
                confirmText: '充值',
                showCancel: true,
                confirmCallback: function() {
                  self.$refs.recharge.handleShow(true)
                },
                failCallback: function() {
                  self.$utils.model.showToast(
                    '添加学员成功。但不满足加入班级条件',
                    2500
                  )
                  setTimeout(() => {
                    self.$utils.router.navBack()
                  }, 1500)
                }
              })
            } else {
              self.$utils.model.showToast('保存成功。学员成功添加到班级', 2500)
              setTimeout(() => {
                self.$utils.router.navBack()
              }, 1500)
            }
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.add-student {
  min-height: 100vh;
  background: #eef1fa;

  &-content {
    position: relative;
    top: 32rpx;
    left: 32rpx;
    padding: 0 28rpx;
    width: 686rpx;
    // height: 314rpx;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 16px;
  }

  &-footer2 {
    height: 92rpx;
    padding: 32rpx 30rpx;
  }
  &-tip {
    font-size: 22rpx;
    text-align: center;
    padding-bottom: 16rpx;
    color: red;
  }

  &-footer {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    padding: 16rpx 30rpx 32rpx 30rpx;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 36rpx 36rpx 0rpx 0rpx;

    &-button {
      width: 690rpx;
      height: 92rpx;
      background: #de501f;
      border-radius: 16rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
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
  border-bottom: 2rpx solid #f3f3f5;
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

/deep/.uni-date-single {
  text-align: right;
  padding: 0;
}

/deep/.uniui-calendar {
  display: none;
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
