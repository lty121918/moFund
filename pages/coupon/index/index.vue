<template>
  <view class="coupon">
    <view class="coupon-content">
      <view class="coupon-content-item mb32" v-for="index in 10" :key="index">
        <!-- 1 -->
        <view class="flex-bs pb22 coupon-content-border">
          <view>
            <view class="fz60 fwb color">
              <text>￥50</text>
              <text class="fz32">元</text>
            </view>
            <view class="fz24 color2 coupon-range text-c mt6">课程使用</view>
          </view>
          <view>
            <view class="fz40 fwb mt16">暑假大放送</view>
            <view class="fz24 coupon-tip">无门槛使用</view>
          </view>
          <progress-bar :progressTxt="29" />
        </view>
        <!-- 1 -->
        <!-- 2 说明-->
        <uni-collapse-item :showArrow="false">
          <template v-slot:title>
            <view class="flex-bc pt26 pb24">
              <view class="coupon-rule flex-sc">
                <text>详细规则</text>
                <image
                  class="coupon-icon"
                  src="../../../static/left.png"
                  mode=""
                />
              </view>
              <view class="coupon-button">立即领取</view>
            </view>
          </template>
          <view class="coupon-rule-content">
            <view>1、这里是优惠券的详细使用说明</view>
            <view>2、有一些优惠券使用的规则和限制，约束条</view>
            <view>3、有一些优惠券使用的规则和限制，约束条</view>
          </view>
        </uni-collapse-item>
        <!-- 2 -->
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
    <view
      class="coupon-mod"
      :style="{ marginBottom: `${safeAreaHeight}px` }"
    ></view>
    <cover-view class="coupon-footer flex-bc">
      <cover-view
        class="coupon-footer-button"
        :style="{ marginBottom: `${safeAreaHeight}px` }"
      >
        领券中心
      </cover-view>
      <cover-view
        class="coupon-footer-button coupon-footer-button-active"
        :style="{ marginBottom: `${safeAreaHeight}px` }"
      >
        我的优惠券
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
import mixin from "@/mixin.js";
import ProgressBar from "../components/progress-bar/progress-bar.vue";
export default {
  mixins: [mixin],
  components: { ProgressBar },
  data() {
    return {
      data: [],
    };
  },
  onReachBottom() {
    console.log("已触底");
  },
  methods: {},
  // 分享给朋友
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      path: `/${this.$mp.page.route}?id=1`,
    };
  },
  onShareTimeline(res) {
    //分享到朋友圈
    return {
      path: `/${this.$mp.page.route}?id=1`, //
    };
  },
};
</script>

<style lang="scss" scoped>
.coupon {
  background: #eef1fa;
  min-height: 100vh;
  &-content {
    padding: 32rpx;
    &-item {
      padding: 32rpx 32rpx 0 26rpx;
      width: 686rpx;
      // height: 258rpx;
      background: #ffffff;
      box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      border-radius: 16rpx;
    }
    &-border {
      border-bottom: 1rpx solid #eaeaea;
    }
  }

  &-tip {
    margin-top: 16rpx;
    width: 160rpx;
    height: 44rpx;
    background: rgba(238, 241, 250, 0.5);
    border-radius: 8rpx;
    text-align: center;
  }
  &-rule {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #838899;
    &-content {
      padding: 0rpx 24rpx 20rpx 24rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8b8b8b;
      line-height: 34rpx;
    }
  }
  &-button {
    width: 132rpx;
    height: 44rpx;
    background: #de501f;
    border-radius: 22rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 44rpx;
    text-align: center;
  }
  &-icon {
    margin-left: 12rpx;
    width: 24rpx;
    height: 24rpx;
    transform: rotate(90deg);
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
    z-index: 9999;

    &-button {
      width: 328rpx;
      height: 92rpx;
      border-radius: 16rpx;
      border: 2rpx solid #de501f;
      background: #ffffff;
      border-radius: 16rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #de501f;
      text-align: center;
      line-height: 92rpx;
      &-active {
        background: #de501f;
        color: #ffffff;
      }
    }
  }
}
</style>
