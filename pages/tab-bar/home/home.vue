<template>
  <view class="home" v-if="isTeach == 2">
    <drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" />
    <view class="home-head2"></view>
    <view class="home-head-address">
      <view class="home-head-address-view" @click="handleNavTo">
        <image
          class="home-head-address-img"
          src="/static/home/location3.png"
          mode="aspectFill"
        ></image>
        <text>{{ campus.campusName || '' }}</text>
        <image
          class="home-head-address-icon"
          src="/static/down3.png"
          mode="aspectFill"
        ></image>
      </view>
    </view>
    <view class="home-head">
      <view class="home-head-swiper">
        <swiper
          class="swiper"
          circular
          :indicator-dots="false"
          :autoplay="true"
          :interval="5000"
          :duration="500"
        >
          <swiper-item
            v-for="item in banner"
            :key="item.id"
            @click="hanldeNext(item)"
          >
            <view class="home-head-view">
              <image
                class="home-head-img"
                :src="url + item.imageUrl"
                mode="aspectFill"
                alt="加载失败"
              ></image>
            </view>
          </swiper-item>
          <swiper-item v-if="banner.length == 0">
            <view class="home-head-view">
              <image
                class="home-head-img"
                src="/static/default.png"
                mode="widthFix"
                alt="加载失败"
              ></image>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!-- 热门活动 -->
    <view class="home-activity">
      <view class="home-title" v-if="courseList.length > 0">
        <view class="home-title-item">
          <image
            class="home-title-img"
            src="/static/home/icon.png"
            mode="aspectFill"
          ></image>
          <text>社区课程</text>
        </view>
        <view
          class="home-title-item"
          @click="$utils.router.navTo($page.Course)"
        >
          <text class="home-title-name">全部</text>
          <image
            class="home-title-icon"
            src="/static/left.png"
            mode="aspectFill"
          ></image>
        </view>
      </view>
      <view class="home-activity-content">
        <view
          class="home-activity-content-item"
          v-for="item in courseList"
          :key="item.productId"
          @click="$utils.router.navTo($page.CourseDetail, item)"
        >
          <van-image
            use-error-slot
            class="home-activity-content-img"
            radius="10"
            width="216"
            height="124"
            :src="item.coverImage"
            fit="cover"
          ></van-image>
          <!-- <image class="home-activity-content-img" :src="item.coverImage" mode="aspectFit"></image> -->
          <view class="home-activity-content-title t-over">
            {{ item.productName }}
          </view>
          <!-- <view class="home-activity-content-msg">&nbsp;</view> -->
          <view class="home-activity-content-price">
            <text>￥{{ item.price }}</text>
            <image
              class="home-activity-content-icon"
              src="/static/home/right.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 附近拼班 -->
    <view class="home-nearby">
      <view class="home-title" v-if="spellClassList.length > 0">
        <view class="home-title-item">
          <image
            class="home-title-img"
            src="/static/home/icon.png"
            mode="aspectFill"
          ></image>
          <text>附近拼班</text>
        </view>
        <view
          class="home-title-item"
          @click="$utils.router.navTo($page.PieceList)"
        >
          <text class="home-title-name">全部</text>
          <image
            class="home-title-icon"
            src="/static/left.png"
            mode="aspectFill"
          ></image>
        </view>
      </view>
      <view
        class="home-nearby-content"
        v-for="item in spellClassList"
        :key="item.productSellPriceRelId"
      >
        <pin-item :item="item"></pin-item>
      </view>
    </view>
    <view
      class="home-official"
      :style="{
        bottom: isIphoneX ? `calc(50px + ${safeAreaHeight}px)` : '50px'
      }"
    >
      <official-account id="official_account"></official-account>
    </view>
    <view
      v-if="officialAccount"
      :style="{
        height: isIphoneX ? `calc(84px + ${safeAreaHeight}px)` : '84px'
      }"
    ></view>
    <!-- Tabbar -->
    <page-tabpars></page-tabpars>
  </view>
</template>

