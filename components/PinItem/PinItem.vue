<template>
  <view class="pin">
    <view
      class="pin-content"
      @click="
        $utils.router.navTo($page.OrderInfo, { classId: item.classInfoId })
      "
    >
      <view class="pin-content-top">
        <image
          class="pin-content-img"
          :src="item.headUrl"
          mode="aspectFill"
        ></image>
        <view class="pin-content-center">
          <view>{{ item.nickName || '微信昵称' }}</view>
          <!-- 上课周期 -->
          <view class="pin-content-cycle" v-if="item.startDate">
            <image
              class="pin-content-cycle-img"
              src="/static/class/cycle.png"
              mode="widthFix"
            ></image>
            <text>上课周期：{{ item.startDate }}~{{ item.endDate }}</text>
          </view>
          <!-- 上课时段 -->
          <view class="pin-content-cycle" v-if="item.startPeriod">
            <image
              class="pin-content-cycle-img"
              src="/static/class/time.png"
              mode="widthFix"
            ></image>
            <text>
              <text class="o-over over-time">上课时段：</text>
              <text class="o-over over-time">
                {{
                  item.courseType == 2
                    ? item.CourseDateName || ''
                    : item.weekCodeName || ''
                }}
              </text>
              <text class="o-over over-time">
                {{ item.startPeriod || '' }}~{{ item.endPeriod || '' }}
              </text>
            </text>
          </view>
        </view>
      </view>
      <view class="pin-content-footer">
        <view class="pin-content-class">
          <view class="pin-content-name o-over">
            {{ item.productName }}
            <text class="ml12">{{ item.spellType }}</text>
          </view>
          <view class="pin-content-url">
            <image
              v-for="row in item.weChatUserList"
              :key="row.studentId"
              class="pin-content-icon"
              :src="row.avatar"
              mode="aspectFill"
            ></image>
            <image
              class="pin-content-icon"
              src="/static/home/default-url.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <view class="pin-content-button">加入拼班</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'pin-item',
  props: { item: {} },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.pin {
  &-content {
    margin-bottom: 32rpx;
    padding: 24rpx;
    width: 686rpx;
    min-height: 180rpx;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 16rpx;

    &-img {
      flex-shrink: 0;
      margin-right: 26rpx;
      width: 140rpx;
      height: 140rpx;
      border-radius: 12rpx;
    }
    &-top {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding-bottom: 24rpx;
    }
    &-center {
      flex-shrink: 0;
      // width: 320rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #141d3d;
    }

    &-class {
      display: flex;
      justify-content: flex-start;
      // height: 60rpx;
      max-width: 460rpx;
      padding-right: 18rpx;
      background: rgba(20, 29, 61, 0.05);
      border-radius: 12rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: rgba(20, 29, 61, 0.5);
    }

    &-name {
      flex-shrink: 0;
      max-width: 292rpx;
      padding: 0 18rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      box-sizing: border-box;
      background: rgba(20, 29, 61, 0.1);
      border-radius: 12rpx;
    }
    &-cycle {
      margin-top: 10rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #838899;
      &-img {
        margin-right: 10rpx;
        width: 24rpx;
        height: 24rpx;
      }
    }
    &-url {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 32rpx;
    }

    &-icon {
      margin-left: -20rpx;
      width: 44rpx;
      height: 44rpx;
      border-radius: 50%;
    }

    &-button {
      flex-shrink: 0;
      margin-left: 28rpx;
      width: 124rpx;
      height: 52rpx;
      background: #de501f;
      border-radius: 12rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 52rpx;
      text-align: center;
    }
    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 22rpx;
      border-top: 1rpx dashed rgba(131, 136, 153, 0.2);
    }
  }
}
.over-time {
  max-width: 140rpx;
  display: inline-block;
  height: 30rpx;
}
</style>
