<template>
  <view class="wallet">
    <view class="wallet-mony text-c">
      <view class="wallet-mony-text">余额</view>
      <view class="mt28">
        <text class="fz44">￥</text>
        <text class="fz76 fwb">{{ userInfo.remainingSum }}</text>
      </view>
      <view class="wallet-mony-detail">
        <view class="wallet-mony-detail-item">
          <text>可提现:</text>
          <text>￥</text>
          <text>{{ userInfo.overallSum }}</text>
        </view>
        <view class="wallet-mony-detail-item">
          <text>不可提现:</text>
          <text>￥</text>
          <text>{{ userInfo.noRemainingSum }}</text>
        </view>
        <view class="wallet-mony-detail-item">
          <text>冻结金额:</text>
          <text>￥</text>
          <text>{{ userInfo.frozenAmount }}</text>
        </view>
      </view>
      <view class="mt28 flex-cc" v-if="isTeach == 2">
        <view class="wallet-mony-button" @click="handleWithdrawal">提现</view>
        <view
          class="wallet-mony-button wallet-mony-button2 ml32"
          @click="handleRecharge"
        >
          充值
        </view>
      </view>
      <view class="mt28 flex-cc" v-if="isTeach == 1" @click="handleWithdrawal">
        <view class="wallet-mony-button wallet-mony-button3">提现</view>
      </view>
    </view>
    <view class="wallet-content-item">
      <view class="wallet-tab">
        <view
          class="wallet-tab-item"
          @click="handleTab(1)"
          :class="[active == 1 ? 'wallet-tab-active' : '']"
        >
          全部
        </view>
        <view
          class="wallet-tab-item"
          @click="handleTab(2)"
          :class="[active == 2 ? 'wallet-tab-active' : '']"
        >
          支出
        </view>
        <view
          class="wallet-tab-item"
          @click="handleTab(3)"
          :class="[active == 3 ? 'wallet-tab-active' : '']"
        >
          收入
        </view>
      </view>
      <view v-for="(item, index) in data" :key="index">
        <wallet-item :item="item" @change="handleShow"></wallet-item>
      </view>
      <view class="default-more" v-if="isMore && data.length != 0">
        暂无更多数据
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
    <view :style="{ height: `calc(${safeAreaHeight}px + 32rpx)` }"></view>
    <recharge ref="recharge" @change="getData" />
    <withdrawal ref="withdrawal" @change="getData" />
  </view>
</template>

<script>
import WalletItem from './wallet-item.vue'
import Recharge from '@/components/Recharge/Recharge.vue'
import Withdrawal from '../components/Withdrawal/Withdrawal.vue'
import mixin from '@/mixin.js'
export default {
  mixins: [mixin],
  components: {
    WalletItem,
    Recharge,
    Withdrawal
  },
  data() {
    return {
      active: 1, //  1 2 3
      data: [], //数据列表
      isTeach: false,
    }
  },
  onLoad() {
    this.getData()
  },
  onReachBottom() {
    console.log('已触底')
    this.lower()
  },
  methods: {
    getData() {
      console.log('获取我的数据')
      this.$http['mine'].getUserInfo().then(res => {
        console.log(res)
        if (res.code == 200) {
          const result = {
            ...this.userInfo,
            avatar: res.data.avatar,
            name: res.data.name,
            remainingSum: res.data.remainingSum,
            frozenAmount: res.data.frozenAmount,
            roleName: res.data.roleName
          }
          this.SET_STORAGE({
            str: 'userInfo',
            data: result
          })
          this.handleTab(1)
        }
      })
    },
    // 选择tab操作
    handleTab(val) {
      this.active = val
      this.queryParams.page = 1
      this.search()
    },
    // 打开充值弹窗
    handleRecharge() {
      // this.$utils.model.showToast(
      //   '您充值金额将用于约课自动缴费，如未退出班级，上课后不再退费。'
      // )
      this.$refs.recharge.handleShow()
    },
    // 打开提现弹窗
    handleWithdrawal() {
      this.$refs.withdrawal.handleShow(this.userInfo.remainingSum)
    },
    // 模拟请求数据
    async search() {
      const self = this
      return new Promise(async (resolve, reject) => {
        let data = []
        let income = ''
        if (self.active == 2) {
          income = false
        } else if (self.active == 3) {
          income = true
        }
        const res = await self.$http['mine'].getTrade({
          income,
          ...this.queryParams
        })
        // if (res.code == 200) {
        data = res.data.records
        // }
        let tempList = self.data
        if (self.queryParams.page == 1) {
          tempList = data
        } else {
          tempList = tempList.concat(data)
        }
        self.queryParams.total = res.data.total
        self.data = tempList
        self.$forceUpdate() //二维数组，开启强制渲染
        resolve(tempList)
      })
    }
  }
}
</script>
<style>
.wallet-scroll {
  height: calc(100vh - 60px - 400rpx);
}
</style>
<style lang="scss" scoped>
.wallet {
  min-height: 100vh;
  background: #eef1fa;
  box-sizing: border-box;
  background-image: url('~@/static/mine/bg-wallet.png');
  background-repeat: no-repeat;
  background-size: 100% 456rpx;

  // background-position: 0 -170rpx;
  &-mony {
    min-height: 400rpx;
    padding-bottom: 32rpx;
    box-sizing: border-box;
    color: #ffffff;

    &-text {
      padding-top: 34rpx;
      font-size: 40rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }

    &-button {
      width: 232rpx;
      height: 72rpx;
      border-radius: 16rpx;
      border: 2rpx solid #ffffff;
      text-align: center;
      line-height: 72rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }

    &-button2 {
      background-color: white;
      color: #de501f;
    }

    &-button3 {
      width: 348rpx;
      background-color: white;
      color: #de501f;
    }
  }

  &-mony-detail {
    display: flex;
    align-items: center;
    justify-content: center;

    &-item {
      margin: 0 12px;
    }
  }

  &-tab {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &-item {
      padding: 32rpx;
      font-weight: 600;
      font-size: 28rpx;
    }

    &-active {
      position: relative;
      color: #de501f;

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 20rpx;
        margin-left: -12rpx;
        width: 24rpx;
        height: 4rpx;
        background: #de501f;
        border-radius: 3rpx;
      }
    }
  }

  &-content {
    &-item {
      margin-left: 32rpx;
      padding-bottom: 16rpx;
      width: 686rpx;
      background: #ffffff;
      border-radius: 14rpx;
    }
  }
}

.default-more {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 28rpx;
  color: #6a6a6a;
}
</style>
