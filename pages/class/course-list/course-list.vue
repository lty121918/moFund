<template>
  <view class="course">
    <view
      class="course-head-address"
      @click="$utils.router.navTo($page.Search)"
    >
      <image
        class="course-head-address-img"
        src="/static/home/location2.png"
        mode="aspectFill"
      ></image>
      <text>{{ campus.campusName }}</text>
      <image
        class="course-head-address-icon"
        src="/static/down2.png"
        mode="aspectFill"
      ></image>
    </view>
    <view class="course-head-margin">
      <view
        class="course-list-item"
        v-for="item in data"
        :key="item"
        @click="$utils.router.navTo($page.CourseDetail, item)"
      >
        <van-image
          use-error-slot
          class="course-list-item-img"
          fit="cover"
          radius="10"
          width="180"
          height="204"
          :src="item.coverImage"
        ></van-image>
        <!-- <image class="course-list-item-img" :src="item.coverImage" mode="aspectFill"></image> -->
        <view class="">
          <view class="course-list-item-title">{{ item.productName }}</view>
          <view>
            <text class="color">
              <text class="fz24">￥</text>
              <text class="fz32">{{ item.price }}</text>
            </text>
            <text class="fz24">/节</text>
            <text class="course-list-item-payment">
              {{ item.paymentNumber }}人付款
            </text>
          </view>
          <view class="course-list-item-info">
            <view
              class="course-list-item-apply"
              v-if="item.minAge && item.maxAge"
            >
              {{ item.minAge }}-{{ item.maxAge }}岁适用
            </view>
            <view
              class="course-list-item-apply"
              v-if="item.minAge && !item.maxAge"
            >
              大于{{ item.minAge }}岁适用
            </view>
            <view
              class="course-list-item-apply"
              v-if="!item.minAge && item.maxAge"
            >
              小于{{ item.maxAge }}岁适用
            </view>
            <view
              class="course-list-item-apply"
              v-if="!item.minAge && !item.maxAge"
            >
              无年龄限制
            </view>
            <view class="course-list-item-pin">
              {{ item.spellingClassNumber }}拼班
            </view>
          </view>
        </view>
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
</template>

<script>
import mixin from '@/mixin.js'
import { debounce } from '@/utils/lodash.js'
export default {
  mixins: [mixin],
  data() {
    return { data: [] }
  },
  mounted() {
    this.onLaunch().then(res => {
      this.getInit()
    })
  },
  methods: {
    getInit() {
      this.search()
    },
    search: debounce(async function() {
      const self = this
      // 获取课程
      let res = await self.$http['classes'].getCourseList({ campusId: self.campus.campusId })
      // '/static/notData.png'
      let data = []
      if (res.code == 200) {
        data = res.data
        data.forEach(item => {
          if (item.spellingClassNumber < 100) {
            item.spellingClassNumber = `${item.spellingClassNumber}个`
          } else {
            item.spellingClassNumber = '100+'
          }
          item.coverImage = this.$url + item.coverImage
        })
      }
      this.data = data
    })
  }
}
</script>
<style lang="scss">
.scroll-class2 {
  height: calc(100vh - 105rpx);
}
</style>
<style scoped lang="scss">
.course {
  min-height: 100vh;
  padding: 0 32rpx;
  box-sizing: border-box;
  padding-bottom: 32rpx;
  background: #eef1fa;

  &-head {
    &-margin {
      padding-top: 124rpx;
    }
    &-address {
      position: fixed;
      z-index: 999;
      height: 60rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 32rpx 0rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #141d3d;

      &-img {
        margin-right: 16rpx;
        width: 18rpx;
        height: 24rpx;
      }

      &-icon {
        margin-top: 4rpx;
        margin-left: 12rpx;
        width: 12rpx;
        height: 8rpx;
      }
    }
  }

  // 下拉数据
  &-list {
    &-item {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 32rpx;
      padding: 24rpx;
      width: 686rpx;
      box-sizing: border-box;
      // background: #FFFFFF;
      border-radius: 16rpx;
      background-image: url('~@/static/class/course-list.png');
      background-size: 100%;
      &:last-child {
        margin-bottom: 0rpx;
      }
      &-img {
        flex-shrink: 0;
        margin-right: 30rpx;
        width: 180rpx;
        height: 204rpx;
        // background-color: rgba(0, 0, 0, 0.1);
      }

      &-title {
        // width: 300rpx;
        min-height: 86rpx;
        font-size: 36rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #141d3d;
        line-height: 48rpx;
      }

      &-payment {
        margin-left: 16rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(20, 29, 61, 0.5);
      }

      &-info {
        display: flex;
        justify-content: space-around;
        margin-top: 22rpx;
        width: 296rpx;
        height: 44rpx;
        background: rgba(20, 29, 61, 0.05);
        color: rgba(20, 29, 61, 0.5);
        border-radius: 12rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 44rpx;
        text-align: center;
      }

      &-apply {
        width: 148rpx;
        height: 44rpx;
        background: rgba(20, 29, 61, 0.1);
        border-radius: 12rpx;
      }

      &-pin {
        width: 148rpx;
      }

      &-surplus {
        position: absolute;
        right: 24rpx;
        top: 24rpx;
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #141d3d;
      }
    }
  }
}
</style>
