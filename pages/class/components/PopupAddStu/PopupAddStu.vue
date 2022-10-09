<template>
  <view class="">
    <uni-popup ref="popup" @change="change">
      <view class="popup-content">
        <!-- 当前商品信息 -->

        <view class="popup-content-item">
          <view
            class="popup-content-child"
            v-for="item in data"
            :key="item.id"
            @click="changeBox(item)"
          >
            <view
              v-if="boxActive.indexOf(item.id) == -1"
              class="popup-content-child-check"
              :class="[
                activeData.indexOf(item.id) == -1
                  ? ''
                  : 'popup-content-child-dis'
              ]"
            ></view>
            <image
              v-else
              class="popup-content-child-check"
              src="/static/checkbox.png"
              mode="widthFix"
            ></image>
            <view class="">
              <view class="flex-start">
                <text>姓名：{{ item.studentName }} - {{ item.age }}岁</text>
                <image
                  class="popup-content-child-sex"
                  :src="
                    item.gender == 1 ? '/static/sex-m.png' : '/static/sex-w.png'
                  "
                  mode="widthFix"
                ></image>
              </view>
              <view class="mt12">证件号码：{{ item.idCard || '' }}</view>
              <view class="mt12">出生日期：{{ item.birthday }}</view>
            </view>
          </view>
          <view class="default-empty" v-if="data.length === 0">
            <image
              class="default-empty-image"
              :src="require('@/static/notData.png')"
              mode="widthFix"
            ></image>
            <view class="">暂无数据</view>
          </view>
        </view>

        <view class="popup-footer">
          <view class="popup-footer-button popup-footer-button1" @click="close">
            取消
          </view>
          <view
            class="popup-footer-button popup-footer-button1"
            @click="handelAdd"
          >
            添加学员
          </view>
          <view class="popup-footer-button" @click="submit">确认</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      boxActive: [],
      data: [],
      activeData: [], //已经选中的学员
      classId: '',
      num: 0,
      list: {}
    }
  },
  methods: {
    // 选择学员
    changeBox(val) {
      if (this.activeData.indexOf(val.id) > -1) {
        return false
      }
      let index = this.boxActive.indexOf(val.id)
      console.log(val, index)
      if (index > -1) {
        this.boxActive.splice(index, 1)
      } else {
        this.boxActive.push(val.id)
      }
    },
    // 曲去添加新学员
    handelAdd() {
      this.close()
      this.$utils.router.navTo(this.$page.AddStudent)
    },
    // 确认添加学员
    submit() {
      const self = this
      const data = [...this.activeData, this.boxActive]
      if (data.length >= this.list.maxNum) {
        // 加入拼班成功将自动支付首节课课款
        self.$utils.model.showMsgModal({
          content: '加入拼班视为您同意自动约课，是否确认？',
          confirmText: '确认',
          showCancel: true,
          confirmCallback: function() {
            self.confirm()
          }
        })
      } else {
        // 加入拼班将冻结课款，拼班成功自动支付首节课课款
        self.$utils.model.showMsgModal({
          content:
            '约课将自动冻结上课费用，如未退出班级，上课后不再退费。是否确认？',
          confirmText: '确认',
          showCancel: true,
          confirmCallback: function() {
            self.confirm()
          }
        })
      }
    },
    confirm() {
      const self = this
      let list = []
      this.boxActive.forEach(item => {
        this.num++
        list.push({
          classStudentId: '',
          sort: this.num,
          studentId: item
        })
      })
      this.$http['classes']
        .indexAddStu({
          classId: self.classId,
          stuInfo: list
        })
        .then(res => {
          if (res.code == 200) {
            if (!res.data) {
              self.$utils.model.showMsgModal({
                content: '您的余额不足，最少需要满足一节课的余额！',
                confirmText: '去充值',
                showCancel: true,
                confirmCallback: function() {
                  self.$emit('recharge')
                }
              })
            } else {
              // self.$utils.model.showToast('参与拼班将冻结课款，拼班成功后自动扣课款。', 2500)
            }
            self.close()
            self.$emit('change')
          }
        })
    },
    change(e) {
      console.log('当前模式：' + e.type + ',状态：' + e.show)
      if (!e.show) {
        this.boxActive = []
        this.data = []
        this.activeData = [] //已经选中的学员
        this.classId = ''
        this.num = 0
      }
    },
    close() {
      this.boxActive = []
      this.data = []
      this.activeData = [] //已经选中的学员
      this.classId = ''
      this.num = 0
      this.$refs.popup.close('bottom')
    },
    async handleShow(classId, ls, data) {
      this.classId = classId
      this.activeData = ls
      this.num = ls.length
      this.list = data
      const res = await this.$http['mine'].getStudent()
      if (res.code == 200) {
        res.data = res.data || []
        res.data.forEach(item => {
          item.birthday = this.$utils.dateTime.getLocalTime(item.birthday || '')
        })
        this.data = res.data || []
        this.$refs.popup.open('bottom')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.popup {
  &-content {
    width: 750rpx;
    padding: 36rpx 32rpx 0 32rpx;
    max-height: 1052rpx;
    box-sizing: border-box;
    background: #ffffff;
    // box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 36rpx 36rpx 0rpx 0rpx;

    &-item {
      height: 588rpx;
      background: #ffffff;
      overflow-y: scroll;
    }

    &-child {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 32rpx;
      padding: 22rpx 32rpx;
      box-sizing: border-box;
      width: 686rpx;
      height: 176rpx;
      background: rgba(20, 29, 61, 0.05);
      border-radius: 16rpx;
      font-size: 24rpx;
      font-family: SourceHanSansSC-Regular, SourceHanSansSC;
      font-weight: 400;
      color: #141d3d;

      &-check {
        margin-right: 52rpx;
        flex-shrink: 0;
        width: 36rpx;
        height: 36rpx;
        background: #ffffff;
        border-radius: 8rpx;
        border: 2rpx solid #e7e8eb;
      }

      &-dis {
        background: #e7e8eb;
      }

      &-sex {
        margin-left: 20rpx;
        width: 28rpx;
        height: 28rpx;
      }
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx 0;
    box-sizing: border-box;
    background: #ffffff;

    &-button {
      width: 220rpx;
      height: 92rpx;
      background: #de501f;
      border-radius: 16rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 92rpx;
      border: 2rpx solid #de501f;
    }

    &-button1 {
      color: #de501f;
      background: #ffffff;
    }
  }
}
.default-empty {
  margin: 0rpx;
}
</style>
