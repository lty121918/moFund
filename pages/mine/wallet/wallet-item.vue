<template>
  <view class="wallet-content">
    <view class="wallet-content-top">
      <text class="fwb">流水号：{{ item.tradeNo }}</text>
      <view
        v-if="item.tradeType == 2"
        @click="handleTrad"
        :class="item.processingStatus"
        class="flex-ec fz28"
      >
        {{ status[item.processingStatus] }}
        <image class="wallet-image" v-if="item.processingStatus==='FAIL'" src="../../../static/mine/processing-status.png" mode="" />
      </view>
      <!-- <text class="color fw4" v-if="item.income">收入</text>
      <text class="color2 fw4" v-if="!item.income">支出</text> -->
    </view>
    <view class="mt32 fz28">
      <view>变动时间：{{ item.operateTime }} </view>
      <view class="mt16">交易类型：{{ tradeTypeData[item.tradeType] }}</view>
      <view class="mt16" v-if="item.orderNo"
        >订单编号：{{ item.orderNo || "" }}</view
      >
      <view
        class="fz24 wallet-content-price"
        :class="[item.income ? 'wallet-content-priceActive' : '']"
      >
        <text>{{ item.income ? "+" : "-" }}</text>
        <text>￥</text>
        <text class="fz32 fwb">{{ item.amount }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      tradeTypeData: {
        1: "充值",
        2: "提现",
        3: "课款缴费",
        4: "团长分佣",
        5: "教练分佣",
        6: "用户充值赠送",
        7: "系统冲销",
        8: "课程退款",
      },
      status: {
        PROCESSING: "提现中",
        SUCCESS: "提现成功",
        FAIL: "失败",
        CLOSED: "",
      },
    };
  },
  methods: {
    handleTrad() {
      if (this.item.customFailReason) {
        this.$utils.model.showMsgModal({
          content: this.item.customFailReason,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet {
  &-image{
    margin-left:10rpx;
    width:28rpx;
    height:28rpx;
  }
  &-content {
    position: relative;
    margin: 0 32rpx 32rpx 32rpx;
    padding: 0 32rpx 32rpx 32rpx;
    background: #ffffff;
    border-radius: 16rpx;
    border: 2rpx solid #eef1fa;

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 84rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #eef1fa;
      font-size: 24rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #141d3d;
    }

    &-price {
      position: absolute;
      right: 32rpx;
      bottom: 32rpx;
      display: inline-block;
      padding: 6rpx 12rpx;
      background: rgba(20, 29, 61, 0.05);
      border-radius: 8rpx;
    }

    &-priceActive {
      background: rgba(254, 140, 25, 0.05);
      color: #fe8c19;
    }
  }
}
// 转账中
.PROCESSING {
  color:#DE501F;
}
// 转账成功
.SUCCESS {
  color:#10BA54; 
}
// 转账失败
.FAIL {
  color:#838899;
}
// 已关闭
.CLOSED {
  color:#838899;
}
</style>
