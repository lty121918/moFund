<template>
  <view class="coupon">
    <view class="coupon-content">
      <view class="coupon-content-item flex-bs">
        <view>50</view>
        <view>
          <view class="fz40 fwb">暑假大放送</view>
          <view class="fz24">无门槛使用</view>
        </view>
        <progress-bar :progressTxt="29" />
      </view>
    </view>
    <view
      class="coupon-mod"
      :style="{ marginBottom: `${safeAreaHeight}px` }"
    ></view>
    <view class="coupon-footer">
      <view
        class="coupon-footer-button"
        :style="{ marginBottom: `${safeAreaHeight}px` }"
      >
        提 交
      </view>
    </view>
  </view>
</template>

<script>
import mixin from "@/mixin.js";
import ProgressBar from "../components/progress-bar/progress-bar.vue";
export default {
  mixins: [mixin],
  components: { ProgressBar },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.coupon {
  background: #eef1fa;
  min-height: 100vh;
  &-content {
    padding: 32rpx;
    &-item {
      padding:32rpx 32rpx 0 26rpx;
      width: 686rpx;
      height: 258rpx;
      background: #ffffff;
      box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.1);
      box-sizing:border-box;
    }
  }
  &-mod {
    height: 92rpx;
    padding: 32rpx 30rpx;
  }

  &-footer {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    padding: 32rpx 30rpx;
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







</style>
