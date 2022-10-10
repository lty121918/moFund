<template>
  <view class="piece">
    <view class="piece-head-address" @click="$utils.router.navTo($page.Search)">
      <image
        class="piece-head-address-img"
        src="/static/home/location2.png"
        mode="aspectFill"
      ></image>
      <text>{{ campus.campusName }}</text>
      <image
        class="piece-head-address-icon"
        src="/static/down2.png"
        mode="aspectFill"
      ></image>
    </view>
    <view class="piece-head-margin" v-if="data.length !== 0">
      <view v-for="item in data" :key="item.productSellPriceRelId">
        <pin-item :item="item"></pin-item>
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
import PinItem from '@/components/PinItem/PinItem.vue'
export default {
  mixins: [mixin],
  data() {
    return { data: [] }
  },
  components: { PinItem },
  mounted() {
    this.onLaunch().then(res => {
      this.search()
    })
  },
  methods: {
    // getInit() {
    // 	this.search()
    // },
    search: debounce(async function() {
      const self = this
      let data = []
      // 获取当前社区拼班
      let res = await self.$http['classes'].getSpellClassList({ campusId: self.campus.campusId })
      if (res.code == 200) {
        data = res.data
        data.forEach(item => {
          if (item.headUrl && item.headUrl.indexOf('http') == -1) {
            item.headUrl = self.$url + item.headUrl
          } else if (!item.headUrl) {
            item.headUrl = self.avatar
          }
          item.weChatUserList = item.weChatUserList || []
          item.weChatUserList.forEach(row => {
            if (row.avatar && row.avatar.indexOf('http') == -1) {
              row.avatar = self.$url + row.avatar
            } else if (!row.avatar) {
              row.avatar = self.avatar
            }
          })
          if (item.weChatUserList.length > 5) {
            item.weChatUserList = item.weChatUserList.slice(0, 4)
          }
          if (item.startPeriod) {
            item.startPeriod = this.$utils.dateTime.getLocalTime(
              `${item.startPeriod}`,
              'hh:mm'
            )
            item.endPeriod = this.$utils.dateTime.getLocalTime(
              `${item.endPeriod}`,
              'hh:mm'
            )
          }
          item['weekCodeName'] = this.$utils.dateTime.filteDay(item.weekCode)
          item.CourseDateName = this.$utils.dateTime.filteDate(
            item.courseDate,
            item.startDate,
            item.endDate
          )
        })
        self.data = data
      }
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
.piece {
  min-height: 100vh;
  padding: 0 32rpx;
  box-sizing: border-box;
  padding-bottom: 32rpx;
  background: #eef1fa;
  position: relative;
  z-index: 9;

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
}
</style>
