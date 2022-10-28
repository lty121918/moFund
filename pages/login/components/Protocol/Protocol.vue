<template>
  <view class="withdrawal recharge">
    <uni-popup ref="popup" @change="change">
      <view class="popup-content">
        <view class="modal-text">{{ protocol }}</view>
        <view class="slot-content custorm-modal">
          <!-- <rich-text :nodes="content"></rich-text> -->
          <scroll-view
            scroll-y="true"
            style="height: 560rpx; margin-top: 20rpx; font-size: 28rpx;"
          >
            <!-- <u-parse :html="content"></u-parse> -->
            <rich-text :nodes="content"></rich-text>
          </scroll-view>
        </view>
        <view class="popup-footer flex-cc">
          <view class="popup-footer-button colorw ml32 bg-color" @click="close">
            确认
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: 'sex',
  data() {
    return {
      protocol: '',
      content: ''
    }
  },
  methods: {
    change(e) {
      console.log('当前模式：' + e.type + ',状态：' + e.show)
    },
    toggle(val) {
      this.$refs.popup.open('center')
      this.protocol = val.protocolTitle
      this.content = val.protocolContent
    },
    close() {
      this.$refs.popup.close('center')
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  &-content {
    width: 750rpx;
    padding: 32rpx;
    max-height: 1052rpx;
    box-sizing: border-box;
    overflow-y: scroll;
    background: #ffffff;
    border-radius: 36rpx;
  }

  &-footer {
    padding-top: 32rpx;
    box-sizing: border-box;
    background: #ffffff;

    &-button {
      width: 100%;
      height: 92rpx;
      border: 2rpx solid #ced0d7;
      background: #ffffff;
      border-radius: 16rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #141d3d;
      text-align: center;
      line-height: 92rpx;
    }
  }
}
.slot-content {
  text-align: left;
}
</style>