<script>
import { debounce } from '@/utils/lodash.js'
import bus from '@/utils/bus.js'
import mixin from '@/mixin.js'
import DragButton from '@/components/drag-button/drag-button.vue'
import PinItem from '@/components/PinItem/PinItem.vue'
export default {
  mixins: [mixin],
  data() {
    return {
      banner: [], // 轮播图
      courseList: [], // 社区课程
      spellClassList: [], // 附件拼班
      campusName: ''
    }
  },
  components: {
    DragButton,
    PinItem
  },
  computed: {
    url() {
      return this.$url
    }
  },
  components: { PinItem },
  created() {},

  onShow() {
    this.SET_STORAGE({
			str: 'location'
		})
    this.getTeach()
    if (this.isTeach == 1) {
      this.$utils.router.swtTo(this.$page.Class)
      return false
    }
    this.getMounted()
    setTimeout(() => {
      this.init()
    }, 800)
  },

  mounted() {},
  methods: {
    handleNavTo() {
      this.$utils.router.navTo(this.$page.Search)
    },
    // home 页面调用
    getMounted: debounce(function(e) {
      this.$nextTick(() => {
        uni.setNavigationBarTitle({ title: '首页' })
      })
      this.getData()
    }),
    btnClick() {},
    // 请求数据
    async getData() {
      console.log('数据请求home')
      // 读取社区信息 已经缓存在本地
      this.SET_STORAGE({ str: 'campus' })
      console.log('校区', this.campus)
      // 读取登录时获取的坐标轴
      this.SET_STORAGE({ str: 'location' })
      const { getSearchList, getBanner } = this.$http['map']
      const { getCourseList, getSpellClassList } = this.$http['classes']
      // 轮播图
      let res1 = await getBanner()
      if (res1.code == 200) {
        this.banner = res1.data
      }
      // 获取社区
      let res2 = await getSearchList({
        lat: this.location.latitude || this.latitude,
        lng: this.location.longitude || this.longitude
      })
      if (res2.code == 200) {
        let list = res2.data
        if (!this.campus) {
          // 没有社区 保存一下
          this.SET_STORAGE({
            str: 'campus',
            data: list[0]
          })
        } else {
          // 如果之前缓存的社区已经被删除 则重新选取
          const isTrue = list.some(
            item => item.campusId == this.campus.campusId
          )
          if (!isTrue) {
            this.SET_STORAGE({
              str: 'campus',
              data: list[0]
            })
          }
        }
        if (list.length == 0) {
          this.SET_STORAGE({
            str: 'campus',
            data: {
              campusId: '',
              campusName: ''
            }
          })
        }
      }
      // 获取课程
      let res3 = await getCourseList({ campusId: this.campus.campusId })
      if (res3.code == 200) {
        const data = [...res3.data]
        data.forEach(item => {
          item.coverImage = this.$url + item.coverImage
        })
        if (data.length > 4) {
          this.courseList = data.slice(0, 4)
        } else {
          this.courseList = data
        }
      }
      // 获取当前社区拼班
      let res4 = await getSpellClassList({ campusId: this.campus.campusId })
      if (res4.code == 200) {
        res4.data.forEach(item => {
          if (item.headUrl && item.headUrl.indexOf('http') == -1) {
            item.headUrl = this.$url + item.headUrl
          }
          if (!item.headUrl) {
            item.headUrl = this.avatar
          }

          item.weChatUserList = item.weChatUserList || []
          item.weChatUserList.forEach(row => {
            if (row.avatar && row.avatar.indexOf('http') == -1) {
              row.avatar = this.$url + row.avatar
            } else if (!row.avatar) {
              row.avatar = this.avatar
            }
          })
          if (item.weChatUserList.length > 5) {
            item.weChatUserList = item.weChatUserList.slice(0, 4)
          }

          // 格式化时间
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
        this.spellClassList = [...res4.data]
        console.log(this.spellClassList)
      }
      this.$forceUpdate()
    },
    // 跳转到其他小程序
    hanldeNext(item) {
      this.$utils.router.other(item.linkUrl, item.appid)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: #eef1fa;
  font-family: PingFangSC-Medium, PingFang SC;

  &-head2 {
    position: fixed;
    z-index: 1;
    height: 314rpx;
    width: 100%;
    background-image: url('~@/static/home/bg.png');
    background-repeat: no-repeat;
    background-size: 100% 510rpx;
    background-position: 0 -170rpx;
  }

  &-head {
    position: relative;
    top: 0;
    left: 0;
    padding: 0rpx 32rpx 0 32rpx;
    margin-bottom: 142rpx;
    height: 314rpx;
    z-index: 9;

    &-address {
      position: sticky;
      top: 0px;
      z-index: 999;
      height: 106rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 32rpx;
      box-sizing: border-box;
      // margin-top: 4rpx;;
      font-size: 28rpx;
      font-weight: 500;
      color: #ffffff;
      background-image: url('~@/static/home/bg.png');
      background-repeat: no-repeat;
      background-size: 100% 510rpx;
      background-position: 0 -170rpx;
      &-view {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 22rpx;
        height: 64rpx;
        background: #ffffff;
        border-radius: 32px;
        color: #de501f;
      }
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

    &-swiper {
      // margin-top: 20rpx;
      width: 686rpx;
      height: 376rpx;
      background: #d8d8d8;
      border-radius: 16rpx;
    }

    &-view {
      text-align: center;
    }

    &-img {
      width: 100%;
      height: 376rpx;
    }
  }

  // 热门活动
  &-activity {
    position: relative;
    z-index: 9;

    &-content {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding-left: 8rpx;
      padding-right: 24rpx;
      padding-bottom: 8rpx;
      overflow-x: scroll;

      &-item {
        flex-shrink: 0;
        margin-left: 24rpx;
        padding: 20rpx;
        width: 256rpx;
        height: 312rpx;
        box-sizing: border-box;
        background-image: url('~@/static/home/bg-item.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 12rpx;
      }

      &-title {
        height: 85rpx;
        margin-top: 26rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #141d3d;
      }

      &-price {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #de501f;
      }

      &-msg {
        margin-top: 8rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(20, 29, 61, 0.7);
      }

      &-img {
        // width: 84rpx;
        // height: 84rpx;
        width: 216rpx;
        height: 124rpx;
        border-radius: 8rpx;
      }

      &-icon {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }

  // 附近拼班
  &-nearby {
    position: relative;
    z-index: 9;
    &-content {
      margin: 0 32rpx 32rpx 32rpx;
    }
  }
}

.swiper {
  width: 686rpx;
  height: 376rpx;
  overflow: hidden;
  border-radius: 16rpx;
}
.home-official {
  position: fixed;
  z-index: 999;
  left: 0;
  width: 100%;
}
</style>
